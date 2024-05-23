import { ForbiddenException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { scheduled } from 'rxjs';
import { InvestmentFrequencyEnum, InvestmentStateEnum, PaymentStatusEnum } from 'src/common/enums/investment.enum';
import { validateCreateInvestmentDTO, validateResumeInvestmentDTO, validateUpdateInvestmentDTO } from 'src/common/validationFunctions/investment.validation';
import { CreateInvestment, CreateInvestmentPayment, InvestmentPayment, InvestmentPaymentSchedule, ResumeInvestment, UpdateInvestment } from 'src/graphql';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InvestmentService {
    constructor(private prisma: PrismaService) { }

    private readonly logger = new Logger(InvestmentService.name);

    async createInvestment(userId: string, dto: CreateInvestment) {
        try {
            // Validate
            const errors: string[] = await validateCreateInvestmentDTO(dto);
            if (errors.length > 0) {
                const errorMessage = `Validation error: ${errors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            //authorization
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    isDeveloper: false,
                    hasCompany: false,
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            const validInvestmentFrequencies = [InvestmentFrequencyEnum.Daily, InvestmentFrequencyEnum.Monthly, InvestmentFrequencyEnum.Weekly];
            if (!validInvestmentFrequencies.includes(dto.investmentFrequencyId)) throw new ForbiddenException("Invalid investment frequency");

            const createInvestment = await this.prisma.$transaction(async (prisma) => {
                const newInvestment = await prisma.investment.create({
                    data: {
                        description: dto.description,
                        totalAmount: dto.totalAmount,
                        startDate: dto.startDate,
                        duration: dto.duration,
                        investmentFrequencyId: dto.investmentFrequencyId,
                        investmentStateId: InvestmentStateEnum.Created,
                        userId,
                    },
                });

                //create schedules
                const amountDuePerSchedule = newInvestment.totalAmount / newInvestment.duration;

                const paymentScheduleData: {
                    amountDue: number
                    dateDue: Date
                    investmentId: string
                    paymentStatusId: number
                }[] = []

                for (let i = 0; i < newInvestment.duration; i++) {
                    const dueDate: Date = new Date(newInvestment.startDate);
                    if (newInvestment.investmentFrequencyId === InvestmentFrequencyEnum.Daily) {
                        dueDate.setDate(dueDate.getDate() + i);
                    } else if (newInvestment.investmentFrequencyId === InvestmentFrequencyEnum.Weekly) {
                        dueDate.setDate(dueDate.getDate() + i * 7);
                    } else if (newInvestment.investmentFrequencyId === InvestmentFrequencyEnum.Monthly) {
                        dueDate.setMonth(dueDate.getMonth() + i);

                        if (dueDate.getDate() < newInvestment.startDate.getDate()) {
                            // If the current day of the month is greater than the last day of the target month
                            // Set the day of the month to the last day of the target month
                            dueDate.setDate(0); // Set to the last day of the month
                        };
                    };

                    paymentScheduleData.push({
                        amountDue: amountDuePerSchedule,
                        dateDue: dueDate,
                        investmentId: newInvestment.id,
                        paymentStatusId: PaymentStatusEnum.OnSchedule,
                    });
                };

                await prisma.investmentPaymentSchedule.createMany({
                    data: paymentScheduleData,
                });

                return newInvestment;
            });

            return createInvestment;
        } catch (error) {
            this.logger.error(error)
            throw error;
        };
    };

    async getInvestments() {
        try {
            return await this.prisma.investment.findMany({
                include: {
                    investmentFrequency: true,
                    investmentPayments: true,
                    investmentPaymentSchedules: true,
                    investmentState: true,
                    user: true,
                },
            });
        } catch (error) {
            this.logger.error(error)
            throw error;
        };
    };

    async getInvestementsByUser(userId: string) {
        try {
            //authorization
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    isDeveloper: false,
                    hasCompany: false,
                },
                select: {
                    investments: {
                        include: {
                            investmentFrequency: true,
                            investmentPayments: true,
                            investmentPaymentSchedules: true,
                            investmentState: true,
                        }
                    }
                }
            });
            if (!user) throw new UnauthorizedException("Access denied");

            return user.investments;
        } catch (error) {
            this.logger.error(error)
            throw error;
        };
    };

    async adminGetInvestments(adminId: string) {
        try {
            //admin authorization
            const admin = await this.prisma.admin.findUnique({
                where: {
                    id: adminId,
                },
            });
            if (!admin) throw new UnauthorizedException("Admin not found");

            return await this.prisma.investment.findMany({
                include: {
                    investmentFrequency: true,
                    investmentPayments: true,
                    investmentPaymentSchedules: true,
                    investmentState: true,
                    user: true,
                },
            });
        } catch (error) {
            this.logger.error(error)
            throw error;
        };
    };

    //test CRON JOB
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { name: 'automatic_investment_payment' })
    async automaticInvestmentPayment() {
        try {
            const runningInvestments = await this.prisma.investment.findMany({
                where: {
                    investmentStateId: InvestmentStateEnum.Created || InvestmentStateEnum.Started
                },
                select: {
                    investmentPaymentSchedules: {
                        include: {
                            paymentStatus: true,
                            investment: {
                                include: {
                                    user: {
                                        include: {
                                            userWallet: true
                                        }
                                    },
                                },
                            },
                        },
                    },
                },
            });

            const today = new Date(Date.now());
            today.setHours(0, 0, 0, 0);

            const investmentPaymentSchedules: InvestmentPaymentSchedule[] = [];

            for (const investment of runningInvestments) {
                console.log(today);
                const paymentSchedules = investment.investmentPaymentSchedules.filter((schedule) => schedule.paymentStatusId === PaymentStatusEnum.OnSchedule && schedule.dateDue.toDateString() === today.toDateString());
                investmentPaymentSchedules.push(...paymentSchedules);
            };

            this.logger.log("Getting payment schedules...");

            const createInvestmentPayments: CreateInvestmentPayment[] = []
            const failedPayments: {
                scheduleId: string,
                investmentId: string,
            }[] = [];

            for (const schedule of investmentPaymentSchedules) {
                const walletBalance = schedule.investment.user.userWallet.balance;

                if (walletBalance >= schedule.amountDue) {
                    const scheduleDate = new Date(schedule.dateDue);

                    const userName = schedule.investment.user.fullname;
                    const firstName = userName.split(' ')[0]; // Get the first name
                    const firstThreeLetters = firstName.slice(0, 3).toUpperCase();

                    let paymentReference = `SAV-${firstThreeLetters}-${scheduleDate.getFullYear()}-${scheduleDate.getMonth()}${scheduleDate.getDate()}`;

                    createInvestmentPayments.push({
                        reference: paymentReference,
                        amountPaid: schedule.amountDue,
                        datePaid: today,
                        investmentId: schedule.investmentId,
                        investmentPaymentScheduleId: schedule.id,
                        userWalletId: schedule.investment.user.userWallet.id,
                    });

                    await this.prisma.userWallet.update({
                        where: {
                            id: schedule.investment.user.userWallet.id,
                        },
                        data: {
                            balance: {
                                decrement: schedule.amountDue,
                            },
                            savings: {
                                increment: schedule.amountDue,
                            },
                        },
                    });

                    this.logger.log(`${schedule.investment.user.fullname} wallet updated...`);
                } else if (walletBalance < schedule.amountDue) {
                    failedPayments.push({
                        scheduleId: schedule.id,
                        investmentId: schedule.investmentId,
                    });

                    this.logger.log("Collecting failed payments...");
                };
            };

            if (failedPayments.length > 0) {
                const failedPaymentsScheduleIds = failedPayments.map((failed) => failed.scheduleId);
                const failedPaymentsInvestmentIds = failedPayments.map((failed) => failed.investmentId);

                await this.prisma.$transaction(async (prisma) => {
                    await prisma.investmentPaymentSchedule.updateMany({
                        where: {
                            id: {
                                in: failedPaymentsScheduleIds,
                            },
                        },
                        data: {
                            paymentStatusId: PaymentStatusEnum.Failed,
                        },
                    });

                    await prisma.investment.updateMany({
                        where: {
                            id: {
                                in: failedPaymentsInvestmentIds,
                            },
                        },
                        data: {
                            investmentStateId: InvestmentStateEnum.Failed,
                        },
                    });
                });

                this.logger.log("Failed payments handled...");
                this.logger.log("Investments and schedules updated...");
            };

            if (createInvestmentPayments.length > 0) {

                await this.prisma.$transaction(async (prisma) => {
                    const scheduleIds: string[] = createInvestmentPayments.map((schedule) => schedule.investmentPaymentScheduleId);
                    const investmentIds: string[] = createInvestmentPayments.map((schedule) => schedule.investmentId);

                    await prisma.investmentPayment.createMany({
                        data: createInvestmentPayments,
                    });

                    await prisma.investmentPaymentSchedule.updateMany({
                        where: {
                            id: {
                                in: scheduleIds,
                            },
                        },
                        data: {
                            paymentStatusId: PaymentStatusEnum.Succeeded,
                        },
                    });

                    await prisma.investment.updateMany({
                        where: {
                            id: {
                                in: investmentIds,
                            },
                        },
                        data: {
                            investmentStateId: InvestmentStateEnum.Started,
                        },
                    });
                });

                this.logger.log("Successful payments created...");
                this.logger.log("Investments and schedules updated...");
            };

            this.logger.log("Getting live investments...");

            const investments = await this.prisma.investment.findMany({
                where: {
                    investmentStateId: InvestmentStateEnum.Created || InvestmentStateEnum.Started
                },
                include: {
                    investmentPaymentSchedules: {
                        include: {
                            paymentStatus: true,
                        },
                    },
                },
            });

            const completedInvestments: string[] = [];

            for (const investment of investments) {
                const schedules = investment.investmentPaymentSchedules.length;
                const completedSchedules = investment.investmentPaymentSchedules.filter((completed) => completed.paymentStatusId === PaymentStatusEnum.Succeeded).length;

                if (schedules === completedSchedules) completedInvestments.push(investment.id);
            };

            await this.prisma.investment.updateMany({
                where: {
                    id: {
                        in: completedInvestments,
                    },
                },
                data: {
                    investmentStateId: InvestmentStateEnum.Completed,
                },
            });

            this.logger.log("Investment job completed");
        } catch (error) {
            this.logger.error(error);
        };
    };

    async updateInvestment(userId: string, dto: UpdateInvestment) {
        try {
            // Validate
            const errors: string[] = await validateUpdateInvestmentDTO(dto);
            if (errors.length > 0) {
                const errorMessage = `Validation error: ${errors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            //authorization
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    isDeveloper: false,
                    hasCompany: false,
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            const investmentExists = await this.prisma.investment.findUnique({
                where: {
                    id: dto.investmentId,
                },
            });
            if (!investmentExists) throw new ForbiddenException("Investement not found");
            if (investmentExists.userId !== userId) throw new UnauthorizedException("Access denied");
            if (investmentExists.investmentStateId !== InvestmentStateEnum.Created) throw new ForbiddenException("Cannot update investment at this stage");

            if (dto.investmentFrequencyId) {
                const validInvestmentFrequencies = [InvestmentFrequencyEnum.Daily, InvestmentFrequencyEnum.Monthly, InvestmentFrequencyEnum.Weekly];
                if (!validInvestmentFrequencies.includes(dto.investmentFrequencyId)) throw new ForbiddenException("Invalid investment frequency");
            };

            const updateInvestment = await this.prisma.$transaction(async (prisma) => {
                const updatedInvestment = await prisma.investment.update({
                    where: {
                        id: dto.investmentId,
                    },
                    data: {
                        description: dto.description,
                        totalAmount: dto.totalAmount,
                        startDate: dto.startDate,
                        duration: dto.duration,
                        investmentFrequencyId: dto.investmentFrequencyId,
                    },
                });

                if (dto.duration || dto.investmentFrequencyId || dto.startDate || dto.totalAmount) {
                    await prisma.investmentPaymentSchedule.deleteMany({
                        where: {
                            investmentId: dto.investmentId,
                        },
                    });

                    //create schedules
                    const amountDuePerSchedule = updatedInvestment.totalAmount / updatedInvestment.duration;

                    const paymentScheduleData: {
                        amountDue: number
                        dateDue: Date
                        investmentId: string
                        paymentStatusId: number
                    }[] = []

                    for (let i = 0; i < updatedInvestment.duration; i++) {
                        const dueDate: Date = new Date(updatedInvestment.startDate);
                        if (updatedInvestment.investmentFrequencyId === InvestmentFrequencyEnum.Daily) {
                            dueDate.setDate(dueDate.getDate() + i);
                        } else if (updatedInvestment.investmentFrequencyId === InvestmentFrequencyEnum.Weekly) {
                            dueDate.setDate(dueDate.getDate() + i * 7);
                        } else if (updatedInvestment.investmentFrequencyId === InvestmentFrequencyEnum.Monthly) {
                            dueDate.setMonth(dueDate.getMonth() + i);

                            if (dueDate.getDate() < updatedInvestment.startDate.getDate()) {
                                // If the current day of the month is greater than the last day of the target month
                                // Set the day of the month to the last day of the target month
                                dueDate.setDate(0); // Set to the last day of the month
                            };
                        };

                        paymentScheduleData.push({
                            amountDue: amountDuePerSchedule,
                            dateDue: dueDate,
                            investmentId: updatedInvestment.id,
                            paymentStatusId: PaymentStatusEnum.OnSchedule,
                        });
                    };

                    await prisma.investmentPaymentSchedule.createMany({
                        data: paymentScheduleData,
                    });
                };

                return updatedInvestment;
            })
        } catch (error) {
            this.logger.error(error)
            throw error;
        };
    };

    async pauseInvestment(userId: string, investmentId: string) {
        try {
            //authorization
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    isDeveloper: false,
                    hasCompany: false,
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            const investmentExists = await this.prisma.investment.findUnique({
                where: {
                    id: investmentId,
                },
            });
            if (!investmentExists) throw new ForbiddenException("Investement not found");
            if (investmentExists.userId !== userId) throw new UnauthorizedException("Access denied");

            await this.prisma.investment.update({
                where: {
                    id: investmentId,
                },
                data: {
                    investmentStateId: InvestmentStateEnum.Paused,
                },
            });

            return true;
        } catch (error) {
            this.logger.error(error)
            throw error;
        };
    };

    async resumeInvestment(userId: string, dto: ResumeInvestment) {
        try {
            // Validate
            const errors: string[] = await validateResumeInvestmentDTO(dto);
            if (errors.length > 0) {
                const errorMessage = `Validation error: ${errors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            //authorization
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    isDeveloper: false,
                    hasCompany: false,
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            const investmentExists = await this.prisma.investment.findUnique({
                where: {
                    id: dto.investmentId,
                },
                include: {
                    investmentPaymentSchedules: {
                        include: {
                            paymentStatus: true,
                        },
                    },
                },
            });
            if (!investmentExists) throw new ForbiddenException("Investement not found");
            if (investmentExists.userId !== userId) throw new UnauthorizedException("Access denied");

            const resumeInvestment = await this.prisma.$transaction(async (prisma) => {
                const remainingPayments = investmentExists.investmentPaymentSchedules.filter((schedule) => schedule.paymentStatusId === PaymentStatusEnum.OnSchedule).length;

                const amountDue = investmentExists.totalAmount / investmentExists.duration;

                await prisma.investmentPaymentSchedule.deleteMany({
                    where: {
                        investmentId: dto.investmentId,
                        paymentStatusId: PaymentStatusEnum.OnSchedule,
                    },
                });

                const paymentScheduleData: {
                    amountDue: number
                    dateDue: Date
                    investmentId: string
                    paymentStatusId: number
                }[] = []

                for (let i = 0; i < remainingPayments; i++) {
                    const dueDate: Date = new Date(dto.resumeDate);
                    if (investmentExists.investmentFrequencyId === InvestmentFrequencyEnum.Daily) {
                        dueDate.setDate(dueDate.getDate() + i);
                    } else if (investmentExists.investmentFrequencyId === InvestmentFrequencyEnum.Weekly) {
                        dueDate.setDate(dueDate.getDate() + i * 7);
                    } else if (investmentExists.investmentFrequencyId === InvestmentFrequencyEnum.Monthly) {
                        dueDate.setMonth(dueDate.getMonth() + i);

                        if (dueDate.getDate() < investmentExists.startDate.getDate()) {
                            // If the current day of the month is greater than the last day of the target month
                            // Set the day of the month to the last day of the target month
                            dueDate.setDate(0); // Set to the last day of the month
                        };
                    };

                    paymentScheduleData.push({
                        amountDue: amountDue,
                        dateDue: dueDate,
                        investmentId: investmentExists.id,
                        paymentStatusId: PaymentStatusEnum.OnSchedule,
                    });
                };

                await prisma.investmentPaymentSchedule.createMany({
                    data: paymentScheduleData,
                });

                return true;
            });

            return true;
        } catch (error) {
            this.logger.error(error)
            throw error;
        };
    };

    async endInvestment(userId: string, investmentId: string) {
        try {
            //authorization
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    isDeveloper: false,
                    hasCompany: false,
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            const investmentExists = await this.prisma.investment.findUnique({
                where: {
                    id: investmentId,
                },
            });
            if (!investmentExists) throw new ForbiddenException("Investement not found");
            if (investmentExists.userId !== userId) throw new UnauthorizedException("Access denied");

            await this.prisma.investment.update({
                where: {
                    id: investmentId,
                },
                data: {
                    investmentStateId: InvestmentStateEnum.Ended,
                },
            });

            return true;
        } catch (error) {
            this.logger.error(error)
            throw error;
        };
    };

    async deleteInvestment(userId: string, investmentId: string) {
        try {
            //authorization
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    isDeveloper: false,
                    hasCompany: false,
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            const investmentExists = await this.prisma.investment.findUnique({
                where: {
                    id: investmentId,
                },
            });
            if (!investmentExists) throw new ForbiddenException("Investement not found");
            if (investmentExists.userId !== userId) throw new UnauthorizedException("Access denied");

            await this.prisma.investment.delete({
                where: {
                    id: investmentId,
                },
            });

            return true;
        } catch (error) {
            this.logger.error(error)
            throw error;
        };
    };

    async deleteAllInvestements() {
        try {
            await this.prisma.investment.deleteMany();
            return true;
        } catch (error) {
            this.logger.error(error)
            throw error;
        };
    };
}

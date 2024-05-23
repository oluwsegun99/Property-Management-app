import { ForbiddenException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { MortgageStatusEnum } from 'src/common/enums/mortage.enum';
import { DurationTypeEnum, PurchaseRequestStatusEnum, PurchaseRequestTypeEnum } from 'src/common/enums/property.enum';
import { validateCreateMortgageDTO, validateMortgageCalculatorInputDTO, validateUpdateMortgageDTO } from 'src/common/validationFunctions/mortgage.validation';
import { CreateMortgage, MortgageCalculatorInput, MortgageCalculatorResponse, UpdateMortgage } from 'src/graphql';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MortgageService {
    constructor(private prisma: PrismaService) { }

    private readonly logger = new Logger(MortgageService.name);

    async getMortgageStatuses() {
        try {
            return await this.prisma.mortgageStatus.findMany();
        } catch (error) {
            this.logger.error(error);
            throw error;
        };
    };

    async mortgageCalculator(dto: MortgageCalculatorInput) {
        try {
            // Validate
            const errors: string[] = await validateMortgageCalculatorInputDTO(dto);
            if (errors.length > 0) {
                const errorMessage = `Validation error: ${errors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            const validDurationTypes: number[] = [DurationTypeEnum.Yearly];
            if (!validDurationTypes.includes(dto.durationTypeId)) throw new ForbiddenException("Invalid duration type");

            // Calculate mortgage payment
            const totalAmount = dto.propertyPrice - (dto.propertyPrice * dto.downPaymentPercentage / 100);
            const monthlyInterestRate = dto.interestRate / 100 / 12;
            // const annualInterestRate = dto.interestRate / 100;
            const totalPayments = dto.mortgageDuration * 12;

            // Calculate mortgage payment including tax and insurance
            // let mortgagePayment;
            // if (dto.durationTypeId === DurationTypeEnum.Monthly) {
            const mortgagePayment = (totalAmount * monthlyInterestRate) * Math.pow(1 + monthlyInterestRate, totalPayments) / (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
            // } 
            // else {
            //     mortgagePayment = (totalAmount * annualInterestRate) * Math.pow(1 + annualInterestRate, totalPayments) / (Math.pow(1 + annualInterestRate, totalPayments) - 1);
            // }

            const response: MortgageCalculatorResponse = {
                tax: 0, // You can calculate tax separately based on your requirements
                principalAndInterest: mortgagePayment
            };

            return response;
        } catch (error) {
            this.logger.error(error);
            throw error;
        };
    };

    async createMortgage(userId: string, dto: CreateMortgage) {
        try {
            // Validate
            const errors: string[] = await validateCreateMortgageDTO(dto);
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

            const propertyExists = await this.prisma.property.findUnique({
                where: {
                    id: dto.propertyId,
                },
            });
            if (!propertyExists) throw new ForbiddenException("Property not found");

            const downPaymentAmount = (dto.downPaymentPercentage / 100) * propertyExists.price;
            const today = new Date(Date.now());

            const validDurationTypes: number[] = [DurationTypeEnum.Monthly, DurationTypeEnum.Yearly];
            if (!validDurationTypes.includes(dto.durationTypeId)) throw new ForbiddenException("Invalid mortgage duration type");

            const purchaseRequestExists = await this.prisma.propertyPurchaseRequest.findUnique({
                where: {
                    id: dto.propertyPurchaseReqId,
                },
            });
            if (!purchaseRequestExists) throw new ForbiddenException("Purchase request not found");
            if (purchaseRequestExists.purchaseRequestStatusId !== PurchaseRequestStatusEnum.Approved) throw new ForbiddenException("Purchase request not approved");
            if (purchaseRequestExists.purchaseRequestTypeId !== PurchaseRequestTypeEnum.MortgagePayment) throw new ForbiddenException("Invalid Purchase request");
            if (purchaseRequestExists.durationTypeId !== dto.durationTypeId) throw new ForbiddenException("Cannot reconcile mortgage duration type");
            if (purchaseRequestExists.purchaseDuration !== dto.mortgageDuration) throw new ForbiddenException("Cannot reconcile mortgage duration");

            const newMortgage = await this.prisma.mortgage.create({
                data: {
                    coApplicantEmail: dto.coApplicantEmail,
                    coApplicantName: dto.coApplicantName,
                    downPaymentPercentage: dto.downPaymentPercentage,
                    downPayment: downPaymentAmount,
                    applicationDate: today,
                    interestRate: dto.interestRate,
                    mortgageDuration: dto.mortgageDuration,
                    propertyId: dto.propertyId,
                    userId,
                    propertyPurchaseReqId: dto.propertyPurchaseReqId,
                    mortgageStatusId: MortgageStatusEnum.Draft,
                    durationTypeId: dto.durationTypeId,
                },
            });

            return newMortgage
        } catch (error) {
            this.logger.error(error);
            throw error;
        };
    };

    async getMortgages() {
        try {
            return await this.prisma.mortgage.findMany({
                include: {
                    mortgagePayments: true,
                    mortgagePaymentSchedules: true,
                    mortgageStatus: true,
                    property: true,
                    propertyPurchaseReq: true,
                    financeCompany: true,
                    user: true,
                    durationType: true,
                    financierDeveloperMortgagePayments: true,
                },
            });
        } catch (error) {
            this.logger.error(error);
            throw error;
        };
    };

    async getMortgageById(mortgageId: string) {
        try {
            const mortgageExists = await this.prisma.mortgage.findUnique({
                where: {
                    id: mortgageId,
                },
                include: {
                    mortgagePayments: true,
                    mortgagePaymentSchedules: true,
                    mortgageStatus: true,
                    property: true,
                    propertyPurchaseReq: true,
                    financeCompany: true,
                    user: true,
                    durationType: true,
                    financierDeveloperMortgagePayments: true,
                },
            });
            if (!mortgageExists) throw new ForbiddenException("Mortgage not found");

            return mortgageExists;
        } catch (error) {
            this.logger.error(error);
            throw error;
        };
    };

    async getMortgagesByUser(userId: string) {
        try {
            //authorization
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    isDeveloper: false,
                    hasCompany: false,
                },
                select: {
                    mortgages: {
                        include: {
                            mortgagePayments: true,
                            mortgagePaymentSchedules: true,
                            mortgageStatus: true,
                            property: true,
                            propertyPurchaseReq: true,
                            financeCompany: true,
                            user: true,
                            durationType: true,
                            financierDeveloperMortgagePayments: true,
                        },
                    },
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            return user.mortgages;
        } catch (error) {
            this.logger.error(error);
            throw error;
        };
    };

    async adminGetMortgages(adminId: string) {
        try {
            //authorization
            const admin = await this.prisma.admin.findUnique({
                where: {
                    id: adminId,
                },
            });
            if (!admin) throw new UnauthorizedException("Access denied");

            return await this.prisma.mortgage.findMany({
                include: {
                    mortgagePayments: true,
                    mortgagePaymentSchedules: true,
                    mortgageStatus: true,
                    property: true,
                    propertyPurchaseReq: true,
                    financeCompany: true,
                    user: true,
                    durationType: true,
                    financierDeveloperMortgagePayments: true,
                },
            });
        } catch (error) {
            this.logger.error(error);
            throw error;
        };
    };

    async adminAproveMortgage() { }

    //TO BE DECIDED
    async updateMortgage(userId: string, dto: UpdateMortgage) {
        try {
            // Validate
            const errors: string[] = await validateUpdateMortgageDTO(dto);
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

            const mortgageExists = await this.prisma.mortgage.findUnique({
                where: {
                    id: dto.mortgageId,
                },
                include: {
                    property: true,
                },
            });
            if (!mortgageExists) throw new ForbiddenException("Mortgage not found");

            const downPaymentAmount: number = (dto.downPaymentPercentage ? dto.downPaymentPercentage : mortgageExists.downPaymentPercentage / 100) * mortgageExists.property.price;

            const today = new Date(Date.now());

            if (dto.durationTypeId) {
                const validDurationTypes: number[] = [DurationTypeEnum.Monthly, DurationTypeEnum.Yearly];
                if (!validDurationTypes.includes(dto.durationTypeId)) throw new ForbiddenException("Invalid mortgage duration type");
            };

            const purchaseRequestExists = await this.prisma.propertyPurchaseRequest.findUnique({
                where: {
                    id: dto.propertyPurchaseReqId,
                },
            });
            if (!purchaseRequestExists) throw new ForbiddenException("Purchase request not found");
            if (purchaseRequestExists.purchaseRequestStatusId !== PurchaseRequestStatusEnum.Approved) throw new ForbiddenException("Purchase request not approved");
            if (purchaseRequestExists.purchaseRequestTypeId !== PurchaseRequestTypeEnum.MortgagePayment) throw new ForbiddenException("Invalid Purchase request");
            if (purchaseRequestExists.durationTypeId !== dto.durationTypeId) throw new ForbiddenException("Cannot reconcile mortgage duration type");
            if (purchaseRequestExists.purchaseDuration !== dto.mortgageDuration) throw new ForbiddenException("Cannot reconcile mortgage duration");
        } catch (error) {
            this.logger.error(error);
            throw error;
        };
    };

    async deleteMortgage(userId: string, mortgageId: string) {
        try {
            //authorization
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    isDeveloper: false,
                    hasCompany: false,
                },
                select: {
                    mortgages: true,
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            const mortgageExists = user.mortgages.find((mortgage) => mortgage.id === mortgageId);
            if (!mortgageExists) throw new ForbiddenException("Mortgage not found");

            await this.prisma.mortgage.delete({
                where: {
                    id: mortgageId,
                },
            });

            return true;
        } catch (error) {
            this.logger.error(error);
            throw error;
        };
    };

    async deleteAllMortgages() {
        try {
            await this.prisma.mortgage.deleteMany();
            return true;
        } catch (error) {
            this.logger.error(error);
            throw error;
        };
    };
}

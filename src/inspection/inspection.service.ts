import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InspectionStatus, InspectionStatusEnum } from 'src/common/enums/inspection.enum';
import { Role } from 'src/common/enums/role.enum';
import { validateCreateInspectionScheduleDTO, validateUpdateInspectionScheduleDTO } from 'src/common/validationFunctions/inspection.validation';
import { AdminHandleInspectionSchedule, CreateInspectionSchedule, DeveloperHandleInspectionSchedule, InspectionSchedule, UpdateInspectionSchedule } from 'src/graphql';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InspectionService {
    constructor(private prisma: PrismaService) { }

    async getInspectionTypes() {
        try {
            return await this.prisma.inspectionType.findMany();
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getInspectionStatus() {
        try {
            return await this.prisma.inspectionStatus.findMany();
        } catch (error) {
            console.error(error);
            throw error;
        };
    }

    async createInspectionSchedule(userId: string, dto: CreateInspectionSchedule) {
        try {
            // Validate
            const errors: string[] = await validateCreateInspectionScheduleDTO(dto);
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

            const inspectionTypeExists = await this.prisma.inspectionType.findUnique({
                where: {
                    id: dto.inspectionTypeId,
                },
            });
            if (!inspectionTypeExists) throw new ForbiddenException("Invalid inspection type");

            const inspectionStatusEntity = await this.prisma.inspectionStatus.findFirst({
                where: {
                    inspectionStatus: InspectionStatus.PendingApproval,
                },
            });
            if (!inspectionStatusEntity) throw new ForbiddenException("Pending approval status not found");

            const newInspectionSchedule = await this.prisma.inspectionSchedule.create({
                data: {
                    userId,
                    propertyId: dto.propertyId,
                    dateScheduled: dto.dateScheduled,
                    inspectionTypeId: dto.inspectionTypeId,
                    inspectionStatusId: inspectionStatusEntity.id
                },
            });

            return newInspectionSchedule;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    //calendar view
    async adminGetInspectionSchedules(adminId: string, monthValue?: number) {
        try {
            //authorization
            const admin = await this.prisma.admin.findUnique({
                where: {
                    id: adminId,
                },
            });
            if (!admin) throw new UnauthorizedException("Access denied");

            const inspectionSchedules = await this.prisma.inspectionSchedule.findMany({
                include: {
                    property: {
                        include: {
                            propertyDetail: true,
                            developerCompany: true,
                            developedBy: true,
                        },
                    },
                    user: true,
                    inspectionType: true,
                    inspectionStatus: true,
                    inspectionScheduleSlip: true
                },
            });

            const today = new Date();

            const year = today.getFullYear();
            const month = monthValue ? monthValue : today.getMonth() + 1;

            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0);

            const daysInMonth: Date[] = [];
            const dateCursor = new Date(startDate);

            while (dateCursor <= endDate) {
                daysInMonth.push(new Date(dateCursor));
                dateCursor.setDate(dateCursor.getDate() + 1);
            };

            const calendarLog = daysInMonth.map((date) => {
                const inspectionsForDay = inspectionSchedules.filter((schedule) => schedule.dateScheduled.toDateString() === date.toDateString()).sort((a, b) => a.dateScheduled.getTime() - b.dateScheduled.getTime());

                return {
                    date: date.toDateString(),
                    inspectionsForDay,
                };
            });

            return calendarLog
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    //calendar view
    //get inspection schedules for all properties belonging to a particular company in a calendar view according to the schedules
    async getInspectionScheduleByDeveloper(userId: string, monthValue?: number) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    isDeveloper: true,
                },
                select: {
                    hasCompany: true,
                    userDeveloperCompany: {
                        select: {
                            developerCompanyId: true,
                        },
                    },
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            let propertyQuery: {
                where?: {
                    developedById?: string,
                    developerCompanyId?: string
                },
                select: {
                    inspectionSchedules: {
                        include: {
                            user: true,
                            property: true,
                            inspectionType: true,
                            inspectionStatus: true,
                            inspectionScheduleSlip: true
                        },
                    },
                },
            } = {
                where: {},
                select: {
                    inspectionSchedules: {
                        include: {
                            user: true,
                            property: true,
                            inspectionType: true,
                            inspectionStatus: true,
                            inspectionScheduleSlip: true
                        },
                    },
                },
            };

            if (user.hasCompany === true && user.userDeveloperCompany) {
                propertyQuery.where.developerCompanyId = user.userDeveloperCompany.developerCompanyId;
            } else {
                propertyQuery.where.developedById = userId;
            };

            const developerProperties = await this.prisma.property.findMany(propertyQuery);

            const inspectionsSchedulesForDeveloper: InspectionSchedule[] = [];

            for (const property of developerProperties) {
                inspectionsSchedulesForDeveloper.push(...property.inspectionSchedules);
            };

            const today = new Date();

            const year = today.getFullYear();
            const month = monthValue ? monthValue : today.getMonth() + 1;

            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0);

            const daysInMonth: Date[] = [];
            const dateCursor = new Date(startDate);

            while (dateCursor <= endDate) {
                daysInMonth.push(new Date(dateCursor));
                dateCursor.setDate(dateCursor.getDate() + 1);
            };

            const calendarLog = daysInMonth.map((date) => {
                const inspectionsForDay = inspectionsSchedulesForDeveloper.filter((schedule) => schedule.dateScheduled.toDateString() === date.toDateString()).sort((a, b) => a.dateScheduled.getTime() - b.dateScheduled.getTime());

                return {
                    date: date.toDateString(),
                    inspectionsForDay,
                };
            });

            return calendarLog;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    //calendar view
    async userGetInspectionSchedules(userId: string) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    isDeveloper: false,
                    hasCompany: false
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            return await this.prisma.inspectionSchedule.findMany({
                where: {
                    userId,
                },
                include: {
                    property: {
                        include: {
                            propertyDetail: true,
                            developerCompany: true,
                            developedBy: true,
                        },
                    },
                    inspectionType: true,
                    inspectionStatus: true,
                    inspectionScheduleSlip: true
                },
            });
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getInspectionSchedules() {
        try {
            return await this.prisma.inspectionSchedule.findMany({
                include: {
                    user: true,
                    property: true,
                    inspectionType: true,
                    inspectionStatus: true,
                    inspectionScheduleSlip: true,
                },
            });
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getInpectionScheduleById(scheduleId: string) {
        try {
            const inspectionScheduleExists = await this.prisma.inspectionSchedule.findUnique({
                where: {
                    id: scheduleId,
                },
                include: {
                    user: true,
                    property: true,
                    inspectionType: true,
                    inspectionStatus: true,
                    inspectionScheduleSlip: true,
                },
            });
            if (!inspectionScheduleExists) throw new ForbiddenException("Inspection schedule not found");
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async adminHandleInspectionSchedule(adminId: string, dto: AdminHandleInspectionSchedule) {
        try {
            //authorization
            const admin = await this.prisma.admin.findUnique({
                where: {
                    id: adminId,
                },
            });
            if (!admin) throw new UnauthorizedException("Access denied");

            const inspectionScheduleExists = await this.prisma.inspectionSchedule.findUnique({
                where: {
                    id: dto.scheduleId,
                },
            });
            if (!inspectionScheduleExists) throw new ForbiddenException("Inspection schedule not found");

            const inspectionStatusExists = await this.prisma.inspectionStatus.findUnique({
                where: {
                    id: dto.inspectionStatusId,
                },
            });
            if (!inspectionStatusExists) throw new ForbiddenException("Inspection status not found");

            const validInspectionStatuses: any = [InspectionStatus.Approved, InspectionStatus.Completed, InspectionStatus.Missed, InspectionStatus.Rejected];

            if (!validInspectionStatuses.includes(inspectionStatusExists.inspectionStatus)) {
                throw new ForbiddenException('Invalid Inspection status');
            };

            await this.prisma.inspectionSchedule.update({
                where: {
                    id: inspectionScheduleExists.id,
                },
                data: {
                    inspectionStatusId: dto.inspectionStatusId,
                },
            });

            return inspectionStatusExists.inspectionStatus;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    // async developerHandleInspectionSchedule(userId: string, dto: DeveloperHandleInspectionSchedule) {
    //     try {
    //         const user = await this.prisma.user.findFirst({
    //             where: {
    //                 id: userId,
    //                 isDeveloper: true,
    //             },
    //             select: {
    //                 hasCompany: true,
    //                 userDeveloperCompany: {
    //                     select: {
    //                         developerCompanyId: true,
    //                     },
    //                 },
    //             },
    //         });
    //         if (!user) throw new UnauthorizedException("Access denied");

    //         if (dto.agentId) {
    //             if (user.hasCompany === true && !user.userDeveloperCompany) throw new ForbiddenException("Cannot assign agent");

    //             const validUser = await this.prisma.userDeveloperCompany.findFirst({
    //                 where: {
    //                     userId: dto.agentId,
    //                     developerCompanyId: user.userDeveloperCompany.developerCompanyId
    //                 },
    //                 include: {
    //                     user: {
    //                         select: {
    //                             role: true,
    //                         },
    //                     },
    //                 },
    //             });
    //             if (!validUser) throw new ForbiddenException("Invalid agent");

    //             if (validUser.user.role.roleName !== Role.Agent) throw new ForbiddenException("Invalid agent");
    //         };

    //         const inspectionScheduleExists = await this.prisma.inspectionSchedule.findUnique({
    //             where: {
    //                 id: dto.scheduleId,
    //             },
    //         });
    //         if (!inspectionScheduleExists) throw new ForbiddenException("Inspection schedule not found");

    //         const inspectionStatusExists = await this.prisma.inspectionStatus.findUnique({
    //             where: {
    //                 id: dto.inspectionStatusId,
    //             },
    //         });
    //         if (!inspectionStatusExists) throw new ForbiddenException("Inspection status not found");

    //         const validInspectionStatuses: any = [InspectionStatus.AgentApproved, InspectionStatus.Rejected];

    //         if (!validInspectionStatuses.includes(inspectionStatusExists.inspectionStatus)) {
    //             throw new ForbiddenException('Invalid Inspection status');
    //         };

    //         const slipData: {
    //             id: string
    //             agentId: string
    //             developerCompanyId?: string
    //             approvedDate: Date
    //         } = {
    //             id: inspectionScheduleExists.id,
    //             agentId: dto.agentId ? dto.agentId : userId,
    //             developerCompanyId: user.hasCompany === true ? user.userDeveloperCompany.developerCompanyId : null,
    //             approvedDate: new Date(Date.now()),
    //         };

    //         const createSlip = await this.prisma.$transaction(async (prisma) => {
    //             await prisma.inspectionSchedule.update({
    //                 where: {
    //                     id: dto.scheduleId,
    //                 },
    //                 data: {
    //                     inspectionStatusId: dto.inspectionStatusId,
    //                 },
    //             });

    //             const inspectionSlip = await prisma.inspectionScheduleSlip.create({
    //                 data: slipData,
    //                 include: {
    //                     inspectionSchedule: true,
    //                 },
    //             });

    //             return inspectionSlip;
    //         });

    //         return createSlip
    //     } catch (error) {
    //         console.error(error);
    //         throw error;
    //     };
    // };

    async updateInspectionSchedule(userId: string, dto: UpdateInspectionSchedule) {
        try {
            // Validate
            const errors: string[] = await validateUpdateInspectionScheduleDTO(dto);
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
                select: {
                    userWishlists: true,
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            const inspectionScheduleExists = await this.prisma.inspectionSchedule.findUnique({
                where: {
                    id: dto.scheduleId,
                },
            });
            if (!inspectionScheduleExists) throw new ForbiddenException("Inspection schedule not found");

            if (dto.inspectionTypeId) {
                const inspectionTypeExists = await this.prisma.inspectionType.findUnique({
                    where: {
                        id: dto.inspectionTypeId,
                    },
                });
                if (!inspectionTypeExists) throw new ForbiddenException("Invalid inspection type");
            };

            let scheduleUpdateData: {
                dateScheduled?: Date,
                inspectionTypeId?: number,
                inspectionStatusId?: number
            } = {
                dateScheduled: dto.dateScheduled,
                inspectionTypeId: dto.inspectionTypeId,
            };

            if (inspectionScheduleExists.inspectionStatusId !== InspectionStatusEnum.PendingApproval) {
                scheduleUpdateData.inspectionStatusId = InspectionStatusEnum.RequestedChanges
            };

            const updatedSchedule = await this.prisma.inspectionSchedule.update({
                where: {
                    id: dto.scheduleId,
                },
                data: scheduleUpdateData
            });

            return updatedSchedule;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async deleteInspectionSchedule(userId: string, scheduleId: string) {
        try {
            //authorization
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    isDeveloper: false,
                    hasCompany: false,
                },
                select: {
                    userWishlists: true,
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            const inspectionScheduleExists = await this.prisma.inspectionSchedule.findUnique({
                where: {
                    id: scheduleId,
                },
            });
            if (!inspectionScheduleExists) throw new ForbiddenException("Inspection schedule not found");

            await this.prisma.inspectionSchedule.delete({
                where: {
                    id: scheduleId,
                },
            });

            return true;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async deleteAllInspectionSchedules() {
        try {
            await this.prisma.inspectionSchedule.deleteMany();
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };
}

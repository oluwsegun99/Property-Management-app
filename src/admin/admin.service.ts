import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrequalificationStatusEnum } from 'src/common/enums/prequalification.enum';
import { Role } from 'src/common/enums/role.enum';
import { validateAdminApprovePrequalificationDTO, validateAdminCreateInviteDTO } from 'src/common/validationFunctions/admin.validation';
import { AdminApprovePrequalification, AdminCreateInvite } from 'src/graphql';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) { }

    async createAdminInvite(adminId: string, dto: AdminCreateInvite) {
        try {
            // Validate
            const errors: string[] = await validateAdminCreateInviteDTO(dto);
            if (errors.length > 0) {
                const errorMessage = `Validation error: ${errors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            //admin authorization
            const admin = await this.prisma.admin.findUnique({
                where: {
                    id: adminId,
                },
            });
            if (!admin) throw new UnauthorizedException("Admin not found");

            const roleExists = await this.prisma.role.findUnique({
                where: {
                    id: dto.roleId,
                },
            });
            if (!roleExists) throw new ForbiddenException("Role not found");

            const validRoles: any = [Role.SuperAdmin, Role.Admin];

            if (!validRoles.includes(roleExists.roleName)) {
                throw new ForbiddenException('Invalid role');
            };

            //find existing admin
            const adminExists = await this.prisma.admin.findFirst({
                where: {
                    email: dto.email,
                },
            });
            if (adminExists) throw new ForbiddenException("Email already used");

            const newAdminInvite = await this.prisma.adminInvite.create({
                data: {
                    ...dto,
                },
            });

            return newAdminInvite;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getAdmins() { }

    async getAdminById() { }

    async deleteAdminById() { }

    async deleteAllAdmins() { }

    async adminViewPrequalifications(adminId: string) {
        try {
            //admin authorization
            const admin = await this.prisma.admin.findUnique({
                where: {
                    id: adminId,
                },
            });
            if (!admin) throw new UnauthorizedException("Admin not found");

            const prequalifications = await this.prisma.prequalification.findMany({
                include: {
                    prequalificationStatus: true,
                    user: true,
                },
            });

            return prequalifications;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async adminApprovePrequalification(adminId: string, dto: AdminApprovePrequalification) {
        try {
            // Validate
            const errors: string[] = await validateAdminApprovePrequalificationDTO(dto);
            if (errors.length > 0) {
                const errorMessage = `Validation error: ${errors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            //admin authorization
            const admin = await this.prisma.admin.findUnique({
                where: {
                    id: adminId,
                },
            });
            if (!admin) throw new UnauthorizedException("Admin not found");

            const validStatus: number[] = [PrequalificationStatusEnum.Rejected, PrequalificationStatusEnum.Approved];
            if (!validStatus.includes(dto.prequalificationStatusId)) throw new ForbiddenException("Invalid status");

            const prequalification = await this.prisma.prequalification.findUnique({
                where: {
                    id: dto.prequalificationId,
                },
            });
            if (!prequalification) throw new ForbiddenException("Prequalification not found");

            await this.prisma.prequalification.update({
                where: {
                    id: dto.prequalificationId,
                },
                data: {
                    prequalificationStatusId: dto.prequalificationStatusId,
                },
            });

            return true;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };
}

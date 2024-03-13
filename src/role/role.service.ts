import { Injectable } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {
    constructor(private prisma: PrismaService) { }

    async getAllRoles() {
        try {
            return await this.prisma.role.findMany();
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getUserDeveloperRoles() {
        try {
            const developerRoles = [Role.Owner, Role.Manager, Role.Agent, Role.Staff];
            const roles = await this.prisma.role.findMany({
                where: {
                    roleName: {
                        in: developerRoles,
                    },
                },
            });

            return roles;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getAdminRoles() {
        try {
            const adminRoles = [Role.SuperAdmin, Role.Admin];
            const roles = await this.prisma.role.findMany({
                where: {
                    roleName: {
                        in: adminRoles,
                    },
                },
            });

            return roles;
        } catch (error) {
            console.error(error);
            throw error;
        };
    }

    async getFinancierRoles() { }
}

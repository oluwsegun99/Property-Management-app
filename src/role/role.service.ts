import { Injectable } from '@nestjs/common';
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

    async getUserDeveloperRoles() { }

    async getAdminRoles() { }

    async getFinancierRoles() { }
}

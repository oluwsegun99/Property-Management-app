import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {
    constructor(private prisma: PrismaService) { }

    async getAllRoles() { }

    async getUserDeveloperRoles() { }

    async getAdminRoles() { }

    async getFinancierRoles() { }
}

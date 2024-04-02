import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlGetUserId } from 'src/common/decorators';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { AtGuard } from 'src/common/guards/at-guard';
import { RolesGuard } from 'src/common/guards/role-guard';
import { AdminApprovePrequalification, AdminCreateInvite } from 'src/graphql';
import { AdminService } from './admin.service';

@Resolver()
export class AdminResolver {
    constructor(private adminService: AdminService) { }

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.SuperAdmin)
    @Mutation("createAdminInvite")
    async createAdminInvite(@GraphqlGetUserId() adminId: string, @Args("input") dto: AdminCreateInvite) {
        return await this.adminService.createAdminInvite(adminId, dto);
    };

    async getAdmins() { }

    async getAdminById() { }

    async deleteAdminById() { }

    async deleteAllAdmins() { }

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.SuperAdmin, Role.Admin)
    @Query("adminViewPrequalifications")
    async adminViewPrequalifications(@GraphqlGetUserId() adminId: string) {
        return await this.adminService.adminViewPrequalifications(adminId);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.SuperAdmin, Role.Admin)
    @Mutation("adminApprovePrequalification")
    async adminApprovePrequalification(@GraphqlGetUserId() adminId: string, @Args("input") dto: AdminApprovePrequalification) {
        return await this.adminService.adminApprovePrequalification(adminId, dto);
    };
}

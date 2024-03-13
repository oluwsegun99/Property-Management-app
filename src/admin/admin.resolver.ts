import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphqlGetUserId } from 'src/common/decorators';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { AtGuard } from 'src/common/guards/at-guard';
import { RolesGuard } from 'src/common/guards/role-guard';
import { AdminCreateInvite } from 'src/graphql';
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
}

import { Query, Resolver } from '@nestjs/graphql';
import { RoleService } from './role.service';

@Resolver()
export class RoleResolver {
    constructor(private roleService: RoleService) { }

    @Query("getAllRoles")
    async getAllRoles() {
        return await this.roleService.getAllRoles();
    };

    @Query("getUserDeveloperRoles")
    async getUserDeveloperRoles() {
        return await this.roleService.getUserDeveloperRoles();
    };

    @Query("getAdminRoles")
    async getAdminRoles() {
        return await this.roleService.getAdminRoles();
    };

    async getFinancierRoles() { }
}

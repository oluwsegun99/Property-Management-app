import { Query, Resolver } from '@nestjs/graphql';
import { RoleService } from './role.service';

@Resolver()
export class RoleResolver {
    constructor(private roleService: RoleService) { }

    @Query("getAllRoles")
    async getAllRoles() {
        return await this.roleService.getAllRoles();
    };

    async getUserDeveloperRoles() { }

    async getAdminRoles() { }

    async getFinancierRoles() { }
}

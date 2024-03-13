import { Resolver } from '@nestjs/graphql';
import { RoleService } from './role.service';

@Resolver()
export class RoleResolver {
    constructor(private roleService: RoleService) { }

    async getAllRoles() { }

    async getUserDeveloperRoles() { }

    async getAdminRoles() { }

    async getFinancierRoles() { }
}

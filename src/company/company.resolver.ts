import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlGetUserId } from 'src/common/decorators';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { AtGuard } from 'src/common/guards/at-guard';
import { RolesGuard } from 'src/common/guards/role-guard';
import { CreateDeveloperCompany, UpdateDeveloperCompany } from 'src/graphql';
import { CompanyService } from './company.service';

@Resolver()
export class CompanyResolver {
    constructor(private companyService: CompanyService) { }

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Mutation("createDeveloperCompany")
    async createDeveloperCompany(@GraphqlGetUserId() userId: string, @Args("input") dto: CreateDeveloperCompany) {
        return await this.companyService.createDeveloperCompany(userId, dto);
    };

    @Query("getDeveloperCompanies")
    async getDeveloperCompanies() {
        return await this.companyService.getDeveloperCompanies();
    };

    @Query("getDeveloperCompanyById")
    async getDeveloperCompanyById(@Args("companyId") companyId: string) {
        return await this.companyService.getDeveloperCompanyById(companyId);
    };

    @UseGuards(AtGuard)
    @Query("getDeveloperCompanyByUser")
    async getDeveloperCompanyByUser(@GraphqlGetUserId() userId: string) {
        return await this.companyService.getDeveloperCompanyByUser(userId);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Mutation("updateDeveloperCompany")
    async updateDeveloperCompany(@GraphqlGetUserId() userId: string, @Args("input") dto: UpdateDeveloperCompany) {
        return await this.companyService.updateDeveloperCompany(userId, dto);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Mutation("deleteDeveloperCompany")
    async deleteDeveloperCompany(@GraphqlGetUserId() userId: string, @Args("companyId") companyId: string) {
        return await this.companyService.deleteDeveloperCompany(userId, companyId);
    };

    @Mutation("deleteAllDeveloperCompanies")
    async deleteAllDeveloperCompanies() {
        return await this.companyService.deleteAllDeveloperCompanies();
    };
}

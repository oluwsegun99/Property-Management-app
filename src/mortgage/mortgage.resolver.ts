import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { use } from 'passport';
import { GraphqlGetUserId } from 'src/common/decorators';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { AtGuard } from 'src/common/guards/at-guard';
import { RolesGuard } from 'src/common/guards/role-guard';
import { CreateMortgage, MortgageCalculatorInput } from 'src/graphql';
import { MortgageService } from './mortgage.service';

@Resolver()
export class MortgageResolver {
    constructor(private mortgageService: MortgageService) { }

    @Query("getMortgageStatuses")
    async getMortgageStatuses() {
        return await this.mortgageService.getMortgageStatuses();
    };

    @Query("mortgageCalculator")
    async mortgageCalculator(@Args("input") dto: MortgageCalculatorInput) {
        return await this.mortgageService.mortgageCalculator(dto);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Mutation("createMortgage")
    async createMortgage(@GraphqlGetUserId() userId: string, @Args("input") dto: CreateMortgage) {
        return await this.mortgageService.createMortgage(userId, dto);
    };

    @Query("getMortgages")
    async getMortgages() {
        return await this.mortgageService.getMortgages();
    };

    @Query("getMortgageById")
    async getMortgageById(@Args("mortgageId") mortgageId: string) {
        return await this.mortgageService.getMortgageById(mortgageId);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Query("getMortgagesByUser")
    async getMortgagesByUser(@GraphqlGetUserId() userId: string) {
        return await this.mortgageService.getMortgagesByUser(userId);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.SuperAdmin, Role.Admin)
    @Query("adminGetMortgages")
    async adminGetMortgages(@GraphqlGetUserId() adminId: string) {
        return await this.mortgageService.adminGetMortgages(adminId);
    };

    async updateMortgage() { }

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Mutation("deleteMortgage")
    async deleteMortgage(@GraphqlGetUserId() userId: string, @Args("mortgageId") mortgageId: string) {
        return await this.mortgageService.deleteMortgage(userId, mortgageId);
    };

    @Mutation("deleteAllMortgages")
    async deleteAllMortgages() {
        return await this.mortgageService.deleteAllMortgages();
    };
}

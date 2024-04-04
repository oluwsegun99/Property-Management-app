import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlGetUserId } from 'src/common/decorators';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { AtGuard } from 'src/common/guards/at-guard';
import { RolesGuard } from 'src/common/guards/role-guard';
import { CreateInvestment, ResumeInvestment, UpdateInvestment } from 'src/graphql';
import { InvestmentService } from './investment.service';

@Resolver()
export class InvestmentResolver {
    constructor(private investmentService: InvestmentService) { }

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Mutation("createInvestment")
    async createInvestment(@GraphqlGetUserId() userId: string, @Args("input") dto: CreateInvestment) {
        return await this.investmentService.createInvestment(userId, dto);
    };

    @Query("getInvestments")
    async getInvestments() {
        return await this.investmentService.getInvestments();
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Query("getInvestementsByUser")
    async getInvestementsByUser(@GraphqlGetUserId() userId: string) {
        return await this.investmentService.getInvestementsByUser(userId);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.SuperAdmin, Role.Admin)
    @Query("adminGetInvestments")
    async adminGetInvestments(@GraphqlGetUserId() adminId: string) {
        return await this.investmentService.adminGetInvestments(adminId);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Mutation("updateInvestment")
    async updateInvestment(@GraphqlGetUserId() userId: string, @Args("input") dto: UpdateInvestment) {
        return await this.investmentService.updateInvestment(userId, dto);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Mutation("pauseInvestment")
    async pauseInvestment(@GraphqlGetUserId() userId: string, @Args("investmentId") investmentId: string) {
        return await this.investmentService.pauseInvestment(userId, investmentId);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Mutation("resumeInvestment")
    async resumeInvestment(@GraphqlGetUserId() userId: string, @Args("input") dto: ResumeInvestment) {
        return await this.investmentService.resumeInvestment(userId, dto);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Mutation("endInvestment")
    async endInvestment(@GraphqlGetUserId() userId: string, @Args("investmentId") investmentId: string) {
        return await this.investmentService.endInvestment(userId, investmentId);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Mutation("deleteInvestment")
    async deleteInvestment(@GraphqlGetUserId() userId: string, @Args("investmentId") investmentId: string) {
        return await this.investmentService.deleteInvestment(userId, investmentId);
    };

    @Mutation("deleteAllInvestements")
    async deleteAllInvestements() {
        return await this.investmentService.deleteAllInvestements();
    }
}

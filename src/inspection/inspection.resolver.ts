import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlGetUserId } from 'src/common/decorators';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { AtGuard } from 'src/common/guards/at-guard';
import { RolesGuard } from 'src/common/guards/role-guard';
import { AdminHandleInspectionSchedule, CreateInspectionSchedule, DeveloperHandleInspectionSchedule, UpdateInspectionSchedule } from 'src/graphql';
import { InspectionService } from './inspection.service';

@Resolver()
export class InspectionResolver {
    constructor(private inspectionService: InspectionService) { }

    @Query("getInspectionTypes")
    async getInspectionTypes() {
        return await this.inspectionService.getInspectionTypes();
    };

    @Query("getInspectionStatus")
    async getInspectionStatus() {
        return await this.inspectionService.getInspectionStatus();
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Mutation("createInspectionSchedule")
    async createInspectionSchedule(@GraphqlGetUserId() userId: string, @Args("input") dto: CreateInspectionSchedule) {
        return await this.inspectionService.createInspectionSchedule(userId, dto);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Admin)
    @Query("adminGetInspectionSchedules")
    async adminGetInspectionSchedules(@GraphqlGetUserId() adminId: string, @Args("monthValue") monthValue?: number) {
        return await this.inspectionService.adminGetInspectionSchedules(adminId, monthValue);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner, Role.Agent, Role.Manager, Role.Staff)
    @Query("getInspectionScheduleByDeveloper")
    async getInspectionScheduleByDeveloper(@GraphqlGetUserId() userId: string, @Args("monthValue") monthValue?: number) {
        return await this.inspectionService.getInspectionScheduleByDeveloper(userId, monthValue);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Query("userGetInspectionSchedules")
    async userGetInspectionSchedules(@GraphqlGetUserId() userId: string) {
        return await this.inspectionService.userGetInspectionSchedules(userId);
    };

    @Query("getInspectionSchedules")
    async getInspectionSchedules() {
        return await this.inspectionService.getInspectionSchedules();
    };

    @Query("getInpectionScheduleById")
    async getInpectionScheduleById(@Args("scheduleId") scheduleId: string) {
        return await this.inspectionService.getInpectionScheduleById(scheduleId);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Admin)
    @Mutation("adminHandleInspectionSchedule")
    async adminHandleInspectionSchedule(@GraphqlGetUserId() adminId: string, @Args("input") dto: AdminHandleInspectionSchedule) {
        return await this.inspectionService.adminHandleInspectionSchedule(adminId, dto);
    };

    // @UseGuards(AtGuard, RolesGuard)
    // @Roles(Role.Owner, Role.Agent, Role.Manager, Role.Staff)
    // @Mutation("developerHandleInspectionSchedule")
    // async developerHandleInspectionSchedule(@GraphqlGetUserId() userId: string, @Args("input") dto: DeveloperHandleInspectionSchedule) {
    //     return await this.inspectionService.developerHandleInspectionSchedule(userId, dto);
    // };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner, Role.Agent, Role.Manager, Role.Staff)
    @Mutation("updateInspectionSchedule")
    async updateInspectionSchedule(@GraphqlGetUserId() userId: string, @Args("input") dto: UpdateInspectionSchedule) {
        return await this.inspectionService.updateInspectionSchedule(userId, dto);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner, Role.Agent, Role.Manager, Role.Staff)
    @Mutation("deleteInspectionSchedule")
    async deleteInspectionSchedule(@GraphqlGetUserId() userId: string, @Args("scheduleId") scheduleId: string) {
        return await this.inspectionService.deleteInspectionSchedule(userId, scheduleId);
    };

    @Mutation("deleteAllInspectionSchedules")
    async deleteAllInspectionSchedules() {
        return await this.inspectionService.deleteAllInspectionSchedules();
    };
}

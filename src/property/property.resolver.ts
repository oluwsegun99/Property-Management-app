import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { use } from 'passport';
import { GraphqlGetUserId } from 'src/common/decorators';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { AtGuard } from 'src/common/guards/at-guard';
import { RolesGuard } from 'src/common/guards/role-guard';
import { ApprovePurchaseRequest, CreateProject, CreateProperty, CreatePropertyPurchaseRequest, CreatePrototype, UpdateProject, UpdateProperty, UpdatePropertyPurchaseRequest, UpdatePrototype } from 'src/graphql';
import { PropertyService } from './property.service';

@Resolver()
export class PropertyResolver {
    constructor(private propertyService: PropertyService) { }

    @Query("getPropertyStatuses")
    async getPropertyStatuses() {
        return await this.propertyService.getPropertyStatuses();
    };

    @Query("getPropertyOptions")
    async getPropertyOptions() {
        return await this.propertyService.getPropertyOptions();
    };

    @Query("getPropertyCategories")
    async getPropertyCategories() {
        return await this.propertyService.getPropertyCategories();
    };

    @Query("getProjectStatuses")
    async getProjectStatuses() {
        return await this.propertyService.getProjectStatuses();
    };

    @Query("getPropertyMediaCategories")
    async getPropertyMediaCategories() {
        return await this.propertyService.getPropertyMediaCategories();
    };

    @Query("getProjectMediaCategories")
    async getProjectMediaCategories() {
        return await this.propertyService.getProjectMediaCategories();
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Mutation("createProject")
    async createProject(@GraphqlGetUserId() userId: string, @Args("input") dto: CreateProject) {
        return await this.propertyService.createProject(userId, dto);
    };

    @Query("getProjects")
    async getProjects() {
        return await this.propertyService.getProjects();
    };

    @Query("getProjectById")
    async getProjectById(@Args("projectId") projectId: string) {
        return await this.propertyService.getProjectById(projectId);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner, Role.Manager, Role.Agent, Role.Staff)
    @Query("getProjectsByCompany")
    async getProjectsByCompany(@GraphqlGetUserId() userId: string, @Args("companyId") companyId: string, @Args("cursor") cursor: string, @Args("sets") sets: number) {
        return await this.propertyService.getProjectsByCompany(userId, companyId, cursor, sets);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Mutation("updateProject")
    async updateProject(@GraphqlGetUserId() userId: string, @Args("input") dto: UpdateProject) {
        return await this.propertyService.updateProject(userId, dto);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Mutation("deleteProject")
    async deleteProject(@GraphqlGetUserId() userId: string, @Args("projectId") projectId: string) {
        return await this.propertyService.deleteProject(userId, projectId);
    };

    @Mutation("deleteAllProjects")
    async deleteAllProjects() {
        return await this.propertyService.deleteAllProjects();
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner, Role.Manager, Role.Staff)
    @Mutation("createPrototype")
    async createPrototype(@GraphqlGetUserId() userId: string, @Args("input") dto: CreatePrototype) {
        return await this.propertyService.createPrototype(userId, dto);
    };

    @Query("getPrototypes")
    async getPrototypes() {
        return await this.propertyService.getPrototypes();
    };

    @Query("getPrototypesByProject")
    async getPrototypesByProject(@Args("projectId") projectId: string) {
        return await this.propertyService.getPrototypesByProject(projectId);
    };

    @Query("getPrototypeById")
    async getPrototypeById(@Args("prototypeId") prototypeId: string) {
        return await this.propertyService.getPrototypeById(prototypeId);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner, Role.Manager, Role.Staff)
    @Mutation("updatePrototype")
    async updatePrototype(@GraphqlGetUserId() userId: string, @Args("input") dto: UpdatePrototype) {
        return await this.propertyService.updatePrototype(userId, dto);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner, Role.Manager, Role.Staff)
    @Mutation("deletePrototype")
    async deletePrototype(@GraphqlGetUserId() userId: string, @Args("prototypeId") prototypeId: string) {
        return await this.propertyService.deletePrototype(userId, prototypeId);
    };

    @Mutation("deletePrototype")
    async deleteAllPrototypes() {
        return await this.propertyService.deleteAllPrototypes();
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner, Role.Manager, Role.Staff)
    @Mutation("createProperty")
    async createProperty(@GraphqlGetUserId() userId: string, @Args("input") dto: CreateProperty) {
        return await this.propertyService.createProperty(userId, dto);
    };

    @Query("getProperties")
    async getProperties() {
        return await this.propertyService.getProperties();
    };

    @Query("getPropertiesByProject")
    async getPropertiesByProject(@Args("projectId") projectId: string) {
        return await this.propertyService.getPropertiesByProject(projectId);
    };

    @Query("getPropertiesByCompany")
    async getPropertiesByCompany(@Args("companyId") companyId: string) {
        return await this.propertyService.getPropertiesByCompany(companyId);
    };

    @Query("getPropertyByDeveloper")
    async getPropertyByDeveloper(@Args("developerId") developerId: string) {
        return await this.propertyService.getPropertyByDeveloper(developerId);
    };

    @Query("getPropertyById")
    async getPropertyById(@Args("propertyId") propertyId: string) {
        return await this.propertyService.getPropertyById(propertyId);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner, Role.Manager, Role.Staff)
    @Mutation("updateProperty")
    async updateProperty(@GraphqlGetUserId() userId: string, @Args("input") dto: UpdateProperty) {
        return await this.propertyService.updateProperty(userId, dto);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner, Role.Manager, Role.Staff)
    @Mutation("deleteProperty")
    async deleteProperty(@GraphqlGetUserId() userId: string, @Args("propertyId") propertyId: string) {
        return await this.propertyService.deleteProperty(userId, propertyId);
    };

    @Mutation("deleteAllPropertyCategories")
    async deleteAllPropertyCategories() {
        return await this.propertyService.deleteAllPropertyCategories();
    };

    @Mutation("deleteAllProperties")
    async deleteAllProperties() {
        return await this.propertyService.deleteAllProperties();
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Mutation("createPurchaseRequest")
    async createPurchaseRequest(@GraphqlGetUserId() userId: string, @Args("input") dto: CreatePropertyPurchaseRequest) {
        return await this.propertyService.createPurchaseRequest(userId, dto);
    };

    @Query("getPurchaseRequests")
    async getPurchaseRequests() {
        return await this.propertyService.getPurchaseRequests();
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Query("getPurchaseRequestsByUser")
    async getPurchaseRequestsByUser(@GraphqlGetUserId() userId: string) {
        return await this.propertyService.getPurchaseRequestsByUser(userId);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.SuperAdmin, Role.Admin)
    @Query("adminGetPurchaseRequests")
    async adminGetPurchaseRequests(@GraphqlGetUserId() adminId: string) {
        return await this.propertyService.adminGetPurchaseRequests(adminId);
    };

    @Query("getPurchaseRequestById")
    async getPurchaseRequestById(@Args("purchaseRequestId") purchaseRequestId: string) {
        return await this.propertyService.getPurchaseRequestById(purchaseRequestId);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Mutation("updatePurchaseRequest")
    async updatePurchaseRequest(@GraphqlGetUserId() userId: string, @Args("input") dto: UpdatePropertyPurchaseRequest) {
        return await this.propertyService.updatePurchaseRequest(userId, dto);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.SuperAdmin, Role.Admin)
    @Mutation("approvePurchaseRequest")
    async approvePurchaseRequest(@GraphqlGetUserId() adminId: string, @Args("input") dto: ApprovePurchaseRequest) {
        return await this.propertyService.approvePurchaseRequest(adminId, dto);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Mutation("deletePurchaseRequest")
    async deletePurchaseRequest(@GraphqlGetUserId() userId: string, @Args("purchaseRequestId") purchaseRequestId: string) {
        return await this.propertyService.deletePurchaseRequest(userId, purchaseRequestId);
    };

    @Mutation("deleteAllPurchaseRequest")
    async deleteAllPurchaseRequest() {
        return await this.propertyService.deleteAllPurchaseRequest();
    };
}

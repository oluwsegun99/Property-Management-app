import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { use } from 'passport';
import { GraphqlGetUserId } from 'src/common/decorators';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { AtGuard } from 'src/common/guards/at-guard';
import { RolesGuard } from 'src/common/guards/role-guard';
import { CreateProject, CreateProperty, CreatePrototype, UpdateProject, UpdateProperty, UpdatePrototype } from 'src/graphql';
import { PropertyService } from './property.service';

@Resolver()
export class PropertyResolver {
    constructor(private propertyService: PropertyService) { }

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
        return await this.propertyService.getProjectById(propertyId);
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
}

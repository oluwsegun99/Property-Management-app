import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlGetUserId } from 'src/common/decorators';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { AtGuard } from 'src/common/guards/at-guard';
import { RolesGuard } from 'src/common/guards/role-guard';
import { CreatePrequalification, UpdatePrequalification, UserCreateInvite } from 'src/graphql';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
    constructor(private userService: UserService) { }

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner, Role.Manager)
    @Mutation("userCreateInvite")
    async userCreateInvite(@GraphqlGetUserId() userId: string, @Args("input") dto: UserCreateInvite) {
        return await this.userService.userCreateInvite(userId, dto);
    };

    @Query("getAllUsers")
    async getAllUsers() {
        return await this.userService.getAllUsers();
    };

    @Mutation("deleteUserByEmail")
    async deleteUserByEmail(@Args("email") email: string) {
        return await this.userService.deleteUserByEmail(email);
    };

    @Mutation("deleteUserById")
    async deleteUserById(@Args("userId") userId: string) {
        return await this.userService.deleteUserById(userId);
    };

    @Mutation("deleteAllUsers")
    async deleteAllUsers() {
        return await this.userService.deleteAllUsers();
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Mutation("addPropertyToWishlist")
    async addPropertyToWishlist(@GraphqlGetUserId() userId: string, @Args("propertyId") propertyId: string) {
        return await this.userService.addPropertyToWishlist(userId, propertyId);
    };

    @Query("getAllUserWishlists")
    async getAllUserWishlists(@GraphqlGetUserId() userId: string) {
        return await this.userService.getAllUserWishlists();
    };

    @UseGuards(AtGuard, RolesGuard)
    @Query("getUserWishlistsByUser")
    async getUserWishlistsByUser(@GraphqlGetUserId() userId: string) {
        return await this.userService.getUserWishlistsByUser(userId);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Mutation("deletePropertyfromWishlist")
    async deletePropertyfromWishlist(@GraphqlGetUserId() userId: string, @Args("propertyId") propertyId: string) {
        return await this.userService.deletePropertyfromWishlist(userId, propertyId);
    };

    @Mutation("deleteAllUserWishlists")
    async deleteAllUserWishlists() {
        return await this.userService.deleteAllUserWishlists();
    };

    //OTHER PREQUALIFICATION ENDPOINTS IN ADMIN MODULE

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Mutation("createPrequalification")
    async createPrequalification(@GraphqlGetUserId() userId: string, @Args("input") dto: CreatePrequalification) {
        return await this.userService.createPrequalification(userId, dto);
    };

    @Query("getPrequalifications")
    async getPrequalifications() {
        return await this.userService.getPrequalifications();
    };

    @Query("getPrequalificationById")
    async getPrequalificationById(@Args("prequalificationId") prequalificationId: string) {
        return await this.userService.getPrequalificationById(prequalificationId);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Query("getPrequalificationsByUser")
    async getPrequalificationsByUser(@GraphqlGetUserId() userId: string) {
        return await this.userService.getPrequalificationsByUser(userId);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Mutation("updatePrequalification")
    async updatePrequalification(@GraphqlGetUserId() userId: string, @Args("input") dto: UpdatePrequalification) {
        return await this.userService.updatePrequalification(userId, dto);
    };

    @UseGuards(AtGuard, RolesGuard)
    @Roles(Role.Owner)
    @Mutation("deletePrequalification")
    async deletePrequalification(@GraphqlGetUserId() userId: string, @Args("prequalificationId") prequalificationId: string) {
        return await this.userService.deletePrequalification(userId, prequalificationId);
    };

    @Mutation("deleteAllPrequalifications")
    async deleteAllPrequalifications() {
        return await this.userService.deleteAllPrequalifications();
    };
}

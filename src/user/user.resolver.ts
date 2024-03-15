import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlGetUserId } from 'src/common/decorators';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { AtGuard } from 'src/common/guards/at-guard';
import { RolesGuard } from 'src/common/guards/role-guard';
import { UserCreateInvite } from 'src/graphql';
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
}

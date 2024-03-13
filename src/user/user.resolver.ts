import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
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
}

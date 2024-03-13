import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlGetUserId } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards/at-guard';
import { AdminSigninInput, AdminSignUpAfterInvite, AdminSignupInput, UserSigninInput, UserSignUpInput } from 'src/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
    constructor(
        private authService: AuthService
    ) { }

    @Mutation("signUp")
    async signUp(@Args("input") dto: UserSignUpInput) {
        return await this.authService.signUp(dto);
    };

    @Mutation("adminSignUp")
    async adminSignUp(@Args("input") dto: AdminSignupInput) {
        return await this.authService.adminSignUp(dto);
    };

    @Mutation("adminSignUpAfterInvite")
    async adminSignUpAfterInvite(@Args("input") dto: AdminSignUpAfterInvite) {
        return await this.authService.adminSignUpAfterInvite(dto);
    };

    @Mutation("signIn")
    async signIn(@Args("input") dto: UserSigninInput) {
        return await this.authService.signIn(dto);
    };

    @Mutation("adminSignIn")
    async adminSignIn(@Args("input") dto: AdminSigninInput) {
        return await this.authService.adminSignIn(dto);
    };

    @UseGuards(AtGuard)
    @Mutation("verification")
    async verification(@GraphqlGetUserId() userId: string, @Args("code") code: number) {
        return await this.authService.verification(userId, code);
    };

    @UseGuards(AtGuard)
    @Query("getUserById")
    async getUserById(@GraphqlGetUserId() userId: string) {
        return await this.authService.getUserById(userId)
    };
}

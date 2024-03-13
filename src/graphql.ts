
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AdminCreateInvite {
    fullname: string;
    email: string;
    mobile: string;
    roleId: string;
}

export interface AdminSignupInput {
    email: string;
    fullname: string;
    mobile: string;
    password: string;
}

export interface AdminSignUpAfterInvite {
    inviteId: string;
    password: string;
}

export interface AdminSigninInput {
    email: string;
    password: string;
    twoFACode: string;
}

export interface UserSignUpInput {
    email: string;
    fullname: string;
    mobile: string;
    password: string;
    isDeveloper?: Nullable<boolean>;
    hasCompany?: Nullable<boolean>;
}

export interface UserSigninInput {
    email: string;
    password: string;
}

export interface UserCreateInvite {
    email: string;
    fullname: string;
    mobile: string;
    developerCompanyId: string;
    roleId: string;
}

export interface UserSignUpAfterInvite {
    inviteId: string;
    password: string;
}

export interface Role {
    id?: Nullable<string>;
    roleName?: Nullable<string>;
    roleDescription?: Nullable<string>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export interface IQuery {
    getAllRoles(): Nullable<Nullable<Role>[]> | Promise<Nullable<Nullable<Role>[]>>;
    getUserById(): Nullable<User> | Promise<Nullable<User>>;
}

export interface AdminInvite {
    id?: Nullable<string>;
    fullname?: Nullable<string>;
    email?: Nullable<string>;
    mobile?: Nullable<string>;
    roleId?: Nullable<string>;
    role?: Nullable<Role>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export interface IMutation {
    createAdminInvite(input?: Nullable<AdminCreateInvite>): Nullable<AdminInvite> | Promise<Nullable<AdminInvite>>;
    signUp(input: UserSignUpInput): Nullable<UserSignUpResponse> | Promise<Nullable<UserSignUpResponse>>;
    userSignUpAfterInvite(input?: Nullable<UserSignUpAfterInvite>): Nullable<UserSignUpResponse> | Promise<Nullable<UserSignUpResponse>>;
    signIn(input: UserSigninInput): Nullable<UserSignInResponse> | Promise<Nullable<UserSignInResponse>>;
    adminSignUp(input: AdminSignupInput): Nullable<AdminSignUpResponse> | Promise<Nullable<AdminSignUpResponse>>;
    adminSignIn(input: AdminSigninInput): Nullable<AdminSignUpResponse> | Promise<Nullable<AdminSignUpResponse>>;
    adminSignUpAfterInvite(input: AdminSignUpAfterInvite): Nullable<AdminSignUpResponse> | Promise<Nullable<AdminSignUpResponse>>;
    verification(code: number): Nullable<boolean> | Promise<Nullable<boolean>>;
    userCreateInvite(input?: Nullable<UserCreateInvite>): Nullable<UserDeveloperInvite> | Promise<Nullable<UserDeveloperInvite>>;
}

export interface Admin {
    id?: Nullable<string>;
    fullname?: Nullable<string>;
    email?: Nullable<string>;
    mobile?: Nullable<string>;
    roleId?: Nullable<string>;
    role?: Nullable<Role>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export interface AdminSignUpResponse {
    email: string;
    access_token: string;
    refresh_token: string;
}

export interface User {
    id?: Nullable<string>;
    fullname?: Nullable<string>;
    email?: Nullable<string>;
    mobile?: Nullable<string>;
    vetted?: Nullable<boolean>;
    isDeveloper?: Nullable<boolean>;
    hasCompany?: Nullable<boolean>;
    roleId?: Nullable<string>;
    role?: Nullable<Role>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export interface UserSignUpResponse {
    access_token: string;
    refresh_token: string;
}

export interface UserSignInResponse {
    vetted?: Nullable<boolean>;
    verified?: Nullable<boolean>;
    token?: Nullable<UserSignUpResponse>;
}

export interface UserDeveloperInvite {
    id?: Nullable<string>;
    email?: Nullable<string>;
    fullname?: Nullable<string>;
    mobile?: Nullable<string>;
    accepted?: Nullable<boolean>;
    developerCompanyId?: Nullable<string>;
    developerCompany?: Nullable<DeveloperCompany>;
    roleId?: Nullable<string>;
    role?: Nullable<Role>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export interface DeveloperCompany {
    id?: Nullable<string>;
    companyName?: Nullable<string>;
    companyEmail?: Nullable<string>;
    companyMobile?: Nullable<string>;
    vetted?: Nullable<string>;
    ownedById?: Nullable<string>;
    ownedBy?: Nullable<User>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export interface UserDeveloperCompany {
    id?: Nullable<string>;
    developerCompanyId?: Nullable<string>;
    developerCompany?: Nullable<DeveloperCompany>;
    userId?: Nullable<string>;
    user?: Nullable<User>;
    isOwner?: Nullable<boolean>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

type Nullable<T> = T | null;

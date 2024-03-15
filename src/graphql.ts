
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

export interface CreateDeveloperCompany {
    companyName: string;
    companyEmail: string;
    companyMobile: string;
    companyTypeId: number;
    registrationNumber?: Nullable<string>;
    address?: Nullable<string>;
}

export interface UpdateDeveloperCompany {
    companyId: string;
    companyName?: Nullable<string>;
    companyEmail?: Nullable<string>;
    companyMobile?: Nullable<string>;
    registrationNumber?: Nullable<string>;
    companyLogo?: Nullable<string>;
    description?: Nullable<string>;
    website?: Nullable<string>;
    address?: Nullable<string>;
    companyTypeId?: Nullable<number>;
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
    getUserDeveloperRoles(): Nullable<Nullable<Role>[]> | Promise<Nullable<Nullable<Role>[]>>;
    getAdminRoles(): Nullable<Nullable<Role>[]> | Promise<Nullable<Nullable<Role>[]>>;
    getUserById(): Nullable<User> | Promise<Nullable<User>>;
    getAdminById(): Nullable<Admin> | Promise<Nullable<Admin>>;
    getAllUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    getDeveloperCompanies(): Nullable<Nullable<DeveloperCompany>[]> | Promise<Nullable<Nullable<DeveloperCompany>[]>>;
    getDeveloperCompanyById(companyId: string): Nullable<DeveloperCompany> | Promise<Nullable<DeveloperCompany>>;
    getDeveloperCompanyByUser(): Nullable<DeveloperCompany> | Promise<Nullable<DeveloperCompany>>;
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
    userSignUpAfterInvite(input: UserSignUpAfterInvite): Nullable<UserSignUpResponse> | Promise<Nullable<UserSignUpResponse>>;
    signIn(input: UserSigninInput): Nullable<UserSignInResponse> | Promise<Nullable<UserSignInResponse>>;
    adminSignUp(input: AdminSignupInput): Nullable<AdminSignUpResponse> | Promise<Nullable<AdminSignUpResponse>>;
    adminSignIn(input: AdminSigninInput): Nullable<AdminSignUpResponse> | Promise<Nullable<AdminSignUpResponse>>;
    adminSignUpAfterInvite(input: AdminSignUpAfterInvite): Nullable<AdminSignUpResponse> | Promise<Nullable<AdminSignUpResponse>>;
    resendVerificationCode(): Nullable<boolean> | Promise<Nullable<boolean>>;
    verification(code: number): Nullable<boolean> | Promise<Nullable<boolean>>;
    logOut(): Nullable<boolean> | Promise<Nullable<boolean>>;
    adminLogOut(): Nullable<boolean> | Promise<Nullable<boolean>>;
    userCreateInvite(input?: Nullable<UserCreateInvite>): Nullable<UserDeveloperInvite> | Promise<Nullable<UserDeveloperInvite>>;
    deleteUserByEmail(email: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    deleteUserById(userId: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    deleteAllUsers(): Nullable<boolean> | Promise<Nullable<boolean>>;
    createDeveloperCompany(input?: Nullable<CreateDeveloperCompany>): Nullable<DeveloperCompany> | Promise<Nullable<DeveloperCompany>>;
    updateDeveloperCompany(input?: Nullable<UpdateDeveloperCompany>): Nullable<DeveloperCompany> | Promise<Nullable<DeveloperCompany>>;
    deleteDeveloperCompany(companyId: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    deleteAllDeveloperCompanies(): Nullable<boolean> | Promise<Nullable<boolean>>;
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

export interface TokenResponse {
    access_token: string;
    refresh_token: string;
}

export interface UserSignUpResponse {
    user?: Nullable<User>;
    token?: Nullable<TokenResponse>;
}

export interface UserSignInResponse {
    vetted?: Nullable<boolean>;
    verified?: Nullable<boolean>;
    user?: Nullable<User>;
    token?: Nullable<TokenResponse>;
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

export interface CompanyType {
    id?: Nullable<number>;
    type?: Nullable<string>;
}

export interface DeveloperCompany {
    id?: Nullable<string>;
    companyName?: Nullable<string>;
    companyEmail?: Nullable<string>;
    companyMobile?: Nullable<string>;
    registrationNumber?: Nullable<string>;
    companyLogo?: Nullable<string>;
    description?: Nullable<string>;
    website?: Nullable<string>;
    address?: Nullable<string>;
    companyTypeId?: Nullable<number>;
    companyType?: Nullable<CompanyType>;
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

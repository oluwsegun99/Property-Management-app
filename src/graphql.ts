
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class AdminCreateInvite {
    fullname: string;
    email: string;
    mobile: string;
    roleId: string;
}

export class AdminSignupInput {
    email: string;
    fullname: string;
    mobile: string;
    password: string;
}

export class AdminSignUpAfterInvite {
    inviteId: string;
    password: string;
}

export class AdminSigninInput {
    email: string;
    password: string;
    twoFACode?: Nullable<string>;
}

export class UserSignUpInput {
    email: string;
    fullname: string;
    mobile: string;
    password: string;
    isDeveloper?: Nullable<boolean>;
    hasCompany?: Nullable<boolean>;
}

export class UserSigninInput {
    email: string;
    password: string;
}

export class UserCreateInvite {
    email: string;
    fullname: string;
    mobile: string;
    developerCompanyId: string;
    roleId: string;
}

export class UserSignUpAfterInvite {
    inviteId: string;
    password: string;
}

export class CreateDeveloperCompany {
    companyName: string;
    companyEmail: string;
    companyMobile: string;
    companyTypeId: number;
    registrationNumber?: Nullable<string>;
    address?: Nullable<string>;
}

export class UpdateDeveloperCompany {
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

export class CreateProjectMedia {
    projectMediaCategoryId: string;
    mediaUrl: string;
    description?: Nullable<string>;
    index?: Nullable<number>;
}

export class CreateProject {
    projectName: string;
    description: string;
    address: string;
    cityId: string;
    projectStatusId: number;
    developerCompanyId?: Nullable<string>;
    neighborhoodId?: Nullable<string>;
    projectMedia?: Nullable<Nullable<CreateProjectMedia>[]>;
}

export class UpdateProject {
    projectId: string;
    projectName?: Nullable<string>;
    description?: Nullable<string>;
    address?: Nullable<string>;
    projectLayoutUrl?: Nullable<string>;
    cityId?: Nullable<string>;
    neighborhoodId?: Nullable<string>;
    projectStatusId?: Nullable<number>;
    projectMedia?: Nullable<Nullable<CreateProjectMedia>[]>;
}

export class CreatePrototypeMedia {
    propertyMediaCategoryId: string;
    index?: Nullable<number>;
    mediaUrl: string;
    description?: Nullable<string>;
}

export class CreatePrototype {
    prototypeName: string;
    description: string;
    projectId: string;
    categoryId?: Nullable<string>;
    prototypeMedia?: Nullable<Nullable<CreatePrototypeMedia>[]>;
}

export class UpdatePrototype {
    prototypeId: string;
    prototypeName?: Nullable<string>;
    description?: Nullable<string>;
    categoryId?: Nullable<string>;
    mediaUrl?: Nullable<string>;
}

export class CreatePropertyDetails {
    address: string;
    longitude: string;
    latitude: string;
    bedrooms: number;
    bathrooms: number;
    toilets: number;
    floors: number;
    sizeSqft: number;
    dateCompleted: Date;
    parkingSpaces: number;
    isFurnished?: Nullable<boolean>;
    hasPool?: Nullable<boolean>;
    hasGarden?: Nullable<boolean>;
    isNewConstruction?: Nullable<boolean>;
    canPayInstallment?: Nullable<boolean>;
    canMortgage?: Nullable<boolean>;
    neighborhoodId?: Nullable<string>;
    propertyOptionId: number;
}

export class UpdatePropertyDetails {
    address?: Nullable<string>;
    longitude?: Nullable<string>;
    latitude?: Nullable<string>;
    bedrooms?: Nullable<number>;
    bathrooms?: Nullable<number>;
    toilets?: Nullable<number>;
    floors?: Nullable<number>;
    sizeSqft?: Nullable<number>;
    dateCompleted?: Nullable<Date>;
    parkingSpaces?: Nullable<number>;
    isFurnished?: Nullable<boolean>;
    hasPool?: Nullable<boolean>;
    hasGarden?: Nullable<boolean>;
    isNewConstruction?: Nullable<boolean>;
    canPayInstallment?: Nullable<boolean>;
    canMortgage?: Nullable<boolean>;
    neighborhoodId?: Nullable<string>;
    propertyOptionId?: Nullable<number>;
}

export class CreatePropertyMedia {
    index?: Nullable<number>;
    mediaUrl: string;
    mediaCategoryId: string;
    description?: Nullable<string>;
}

export class CreateProperty {
    name: string;
    description: string;
    price: number;
    categoryId: string;
    propertyStatusId: number;
    projectId?: Nullable<string>;
    prototypeId?: Nullable<string>;
    cityId: string;
    developerCompanyId?: Nullable<string>;
    propertyDetail: CreatePropertyDetails;
    propertyMedia?: Nullable<Nullable<CreatePropertyMedia>[]>;
}

export class UpdateProperty {
    propertyId: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    price?: Nullable<number>;
    categoryId?: Nullable<string>;
    propertyStatusId?: Nullable<number>;
    projectId?: Nullable<string>;
    prototypeId?: Nullable<string>;
    cityId?: Nullable<string>;
    propertyDetail?: Nullable<UpdatePropertyDetails>;
    propertyMedia?: Nullable<Nullable<CreatePropertyMedia>[]>;
}

export class CreateInspectionSchedule {
    propertyId: string;
    dateScheduled: DateTime;
    inspectionTypeId: number;
}

export class UpdateInspectionSchedule {
    scheduleId: string;
    dateScheduled?: Nullable<DateTime>;
    inspectionTypeId?: Nullable<number>;
}

export class AdminHandleInspectionSchedule {
    inspectionStatusId: number;
    scheduleId: string;
}

export class DeveloperHandleInspectionSchedule {
    scheduleId: string;
    inspectionStatusId: number;
    agentId?: Nullable<string>;
}

export class CreatePrequalification {
    fullname: string;
    email: string;
    incomeMonthly: number;
    isSelfEmployed?: Nullable<boolean>;
    companyName?: Nullable<string>;
    companyAddress?: Nullable<string>;
    isJointApplication?: Nullable<boolean>;
    spouseEmail?: Nullable<string>;
}

export class UpdatePrequalification {
    prequalificationId: string;
    fullname?: Nullable<string>;
    email?: Nullable<string>;
    incomeMonthly?: Nullable<number>;
    isSelfEmployed?: Nullable<boolean>;
    companyName?: Nullable<string>;
    companyAddress?: Nullable<string>;
    isJointApplication?: Nullable<boolean>;
    spouseEmail?: Nullable<string>;
}

export class AdminApprovePrequalification {
    prequalificationId: string;
    prequalificationStatusId: number;
}

export class CreateInvestmentPayment {
    reference: string;
    amountPaid: number;
    datePaid: DateTime;
    investmentId: string;
    investmentPaymentScheduleId: string;
    userWalletId: string;
}

export class CreateInvestment {
    description: string;
    totalAmount: number;
    startDate: Date;
    duration: number;
    investmentFrequencyId: number;
}

export class UpdateInvestment {
    investmentId: string;
    description?: Nullable<string>;
    totalAmount?: Nullable<number>;
    startDate?: Nullable<Date>;
    duration?: Nullable<number>;
    investmentFrequencyId?: Nullable<number>;
}

export class ResumeInvestment {
    investmentId: string;
    resumeDate: Date;
}

export class Role {
    id?: Nullable<string>;
    roleName?: Nullable<string>;
    roleDescription?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export abstract class IQuery {
    abstract getAllRoles(): Nullable<Nullable<Role>[]> | Promise<Nullable<Nullable<Role>[]>>;

    abstract getUserDeveloperRoles(): Nullable<Nullable<Role>[]> | Promise<Nullable<Nullable<Role>[]>>;

    abstract getAdminRoles(): Nullable<Nullable<Role>[]> | Promise<Nullable<Nullable<Role>[]>>;

    abstract getUserById(): Nullable<User> | Promise<Nullable<User>>;

    abstract getAdminById(): Nullable<Admin> | Promise<Nullable<Admin>>;

    abstract getAllUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract getAllUserWishlists(): Nullable<Nullable<UserWishlist>[]> | Promise<Nullable<Nullable<UserWishlist>[]>>;

    abstract getUserWishlistsByUser(): Nullable<Nullable<Property>[]> | Promise<Nullable<Nullable<Property>[]>>;

    abstract getUserWishlistById(wishlistId: string): Nullable<UserWishlist> | Promise<Nullable<UserWishlist>>;

    abstract getCompanyTypes(): Nullable<Nullable<CompanyType>[]> | Promise<Nullable<Nullable<CompanyType>[]>>;

    abstract getDeveloperCompanies(): Nullable<Nullable<DeveloperCompany>[]> | Promise<Nullable<Nullable<DeveloperCompany>[]>>;

    abstract getDeveloperCompanyById(companyId: string): Nullable<DeveloperCompany> | Promise<Nullable<DeveloperCompany>>;

    abstract getDeveloperCompanyByUser(): Nullable<DeveloperCompany> | Promise<Nullable<DeveloperCompany>>;

    abstract getStates(): Nullable<Nullable<State>[]> | Promise<Nullable<Nullable<State>[]>>;

    abstract getCities(): Nullable<Nullable<City>[]> | Promise<Nullable<Nullable<City>[]>>;

    abstract getCitiesByStateId(stateId: string): Nullable<Nullable<City>[]> | Promise<Nullable<Nullable<City>[]>>;

    abstract getPropertyStatuses(): Nullable<Nullable<PropertyStatus>[]> | Promise<Nullable<Nullable<PropertyStatus>[]>>;

    abstract getPropertyOptions(): Nullable<Nullable<PropertyOption>[]> | Promise<Nullable<Nullable<PropertyOption>[]>>;

    abstract getPropertyCategories(): Nullable<Nullable<PropertyCategory>[]> | Promise<Nullable<Nullable<PropertyCategory>[]>>;

    abstract getProjectStatuses(): Nullable<Nullable<ProjectStatus>[]> | Promise<Nullable<Nullable<ProjectStatus>[]>>;

    abstract getPropertyMediaCategories(): Nullable<Nullable<PropertyMediaCategory>[]> | Promise<Nullable<Nullable<PropertyMediaCategory>[]>>;

    abstract getProjectMediaCategories(): Nullable<Nullable<ProjectMediaCategory>[]> | Promise<Nullable<Nullable<ProjectMediaCategory>[]>>;

    abstract getProjects(): Nullable<Nullable<Project>[]> | Promise<Nullable<Nullable<Project>[]>>;

    abstract getProjectById(projectId: string): Nullable<Project> | Promise<Nullable<Project>>;

    abstract getProjectsByCompany(companyId: string, cursor?: Nullable<string>, sets?: Nullable<number>): Nullable<ProjectByCompanyResponse> | Promise<Nullable<ProjectByCompanyResponse>>;

    abstract getPrototypes(): Nullable<Nullable<Prototype>[]> | Promise<Nullable<Nullable<Prototype>[]>>;

    abstract getPrototypesByProject(projectId: string): Nullable<Nullable<Prototype>[]> | Promise<Nullable<Nullable<Prototype>[]>>;

    abstract getPrototypeById(prototypeId: string): Nullable<Prototype> | Promise<Nullable<Prototype>>;

    abstract getProperties(): Nullable<Nullable<Property>[]> | Promise<Nullable<Nullable<Property>[]>>;

    abstract getPropertiesByProject(projectId: string): Nullable<Nullable<Property>[]> | Promise<Nullable<Nullable<Property>[]>>;

    abstract getPropertiesByCompany(companyId: string): Nullable<Nullable<Property>[]> | Promise<Nullable<Nullable<Property>[]>>;

    abstract getPropertyByDeveloper(developerId: string): Nullable<Nullable<Property>[]> | Promise<Nullable<Nullable<Property>[]>>;

    abstract getPropertyById(propertyId: string): Nullable<Property> | Promise<Nullable<Property>>;

    abstract getInspectionTypes(): Nullable<Nullable<InspectionType>[]> | Promise<Nullable<Nullable<InspectionType>[]>>;

    abstract getInspectionStatus(): Nullable<Nullable<InspectionStatus>[]> | Promise<Nullable<Nullable<InspectionStatus>[]>>;

    abstract adminGetInspectionSchedules(monthValue?: Nullable<number>): Nullable<Nullable<InspectionCalendarLog>[]> | Promise<Nullable<Nullable<InspectionCalendarLog>[]>>;

    abstract getInspectionScheduleByDeveloper(monthValue?: Nullable<number>): Nullable<Nullable<InspectionCalendarLog>[]> | Promise<Nullable<Nullable<InspectionCalendarLog>[]>>;

    abstract userGetInspectionSchedules(): Nullable<Nullable<InspectionSchedule>[]> | Promise<Nullable<Nullable<InspectionSchedule>[]>>;

    abstract getInspectionSchedules(): Nullable<Nullable<InspectionSchedule>[]> | Promise<Nullable<Nullable<InspectionSchedule>[]>>;

    abstract getInpectionScheduleById(scheduleId: string): Nullable<InspectionSchedule> | Promise<Nullable<InspectionSchedule>>;

    abstract adminViewPrequalifications(): Nullable<Nullable<Prequalification>[]> | Promise<Nullable<Nullable<Prequalification>[]>>;

    abstract getPrequalifications(): Nullable<Nullable<Prequalification>[]> | Promise<Nullable<Nullable<Prequalification>[]>>;

    abstract getPrequalificationById(prequalificationId: string): Nullable<Prequalification> | Promise<Nullable<Prequalification>>;

    abstract getPrequalificationsByUser(): Nullable<Nullable<Prequalification>[]> | Promise<Nullable<Nullable<Prequalification>[]>>;

    abstract getInvestments(): Nullable<Nullable<Investment>[]> | Promise<Nullable<Nullable<Investment>[]>>;

    abstract getInvestementsByUser(): Nullable<Nullable<Investment>[]> | Promise<Nullable<Nullable<Investment>[]>>;

    abstract adminGetInvestments(): Nullable<Nullable<Investment>[]> | Promise<Nullable<Nullable<Investment>[]>>;
}

export class AdminInvite {
    id?: Nullable<string>;
    fullname?: Nullable<string>;
    email?: Nullable<string>;
    mobile?: Nullable<string>;
    roleId?: Nullable<string>;
    role?: Nullable<Role>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export abstract class IMutation {
    abstract createAdminInvite(input?: Nullable<AdminCreateInvite>): Nullable<AdminInvite> | Promise<Nullable<AdminInvite>>;

    abstract signUp(input: UserSignUpInput): Nullable<UserSignUpResponse> | Promise<Nullable<UserSignUpResponse>>;

    abstract userSignUpAfterInvite(input: UserSignUpAfterInvite): Nullable<UserSignUpResponse> | Promise<Nullable<UserSignUpResponse>>;

    abstract signIn(input: UserSigninInput): Nullable<UserSignInResponse> | Promise<Nullable<UserSignInResponse>>;

    abstract adminSignUp(input: AdminSignupInput): Nullable<AdminSignUpResponse> | Promise<Nullable<AdminSignUpResponse>>;

    abstract adminSignIn(input: AdminSigninInput): Nullable<AdminSignUpResponse> | Promise<Nullable<AdminSignUpResponse>>;

    abstract adminSignUpAfterInvite(input: AdminSignUpAfterInvite): Nullable<AdminSignUpResponse> | Promise<Nullable<AdminSignUpResponse>>;

    abstract resendVerificationCode(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract verification(code: number): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract logOut(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract adminLogOut(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract userCreateInvite(input?: Nullable<UserCreateInvite>): Nullable<UserDeveloperInvite> | Promise<Nullable<UserDeveloperInvite>>;

    abstract deleteUserByEmail(email: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract deleteUserById(userId: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract deleteAllUsers(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract addPropertyToWishlist(propertyId: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract deletePropertyfromWishlist(propertyId: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract deleteAllUserWishlists(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract generateQrCodeDataURL(): string | Promise<string>;

    abstract turnOnTwoFactorAuth(twoFACode: string): boolean | Promise<boolean>;

    abstract createDeveloperCompany(input?: Nullable<CreateDeveloperCompany>): Nullable<DeveloperCompany> | Promise<Nullable<DeveloperCompany>>;

    abstract updateDeveloperCompany(input?: Nullable<UpdateDeveloperCompany>): Nullable<DeveloperCompany> | Promise<Nullable<DeveloperCompany>>;

    abstract deleteDeveloperCompany(companyId: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract deleteAllDeveloperCompanies(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createProject(input: CreateProject): Nullable<Project> | Promise<Nullable<Project>>;

    abstract updateProject(input: UpdateProject): Nullable<Project> | Promise<Nullable<Project>>;

    abstract deleteProject(projectId: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract deleteAllProjects(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createPrototype(input: CreatePrototype): Nullable<Prototype> | Promise<Nullable<Prototype>>;

    abstract updatePrototype(input: UpdatePrototype): Nullable<Prototype> | Promise<Nullable<Prototype>>;

    abstract deletePrototype(prototypeId: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract deleteAllPrototypes(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createProperty(input: CreateProperty): Nullable<Property> | Promise<Nullable<Property>>;

    abstract updateProperty(input: UpdateProperty): Nullable<Property> | Promise<Nullable<Property>>;

    abstract deleteProperty(propertyId: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract deleteAllPropertyCategories(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract deleteAllProperties(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createInspectionSchedule(input: CreateInspectionSchedule): Nullable<InspectionSchedule> | Promise<Nullable<InspectionSchedule>>;

    abstract adminHandleInspectionSchedule(input: AdminHandleInspectionSchedule): string | Promise<string>;

    abstract developerHandleInspectionSchedule(input: DeveloperHandleInspectionSchedule): InspectionScheduleSlip | Promise<InspectionScheduleSlip>;

    abstract updateInspectionSchedule(input: UpdateInspectionSchedule): Nullable<InspectionSchedule> | Promise<Nullable<InspectionSchedule>>;

    abstract deleteInspectionSchedule(scheduleId: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract deleteAllInspectionSchedules(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createPrequalification(input: CreatePrequalification): Nullable<Prequalification> | Promise<Nullable<Prequalification>>;

    abstract updatePrequalification(input: UpdatePrequalification): Nullable<Prequalification> | Promise<Nullable<Prequalification>>;

    abstract deletePrequalification(prequalificationId: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract deleteAllPrequalifications(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract adminApprovePrequalification(input: AdminApprovePrequalification): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createInvestment(input: CreateInvestment): Nullable<Investment> | Promise<Nullable<Investment>>;

    abstract updateInvestment(input: UpdateInvestment): Nullable<Investment> | Promise<Nullable<Investment>>;

    abstract pauseInvestment(investmentId: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract resumeInvestment(input?: Nullable<ResumeInvestment>): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract endInvestment(investmentId: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract deleteInvestment(investmentId: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract deleteAllInvestements(): Nullable<boolean> | Promise<Nullable<boolean>>;
}

export class Admin {
    id?: Nullable<string>;
    fullname?: Nullable<string>;
    email?: Nullable<string>;
    mobile?: Nullable<string>;
    roleId?: Nullable<string>;
    role?: Nullable<Role>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class AdminSignUpResponse {
    email: string;
    access_token: string;
    refresh_token: string;
}

export class User {
    id?: Nullable<string>;
    fullname?: Nullable<string>;
    email?: Nullable<string>;
    mobile?: Nullable<string>;
    vetted?: Nullable<boolean>;
    isDeveloper?: Nullable<boolean>;
    hasCompany?: Nullable<boolean>;
    roleId?: Nullable<string>;
    role?: Nullable<Role>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    userWallet?: Nullable<UserWallet>;
}

export class UserWishlist {
    id?: Nullable<string>;
    propertyId?: Nullable<string>;
    property?: Nullable<Property>;
    userId?: Nullable<string>;
    user?: Nullable<User>;
    createdAt?: Nullable<DateTime>;
}

export class UserWallet {
    id?: Nullable<string>;
    accountNumber?: Nullable<string>;
    balance?: Nullable<number>;
    savings?: Nullable<number>;
    total?: Nullable<number>;
    userId?: Nullable<string>;
    user?: Nullable<User>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    investmentPayments?: Nullable<Nullable<InvestmentPayment>[]>;
}

export class TokenResponse {
    access_token: string;
    refresh_token: string;
}

export class UserSignUpResponse {
    user?: Nullable<User>;
    token?: Nullable<TokenResponse>;
}

export class UserSignInResponse {
    vetted?: Nullable<boolean>;
    verified?: Nullable<boolean>;
    hasDeveloperCompany?: Nullable<boolean>;
    user?: Nullable<User>;
    token?: Nullable<TokenResponse>;
}

export class UserDeveloperInvite {
    id?: Nullable<string>;
    email?: Nullable<string>;
    fullname?: Nullable<string>;
    mobile?: Nullable<string>;
    accepted?: Nullable<boolean>;
    developerCompanyId?: Nullable<string>;
    developerCompany?: Nullable<DeveloperCompany>;
    roleId?: Nullable<string>;
    role?: Nullable<Role>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class CompanyType {
    id?: Nullable<number>;
    type?: Nullable<string>;
}

export class DeveloperCompany {
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
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class UserDeveloperCompany {
    id?: Nullable<string>;
    developerCompanyId?: Nullable<string>;
    developerCompany?: Nullable<DeveloperCompany>;
    userId?: Nullable<string>;
    user?: Nullable<User>;
    isOwner?: Nullable<boolean>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class Country {
    id?: Nullable<string>;
    countryName?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    states?: Nullable<Nullable<State>[]>;
}

export class State {
    id?: Nullable<string>;
    stateName?: Nullable<string>;
    countryId?: Nullable<string>;
    country?: Nullable<Country>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    cities?: Nullable<Nullable<City>[]>;
}

export class City {
    id?: Nullable<string>;
    cityName?: Nullable<string>;
    stateId?: Nullable<string>;
    state?: Nullable<State>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    neighborhoods?: Nullable<Nullable<Neighborhood>[]>;
    projects?: Nullable<Nullable<Project>[]>;
    properties?: Nullable<Nullable<Property>[]>;
}

export class Neighborhood {
    id?: Nullable<string>;
    name?: Nullable<string>;
    cityId?: Nullable<string>;
    city?: Nullable<City>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    projects?: Nullable<Nullable<Project>[]>;
    propertyDetails?: Nullable<Nullable<PropertyDetail>[]>;
}

export class PropertyStatus {
    id?: Nullable<number>;
    propertyStatus?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    properties?: Nullable<Nullable<Property>[]>;
}

export class PropertyOption {
    id?: Nullable<number>;
    propertyOption?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    propertyDetails?: Nullable<Nullable<PropertyDetail>[]>;
}

export class PropertyCategory {
    id?: Nullable<string>;
    categoryName?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    prototypes?: Nullable<Nullable<Prototype>[]>;
    properties?: Nullable<Nullable<Property>[]>;
}

export class ProjectStatus {
    id?: Nullable<number>;
    projectStatus?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    projects?: Nullable<Nullable<Project>[]>;
}

export class Project {
    id?: Nullable<string>;
    projectName?: Nullable<string>;
    description?: Nullable<string>;
    address?: Nullable<string>;
    projectLayoutUrl?: Nullable<string>;
    cityId?: Nullable<string>;
    city?: Nullable<City>;
    neighborhoodId?: Nullable<string>;
    neighborhood?: Nullable<Neighborhood>;
    userId?: Nullable<string>;
    user?: Nullable<User>;
    developerCompanyId?: Nullable<string>;
    developerCompany?: Nullable<DeveloperCompany>;
    projectStatusId?: Nullable<number>;
    projectStatus?: Nullable<ProjectStatus>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    prototypes?: Nullable<Nullable<Prototype>[]>;
    properties?: Nullable<Nullable<Property>[]>;
    projectsMedia?: Nullable<Nullable<ProjectMedia>[]>;
}

export class ProjectMediaCategory {
    id?: Nullable<string>;
    mediaCategory?: Nullable<string>;
    required?: Nullable<boolean>;
    createdAt?: Nullable<DateTime>;
    projectsMedia?: Nullable<Nullable<ProjectMedia>[]>;
}

export class ProjectMedia {
    id?: Nullable<string>;
    projectId?: Nullable<string>;
    project?: Nullable<Project>;
    projectMediaCategoryId?: Nullable<string>;
    projectMediaCategory?: Nullable<ProjectMediaCategory>;
    index?: Nullable<number>;
    mediaUrl?: Nullable<string>;
    description?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class ProjectByCompanyResponse {
    projectsByCompany?: Nullable<Nullable<Project>[]>;
    cursorId?: Nullable<string>;
}

export class Prototype {
    id?: Nullable<string>;
    prototypeName?: Nullable<string>;
    description?: Nullable<string>;
    mediaUrl?: Nullable<string>;
    categoryId?: Nullable<string>;
    category?: Nullable<PropertyCategory>;
    projectId?: Nullable<string>;
    project?: Nullable<Project>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    properties?: Nullable<Nullable<Property>[]>;
    prototypesMedia?: Nullable<Nullable<PrototypeMedia>[]>;
}

export class PrototypeMedia {
    id?: Nullable<string>;
    prototypeId?: Nullable<string>;
    prototype?: Nullable<Prototype>;
    propertyMediaCategoryId?: Nullable<string>;
    propertyMediaCategory?: Nullable<PropertyMediaCategory>;
    index?: Nullable<number>;
    mediaUrl?: Nullable<string>;
    description?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class RequestUpdateStatus {
    id?: Nullable<number>;
    requestUpdateStatus?: Nullable<string>;
    createdAt?: Nullable<Date>;
    propertyUpdateRequests?: Nullable<Nullable<PropertyUpdateRequest>[]>;
}

export class Property {
    id?: Nullable<string>;
    name?: Nullable<string>;
    description?: Nullable<string>;
    price?: Nullable<number>;
    categoryId?: Nullable<string>;
    category?: Nullable<PropertyCategory>;
    propertyStatusId?: Nullable<number>;
    propertyStatus?: Nullable<PropertyStatus>;
    projectId?: Nullable<string>;
    project?: Nullable<Project>;
    prototypeId?: Nullable<string>;
    prototype?: Nullable<Prototype>;
    cityId?: Nullable<string>;
    city?: Nullable<City>;
    developedById?: Nullable<string>;
    developedBy?: Nullable<User>;
    developerCompanyId?: Nullable<string>;
    developerCompany?: Nullable<DeveloperCompany>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    propertyDetail?: Nullable<PropertyDetail>;
    propertiesMedia?: Nullable<Nullable<PropertyMedia>[]>;
    propertyUpdateRequests?: Nullable<Nullable<PropertyUpdateRequest>[]>;
    propertyOwned?: Nullable<PropertyOwned>;
    rents?: Nullable<Nullable<PropertyRented>[]>;
    propertiesCostHistory?: Nullable<Nullable<PropertyCostHistory>[]>;
    propertyPurchaseRequests?: Nullable<Nullable<PropertyPurchaseRequest>[]>;
}

export class PropertyDetail {
    id?: Nullable<string>;
    property?: Nullable<Property>;
    address?: Nullable<string>;
    longitude?: Nullable<string>;
    latitude?: Nullable<string>;
    bedrooms?: Nullable<number>;
    bathrooms?: Nullable<number>;
    toilets?: Nullable<number>;
    floors?: Nullable<number>;
    sizeSqft?: Nullable<number>;
    dateCompleted?: Nullable<Date>;
    parkingSpaces?: Nullable<number>;
    isFurnished?: Nullable<boolean>;
    hasPool?: Nullable<boolean>;
    hasGarden?: Nullable<boolean>;
    isNewConstruction?: Nullable<boolean>;
    canPayInstallment?: Nullable<boolean>;
    canMortgage?: Nullable<boolean>;
    neighborhoodId?: Nullable<string>;
    neighborhood?: Nullable<Neighborhood>;
    propertyOptionId?: Nullable<number>;
    propertyOption?: Nullable<PropertyOption>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class PropertyUpdateRequest {
    id?: Nullable<string>;
    description?: Nullable<string>;
    requestUpdateStatusId?: Nullable<number>;
    requestUpdateStatus?: Nullable<RequestUpdateStatus>;
    propertyId?: Nullable<string>;
    property?: Nullable<Property>;
    userId?: Nullable<string>;
    user?: Nullable<User>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class PropertyOwned {
    propertyId?: Nullable<string>;
    property?: Nullable<Property>;
    userId?: Nullable<string>;
    user?: Nullable<User>;
    purchaseDate?: Nullable<DateTime>;
    createdAt?: Nullable<DateTime>;
}

export class PropertyRented {
    id?: Nullable<string>;
    propertyId?: Nullable<string>;
    property?: Nullable<Property>;
    userId?: Nullable<string>;
    user?: Nullable<User>;
    rentDateStart?: Nullable<DateTime>;
    rentDateEnd?: Nullable<DateTime>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class PropertyMediaCategory {
    id?: Nullable<string>;
    mediaCategory?: Nullable<string>;
    required?: Nullable<boolean>;
    createdAt?: Nullable<DateTime>;
    propertiesMedia?: Nullable<Nullable<PropertyMedia>[]>;
}

export class PropertyMedia {
    id?: Nullable<string>;
    propertyId?: Nullable<string>;
    property?: Nullable<Property>;
    index?: Nullable<number>;
    mediaUrl?: Nullable<string>;
    propertyMediaCategoryId?: Nullable<string>;
    propertyMediaCategory?: Nullable<PropertyMediaCategory>;
    description?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class PropertyCostHistory {
    id?: Nullable<string>;
    propertyId?: Nullable<string>;
    property?: Nullable<Property>;
    price?: Nullable<number>;
    effectiveDate?: Nullable<DateTime>;
    createdAt?: Nullable<DateTime>;
}

export class PurchaseRequestType {
    id?: Nullable<number>;
    purchaseRequestType?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    propertyPurchaseRequests?: Nullable<Nullable<PropertyPurchaseRequest>[]>;
}

export class DurationType {
    id?: Nullable<number>;
    durationType?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    propertyPurchaseRequests?: Nullable<Nullable<PropertyPurchaseRequest>[]>;
}

export class PropertyPurchaseRequest {
    id?: Nullable<string>;
    propertyId?: Nullable<string>;
    property?: Nullable<Property>;
    userId?: Nullable<string>;
    user?: Nullable<User>;
    requestDate?: Nullable<DateTime>;
    approved?: Nullable<boolean>;
    approvalDate?: Nullable<DateTime>;
    purchaseRequestTypeId?: Nullable<number>;
    purchaseRequestType?: Nullable<PurchaseRequestType>;
    purchaseDuration?: Nullable<number>;
    durationTypeId?: Nullable<number>;
    durationType?: Nullable<DurationType>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class InspectionType {
    id?: Nullable<number>;
    inspectionType?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    inspectionSchedules?: Nullable<Nullable<InspectionSchedule>[]>;
}

export class InspectionStatus {
    id?: Nullable<number>;
    inspectionStatus?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    inspectionSchedules?: Nullable<Nullable<InspectionSchedule>[]>;
}

export class InspectionSchedule {
    id?: Nullable<string>;
    userId?: Nullable<string>;
    user?: Nullable<User>;
    propertyId?: Nullable<string>;
    property?: Nullable<Property>;
    dateScheduled?: Nullable<DateTime>;
    inspectionTypeId?: Nullable<number>;
    inspectionType?: Nullable<InspectionType>;
    inspectionStatusId?: Nullable<number>;
    inspectionStatus?: Nullable<InspectionStatus>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    inspectionScheduleSlip?: Nullable<InspectionScheduleSlip>;
}

export class InspectionScheduleSlip {
    id?: Nullable<string>;
    inspectionSchedule?: Nullable<InspectionSchedule>;
    agentId?: Nullable<string>;
    agent?: Nullable<User>;
    developerCompanyId?: Nullable<string>;
    developerCompany?: Nullable<DeveloperCompany>;
    approvedDate?: Nullable<DateTime>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class InspectionCalendarLog {
    date?: Nullable<string>;
    inspectionsForDay?: Nullable<Nullable<InspectionSchedule>[]>;
}

export class PrequalificationStatus {
    id?: Nullable<number>;
    prequalificationStatus?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    prequalifications?: Nullable<Nullable<Prequalification>[]>;
}

export class Prequalification {
    id?: Nullable<string>;
    fullname?: Nullable<string>;
    email?: Nullable<string>;
    incomeMonthly?: Nullable<number>;
    isSelfEmployed?: Nullable<boolean>;
    companyName?: Nullable<string>;
    companyAddress?: Nullable<string>;
    isJointApplication?: Nullable<boolean>;
    spouseEmail?: Nullable<string>;
    prequalificationStatusId?: Nullable<number>;
    prequalificationStatus?: Nullable<PrequalificationStatus>;
    userId?: Nullable<string>;
    user?: Nullable<User>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class InvestmentState {
    id?: Nullable<number>;
    investmentState?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    investments?: Nullable<Nullable<Investment>[]>;
}

export class InvestmentFrequency {
    id?: Nullable<number>;
    investmentFrequency?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    investments?: Nullable<Nullable<Investment>[]>;
}

export class PaymentStatus {
    id?: Nullable<number>;
    paymentStatus?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
}

export class Investment {
    id?: Nullable<string>;
    description?: Nullable<string>;
    totalAmount?: Nullable<number>;
    startDate?: Nullable<DateTime>;
    duration?: Nullable<number>;
    investmentStateId?: Nullable<number>;
    investmentState?: Nullable<InvestmentState>;
    investmentFrequencyId?: Nullable<number>;
    investmentFrequency?: Nullable<InvestmentFrequency>;
    totalPaid?: Nullable<number>;
    userId?: Nullable<string>;
    user?: Nullable<User>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    investmentPaymentSchedules?: Nullable<Nullable<InvestmentPaymentSchedule>[]>;
    investmentPayments?: Nullable<Nullable<InvestmentPayment>[]>;
}

export class InvestmentPaymentSchedule {
    id?: Nullable<string>;
    amountDue?: Nullable<number>;
    dateDue?: Nullable<DateTime>;
    paid?: Nullable<boolean>;
    investmentId?: Nullable<string>;
    investment?: Nullable<Investment>;
    paymentStatusId?: Nullable<number>;
    paymentStatus?: Nullable<PaymentStatus>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    investmentPayments?: Nullable<Nullable<InvestmentPayment>[]>;
}

export class InvestmentPayment {
    id?: Nullable<string>;
    reference?: Nullable<string>;
    amountPaid?: Nullable<number>;
    datePaid?: Nullable<DateTime>;
    investmentId?: Nullable<string>;
    investment?: Nullable<Investment>;
    investmentPaymentScheduleId?: Nullable<string>;
    investmentPaymentSchedule?: Nullable<InvestmentPaymentSchedule>;
    userWalletId?: Nullable<string>;
    userWallet?: Nullable<UserWallet>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export type DateTime = any;
type Nullable<T> = T | null;


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

export interface CreateProject {
    projectName: string;
    description: string;
    address: string;
    cityId: string;
    projectStatusId: number;
    developerCompanyId?: Nullable<string>;
    projectLayoutUrl?: Nullable<string>;
    neighborhoodId?: Nullable<string>;
}

export interface UpdateProject {
    projectId: string;
    projectName?: Nullable<string>;
    description?: Nullable<string>;
    address?: Nullable<string>;
    projectLayoutUrl?: Nullable<string>;
    cityId?: Nullable<string>;
    neighborhoodId?: Nullable<string>;
    projectStatusId?: Nullable<number>;
}

export interface CreatePrototype {
    prototypeName: string;
    description: string;
    projectId: string;
    categoryId?: Nullable<string>;
    mediaUrl?: Nullable<string>;
}

export interface UpdatePrototype {
    prototypeId: string;
    prototypeName?: Nullable<string>;
    description?: Nullable<string>;
    categoryId?: Nullable<string>;
    mediaUrl?: Nullable<string>;
}

export interface CreatePropertyDetails {
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

export interface UpdatePropertyDetails {
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

export interface CreatePropertyMedia {
    index?: Nullable<number>;
    mediaUrl: string;
    mediaCategoryId: string;
    description?: Nullable<string>;
}

export interface CreateProperty {
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

export interface UpdateProperty {
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

export interface Role {
    id?: Nullable<string>;
    roleName?: Nullable<string>;
    roleDescription?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export interface IQuery {
    getAllRoles(): Nullable<Nullable<Role>[]> | Promise<Nullable<Nullable<Role>[]>>;
    getUserDeveloperRoles(): Nullable<Nullable<Role>[]> | Promise<Nullable<Nullable<Role>[]>>;
    getAdminRoles(): Nullable<Nullable<Role>[]> | Promise<Nullable<Nullable<Role>[]>>;
    getUserById(): Nullable<User> | Promise<Nullable<User>>;
    getAdminById(): Nullable<Admin> | Promise<Nullable<Admin>>;
    getAllUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    getCompanyTypes(): Nullable<Nullable<CompanyType>[]> | Promise<Nullable<Nullable<CompanyType>[]>>;
    getDeveloperCompanies(): Nullable<Nullable<DeveloperCompany>[]> | Promise<Nullable<Nullable<DeveloperCompany>[]>>;
    getDeveloperCompanyById(companyId: string): Nullable<DeveloperCompany> | Promise<Nullable<DeveloperCompany>>;
    getDeveloperCompanyByUser(): Nullable<DeveloperCompany> | Promise<Nullable<DeveloperCompany>>;
    getStates(): Nullable<Nullable<State>[]> | Promise<Nullable<Nullable<State>[]>>;
    getCities(): Nullable<Nullable<City>[]> | Promise<Nullable<Nullable<City>[]>>;
    getCitiesByStateId(stateId: string): Nullable<Nullable<City>[]> | Promise<Nullable<Nullable<City>[]>>;
    getPropertyStatuses(): Nullable<Nullable<PropertyStatus>[]> | Promise<Nullable<Nullable<PropertyStatus>[]>>;
    getPropertyOptions(): Nullable<Nullable<PropertyOption>[]> | Promise<Nullable<Nullable<PropertyOption>[]>>;
    getPropertyCategories(): Nullable<Nullable<PropertyCategory>[]> | Promise<Nullable<Nullable<PropertyCategory>[]>>;
    getProjectStatuses(): Nullable<Nullable<ProjectStatus>[]> | Promise<Nullable<Nullable<ProjectStatus>[]>>;
    getProjects(): Nullable<Nullable<Project>[]> | Promise<Nullable<Nullable<Project>[]>>;
    getProjectById(projectId: string): Nullable<Project> | Promise<Nullable<Project>>;
    getProjectsByCompany(companyId: string, cursor?: Nullable<string>, sets?: Nullable<number>): Nullable<ProjectByCompanyResponse> | Promise<Nullable<ProjectByCompanyResponse>>;
    getPrototypes(): Nullable<Nullable<Prototype>[]> | Promise<Nullable<Nullable<Prototype>[]>>;
    getPrototypesByProject(projectId: string): Nullable<Nullable<Prototype>[]> | Promise<Nullable<Nullable<Prototype>[]>>;
    getPrototypeById(prototypeId: string): Nullable<Prototype> | Promise<Nullable<Prototype>>;
    getProperties(): Nullable<Nullable<Property>[]> | Promise<Nullable<Nullable<Property>[]>>;
    getPropertiesByProject(projectId: string): Nullable<Nullable<Property>[]> | Promise<Nullable<Nullable<Property>[]>>;
    getPropertiesByCompany(companyId: string): Nullable<Nullable<Property>[]> | Promise<Nullable<Nullable<Property>[]>>;
    getPropertyByDeveloper(developerId: string): Nullable<Nullable<Property>[]> | Promise<Nullable<Nullable<Property>[]>>;
    getPropertyById(propertyId: string): Nullable<Property> | Promise<Nullable<Property>>;
}

export interface AdminInvite {
    id?: Nullable<string>;
    fullname?: Nullable<string>;
    email?: Nullable<string>;
    mobile?: Nullable<string>;
    roleId?: Nullable<string>;
    role?: Nullable<Role>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
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
    createProject(input: CreateProject): Nullable<Project> | Promise<Nullable<Project>>;
    updateProject(input: UpdateProject): Nullable<Project> | Promise<Nullable<Project>>;
    deleteProject(projectId: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    deleteAllProjects(): Nullable<boolean> | Promise<Nullable<boolean>>;
    createPrototype(input: CreatePrototype): Nullable<Prototype> | Promise<Nullable<Prototype>>;
    updatePrototype(input: UpdatePrototype): Nullable<Prototype> | Promise<Nullable<Prototype>>;
    deletePrototype(prototypeId: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    deleteAllPrototypes(): Nullable<boolean> | Promise<Nullable<boolean>>;
    createProperty(input: CreateProperty): Nullable<Property> | Promise<Nullable<Property>>;
    updateProperty(input: UpdateProperty): Nullable<Property> | Promise<Nullable<Property>>;
    deleteProperty(propertyId: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    deleteAllPropertyCategories(): Nullable<boolean> | Promise<Nullable<boolean>>;
    deleteAllProperties(): Nullable<boolean> | Promise<Nullable<boolean>>;
}

export interface Admin {
    id?: Nullable<string>;
    fullname?: Nullable<string>;
    email?: Nullable<string>;
    mobile?: Nullable<string>;
    roleId?: Nullable<string>;
    role?: Nullable<Role>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
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
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
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
    hasDeveloperCompany?: Nullable<boolean>;
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
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
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
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export interface UserDeveloperCompany {
    id?: Nullable<string>;
    developerCompanyId?: Nullable<string>;
    developerCompany?: Nullable<DeveloperCompany>;
    userId?: Nullable<string>;
    user?: Nullable<User>;
    isOwner?: Nullable<boolean>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export interface Country {
    id?: Nullable<string>;
    countryName?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    states?: Nullable<Nullable<State>[]>;
}

export interface State {
    id?: Nullable<string>;
    stateName?: Nullable<string>;
    countryId?: Nullable<string>;
    country?: Nullable<Country>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    cities?: Nullable<Nullable<City>[]>;
}

export interface City {
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

export interface Neighborhood {
    id?: Nullable<string>;
    name?: Nullable<string>;
    cityId?: Nullable<string>;
    city?: Nullable<City>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    projects?: Nullable<Nullable<Project>[]>;
    propertyDetails?: Nullable<Nullable<PropertyDetail>[]>;
}

export interface PropertyStatus {
    id?: Nullable<number>;
    propertyStatus?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    properties?: Nullable<Nullable<Property>[]>;
}

export interface PropertyOption {
    id?: Nullable<number>;
    propertyOption?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    propertyDetails?: Nullable<Nullable<PropertyDetail>[]>;
}

export interface PropertyCategory {
    id?: Nullable<string>;
    categoryName?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    prototypes?: Nullable<Nullable<Prototype>[]>;
    properties?: Nullable<Nullable<Property>[]>;
}

export interface ProjectStatus {
    id?: Nullable<number>;
    projectStatus?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    projects?: Nullable<Nullable<Project>[]>;
}

export interface Project {
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
}

export interface ProjectByCompanyResponse {
    projectsByCompany?: Nullable<Nullable<Project>[]>;
    cursorId?: Nullable<string>;
}

export interface Prototype {
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
}

export interface RequestUpdateStatus {
    id?: Nullable<number>;
    requestUpdateStatus?: Nullable<string>;
    createdAt?: Nullable<Date>;
    propertyUpdateRequests?: Nullable<Nullable<PropertyUpdateRequest>[]>;
}

export interface Property {
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

export interface PropertyDetail {
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

export interface PropertyUpdateRequest {
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

export interface PropertyOwned {
    propertyId?: Nullable<string>;
    property?: Nullable<Property>;
    userId?: Nullable<string>;
    user?: Nullable<User>;
    purchaseDate?: Nullable<DateTime>;
    createdAt?: Nullable<DateTime>;
}

export interface PropertyRented {
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

export interface PropertyMediaCategory {
    id?: Nullable<string>;
    mediaCategory?: Nullable<string>;
    required?: Nullable<boolean>;
    createdAt?: Nullable<DateTime>;
    propertiesMedia?: Nullable<Nullable<PropertyMedia>[]>;
}

export interface PropertyMedia {
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

export interface PropertyCostHistory {
    id?: Nullable<string>;
    propertyId?: Nullable<string>;
    property?: Nullable<Property>;
    price?: Nullable<number>;
    effectiveDate?: Nullable<DateTime>;
    createdAt?: Nullable<DateTime>;
}

export interface PurchaseRequestType {
    id?: Nullable<number>;
    purchaseRequestType?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    propertyPurchaseRequests?: Nullable<Nullable<PropertyPurchaseRequest>[]>;
}

export interface DurationType {
    id?: Nullable<number>;
    durationType?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    propertyPurchaseRequests?: Nullable<Nullable<PropertyPurchaseRequest>[]>;
}

export interface PropertyPurchaseRequest {
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

export type DateTime = any;
type Nullable<T> = T | null;


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
    twoFACode?: Nullable<string>;
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

export interface CreateProjectMedia {
    projectMediaCategoryId: string;
    mediaUrl: string;
    description?: Nullable<string>;
    index?: Nullable<number>;
}

export interface CreateProject {
    projectName: string;
    description: string;
    address: string;
    cityId: string;
    projectStatusId: number;
    developerCompanyId?: Nullable<string>;
    neighborhoodId?: Nullable<string>;
    projectMedia?: Nullable<Nullable<CreateProjectMedia>[]>;
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
    projectMedia?: Nullable<Nullable<CreateProjectMedia>[]>;
}

export interface CreatePrototypeMedia {
    propertyMediaCategoryId: string;
    index?: Nullable<number>;
    mediaUrl: string;
    description?: Nullable<string>;
}

export interface CreatePrototype {
    prototypeName: string;
    description: string;
    projectId: string;
    categoryId?: Nullable<string>;
    prototypeMedia?: Nullable<Nullable<CreatePrototypeMedia>[]>;
}

export interface UpdatePrototype {
    prototypeId: string;
    prototypeName?: Nullable<string>;
    description?: Nullable<string>;
    categoryId?: Nullable<string>;
    mediaUrl?: Nullable<string>;
}

export interface CreatePropertyPurchaseRequest {
    propertyId: string;
    requestDate: Date;
    purchaseRequestTypeId: number;
    durationTypeId?: Nullable<number>;
    purchaseDuration?: Nullable<number>;
}

export interface UpdatePropertyPurchaseRequest {
    purchaseRequestId: string;
    requestDate?: Nullable<Date>;
    purchaseRequestTypeId?: Nullable<number>;
    durationTypeId?: Nullable<number>;
    purchaseDuration?: Nullable<number>;
}

export interface ApprovePurchaseRequest {
    purchaseRequestId: string;
    purchaseRequestStatusId: number;
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

export interface CreateInspectionSchedule {
    propertyId: string;
    dateScheduled: DateTime;
    inspectionTypeId: number;
}

export interface UpdateInspectionSchedule {
    scheduleId: string;
    dateScheduled?: Nullable<DateTime>;
    inspectionTypeId?: Nullable<number>;
}

export interface AdminHandleInspectionSchedule {
    inspectionStatusId: number;
    scheduleId: string;
}

export interface DeveloperHandleInspectionSchedule {
    scheduleId: string;
    inspectionStatusId: number;
    agentId?: Nullable<string>;
}

export interface CreatePrequalification {
    fullname: string;
    email: string;
    incomeMonthly: number;
    isSelfEmployed?: Nullable<boolean>;
    companyName?: Nullable<string>;
    companyAddress?: Nullable<string>;
    isJointApplication?: Nullable<boolean>;
    spouseEmail?: Nullable<string>;
}

export interface UpdatePrequalification {
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

export interface AdminApprovePrequalification {
    prequalificationId: string;
    prequalificationStatusId: number;
}

export interface CreateInvestmentPayment {
    reference: string;
    amountPaid: number;
    datePaid: DateTime;
    investmentId: string;
    investmentPaymentScheduleId: string;
    userWalletId: string;
}

export interface CreateInvestment {
    description: string;
    totalAmount: number;
    startDate: Date;
    duration: number;
    investmentFrequencyId: number;
}

export interface UpdateInvestment {
    investmentId: string;
    description?: Nullable<string>;
    totalAmount?: Nullable<number>;
    startDate?: Nullable<Date>;
    duration?: Nullable<number>;
    investmentFrequencyId?: Nullable<number>;
}

export interface ResumeInvestment {
    investmentId: string;
    resumeDate: Date;
}

export interface MortgageCalculatorInput {
    propertyPrice: number;
    downPaymentPercentage: number;
    durationTypeId: number;
    mortgageDuration: number;
    interestRate: number;
}

export interface CreateMortgage {
    coApplicantName?: Nullable<string>;
    coApplicantEmail?: Nullable<string>;
    downPaymentPercentage: number;
    applicationDate: Date;
    interestRate: number;
    mortgageDuration: number;
    propertyId: string;
    propertyPurchaseReqId: string;
    durationTypeId: number;
}

export interface UpdateMortgage {
    mortgageId: string;
    coApplicantName?: Nullable<string>;
    coApplicantEmail?: Nullable<string>;
    downPaymentPercentage?: Nullable<number>;
    interestRate?: Nullable<number>;
    mortgageDuration?: Nullable<number>;
    propertyPurchaseReqId?: Nullable<string>;
    durationTypeId?: Nullable<number>;
}

export interface AdminApproveMortgage {
    mortgageId: string;
    mortgageStatusId: number;
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
    getAllUserWishlists(): Nullable<Nullable<UserWishlist>[]> | Promise<Nullable<Nullable<UserWishlist>[]>>;
    getUserWishlistsByUser(): Nullable<Nullable<Property>[]> | Promise<Nullable<Nullable<Property>[]>>;
    getUserWishlistById(wishlistId: string): Nullable<UserWishlist> | Promise<Nullable<UserWishlist>>;
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
    getPropertyMediaCategories(): Nullable<Nullable<PropertyMediaCategory>[]> | Promise<Nullable<Nullable<PropertyMediaCategory>[]>>;
    getProjectMediaCategories(): Nullable<Nullable<ProjectMediaCategory>[]> | Promise<Nullable<Nullable<ProjectMediaCategory>[]>>;
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
    getPurchaseRequests(): Nullable<Nullable<PropertyPurchaseRequest>[]> | Promise<Nullable<Nullable<PropertyPurchaseRequest>[]>>;
    getPurchaseRequestsByUser(): Nullable<Nullable<PropertyPurchaseRequest>[]> | Promise<Nullable<Nullable<PropertyPurchaseRequest>[]>>;
    adminGetPurchaseRequests(): Nullable<Nullable<PropertyPurchaseRequest>[]> | Promise<Nullable<Nullable<PropertyPurchaseRequest>[]>>;
    getPurchaseRequestById(purchaseRequestId: string): Nullable<PropertyPurchaseRequest> | Promise<Nullable<PropertyPurchaseRequest>>;
    getInspectionTypes(): Nullable<Nullable<InspectionType>[]> | Promise<Nullable<Nullable<InspectionType>[]>>;
    getInspectionStatus(): Nullable<Nullable<InspectionStatus>[]> | Promise<Nullable<Nullable<InspectionStatus>[]>>;
    adminGetInspectionSchedules(monthValue?: Nullable<number>): Nullable<Nullable<InspectionCalendarLog>[]> | Promise<Nullable<Nullable<InspectionCalendarLog>[]>>;
    getInspectionScheduleByDeveloper(monthValue?: Nullable<number>): Nullable<Nullable<InspectionCalendarLog>[]> | Promise<Nullable<Nullable<InspectionCalendarLog>[]>>;
    userGetInspectionSchedules(): Nullable<Nullable<InspectionSchedule>[]> | Promise<Nullable<Nullable<InspectionSchedule>[]>>;
    getInspectionSchedules(): Nullable<Nullable<InspectionSchedule>[]> | Promise<Nullable<Nullable<InspectionSchedule>[]>>;
    getInpectionScheduleById(scheduleId: string): Nullable<InspectionSchedule> | Promise<Nullable<InspectionSchedule>>;
    adminViewPrequalifications(): Nullable<Nullable<Prequalification>[]> | Promise<Nullable<Nullable<Prequalification>[]>>;
    getPrequalifications(): Nullable<Nullable<Prequalification>[]> | Promise<Nullable<Nullable<Prequalification>[]>>;
    getPrequalificationById(prequalificationId: string): Nullable<Prequalification> | Promise<Nullable<Prequalification>>;
    getPrequalificationsByUser(): Nullable<Nullable<Prequalification>[]> | Promise<Nullable<Nullable<Prequalification>[]>>;
    getInvestments(): Nullable<Nullable<Investment>[]> | Promise<Nullable<Nullable<Investment>[]>>;
    getInvestementsByUser(): Nullable<Nullable<Investment>[]> | Promise<Nullable<Nullable<Investment>[]>>;
    adminGetInvestments(): Nullable<Nullable<Investment>[]> | Promise<Nullable<Nullable<Investment>[]>>;
    getMortgageStatuses(): Nullable<Nullable<MortgageStatus>[]> | Promise<Nullable<Nullable<MortgageStatus>[]>>;
    mortgageCalculator(input: MortgageCalculatorInput): Nullable<MortgageCalculatorResponse> | Promise<Nullable<MortgageCalculatorResponse>>;
    getMortgages(): Nullable<Nullable<Mortgage>[]> | Promise<Nullable<Nullable<Mortgage>[]>>;
    getMortgageById(mortgageId: string): Nullable<Mortgage> | Promise<Nullable<Mortgage>>;
    getMortgagesByUser(): Nullable<Nullable<Mortgage>[]> | Promise<Nullable<Nullable<Mortgage>[]>>;
    adminGetMortgages(): Nullable<Nullable<Mortgage>[]> | Promise<Nullable<Nullable<Mortgage>[]>>;
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
    addPropertyToWishlist(propertyId: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    deletePropertyfromWishlist(propertyId: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    deleteAllUserWishlists(): Nullable<boolean> | Promise<Nullable<boolean>>;
    generateQrCodeDataURL(): string | Promise<string>;
    turnOnTwoFactorAuth(twoFACode: string): boolean | Promise<boolean>;
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
    createPurchaseRequest(input: CreatePropertyPurchaseRequest): Nullable<PropertyPurchaseRequest> | Promise<Nullable<PropertyPurchaseRequest>>;
    updatePurchaseRequest(input: UpdatePropertyPurchaseRequest): Nullable<PropertyPurchaseRequest> | Promise<Nullable<PropertyPurchaseRequest>>;
    approvePurchaseRequest(input: ApprovePurchaseRequest): Nullable<boolean> | Promise<Nullable<boolean>>;
    deletePurchaseRequest(purchaseRequestId: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    deleteAllPurchaseRequest(): Nullable<boolean> | Promise<Nullable<boolean>>;
    createInspectionSchedule(input: CreateInspectionSchedule): Nullable<InspectionSchedule> | Promise<Nullable<InspectionSchedule>>;
    adminHandleInspectionSchedule(input: AdminHandleInspectionSchedule): string | Promise<string>;
    developerHandleInspectionSchedule(input: DeveloperHandleInspectionSchedule): InspectionScheduleSlip | Promise<InspectionScheduleSlip>;
    updateInspectionSchedule(input: UpdateInspectionSchedule): Nullable<InspectionSchedule> | Promise<Nullable<InspectionSchedule>>;
    deleteInspectionSchedule(scheduleId: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    deleteAllInspectionSchedules(): Nullable<boolean> | Promise<Nullable<boolean>>;
    createPrequalification(input: CreatePrequalification): Nullable<Prequalification> | Promise<Nullable<Prequalification>>;
    updatePrequalification(input: UpdatePrequalification): Nullable<Prequalification> | Promise<Nullable<Prequalification>>;
    deletePrequalification(prequalificationId: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    deleteAllPrequalifications(): Nullable<boolean> | Promise<Nullable<boolean>>;
    adminApprovePrequalification(input: AdminApprovePrequalification): Nullable<boolean> | Promise<Nullable<boolean>>;
    createInvestment(input: CreateInvestment): Nullable<Investment> | Promise<Nullable<Investment>>;
    updateInvestment(input: UpdateInvestment): Nullable<Investment> | Promise<Nullable<Investment>>;
    pauseInvestment(investmentId: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    resumeInvestment(input?: Nullable<ResumeInvestment>): Nullable<boolean> | Promise<Nullable<boolean>>;
    endInvestment(investmentId: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    deleteInvestment(investmentId: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    deleteAllInvestements(): Nullable<boolean> | Promise<Nullable<boolean>>;
    createMortgage(input: CreateMortgage): Nullable<Mortgage> | Promise<Nullable<Mortgage>>;
    adminAproveMortgage(input: AdminApproveMortgage): Nullable<boolean> | Promise<Nullable<boolean>>;
    updateMortgage(input: UpdateMortgage): Nullable<Mortgage> | Promise<Nullable<Mortgage>>;
    deleteMortgage(mortgageId: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    deleteAllMortgages(): Nullable<boolean> | Promise<Nullable<boolean>>;
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
    userWallet?: Nullable<UserWallet>;
}

export interface UserWishlist {
    id?: Nullable<string>;
    propertyId?: Nullable<string>;
    property?: Nullable<Property>;
    userId?: Nullable<string>;
    user?: Nullable<User>;
    createdAt?: Nullable<DateTime>;
}

export interface UserWallet {
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

export interface Financier {
    id?: Nullable<string>;
    fullname?: Nullable<string>;
    email?: Nullable<string>;
    mobile?: Nullable<string>;
    roleId?: Nullable<string>;
    role?: Nullable<Role>;
    verified?: Nullable<boolean>;
    code?: Nullable<number>;
    codeExpiry?: Nullable<DateTime>;
    isTwoFactorAuthEnabled?: Nullable<boolean>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    financeCompanies?: Nullable<Nullable<FinanceCompany>[]>;
    financeCompanyFinancier?: Nullable<FinanceCompanyFinancier>;
    financierWallets?: Nullable<FinancierWallet>;
}

export interface FinanceCompany {
    id?: Nullable<string>;
    companyName?: Nullable<string>;
    companyEmail?: Nullable<string>;
    companyMobile?: Nullable<string>;
    vetted?: Nullable<boolean>;
    financierId?: Nullable<string>;
    financier?: Nullable<Financier>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    financeCompanyFinanciers?: Nullable<Nullable<FinanceCompanyFinancier>[]>;
    financierInvites?: Nullable<Nullable<FinancierInvite>[]>;
    mortgages?: Nullable<Nullable<Mortgage>[]>;
    financierDeveloperMortgagePayments?: Nullable<Nullable<FinancierDeveloperMortgagePayment>[]>;
}

export interface FinanceCompanyFinancier {
    id?: Nullable<string>;
    financeCompanyId?: Nullable<string>;
    financeCompany?: Nullable<FinanceCompany>;
    financierId?: Nullable<string>;
    financier?: Nullable<Financier>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export interface FinancierInvite {
    id?: Nullable<string>;
    email?: Nullable<string>;
    fullname?: Nullable<string>;
    mobile?: Nullable<string>;
    accepted?: Nullable<boolean>;
    financeCompanyId?: Nullable<string>;
    financeCompany?: Nullable<FinanceCompany>;
    roleId?: Nullable<string>;
    role?: Nullable<Role>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export interface FinancierWallet {
    id?: Nullable<string>;
    financierId?: Nullable<string>;
    financier?: Nullable<Financier>;
    balance?: Nullable<number>;
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
    projectsMedia?: Nullable<Nullable<ProjectMedia>[]>;
}

export interface ProjectMediaCategory {
    id?: Nullable<string>;
    mediaCategory?: Nullable<string>;
    required?: Nullable<boolean>;
    createdAt?: Nullable<DateTime>;
    projectsMedia?: Nullable<Nullable<ProjectMedia>[]>;
}

export interface ProjectMedia {
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
    prototypesMedia?: Nullable<Nullable<PrototypeMedia>[]>;
}

export interface PrototypeMedia {
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

export interface PurchaseRequestStatus {
    id?: Nullable<number>;
    purchaseRequestStatus?: Nullable<string>;
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
    purchaseRequestStatusId?: Nullable<number>;
    purchaseRequestStatus?: Nullable<PurchaseRequestStatus>;
    purchaseRequestTypeId?: Nullable<number>;
    purchaseRequestType?: Nullable<PurchaseRequestType>;
    purchaseDuration?: Nullable<number>;
    durationTypeId?: Nullable<number>;
    durationType?: Nullable<DurationType>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export interface InspectionType {
    id?: Nullable<number>;
    inspectionType?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    inspectionSchedules?: Nullable<Nullable<InspectionSchedule>[]>;
}

export interface InspectionStatus {
    id?: Nullable<number>;
    inspectionStatus?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    inspectionSchedules?: Nullable<Nullable<InspectionSchedule>[]>;
}

export interface InspectionSchedule {
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

export interface InspectionScheduleSlip {
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

export interface InspectionCalendarLog {
    date?: Nullable<string>;
    inspectionsForDay?: Nullable<Nullable<InspectionSchedule>[]>;
}

export interface PrequalificationStatus {
    id?: Nullable<number>;
    prequalificationStatus?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    prequalifications?: Nullable<Nullable<Prequalification>[]>;
}

export interface Prequalification {
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

export interface InvestmentState {
    id?: Nullable<number>;
    investmentState?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    investments?: Nullable<Nullable<Investment>[]>;
}

export interface InvestmentFrequency {
    id?: Nullable<number>;
    investmentFrequency?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    investments?: Nullable<Nullable<Investment>[]>;
}

export interface PaymentStatus {
    id?: Nullable<number>;
    paymentStatus?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
}

export interface Investment {
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

export interface InvestmentPaymentSchedule {
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

export interface InvestmentPayment {
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

export interface MortgageStatus {
    id?: Nullable<number>;
    mortgageStatus?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    mortgages?: Nullable<Nullable<Mortgage>[]>;
}

export interface Mortgage {
    id?: Nullable<string>;
    coApplicantName?: Nullable<string>;
    coApplicantEmail?: Nullable<string>;
    downPayment?: Nullable<number>;
    downPaymentPercentage?: Nullable<number>;
    applicationDate?: Nullable<DateTime>;
    interestRate?: Nullable<number>;
    approvalDate?: Nullable<DateTime>;
    mortgageDuration?: Nullable<number>;
    userId?: Nullable<string>;
    user?: Nullable<User>;
    propertyId?: Nullable<string>;
    property?: Nullable<Property>;
    propertyPurchaseReqId?: Nullable<string>;
    propertyPurchaseReq?: Nullable<PropertyPurchaseRequest>;
    mortgageStatusId?: Nullable<number>;
    mortgageStatus?: Nullable<MortgageStatus>;
    durationTypeId?: Nullable<number>;
    durationType?: Nullable<DurationType>;
    financeCompanyId?: Nullable<string>;
    financeCompany?: Nullable<FinanceCompany>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    mortgagePaymentSchedules?: Nullable<Nullable<MortgagePaymentSchedule>[]>;
    mortgagePayments?: Nullable<Nullable<MortgagePayment>[]>;
    financierDeveloperMortgagePayments?: Nullable<Nullable<FinancierDeveloperMortgagePayment>[]>;
}

export interface MortgagePaymentSchedule {
    id?: Nullable<string>;
    amountDue?: Nullable<number>;
    dueDate?: Nullable<DateTime>;
    paid?: Nullable<boolean>;
    datePaid?: Nullable<DateTime>;
    paymentStatusId?: Nullable<number>;
    paymentStatus?: Nullable<PaymentStatus>;
    mortgageId?: Nullable<string>;
    mortgage?: Nullable<Mortgage>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    mortgagePayments?: Nullable<Nullable<MortgagePayment>[]>;
}

export interface MortgagePayment {
    id?: Nullable<string>;
    reference?: Nullable<string>;
    amountPaid?: Nullable<number>;
    datePaid?: Nullable<DateTime>;
    mortgageId?: Nullable<string>;
    mortgage?: Nullable<Mortgage>;
    mortgagePaymentScheduleId?: Nullable<string>;
    mortgagePaymentSchedule?: Nullable<MortgagePaymentSchedule>;
    userId?: Nullable<string>;
    user?: Nullable<User>;
    userWalletId?: Nullable<string>;
    userWallet?: Nullable<UserWallet>;
    destinationWalletId?: Nullable<string>;
    destinationWallet?: Nullable<FinancierWallet>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export interface FinancierDeveloperMortgagePayment {
    id?: Nullable<string>;
    amountPaid?: Nullable<number>;
    datePaid?: Nullable<DateTime>;
    propertyId?: Nullable<string>;
    property?: Nullable<Property>;
    mortgageId?: Nullable<string>;
    mortgage?: Nullable<Mortgage>;
    financeCompanyId?: Nullable<string>;
    financeCompany?: Nullable<FinanceCompany>;
    financierWalletId?: Nullable<string>;
    financierWallet?: Nullable<FinancierWallet>;
    destinationWalletId?: Nullable<string>;
    destinationWallet?: Nullable<UserWallet>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export interface MortgageCalculatorResponse {
    tax?: Nullable<number>;
    principalAndInterest?: Nullable<number>;
}

export interface PaymentTransaction {
    id?: Nullable<string>;
    reference?: Nullable<string>;
    amountPaid?: Nullable<number>;
    datePaid?: Nullable<DateTime>;
    propertyId?: Nullable<string>;
    property?: Nullable<Property>;
    userId?: Nullable<string>;
    user?: Nullable<User>;
    propertyPurchaseReqId?: Nullable<string>;
    propertyPurchaseReq?: Nullable<PropertyPurchaseRequest>;
    userWalletId?: Nullable<string>;
    userWallet?: Nullable<UserWallet>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    paymentTransactionDetails?: Nullable<Nullable<PaymentTransactionDetail>[]>;
}

export interface PaymentTransactionDetail {
    id?: Nullable<string>;
    paymentTransaction?: Nullable<PaymentTransaction>;
    destinationWalletId?: Nullable<string>;
    destinationWallet?: Nullable<UserWallet>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export interface FAQ {
    id?: Nullable<string>;
    question?: Nullable<string>;
    answer?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export type DateTime = any;
type Nullable<T> = T | null;

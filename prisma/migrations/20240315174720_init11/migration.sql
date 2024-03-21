-- CreateTable
CREATE TABLE "developerCompanyBankAccounts" (
    "id" TEXT NOT NULL,
    "accountName" TEXT,
    "bankName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "bvn" TEXT NOT NULL,
    "bvnVerified" BOOLEAN NOT NULL DEFAULT false,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "developerCompanyBankAccounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" TEXT NOT NULL,
    "countryName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "states" (
    "id" TEXT NOT NULL,
    "stateName" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" TEXT NOT NULL,
    "cityName" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "neighborhoods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "neighborhoods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "propertyStatuses" (
    "id" INTEGER NOT NULL,
    "propertyStatus" TEXT NOT NULL,

    CONSTRAINT "propertyStatuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "propertyOptions" (
    "id" INTEGER NOT NULL,
    "propertyOption" TEXT NOT NULL,

    CONSTRAINT "propertyOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "propertyCategories" (
    "id" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "propertyCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projectStatuses" (
    "id" INTEGER NOT NULL,
    "projectStatus" TEXT NOT NULL,

    CONSTRAINT "projectStatuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "projectLayoutUrl" TEXT,
    "cityId" TEXT NOT NULL,
    "neighborhoodId" TEXT,
    "userId" TEXT NOT NULL,
    "projectStatusId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prototypes" (
    "id" TEXT NOT NULL,
    "prototypeName" TEXT NOT NULL,
    "description" TEXT,
    "categoryId" TEXT,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prototypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requestUpdateStatuses" (
    "id" INTEGER NOT NULL,
    "requestUpdateStatus" TEXT NOT NULL,

    CONSTRAINT "requestUpdateStatuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "categoryId" TEXT NOT NULL,
    "propertyStatusId" INTEGER NOT NULL,
    "projectId" TEXT,
    "prototypeId" TEXT,
    "cityId" TEXT NOT NULL,
    "developedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "propertyDetails" (
    "id" TEXT NOT NULL,
    "address" TEXT,
    "longitude" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "toilets" INTEGER NOT NULL,
    "floors" INTEGER NOT NULL,
    "sizeSqft" INTEGER NOT NULL,
    "dateCompleted" TIMESTAMP(3),
    "parkingSpaces" INTEGER NOT NULL,
    "isFurnished" BOOLEAN NOT NULL DEFAULT false,
    "hasPool" BOOLEAN NOT NULL DEFAULT false,
    "hasGarden" BOOLEAN NOT NULL DEFAULT false,
    "isNewConstruction" BOOLEAN NOT NULL DEFAULT false,
    "canPayInstallment" BOOLEAN NOT NULL DEFAULT false,
    "canMortgage" BOOLEAN NOT NULL DEFAULT false,
    "neighborhoodId" TEXT,
    "propertyOptionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "propertyUpdateRequests" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requestUpdateStatusId" INTEGER NOT NULL,
    "propertyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "propertyUpdateRequests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "propertiesOwned" (
    "propertyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "propertiesRented" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rentDateStart" TIMESTAMP(3),
    "rentDateEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "propertiesRented_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "propertiesMedia" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "propertiesMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "propertiesCostHistory" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "propertiesCostHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchaseRequestTypes" (
    "id" INTEGER NOT NULL,
    "purchaseRequestType" TEXT NOT NULL,

    CONSTRAINT "purchaseRequestTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "durationTypes" (
    "id" INTEGER NOT NULL,
    "durationType" TEXT NOT NULL,

    CONSTRAINT "durationTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "propertyPurchaseRequests" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "approvalDate" TIMESTAMP(3),
    "purchaseRequestTypeId" INTEGER NOT NULL,
    "purchaseDuration" INTEGER NOT NULL,
    "durationTypeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "propertyPurchaseRequests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "propertyStatuses_propertyStatus_key" ON "propertyStatuses"("propertyStatus");

-- CreateIndex
CREATE UNIQUE INDEX "propertyOptions_propertyOption_key" ON "propertyOptions"("propertyOption");

-- CreateIndex
CREATE UNIQUE INDEX "projectStatuses_projectStatus_key" ON "projectStatuses"("projectStatus");

-- CreateIndex
CREATE UNIQUE INDEX "requestUpdateStatuses_requestUpdateStatus_key" ON "requestUpdateStatuses"("requestUpdateStatus");

-- CreateIndex
CREATE UNIQUE INDEX "propertyDetails_id_key" ON "propertyDetails"("id");

-- CreateIndex
CREATE UNIQUE INDEX "propertiesOwned_propertyId_key" ON "propertiesOwned"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "purchaseRequestTypes_purchaseRequestType_key" ON "purchaseRequestTypes"("purchaseRequestType");

-- CreateIndex
CREATE UNIQUE INDEX "durationTypes_durationType_key" ON "durationTypes"("durationType");

-- AddForeignKey
ALTER TABLE "developerCompanyBankAccounts" ADD CONSTRAINT "developerCompanyBankAccounts_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "developerCompanies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "states" ADD CONSTRAINT "states_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "neighborhoods" ADD CONSTRAINT "neighborhoods_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_neighborhoodId_fkey" FOREIGN KEY ("neighborhoodId") REFERENCES "neighborhoods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_projectStatusId_fkey" FOREIGN KEY ("projectStatusId") REFERENCES "projectStatuses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prototypes" ADD CONSTRAINT "prototypes_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "propertyCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prototypes" ADD CONSTRAINT "prototypes_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "propertyCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_propertyStatusId_fkey" FOREIGN KEY ("propertyStatusId") REFERENCES "propertyStatuses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_prototypeId_fkey" FOREIGN KEY ("prototypeId") REFERENCES "prototypes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_developedById_fkey" FOREIGN KEY ("developedById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propertyDetails" ADD CONSTRAINT "propertyDetails_id_fkey" FOREIGN KEY ("id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propertyDetails" ADD CONSTRAINT "propertyDetails_neighborhoodId_fkey" FOREIGN KEY ("neighborhoodId") REFERENCES "neighborhoods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propertyDetails" ADD CONSTRAINT "propertyDetails_propertyOptionId_fkey" FOREIGN KEY ("propertyOptionId") REFERENCES "propertyOptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propertyUpdateRequests" ADD CONSTRAINT "propertyUpdateRequests_requestUpdateStatusId_fkey" FOREIGN KEY ("requestUpdateStatusId") REFERENCES "requestUpdateStatuses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propertyUpdateRequests" ADD CONSTRAINT "propertyUpdateRequests_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propertyUpdateRequests" ADD CONSTRAINT "propertyUpdateRequests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propertiesOwned" ADD CONSTRAINT "propertiesOwned_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propertiesOwned" ADD CONSTRAINT "propertiesOwned_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propertiesRented" ADD CONSTRAINT "propertiesRented_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propertiesRented" ADD CONSTRAINT "propertiesRented_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propertiesMedia" ADD CONSTRAINT "propertiesMedia_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propertiesCostHistory" ADD CONSTRAINT "propertiesCostHistory_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propertyPurchaseRequests" ADD CONSTRAINT "propertyPurchaseRequests_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propertyPurchaseRequests" ADD CONSTRAINT "propertyPurchaseRequests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propertyPurchaseRequests" ADD CONSTRAINT "propertyPurchaseRequests_purchaseRequestTypeId_fkey" FOREIGN KEY ("purchaseRequestTypeId") REFERENCES "purchaseRequestTypes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propertyPurchaseRequests" ADD CONSTRAINT "propertyPurchaseRequests_durationTypeId_fkey" FOREIGN KEY ("durationTypeId") REFERENCES "durationTypes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

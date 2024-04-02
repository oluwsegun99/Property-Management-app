-- AlterTable
ALTER TABLE "propertyDetails" ADD CONSTRAINT "propertyDetails_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "userWishlists" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userWishlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspectionTypes" (
    "id" INTEGER NOT NULL,
    "inspectionType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inspectionTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspectionStatuses" (
    "id" INTEGER NOT NULL,
    "inspectionStatus" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inspectionStatuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspectionSchedules" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "dateScheduled" TIMESTAMP(3) NOT NULL,
    "inspectionTypeId" INTEGER NOT NULL,
    "inspectionStatusId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inspectionSchedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspectionScheduleSlips" (
    "id" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "developerCompanyId" TEXT,
    "approvedDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inspectionScheduleSlips_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "inspectionTypes_inspectionType_key" ON "inspectionTypes"("inspectionType");

-- CreateIndex
CREATE UNIQUE INDEX "inspectionStatuses_inspectionStatus_key" ON "inspectionStatuses"("inspectionStatus");

-- CreateIndex
CREATE UNIQUE INDEX "inspectionScheduleSlips_id_key" ON "inspectionScheduleSlips"("id");

-- AddForeignKey
ALTER TABLE "userWishlists" ADD CONSTRAINT "userWishlists_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userWishlists" ADD CONSTRAINT "userWishlists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspectionSchedules" ADD CONSTRAINT "inspectionSchedules_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspectionSchedules" ADD CONSTRAINT "inspectionSchedules_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspectionSchedules" ADD CONSTRAINT "inspectionSchedules_inspectionTypeId_fkey" FOREIGN KEY ("inspectionTypeId") REFERENCES "inspectionTypes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspectionSchedules" ADD CONSTRAINT "inspectionSchedules_inspectionStatusId_fkey" FOREIGN KEY ("inspectionStatusId") REFERENCES "inspectionStatuses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspectionScheduleSlips" ADD CONSTRAINT "inspectionScheduleSlips_id_fkey" FOREIGN KEY ("id") REFERENCES "inspectionSchedules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspectionScheduleSlips" ADD CONSTRAINT "inspectionScheduleSlips_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspectionScheduleSlips" ADD CONSTRAINT "inspectionScheduleSlips_developerCompanyId_fkey" FOREIGN KEY ("developerCompanyId") REFERENCES "developerCompanies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

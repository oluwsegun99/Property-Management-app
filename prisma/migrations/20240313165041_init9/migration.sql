/*
  Warnings:

  - Added the required column `companyTypeId` to the `developerCompanies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "developerCompanies" ADD COLUMN     "address" TEXT,
ADD COLUMN     "companyLogo" TEXT,
ADD COLUMN     "companyTypeId" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "registrationNumber" TEXT,
ADD COLUMN     "website" TEXT;

-- CreateTable
CREATE TABLE "companyTypes" (
    "id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "companyTypes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companyTypes_type_key" ON "companyTypes"("type");

-- AddForeignKey
ALTER TABLE "developerCompanies" ADD CONSTRAINT "developerCompanies_companyTypeId_fkey" FOREIGN KEY ("companyTypeId") REFERENCES "companyTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

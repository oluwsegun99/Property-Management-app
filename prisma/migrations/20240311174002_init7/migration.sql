/*
  Warnings:

  - You are about to drop the `DeveloperCompany` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DeveloperCompany" DROP CONSTRAINT "DeveloperCompany_ownedById_fkey";

-- DropForeignKey
ALTER TABLE "userDeveloperCompanies" DROP CONSTRAINT "userDeveloperCompanies_developerCompanyId_fkey";

-- DropForeignKey
ALTER TABLE "userDeveloperInvites" DROP CONSTRAINT "userDeveloperInvites_developerCompanyId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "verified" BOOLEAN DEFAULT false;

-- DropTable
DROP TABLE "DeveloperCompany";

-- CreateTable
CREATE TABLE "adminInvites" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "adminInvites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "hashedRt" TEXT,
    "twoFactorAuthSecret" TEXT,
    "isTwoFactorAuthEnabled" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "developerCompanies" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "companyMobile" TEXT NOT NULL,
    "vetted" BOOLEAN NOT NULL DEFAULT false,
    "ownedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "developerCompanies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "adminInvites_email_key" ON "adminInvites"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "developerCompanies_companyEmail_key" ON "developerCompanies"("companyEmail");

-- CreateIndex
CREATE UNIQUE INDEX "developerCompanies_ownedById_key" ON "developerCompanies"("ownedById");

-- AddForeignKey
ALTER TABLE "adminInvites" ADD CONSTRAINT "adminInvites_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developerCompanies" ADD CONSTRAINT "developerCompanies_ownedById_fkey" FOREIGN KEY ("ownedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userDeveloperCompanies" ADD CONSTRAINT "userDeveloperCompanies_developerCompanyId_fkey" FOREIGN KEY ("developerCompanyId") REFERENCES "developerCompanies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userDeveloperInvites" ADD CONSTRAINT "userDeveloperInvites_developerCompanyId_fkey" FOREIGN KEY ("developerCompanyId") REFERENCES "developerCompanies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

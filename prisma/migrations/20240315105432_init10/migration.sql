-- DropForeignKey
ALTER TABLE "admin" DROP CONSTRAINT "admin_roleId_fkey";

-- DropForeignKey
ALTER TABLE "adminInvites" DROP CONSTRAINT "adminInvites_roleId_fkey";

-- DropForeignKey
ALTER TABLE "developerCompanies" DROP CONSTRAINT "developerCompanies_companyTypeId_fkey";

-- DropForeignKey
ALTER TABLE "developerCompanies" DROP CONSTRAINT "developerCompanies_ownedById_fkey";

-- DropForeignKey
ALTER TABLE "userDeveloperCompanies" DROP CONSTRAINT "userDeveloperCompanies_developerCompanyId_fkey";

-- DropForeignKey
ALTER TABLE "userDeveloperCompanies" DROP CONSTRAINT "userDeveloperCompanies_userId_fkey";

-- DropForeignKey
ALTER TABLE "userDeveloperInvites" DROP CONSTRAINT "userDeveloperInvites_developerCompanyId_fkey";

-- DropForeignKey
ALTER TABLE "userDeveloperInvites" DROP CONSTRAINT "userDeveloperInvites_roleId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_roleId_fkey";

-- AddForeignKey
ALTER TABLE "adminInvites" ADD CONSTRAINT "adminInvites_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developerCompanies" ADD CONSTRAINT "developerCompanies_companyTypeId_fkey" FOREIGN KEY ("companyTypeId") REFERENCES "companyTypes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developerCompanies" ADD CONSTRAINT "developerCompanies_ownedById_fkey" FOREIGN KEY ("ownedById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userDeveloperCompanies" ADD CONSTRAINT "userDeveloperCompanies_developerCompanyId_fkey" FOREIGN KEY ("developerCompanyId") REFERENCES "developerCompanies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userDeveloperCompanies" ADD CONSTRAINT "userDeveloperCompanies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userDeveloperInvites" ADD CONSTRAINT "userDeveloperInvites_developerCompanyId_fkey" FOREIGN KEY ("developerCompanyId") REFERENCES "developerCompanies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userDeveloperInvites" ADD CONSTRAINT "userDeveloperInvites_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

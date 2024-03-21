-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "developerCompanyId" TEXT;

-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "developerCompanyId" TEXT;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_developerCompanyId_fkey" FOREIGN KEY ("developerCompanyId") REFERENCES "developerCompanies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_developerCompanyId_fkey" FOREIGN KEY ("developerCompanyId") REFERENCES "developerCompanies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - The primary key for the `propertyMediaCategories` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "propertiesMedia" DROP CONSTRAINT "propertiesMedia_mediaCategoryId_fkey";

-- AlterTable
ALTER TABLE "propertiesMedia" ALTER COLUMN "mediaCategoryId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "propertyMediaCategories" DROP CONSTRAINT "propertyMediaCategories_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "propertyMediaCategories_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "propertiesMedia" ADD CONSTRAINT "propertiesMedia_mediaCategoryId_fkey" FOREIGN KEY ("mediaCategoryId") REFERENCES "propertyMediaCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `mediaCategoryId` on the `propertiesMedia` table. All the data in the column will be lost.
  - Added the required column `propertyMediaCategoryId` to the `propertiesMedia` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "propertiesMedia" DROP CONSTRAINT "propertiesMedia_mediaCategoryId_fkey";

-- AlterTable
ALTER TABLE "propertiesMedia" DROP COLUMN "mediaCategoryId",
ADD COLUMN     "propertyMediaCategoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "propertiesMedia" ADD CONSTRAINT "propertiesMedia_propertyMediaCategoryId_fkey" FOREIGN KEY ("propertyMediaCategoryId") REFERENCES "propertyMediaCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

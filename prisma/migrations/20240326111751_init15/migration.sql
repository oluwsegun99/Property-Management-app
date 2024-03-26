/*
  Warnings:

  - Added the required column `mediaCategoryId` to the `propertiesMedia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "propertiesMedia" ADD COLUMN     "mediaCategoryId" INTEGER NOT NULL,
ALTER COLUMN "index" DROP NOT NULL;

-- CreateTable
CREATE TABLE "propertyMediaCategories" (
    "id" INTEGER NOT NULL,
    "mediaCategory" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "propertyMediaCategories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "propertyMediaCategories_mediaCategory_key" ON "propertyMediaCategories"("mediaCategory");

-- AddForeignKey
ALTER TABLE "propertiesMedia" ADD CONSTRAINT "propertiesMedia_mediaCategoryId_fkey" FOREIGN KEY ("mediaCategoryId") REFERENCES "propertyMediaCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

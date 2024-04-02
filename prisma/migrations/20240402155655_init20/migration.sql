/*
  Warnings:

  - The primary key for the `investmentFrequencies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `investmentStates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `paymentStatuses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `investmentFrequencies` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `investmentStates` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `paymentStatuses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `prequalificationStatusId` to the `prequalifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "investmentFrequencies" DROP CONSTRAINT "investmentFrequencies_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "investmentStates" DROP CONSTRAINT "investmentStates_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "investmentStates_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "paymentStatuses" DROP CONSTRAINT "paymentStatuses_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "paymentStatuses_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "prequalifications" ADD COLUMN     "prequalificationStatusId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "prequalificationStatuses" (
    "id" INTEGER NOT NULL,
    "prequalificationStatus" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prequalificationStatuses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "prequalificationStatuses_prequalificationStatus_key" ON "prequalificationStatuses"("prequalificationStatus");

-- AddForeignKey
ALTER TABLE "prequalifications" ADD CONSTRAINT "prequalifications_prequalificationStatusId_fkey" FOREIGN KEY ("prequalificationStatusId") REFERENCES "prequalificationStatuses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

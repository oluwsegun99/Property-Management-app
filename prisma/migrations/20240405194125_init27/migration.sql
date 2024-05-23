/*
  Warnings:

  - You are about to drop the column `mortgagePaymentFrequencyId` on the `mortgages` table. All the data in the column will be lost.
  - You are about to drop the `mortgagePaymentFrequencies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "mortgages" DROP CONSTRAINT "mortgages_mortgagePaymentFrequencyId_fkey";

-- AlterTable
ALTER TABLE "mortgages" DROP COLUMN "mortgagePaymentFrequencyId",
ADD COLUMN     "durationTypeId" INTEGER;

-- DropTable
DROP TABLE "mortgagePaymentFrequencies";

-- AddForeignKey
ALTER TABLE "mortgages" ADD CONSTRAINT "mortgages_durationTypeId_fkey" FOREIGN KEY ("durationTypeId") REFERENCES "durationTypes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

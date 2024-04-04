/*
  Warnings:

  - Changed the type of `datePaid` on the `investmentPayments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "investmentPayments" DROP COLUMN "datePaid",
ADD COLUMN     "datePaid" TIMESTAMP(3) NOT NULL;

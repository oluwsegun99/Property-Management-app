/*
  Warnings:

  - You are about to alter the column `downPaymentPercentage` on the `mortgages` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `interestRate` on the `mortgages` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "mortgages" ALTER COLUMN "downPaymentPercentage" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "interestRate" SET DATA TYPE DOUBLE PRECISION;

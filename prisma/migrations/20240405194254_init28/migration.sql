/*
  Warnings:

  - Made the column `durationTypeId` on table `mortgages` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "mortgages" ALTER COLUMN "durationTypeId" SET NOT NULL;

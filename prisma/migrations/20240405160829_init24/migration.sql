/*
  Warnings:

  - Added the required column `purchaseRequestStatusId` to the `propertyPurchaseRequests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "propertyPurchaseRequests" ADD COLUMN     "purchaseRequestStatusId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "purchaseRequestStatuses" (
    "id" INTEGER NOT NULL,
    "purchaseRequestStatus" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "purchaseRequestStatuses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "purchaseRequestStatuses_purchaseRequestStatus_key" ON "purchaseRequestStatuses"("purchaseRequestStatus");

-- AddForeignKey
ALTER TABLE "propertyPurchaseRequests" ADD CONSTRAINT "propertyPurchaseRequests_purchaseRequestStatusId_fkey" FOREIGN KEY ("purchaseRequestStatusId") REFERENCES "purchaseRequestStatuses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

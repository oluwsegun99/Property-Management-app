-- CreateTable
CREATE TABLE "financiers" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "verified" BOOLEAN DEFAULT false,
    "verificationAttempt" DOUBLE PRECISION,
    "verificationTimeOut" TIMESTAMP(3),
    "vetted" BOOLEAN DEFAULT false,
    "hashedRt" TEXT,
    "code" DOUBLE PRECISION,
    "codeExpiry" TIMESTAMP(3),
    "twoFactorAuthSecret" TEXT,
    "isTwoFactorAuthEnabled" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "financiers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financeCompanies" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "companyMobile" TEXT NOT NULL,
    "vetted" BOOLEAN NOT NULL DEFAULT false,
    "financierId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "financeCompanies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financeCompanyFinanciers" (
    "id" TEXT NOT NULL,
    "financeCompanyId" TEXT NOT NULL,
    "financierId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "financeCompanyFinanciers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financierInvites" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "financeCompanyId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "financierInvites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financierWallets" (
    "id" TEXT NOT NULL,
    "financierId" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "financierWallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mortgageStatuses" (
    "id" INTEGER NOT NULL,
    "mortgageStatus" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mortgageStatuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mortgagePaymentFrequencies" (
    "id" INTEGER NOT NULL,
    "mortgagePaymentFrequency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mortgagePaymentFrequencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mortgages" (
    "id" TEXT NOT NULL,
    "coApplicantName" TEXT,
    "coApplicantEmail" TEXT,
    "downPayment" DOUBLE PRECISION NOT NULL,
    "downPaymentPercentage" DECIMAL(65,30) NOT NULL,
    "applicationDate" TIMESTAMP(3) NOT NULL,
    "interestRate" DECIMAL(65,30) NOT NULL,
    "approvalDate" TIMESTAMP(3),
    "mortgageDuration" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "propertyPurchaseReqId" TEXT NOT NULL,
    "mortgageStatusId" INTEGER NOT NULL,
    "mortgagePaymentFrequencyId" INTEGER NOT NULL,
    "financeCompanyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mortgages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mortgagePaymentSchedules" (
    "id" TEXT NOT NULL,
    "amountDue" DOUBLE PRECISION NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "datePaid" TIMESTAMP(3),
    "paymentStatusId" INTEGER NOT NULL,
    "mortgageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mortgagePaymentSchedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mortgagePayments" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "amountPaid" DOUBLE PRECISION NOT NULL,
    "datePaid" TIMESTAMP(3) NOT NULL,
    "mortgageId" TEXT NOT NULL,
    "mortgagePaymentScheduleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userWalletId" TEXT NOT NULL,
    "destinationWalletId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mortgagePayments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financierDeveloperMortgagePayments" (
    "id" TEXT NOT NULL,
    "amountPaid" DOUBLE PRECISION NOT NULL,
    "datePaid" TIMESTAMP(3) NOT NULL,
    "propertyId" TEXT NOT NULL,
    "mortgageId" TEXT NOT NULL,
    "financeCompanyId" TEXT NOT NULL,
    "financierWalletId" TEXT NOT NULL,
    "destinationWalletId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "financierDeveloperMortgagePayments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentTransactions" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "amountPaid" DOUBLE PRECISION NOT NULL,
    "datePaid" TIMESTAMP(3) NOT NULL,
    "propertyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "propertyPurchaseReqId" TEXT NOT NULL,
    "userWalletId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "paymentTransactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentTransactionDetails" (
    "id" TEXT NOT NULL,
    "destinationWalletId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "paymentTransactionDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQs" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FAQs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "financiers_email_key" ON "financiers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "financeCompanies_companyEmail_key" ON "financeCompanies"("companyEmail");

-- CreateIndex
CREATE UNIQUE INDEX "financeCompanyFinanciers_financierId_key" ON "financeCompanyFinanciers"("financierId");

-- CreateIndex
CREATE UNIQUE INDEX "financierWallets_financierId_key" ON "financierWallets"("financierId");

-- CreateIndex
CREATE UNIQUE INDEX "mortgageStatuses_mortgageStatus_key" ON "mortgageStatuses"("mortgageStatus");

-- CreateIndex
CREATE UNIQUE INDEX "mortgagePaymentFrequencies_mortgagePaymentFrequency_key" ON "mortgagePaymentFrequencies"("mortgagePaymentFrequency");

-- AddForeignKey
ALTER TABLE "financiers" ADD CONSTRAINT "financiers_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financeCompanies" ADD CONSTRAINT "financeCompanies_financierId_fkey" FOREIGN KEY ("financierId") REFERENCES "financiers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financeCompanyFinanciers" ADD CONSTRAINT "financeCompanyFinanciers_financeCompanyId_fkey" FOREIGN KEY ("financeCompanyId") REFERENCES "financeCompanies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financeCompanyFinanciers" ADD CONSTRAINT "financeCompanyFinanciers_financierId_fkey" FOREIGN KEY ("financierId") REFERENCES "financiers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financierInvites" ADD CONSTRAINT "financierInvites_financeCompanyId_fkey" FOREIGN KEY ("financeCompanyId") REFERENCES "financeCompanies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financierInvites" ADD CONSTRAINT "financierInvites_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financierWallets" ADD CONSTRAINT "financierWallets_financierId_fkey" FOREIGN KEY ("financierId") REFERENCES "financiers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mortgages" ADD CONSTRAINT "mortgages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mortgages" ADD CONSTRAINT "mortgages_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mortgages" ADD CONSTRAINT "mortgages_propertyPurchaseReqId_fkey" FOREIGN KEY ("propertyPurchaseReqId") REFERENCES "propertyPurchaseRequests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mortgages" ADD CONSTRAINT "mortgages_mortgageStatusId_fkey" FOREIGN KEY ("mortgageStatusId") REFERENCES "mortgageStatuses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mortgages" ADD CONSTRAINT "mortgages_mortgagePaymentFrequencyId_fkey" FOREIGN KEY ("mortgagePaymentFrequencyId") REFERENCES "mortgagePaymentFrequencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mortgages" ADD CONSTRAINT "mortgages_financeCompanyId_fkey" FOREIGN KEY ("financeCompanyId") REFERENCES "financeCompanies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mortgagePaymentSchedules" ADD CONSTRAINT "mortgagePaymentSchedules_paymentStatusId_fkey" FOREIGN KEY ("paymentStatusId") REFERENCES "paymentStatuses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mortgagePaymentSchedules" ADD CONSTRAINT "mortgagePaymentSchedules_mortgageId_fkey" FOREIGN KEY ("mortgageId") REFERENCES "mortgages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mortgagePayments" ADD CONSTRAINT "mortgagePayments_mortgageId_fkey" FOREIGN KEY ("mortgageId") REFERENCES "mortgages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mortgagePayments" ADD CONSTRAINT "mortgagePayments_mortgagePaymentScheduleId_fkey" FOREIGN KEY ("mortgagePaymentScheduleId") REFERENCES "mortgagePaymentSchedules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mortgagePayments" ADD CONSTRAINT "mortgagePayments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mortgagePayments" ADD CONSTRAINT "mortgagePayments_userWalletId_fkey" FOREIGN KEY ("userWalletId") REFERENCES "userWallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mortgagePayments" ADD CONSTRAINT "mortgagePayments_destinationWalletId_fkey" FOREIGN KEY ("destinationWalletId") REFERENCES "financierWallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financierDeveloperMortgagePayments" ADD CONSTRAINT "financierDeveloperMortgagePayments_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financierDeveloperMortgagePayments" ADD CONSTRAINT "financierDeveloperMortgagePayments_mortgageId_fkey" FOREIGN KEY ("mortgageId") REFERENCES "mortgages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financierDeveloperMortgagePayments" ADD CONSTRAINT "financierDeveloperMortgagePayments_financeCompanyId_fkey" FOREIGN KEY ("financeCompanyId") REFERENCES "financeCompanies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financierDeveloperMortgagePayments" ADD CONSTRAINT "financierDeveloperMortgagePayments_financierWalletId_fkey" FOREIGN KEY ("financierWalletId") REFERENCES "financierWallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financierDeveloperMortgagePayments" ADD CONSTRAINT "financierDeveloperMortgagePayments_destinationWalletId_fkey" FOREIGN KEY ("destinationWalletId") REFERENCES "userWallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentTransactions" ADD CONSTRAINT "paymentTransactions_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentTransactions" ADD CONSTRAINT "paymentTransactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentTransactions" ADD CONSTRAINT "paymentTransactions_propertyPurchaseReqId_fkey" FOREIGN KEY ("propertyPurchaseReqId") REFERENCES "propertyPurchaseRequests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentTransactions" ADD CONSTRAINT "paymentTransactions_userWalletId_fkey" FOREIGN KEY ("userWalletId") REFERENCES "userWallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentTransactionDetails" ADD CONSTRAINT "paymentTransactionDetails_id_fkey" FOREIGN KEY ("id") REFERENCES "paymentTransactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentTransactionDetails" ADD CONSTRAINT "paymentTransactionDetails_destinationWalletId_fkey" FOREIGN KEY ("destinationWalletId") REFERENCES "userWallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

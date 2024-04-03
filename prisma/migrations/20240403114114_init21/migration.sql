-- AlterTable
ALTER TABLE "investmentFrequencies" ADD CONSTRAINT "investmentFrequencies_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "userWallets" (
    "id" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "savings" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userWallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projectMediaCategories" (
    "id" TEXT NOT NULL,
    "mediaCategory" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "projectMediaCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projectsMedia" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "projectMediaCategoryId" TEXT NOT NULL,
    "index" INTEGER,
    "mediaUrl" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projectsMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prototypesMedia" (
    "id" TEXT NOT NULL,
    "prototypeId" TEXT NOT NULL,
    "propertyMediaCategoryId" TEXT NOT NULL,
    "index" INTEGER,
    "mediaUrl" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prototypesMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investments" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "investmentStateId" INTEGER NOT NULL,
    "investmentFrequencyId" INTEGER NOT NULL,
    "totalPaid" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "investments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investmentPaymentSchedules" (
    "id" TEXT NOT NULL,
    "amountDue" DOUBLE PRECISION NOT NULL,
    "dateDue" TIMESTAMP(3) NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "investmentId" TEXT NOT NULL,
    "paymentStatusId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "investmentPaymentSchedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investmentPayments" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "amountPaid" DOUBLE PRECISION NOT NULL,
    "datePaid" DOUBLE PRECISION NOT NULL,
    "investmentId" TEXT NOT NULL,
    "investmentPaymentScheduleId" TEXT NOT NULL,
    "userWalletId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "investmentPayments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userWallets_userId_key" ON "userWallets"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "projectMediaCategories_mediaCategory_key" ON "projectMediaCategories"("mediaCategory");

-- AddForeignKey
ALTER TABLE "userWallets" ADD CONSTRAINT "userWallets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectsMedia" ADD CONSTRAINT "projectsMedia_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectsMedia" ADD CONSTRAINT "projectsMedia_projectMediaCategoryId_fkey" FOREIGN KEY ("projectMediaCategoryId") REFERENCES "projectMediaCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prototypesMedia" ADD CONSTRAINT "prototypesMedia_prototypeId_fkey" FOREIGN KEY ("prototypeId") REFERENCES "prototypes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prototypesMedia" ADD CONSTRAINT "prototypesMedia_propertyMediaCategoryId_fkey" FOREIGN KEY ("propertyMediaCategoryId") REFERENCES "propertyMediaCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_investmentStateId_fkey" FOREIGN KEY ("investmentStateId") REFERENCES "investmentStates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_investmentFrequencyId_fkey" FOREIGN KEY ("investmentFrequencyId") REFERENCES "investmentFrequencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investmentPaymentSchedules" ADD CONSTRAINT "investmentPaymentSchedules_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "investments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investmentPaymentSchedules" ADD CONSTRAINT "investmentPaymentSchedules_paymentStatusId_fkey" FOREIGN KEY ("paymentStatusId") REFERENCES "paymentStatuses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investmentPayments" ADD CONSTRAINT "investmentPayments_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "investments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investmentPayments" ADD CONSTRAINT "investmentPayments_investmentPaymentScheduleId_fkey" FOREIGN KEY ("investmentPaymentScheduleId") REFERENCES "investmentPaymentSchedules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investmentPayments" ADD CONSTRAINT "investmentPayments_userWalletId_fkey" FOREIGN KEY ("userWalletId") REFERENCES "userWallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

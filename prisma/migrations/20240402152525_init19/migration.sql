-- CreateTable
CREATE TABLE "investmentStates" (
    "id" TEXT NOT NULL,
    "investmentState" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "investmentStates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investmentFrequencies" (
    "id" TEXT NOT NULL,
    "investmentFrequency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "investmentFrequencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentStatuses" (
    "id" TEXT NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "paymentStatuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prequalifications" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "incomeMonthly" DOUBLE PRECISION NOT NULL,
    "isSelfEmployed" BOOLEAN NOT NULL DEFAULT false,
    "companyName" TEXT,
    "companyAddress" TEXT,
    "isJointApplication" BOOLEAN NOT NULL DEFAULT false,
    "spouseEmail" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prequalifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "investmentStates_investmentState_key" ON "investmentStates"("investmentState");

-- CreateIndex
CREATE UNIQUE INDEX "investmentFrequencies_investmentFrequency_key" ON "investmentFrequencies"("investmentFrequency");

-- CreateIndex
CREATE UNIQUE INDEX "paymentStatuses_paymentStatus_key" ON "paymentStatuses"("paymentStatus");

-- AddForeignKey
ALTER TABLE "prequalifications" ADD CONSTRAINT "prequalifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

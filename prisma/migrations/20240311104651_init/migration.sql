-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "roleName" TEXT NOT NULL,
    "roleDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "vetted" BOOLEAN NOT NULL DEFAULT false,
    "isDeveloper" BOOLEAN NOT NULL DEFAULT false,
    "hasCompany" BOOLEAN NOT NULL DEFAULT false,
    "roleId" TEXT NOT NULL,
    "twoFactorAuthSecret" TEXT NOT NULL,
    "isTwoFactorAuthEnabled" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeveloperCompany" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "companyMobile" TEXT NOT NULL,
    "vetted" BOOLEAN NOT NULL DEFAULT false,
    "ownedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeveloperCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userDeveloperCompanies" (
    "id" TEXT NOT NULL,
    "developerCompanyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isOwner" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userDeveloperCompanies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userDeveloperInvites" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "developerCompanyId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userDeveloperInvites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DeveloperCompany_companyEmail_key" ON "DeveloperCompany"("companyEmail");

-- CreateIndex
CREATE UNIQUE INDEX "DeveloperCompany_ownedById_key" ON "DeveloperCompany"("ownedById");

-- CreateIndex
CREATE UNIQUE INDEX "userDeveloperCompanies_userId_key" ON "userDeveloperCompanies"("userId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeveloperCompany" ADD CONSTRAINT "DeveloperCompany_ownedById_fkey" FOREIGN KEY ("ownedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userDeveloperCompanies" ADD CONSTRAINT "userDeveloperCompanies_developerCompanyId_fkey" FOREIGN KEY ("developerCompanyId") REFERENCES "DeveloperCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userDeveloperCompanies" ADD CONSTRAINT "userDeveloperCompanies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userDeveloperInvites" ADD CONSTRAINT "userDeveloperInvites_developerCompanyId_fkey" FOREIGN KEY ("developerCompanyId") REFERENCES "DeveloperCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userDeveloperInvites" ADD CONSTRAINT "userDeveloperInvites_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

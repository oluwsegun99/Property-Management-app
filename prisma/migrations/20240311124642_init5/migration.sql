-- AlterTable
ALTER TABLE "users" ALTER COLUMN "twoFactorAuthSecret" DROP NOT NULL,
ALTER COLUMN "isTwoFactorAuthEnabled" DROP NOT NULL;

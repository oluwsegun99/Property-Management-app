-- AlterTable
ALTER TABLE "users" ADD COLUMN     "verificationAttempt" DOUBLE PRECISION,
ADD COLUMN     "verificationTimeOut" TIMESTAMP(3);

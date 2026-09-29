-- AlterTable
ALTER TABLE "User" ADD COLUMN     "modules_access" TEXT[] DEFAULT ARRAY[]::TEXT[];

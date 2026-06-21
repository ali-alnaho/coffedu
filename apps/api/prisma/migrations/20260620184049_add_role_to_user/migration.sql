-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'STUDENT', 'MANEGAR', 'TEACHER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

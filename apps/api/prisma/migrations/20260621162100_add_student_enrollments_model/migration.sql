/*
  Warnings:

  - The values [MANEGAR] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `student` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('ACTIVE', 'REPEATED', 'GRADUATED', 'WITHDRAWN');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'STUDENT', 'MANAGER', 'TEACHER', 'ADMIN');
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropTable
DROP TABLE "student";

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "grandName" TEXT NOT NULL,
    "theFourthName" TEXT,
    "familyName" TEXT,
    "motherFirstName" TEXT NOT NULL,
    "motherFatherName" TEXT NOT NULL,
    "dateOfBirth" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademicYears" (
    "id" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademicYears_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GradeLevels" (
    "id" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GradeLevels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentEnrollments" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "gradeId" TEXT NOT NULL,
    "academicId" TEXT NOT NULL,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "StudentEnrollments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AcademicYears_year_key" ON "AcademicYears"("year");

-- CreateIndex
CREATE UNIQUE INDEX "GradeLevels_level_key" ON "GradeLevels"("level");

-- CreateIndex
CREATE UNIQUE INDEX "StudentEnrollments_studentId_academicId_key" ON "StudentEnrollments"("studentId", "academicId");

-- AddForeignKey
ALTER TABLE "StudentEnrollments" ADD CONSTRAINT "StudentEnrollments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentEnrollments" ADD CONSTRAINT "StudentEnrollments_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "GradeLevels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentEnrollments" ADD CONSTRAINT "StudentEnrollments_academicId_fkey" FOREIGN KEY ("academicId") REFERENCES "AcademicYears"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

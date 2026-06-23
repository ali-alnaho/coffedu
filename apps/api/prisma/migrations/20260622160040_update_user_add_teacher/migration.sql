/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teacherId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "studentId" TEXT,
ADD COLUMN     "teacherId" TEXT,
ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "grandName" TEXT NOT NULL,
    "theFourthName" TEXT,
    "familyName" TEXT,
    "motherFirstName" TEXT NOT NULL,
    "motherFatherName" TEXT NOT NULL,
    "dateOfBirth" DATE NOT NULL,
    "mobileNumber" INTEGER NOT NULL,
    "academicQualification" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "nameOfUniversity" TEXT NOT NULL,
    "yearOfGraduation" TIMESTAMP(3) NOT NULL,
    "dateOfFirstCommencement" TIMESTAMP(3) NOT NULL,
    "ministerialAppointmentOrder" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_studentId_key" ON "User"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "User_teacherId_key" ON "User"("teacherId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

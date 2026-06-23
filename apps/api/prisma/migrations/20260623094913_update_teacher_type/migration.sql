-- AlterTable
ALTER TABLE "Teacher" ALTER COLUMN "mobileNumber" DROP NOT NULL,
ALTER COLUMN "mobileNumber" SET DATA TYPE TEXT,
ALTER COLUMN "academicQualification" DROP NOT NULL,
ALTER COLUMN "specialization" DROP NOT NULL,
ALTER COLUMN "nameOfUniversity" DROP NOT NULL,
ALTER COLUMN "yearOfGraduation" DROP NOT NULL,
ALTER COLUMN "yearOfGraduation" SET DATA TYPE DATE,
ALTER COLUMN "dateOfFirstCommencement" DROP NOT NULL,
ALTER COLUMN "dateOfFirstCommencement" SET DATA TYPE DATE,
ALTER COLUMN "ministerialAppointmentOrder" DROP NOT NULL,
ALTER COLUMN "ministerialAppointmentOrder" SET DATA TYPE DATE;

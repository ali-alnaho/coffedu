import { z } from 'zod';

export const TeacherSchema = z.object({
  firstName: z.string(),
  fatherName: z.string(),
  grandName: z.string(),
  theFourthName: z.string().optional(),
  familyName: z.string().optional(),
  motherFirstName: z.string(),
  motherFatherName: z.string(),
  dateOfBirth: z.coerce.date(),

  // more information
  mobileNumber: z.string().optional(),
  academicQualification: z.string().optional(),
  specialization: z.string().optional(),
  nameOfUniversity: z.string().optional(),
  yearOfGraduation: z.coerce.date().optional(),
  dateOfFirstCommencement: z.coerce.date().optional(),
  ministerialAppointmentOrder: z.coerce.date().optional(),
});

import { z, ZodError } from 'zod';

// export const CreateStudentSchema = z.object({
//   firstName: z.string().min(2),
//   lastName: z.string().min(2),
//   email: z.email(),
// });

export const StudentSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, { message: ' name must be at least 3 characters' })
    .max(12, { message: ' Too big ' }),
  fatherName: z.string(),
  grandName: z.string(),
  theFourthName: z.string().optional(),
  familyName: z.string().optional(),
  motherFirstName: z.string(),
  motherFatherName: z.string(),
  dateOfBirth: z.coerce.date(),
});

// export const formZodEroors = (error: ZodError) => {
//   return error;
// };

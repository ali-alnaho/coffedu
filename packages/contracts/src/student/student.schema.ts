import { z, ZodError } from 'zod';

export const StudentSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, { message: 'First name must be at least 2 characters' })
    .max(15, { message: 'First name must be at most 15 characters' }),
  fatherName: z
    .string()
    .trim()
    .min(2, { message: 'Father name must be at least 2 characters' })
    .max(15, { message: 'Father name must be at most 15 characters' }),
  grandName: z
    .string()
    .trim()
    .min(2, { message: 'Grand name must be at least 2 characters' })
    .max(15, { message: 'Grand name must be at most 15 characters' }),
  theFourthName: z
    .string()
    .trim()
    .min(2, { message: 'Fourth name must be at least 2 characters' })
    .max(15, { message: 'Fourth name must be at most 15 characters' })
    .optional(),
  familyName: z
    .string()
    .trim()
    .min(2, { message: 'Family name must be at least 2 characters' })
    .max(10, { message: 'Family name must be at most 10 characters' })
    .optional(),
  motherFirstName: z
    .string()
    .trim()
    .min(2, { message: 'Mother first name must be at least 2 characters' })
    .max(15, { message: 'Mother first name must be at most 15 characters' }),
  motherFatherName: z
    .string()
    .trim()
    .min(2, { message: 'Mother father name must be at least 2 characters' })
    .max(15, { message: 'Mother father name must be at most 15 characters' }),
  dateOfBirth: z.coerce.date(),
});

import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, { message: 'First name must be at least 2 characters' })
    .max(15, { message: 'First name must be at most 15 characters' }),
  familyName: z
    .string()
    .trim()
    .min(2, { message: 'Family name must be at least 2 characters' })
    .max(10, { message: 'Family name must be at most 10 characters' })
    .optional(),
  email: z.email({ message: 'Invalid email addreas' }),
  userName: z.string(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .max(100, { message: 'Password cannot exceed 100 characters.' }),

  //confirmPassword: z.string(),
});
// .refine((data) => {
//   (data.password === data.confirmPassword,
//     {
//       message: 'Passwords do not match',
//       path: ['confirmPassword'],
//     });
// });

// export const PublicUserSchema = registerSchema.pick({
//   firstName: true,
//   familyName: true,
// });

export const loginSchema = z.object({
  email: z
    .email({ message: 'Invalid email addreas' })
    .min(1, 'Email is required'),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .max(100, { message: 'Password cannot exceed 100 characters.' }),
});

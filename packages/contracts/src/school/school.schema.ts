import { email, z } from 'zod';

export const StudentSchema = z.object({
  name: z.string(),
  code: z.string(),
  phone: z.string(),
  email: z.string(),
  address: z.string(),
  status: z.string(),
});

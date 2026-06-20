import { registerSchema } from './auth.schema.js';
import { z } from 'zod';

export type RegisterDto = z.infer<typeof registerSchema>;

export interface AuthUser {
  userId: String;
  userEmail: String;

  // or use arry of string rolse role: String[];
  role?: 'ADMIN' | 'TEACHER' | 'STUDENT';
}

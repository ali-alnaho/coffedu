import { registerSchema } from './auth.schema.js';
import { z } from 'zod';

export type RegisterDto = z.infer<typeof registerSchema>;

export interface AuthUser {
  userId: string;
  schoolId: string | null;

  // or use arry of string rolse role: String[];
  role: 'PLATFORM_OWNER' | 'SCHOOL_ADMIN' | 'STUDENT' | 'MANAGER' | 'TEACHER';
}

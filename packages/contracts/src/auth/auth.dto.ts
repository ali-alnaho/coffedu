import { registerSchema } from './auth.schema.js';
import { z } from 'zod';

export type StudentDto = z.infer<typeof registerSchema>;

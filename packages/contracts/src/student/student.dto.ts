import { z } from 'zod';
import { StudentSchema } from './student.schema.js';

export type StudentDto = z.infer<typeof StudentSchema> & {
  id?: number;
  [key: string]: any;
};

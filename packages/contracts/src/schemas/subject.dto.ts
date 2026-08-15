import { SubjectSchema } from './subject.schema.js';
import z from 'zod';

export type SubjectDto = z.infer<typeof SubjectSchema>;

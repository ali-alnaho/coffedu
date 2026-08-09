import { GradeLevelSchema } from './gradeLevel.schema.js';
import z from 'zod';

export type GradeLevelDto = z.infer<typeof GradeLevelSchema>;

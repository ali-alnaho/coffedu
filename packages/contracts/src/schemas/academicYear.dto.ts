import { AcademicYearSchema } from './academicYear.schema.js';
import z from 'zod';

export type AcademicYearDto = z.infer<typeof AcademicYearSchema>;

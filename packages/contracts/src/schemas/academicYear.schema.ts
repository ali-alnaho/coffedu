import { z } from 'zod';

export const AcademicYearSchema = z.object({
  year: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
});

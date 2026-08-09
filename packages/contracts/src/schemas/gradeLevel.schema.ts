import { z } from 'zod';

export const GradeLevelSchema = z.object({
  level: z.int(),
  name: z.string(),
});

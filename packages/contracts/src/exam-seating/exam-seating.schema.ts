import { z } from 'zod';

export const HallSchema = z.object({
  hallName: z
    .string()
    .trim()
    .max(30, { message: 'Halls name must be at most 30 characters' }),
  column: z.coerce
    .number()
    .int({ error: 'Must be a whole number' })
    .positive({ error: 'Must be greater than 0' }),
  row: z.coerce
    .number()
    .int({ error: 'Must be a whole number' })
    .positive({ error: 'Must be greater than 0' }),
});

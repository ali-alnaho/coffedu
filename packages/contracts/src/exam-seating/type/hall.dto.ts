import { HallSchema } from '../exam-seating.schema';
import { z } from 'zod';

export type HallFormDto = z.infer<typeof HallSchema>;

export type HallDto = {
  id: string;
  author: string;
  hall: HallFormDto;
};

export type HallFormError = Partial<Record<keyof HallFormDto, string[]>>;

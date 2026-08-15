import { z } from 'zod';

export const SubjectSchema = z.object({
  subjectName: z.string(),
  gradeLevelId: z.string(),
});

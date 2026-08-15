import { Request, Response } from 'express';
import { subjectService } from './subject.service.js';
import { SubjectSchema } from '@coffedu/contracts';
import { TenantContext } from '../../types/tenantContext.js';

export async function getManyByGradeLevelId(req: Request, res: Response) {
  const ctx: TenantContext = {
    schoolId: req.user!.schoolId,
    role: req.user!.role,
  };

  const { gradeLevelId } = req.query;
  const result = await subjectService.getByGradeLevelId(
    ctx,
    gradeLevelId as string
  );
  res.json(result);
}

export async function createSubject(req: Request, res: Response) {
  const ctx: TenantContext = {
    schoolId: req.user!.schoolId,
    role: req.user!.role,
  };

  const { gradeLevelId, ...subjectInput } = SubjectSchema.parse(req.body);

  const create = await subjectService.create(ctx, {
    gradeLevelId,
    ...subjectInput,
  });

  res.status(201).json({
    success: true,
    message: 'Create!',
    data: create,
  });
}

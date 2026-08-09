import { Request, Response } from 'express';
import { gradeLevelService } from './gradeLevel.service.js';
import { TenantContext } from '../../types/tenantContext.js';
import { GradeLevelSchema } from '@coffedu/contracts';

export async function getAllGradeLevel(req: Request, res: Response) {
  const ctx: TenantContext = {
    schoolId: req.user!.schoolId,
    role: req.user!.role,
  };
  const result = await gradeLevelService.getAll(ctx);
  res.json(result);
}

export async function createGradeLevel(req: Request, res: Response) {
  const ctx: TenantContext = {
    schoolId: req.user!.schoolId,
    role: req.user!.role,
  };
  const gradeLevelInput = GradeLevelSchema.parse(req.body);
  const create = await gradeLevelService.create(ctx, gradeLevelInput);

  res.status(201).json({
    success: true,
    message: 'Create!',
    data: create,
  });
}

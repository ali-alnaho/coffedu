import { Request, Response } from 'express';
import { academicYearService } from './academicYear.service.js';
import { AcademicYearSchema } from '@coffedu/contracts';
import { TenantContext } from '../../types/tenantContext.js';

export async function getAllAcademicYear(req: Request, res: Response) {
  const ctx: TenantContext = {
    schoolId: req.user!.schoolId,
    role: req.user!.role,
  };
  const result = await academicYearService.getAllAcademicYear(ctx);
  res.json(result);
}

export async function createAcademicYear(req: Request, res: Response) {
  const ctx: TenantContext = {
    schoolId: req.user!.schoolId,
    role: req.user!.role,
  };
  const academicYearInput = AcademicYearSchema.parse(req.body);
  const create = await academicYearService.createAcademicYear(
    ctx,
    academicYearInput
  );
  res.status(201).json({
    success: true,
    message: 'Create!',
    data: create,
  });
}

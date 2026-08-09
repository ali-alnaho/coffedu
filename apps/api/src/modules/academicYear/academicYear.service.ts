import { Prisma } from '../../generated/prisma/client.js';
import { TenantContext } from '../../types/tenantContext.js';
import { academicYearRepository } from './academicYear.repository.js';
import { AcademicYearDto } from '@coffedu/contracts';

class AcademicYearService {
  async getAll(ctx: TenantContext) {
    return await academicYearRepository.findMany(ctx);
  }

  async create(ctx: TenantContext, academicYear: AcademicYearDto) {
    const data: Prisma.AcademicYearUncheckedCreateInput = {
      year: academicYear.year,
      startDate: academicYear.startDate,
      endDate: academicYear.endDate,
      isActive: true,
      schoolId: ctx.schoolId!,
    };
    return await academicYearRepository.create(data);
  }
}

export const academicYearService = new AcademicYearService();

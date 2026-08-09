import { Prisma } from '../../generated/prisma/client.js';
import { TenantContext } from '../../types/tenantContext.js';
import { academicYearRepository } from './academicYear.repository.js';
import { AcademicYearDto } from '@coffedu/contracts';

class AcademicYearService {
  async getAllAcademicYear(ctx: TenantContext) {
    return academicYearRepository.findMany(ctx);
  }

  async createAcademicYear(ctx: TenantContext, academicYear: AcademicYearDto) {
    const data: Prisma.AcademicYearUncheckedCreateInput = {
      year: academicYear.year,
      startDate: academicYear.startDate,
      endDate: academicYear.endDate,
      isActive: true,
      schoolId: ctx.schoolId!,
    };
    return academicYearRepository.create(data);
  }
}

export const academicYearService = new AcademicYearService();

import prisma from '../../db.js';
import { Prisma } from '../../generated/prisma/client.js';
import { TenantContext } from '../../types/tenantContext.js';
import { buildTenantWhere } from '../../utils/buildTenantWhere.js';

class AcademicYearRepository {
  async findMany(ctx: TenantContext) {
    return await prisma.academicYear.findMany({
      where: buildTenantWhere(ctx),
      select: {
        year: true,
        isActive: true,
      },
    });
  }

  async create(data: Prisma.AcademicYearUncheckedCreateInput) {
    return await prisma.academicYear.create({
      data,
      select: {
        year: true,
      },
    });
  }
}

export const academicYearRepository = new AcademicYearRepository();

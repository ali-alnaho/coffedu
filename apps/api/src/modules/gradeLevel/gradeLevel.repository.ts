import prisma from '../../db.js';
import { TenantContext } from '../../types/tenantContext.js';
import { buildTenantWhere } from '../../utils/buildTenantWhere.js';
import { Prisma } from '../../generated/prisma/client.js';

class GradeLevelRepository {
  async findMany(ctx: TenantContext) {
    return await prisma.gradeLevel.findMany({
      where: buildTenantWhere(ctx),
      select: {
        id: true,
        level: true,
        name: true,
      },
    });
  }

  async create(data: Prisma.GradeLevelUncheckedCreateInput) {
    return await prisma.gradeLevel.create({
      data,
      select: {
        level: true,
        name: true,
      },
    });
  }
}

export const gradeLevelRepository = new GradeLevelRepository();

import prisma from '../../db.js';
import { TenantContext } from '../../types/tenantContext.js';
import { buildTenantWhere } from '../../utils/buildTenantWhere.js';
import { Prisma } from '../../generated/prisma/client.js';

class SubjectRepository {
  async findManyByGradeLevelId(ctx: TenantContext, filters = {}) {
    return await prisma.subject.findMany({
      where: buildTenantWhere(ctx, filters),
      select: {
        id: true,
        subjectName: true,
      },
    });
  }

  async create(data: Prisma.SubjectUncheckedCreateInput) {
    return await prisma.subject.create({
      data,
      select: {
        subjectName: true,
      },
    });
  }
}

export const subjectRepository = new SubjectRepository();

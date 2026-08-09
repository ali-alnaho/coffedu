import { gradeLevelRepository } from './gradeLevel.repository.js';
import { TenantContext } from '../../types/tenantContext.js';
import { Prisma } from '../../generated/prisma/client.js';
import { GradeLevelDto } from '@coffedu/contracts';

class GradeLevelService {
  async getAll(ctx: TenantContext) {
    return await gradeLevelRepository.findMany(ctx);
  }

  async create(ctx: TenantContext, gradeLevel: GradeLevelDto) {
    const data: Prisma.GradeLevelUncheckedCreateInput = {
      level: gradeLevel.level,
      name: gradeLevel.name,
      schoolId: ctx.schoolId!,
    };

    return await gradeLevelRepository.create(data);
  }
}

export const gradeLevelService = new GradeLevelService();

import { Prisma } from '../../generated/prisma/client.js';
import { TenantContext } from '../../types/tenantContext.js';
import { subjectRepository } from './subject.repository.js';
import { SubjectDto } from '@coffedu/contracts';
import { gradeLevelRepository } from '../gradeLevel/gradeLevel.repository.js';
import { NotFoundError } from '../../errors/AppError.js';

class SubjectService {
  async getByGradeLevelId(ctx: TenantContext, gradeLevelId: string) {
    return await subjectRepository.findManyByGradeLevelId(ctx, {
      gradeLevelId,
    });
  }

  async create(ctx: TenantContext, subject: SubjectDto) {
    const gradeLevel = await gradeLevelRepository.findById(
      ctx,
      subject.gradeLevelId
    );
    // check if gradeLevelId  Belongs to schoolId
    if (!gradeLevel?.id) {
      throw new NotFoundError('Grade level not found in your school');
    }

    const data: Prisma.SubjectUncheckedCreateInput = {
      subjectName: subject.subjectName,
      gradeLevelId: subject.gradeLevelId,
      schoolId: ctx.schoolId!,
    };
    return await subjectRepository.create(data);
  }
}

export const subjectService = new SubjectService();

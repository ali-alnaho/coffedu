import prisma from '../../db.js';
import { Prisma } from '../../generated/prisma/client.js';
import { TenantContext } from '../../types/tenantContext.js';
import { buildTenantWhere } from '../../utils/buildTenantWhere.js';

export class StudentRepository {
  /**
   * Get all students.
   */
  async findMany(ctx: TenantContext) {
    return await prisma.student.findMany({
      where: buildTenantWhere(ctx),
    });
  }

  /**
   * Find a student by ID.
   */
  async findById(id: string) {
    return await prisma.student.findUnique({
      where: { id },
    });
  }

  /**
   * Create a new student.
   */
  async create(data: Prisma.StudentCreateInput) {
    return await prisma.student.create({
      data,
      select: {
        id: true,
        firstName: true,
        fatherName: true,
      },
    });
  }

  /**
   * Update an existing student.
   */
  async update(id: string, data: Prisma.StudentUpdateInput) {
    return await prisma.student.update({
      where: {
        id,
      },
      data,
    });
  }

  /**
   * Delete a student.
   */
  async delete(id: string) {
    return await prisma.student.delete({
      where: { id },
      select: {
        id: true,
        firstName: true,
        fatherName: true,
      },
    });
  }
}

export const studentRepository = new StudentRepository();

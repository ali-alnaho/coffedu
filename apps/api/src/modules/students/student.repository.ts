import prisma from '../../db.js';
import { Prisma } from '../../generated/prisma/client.js';

export class StudentRepository {
  /**
   * Get all students.
   */
  async findMany() {
    return await prisma.student.findMany();
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

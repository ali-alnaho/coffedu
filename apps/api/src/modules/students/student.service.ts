import { StudentDto } from '@coffedu/contracts';
import { studentRepository } from './student.repository.js';
import { Prisma } from '../../generated/prisma/client.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { getFullName } from './student.utils.js';
import { TenantContext } from '../../types/tenantContext.js';

class StudentService {
  async getAllStudents(ctx: TenantContext) {
    return await studentRepository.findMany(ctx);
  }

  async getStudentById(id: string) {
    return await studentRepository.findById(id);
  }

  async createStudent(student: StudentDto) {
    const password = crypto.randomBytes(8).toString('hex');
    const hashedPassword = await bcrypt.hash(password, 10);
    const generatedUserName = `${student.firstName.toLocaleLowerCase().trim()}_${crypto.randomInt(100000, 999999)}`;

    const createStudentData: Prisma.StudentCreateInput = {
      firstName: student.firstName,
      fatherName: student.fatherName,
      grandName: student.grandName,

      // sent the field just if user sent data in this field
      // if user dos not sent any data this filde will by disappeared
      ...(student.theFourthName && {
        theFourthName: student.theFourthName,
      }),

      ...(student.familyName && {
        familyName: student.familyName,
      }),

      motherFirstName: student.motherFirstName,
      motherFatherName: student.motherFatherName,
      dateOfBirth: student.dateOfBirth,
    };

    const createdStudent = await studentRepository.create(createStudentData);
    const fullName = getFullName(createdStudent);

    return {
      student: createdStudent,
      fullName,
    };
  }

  async updateStudent(id: string, student: StudentDto) {
    const updateStudentData: Prisma.StudentUpdateInput = {
      firstName: student.firstName,
      fatherName: student.fatherName,
      grandName: student.grandName,

      // sent the field just if user sent data in this field
      // if user dos not sent any data this filde will by disappeared
      theFourthName: student.theFourthName ?? undefined,
      familyName: student.familyName ?? undefined,

      motherFirstName: student.motherFirstName,
      motherFatherName: student.motherFatherName,
      dateOfBirth: student.dateOfBirth,
    };

    const updatedStudent = await studentRepository.update(
      id,
      updateStudentData
    );
    const fullName = getFullName(updatedStudent);

    return {
      student: updatedStudent,
      fullName,
    };
  }

  async deleteStudent(id: string) {
    return await studentRepository.delete(id);
  }
}

export const studentService = new StudentService();

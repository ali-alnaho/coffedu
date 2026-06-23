import { Request, Response } from 'express';
import prisma from '../../db.js';
import { Role } from '../../generated/prisma/enums.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { getFullName } from '../../utils/getFullName.js';
import { TeacherSchema } from '@coffedu/contracts';

export const createNewTeacher = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      fatherName,
      grandName,
      theFourthName,
      familyName,
      motherFirstName,
      motherFatherName,
      dateOfBirth,
      mobileNumber,
      academicQualification,
      specialization,
      nameOfUniversity,
      yearOfGraduation,
      dateOfFirstCommencement,
      ministerialAppointmentOrder,
    } = TeacherSchema.parse(req.body);

    const password = crypto.randomBytes(8).toString('hex');
    const hashedPassword = await bcrypt.hash(password, 10);
    const generatedUserName = `teacher_${firstName.toLocaleLowerCase().trim()}_${crypto.randomInt(100000, 999999)}`;

    const teacherWithUser = await prisma.$transaction(async (tx) => {
      const newTeacher = await tx.teacher.create({
        data: {
          firstName,
          fatherName,
          grandName,
          ...(theFourthName && { theFourthName }),
          ...(familyName && { familyName }),
          motherFirstName,
          motherFatherName,
          dateOfBirth,
          mobileNumber,
          academicQualification,
          specialization,
          nameOfUniversity,
          yearOfGraduation,
          dateOfFirstCommencement,
          ministerialAppointmentOrder,
        },
        select: {
          id: true,
          firstName: true,
          fatherName: true,
        },
      });

      const newUser = await tx.user.create({
        data: {
          userName: generatedUserName,
          password: hashedPassword,
          role: Role.TEACHER,
          teacherId: newTeacher.id,
        },
        select: {
          userName: true,
          role: true,
        },
      });

      return { newTeacher, newUser, password };
    });

    //Return a respons to the clinent
    res.status(201).json({
      success: true,
      message: 'Create Teacher with User successfully!',
      studentId: teacherWithUser.newTeacher.id,
      data: teacherWithUser,
      fullName: getFullName(
        teacherWithUser.newTeacher.firstName,
        teacherWithUser.newTeacher.fatherName
      ),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Failed to create teacher and user ',
    });
  }
};

export const getAllTeachers = () => {};

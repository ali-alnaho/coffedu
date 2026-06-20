import { Request, Response } from 'express';
import prisma from '../../db.js';
import { StudentSchema, ZodError, StudentDto } from '@coffedu/contracts';
import { getFullName } from './student.utils.js';

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await prisma.student.findMany();
    console.log(req.user);
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;
    const student = await prisma.student.findUnique({
      where: {
        id: Number(studentId),
      },
    });

    res.json(student);
  } catch (error) {
    res.status(404).json({ message: 'this student is not avaiable ' });
  }
};

export const createNewStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
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
    } = StudentSchema.parse(req.body);

    const newStudent = await prisma.student.create({
      data: {
        firstName,
        fatherName,
        grandName,

        // sent the field just if user sent data in this field
        // if user dos not sent any data this filde will by disappeared
        ...(theFourthName && { theFourthName }),
        ...(familyName && { familyName }),

        motherFirstName,
        motherFatherName,
        dateOfBirth,
      },
      select: {
        id: true,
        firstName: true,
        fatherName: true,
      },
    });

    //Return a respons to the clinent
    res.status(201).json({
      success: true,
      message: 'Data received successfully!',
      data: newStudent,
      fullName: getFullName(newStudent),
    });
  } catch (error) {
    // get error from zod
    // instanceof ==> convert normal runtime error to zod error
    if (error instanceof ZodError) {
      res.status(400).json({
        message: 'Validation failed',
        errors: error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      });
      return;
    }
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Failed to create student',
    });
  }
};

export const updateStudentByID = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;
    const studentData: StudentDto = StudentSchema.parse(req.body);

    const updateStudent = await prisma.student.update({
      where: {
        id: Number(studentId),
      },
      data: {
        firstName: studentData.firstName,
        fatherName: studentData.fatherName,
        grandName: studentData.grandName,

        // sent the field just if user sent data in this field
        // if user dos not sent any data this filde will by disappeared
        theFourthName: studentData.theFourthName ?? undefined,
        familyName: studentData.familyName ?? undefined,

        motherFirstName: studentData.motherFirstName,
        motherFatherName: studentData.motherFatherName,
        dateOfBirth: new Date(studentData.dateOfBirth),
      },
      select: {
        id: true,
        firstName: true,
        fatherName: true,
      },
    });
    res.status(201).json({
      success: true,
      message: 'Data update successfully!',
      data: updateStudent,
      fullName: getFullName(updateStudent),
    });
  } catch (error) {
    // get error from zod
    // instanceof ==> convert normal runtime error to zod error
    if (error instanceof ZodError) {
      res.status(400).json({
        message: 'Validation failed',
        errors: error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      });
      return;
    }
    res.status(500).json({
      success: false,
      message: 'Failed to update student',
    });
  }
};

export const deleteStudentById = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;
    const deleteStudent = await prisma.student.delete({
      where: {
        id: Number(studentId),
      },
    });
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: deleteStudent,
    });
  } catch (error) {
    res.status(404).json({ error: 'student not found' });
  }
};

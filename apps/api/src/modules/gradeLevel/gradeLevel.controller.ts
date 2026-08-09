import { Request, Response } from 'express';
import prisma from '../../db.js';
import { SchoolStatus } from '../../generated/prisma/enums.js';
import { error } from 'node:console';

export async function createGradeLevel(req: Request, res: Response) {
  try {
    const { level, name } = req.body;
    const schoolId = req.user?.schoolId as string;
    const newGradeLevel = await prisma.gradeLevel.create({
      data: {
        level,
        name,
        schoolId: schoolId,
      },
    });
    res.status(201).json({
      success: true,
      message: 'Create!',
      data: newGradeLevel,
    });

    // const checkSchool = await prisma.school.findUnique({
    //   where: {
    //     id: schoolId,
    //   },
    // });

    // switch (checkSchool?.status) {
    //   case SchoolStatus.ACTIVE:
    //     const newGradeLevel = await prisma.gradeLevel.create({
    //       data: {
    //         level,
    //         name,
    //         schoolId: schoolId,
    //       },
    //     });
    //     return res.status(201).json({
    //       success: true,
    //       message: 'Create!',
    //       data: newGradeLevel,
    //     });

    //   case SchoolStatus.PENDING_ACTIVATION:
    //     return res.status(403).json({
    //       success: false,
    //       message: 'School is not activated yet.',
    //     });

    //   case SchoolStatus.SUSPENDED:
    //     return res.status(403).json({
    //       success: false,
    //       message: 'School has been suspended.',
    //     });

    //   case SchoolStatus.ARCHIVED:
    //     return res.status(410).json({
    //       success: false,
    //       message: 'School is archived and cannot accept new entries.',
    //     });
    // }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed',
    });
  }
}

import { Request, Response, NextFunction } from 'express';
import { SchoolStatus } from '../generated/prisma/enums.js';
import prisma from '../db.js';
import { ForbiddenError } from '../errors/AppError.js';

export async function requireActiveSchool(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schoolId = req.user?.schoolId;

  if (!schoolId) {
    return next(); // skep if user not have shcoolIf so it's PLATFORM_OWNER
  }

  const school = await prisma.school.findUnique({
    where: {
      id: schoolId,
    },
    select: { status: true },
  });

  if (!school || school.status !== SchoolStatus.ACTIVE) {
    throw new ForbiddenError(
      `School is not active (status: ${school?.status ?? 'unknown'})`
    );
  }

  next();
}

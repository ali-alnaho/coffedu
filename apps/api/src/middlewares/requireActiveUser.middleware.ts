// middlewares/requireActiveUser.middleware.ts
import { Request, Response, NextFunction } from 'express';
import prisma from '../db.js';
import { UserStatus } from '../generated/prisma/enums.js';
import { ForbiddenError } from '../errors/AppError.js';

export async function requireActiveUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.user?.userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { status: true },
  });

  if (!user || user.status !== UserStatus.ACTIVE) {
    throw new ForbiddenError(
      `Account is not active (status: ${user?.status ?? 'unknown'})`
    );
  }

  next();
}

import { Request, Response } from 'express';
import prisma from '../../db.js';
import {
  Role,
  SchoolStatus,
  UserStatus,
} from '../../generated/prisma/enums.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const createNewSchool = async (req: Request, res: Response) => {
  const { name, code, phone, email, address } = req.body;

  // const password = crypto.randomBytes(8).toString('hex');
  // const hashedPassword = await bcrypt.hash(password, 10);
  const generatedUserName = `${name.toLocaleLowerCase().trim()}_${crypto.randomInt(100000, 999999)}`;

  const createSchool = await prisma.$transaction(async (tx) => {
    const cSchool = await tx.school.create({
      data: {
        name,
        code,
        phone,
        email,
        address,
        status: SchoolStatus.PENDING_ACTIVATION,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        address: true,
        status: true,
      },
    });

    const activationToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const cUser = await tx.user.create({
      data: {
        userName: generatedUserName,
        role: Role.MANAGER,
        status: UserStatus.PENDING,
        activationToken: activationToken,
        tokenExpiresAt: tokenExpiresAt,
        schoolId: cSchool.id,
      },
      select: {
        userName: true,
        role: true,
        activationToken: true,
        tokenExpiresAt: true,
      },
    });

    return { cSchool, cUser };
  });

  res.status(201).json({
    success: true,
    message: 'Create school wiht manager successfully',
    data: createSchool,
  });
};

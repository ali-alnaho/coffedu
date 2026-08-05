import { Request, Response } from 'express';
import prisma from '../../db.js';
import bcrypt from 'bcrypt';
import { UserStatus, SchoolStatus } from '../../generated/prisma/enums.js';

export const activateManagerAccount = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    const { password } = req.body;

    // check if user not send password
    if (!password) {
      return res.status(400).json({ error: 'Password is required.' });
    }
    if (!token) {
      return res.status(400).json({ error: 'Activation token is missing.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Find user with this active token
    const user = await prisma.user.findUnique({
      where: { activationToken: String(token) },
    });

    // Validate token existence and expiration date
    if (!user || !user.tokenExpiresAt || user.tokenExpiresAt < new Date()) {
      return res
        .status(400)
        .json({ error: 'Token is invalid or has expired.' });
    }

    // Activate user with school and clear token properties with set password
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          status: UserStatus.ACTIVE,
          activationToken: null,
          tokenExpiresAt: null,
        },
      }),
      prisma.school.update({
        where: { id: user.schoolId! },
        data: { status: SchoolStatus.ACTIVE },
      }),
    ]);

    res
      .status(200)
      .json({ message: 'Account successfully activated! You can now log in.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

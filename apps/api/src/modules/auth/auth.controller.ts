import { Request, Response } from 'express';
import { registerSchema, ZodError, loginSchema } from '@coffedu/contracts';
import prisma from '../../db.js';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { Role } from '../../generated/prisma/enums.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { UnauthorizedError, AppError } from '../../errors/AppError.js';

export async function register(req: Request, res: Response) {
  try {
    const { firstName, familyName, email, userName, password } =
      registerSchema.parse(req.body);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        ...(familyName && { familyName }),
        email,
        userName,
        password: hashedPassword,

        // Enforce USER role by default so users cannot self-assign ADMIN privileges
        role: Role.STUDENT,
      },
    });

    res.status(201).json({
      success: true,
      message: 'user create successufally',
      data: newUser,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: 'validation failed',
        errors: error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      });
      return;
    }
    res.status(500).json({
      success: false,
      message: 'Failed to create user',
    });
  }
}

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { userName, password } = loginSchema.parse(req.body);

  // find user by email in user module
  const user = await prisma.user.findUnique({
    where: {
      userName,
    },
    select: {
      id: true,
      role: true,
      schoolId: true,
      password: true,
    },
  });

  const DUMMY_HASH =
    '$2b$12$TKh8H1.P7M6v0N2n8m7jWuQz4b9r1L6q9bQ5h0WQm0J7W9W7vJ8Ka';

  if (!user) {
    await bcrypt.compare(password, DUMMY_HASH);
    throw new UnauthorizedError('Invalid credentials');
  }

  // check if user password = mudel password in database
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new UnauthorizedError('Invalid credentials');

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new AppError(500, 'JWT_SECRET is missing', false);
  }

  // JavaScript destructuring
  // Remove the password from the user object while creating a new object with the remaining properties.
  const { password: _, ...userWithoutPassword } = user;

  const tokenPayload = {
    userId: user.id,
    role: user.role,
    schoolId: user.schoolId,
  };
  const token = Jwt.sign(tokenPayload, jwtSecret, {
    // Set the token to expire after 1 day to reduce the risk of long-term misuse.
    expiresIn: '1d',
    // Use the HS256 signing algorithm to securely sign and verify the JWT.
    algorithm: 'HS256',
  });

  res.json({
    success: true,
    data: { user: userWithoutPassword, token },
  });
});

// add refrush token

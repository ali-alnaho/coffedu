import { Request, Response } from 'express';
import { registerSchema, ZodError, loginSchema } from '@coffedu/contracts';
import prisma from '../../db.js';
import bcrypt from 'bcrypt';

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

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new Error('User not found');

    const isValid = bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid password');

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
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
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
}

// add jwt and test token
// add refrush token

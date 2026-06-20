import { Request, Response } from 'express';
import { registerSchema, ZodError, loginSchema } from '@coffedu/contracts';
import prisma from '../../db.js';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';

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

    // find user by email in user module
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new Error('User not found');

    // check if user password = mudel password in database
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid password');

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is missing');
    }
    const token = Jwt.sign(
      {
        userId: user.id,
        userEmail: user.email,
      },
      jwtSecret,

      // ?????
      { expiresIn: '1d' }
    );

    res.json({
      success: true,
      data: { user, token },
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
      message: 'error.message',
    });
  }
}

// add jwt and test token
// add refrush token

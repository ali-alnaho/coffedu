// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { ZodError } from '@coffedu/contracts';
import { AppError } from '../errors/AppError.js';
import { Prisma } from '../generated/prisma/client.js';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const field = (err.meta?.target as string[])?.join(', ') ?? 'field';
      return res.status(409).json({
        success: false,
        message: `A record with this ${field} already exists.`,
      });
    }
  }

  console.error('UNEXPECTED ERROR:', err);
  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
}

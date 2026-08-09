import { Router } from 'express';
import {
  createAcademicYear,
  getAllAcademicYear,
} from './academicYear.controller.js';
import { authMiddleware } from '../auth/auth.middleware.js';
import { requireActiveSchool } from '../../middlewares/schoolStatus.middleware.js';
import { requireRole } from '../auth/role.middleware.js';
import { Role } from '../../generated/prisma/enums.js';
import { requireActiveUser } from '../../middlewares/requireActiveUser.middleware.js';

const academicYearRouter = Router();

academicYearRouter.get(
  '/getAllAcademicYear',
  authMiddleware,
  requireActiveUser,
  requireRole([Role.MANAGER, Role.SCHOOL_ADMIN]),
  requireActiveSchool,
  getAllAcademicYear
);

academicYearRouter.post(
  '/academicYear',
  authMiddleware,
  requireActiveUser,
  requireRole([Role.MANAGER, Role.SCHOOL_ADMIN]),
  requireActiveSchool,
  createAcademicYear
);

export default academicYearRouter;

import { Router } from 'express';
import { createGradeLevel, getAllGradeLevel } from './gradeLevel.controller.js';
import { authMiddleware } from '../auth/auth.middleware.js';
import { requireActiveSchool } from '../../middlewares/schoolStatus.middleware.js';
import { requireRole } from '../auth/role.middleware.js';
import { requireActiveUser } from '../../middlewares/requireActiveUser.middleware.js';
import { Role } from '../../generated/prisma/enums.js';

const gradeLevelRouter = Router();

gradeLevelRouter.get(
  '/getAllGradeLevel',
  authMiddleware,
  requireActiveUser,
  requireRole([Role.MANAGER, Role.SCHOOL_ADMIN]),
  requireActiveSchool,
  getAllGradeLevel
);

gradeLevelRouter.post(
  '/gradeLevel',
  authMiddleware,
  requireActiveUser,
  requireRole([Role.MANAGER, Role.SCHOOL_ADMIN]),
  requireActiveSchool,
  createGradeLevel
);

export default gradeLevelRouter;

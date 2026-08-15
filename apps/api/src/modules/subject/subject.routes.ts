import { Router } from 'express';
import { getManyByGradeLevelId, createSubject } from './subject.controller.js';
import { authMiddleware } from '../auth/auth.middleware.js';
import { requireActiveSchool } from '../../middlewares/schoolStatus.middleware.js';
import { requireActiveUser } from '../../middlewares/requireActiveUser.middleware.js';
import { requireRole } from '../auth/role.middleware.js';
import { Role } from '../../generated/prisma/enums.js';

const subjectRouter = Router();

subjectRouter.get(
  '/getManyByGradeLevelId',
  authMiddleware,
  requireActiveUser,
  requireRole([Role.MANAGER, Role.SCHOOL_ADMIN]),
  requireActiveSchool,
  getManyByGradeLevelId
);

subjectRouter.post(
  '/createSubject',
  authMiddleware,
  requireActiveUser,
  requireRole([Role.MANAGER, Role.SCHOOL_ADMIN]),
  requireActiveSchool,
  createSubject
);

export default subjectRouter;

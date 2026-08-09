import { Router } from 'express';
import { createGradeLevel } from './gradeLevel.controller.js';
import { authMiddleware } from '../auth/auth.middleware.js';
import { requireActiveSchool } from '../../middlewares/schoolStatus.middleware.js';

const gradeLevelRouter = Router();

gradeLevelRouter.post(
  '/gradeLevel',
  authMiddleware,
  requireActiveSchool,
  createGradeLevel
);

export default gradeLevelRouter;

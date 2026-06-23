import { Router } from 'express';
import { getAllTeachers, createNewTeacher } from './teacher.controller.js';
const teacherRouter = Router();

teacherRouter.get('/teacher', getAllTeachers);

teacherRouter.post('/teacher', createNewTeacher);

export default teacherRouter;

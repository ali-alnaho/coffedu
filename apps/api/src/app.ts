import express from 'express';
import cors from 'cors';
import studentRouter from './modules/students/student.routes.js';
import authRouter from './modules/auth/auth.routes.js';
import teacherRouter from './modules/teachers/teacher.routes.js';
import schoolRouter from './modules/school/school.routes.js';
import academicYearRouter from './modules/academicYear/academicYear.routes.js';
import gradeLevelRouter from './modules/gradeLevel/gradeLevel.routes.js';

import { errorHandler } from './middlewares/errorHandler.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());

//app.use('/api', studentRouter);
app.use('/api', authRouter);
app.use('/api', teacherRouter);
app.use('/api', schoolRouter);
app.use('/api', academicYearRouter);
app.use('/api', gradeLevelRouter);

app.use(errorHandler);

export default app;

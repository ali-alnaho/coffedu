import express from 'express';
import cors from 'cors';
import studentRouter from './modules/students/student.routes.js';
import authRouter from './modules/auth/auth.routes.js';
import teacherRouter from './modules/teachers/teacher.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', studentRouter);
app.use('/api', authRouter);
app.use('/api', teacherRouter);

export default app;

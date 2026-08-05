import { Router } from 'express';
import { createNewSchool } from './school.controller.js';

const schoolRouter = Router();

schoolRouter.post('/addSchool', createNewSchool);

export default schoolRouter;

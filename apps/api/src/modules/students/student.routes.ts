import { Router } from 'express';
import {
  getAllStudents,
  getStudentById,
  createNewStudent,
  updateStudentByID,
  deleteStudentById,
} from './student.controller.js';

const studentRouter = Router();

studentRouter.get('/students', getAllStudents);
studentRouter.get('/students/:id', getStudentById);

studentRouter.post('/students', createNewStudent);
studentRouter.put('/students/:id', updateStudentByID);

studentRouter.delete('/students/:id', deleteStudentById);

export default studentRouter;

// coffedu.com/student    ==> get all
// coffedu.com/student/student-id    ==> get student by id

/**
 * POST. ==> new student
 * coffedu.com/students
 *
 * put. ==> update studeny by id
 * coffedu.com/students/student-id
 */

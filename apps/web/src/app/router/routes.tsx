import { studentRoutes } from '../../features/students/routes/studentRoutes';
import { createBrowserRouter } from 'react-router';
import { examSeatingRouters } from '../../features/exam-seating/routes/examSeatingRouters';

const routes = [...studentRoutes, ...examSeatingRouters];
export const router = createBrowserRouter(routes);

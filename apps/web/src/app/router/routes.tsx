import { studentRoutes } from '../../features/students/routes/studentRoutes';
import { createBrowserRouter } from 'react-router';

const routes = [...studentRoutes];
export const router = createBrowserRouter(routes);

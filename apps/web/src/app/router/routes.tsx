import StudentCreate from '../../features/students/pages/StudentCreate';
import GetAllStudent from '../../features/students/pages/GetAllStudent';
import { createBrowserRouter } from 'react-router';
const routes = [
  {
    path: '/',
    element: <StudentCreate />,
  },
  {
    path: '/students',
    element: <GetAllStudent />,
  },
];

export const router = createBrowserRouter(routes);

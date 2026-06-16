import StudentCreate from '../pages/StudentCreate';
import StudentsList from '../pages/StudentsList';
import StudentDetails from '../pages/StudentDetails';

export const studentRoutes = [
  {
    path: '/students',
    element: <StudentCreate />,
  },
  {
    path: '/students/list',
    element: <StudentsList />,
  },
  {
    path: '/students/:studentID',
    element: <StudentDetails />,
  },
];

import { useState, useEffect } from 'react';
import { getStudents, getStudentByID } from '../services/studentApi';
import { StudentDto } from '@coffedu/contracts';
import { useParams } from 'react-router-dom';

export function useGetStudents() {
  const [student, setStudent] = useState<StudentDto>();
  const [students, setStudents] = useState<StudentDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  interface StudentParams {
    id: Pick<StudentDto, 'id'>;
  }
  const { studentID } = useParams();

  useEffect(() => {
    const getAll = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        console.error('Fetch failed:', error);
      }
    };

    const getById = async (studentID: number) => {
      try {
        const data = await getStudentByID(studentID);
        setStudent(data);
      } catch (error) {
        console.error('Fetch failed:', error);
      }
    };

    if (studentID) {
      getById(Number(studentID));
    } else {
      getAll();
    }
  }, []);

  return { student, students };
}

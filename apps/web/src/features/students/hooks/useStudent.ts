import { getStudentByID } from '../services/studentApi';
import { StudentDto } from '@coffedu/contracts';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

export function useStudent() {
  const [student, setStudent] = useState<StudentDto>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  interface StudentParams {
    id: Pick<StudentDto, 'id'>;
  }
  const { studentID } = useParams();
  useEffect(() => {
    const getById = async (studentID: number) => {
      try {
        const data = await getStudentByID(studentID);
        setStudent(data);
      } catch (error) {
        console.error('Fetch failed:', error);
      }
    };
    getById(Number(studentID));
  }, []);

  return { student, error };
}

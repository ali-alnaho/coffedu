import { useState, useEffect } from 'react';
import { getStudents } from '../services/studentApi';
import { StudentDto } from '@coffedu/contracts';

export function useGetStudents() {
  const [students, setStudents] = useState<StudentDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAll = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        console.error('Fetch failed:', error);
      }
    };

    getAll();
  }, []);

  return { students };
}

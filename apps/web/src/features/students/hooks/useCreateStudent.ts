import { createStudent } from '../services/studentApi';
import { useState } from 'react';
import { StudentDto } from '@coffedu/contracts';

export function useCreateStudent() {
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  async function create(data: StudentDto) {
    setIsLoading(true);
    // setError(null);

    try {
      const result = await createStudent(data);
      console.log(result);
      return result;
    } catch (err) {
      // setError(err.message);
    } finally {
      setIsLoading(false); // runs whether it succeeded or threw
    }
  }

  return { create, isLoading };
}

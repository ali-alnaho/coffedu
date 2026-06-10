import { StudentDto } from '@coffedu/contracts';

interface CreateStudentResponse {
  success: boolean;
  message: string;
  data: StudentDto;
}

export const createStudent = async (
  data: StudentDto
): Promise<CreateStudentResponse> => {
  const response = await fetch('http://localhost:5050/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json() as Promise<CreateStudentResponse>;
};

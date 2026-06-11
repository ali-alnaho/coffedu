import { StudentDto } from '@coffedu/contracts';

interface CreateStudentResponse {
  success: boolean;
  message: string;
  data: StudentDto;
}

// Sends a POST request to create a new student and returns the API response.
export const createStudent = async (
  data: StudentDto
): Promise<CreateStudentResponse> => {
  //Send the network request
  const response = await fetch('http://localhost:5050/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  //Check if the server responded with an error status (e.g., 404, 500)
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json() as Promise<CreateStudentResponse>;
};

export const getStudents = async () => {
  const response = await fetch('http://localhost:5050/api/students');
  return response.json() as Promise<StudentDto>;
};

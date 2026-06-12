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

// Sends a GET request to get All students from server
export const getStudents = async (): Promise<StudentDto[]> => {
  const response = await fetch('http://localhost:5050/api/students');

  if (!response.ok) {
    console.log(response.status);
  }

  const data = await response.json();
  return data;
};

import { StudentDto, StudentResponse } from '@coffedu/contracts';

// Sends a POST request to create a new student and returns the API response.
export const createStudent = async (
  data: StudentDto
): Promise<StudentResponse> => {
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

  return response.json() as Promise<StudentResponse>;
};

// Sends a PUT request to UPDATE a student by studentID and returns the API response.
export const updateStudentByID = async (
  data: StudentDto,
  studentID: Number
): Promise<StudentResponse> => {
  const response = await fetch(
    `http://localhost:5050/api/students/${studentID}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json() as Promise<StudentResponse>;
};

// Send a GET request to get All students from server
export const getStudents = async (): Promise<StudentDto[]> => {
  const response = await fetch('http://localhost:5050/api/students');

  if (!response.ok) {
    console.log(response.status);
  }

  const data = await response.json();
  return data;
};

// send a GET request  to get student by ID
export const getStudentByID = async (
  studentID: number
): Promise<StudentDto> => {
  const response = await fetch(
    `http://localhost:5050/api/students/${studentID}`
  );
  if (!response.ok) {
    console.log(response.status);
  }
  const data: StudentDto = await response.json();
  return data;
};

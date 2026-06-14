import { StudentDto } from '@coffedu/contracts';

export function getFullName(
  students: Pick<StudentDto, 'firstName' | 'fatherName'>
) {
  return `${students.firstName} ${students.fatherName}`;
}

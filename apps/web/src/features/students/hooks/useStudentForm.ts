import { useState } from 'react';
import React from 'react';
// import { studentValidation } from '../validations/student.schema.js';
import {
  StudentDto,
  StudentSchema,
  ZodError,
  flattenError,
} from '@coffedu/contracts';

const INITIAL_FORM: StudentDto = {
  firstName: '',
  fatherName: '',
  grandName: '',
  theFourthName: '',
  familyName: '',
  motherFirstName: '',
  motherFatherName: '',
  dateOfBirth: new Date(),
};

// Type of Error StudentForm
type StudentFormErrors = Partial<Record<keyof StudentDto, string[]>>;

export default function useStudentForm() {
  const [studentForm, setStudentForm] = useState<StudentDto>(INITIAL_FORM);
  const [errors, setErrors] = useState<StudentFormErrors>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setStudentForm((prev) => {
      const updated = { ...prev, [name]: value };
      return updated;
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const studentData = StudentSchema.safeParse(studentForm);

    if (!studentData.success) {
      const studentErorrs = flattenError(studentData.error);
      setErrors(studentErorrs.fieldErrors);
      return;
    }
  };

  return {
    studentForm,
    handleChange,
    errors,
    handleSubmit,
  };
}

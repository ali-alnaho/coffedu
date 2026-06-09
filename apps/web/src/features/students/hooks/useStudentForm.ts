import { useState } from 'react';
import React from 'react';
// import { studentValidation } from '../validations/student.schema.js';
import { StudentDto, StudentSchema, ZodError } from '@coffedu/contracts';

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

// interface StudentFormErorr {
//   name?: string;
//   age?: string;
//   email?: string;
// }

export default function useStudentForm() {
  const [studentForm, setStudentForm] = useState<StudentDto>(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  // function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const { name, value } = e.target;
  //   const updateFormVal = { ...studentForm, [name]: value };
  //   setStudentForm(updateFormVal);
  //   // setErrors(studentValidation(updateFormVal));
  // }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setStudentForm((prev) => {
      const updated = { ...prev, [name]: value };

      // to make index == StudentDto??????
      // const updated = {
      //   ...prev,
      //   [name as keyof StudentDto]:
      //     name === 'dateOfBirth' ? new Date(value) : value,
      // };

      return updated;
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const studentData = StudentSchema.parse(studentForm);
      console.log(studentData);
    } catch (error) {
      if (error instanceof ZodError) {
        const globalMessages = error.issues.map((issue) => issue.message);
        setErrors(globalMessages);
        console.log(errors);
      }
    }
  };

  return {
    studentForm,
    handleChange,
    errors,
    handleSubmit,
  };
}

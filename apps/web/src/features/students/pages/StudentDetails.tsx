import { useState } from 'react';
import { useStudent } from '../hooks/useStudent';

export default function StudentDetails() {
  const { student } = useStudent();
  return (
    <div>
      <p>{student?.id}</p>
      <h1>{student?.firstName}</h1>
      <p>{student?.familyName}</p>
    </div>
  );
}

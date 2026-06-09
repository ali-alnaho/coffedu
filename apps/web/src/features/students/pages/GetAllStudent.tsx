import React from 'react';
import { useState, useEffect } from 'react';
import { StudentDto } from '@coffedu/contracts';

export default function GetAllStudent() {
  const [students, setStudents] = useState<StudentDto[]>([]);

  useEffect(() => {
    fetch(`http://localhost:5050/api/students`)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
      });
  }, []);
  return (
    <div>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <h1>{student.firstName}</h1>
            <p>{student.fatherName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

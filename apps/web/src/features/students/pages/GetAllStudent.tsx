import React from 'react';
import { useState, useEffect } from 'react';
import { StudentDto } from '@coffedu/contracts';
import { useGetStudents } from '../hooks/useGetStudents';

export default function GetAllStudent() {
  const { students } = useGetStudents();

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

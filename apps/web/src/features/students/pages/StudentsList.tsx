import React from 'react';
import { useState, useEffect } from 'react';
import { StudentDto } from '@coffedu/contracts';
import { useStudents } from '../hooks/useStudents';
import { Link } from 'react-router-dom';

export default function StudentsList() {
  const { students } = useStudents();

  return (
    <div>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <h1>{student.firstName}</h1>
            <p>{student.fatherName}</p>
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              to={`/students/${student.id}`}
            >
              Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

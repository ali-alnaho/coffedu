import React from 'react';
import { useState, useEffect } from 'react';
import { StudentDto } from '@coffedu/contracts';
import { useGetStudents } from '../hooks/useGetStudents';
import { Link } from 'react-router-dom';

export default function GetAllStudent() {
  const { students, student: selectedStudent } = useGetStudents();

  return (
    <div>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <h1>{student.firstName}</h1>
            <p>{student.fatherName}</p>
            <Link to={`api/students/${student.id}`}>Details</Link>
          </li>
        ))}
      </ul>
      {/* <div>
        {selectedStudent
          ? `${selectedStudent.firstName} ${selectedStudent.fatherName}`
          : 'No student selected'}
      </div> */}
    </div>
  );
}

import { useState } from 'react';
// import "./App";
import StudentCreate from './features/students/pages/StudentCreate.js';
import GetAllStudent from './features/students/pages/getAllStudent.js';
function App() {
  return (
    <div>
      <StudentCreate />
      <GetAllStudent />
    </div>
  );
}

export default App;

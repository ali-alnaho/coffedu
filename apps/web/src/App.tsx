import { useState } from 'react';
// import "./App";
import StudentCreate from './features/students/pages/StudentCreate.js';
import GetAllStudent from './features/students/pages/GetAllStudent.js';
function App() {
  return (
    <div>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-blue-600">Coffedu</h1>
      </div>
      <StudentCreate />
      <GetAllStudent />
    </div>
  );
}

export default App;

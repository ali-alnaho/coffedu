import { useState } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './app/router/routes';
// import "./App";
function App() {
  return <RouterProvider router={router} />;
}

export default App;

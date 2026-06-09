// Define the shape of the form input
interface StudentForm {
  name: string;
  age: string | number;
}

// Define the shape of the errors output
interface StudentFormErorr {
  name?: string;
  age?: string;
  email?: string;
}

export function studentValidation(form: StudentForm): StudentFormErorr {
  const errors: StudentFormErorr = {};
  if (!form.name.trim()) {
    errors.name = 'Name is required.';
  }
  if (!Number(form.age)) {
    errors.age = 'Age is required.';
  } else if (Number(form.age) < 12) {
    errors.age = 'You must be at least 12.';
  }
  return errors;
}

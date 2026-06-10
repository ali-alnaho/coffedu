import Input from '../../../shared/components/ui/Input.js';
import useStudentForm from '../hooks/useStudentForm.js';
import { StudentDto } from '@coffedu/contracts';

type StudentField = {
  label: string;

  // Omit<StudentDto, 'id'>
  // Creates a new type from StudentDto without the "id" property.
  //
  // keyof
  // Gets all property names (keys) of that type.
  // name: 'firstName' | 'lastName' | 'dateOfBirth' ........ ;
  //
  // Extract<..., string>
  // Keeps only string keys.
  //
  // Result:
  // name can only be one of the StudentDto property names,
  // except "id".
  name: Extract<keyof Omit<StudentDto, 'id'>, string>;

  type?: 'text' | 'date';
  required?: boolean;
  placeholder?: string;
};

const studentFields: StudentField[] = [
  {
    label: 'First Name',
    name: 'firstName',
    required: true,
    placeholder: 'Enter The Student First Name',
  },
  {
    label: 'Father Name',
    name: 'fatherName',
    required: true,
    placeholder: 'Enter The Student Father Name',
  },
  {
    label: 'Grand Name',
    name: 'grandName',
    placeholder: 'Enter The Student Grand Name',
  },
  {
    label: 'Fourth Name',
    name: 'theFourthName',
    placeholder: 'Enter The Student Forth Name',
  },
  {
    label: 'Family Name',
    name: 'familyName',
    placeholder: 'Enter The Student Family Name',
  },
  {
    label: 'Mother First Name',
    name: 'motherFirstName',
    placeholder: 'Enter The Student Mother First Name',
  },
  {
    label: 'Mother Father Name',
    name: 'motherFatherName',
    placeholder: 'Enter The Student Mother Father Name',
  },
  {
    type: 'date',
    label: 'Date OF Birth',
    name: 'dateOfBirth',
    placeholder: 'Enter The Student Date Of Birth',
  },
];

export default function StudentForm() {
  const { studentForm, handleChange, handleSubmit, errors } = useStudentForm();

  const getInputValue = (field: StudentField): string => {
    const value = studentForm[field.name];

    if (value instanceof Date) {
      return value.toISOString().split('T')[0];
    }
    return value == null ? '' : String(value);
  };

  return (
    <div>
      <p>create new student</p>

      <form onSubmit={handleSubmit}>
        {studentFields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type ?? 'text'}
            value={getInputValue(field)}
            onChange={handleChange}
            required={field.required}
            placeholder={field.placeholder}
            error={errors[field.name]}
          />
        ))}

        {/* 
        <Input
          label="First Name"
          name="firstName"
          value={studentForm.firstName}
          onChange={handleChange}
          required={true}
          placeholder="Enter The Student First Name"
        />
        <Input
          label="Father Name"
          name="fatherName"
          value={studentForm.fatherName}
          onChange={handleChange}
          required={true}
          placeholder="Enter The Student Father Name"
        />
        <Input
          label="Grand Name"
          name="grandName"
          value={studentForm.grandName}
          onChange={handleChange}
          placeholder="Enter The Student Grand Name"
        />
        <Input
          label="Fourth Name"
          name="theFourthName"
          value={studentForm.theFourthName ?? ''}
          onChange={handleChange}
          placeholder="Enter The Student Forth Name"
        />
        <Input
          label="Family Name"
          name="familyName"
          value={studentForm.familyName ?? ''}
          onChange={handleChange}
          placeholder="Enter The Student Family Name"
        />
        <Input
          label="Mother First Name"
          name="motherFirstName"
          value={studentForm.motherFirstName}
          onChange={handleChange}
          placeholder="Enter The Student Mother First Name"
        />
        <Input
          label="Mother Father Name"
          name="motherFatherName"
          value={studentForm.motherFatherName}
          onChange={handleChange}
          placeholder="Enter The Student Mother Father Name"
        />
        <Input
          type="date"
          label="Date OF Birth"
          name="dateOfBirth"
          value={
            // to convert date to string becouse of StudentDto
            studentForm.dateOfBirth instanceof Date
              ? studentForm.dateOfBirth.toISOString().split('T')[0]
              : String(studentForm.dateOfBirth)
          }
          onChange={handleChange}
          placeholder="Enter The Student Date Of Birth"
        /> */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          submit
        </button>
      </form>
    </div>
  );
}

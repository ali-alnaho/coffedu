type Student = {
  id: string;
  name: string;
  academicYear: string;
  status: string;
  level: number;
  department?: string;
};

function groupStudentsByLevel(student: Student[]) {
  const studentByLevel = new Map<number, Student[]>();
  //let largestGroup: Student[] = [];

  for (let i = 0; i < student.length; i++) {
    const currentStudent = student[i];
    const studentLevel = currentStudent.level;

    if (!studentByLevel.has(studentLevel)) {
      studentByLevel.set(studentLevel, []);
    }

    // ! => mean this value is not undefined
    const group = studentByLevel.get(studentLevel)!;
    group.push(currentStudent);

    // if (largestGroup.length < group.length) {
    //   largestGroup = group;
    // }
  }

  return studentByLevel;
}

export default groupStudentsByLevel;

type Student = {
  id: string;
  name: string;
  academicYear: string;
  status: string;
  level: number;
  department?: string;
};

function groupByDepartmentAndLevel(student: Student[]) {
  const studentByDepartmentAndLevel = new Map();
  const departmentArray = [];

  student.forEach((item) => {
    const { level, department } = item;

    if (!studentByDepartmentAndLevel.has(department)) {
      studentByDepartmentAndLevel.set(department, new Map());
    }
    const levelMap = studentByDepartmentAndLevel.get(department);
    if (!levelMap.has(level)) {
      levelMap.set(level, []);
    }

    levelMap.get(level).push(item);
  });

  // 1. Loop through the outer Map (Departments)
  for (const [department, levelsMap] of studentByDepartmentAndLevel) {
    const levelsArray = [];

    // 2. Loop through the inner Map (Levels)
    for (const [level, students] of levelsMap) {
      levelsArray.push({ level, students });
    }

    // 3. Push the department object into the main array
    departmentArray.push({
      department: department,
      levels: levelsArray,
    });
  }

  return { studentByDepartmentAndLevel, departmentArray };
}

export default groupByDepartmentAndLevel;

// Map(3) {
//   1 => Map(1) {
//     1 => [ 'a', 'b', 'b' ]
//   },
//   2 => Map(3) {
//     1 => [ 'c' ],
//     2 => [ 'd', 'e', 'f' ],
//     3 => [ 'j' ]
//   },
//   3 => Map(1) {
//     3 => [ 'k', 'l', 'm', 'n', 'o', 'p' ]
//   }
// }

import { Student, GroupType } from '@coffedu/contracts';

type Department = Student['department'];
type Level = Student['level'];

// Function Overloads
function groupStudents(
  students: Student[],
  type: 'LEVEL'
): Map<Level, Student[]>;

// Function Overloads
function groupStudents(
  students: Student[],
  type: 'DEPARTMENT'
): Map<Department, Map<Level, Student[]>>;

function groupStudents(student: Student[], type: GroupType) {
  switch (type) {
    case 'LEVEL':
      const studentByLevel = new Map<Level, Student[]>();
      for (let i = 0; i < student.length; i++) {
        const currentStudent = student[i];
        const studentLevel = currentStudent.level;

        if (!studentByLevel.has(studentLevel)) {
          studentByLevel.set(studentLevel, []);
        }

        // ! => mean this value is not undefined
        const group = studentByLevel.get(studentLevel)!;
        group.push(currentStudent);
      }

      return studentByLevel;

    case 'DEPARTMENT':
      const studentByDepartmentAndLevel = new Map<
        Department,
        Map<number, Student[]>
      >();
      student.forEach((item) => {
        const { level, department } = item;

        if (!studentByDepartmentAndLevel.has(department)) {
          studentByDepartmentAndLevel.set(department, new Map());
        }
        const levelMap = studentByDepartmentAndLevel.get(department)!;
        if (!levelMap.has(level)) {
          levelMap.set(level, []);
        }
        levelMap.get(level)!.push(item);
      });
      return studentByDepartmentAndLevel;
  }
}

export default groupStudents;

// studentByDepartmentAndLevel =>  mapToArray
/**
 *   const departmentArray = [];
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
 */

// studentByLevel => mapToArray
/**
 * const groups = Array.from(studentByLevel.values());
 */

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

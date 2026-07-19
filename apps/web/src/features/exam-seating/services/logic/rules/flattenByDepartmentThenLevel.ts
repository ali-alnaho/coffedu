import { Student } from '@coffedu/contracts';

type Department = Student['department'];
type Level = Student['level'];
/**
 * Flattens the department -> level -> students structure into a single
 * ordered list: all of department[0]'s students (level 1, then 2, then 3...),
 * then all of department[1]'s students, and so on.
 */
function flattenByDepartmentThenLevel(
  studentByDepartmentAndLevel: Map<Department, Map<Level, Student[]>>
): Student[] {
  const flattened: Student[] = [];

  for (const levelMap of studentByDepartmentAndLevel.values()) {
    for (const studentsAtLevel of levelMap.values()) {
      flattened.push(...studentsAtLevel);
    }
  }

  return flattened;
}

export default flattenByDepartmentThenLevel;

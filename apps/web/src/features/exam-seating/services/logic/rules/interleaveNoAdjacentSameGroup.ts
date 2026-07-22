import { Student } from '@coffedu/contracts';
type Department = Student['department'];
type Level = Student['level'];

type GroupKey = string; // `${department}-${level}`

export default function interleaveNoAdjacentSameGroup(
  studentByDepartmentAndLevel: Map<Department, Map<Level, Student[]>>
): Student[] {
  // Flatten into named groups: one array per department+level combo
  const groups: { key: GroupKey; students: Student[] }[] = [];
  for (const [department, levelMap] of studentByDepartmentAndLevel.entries()) {
    for (const [level, students] of levelMap.entries()) {
      groups.push({ key: `${department}-${level}`, students: [...students] });
    }
  }

  const result: Student[] = [];
  let lastGroupKey: GroupKey | null = null;

  const totalStudents = groups.reduce((sum, g) => sum + g.students.length, 0);

  for (let i = 0; i < totalStudents; i++) {
    // Sort remaining groups by how many students are left, largest first
    groups.sort((a, b) => b.students.length - a.students.length);

    // Pick the largest group that ISN'T the same as the last one placed
    let chosen = groups.find(
      (g) => g.students.length > 0 && g.key !== lastGroupKey
    );

    // If every remaining group equals lastGroupKey (only one group left),
    // there's no way to avoid a repeat — fall back to it
    if (!chosen) {
      chosen = groups.find((g) => g.students.length > 0);
    }

    if (!chosen) break; // no students left at all

    const student = chosen.students.shift()!;
    result.push(student);
    lastGroupKey = chosen.key;
  }

  return result;
}

type Student = {
  id: string;
  name: string;
  academicYear: string;
  status: string;
  level: number;
  department?: string;
};

function distributeByLevel(
  studentByLevel: Map<number, Student[]>,
  largestGroup: Student[]
) {
  const groups = Array.from(studentByLevel.values());
  const result: Student[] = [];
  for (let i = 0; i < largestGroup.length; i++) {
    for (let j = 0; j < groups.length; j++) {
      if (groups[j][i]) {
        result.push(groups[j][i]);
      }
    }
  }
  return result;
}

export default distributeByLevel;

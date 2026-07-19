type Student = {
  id: string;
  name: string;
  academicYear: string;
  status: string;
  level: number;
  department?: string;
};

interface DepartmentGroup {
  department: string;
  levels: {
    level: number;
    students: Student[];
  }[];
}

// 2. The flattening function
function flattenGroupedData(groupedArray: DepartmentGroup[]) {
  return groupedArray.flatMap((deptGroup) =>
    deptGroup.levels.flatMap((levelGroup) =>
      levelGroup.students.map((studentName) => ({
        department: deptGroup.department,
        level: levelGroup.level,
        name: studentName,
      }))
    )
  );
}

export default flattenGroupedData;

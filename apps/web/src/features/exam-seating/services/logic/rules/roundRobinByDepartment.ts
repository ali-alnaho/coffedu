import { Student } from '@coffedu/contracts';

type Department = Student['department'];
type Level = Student['level'];

function roundRobinByDepartment(
  studentByDepartmentAndLevel: Map<Department, Map<Level, Student[]>>
): Student[] {
  // Turn each department's Map<Level, Student[]> into an ordered array
  // of level-groups: department[0] = [level1Students, level2Students, level3Students]
  const departmentLevelGroups: Student[][][] = Array.from(
    studentByDepartmentAndLevel.values()
  ).map((levelMap) => Array.from(levelMap.values()));

  const maxLevelsCount = Math.max(
    ...departmentLevelGroups.map((levels) => levels.length),
    0
  );

  const result: Student[] = [];

  for (let levelIndex = 0; levelIndex < maxLevelsCount; levelIndex++) {
    for (
      let deptIndex = 0;
      deptIndex < departmentLevelGroups.length;
      deptIndex++
    ) {
      const levelGroup = departmentLevelGroups[deptIndex][levelIndex];
      if (levelGroup) {
        result.push(...levelGroup);
      }
    }
  }

  return result;
}

export default roundRobinByDepartment;

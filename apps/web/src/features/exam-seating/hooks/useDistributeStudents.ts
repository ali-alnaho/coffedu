import { useState } from 'react';
import { useDistributeStudentsStore } from '../store/useDistributeStudentsStore';
import { student } from '../services/api/StudentData';
import { useHallSeatingStore } from '../store/useHallSeatingStore';

import { DistributionRule, Student } from '@coffedu/contracts';

import roundRobinByLevel from '../services/logic/rules/roundRobinByLevel';
import flattenByDepartmentThenLevel from '../services/logic/rules/flattenByDepartmentThenLevel';
import groupStudents from '../services/logic/groupStudents/groupStudents';

function useDistributeStudents() {
  // set Rules
  const [selectRule, setSelectRule] = useState<string>('RANDOM');
  const rules: DistributionRule[] = [
    'LEVEL',
    'DEPARTMENT',
    'ROUND_ROBIN',
    'RANDOM',
  ];

  // set horizontal, vertical
  const [direction, setDirection] = useState<string>('vertical');

  // useHallSeatingStore
  const emptySeating = useHallSeatingStore((state) => state.emptySeating);

  // useDistributeStudentsStore
  const examHallSeating = useDistributeStudentsStore(
    (state) => state.examHallSeating
  );
  const generateExamHallSeatingByRow = useDistributeStudentsStore(
    (state) => state.generateExamHallSeatingByRow
  );
  const generateExamHallSeatingByColumn = useDistributeStudentsStore(
    (state) => state.generateExamHallSeatingByColumn
  );

  const generateExamHallSeatingByColumnByLevel = useDistributeStudentsStore(
    (state) => state.generateExamHallSeatingByColumnByLevel
  );

  function distribute() {
    // groupStudentsByLevel
    const studentByLevel = groupStudents(student, 'LEVEL');
    // groupByDepartmentAndLevel
    const studentByDepartmentAndLevel = groupStudents(student, 'DEPARTMENT');

    let studentsForDistribution: Student[];
    switch (selectRule) {
      case 'LEVEL':
        return generateExamHallSeatingByColumnByLevel(
          emptySeating,
          studentByLevel
        );

      case 'DEPARTMENT':
        const flattenStudent = flattenByDepartmentThenLevel(
          studentByDepartmentAndLevel
        );
        studentsForDistribution = flattenStudent;
        break;

      case 'ROUND_ROBIN':
        const rounedRobinStudent = roundRobinByLevel(studentByLevel);
        studentsForDistribution = rounedRobinStudent;
        break;

      case 'RANDOM':
        studentsForDistribution = student;
        break;

      default:
        throw new Error(`Unsupported rule: ${selectRule}`);
    }

    if (direction === 'vertical') {
      return generateExamHallSeatingByRow(
        emptySeating,
        studentsForDistribution
      );
    } else if (direction == 'horizontal') {
      return generateExamHallSeatingByColumn(
        emptySeating,
        studentsForDistribution
      );
    }
  }

  return {
    distribute,
    examHallSeating,

    // set Rules
    rules,
    selectRule,
    setSelectRule,

    // set horizontal, vertical
    direction,
    setDirection,
  };
}

export default useDistributeStudents;

// switch (selectRule) {
//   case 'LEVEL':
//     return generateExamHallSeatingByColumnByLevel(
//       emptySeating,
//       studentByLevel
//     );

//   case 'DEPARTMENT':
//     const flattenStudent = flattenByDepartmentThenLevel(
//       studentByDepartmentAndLevel
//     );
//     return generateExamHallSeatingByColumn(emptySeating, flattenStudent);

//   case 'ROUND_ROBIN':
//     const rounedRobinStudent = roundRobinByLevel(studentByLevel);
//     return generateExamHallSeatingByRow(emptySeating, rounedRobinStudent);

//   case 'RANDOM':
//     return generateExamHallSeatingByRow(emptySeating, student);

//   default:
//     throw new Error(`Unsupported rule: ${selectRule}`);
// }

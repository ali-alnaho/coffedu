import { useState } from 'react';
import { useDistributeStudentsStore } from '../store/useDistributeStudentsStore';
import { student } from '../services/api/StudentData';
import { useHallSeatingStore } from '../store/useHallSeatingStore';

import groupStudentsByLevel from '../services/logic/groupStudents/groupStudentsByLevel';
import roundRobinByLevel from '../services/logic/rules/roundRobinByLevel';
import groupByDepartmentAndLevel from '../services/logic/groupStudents/groupByDepartmentAndLevel';

import { DistributionRule } from '@coffedu/contracts';

type Student = {
  id: string;
  name: string;
  academicYear: string;
  status: string;
  level: number;
  department?: string;
};

function useDistributeStudents() {
  // set Rules
  const [selectRule, setSelectRule] = useState<string>('RANDOM');
  const rules: DistributionRule[] = [
    'LEVEL',
    'DEPARTMENT',
    'ROUND_ROBIN',
    'RANDOM',
  ];

  // useHallSeatingStore
  const emptySeating = useHallSeatingStore((state) => state.emptySeating);

  // useDistributeStudentsStore
  const examHallSeating = useDistributeStudentsStore(
    (state) => state.examHallSeating
  );
  const generateExamHallSeating = useDistributeStudentsStore(
    (state) => state.generateExamHallSeating
  );

  // groupStudentsByLevel
  const studentByLevel = groupStudentsByLevel(student);
  // groupByDepartmentAndLevel
  const { studentByDepartmentAndLevel, departmentArray } =
    groupByDepartmentAndLevel(student);
  // groupRandom

  function distribute() {
    let studentsForDistribution: Student[];
    switch (selectRule) {
      case 'LEVEL':
      //   studentsForDistribution =
      //   break;

      case 'DEPARTMENT':
      // studentsForDistribution = flattenGroupedData(departmentArray);
      // break;

      case 'ROUND_ROBIN':
        studentsForDistribution = roundRobinByLevel(studentByLevel);
        break;

      default:
        studentsForDistribution = student;
    }
    return generateExamHallSeating(emptySeating, studentsForDistribution);
  }
  return { distribute, examHallSeating, rules, selectRule, setSelectRule };
}

export default useDistributeStudents;

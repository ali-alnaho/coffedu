import { useDistributeStudentsStore } from '../store/useDistributeStudentsStore';
import { student } from '../services/api/StudentData';
import { useHallSeatingStore } from '../store/useHallSeatingStore';

import generateStudentByLevel from '../services/logic/generateStudents/generateStudentByLevel';
import distributeByLevel from '../services/logic/rules/distributeByLevel';

type DistributionRule =
  | 'SEQUENTIAL'
  | 'LEVEL'
  | 'DEPARTMENT'
  | 'LEVEL_THEN_DEPARTMENT'
  | 'ROUND_ROBIN'
  | 'RANDOM';

function useDistributeStudents() {
  // useHallSeatingStore
  const emptySeating = useHallSeatingStore((state) => state.emptySeating);

  // useDistributeStudentsStore
  const examHallSeating = useDistributeStudentsStore(
    (state) => state.examHallSeating
  );
  const generateExamHallSeating = useDistributeStudentsStore(
    (state) => state.generateExamHallSeating
  );

  // generateStudentByLevel
  const { studentByLevel, largestGroup } = generateStudentByLevel(student);

  // rules 1- byLevel.
  // Round Robin
  const byLevel = distributeByLevel(studentByLevel, largestGroup);

  // rules 2-distributeByDepartment()
  // rules 3-distributeRandom()

  function distribute() {
    console.log(studentByLevel, byLevel);
    return generateExamHallSeating(emptySeating, byLevel);
  }

  return { distribute, examHallSeating };
}

export default useDistributeStudents;

import { useDistributeStudentsStore } from '../store/useDistributeStudentsStore';

import { student } from '../services/api/StudentData';

import { useHallSeatingStore } from '../store/useHallSeatingStore';
function useDistributeStudents() {
  const emptySeating = useHallSeatingStore((state) => state.emptySeating);
  const examHallSeating = useDistributeStudentsStore(
    (state) => state.examHallSeating
  );
  const generateExamHallSeating = useDistributeStudentsStore(
    (state) => state.generateExamHallSeating
  );
  // const setDistributedSeating = useHallSeatingStore(
  //   (state) => state.setDistributedSeating
  // );
  function distribute() {
    return generateExamHallSeating(emptySeating, student);

    //const finalSeatingMap = distributeStudents(emptySeating, student);
    //setDistributedSeating(finalSeatingMap);
  }

  return { distribute, examHallSeating };
}

export default useDistributeStudents;

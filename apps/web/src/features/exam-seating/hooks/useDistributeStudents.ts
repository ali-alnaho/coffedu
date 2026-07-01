import distributeStudents from '../services/logic/distributeStudents';

import { student } from '../services/api/StudentData';

import { useHallSeatingStore } from '../store/useHallSeatingStore';
function useDistributeStudents() {
  const emptySeating = useHallSeatingStore((state) => state.emptySeating);

  function distribute() {
    return distributeStudents(emptySeating, student);
  }

  return { distribute };
}

export default useDistributeStudents;

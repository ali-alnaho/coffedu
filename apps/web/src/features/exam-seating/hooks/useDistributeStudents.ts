import distributeStudents from '../services/logic/distributeStudents';

import { student } from '../services/api/StudentData';

import { useHallSeatingStore } from '../store/useHallSeatingStore';
function useDistributeStudents() {
  const emptySeating = useHallSeatingStore((state) => state.emptySeating);
  // const setDistributedSeating = useHallSeatingStore(
  //   (state) => state.setDistributedSeating
  // );
  function distribute() {
    return distributeStudents(emptySeating, student);

    //const finalSeatingMap = distributeStudents(emptySeating, student);
    //setDistributedSeating(finalSeatingMap);
  }

  return { distribute };
}

export default useDistributeStudents;

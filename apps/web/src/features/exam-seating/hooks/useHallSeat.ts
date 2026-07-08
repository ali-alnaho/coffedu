import { useHallsStore } from '../store/useHallsStore';
import { useHallSeatingStore } from '../store/useHallSeatingStore';

function useHallSeat() {
  const halls = useHallsStore((state) => state.halls);
  const emptySeating = useHallSeatingStore((state) => state.emptySeating);
  const generateHallSeating = useHallSeatingStore(
    (state) => state.generateHallSeating
  );
  const toggleSeatStatus = useHallSeatingStore(
    (state) => state.toggleSeatStatus
  );

  function generate() {
    generateHallSeating(halls);
  }
  function handleToggleSeat(
    hallId: string,
    rowIndex: number,
    colIndex: number
  ) {
    toggleSeatStatus(hallId, rowIndex, colIndex);
  }
  return { generate, handleToggleSeat, emptySeating };
}

export default useHallSeat;

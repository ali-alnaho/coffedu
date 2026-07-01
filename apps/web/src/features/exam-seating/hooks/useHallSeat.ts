import { useHallsStore } from '../store/useHallsStore';
import { useHallSeatingStore } from '../store/useHallSeatingStore';

function useHallSeat() {
  const halls = useHallsStore((state) => state.halls);
  const emptySeating = useHallSeatingStore((state) => state.emptySeating);
  const generateSeating = useHallSeatingStore((state) => state.generate);
  const toggleSeat = useHallSeatingStore((state) => state.toggleSeat);

  function generate() {
    generateSeating(halls);
  }
  function handleToggleSeat(
    hallId: string,
    rowIndex: number,
    colIndex: number
  ) {
    toggleSeat(hallId, rowIndex, colIndex);
  }
  return { generate, handleToggleSeat, emptySeating };
}

export default useHallSeat;

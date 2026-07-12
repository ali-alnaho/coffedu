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

  const toggleVerticalAisle = useHallSeatingStore(
    (state) => state.toggleVertical
  );

  const toggleHorizontalAisle = useHallSeatingStore(
    (state) => state.toggleHorizontal
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

  function handleToggleVerticalAisle(hallId: string, columnIndex: number) {
    toggleVerticalAisle(hallId, columnIndex);
  }

  function handelToggleHorizontalAisle(hallId: string, rowIndex: number) {
    toggleHorizontalAisle(hallId, rowIndex);
  }

  return {
    generate,
    handleToggleSeat,
    handleToggleVerticalAisle,
    handelToggleHorizontalAisle,
    emptySeating,
  };
}

export default useHallSeat;

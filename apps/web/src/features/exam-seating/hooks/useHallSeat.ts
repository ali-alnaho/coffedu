import { useState } from 'react';
import generateEmpteSeat from '../services/logic/generateEmpteSeat';
import { HallSeating } from '@coffedu/contracts';
import { useHallsStore } from '../store/useHallsStore';

function useHallSeat() {
  const [emptySeating, setEmptySeating] = useState<HallSeating[]>([]);
  const halls = useHallsStore((state) => state.halls);

  function generate() {
    const EmpteSeat = generateEmpteSeat(halls);

    setEmptySeating(EmpteSeat);
  }

  //   function toggleSeatStatus() {

  //   }

  return { generate, emptySeating };
}

export default useHallSeat;

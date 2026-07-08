import { Halls, HallSeating } from '@coffedu/contracts';
import { create } from 'zustand';
import generateEmpteSeat from '../services/logic/generateEmpteSeat';
import toggleSeatStatus from '../services/logic/toggleSeatStatus';

type HallSeatingStore = {
  emptySeating: HallSeating[];
  generateHallSeating: (halls: Halls[]) => void;
  toggleSeatStatus: (
    hallId: string,
    rowIndex: number,
    colIndex: number
  ) => void;
  //setDistributedSeating: (newSeating: HallSeating[]) => void;
};

export const useHallSeatingStore = create<HallSeatingStore>((set) => ({
  emptySeating: [],

  generateHallSeating: (halls) =>
    set({ emptySeating: generateEmpteSeat(halls) }),

  toggleSeatStatus: (hallId, rowIndex, colIndex) =>
    set((state) => ({
      emptySeating: toggleSeatStatus(
        state.emptySeating,
        hallId,
        rowIndex,
        colIndex
      ),
    })),

  //setDistributedSeating: (newSeating) => set({ emptySeating: newSeating }),
}));

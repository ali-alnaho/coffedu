import { Halls, HallSeating } from '@coffedu/contracts';
import { create } from 'zustand';
import generateEmpteSeat from '../services/logic/generateEmpteSeat';
import toggleSeatStatus from '../services/logic/toggleSeatStatus';

type HallSeatingStore = {
  emptySeating: HallSeating[];
  generate: (halls: Halls[]) => void;
  toggleSeat: (hallId: string, rowIndex: number, colIndex: number) => void;
};
export const useHallSeatingStore = create<HallSeatingStore>((set) => ({
  emptySeating: [],

  generate: (halls) => set({ emptySeating: generateEmpteSeat(halls) }),

  toggleSeat: (hallId, rowIndex, colIndex) =>
    set((state) => ({
      emptySeating: toggleSeatStatus(
        state.emptySeating,
        hallId,
        rowIndex,
        colIndex
      ),
    })),
}));

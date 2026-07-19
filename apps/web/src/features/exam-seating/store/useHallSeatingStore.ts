import { Halls, HallSeating } from '@coffedu/contracts';
import { create } from 'zustand';
import generateEmpteSeat from '../services/logic/generateEmpteSeat';
import toggleSeatStatus from '../services/logic/toggle/toggleSeatStatus';
import {
  toggleVerticalAisle,
  toggleHorizontalAisle,
} from '../services/logic/toggle/toggleAisle';

type HallSeatingStore = {
  emptySeating: HallSeating[];
  generateHallSeating: (halls: Halls[]) => void;
  toggleSeatStatus: (
    hallId: string,
    rowIndex: number,
    colIndex: number
  ) => void;

  toggleVertical: (hallId: string, columnIndex: number) => void;
  toggleHorizontal: (hallId: string, rowIndex: number) => void;
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

  toggleVertical: (hallId, columnIndex) =>
    set((state) => ({
      emptySeating: toggleVerticalAisle(
        state.emptySeating,
        hallId,
        columnIndex
      ),
    })),

  toggleHorizontal: (hallId, rowIndex) =>
    set((state) => ({
      emptySeating: toggleHorizontalAisle(state.emptySeating, hallId, rowIndex),
    })),
}));

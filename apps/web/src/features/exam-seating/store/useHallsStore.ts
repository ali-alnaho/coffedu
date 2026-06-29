import { create } from 'zustand';
import { Halls } from '@coffedu/contracts';

type HallStore = {
  halls: Halls[];
  addHall: (newHall: Halls) => void;

  // Halls['hall'] ==> just hall property ==>  hall: HallFormDto;
  updateHall: (hallId: string, updateHall: Halls['hall']) => void;

  deleteHall: (hallId: string) => void;
};

export const useHallsStore = create<HallStore>((set) => ({
  halls: [],

  addHall: (newHall) => set((state) => ({ halls: [...state.halls, newHall] })),

  updateHall: (hallId, updateHall) =>
    set((state) => ({
      halls: state.halls.map((h) =>
        h.id === hallId ? { ...h, hall: updateHall } : h
      ),
    })),

  deleteHall: (hallId) =>
    set((state) => ({
      halls: state.halls.filter((hall) => hall.id !== hallId),
    })),
}));

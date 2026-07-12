import { create } from 'zustand';
import { HallSeating } from '@coffedu/contracts';
import distributeStudents from '../services/logic/distributeStudents';

type Student = {
  id: string;
  name: string;
  academicYear: string;
  status: string;
};

type DistributeStudentsStore = {
  examHallSeating: HallSeating[];

  generateExamHallSeating: (
    emptyHallSeating: HallSeating[],
    students: Student[]
  ) => void;
};

export const useDistributeStudentsStore = create<DistributeStudentsStore>(
  (set) => ({
    examHallSeating: [],
    generateExamHallSeating: (emptyHallSeating, students) =>
      set({ examHallSeating: distributeStudents(emptyHallSeating, students) }),
  })
);

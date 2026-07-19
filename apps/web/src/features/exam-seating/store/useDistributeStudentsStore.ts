import { create } from 'zustand';
import { HallSeating } from '@coffedu/contracts';
import distributeRowMajor from '../services/logic/distributeStudents/distributeRowMajor';

type Student = {
  id: string;
  name: string;
  academicYear: string;
  status: string;
  level: number;
  department?: string;
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
      set({ examHallSeating: distributeRowMajor(emptyHallSeating, students) }),
  })
);

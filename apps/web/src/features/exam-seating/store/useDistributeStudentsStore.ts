import { create } from 'zustand';
import { HallSeating, Student } from '@coffedu/contracts';
import distributeRowMajor from '../services/logic/distributeStudents/distributeRowMajor';
import distributeColumnMajor from '../services/logic/distributeStudents/distributeColumnMajor';
import distributeColumnMajorByLevel from '../services/logic/distributeStudents/distributeColumnMajorByLevel';

type Level = Student['level'];

type DistributeStudentsStore = {
  examHallSeating: HallSeating[];

  generateExamHallSeatingByRow: (
    emptyHallSeating: HallSeating[],
    students: Student[]
  ) => void;

  generateExamHallSeatingByColumn: (
    emptyHallSeating: HallSeating[],
    students: Student[]
  ) => void;

  generateExamHallSeatingByColumnByLevel: (
    emptyHallSeating: HallSeating[],
    studentByLevel: Map<Level, Student[]>
  ) => void;
};

export const useDistributeStudentsStore = create<DistributeStudentsStore>(
  (set) => ({
    examHallSeating: [],
    generateExamHallSeatingByRow: (emptyHallSeating, students) =>
      set({ examHallSeating: distributeRowMajor(emptyHallSeating, students) }),

    generateExamHallSeatingByColumn: (emptyHallSeating, students) =>
      set({
        examHallSeating: distributeColumnMajor(emptyHallSeating, students),
      }),

    generateExamHallSeatingByColumnByLevel: (
      emptyHallSeating,
      studentByLevel
    ) =>
      set({
        examHallSeating: distributeColumnMajorByLevel(
          emptyHallSeating,
          studentByLevel
        ),
      }),
  })
);

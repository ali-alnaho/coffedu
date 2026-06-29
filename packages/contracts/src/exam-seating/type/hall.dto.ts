import { student } from '../../../../../apps/web/src/features/exam-seating/services/api/StudentData';
import { HallSchema } from '../exam-seating.schema';
import { z } from 'zod';

// { hallName: string, column: string | number, row: string | number }
export type HallFormDto = {
  hallName: string;
  column: string | number;
  row: string | number;
};

export type Halls = {
  id: string;
  createdBy: string;
  hall: HallFormDto;
};

export type Seat = {
  id: string;
  row: number;
  column: number;
  status: 'available' | 'blocked' | 'occupied';
  student: ExamStudent | null;
  notes?: string;
};

export type ExamStudent = {
  id: string;
  name: string;
};

export type HallSeating = {
  hallId: string;
  hallName: string;
  seats: Seat[];
};

const hallSeating: HallSeating[] = [
  {
    hallId: 'H1',
    hallName: 'Hall 1',
    seats: [
      {
        id: 'seat1',
        row: 1,
        column: 1,
        status: 'available',
        student: {
          id: 's1',
          name: 'ali',
        },
      },
      {
        id: 'seat2',
        row: 1,
        column: 2,
        status: 'available',
        student: {
          id: 's2',
          name: 'mohammed',
        },
      },
    ],
  },
  {
    hallId: 'H2',
    hallName: 'Hall 2',
    seats: [
      {
        id: 'seat1',
        row: 1,
        column: 1,
        status: 'available',
        student: {
          id: 's1',
          name: 'mohnad',
        },
      },
      {
        id: 'seat2',
        row: 1,
        column: 2,
        status: 'available',
        student: {
          id: 's2',
          name: 'amjad',
        },
      },
      {
        id: 'seat3',
        row: 1,
        column: 3,
        status: 'blocked',
        student: null,
      },
    ],
  },
];

export type HallFormError = Partial<Record<keyof HallFormDto, string[]>>;

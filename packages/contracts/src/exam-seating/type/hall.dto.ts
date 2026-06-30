// { hallName: string, column: string | number, row: string | number }

// step 1 -----------------
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

// step 2 ------------------
export type ExamStudent = {
  id: string;
  name: string;
};

export type Seat = {
  id: string;
  row: number;
  column: number;
  status: 'available' | 'blocked' | 'occupied';
  student: ExamStudent | null;
  notes?: string;
};

// step 3 ------------------
export type HallSeating = {
  hallId: string;
  hallName: string;
  seats: Seat[][];
};

export type HallFormError = Partial<Record<keyof HallFormDto, string[]>>;

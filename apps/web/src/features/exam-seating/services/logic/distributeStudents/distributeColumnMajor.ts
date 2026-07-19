import { HallSeating, Seat, DistributionRule } from '@coffedu/contracts';

type Student = {
  id: string;
  name: string;
  academicYear: string;
  status: string;
  level: number;
  department?: string;
};

function distributeColumnMajor(
  emptySeating: HallSeating[],
  studentByLevel: Map<number, Student[]>
) {
  let nextStudentIndex = 0;

  const hallSeating = emptySeating.map((hall) => {
    const column = hall.seats[0].length;

    Array.from({ length: column }).map((_, columnIndex) => {
      hall.seats.map((row) => {
        const seat = row[columnIndex];
        console.log(seat);
        return seat;
      });
    });
  });
}

export default distributeColumnMajor;

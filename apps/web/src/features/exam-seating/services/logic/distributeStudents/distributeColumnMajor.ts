import { HallSeating, Student, Seat } from '@coffedu/contracts';

function distributeColumnMajor(
  emptySeating: HallSeating[],
  studentsList: Student[]
): HallSeating[] {
  let nextStudentIndex = 0;

  const hallSeating = emptySeating.map((hall) => {
    const numRows = hall.seats.length;
    const numCols = hall.seats[0]?.length ?? 0;

    // Pass 1: decide assignments, walking column-major (vertical fill)
    const assignments = new Map<string, Seat['student']>();

    for (let col = 0; col < numCols; col++) {
      for (let row = 0; row < numRows; row++) {
        if (nextStudentIndex >= studentsList.length) break;

        const seat = hall.seats[row][col];
        if (seat.status === 'available') {
          const student = studentsList[nextStudentIndex];
          assignments.set(`${row}-${col}`, {
            id: student.id,
            name: student.name,
            level: student.level,
            department: student.department,
          });
          nextStudentIndex++;
        }
      }
    }

    // Pass 2: rebuild the row-major seat shape, applying decisions
    const updatedSeats = hall.seats.map((row, rowIndex) =>
      row.map((seat, colIndex) => {
        const assignedStudent = assignments.get(`${rowIndex}-${colIndex}`);
        if (!assignedStudent) return seat;

        const updatedSeat: Seat = {
          ...seat,
          student: assignedStudent,
          status: 'occupied',
        };
        return updatedSeat;
      })
    );

    return { ...hall, seats: updatedSeats };
  });

  console.log(JSON.stringify(hallSeating, null, 2));
  return hallSeating;
}

export default distributeColumnMajor;

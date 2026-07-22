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
            studentCode: student.studentCode,
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

  //console.log(JSON.stringify(hallSeating, null, 2));
  return hallSeating;
}

export default distributeColumnMajor;

// function distributeColumnMajor(
//   emptySeating: HallSeating[],
//   studentsList: Student[]
// ): HallSeating[] {
//   let nextStudentIndex = 0;

//   const maxCols = Math.max(
//     ...emptySeating.map((hall) => hall.seats[0]?.length ?? 0),
//     0
//   );

//   // One assignment map per hall, keyed by "row-col"
//   const assignmentsPerHall = emptySeating.map(
//     () => new Map<string, Seat['student']>()
//   );

//   columnLoop: for (let col = 0; col < maxCols; col++) {
//     for (let hallIndex = 0; hallIndex < emptySeating.length; hallIndex++) {
//       const hall = emptySeating[hallIndex];
//       const numColsInHall = hall.seats[0]?.length ?? 0;
//       if (col >= numColsInHall) continue; // this hall doesn't have this column

//       for (let row = 0; row < hall.seats.length; row++) {
//         if (nextStudentIndex >= studentsList.length) break columnLoop;

//         const seat = hall.seats[row][col];
//         if (seat.status === 'available') {
//           const student = studentsList[nextStudentIndex];
//           assignmentsPerHall[hallIndex].set(`${row}-${col}`, {
//             id: student.id,
//             name: student.name,
//             level: student.level,
//             department: student.department,
//           });
//           nextStudentIndex++;
//         }
//       }
//     }
//   }

//   return emptySeating.map((hall, hallIndex) => {
//     const updatedSeats = hall.seats.map((row, rowIndex) =>
//       row.map((seat, colIndex) => {
//         const assigned = assignmentsPerHall[hallIndex].get(
//           `${rowIndex}-${colIndex}`
//         );
//         if (!assigned) return seat;
//         const updatedSeat: Seat = {
//           ...seat,
//           student: assigned,
//           status: 'occupied',
//         };
//         return updatedSeat;
//       })
//     );
//     return { ...hall, seats: updatedSeats };
//   });
// }

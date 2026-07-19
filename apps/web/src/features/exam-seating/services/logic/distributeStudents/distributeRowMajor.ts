import { HallSeating, Seat, DistributionRule } from '@coffedu/contracts';

type Student = {
  id: string;
  name: string;
  academicYear: string;
  status: string;
  level: number;
  department?: string;
};

// (step 3) => input emptySeating from (step 2) and studentsList from db
// this function generate hallsSeating and full it with student
function distributeRowMajor(
  emptySeating: HallSeating[],
  studentsList: Student[]
  //rule: DistributionRule
): HallSeating[] {
  let nextStudentIndex = 0;

  const hallSeating = emptySeating.map((hall) => {
    const updatedSeats = hall.seats.map((row) => {
      return row.map((seat) => {
        if (nextStudentIndex >= studentsList.length) {
          return seat;
        }
        if (seat.status === 'available') {
          const setStudent = {
            id: studentsList[nextStudentIndex].id,
            name: studentsList[nextStudentIndex].name,
            level: studentsList[nextStudentIndex].level,
            department: studentsList[nextStudentIndex].department,
          };

          const updatedSeat: Seat = {
            ...seat,
            student: setStudent,
            status: 'occupied',
          };

          nextStudentIndex++;
          return updatedSeat;
        }
        return seat;
      });
    });
    return { ...hall, seats: updatedSeats };
  });
  console.log(JSON.stringify(hallSeating, null, 2));
  return hallSeating;
}

export default distributeRowMajor;

// for (const hall of hallsSeating) {
//   for (const row of hall.seats) {
//     for (const seat of row) {
//       if (studentIndex >= studentsList.length) {
//         return hallsSeating;
//       }
//       if (seat.status === 'available') {
//         seat.student = {
//           id: studentsList[studentIndex].id,
//           name: studentsList[studentIndex].name,
//         };
//         seat.status = 'occupied';
//         studentIndex++;
//       }
//     }
//   }
// }
// console.log(JSON.stringify(hallsSeating, null, 2));
// return hallsSeating;

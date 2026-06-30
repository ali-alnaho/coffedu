import { HallSeating } from '@coffedu/contracts';

type Student = {
  id: string;
  name: string;
  academicYear: string;
  status: string;
};

// (step 3) => input emptySeating from (step 2) and studentsList from db
// this function generate hallsSeating and full it with student
function distributeStudents(
  hallsSeating: HallSeating[],
  studentsList: Student[]
): HallSeating[] {
  let studentIndex = 0;

  for (const hall of hallsSeating) {
    for (const row of hall.seats) {
      for (const seat of row) {
        if (studentIndex >= studentsList.length) {
          return hallsSeating;
        }
        if (seat.status === 'available') {
          seat.student = {
            id: studentsList[studentIndex].id,
            name: studentsList[studentIndex].name,
          };
          seat.status = 'occupied';
          studentIndex++;
        }
      }
    }
  }

  //console.log(JSON.stringify(hallsSeating, null, 2));
  return hallsSeating;
}

export default distributeStudents;

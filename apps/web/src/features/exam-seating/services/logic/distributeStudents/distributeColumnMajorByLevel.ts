import { Student, HallSeating } from '@coffedu/contracts';

function distributeColumnMajorByLevel(
  emptySeating: HallSeating[],
  studentByLevel: Map<number, Student[]>
): HallSeating[] {
  const queues = Array.from(studentByLevel.values());

  const queueIndexes = new Array(queues.length).fill(0);

  let currentQueue = 0;

  return emptySeating.map((hall) => {
    const updatedSeats = hall.seats.map((row) => [...row]);

    const rows = hall.seats.length;
    const columns = hall.seats[0].length;

    for (let column = 0; column < columns; column++) {
      for (let row = 0; row < rows; row++) {
        const seat = updatedSeats[row][column];

        if (seat.status !== 'available') continue;

        while (
          currentQueue < queues.length &&
          queueIndexes[currentQueue] >= queues[currentQueue].length
        ) {
          currentQueue++;
        }

        if (currentQueue >= queues.length) {
          return {
            ...hall,
            seats: updatedSeats,
          };
        }

        const student = queues[currentQueue][queueIndexes[currentQueue]++];

        updatedSeats[row][column] = {
          ...seat,
          status: 'occupied',
          student: {
            id: student.id,
            name: student.name,
            level: student.level,
            department: student.department,
            studentCode: student.studentCode,
          },
        };
      }
    }

    return {
      ...hall,
      seats: updatedSeats,
    };
  });
}

export default distributeColumnMajorByLevel;

import { Seat, HallSeating, Halls } from '@coffedu/contracts';
import { v4 as uuidv4 } from 'uuid';
// (step 2) => input Halls[] from (step 1) and generate HallSeating[] fro (step 3)
// this function generate Emptye Seats with type Seat[][]
function generateEmpteSeat(hallaList: Halls[]): HallSeating[] {
  const emptySeating: HallSeating[] = [];

  for (const hall of hallaList) {
    const hallMap: Seat[][] = [];

    for (let row = 0; row < Number(hall.hall.row); row++) {
      const currentRow: Seat[] = [];

      for (let column = 0; column < Number(hall.hall.column); column++) {
        currentRow.push({
          id: `seat-${uuidv4()}`,
          row: row + 1,
          column: column + 1,
          status: 'available',
          student: null,
        });
      }
      hallMap.push(currentRow);
    }
    emptySeating.push({
      hallId: hall.id,
      hallName: hall.hall.hallName,
      seats: hallMap,
    });
  }
  console.log(JSON.stringify(emptySeating, null, 2));
  return emptySeating;
}

export default generateEmpteSeat;

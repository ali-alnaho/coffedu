import { HallSeating, Seat } from '@coffedu/contracts';

function toggleSeatStatus(
  currentSeating: HallSeating[],
  hallId: string,
  rowIndex: number,
  colIndex: number
): HallSeating[] {
  return currentSeating.map((hall) => {
    if (hall.hallId !== hallId) return hall;

    const updatedSeats = hall.seats.map((row, rIndex) => {
      if (rIndex !== rowIndex) return row;

      return row.map((seat, cIdx) => {
        if (cIdx !== colIndex) return seat;

        const nextStatus: Seat['status'] =
          seat.status === 'available' ? 'blocked' : 'available';

        return {
          ...seat,
          status: nextStatus,
        };
      });
    });
    return { ...hall, seats: updatedSeats };
  });
}

export default toggleSeatStatus;

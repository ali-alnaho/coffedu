import useHallSeat from '../hooks/useHallSeat';
import Seat from './Seat';
import VerticalAisle from './VerticalAisle';
import HorizontalAisle from './HorizontalAisle';

// Builds a track list like "48px 20px 48px 20px 48px" —
function buildTracks(size: number, gap: string, cell: string) {
  const tracks: string[] = [];
  for (let i = 0; i < size; i++) {
    //if count = 3 so 3 loop the first loop => tracks = [48px]
    tracks.push(cell);

    // if 0 < 3 -1 => true =>  [48px , 14px]
    // if 1 < 3 -1 => true => [48px, 14px , 48px , 14px]
    // if 2 < 3 -1 => false => [48px, 14px , 48px , 14px, 48px]; No gap
    if (i < size - 1) tracks.push(gap);
  }
  return tracks.join(' ');

  // ┌───┬───┬───┬───┬───┐
  // │ S │ G │ S │ G │ S │
  // ├───┼───┼───┼───┼───┤
  // │ G │   │ G │   │ G │
  // ├───┼───┼───┼───┼───┤
  // │ S │ G │ S │ G │ S │
  // ├───┼───┼───┼───┼───┤
  // │ G │   │ G │   │ G │
  // ├───┼───┼───┼───┼───┤
  // │ S │ G │ S │ G │ S │
  // └───┴───┴───┴───┴───┘
  // Seat in individual spaces
}

export default function HallSeat() {
  const {
    generate,
    handleToggleSeat,
    handleToggleVerticalAisle,
    handelToggleHorizontalAisle,
    emptySeating,
  } = useHallSeat();

  return (
    <div>
      <p>generate seats</p>
      <button
        onClick={generate}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        generate seats
      </button>

      <div>
        {emptySeating.map((hall) => {
          const rowCount = hall.seats.length;
          const colCount = hall.seats[0]?.length ?? 0;

          return (
            <div key={hall.hallId} className="mb-8">
              <h3>{hall.hallName}</h3>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: buildTracks(colCount, '14px', '48px'),
                  gridTemplateRows: buildTracks(rowCount, '14px', '48px'),
                  backgroundColor: 'black',
                  overflow: 'auto',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}
              >
                {/* Seats: track = 2*index + 1 (the odd tracks) */}

                {hall.seats.map((row, rowIndex) =>
                  row.map((seat, colIndex) => (
                    <Seat
                      key={seat.id}
                      seat={seat}
                      onToggle={() =>
                        handleToggleSeat(hall.hallId, rowIndex, colIndex)
                      }
                      style={{
                        //1 3 5 7 9
                        gridColumn: colIndex * 2 + 1,
                        gridRow: rowIndex * 2 + 1,
                        width: ' 100%',
                        height: '100%',
                      }}
                    />
                  ))
                )}

                {/*
                  Vertical aisles: ONE element per gap, not one per row.
                  Track = 2*aisleIndex (the even column tracks).
                  gridRow '1 / -1' spans every row track automatically —
                  this is what makes it impossible for the aisle to
                  misalign between rows the way the old spacer-div did.
                */}

                {Array.from(
                  { length: Math.max(colCount - 1, 0) },
                  (_, i) => i + 1
                ).map((aisleIndex) => (
                  <VerticalAisle
                    style={{
                      gridColumn: 2 * aisleIndex,
                      gridRow: '1 / -1',
                      width: '100%',
                      height: '100%',
                    }}
                    key={`v-aisle-${aisleIndex}`}
                    ToggleVertical={() =>
                      handleToggleVerticalAisle(hall.hallId, aisleIndex)
                    }
                  >
                    {hall.layout.verticalAisles.includes(aisleIndex) && (
                      <span
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'red',
                        }}
                      ></span>
                    )}
                  </VerticalAisle>
                ))}

                {/* Horizontal aisles: same idea, transposed. */}

                {Array.from(
                  { length: Math.max(rowCount - 1, 0) },
                  (_, i) => i + 1
                ).map((aisleIndex) => (
                  <HorizontalAisle
                    style={{
                      // 2 4 6 8
                      gridRow: 2 * aisleIndex,
                      gridColumn: '1 / -1',
                      width: '100%',
                      height: '100%',
                    }}
                    key={`h-aisle-${aisleIndex}`}
                    ToggleHorizontal={() =>
                      handelToggleHorizontalAisle(hall.hallId, aisleIndex)
                    }
                  >
                    {hall.layout.horizontalAisles.includes(aisleIndex) && (
                      <span
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'blue',
                        }}
                      ></span>
                    )}
                  </HorizontalAisle>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import useHallSeat from '../hooks/useHallSeat';
import React from 'react';

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emptySeating.map((hall) => (
          <div
            key={hall.hallId}
            className="border border-gray-200 rounded-lg shadow-sm p-4  bg-sky-500/50"
          >
            <div className="border-b pb-2 mb-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800">
                {hall.hallName}
              </h3>
            </div>

            <div className="flex flex-col gap-3 items-center">
              {hall.seats.map((row, rowIndex) => (
                <React.Fragment key={`row-${rowIndex}`}>
                  <div className="flex gap-3 bg-gray-100">
                    {row.map((seat, colIndex) => (
                      <React.Fragment key={seat.id}>
                        <button
                          onClick={() =>
                            handleToggleSeat(hall.hallId, rowIndex, colIndex)
                          }
                          className={`group relative w-12 h-12 flex items-center justify-center rounded border transition-all duration-200
                            ${
                              seat.status === 'blocked'
                                ? 'bg-red-500 border-red-700 text-white'
                                : 'bg-green-100 border-green-300 hover:bg-red-100'
                            }`}
                        >
                          {seat.status === 'blocked' ? (
                            <span className="font-bold text-lg">X</span>
                          ) : (
                            <>
                              <span className="text-sm font-medium text-green-800 group-hover:opacity-0 transition-opacity">
                                ({seat.row}-{seat.column})
                              </span>
                              <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                                X
                              </span>
                            </>
                          )}
                        </button>
                        {colIndex < row.length - 1 && rowIndex === 0 ? (
                          <div
                            className=" h-full w-4 bg-gray-200"
                            onClick={() =>
                              handleToggleVerticalAisle(
                                hall.hallId,
                                colIndex + 1
                              )
                            }
                          >
                            {hall.layout.verticalAisles.includes(
                              colIndex + 1
                            ) ? (
                              <span>|</span>
                            ) : (
                              <span
                                style={{
                                  backgroundColor: 'blue',
                                  padding: '1px 10px',
                                }}
                              ></span>
                            )}
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  {rowIndex < hall.seats.length - 1 ? (
                    <div
                      className=""
                      onClick={() =>
                        handelToggleHorizontalAisle(hall.hallId, rowIndex + 1)
                      }
                    >
                      {hall.layout.horizontalAisles.includes(rowIndex + 1) ? (
                        <span>--</span>
                      ) : (
                        <span
                          style={{
                            backgroundColor: 'blue',
                            padding: '1px 10px',
                          }}
                        ></span>
                      )}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

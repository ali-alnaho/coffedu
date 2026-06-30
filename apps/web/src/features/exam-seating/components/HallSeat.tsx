import useHallSeat from '../hooks/useHallSeat';

export default function HallSeat() {
  const { generate, emptySeating } = useHallSeat();
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
                <div key={`row-${rowIndex}`} className="flex gap-3 ">
                  {row.map((seat) => (
                    <button
                      key={seat.id}
                      className="group relative w-12 h-12 flex items-center justify-center rounded bg-green-100 hover:bg-red-500 border border-green-300 transition-all duration-200 ease-in-out cursor-pointer overflow-hidden shadow-sm"
                    >
                      <span className="text-sm font-medium text-green-800 group-hover:opacity-0 transition-opacity">
                        ({seat.row}-{seat.column})
                      </span>
                      <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                        X
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

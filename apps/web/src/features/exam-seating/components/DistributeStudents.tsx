import useDistributeStudents from '../hooks/useDistributeStudents';
import { PDFViewer } from '@react-pdf/renderer';
import { SeatingDocument } from '../pdf/SeatingDocument';

export default function DistributeStudents() {
  const { distribute, examHallSeating } = useDistributeStudents();

  return (
    <div>
      <hr />

      <p>distribute student</p>

      <button
        onClick={distribute}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        distribute
      </button>

      <div className="grid bg-gray-200">
        {examHallSeating.map((hall) => (
          <div key={hall.hallId}>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {hall.hallName}
              </h3>
            </div>
            <div className="flex flex-col gap-3 items-center">
              {hall.seats.map((row, rowIndex) => (
                <div key={`row-${rowIndex}`} className="flex">
                  {row.map((seat) => (
                    <div
                      key={seat.id}
                      className="text-sm font-medium text-green-800 border-2 p-2"
                    >
                      {seat.status === 'blocked' ? (
                        <span>
                          ({seat.row}-{seat.column}): X
                        </span>
                      ) : (
                        <span className="">
                          ({seat.row}-{seat.column}: {seat.student?.id}):
                          {seat.student?.name}:{seat.student?.level}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* <div>
        <PDFViewer width="100%" height={800}>
          <SeatingDocument />
        </PDFViewer>
      </div> */}
    </div>
  );
}

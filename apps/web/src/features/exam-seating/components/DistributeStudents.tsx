import useDistributeStudents from '../hooks/useDistributeStudents';
import { PDFViewer } from '@react-pdf/renderer';
import { SeatingDocument } from '../pdf/SeatingDocument';

export default function DistributeStudents() {
  const {
    distribute,
    examHallSeating,
    rules,
    selectRule,
    setSelectRule,
    direction,
    setDirection,
  } = useDistributeStudents();

  return (
    <div>
      <hr />

      <p>distribute student</p>

      <div>
        {rules.map((rule) => (
          <label key={rule} style={{ padding: '10px' }}>
            <input
              type="radio"
              name="rule"
              value={rule}
              checked={selectRule === rule}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSelectRule(e.target.value);
              }}
            />
            <span>{rule.toLowerCase()}</span>
          </label>
        ))}
      </div>

      <div>
        <label style={{ padding: '10px' }}>
          <input
            type="radio"
            name="direction"
            value="vertical"
            checked={direction === 'vertical'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDirection(e.target.value);
            }}
          />
          <span>vertical</span>
        </label>
        <label style={{ padding: '10px' }}>
          <input
            type="radio"
            name="direction"
            value="horizontal"
            checked={direction === 'horizontal'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDirection(e.target.value);
            }}
          />
          <span>horizontal</span>
        </label>
      </div>

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

import Input from '../../../shared/components/ui/Input';
import { student } from '../services/api/StudentData';
import { useHallForm } from '../hooks/useHallForm';

export default function HallForm() {
  const {
    hallForm,
    halls,
    errors,
    editingHallId,
    hallNameRef,

    handleChange,
    handleSubmit,
    handleDelete,
    handleEdit,

    totalCapacity,
    remainingSeats,
    isCapacityEnough,
  } = useHallForm();

  return (
    <div>
      <p>add new hall</p>
      <form onSubmit={handleSubmit}>
        <Input
          label="Hall Name"
          name="hallName"
          value={hallForm.hallName}
          placeholder="Enter Hall Name"
          onChange={handleChange}
          ref={hallNameRef}
          error={errors.hallName}
        />
        <Input
          label="Numper of Row"
          name="row"
          value={hallForm.row}
          placeholder="Enter Numper of Row"
          onChange={handleChange}
          error={errors.row}
        />
        <Input
          label="Numper of Column"
          name="column"
          value={hallForm.column}
          placeholder="Enter Numper of Column"
          onChange={handleChange}
          error={errors.column}
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          {editingHallId ? 'Update Hall' : 'Add Hall'}
        </button>
      </form>
      <div>
        <hr />
        <p>Total Students: {student.length} </p>
        <p>total capacity: {totalCapacity}</p>
        <p>Remaining Seats: {remainingSeats}</p>
        {isCapacityEnough ? (
          <p>Capacity is sufficient.</p>
        ) : (
          <p>You need {remainingSeats} more seats.</p>
        )}
        <hr />
        <ul>
          {halls.map((h) => (
            <li key={h.id}>
              {h.hall.hallName} — {h.hall.column}x{h.hall.row}
              <button
                onClick={() => handleEdit(h.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(h.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <hr />
      </div>
    </div>
  );
}

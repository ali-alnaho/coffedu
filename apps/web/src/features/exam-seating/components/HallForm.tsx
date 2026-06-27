import { useEffect, useRef, useState } from 'react';
import Input from '../../../shared/components/ui/Input';
import {
  HallDto,
  HallFormDto,
  HallSchema,
  HallFormError,
  flattenError,
} from '@coffedu/contracts';
import { v4 as uuidv4 } from 'uuid';
import { student } from '../services/api/StudentData';

const INITIAL_DATA = { hallName: '', column: 0, row: 0 };

export default function HallForm() {
  const [hallForm, setHallForm] = useState<HallFormDto>(INITIAL_DATA);
  const [halls, sethalls] = useState<HallDto[]>([]);
  const [errors, setErrors] = useState<HallFormError>({});
  const hallNameRef = useRef<HTMLInputElement | null>(null);
  const [capacity, setCapacity] = useState(0);
  const [editingHallId, setEditingHallId] = useState<string | null>(null);

  const resetForm = () => {
    setHallForm(INITIAL_DATA);
    setEditingHallId(null);
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHallForm((prev) => {
      const updated = { ...prev, [name]: value };
      return updated;
    });
  };

  useEffect(() => {
    const totalCapacity = halls.reduce((total, item) => {
      return total + item.hall.column * item.hall.row;
    }, 0);
    if (totalCapacity >= student.length)
      alert('The number of halls is appropriate.');
    setCapacity(totalCapacity);
  }, [halls]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = hallNameRef.current?.value.trim() ?? '';
    if (!trimmedName) {
      alert('add hall name');
      return;
    }

    // Check if hall with same name already exists
    const isDuplicate = halls.some(
      (h) =>
        // Exclude the current hall being edited from the duplication check
        h.id !== editingHallId &&
        h.hall.hallName.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      alert('A hall with this name already exists');
      return;
    }

    //   ... validation ...
    const hallData = HallSchema.safeParse(hallForm);
    if (!hallData.success) {
      const hallErorrs = flattenError(hallData.error);
      setErrors(hallErorrs.fieldErrors);
      return;
    }

    if (editingHallId) {
      sethalls((prev) =>
        prev.map((h) =>
          h.id === editingHallId
            ? {
                ...h,
                hall: {
                  hallName: hallForm.hallName.trim(),
                  column: Number(hallForm.column),
                  row: Number(hallForm.row),
                },
              }
            : h
        )
      );
    } else {
      const newHall: HallDto = {
        id: uuidv4(),
        author: 'admin',
        hall: {
          hallName: hallForm.hallName.trim(),
          column: Number(hallForm.column),
          row: Number(hallForm.row),
        },
      };
      sethalls((prev) => [...prev, newHall]);
    }

    resetForm(); // reset
    hallNameRef.current?.focus();
  };

  function handleDelete(id: string): void {
    const hall = halls.filter((hall) => hall.id !== id);
    sethalls(hall);
  }

  function handleEdit(id: string): void {
    const hall = halls.find((hall) => hall.id === id);
    if (!hall) return;

    setEditingHallId(id);
    setHallForm({
      hallName: hall?.hall.hallName ?? '',
      column: hall?.hall.column ?? 0,
      row: hall?.hall.row ?? 0,
    });
  }

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
        <p>total capacity: {capacity}</p>

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
      </div>
    </div>
  );
}

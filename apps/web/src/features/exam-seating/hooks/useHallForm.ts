import { useState, useRef } from 'react';
import {
  Halls,
  HallFormDto,
  HallSchema,
  HallFormError,
  flattenError,
} from '@coffedu/contracts';
import { v4 as uuidv4 } from 'uuid';
import { student } from '../services/api/StudentData';
import { useHallsStore } from '../store/useHallsStore';

const INITIAL_DATA = { hallName: '', column: '', row: '' };

export function useHallForm() {
  const [hallForm, setHallForm] = useState<HallFormDto>(INITIAL_DATA);
  const [errors, setErrors] = useState<HallFormError>({});
  const hallNameRef = useRef<HTMLInputElement | null>(null);
  const [editingHallId, setEditingHallId] = useState<string | null>(null);

  const { halls, addHall, updateHall, deleteHall } = useHallsStore();

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const trimmedName = hallNameRef.current?.value.trim() ?? '';
    // if (!trimmedName) {
    //   alert('add hall name');
    //   return;
    // }

    // Check if hall with same name already exists
    const isDuplicate = halls.some(
      (h) =>
        // Exclude the current hall being edited from the duplication check
        h.id !== editingHallId &&
        h.hall.hallName.toLowerCase() === hallForm.hallName.trim().toLowerCase()
    );

    if (isDuplicate) {
      setErrors({ hallName: ['A hall with this name already exists'] });
      return;
    }

    //   ... validation ...
    // Zod coerces '' → 0, '5' → 5 internally
    const result = HallSchema.safeParse(hallForm);
    if (!result.success) {
      const hallErorrs = flattenError(result.error);
      setErrors(hallErorrs.fieldErrors);
      return;
    }

    const parsed: HallFormDto = result.data;

    if (editingHallId) {
      updateHall(editingHallId, {
        hallName: parsed.hallName,
        column: parsed.column,
        row: parsed.row,
      });
    } else {
      const newHall: Halls = {
        id: uuidv4(),
        createdBy: 'admin',
        hall: {
          hallName: parsed.hallName,
          column: parsed.column,
          row: parsed.row,
        },
      };
      addHall(newHall);
    }

    resetForm(); // reset
    hallNameRef.current?.focus();
  };

  function handleDelete(id: string): void {
    // const hall = halls.filter((hall) => hall.id !== id);
    // sethalls(hall);
    deleteHall(id);
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

  // useEffect(() => {
  //   const totalCapacity = halls.reduce((total, item) => {
  //     return total + item.hall.column * item.hall.row;
  //   }, 0);
  //   if (totalCapacity >= student.length)
  //     alert('The number of halls is appropriate.');
  //   setCapacity(totalCapacity);
  // }, [halls]);
  const totalCapacity = halls.reduce((total, item) => {
    return total + Number(item.hall.column) * Number(item.hall.row);
  }, 0);
  const remainingSeats = Math.max(student.length - totalCapacity, 0);

  const isCapacityEnough = totalCapacity >= student.length;

  return {
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
  };
}

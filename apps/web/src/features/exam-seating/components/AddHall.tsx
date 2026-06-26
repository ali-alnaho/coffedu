import { useState } from 'react';
import Input from '../../../shared/components/ui/Input';

export default function AddHall({ onHallChange }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onHallChange((prev) => {
      const update = { ...prev, [name]: value };
      return update;
    });
  };
  return (
    <div>
      <Input
        label="Hall Name"
        name="hallName"
        //value="hallName"
        // placeholder="Enter Hall Name"
        onChange={handleChange}
      />
      <Input
        label="Numper of Row"
        name="row"
        //value="row"
        // placeholder="Enter Numper of Row"
        onChange={handleChange}
      />
      <Input
        label="Numper of Column"
        name="coloumn"
        //value="coloumn"
        // placeholder="Enter Numper of Column"
        onChange={handleChange}
      />
    </div>
  );
}

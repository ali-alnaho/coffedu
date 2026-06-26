import { useState } from 'react';
import AddHall from '../components/AddHall';

interface AllHall {
  id: number;
  hallComponents: React.ReactNode;
}

interface HallForm {
  hallName: string;
  column: number;
  row: number;
}

export default function Home() {
  const [halls, setHall] = useState<AllHall[]>([]);
  const [hallForm, setHallForm] = useState<HallForm>({
    hallName: '',
    column: 0,
    row: 0,
  });

  function addNewHall() {
    console.log(hallForm);
    setHall((prev) => {
      const update = [
        ...prev,
        {
          id: 1,
          hallComponents: <AddHall onHallChange={setHallForm} />,
        },
      ];
      return update;
    });
  }
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={addNewHall}
      >
        add hall
      </button>
      <div>
        {halls.map((hall) => (
          <div key={hall.id}>{hall.hallComponents}</div>
        ))}
      </div>
    </div>
  );
}

const halls = [
  {
    hallName: 'Hall A ',
    column: 2,
    row: 5,
  },
  {
    hallName: 'Hall B ',
    column: 3,
    row: 3,
  },
  {
    hallName: 'Hall C ',
    column: 2,
    row: 4,
  },
];

// // all Aalls components -------------------------
// const allHall = [
//   {
//     id: 'rand',
//     hallComponents: 'compo',
//   },
// ];

// // add hall -------------------------------------

// <button type="button" onClick={handleAddHall}>
//   add hall
// </button>;

// function handleAddHall() {
//   // halls components bush in arr
//   AllHall.push();
// }

// // remove hall ------------------------------------

// <button type="button" onClick={handleDeletHall}>
//   delete hall
// </button>;

// function handleDeletHall() {
//   // halls find and delete
//   AllHall.find();
// }

// // show all halls -----------------------------------

// <ul>
//   {AllHall.map((field) => (
//     <li kry={field.id}>{field.hallComponents}</li>
//   ))}
// </ul>;

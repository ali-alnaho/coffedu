import HallForm from '../components/HallForm';

export default function Home() {
  return (
    <div>
      <HallForm />
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

import useDistributeStudents from '../hooks/useDistributeStudents';

export default function DistributeStudents() {
  const { distribute } = useDistributeStudents();

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
    </div>
  );
}

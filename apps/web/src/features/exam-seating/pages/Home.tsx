import HallForm from '../components/HallForm';
import HallSeat from '../components/HallSeat';
import DistributeStudents from '../components/DistributeStudents';

export default function Home() {
  return (
    <div>
      <HallForm />
      <HallSeat />
      <DistributeStudents />
    </div>
  );
}

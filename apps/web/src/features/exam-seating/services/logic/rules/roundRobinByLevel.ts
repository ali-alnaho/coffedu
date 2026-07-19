import { Student } from '@coffedu/contracts';

function roundRobinByLevel(studentByLevel: Map<number, Student[]>) {
  const groups = Array.from(studentByLevel.values());
  const maxLingth = Math.max(...groups.map((g) => g.length), 0);

  const result: Student[] = [];
  for (let i = 0; i < maxLingth; i++) {
    for (let j = 0; j < groups.length; j++) {
      if (groups[j][i]) {
        result.push(groups[j][i]);
      }
    }
  }
  return result;
}

// function roundRobinByLevel(
//   studentByLevel: Map<number, Student[]>,
//   seatsPerRow: number
// ) {
//   // نحول الـ Map إلى مجموعة طوابير (Queues)
//   const queues = Array.from(studentByLevel.values()).map((group) => [...group]);

//   const result: Student[] = [];

//   while (queues.length > 0) {
//     let seatsInCurrentRow = 0;

//     // يبدأ كل صف من أول قائمة نشطة
//     for (
//       let queueIndex = 0;
//       queueIndex < queues.length && seatsInCurrentRow < seatsPerRow;
//       queueIndex++
//     ) {
//       const queue = queues[queueIndex];

//       // أخذ أول طالب
//       const student = queue.shift();

//       if (student) {
//         result.push(student);
//         seatsInCurrentRow++;
//       }

//       // إذا انتهت هذه المرحلة نحذفها
//       if (queue.length === 0) {
//         queues.splice(queueIndex, 1);
//         queueIndex--;
//       }
//     }
//   }

//   return result;
// }

export default roundRobinByLevel;

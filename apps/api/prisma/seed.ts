import prisma from '../src/db.ts';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

// ─── Helpers ───────────────────────────────────────────────────────────────

function randomDate(start: Date, end: Date): Date {
  const startMs = start.getTime();
  const endMs = end.getTime();
  const randomMs = startMs + Math.random() * (endMs - startMs);
  return new Date(randomMs);
}

// ─── Seed Data ─────────────────────────────────────────────────────────────

const students = [
  {
    firstName: 'ali',
    fatherName: 'hamead',
    grandName: 'mruan',
    theFourthName: 'jasem',
    familyName: 'mahdee',
    motherFirstName: 'mona',
    motherFatherName: 'mohammed',
  },
  {
    firstName: 'omar',
    fatherName: 'khalid',
    grandName: 'saeed',
    theFourthName: 'hassan',
    familyName: 'jabbar',
    motherFirstName: 'fatima',
    motherFatherName: 'ali',
  },
  {
    firstName: 'sara',
    fatherName: 'ahmed',
    grandName: 'yousef',
    theFourthName: 'kareem',
    familyName: 'nasir',
    motherFirstName: 'layla',
    motherFatherName: 'omar',
  },
  {
    firstName: 'zaid',
    fatherName: 'mustafa',
    grandName: 'ibrahim',
    theFourthName: 'salim',
    familyName: 'hussain',
    motherFirstName: 'noor',
    motherFatherName: 'khalid',
  },
  {
    firstName: 'lina',
    fatherName: 'tariq',
    grandName: 'waleed',
    theFourthName: 'faris',
    familyName: 'rashid',
    motherFirstName: 'hana',
    motherFatherName: 'mustafa',
  },
];

const GRADE_ID = 'cmqo6ckhr0003ehlv9lim7mg2';
const ACADEMIC_ID = 'cmqo6ckhl0002ehlvxiz0w8hb';

// ─── Main ──────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log('🌱 Seeding started...');

  for (const info of students) {
    // 1. Create student
    const newStudent = await prisma.student.create({
      data: {
        firstName: info.firstName,
        fatherName: info.fatherName,
        grandName: info.grandName,
        theFourthName: info.theFourthName,
        familyName: info.familyName,
        motherFirstName: info.motherFirstName,
        motherFatherName: info.motherFatherName,
        dateOfBirth: randomDate(new Date('1970-01-01'), new Date('2005-12-31')),

        studentEnrollments: {
          create: [
            {
              status: 'ACTIVE',
              gradeId: GRADE_ID,
              academicId: ACADEMIC_ID,
            },
          ],
        },
      },
    });

    // 2. Generate credentials
    const password = crypto.randomBytes(8).toString('hex');
    const hashedPassword = await bcrypt.hash(password, 10);
    const userName = `${info.firstName.toLowerCase().trim()}_${crypto.randomInt(100000, 999999)}`;

    // 3. Create linked user
    const newUser = await prisma.user.create({
      data: {
        userName,
        password: hashedPassword,
        role: 'STUDENT',
        studentId: newStudent.id,
      },
      select: {
        userName: true,
        role: true,
      },
    });

    console.log(`✅ Created: ${newUser.userName} (${newUser.role})`);
  }

  console.log('🎉 Seeding complete.');
}

// ─── Run ───────────────────────────────────────────────────────────────────

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e: unknown) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// await prisma.academicYears.createMany({
//   data: [
//     {
//       year: '2023-2024',
//       startDate: new Date('2023-10-01'),
//       endDate: new Date('2024-10-01'),
//       isActive: true,
//     },
//     {
//       year: '2024-2025',
//       startDate: new Date('2024-10-01'),
//       endDate: new Date('2025-10-01'),
//       isActive: true,
//     },
//     {
//       year: '2025-2026',
//       startDate: new Date('2025-10-01'),
//       endDate: new Date('2026-10-01'),
//       isActive: true,
//     },
//   ],
// });

// await prisma.gradeLevels.createMany({
//   data: [
//     {
//       level: 1,
//       name: 'First Grade',
//     },
//     {
//       level: 2,
//       name: 'Second Grade',
//     },
//     {
//       level: 3,
//       name: 'Third Grade',
//     },
//   ],
// });

import prisma from '../src/db.ts';

async function main(): Promise<void> {
  await prisma.academicYears.createMany({
    data: [
      {
        year: '2023-2024',
        startDate: new Date('2023-10-01'),
        endDate: new Date('2024-10-01'),
        isActive: true,
      },
      {
        year: '2024-2025',
        startDate: new Date('2024-10-01'),
        endDate: new Date('2025-10-01'),
        isActive: true,
      },
      {
        year: '2025-2026',
        startDate: new Date('2025-10-01'),
        endDate: new Date('2026-10-01'),
        isActive: true,
      },
    ],
  });

  await prisma.gradeLevels.createMany({
    data: [
      {
        level: 1,
        name: 'First Grade',
      },
      {
        level: 2,
        name: 'Second Grade',
      },
      {
        level: 3,
        name: 'Third Grade',
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e: unknown) => {
    console.error(e);
    await prisma.$disconnect();
  });

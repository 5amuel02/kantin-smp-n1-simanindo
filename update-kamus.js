const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.menu.updateMany({
    where: { nama: 'Kamus Bahasa Indonesia' },
    data: { gambar_url: '/kamus_indo_asli.png' }
  });
  console.log(`Updated Kamus Bahasa Indonesia: ${result.count} records`);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());

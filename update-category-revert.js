const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.menu.updateMany({
    where: { kategori: 'Minuman' },
    data: { kategori: 'Jajanan' }
  });
  console.log('Semua Minuman diubah kembali menjadi Jajanan');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());

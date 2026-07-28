const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.menu.updateMany({
    where: { nama: 'Aqua (Gelas)' },
    data: { kategori: 'Minuman' }
  });
  console.log('Kategori Aqua diupdate ke Minuman');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());

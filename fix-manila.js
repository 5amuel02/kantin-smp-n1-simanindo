const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.menu.updateMany({
    where: { nama: 'Kertas Manila' },
    data: { gambar_url: '/kertas_manila_asli.png' }
  });
  console.log('Gambar kertas manila berhasil di-update!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());

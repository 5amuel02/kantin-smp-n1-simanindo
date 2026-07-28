const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.menu.updateMany({
    where: { nama: 'Aqua (Gelas)' },
    data: { gambar_url: '/aqua.jpg' }
  });
  console.log('Berhasil update gambar Aqua');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());

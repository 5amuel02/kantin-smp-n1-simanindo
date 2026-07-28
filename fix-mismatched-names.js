const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const updates = [
    { nama: 'Penggaris 30cm', img: '/penggaris_30cm_asli.png' },
    { nama: 'Penggaris 15cm', img: '/penggaris_15cm_asli.png' },
    { nama: 'Peraut / Rautan', img: '/peraut_asli.png' },
    { nama: 'Pensil Biasa', img: '/pensil_biasa_asli.png' },
    { nama: 'Pensil 2B', img: '/pensil_2b_asli.png' }
  ];

  for (const update of updates) {
    const result = await prisma.menu.updateMany({
      where: { nama: update.nama },
      data: { gambar_url: update.img }
    });
    console.log(`Updated ${update.nama}: ${result.count} records`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());

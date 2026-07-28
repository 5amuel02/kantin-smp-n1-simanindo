const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const updates = [
    { contains: 'Gunting', img: '/gunting.png' },
    { contains: 'Hekter', img: '/hekter.png' },
    { contains: 'Mata Hekter', img: '/hekter.png' },
    { contains: 'Cutter', img: '/cutter.png' },
    { contains: 'Pensil', img: '/pensil.png' },
    { contains: 'Penghapus', img: '/penghapus.png' },
    { contains: 'Peraut', img: '/peraut.png' }
  ];

  for (const update of updates) {
    await prisma.menu.updateMany({
      where: { nama: { contains: update.contains } },
      data: { gambar_url: update.img }
    });
  }
  console.log('Gambar individual berhasil di-update!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());

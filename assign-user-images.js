const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const updates = [
    { nama: 'Gunting', img: '/gunting_asli.png' },
    { nama: 'Hekter (Stapler)', img: '/hekter_asli.png' },
    { nama: 'Mata Hekter (Staples)', img: '/mata_hekter_asli.png' },
    { nama: 'Pisau Cutter', img: '/cutter_asli.png' },
    { nama: 'Lem Fox', img: '/lem_fox_asli.png' }
  ];

  for (const update of updates) {
    await prisma.menu.updateMany({
      where: { nama: update.nama },
      data: { gambar_url: update.img }
    });
  }
  console.log('Gambar user berhasil di-update!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());

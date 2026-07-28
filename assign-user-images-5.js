const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const updates = [
    { nama: 'Pensil (Biasa)', img: '/pensil_biasa_asli.png' },
    { nama: 'Pensil (2B)', img: '/pensil_2b_asli.png' },
    { nama: 'Pulpen (Biasa)', img: '/pulpen_biasa_asli.png' },
    { nama: 'Pulpen (Bagus)', img: '/pulpen_bagus_asli.png' },
    { nama: 'Kamus Bahasa Indonesia', img: '/kamus_asli.png' },
    { nama: 'Kamus Bahasa Inggris', img: '/kamus_asli.png' }
  ];

  for (const update of updates) {
    await prisma.menu.updateMany({
      where: { nama: update.nama },
      data: { gambar_url: update.img }
    });
  }
  console.log('Gambar user batch 5 berhasil di-update!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const updates = [
    { nama: 'Buku Gambar', img: '/buku_gambar_asli.png' },
    { nama: 'Penggaris (30cm)', img: '/penggaris_30cm_asli.png' },
    { nama: 'Penggaris (15cm)', img: '/penggaris_15cm_asli.png' },
    { nama: 'Peraut', img: '/peraut_asli.png' },
    { nama: 'Penghapus', img: '/penghapus_asli.jpg' }
  ];

  for (const update of updates) {
    await prisma.menu.updateMany({
      where: { nama: update.nama },
      data: { gambar_url: update.img }
    });
  }
  console.log('Gambar user batch 4 berhasil di-update!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());

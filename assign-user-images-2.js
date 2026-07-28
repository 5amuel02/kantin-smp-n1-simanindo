const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const updates = [
    { nama: 'Lem Setan (Super Glue)', img: '/lem_setan_asli.png' },
    { nama: 'Buku Notes Kecil', img: '/buku_notes_asli.png' },
    { nama: 'Buku Double Folio', img: '/folio_asli.png' },
    { nama: 'Kuas Cat', img: '/kuas_asli.png' },
    { nama: 'Cat Cair / Cat Air', img: '/cat_cair_asli.png' }
  ];

  for (const update of updates) {
    await prisma.menu.updateMany({
      where: { nama: update.nama },
      data: { gambar_url: update.img }
    });
  }
  console.log('Gambar user batch 2 berhasil di-update!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());

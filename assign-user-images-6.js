const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const updates = [
    { nama: 'Buku Tulis (Tebal)', img: '/buku_tebal_asli.png' },
    { nama: 'Buku Tulis (Biasa)', img: '/buku_biasa_asli.png' },
    { nama: 'Peraut', img: '/peraut_asli.png' },
    { nama: 'Kertas Manila (Berwarna)', img: '/kertas_manila_asli.png' },
    { nama: 'Kamus Bahasa Indonesia', img: '/kamus_asli.png' },
    { nama: 'Kamus Bahasa Inggris', img: '/kamus_asli.png' }
  ];

  for (const update of updates) {
    await prisma.menu.updateMany({
      where: { nama: update.nama },
      data: { gambar_url: update.img }
    });
  }
  console.log('Gambar final user berhasil di-update!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const updates = [
    { nama: 'Kertas Manila (Berwarna)', img: '/kertas_manila_asli.png' },
    { nama: 'Kertas Karton (Hitam)', img: '/karton_hitam_asli.jpg' },
    { nama: 'Kertas Karton (Pink)', img: '/karton_pink_asli.jpg' },
    { nama: 'Kertas Karton (Biru)', img: '/karton_biru_asli.png' },
    { nama: 'Kertas Karton (Putih)', img: '/karton_putih_asli.png' }
  ];

  for (const update of updates) {
    await prisma.menu.updateMany({
      where: { nama: update.nama },
      data: { gambar_url: update.img }
    });
  }
  console.log('Gambar kertas user berhasil di-update!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());

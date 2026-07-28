const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const updates = [
    { contains: 'Buku Tulis', img: '/buku_tulis.png' },
    { contains: 'Buku Double Folio', img: '/buku_tulis.png' },
    { contains: 'Buku Notes', img: '/buku_tulis.png' },
    { contains: 'Kamus', img: '/kamus.png' },
    { contains: 'Pulpen', img: '/pulpen_pensil.png' },
    { contains: 'Pensil', img: '/pulpen_pensil.png' },
    { contains: 'Penghapus', img: '/pulpen_pensil.png' },
    { contains: 'Rautan', img: '/pulpen_pensil.png' },
    { contains: 'Penggaris', img: '/pulpen_pensil.png' },
    { contains: 'Cat Cair', img: '/alat_lukis.png' },
    { contains: 'Kuas Cat', img: '/alat_lukis.png' },
    { contains: 'Buku Gambar', img: '/alat_lukis.png' },
    { contains: 'Kertas', img: '/buku_tulis.png' }, // just mapped to notebooks for now as paper
    { contains: 'Lem', img: '/alat_potong.png' }, 
    { contains: 'Hekter', img: '/alat_potong.png' },
    { contains: 'Gunting', img: '/alat_potong.png' },
    { contains: 'Cutter', img: '/alat_potong.png' }
  ];

  for (const update of updates) {
    await prisma.menu.updateMany({
      where: { nama: { contains: update.contains } },
      data: { gambar_url: update.img }
    });
  }
  console.log('Gambar peralatan sekolah berhasil di-update!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());

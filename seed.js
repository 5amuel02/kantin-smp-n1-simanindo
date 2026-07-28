const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const menus = [
    { nama: 'Nabati Richeese (Keju)', harga: 2000, deskripsi: 'Wafer rasa keju eceran per biji', gambar_url: '' },
    { nama: 'Nabati Richeese (Coklat)', harga: 2000, deskripsi: 'Wafer rasa coklat eceran per biji', gambar_url: '' },
    { nama: 'Nabati Ahh', harga: 2000, deskripsi: 'Snack lapis keju/coklat panjang', gambar_url: '' },
    { nama: 'Arden', harga: 2000, deskripsi: 'Biskuit renyah', gambar_url: '' },
    { nama: 'Beng Beng', harga: 3000, deskripsi: 'Wafer karamel berlapis coklat', gambar_url: '' },
    { nama: 'Ganda', harga: 1000, deskripsi: 'Snack ringan', gambar_url: '' },
    { nama: 'Roti Ikan Hiu', harga: 1000, deskripsi: 'Roti manis bentuk ikan hiu', gambar_url: '' },
    { nama: 'Narosa', harga: 2000, deskripsi: 'Snack gurih', gambar_url: '' },
    { nama: 'Momogi', harga: 1000, deskripsi: 'Snack stik jagung panggang legendaris', gambar_url: '' },
    { nama: 'Olala', harga: 1000, deskripsi: 'Jajanan olala', gambar_url: '' },
    { nama: 'Aqua (Gelas)', harga: 500, deskripsi: 'Air mineral kemasan gelas', gambar_url: '' }
  ];

  for (const menu of menus) {
    await prisma.menu.create({
      data: menu
    });
  }
  console.log('Berhasil memasukkan', menus.length, 'menu ke database!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

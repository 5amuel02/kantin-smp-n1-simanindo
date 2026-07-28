const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.menu.updateMany({ where: { nama: 'Nabati Richeese (Coklat)' }, data: { gambar_url: '/nabaticoklat.jpg' } });
  await prisma.menu.updateMany({ where: { nama: 'Nabati Richeese (Keju)' }, data: { gambar_url: '/nabatikeju.png' } });
  await prisma.menu.updateMany({ where: { nama: 'Nabati Ahh' }, data: { gambar_url: '/nabatiaa.png' } });
  await prisma.menu.updateMany({ where: { nama: 'Beng Beng' }, data: { gambar_url: '/bengbeng.png' } });
  await prisma.menu.updateMany({ where: { nama: 'Arden' }, data: { gambar_url: '/arden.png' } });
  console.log('Berhasil update 5 gambar jajanan terbaru');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.menu.updateMany({ where: { nama: 'Olala' }, data: { gambar_url: '/olala.png' } });
  await prisma.menu.updateMany({ where: { nama: 'Momogi' }, data: { gambar_url: '/momogi.png' } });
  await prisma.menu.updateMany({ where: { nama: 'Narosa' }, data: { gambar_url: '/narosa.png' } });
  await prisma.menu.updateMany({ where: { nama: 'Roti Ikan Hiu' }, data: { gambar_url: '/hiu.png' } });
  await prisma.menu.updateMany({ where: { nama: 'Ganda' }, data: { gambar_url: '/ganda.jpg' } });
  console.log('Berhasil update 5 gambar jajanan');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());

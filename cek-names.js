const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const menus = await prisma.menu.findMany({
    where: { kategori: 'Peralatan Sekolah' }
  });
  console.log(menus.map(m => m.nama));
}
main().finally(() => prisma.$disconnect());

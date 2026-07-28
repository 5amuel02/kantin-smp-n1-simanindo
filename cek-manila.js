const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const menus = await prisma.menu.findMany({
    where: { nama: { contains: 'Manila' } }
  });
  console.log(menus);
}
main().finally(() => prisma.$disconnect());

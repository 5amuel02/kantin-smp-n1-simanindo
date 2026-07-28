const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const menus = await prisma.menu.findMany();
  const categories = [...new Set(menus.map(m => m.kategori))];
  console.log('Kategori yang ada di DB:', categories);
}

main().finally(() => prisma.$disconnect());

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const menus = await prisma.menu.findMany();
  const cats = [...new Set(menus.map(m => m.kategori))];
  console.log("Categories:", cats);
  
  const unknown = menus.filter(m => !m.kategori || m.kategori === 'Lainnya');
  console.log("Items in Lainnya:", unknown.map(m => m.nama));
}

main().finally(() => prisma.$disconnect());

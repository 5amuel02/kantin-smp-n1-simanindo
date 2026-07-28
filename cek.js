const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const menus = await prisma.menu.findMany();
  for (const m of menus) {
    if (m.kategori !== 'Jajanan' && m.kategori !== 'Peralatan Sekolah') {
      console.log(`WEIRD CATEGORY: ID=${m.id}, Nama=${m.nama}, Kategori='${m.kategori}'`);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());

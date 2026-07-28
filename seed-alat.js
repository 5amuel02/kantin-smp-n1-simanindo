const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const alatSekolah = [
    { nama: 'Buku Tulis (Biasa)', harga: 3000, deskripsi: 'Buku tulis standar 38 lembar', kategori: 'Peralatan Sekolah' },
    { nama: 'Buku Tulis (Tebal)', harga: 5000, deskripsi: 'Buku tulis 58 lembar', kategori: 'Peralatan Sekolah' },
    { nama: 'Kamus Bahasa Indonesia', harga: 15000, deskripsi: 'Kamus saku bahasa Indonesia', kategori: 'Peralatan Sekolah' },
    { nama: 'Kamus Bahasa Inggris', harga: 15000, deskripsi: 'Kamus saku bahasa Inggris-Indonesia', kategori: 'Peralatan Sekolah' },
    { nama: 'Pulpen (Biasa)', harga: 2000, deskripsi: 'Pulpen tinta hitam/biru standar', kategori: 'Peralatan Sekolah' },
    { nama: 'Pulpen (Bagus)', harga: 4000, deskripsi: 'Pulpen gel tinta lancar', kategori: 'Peralatan Sekolah' },
    { nama: 'Pensil 2B', harga: 2000, deskripsi: 'Pensil untuk ujian dan menulis', kategori: 'Peralatan Sekolah' },
    { nama: 'Pensil Biasa', harga: 1000, deskripsi: 'Pensil kayu standar', kategori: 'Peralatan Sekolah' },
    { nama: 'Penghapus', harga: 1000, deskripsi: 'Penghapus pensil bersih', kategori: 'Peralatan Sekolah' },
    { nama: 'Peraut / Rautan', harga: 1500, deskripsi: 'Rautan pensil tajam', kategori: 'Peralatan Sekolah' },
    { nama: 'Penggaris 15cm', harga: 1500, deskripsi: 'Penggaris plastik pendek', kategori: 'Peralatan Sekolah' },
    { nama: 'Penggaris 30cm', harga: 3000, deskripsi: 'Penggaris plastik panjang', kategori: 'Peralatan Sekolah' },
    { nama: 'Buku Gambar', harga: 4000, deskripsi: 'Buku gambar ukuran A4', kategori: 'Peralatan Sekolah' },
    { nama: 'Kertas Karton (Putih)', harga: 3000, deskripsi: 'Kertas karton besar warna putih', kategori: 'Peralatan Sekolah' },
    { nama: 'Kertas Karton (Biru)', harga: 3000, deskripsi: 'Kertas karton besar warna biru', kategori: 'Peralatan Sekolah' },
    { nama: 'Kertas Karton (Pink)', harga: 3000, deskripsi: 'Kertas karton besar warna pink', kategori: 'Peralatan Sekolah' },
    { nama: 'Kertas Karton (Hitam)', harga: 3000, deskripsi: 'Kertas karton besar warna hitam', kategori: 'Peralatan Sekolah' },
    { nama: 'Kertas Manila', harga: 2500, deskripsi: 'Kertas manila warna warni', kategori: 'Peralatan Sekolah' },
    { nama: 'Cat Cair / Cat Air', harga: 10000, deskripsi: 'Satu set cat air', kategori: 'Peralatan Sekolah' },
    { nama: 'Kuas Cat', harga: 2000, deskripsi: 'Kuas ukuran standar', kategori: 'Peralatan Sekolah' },
    { nama: 'Buku Double Folio', harga: 1000, deskripsi: 'Kertas double folio bergaris', kategori: 'Peralatan Sekolah' },
    { nama: 'Buku Notes Kecil', harga: 2000, deskripsi: 'Buku catatan kecil saku', kategori: 'Peralatan Sekolah' },
    { nama: 'Lem Setan (Super Glue)', harga: 5000, deskripsi: 'Lem cair super kuat', kategori: 'Peralatan Sekolah' },
    { nama: 'Lem Fox', harga: 4000, deskripsi: 'Lem putih serbaguna', kategori: 'Peralatan Sekolah' },
    { nama: 'Mata Hekter (Staples)', harga: 2000, deskripsi: 'Isi ulang hekter / staples', kategori: 'Peralatan Sekolah' },
    { nama: 'Hekter (Stapler)', harga: 8000, deskripsi: 'Hekter ukuran kecil', kategori: 'Peralatan Sekolah' },
    { nama: 'Gunting', harga: 6000, deskripsi: 'Gunting kertas tajam', kategori: 'Peralatan Sekolah' },
    { nama: 'Pisau Cutter', harga: 5000, deskripsi: 'Cutter tajam + isi', kategori: 'Peralatan Sekolah' }
  ];

  for (const item of alatSekolah) {
    await prisma.menu.create({ data: item });
  }
  
  console.log('Berhasil memasukkan', alatSekolah.length, 'peralatan sekolah!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());

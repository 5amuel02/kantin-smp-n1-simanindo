# Kantin Putri SMP N 1 Simanindo

Website resmi untuk Kantin Putri SMP N 1 Simanindo. Dibangun menggunakan Next.js, Prisma, dan PostgreSQL.

**🌐 Live Demo:** [https://kantin-smp-n1-simanindo-ip5abmrm2-legalation.vercel.app/](https://kantin-smp-n1-simanindo-ip5abmrm2-legalation.vercel.app/)

## Fitur
- **Halaman Utama:** Menampilkan daftar menu kantin beserta foto dan harga.
- **Halaman Admin:** Mengelola menu (Tambah, Edit, Hapus) dan menandai status stok (Tersedia/Habis).
- **Upload Gambar:** Terintegrasi dengan Supabase Storage untuk upload gambar menu.
- **Database:** Menggunakan PostgreSQL (Supabase) dengan Prisma ORM.

## Cara Menjalankan Secara Lokal

1. Clone repositori ini.
2. Install dependensi:
   ```bash
   npm install
   ```
3. Buat file `.env` dan masukkan:
   ```env
   DATABASE_URL="postgresql://..."
   DIRECT_URL="postgresql://..."
   ADMIN_PASSWORD="RahasiaKantin2026"
   NEXT_PUBLIC_SUPABASE_URL="https://..."
   NEXT_PUBLIC_SUPABASE_ANON_KEY="sb_publishable_..."
   ```
4. Jalankan server:
   ```bash
   npm run dev
   ```
5. Buka `http://localhost:3000` di browser Anda.

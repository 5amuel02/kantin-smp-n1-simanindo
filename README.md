# Kantin Putri SMP N 1 Simanindo

Website resmi untuk **Kantin Putri SMP N 1 Simanindo**. Proyek ini bertujuan untuk mendigitalisasi sistem kantin sekolah, memudahkan siswa dan guru untuk melihat katalog jajanan, makanan, serta peralatan sekolah secara *online* sebelum berbelanja.

Dibangun dengan antarmuka yang modern, responsif, dan tema *dark mode* elegan menggunakan Next.js, Prisma, dan PostgreSQL.

**🌐 Live Demo:** [https://kantin-smp-n1-simanindo-ip5abmrm2-legalation.vercel.app/](https://kantin-smp-n1-simanindo-ip5abmrm2-legalation.vercel.app/)

## 📸 Cuplikan Layar (Screenshots)

> **Catatan untuk Admin:** Silakan *drag and drop* (tarik dan lepas) gambar-gambar screenshot ke bagian ini saat mengedit di GitHub!

### 1. Halaman Utama (Hero Section)
<img width="1882" height="894" alt="Screenshot 2026-07-28 105602" src="https://github.com/user-attachments/assets/06c3bfe7-9c2e-4bc7-b239-2a825f1d6583" />


### 2. Katalog Menu 
<img width="1882" height="894" alt="Screenshot 2026-07-28 105602" src="https://github.com/user-attachments/assets/69c28784-8bdc-4ee2-8373-be1bc8da1328" />


### 3. Perjalanan Singkat
<img width="1882" height="894" alt="Screenshot 2026-07-28 105602" src="https://github.com/user-attachments/assets/08bf08ee-acf2-49d5-b7e6-c9712601c901" />


### 4. Lokasi Kantin
<img width="1882" height="894" alt="Screenshot 2026-07-28 105602" src="https://github.com/user-attachments/assets/817bae70-3662-4d89-87e5-720c241900eb" />


## ✨ Fitur Utama
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

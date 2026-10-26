# Rentakara — Rental Mobil dengan Booking Online

> **Kategori proyek: Web App — Sistem Rental / Sewa (Booking + Jadwal).**
> Cek ketersediaan tanggal per unit, hitung biaya otomatis, ajukan sewa, dan kelola jadwal dari satu panel.

Situs + sistem booking untuk rental mobil fiktif "Rentakara" di Bandung.
Proyek ini adalah **concept demo** untuk portofolio jasa pembuatan web —
seluruh merek, unit, harga, dan jadwal bersifat fiktif. Nama "Rentakara"
sengaja dibuat unik (belum dipakai entitas mana pun di internet).

**Live:** https://rentakara.vercel.app

## Fitur

- Hero dengan **form cek ketersediaan** (tanggal ambil & kembali) — hasil
  langsung memfilter katalog.
- Katalog **6 unit** (MPV, city car, van 16 kursi, SUV 4×4, MPV premium,
  sedan eksekutif) dengan foto, spesifikasi, dan harga per hari.
- **Ketersediaan real-time per tanggal**: unit yang rangenya bertabrakan
  dengan booking lain otomatis ditandai "Terbooking" dan tidak bisa diajukan.
- **Alur pengajuan sewa 3 langkah**: unit & tanggal (+opsi supir
  Rp150.000/hari dan antar-jemput Rp75.000) → data penyewa (validasi) →
  ringkasan biaya rinci.
- Layar konfirmasi dengan **kode booking (RTK-XXXXX)** + tombol kirim
  ringkasan ke WhatsApp admin.
- **Panel Jadwal** untuk pemilik rental: stat unit tersedia hari ini,
  booking berjalan, permintaan baru, pendapatan bulan ini; tabel booking
  dengan tombol ubah status (Menunggu → Dikonfirmasi → Berjalan → Selesai).
- Data demo tersimpan di **localStorage** + tombol reset data demo.
- Fully responsive + animasi Framer Motion + icon lucide-react.

## Untuk siapa demo ini?

Rental mobil, sewa bus, rental alat pesta/kamera, kost, dan semua bisnis
yang menyewakan barang per hari dan butuh cek ketersediaan tanggal.

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4
- Framer Motion (animasi stepper)
- Lucide Icons

## Menjalankan

```bash
npm install
npm run dev      # buka http://localhost:5173
npm run build    # build produksi ke folder dist/
```

## Catatan

- Nomor WhatsApp admin memakai nomor dummy `6281234567890`.
- Seluruh unit, harga, dan booking adalah data contoh (seed) yang
  disimpan di localStorage browser — tidak ada backend sungguhan.
- Dibuat sebagai concept demo portofolio oleh
  [Agni Miftah Fauzi](https://github.com/Atazyyy).

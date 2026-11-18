# PulihKarang

> Platform pelaporan kerusakan dan pemantauan pemulihan terumbu karang berbasis sains terbuka di Indonesia.
> Karya tim **Satu Paragraf JosJis** untuk **Web Design Competition Techno Versary Vol. II** dengan tema *"EcoDigital For Environment"*.

---

## Deskripsi Website

Banyak kerusakan terumbu karang tidak pernah dilaporkan, dan banyak kegiatan restorasi berhenti di tahap "sudah tanam" tanpa mengukur berapa karang yang benar-benar bertahan hidup (*survival rate*). **PulihKarang** menghubungkan partisipasi publik dengan pengelola daerah dalam satu alur terpadu:

1. **Lapor**: Warga, penyelam, atau wisatawan melaporkan kerusakan karang lewat foto, koordinat perairan, dan jenis kerusakan (boleh anonim, tanpa wajib login).
2. **Verifikasi**: Pengelola daerah memeriksa kesesuaian laporan (valid, tolak, atau deteksi laporan duplikat).
3. **Pulihkan**: Pengelola mengalihkan laporan valid ke agenda pemulihan serta mencatat sensus berkala.
4. **Pantau**: Publik memantau perkembangan pemulihan berbasis data sains terbuka (*survival rate* hidup vs umur tanam), dengan koordinat GPS presisi tetap dirahasiakan demi keamanan karang.

---

### Fitur Utama

- **Pelaporan Kerusakan Cepat**: Upload foto, peta interaktif, deteksi radius duplikat (<100m), dan kode lacak tiket unik (`/lapor` & `/lapor/terkirim`).
- **Dashboard Transparansi Publik**: Peta sebaran kawasan konservasi Bali, filter status tumbuh, grafik kelangsungan hidup (*growth history*), dan komparasi *before-after* (`/perkembangan` & `/perkembangan/:id`).
- **Portal Khusus Pengelola Daerah (`/pengelola`)**:
  - **Persetujuan Relawan**: Inbox pendaftaran relawan baru dari publik (`/gabung`), filter status, dan aksi persetujuan cepat.
  - **Manajemen Laporan**: Audit laporan kerusakan warga, deteksi duplikat, verifikasi valid, dan alihkan ke pemulihan.
  - **Update Perkembangan Karang**: Modal pencatatan sensus berkala (*hidup, mati, hilang, belum diamati*) dengan kalkulasi otomatis *survival rate* yang tersinkronisasi instan ke publik.
  - **Transparansi & Protokol Data**: Penegakan perlindungan koordinat presisi terumbu karang dan audit sumber data independen.
- **Edukasi & Dokumentasi**: Artikel panduan transplantasi karang (`/artikel`) dan galeri interaktif komparasi pemulihan (`/galeri`).
- **Kontak & Cek Status**: Cek status tiket laporan langsung dan sekretariat pengelola daerah (`/contact`).

---

### Daftar Halaman & Rute

| Halaman | Rute | Akses Pengguna |
|---|---|---|
| Beranda | `/` | Publik (Tanpa Login) |
| Tentang Kami | `/about` | Publik (Tanpa Login) |
| Artikel Edukasi | `/artikel` & `/artikel/:slug` | Publik (Tanpa Login) |
| Galeri Pemulihan | `/galeri` | Publik (Tanpa Login) |
| Laporkan Kerusakan | `/lapor` & `/lapor/terkirim` | Publik (Tanpa Login) |
| Perkembangan Karang | `/perkembangan` & `/perkembangan/:id` | Publik (Tanpa Login) |
| Gabung Tim Relawan | `/gabung` | Publik (Tanpa Login) |
| Kontak & FAQ | `/contact` | Publik (Tanpa Login) |
| Masuk Pengelola | `/masuk` | Khusus Pengelola Daerah |
| Portal Pengelola Daerah | `/pengelola` | Khusus Pengelola Daerah |

> **Catatan Demo Lomba:** Sistem beroperasi secara *Frontend-Only (No Backend)*. Seluruh pembaruan data (laporan baru, persetujuan relawan, update sensus karang) tersimpan persisten secara reaktif di `localStorage` peramban.

---

## Teknologi

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) dengan Design System Tokens (`--teal-*`, `--coral-*`, `--ink-*`, `--surface`)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Peta Interaktif**: [Leaflet](https://leafletjs.com/) + OpenStreetMap
- **Ikon**: [React Icons](https://react-icons.github.io/react-icons/) (Lucide Icons)
- **Aset Gambar**: Cloudinary CDN dengan optimasi format & kualitas otomatis (`f_auto,q_auto`)

*Seluruh library gratis & open-source, bebas template berbayar, dan memenuhi standar aksesibilitas WCAG AA.*

---

## Petunjuk Instalasi & Menjalankan

### Prasyarat
- [Node.js](https://nodejs.org/) versi LTS (v18+)
- npm (bawaan Node.js)
- Git

### Langkah Instalasi
```bash
# 1. Clone repositori
git clone https://github.com/USERNAME/webdesign_SatuParagrafJosJis_technoversary_vol.II.git

# 2. Masuk ke direktori proyek
cd webdesign_SatuParagrafJosJis_technoversary_vol.II

# 3. Pasang dependensi
npm install

# 4. Jalankan server lokal
npm run dev
```
Buka alamat yang tampil di terminal: `http://localhost:5173`.

### Build Produksi
```bash
npm run build
npm run preview
```

---

## Akun Demo Pengelola Daerah

Untuk pengujian dewan juri, telah disediakan tombol pengisian otomatis satu klik (*"Isi Akun Pengelola Daerah"*) pada halaman `/masuk`:

| Peran | Email | Kata Sandi | Halaman Akses |
|---|---|---|---|
| **Pengelola Daerah** (Admin Bali) | `pengelola.bali@pulihkarang.id` | `karanglestari` | `/pengelola` |

---

## Tim Pengembang

**Nama Tim:** Satu Paragraf JosJis  
**Asal Instansi:** Universitas Udayana

| No | Nama | Peran |
|:---:|---|---|
| 1 | **Aurell Evangeline Taolin** | Ketua Tim & UI/UX Designer |
| 2 | **I Wayan Deasa Putra** | Front-end Developer |
| 3 | **Ida Bagus Gede Ngurah Kemenuh** | Front-end Developer |

---
*Dibuat untuk Web Design Competition Techno Versary Vol. II, HIMA-TI FKOM Universitas Kuningan, 2026.*

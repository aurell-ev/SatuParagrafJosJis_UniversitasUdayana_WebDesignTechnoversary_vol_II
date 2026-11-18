# PulihKarang

> Website pelaporan kerusakan dan pemantauan pemulihan terumbu karang di Indonesia.
> Karya untuk **Web Design Competition Techno Versary Vol. II** dengan tema *"EcoDigital For Environment"*.

## Deskripsi Website

Banyak kerusakan terumbu karang tidak pernah dilaporkan, dan banyak kegiatan restorasi berhenti di tahap "sudah tanam" tanpa mengukur berapa karang yang benar-benar bertahan hidup. **PulihKarang** menghubungkan warga, tim restorasi daerah, dan publik dalam satu alur:

1. **Lapor**: warga melaporkan kerusakan karang lewat foto, titik lokasi, dan jenis kerusakan (boleh anonim).
2. **Verifikasi**: tim daerah mengecek laporan di lapangan (valid, tidak valid, atau duplikat).
3. **Pulihkan**: tim mencatat penanaman, perawatan, dan pemeriksaan berkala.
4. **Pantau**: publik melihat perkembangan pemulihan, termasuk persentase karang yang masih hidup.

### Fitur Utama
- Form lapor kerusakan tanpa login, dengan penanda laporan yang mungkin duplikat
- Halaman perkembangan pemulihan per daerah (lokasi persis disamarkan)
- Dashboard tim daerah: verifikasi laporan, catatan tanam, perawatan, dan pemeriksaan
- Pendaftaran relawan tim per daerah
- Artikel edukasi dan galeri dokumentasi

### Halaman
| Halaman | Rute |
|---|---|
| Home | `/` |
| About | `/about` |
| Artikel | `/artikel` |
| Galeri | `/galeri` |
| Lapor Kerusakan | `/lapor` |
| Perkembangan | `/perkembangan` |
| Gabung Tim | `/gabung` |
| Contact | `/contact` |
| Dashboard Tim (simulasi login) | `/tim` |

> **Catatan:** Seluruh data di website ini adalah **data contoh** untuk keperluan demo lomba. Laporan dan login disimulasikan menggunakan `localStorage` di browser.

## Teknologi
- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [React Router](https://reactrouter.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

Seluruh library yang digunakan gratis dan open-source. Tidak menggunakan template atau komponen berbayar.

## Petunjuk Instalasi

### Prasyarat
- [Node.js](https://nodejs.org/) versi LTS (cek dengan `node -v`)
- npm (sudah termasuk dalam Node.js)
- Git

### Langkah Instalasi
1. Clone repository ini:
   ```bash
   git clone https://github.com/USERNAME/webdesign_SatuParagrafJosJis_technoversary_vol.II.git
   ```
2. Masuk ke folder project:
   ```bash
   cd webdesign_SatuParagrafJosJis_technoversary_vol.II
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Cara Menjalankan Project

### Mode development
```bash
npm run dev
```
Buka alamat yang muncul di terminal, biasanya `http://localhost:5173`.

### Build untuk produksi
```bash
npm run build
npm run preview
```

### Akun demo tim daerah
| Peran | Email | Kata sandi |
|---|---|---|
| Pengelola daerah | `pengelola@demo.pulihkarang` | `demo123` |
| Anggota tim | `anggota@demo.pulihkarang` | `demo123` |

## Struktur Folder
```
webdesign_namaTim_technoversary_vol.II/
├── public/            # gambar dan aset statis
├── src/
│   ├── components/    # komponen UI (Navbar, Footer, Card, dll.)
│   ├── pages/         # halaman website
│   ├── data/          # data contoh (JSON)
│   ├── App.jsx        # routing
│   ├── main.jsx
│   └── index.css      # Tailwind
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Nama Tim dan Anggota

**Nama Tim:** Satu Paragraf JosJis
| No | Nama | Peran |
|---|---|---|
| 1 | _Aurell Evangeline Taolin_ | Ketua |
| 2 | _I Wayan Deasa Putra_ | _Front-end Developer_ |
| 3 | _Ida Bagus Gede Ngurah Kemenuh_ | _Front-end Developer_ |

---
Dibuat untuk Web Design Competition Techno Versary Vol. II, HIMA-TI FKOM Universitas Kuningan, 2026.

/**
 * Seed data untuk Galeri Pemulihan Karang (/galeri)
 * Menggunakan URL Cloudinary teroptimasi (f_auto,q_auto) sesuai aturan GEMINI.md
 */

export const FEATURED_GALLERY_ITEM = {
  id: 'galeri-unggulan-ped',
  title: 'Ped, Nusa Penida',
  daerah: 'Klungkung',
  badge: 'Pembaruan terbaru',
  description:
    'Area bekas patahan jangkar di dekat tempat labuh kapal wisata. Tim daerah menanam ulang fragmen karang bercabang dengan metode rangka.',
  totalPlanted: 310,
  survivalRate: 54,
  ageInfo: 'masih hidup · 180 hari',
  auditedBy: 'Data tim pelaksana',
  date: '2026-10-28',
  beforePhoto: {
    url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794893779/satu-paragraf-josjis/article-damaged.jpg',
    label: 'Sebelum · Mar 2025'
  },
  afterPhoto: {
    url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821343/satu-paragraf-josjis/progress-thriving.png',
    label: 'Sesudah · Okt 2026'
  },
  story:
    'Sebelum pemulihan, dasar perairan di kawasan Ped mengalami kerusakan mekanis parah akibat hempasan jangkar perahu cepat dan kapal wisata. Tutupan karang hidup sempat anjlok hingga di bawah 20%. Tim gabungan Nusa Penida Reef Guardians memasang 35 unit struktur rangka laba-laba (spider web) dan mengikatkan 310 fragmen Acropora formosa. Hasil pemantauan berkala pada bulan ke-6 menunjukkan tingkat kelangsungan hidup 54%, dengan koloni baru yang mulai kokoh mengikat diri ke struktur besi.'
}

export const INITIAL_GALLERY_ITEMS = [
  {
    id: 'galeri-sanur-kaja',
    title: 'Sanur Kaja, Denpasar',
    daerah: 'Denpasar',
    method: 'Rangka besi · 19 bulan pemulihan',
    auditedBy: 'Sudah ditinjau pihak lain',
    date: '2026-10-15',
    beforePhoto: {
      url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821834/satu-paragraf-josjis/edu-bleach.png',
      label: 'Sebelum · Mar 2025'
    },
    afterPhoto: {
      url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821342/satu-paragraf-josjis/progress-staghorn.png',
      label: 'Sesudah · Okt 2026'
    },
    story:
      'Proyek rehabilitasi di Sanur Kaja mengadopsi rangka spider frame baja tahan karat. Karang bercabang jenis Staghorn yang ditransplantasikan kini tumbuh lebat dengan percabangan lebih dari 12 cm, menciptakan celah berlindung alami bagi ikan karang dan biota mikro laut.'
  },
  {
    id: 'galeri-les-tejakula',
    title: 'Les, Tejakula',
    daerah: 'Buleleng',
    method: 'Transplantasi fragmen · 14 bulan',
    auditedBy: 'Data tim pelaksana',
    date: '2026-09-20',
    beforePhoto: {
      url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794819579/satu-paragraf-josjis/coral-bleaching.png',
      label: 'Sebelum · Jul 2025'
    },
    afterPhoto: {
      url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821342/satu-paragraf-josjis/progress-transplant.png',
      label: 'Sesudah · Sep 2026'
    },
    story:
      'Kawasan pesisir Desa Les pulih dari ancaman pemutihan karang dan degradasi perikanan tangkap. Tim konservasi bersama komunitas nelayan menempatkan meja pembibitan (nursery table) di kedalaman 6 meter untuk memperbanyak fragmen Pocillopora verrucosa sebelum ditanam ke substrat permanen.'
  },
  {
    id: 'galeri-serangan-denpasar',
    title: 'Serangan, Denpasar',
    daerah: 'Denpasar',
    method: 'Nursery & tanam ulang · 12 bulan',
    auditedBy: 'Sudah ditinjau pihak lain',
    date: '2026-10-05',
    beforePhoto: {
      url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794893779/satu-paragraf-josjis/article-damaged.jpg',
      label: 'Sebelum · Okt 2025'
    },
    afterPhoto: {
      url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794903240/satu-paragraf-josjis/progress-planting.jpg',
      label: 'Sesudah · Okt 2026'
    },
    story:
      'Perairan Pulau Serangan mendapatkan intervensi berupa pembibitan karang meja gantung untuk memulihkan area sedimentasi pasca-proyek pelabuhan. Fragmen karang sehat beradaptasi baik dengan tingkat mortalitas di bawah 22% selama satu tahun pertama.'
  },
  {
    id: 'galeri-amed-karangasem',
    title: 'Amed, Karangasem',
    daerah: 'Karangasem',
    method: 'Rangka besi · 10 bulan',
    auditedBy: 'Data tim pelaksana',
    date: '2026-11-10',
    beforePhoto: {
      url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821834/satu-paragraf-josjis/edu-survey.png',
      label: 'Sebelum · Jan 2026'
    },
    afterPhoto: {
      url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821343/satu-paragraf-josjis/progress-thriving.png',
      label: 'Sesudah · Nov 2026'
    },
    story:
      'Struktur piramida biorock ditempatkan di lereng tubir Amed pada kedalaman 8 meter. Aliran arus listrik bertegangan rendah mempercepat presipitasi kalsium karbonat, merangsang laju pembentukan kerangka kapur karang 3 kali lebih pesat dibandingkan laju pertumbuhan alami.'
  },
  {
    id: 'galeri-lembongan-klungkung',
    title: 'Lembongan, Klungkung',
    daerah: 'Klungkung',
    method: 'Transplantasi fragmen · 9 bulan',
    auditedBy: 'Data tim pelaksana',
    date: '2026-11-02',
    beforePhoto: {
      url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821834/satu-paragraf-josjis/edu-bleach.png',
      label: 'Sebelum · Feb 2026'
    },
    afterPhoto: {
      url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794903240/satu-paragraf-josjis/progress-kurakura.jpg',
      label: 'Sesudah · Nov 2026'
    },
    story:
      'Inisiatif restorasi terumbu karang di kawasan Nusa Lembongan diinisiasi oleh operator selam lokal untuk mengembalikan keanekaragaman hayati di koridor lintas penyu dan pari manta. Karang meja Porites kini mulai menunjukkan kolonisasi anemon laut.'
  },
  {
    id: 'galeri-pemuteran-buleleng',
    title: 'Pemuteran, Buleleng',
    daerah: 'Buleleng',
    method: 'Rangka besi · 8 bulan',
    auditedBy: 'Sudah ditinjau pihak lain',
    date: '2026-11-12',
    beforePhoto: {
      url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794893924/satu-paragraf-josjis/article-gili.jpg',
      label: 'Sebelum · Mar 2026'
    },
    afterPhoto: {
      url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821342/satu-paragraf-josjis/progress-staghorn.png',
      label: 'Sesudah · Nov 2026'
    },
    story:
      'Kawasan Taman Bawah Air Pemuteran menerapkan pendekatan restorasi komprehensif dengan pemantauan mingguan oleh tim diving centre dan masyarakat hukum adat setempat. Tingkat penutupan karang hidup meningkat 38% dalam 8 bulan.'
  },
  {
    id: 'galeri-tulamben-karangasem',
    title: 'Tulamben, Karangasem',
    daerah: 'Karangasem',
    method: 'Substrat kubus beton · 7 bulan',
    auditedBy: 'Data tim pelaksana',
    date: '2026-08-15',
    beforePhoto: {
      url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794893779/satu-paragraf-josjis/article-damaged.jpg',
      label: 'Sebelum · Jan 2026'
    },
    afterPhoto: {
      url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821342/satu-paragraf-josjis/progress-transplant.png',
      label: 'Sesudah · Agu 2026'
    },
    story:
      'Pemasangan modul terumbu buatan berbentuk kubus beton berongga di dekat situs bangkai kapal Liberty untuk mengurangi tekanan wisata selam terhadap terumbu karang alami sekitar.'
  },
  {
    id: 'galeri-ceningan-klungkung',
    title: 'Nusa Ceningan, Klungkung',
    daerah: 'Klungkung',
    method: 'Spider frame · 6 bulan',
    auditedBy: 'Sudah ditinjau pihak lain',
    date: '2026-07-20',
    beforePhoto: {
      url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794819579/satu-paragraf-josjis/coral-bleaching.png',
      label: 'Sebelum · Jan 2026'
    },
    afterPhoto: {
      url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821343/satu-paragraf-josjis/progress-thriving.png',
      label: 'Sesudah · Jul 2026'
    },
    story:
      'Pemulihan koridor selat sempit antara Nusa Lembongan dan Ceningan dengan penanaman karang tahan arus deras. Pertumbuhan karang masif mendominasi dasar terumbu.'
  },
  {
    id: 'galeri-mertasari-denpasar',
    title: 'Pantai Mertasari, Denpasar',
    daerah: 'Denpasar',
    method: 'Meja pembibitan · 5 bulan',
    auditedBy: 'Data tim pelaksana',
    date: '2026-06-18',
    beforePhoto: {
      url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821834/satu-paragraf-josjis/edu-survey.png',
      label: 'Sebelum · Jan 2026'
    },
    afterPhoto: {
      url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794903240/satu-paragraf-josjis/progress-planting.jpg',
      label: 'Sesudah · Jun 2026'
    },
    story:
      'Pembibitan fragmen karang di laguna dangkal Pantai Mertasari oleh relawan pelajar dan mahasiswa pencinta alam di bawah bimbingan peneliti kelautan.'
  },
  {
    id: 'galeri-lovina-buleleng',
    title: 'Lovina, Buleleng',
    daerah: 'Buleleng',
    method: 'Transplantasi fragmen · 4 bulan',
    auditedBy: 'Data tim pelaksana',
    date: '2026-05-14',
    beforePhoto: {
      url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821834/satu-paragraf-josjis/edu-nursery.png',
      label: 'Sebelum · Jan 2026'
    },
    afterPhoto: {
      url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821342/satu-paragraf-josjis/progress-staghorn.png',
      label: 'Sesudah · Mei 2026'
    },
    story:
      'Perbaikan zona dangkal pesisir Lovina untuk memulihkan terumbu karang yang rusak akibat jangkar perahu pemantau lumba-lumba.'
  },
  {
    id: 'galeri-padangbai-karangasem',
    title: 'Padangbai, Karangasem',
    daerah: 'Karangasem',
    method: 'Rangka besi · 3 bulan',
    auditedBy: 'Sudah ditinjau pihak lain',
    date: '2026-04-10',
    beforePhoto: {
      url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794893924/satu-paragraf-josjis/article-gili.jpg',
      label: 'Sebelum · Jan 2026'
    },
    afterPhoto: {
      url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794903240/satu-paragraf-josjis/progress-kurakura.jpg',
      label: 'Sesudah · Apr 2026'
    },
    story:
      'Transplantasi di Blue Lagoon Padangbai untuk merehabilitasi terumbu karang bercabang yang sempat terserang sedimentasi pasir saat musim ombak barat.'
  },
  {
    id: 'galeri-penida-barat-klungkung',
    title: 'Nusa Penida Barat, Klungkung',
    daerah: 'Klungkung',
    method: 'Reef stars · 2 bulan',
    auditedBy: 'Data tim pelaksana',
    date: '2026-03-01',
    beforePhoto: {
      url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794819579/satu-paragraf-josjis/coral-bleaching.png',
      label: 'Sebelum · Jan 2026'
    },
    afterPhoto: {
      url: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821343/satu-paragraf-josjis/progress-thriving.png',
      label: 'Sesudah · Mar 2026'
    },
    story:
      'Penempatan 50 unit struktur bintang karang (reef stars) di lereng terumbu karang Crystal Bay untuk menahan runtuhan karang mati dan memberi tumpuan bagi fragmen baru.'
  }
]

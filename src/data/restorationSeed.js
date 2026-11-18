/**
 * restorationSeed.js
 * Master Seed Data untuk Situs Pemulihan / Restorasi Karang PulihKarang.
 * 
 * Sesuai Desain Figma: PulihKarang - Desktop/Perkembangan (node: 1155:3971)
 * Semua aset gambar menggunakan Cloudinary resmi dengan optimasi f_auto,q_auto.
 */

export const OVERVIEW_STATS = {
  totalLocations: 36,
  totalFragments: 4820,
  avgSurvivalRate: 71,
  auditedCount: 14
}

export const REGIONS_OVERVIEW = [
  {
    id: 'denpasar',
    name: 'Denpasar',
    totalLocations: 12,
    survivalRate: 68,
    center: [-8.675, 115.263],
    description: '12 lokasi pemulihan di Sanur & Serangan'
  },
  {
    id: 'klungkung',
    name: 'Klungkung',
    totalLocations: 9,
    survivalRate: 62,
    center: [-8.685, 115.480],
    description: '9 lokasi di Nusa Penida & Nusa Lembongan'
  },
  {
    id: 'buleleng',
    name: 'Buleleng',
    totalLocations: 10,
    survivalRate: 81,
    center: [-8.140, 114.950],
    description: '10 lokasi di pesisir Buleleng Timur & Barat'
  },
  {
    id: 'karangasem',
    name: 'Karangasem',
    totalLocations: 5,
    survivalRate: 74,
    center: [-8.340, 115.640],
    description: '5 lokasi di Amed & Tulamben'
  }
]

export const STATUS_FILTERS = [
  { id: 'all', label: 'Semua status' },
  { id: 'penanaman', label: 'Penanaman' },
  { id: 'perawatan', label: 'Perawatan' },
  { id: 'sedang-dipantau', label: 'Sedang Dipantau' },
  { id: 'dipulihkan', label: 'Dipulihkan' }
]

export const INITIAL_RESTORATION = [
  // ==========================================
  // GRUP DENPASAR
  // ==========================================
  {
    id: 'SITE-DPS-001',
    reportId: 'PK-2026-DPS1',
    name: 'Sanur Kaja',
    regency: 'Denpasar',
    district: 'Denpasar Selatan',
    region: 'Bali',
    publicAreaName: 'Denpasar Selatan, Denpasar · area disamarkan',
    privateCoordinates: { lat: -8.6753, lng: 115.2631 },
    method: 'Rangka besi (metode tim)',
    teamName: 'Tim Restorasi Denpasar',
    sourceReport: 'PK-2605-0117 · Pemutihan',
    initialCondition: 'Tutupan awal 18% akibat terinjak wisatawan dan sedimentasi muara.',
    plantedAt: '2026-05-18',
    ageDays: 180,
    inspectionCount: 6,
    lastInspectionLabel: 'Pemeriksaan ke-6 · 11 Nov 2026',
    totalPlanted: 420,
    aliveCount: 286,
    deadCount: 72,
    lostCount: 34,
    unobservedCount: 28,
    coralGenera: ['Acropora formosa', 'Montipora digitata'],
    currentSurvivalRate: 68.0,
    currentStatus: 'Perawatan',
    status: 'Perawatan',
    auditStatus: 'Ditinjau pihak lain',
    updatedAtLabel: 'Diperbarui 3 hari lalu',
    imageUrl: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821343/satu-paragraf-josjis/progress-thriving.png',
    photos: {
      before: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821834/satu-paragraf-josjis/coral-bleaching.png',
      after: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821343/satu-paragraf-josjis/progress-thriving.png',
      beforeLabel: 'Sebelum · laporan Mei 2026',
      afterLabel: 'Sesudah · Nov 2026'
    },
    growthHistory: [
      { day: 0, label: '0 hr', rate: 100 },
      { day: 30, label: '30 hr', rate: 92 },
      { day: 60, label: '60 hr', rate: 84 },
      { day: 90, label: '90 hr', rate: 78 },
      { day: 120, label: '120 hr', rate: 71 },
      { day: 150, label: '150 hr', rate: 70 },
      { day: 180, label: '180 hr', rate: 68 }
    ],
    activityTimeline: [
      {
        id: 'act-6',
        title: 'Pemeriksaan ke-6',
        date: '11 Nov 2026',
        description: '286 hidup, 72 mati, 34 hilang, 28 belum diamati.',
        type: 'inspection',
        status: 'success'
      },
      {
        id: 'act-5',
        title: 'Perawatan',
        date: '28 Okt 2026',
        description: 'Pembersihan alga dan sampah di rangka.',
        type: 'maintenance',
        status: 'warning'
      },
      {
        id: 'act-4',
        title: 'Pemeriksaan ke-5',
        date: '12 Okt 2026',
        description: '70% hidup pada umur 150 hari.',
        type: 'inspection',
        status: 'info'
      },
      {
        id: 'act-3',
        title: 'Penanaman',
        date: '18 Mei 2026',
        description: '420 fragmen ditanam pada 14 rangka.',
        type: 'planting',
        status: 'sky'
      },
      {
        id: 'act-2',
        title: 'Laporan diverifikasi',
        date: '9 Mei 2026',
        description: 'Laporan warga dicek tim daerah.',
        type: 'verification',
        status: 'neutral'
      }
    ],
    inspections: [
      {
        date: '2026-05-10',
        ageDays: 120,
        aliveCount: 300,
        deadCount: 80,
        lostCount: 40,
        survivalRate: 71.4,
        notes: 'Pembersihan alga makro rutin, substrat kokoh.',
        auditedBy: 'Data Tim Pelaksana'
      },
      {
        date: '2026-11-14',
        ageDays: 300,
        aliveCount: 285,
        deadCount: 95,
        lostCount: 40,
        survivalRate: 68.0,
        notes: 'Pertumbuhan cabang baru mencapai 4cm, verifikasi independen oleh tim akademisi.',
        auditedBy: 'Sudah Ditinjau Pihak Independen'
      }
    ]
  },
  {
    id: 'SITE-DPS-002',
    reportId: 'PK-2026-DPS2',
    name: 'Serangan',
    regency: 'Denpasar',
    district: 'Denpasar Selatan',
    region: 'Bali',
    publicAreaName: 'Denpasar Selatan, Denpasar · area disamarkan',
    privateCoordinates: { lat: -8.7282, lng: 115.2345 },
    method: 'Reef Dome Beton & Transplantasi Karang Lunak',
    initialCondition: 'Zona bekas reklamasi dengan substrat berpasir dan tutupan karang 12%.',
    plantedAt: '2025-11-20',
    totalPlanted: 380,
    coralGenera: ['Porites lutea', 'Sarcophyton sp.'],
    currentSurvivalRate: 72.0,
    currentStatus: 'Sedang Dipantau',
    status: 'Sedang Dipantau',
    auditStatus: 'Data tim pelaksana',
    updatedAtLabel: 'Diperbarui 3 hari lalu',
    imageUrl: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794903240/satu-paragraf-josjis/progress-kurakura.jpg',
    photos: {
      before: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794893779/satu-paragraf-josjis/article-damaged.jpg',
      after: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794903240/satu-paragraf-josjis/progress-kurakura.jpg'
    },
    inspections: [
      {
        date: '2026-11-14',
        ageDays: 360,
        aliveCount: 274,
        deadCount: 68,
        lostCount: 38,
        survivalRate: 72.0,
        notes: 'Penyu hijau dan ikan karang herbivora aktif di sekitar struktur dome.',
        auditedBy: 'Data Tim Pelaksana'
      }
    ]
  },
  {
    id: 'SITE-DPS-003',
    reportId: 'PK-2026-DPS3',
    name: 'Sanur Kauh',
    regency: 'Denpasar',
    district: 'Denpasar Selatan',
    region: 'Bali',
    publicAreaName: 'Denpasar Selatan, Denpasar · area disamarkan',
    privateCoordinates: { lat: -8.7042, lng: 115.2491 },
    method: 'Substrat Rangka Biorock Rendah Voltase',
    initialCondition: 'Zona patahan akibat jangkar kapal jukung lokal.',
    plantedAt: '2026-11-12',
    totalPlanted: 260,
    coralGenera: ['Acropora branching', 'Pocillopora damicornis'],
    currentSurvivalRate: null,
    currentStatus: 'Penanaman',
    status: 'Penanaman',
    auditStatus: 'Data tim pelaksana',
    updatedAtLabel: 'Ditanam 5 hari lalu',
    imageUrl: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821834/satu-paragraf-josjis/edu-nursery.png',
    photos: {
      before: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821834/satu-paragraf-josjis/edu-nursery.png',
      after: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821834/satu-paragraf-josjis/edu-nursery.png'
    },
    inspections: []
  },

  // ==========================================
  // GRUP KLUNGKUNG (Nusa Penida & Lembongan)
  // ==========================================
  {
    id: 'SITE-KLK-001',
    reportId: 'PK-2026-KLK1',
    name: 'Ped',
    regency: 'Klungkung',
    district: 'Nusa Penida',
    region: 'Bali',
    publicAreaName: 'Nusa Penida, Klungkung · area disamarkan',
    privateCoordinates: { lat: -8.6738, lng: 115.5122 },
    method: 'Modular Concrete Block & Meja Transplantasi',
    initialCondition: 'Arus kencang selat Lombok, kerusakan akibat jangkar kapal cepat.',
    plantedAt: '2025-08-14',
    totalPlanted: 310,
    coralGenera: ['Acropora formosa', 'Galaxea fascicularis'],
    currentSurvivalRate: 54.0,
    currentStatus: 'Perawatan',
    status: 'Perawatan',
    auditStatus: 'Data tim pelaksana',
    updatedAtLabel: 'Diperbarui 3 hari lalu',
    imageUrl: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821342/satu-paragraf-josjis/progress-staghorn.png',
    photos: {
      before: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794893779/satu-paragraf-josjis/article-damaged.jpg',
      after: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821342/satu-paragraf-josjis/progress-staghorn.png'
    },
    inspections: [
      {
        date: '2026-11-14',
        ageDays: 450,
        aliveCount: 167,
        deadCount: 88,
        lostCount: 55,
        survivalRate: 54.0,
        notes: 'Arus bawah laut sempat menggeser 2 modul, sudah ditambatkan ulang.',
        auditedBy: 'Data Tim Pelaksana'
      }
    ]
  },
  {
    id: 'SITE-KLK-002',
    reportId: 'PK-2026-KLK2',
    name: 'Toyapakeh',
    regency: 'Klungkung',
    district: 'Nusa Penida',
    region: 'Bali',
    publicAreaName: 'Nusa Penida, Klungkung · area disamarkan',
    privateCoordinates: { lat: -8.6791, lng: 115.4859 },
    method: 'Struktur Spider Web & Pemasangan Fragmen Cabang',
    initialCondition: 'Tumpukan rubble patahan karang mati akibat gelombang badai.',
    plantedAt: '2026-02-18',
    totalPlanted: 240,
    coralGenera: ['Acropora cervicornis', 'Pocillopora verrucosa'],
    currentSurvivalRate: 61.0,
    currentStatus: 'Sedang Dipantau',
    status: 'Sedang Dipantau',
    auditStatus: 'Ditinjau pihak lain',
    updatedAtLabel: 'Diperbarui 3 hari lalu',
    imageUrl: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794903240/satu-paragraf-josjis/progress-planting.jpg',
    photos: {
      before: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821834/satu-paragraf-josjis/coral-bleaching.png',
      after: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794903240/satu-paragraf-josjis/progress-planting.jpg'
    },
    inspections: [
      {
        date: '2026-11-14',
        ageDays: 270,
        aliveCount: 146,
        deadCount: 54,
        lostCount: 40,
        survivalRate: 61.0,
        notes: 'Pertumbuhan jaringan basal karang menempel baik pada spider web.',
        auditedBy: 'Sudah Ditinjau Pihak Independen'
      }
    ]
  },
  {
    id: 'SITE-KLK-003',
    reportId: 'PK-2026-KLK3',
    name: 'Jungutbatu',
    regency: 'Klungkung',
    district: 'Nusa Lembongan',
    region: 'Bali',
    publicAreaName: 'Nusa Lembongan, Klungkung · area disamarkan',
    privateCoordinates: { lat: -8.6749, lng: 115.4475 },
    method: 'Biorock Karang Alami & Penanaman Acropora',
    initialCondition: 'Zona budidaya rumput laut historis yang telah beralih ke restorasi ekowisata.',
    plantedAt: '2025-06-01',
    totalPlanted: 300,
    coralGenera: ['Acropora grandis', 'Stylophora pistillata'],
    currentSurvivalRate: 77.0,
    currentStatus: 'Dipulihkan',
    status: 'Dipulihkan',
    auditStatus: 'Ditinjau pihak lain',
    updatedAtLabel: 'Diperbarui 3 hari lalu',
    imageUrl: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821342/satu-paragraf-josjis/progress-transplant.png',
    photos: {
      before: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794893924/satu-paragraf-josjis/article-gili.jpg',
      after: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821342/satu-paragraf-josjis/progress-transplant.png'
    },
    inspections: [
      {
        date: '2026-11-14',
        ageDays: 530,
        aliveCount: 231,
        deadCount: 45,
        lostCount: 24,
        survivalRate: 77.0,
        notes: 'Koloni stabil, telah terbentuk ekosistem mandiri dengan ikan dolfin sering melintas.',
        auditedBy: 'Sudah Ditinjau Pihak Independen'
      }
    ]
  },

  // ==========================================
  // GRUP BULELENG
  // ==========================================
  {
    id: 'SITE-BLG-001',
    reportId: 'PK-2026-BLG1',
    name: 'Les',
    regency: 'Buleleng',
    district: 'Tejakula',
    region: 'Bali',
    publicAreaName: 'Tejakula, Buleleng · area disamarkan',
    privateCoordinates: { lat: -8.1408, lng: 115.3582 },
    method: 'Fish Dome & Transplantasi Karang Meja',
    initialCondition: 'Pemulihan dari dampak penangkapan ikan potasium historis dekade lalu.',
    plantedAt: '2025-04-10',
    totalPlanted: 260,
    coralGenera: ['Acropora hyacinthus', 'Montipora aequituberculata'],
    currentSurvivalRate: 81.0,
    currentStatus: 'Sedang Dipantau',
    status: 'Sedang Dipantau',
    auditStatus: 'Ditinjau pihak lain',
    updatedAtLabel: 'Diperbarui 3 hari lalu',
    imageUrl: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821342/satu-paragraf-josjis/progress-transplant.png',
    photos: {
      before: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794893779/satu-paragraf-josjis/article-damaged.jpg',
      after: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821342/satu-paragraf-josjis/progress-transplant.png'
    },
    inspections: [
      {
        date: '2026-11-14',
        ageDays: 580,
        aliveCount: 211,
        deadCount: 29,
        lostCount: 20,
        survivalRate: 81.0,
        notes: 'Hasil luar biasa dari kerja sama kelompok nelayan desa Les.',
        auditedBy: 'Sudah Ditinjau Pihak Independen'
      }
    ]
  },
  {
    id: 'SITE-BLG-002',
    reportId: 'PK-2026-BLG2',
    name: 'Pemuteran',
    regency: 'Buleleng',
    district: 'Gerokgak',
    region: 'Bali',
    publicAreaName: 'Gerokgak, Buleleng · area disamarkan',
    privateCoordinates: { lat: -8.1456, lng: 114.6592 },
    method: 'Biorock Mineral Accretion Technology',
    initialCondition: 'Zona konservasi perintis di Bali Utara, tutupan awal sebelum restorasi 20%.',
    plantedAt: '2024-10-05',
    totalPlanted: 450,
    coralGenera: ['Acropora florida', 'Pavona frondifera'],
    currentSurvivalRate: 84.0,
    currentStatus: 'Dipulihkan',
    status: 'Dipulihkan',
    auditStatus: 'Ditinjau pihak lain',
    updatedAtLabel: 'Diperbarui 3 hari lalu',
    imageUrl: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821343/satu-paragraf-josjis/progress-thriving.png',
    photos: {
      before: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821834/satu-paragraf-josjis/coral-bleaching.png',
      after: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821343/satu-paragraf-josjis/progress-thriving.png'
    },
    inspections: [
      {
        date: '2026-11-14',
        ageDays: 760,
        aliveCount: 378,
        deadCount: 42,
        lostCount: 30,
        survivalRate: 84.0,
        notes: 'Pertumbuhan tercepat di Bali berkat teknologi arus mikro konstan.',
        auditedBy: 'Sudah Ditinjau Pihak Independen'
      }
    ]
  },
  {
    id: 'SITE-BLG-003',
    reportId: 'PK-2026-BLG3',
    name: 'Tejakula',
    regency: 'Buleleng',
    district: 'Tejakula',
    region: 'Bali',
    publicAreaName: 'Tejakula, Buleleng · area disamarkan',
    privateCoordinates: { lat: -8.1255, lng: 115.3341 },
    method: 'Substrat Spider Logam & Nursery Patahan',
    initialCondition: 'Sedimentasi tanah perbukitan pasca hujan lebat musiman.',
    plantedAt: '2026-03-22',
    totalPlanted: 200,
    coralGenera: ['Porites cylindrica', 'Acropora millepora'],
    currentSurvivalRate: 58.0,
    currentStatus: 'Perawatan',
    status: 'Perawatan',
    auditStatus: 'Data tim pelaksana',
    updatedAtLabel: 'Diperbarui 3 hari lalu',
    imageUrl: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821342/satu-paragraf-josjis/progress-staghorn.png',
    photos: {
      before: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794893779/satu-paragraf-josjis/article-damaged.jpg',
      after: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821342/satu-paragraf-josjis/progress-staghorn.png'
    },
    inspections: [
      {
        date: '2026-11-14',
        ageDays: 230,
        aliveCount: 116,
        deadCount: 52,
        lostCount: 32,
        survivalRate: 58.0,
        notes: 'Diperlukan pemasangan jaring penahan sedimen di hulu aliran sungai.',
        auditedBy: 'Data Tim Pelaksana'
      }
    ]
  },

  // ==========================================
  // GRUP KARANGASEM
  // ==========================================
  {
    id: 'SITE-KRG-001',
    reportId: 'PK-2026-KRG1',
    name: 'Amed',
    regency: 'Karangasem',
    district: 'Abang',
    region: 'Bali',
    publicAreaName: 'Abang, Karangasem · area disamarkan',
    privateCoordinates: { lat: -8.3415, lng: 115.6542 },
    method: 'Pyramid Reef & Transplantasi Karang Acropora',
    initialCondition: 'Zona teluk berpasir hitam dengan tutupan karang historis 22% akibat aktivitas wisata penyelaman tak terkendali.',
    plantedAt: '2025-07-20',
    totalPlanted: 280,
    coralGenera: ['Acropora millepora', 'Pocillopora verrucosa', 'Echinopora lamellosa'],
    currentSurvivalRate: 76.0,
    currentStatus: 'Dipulihkan',
    status: 'Dipulihkan',
    auditStatus: 'Ditinjau pihak lain',
    updatedAtLabel: 'Diperbarui 3 hari lalu',
    imageUrl: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821343/satu-paragraf-josjis/progress-thriving.png',
    photos: {
      before: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821834/satu-paragraf-josjis/coral-bleaching.png',
      after: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821343/satu-paragraf-josjis/progress-thriving.png'
    },
    inspections: [
      {
        date: '2026-11-14',
        ageDays: 480,
        aliveCount: 213,
        deadCount: 42,
        lostCount: 25,
        survivalRate: 76.0,
        notes: 'Koloni stabil dan menjadi atraksi snorkeling berkelanjutan yang dikelola warga lokal.',
        auditedBy: 'Sudah Ditinjau Pihak Independen'
      }
    ]
  },
  {
    id: 'SITE-KRG-002',
    reportId: 'PK-2026-KRG2',
    name: 'Tulamben',
    regency: 'Karangasem',
    district: 'Kubu',
    region: 'Bali',
    publicAreaName: 'Kubu, Karangasem · area disamarkan',
    privateCoordinates: { lat: -8.2789, lng: 115.5925 },
    method: 'Artificial Reef Dome & Perekatan Fragmen Masif',
    initialCondition: 'Sekitar bangkai kapal USAT Liberty, substrat batuan vulkanik dengan abrasi arus musiman.',
    plantedAt: '2026-01-15',
    totalPlanted: 190,
    coralGenera: ['Acropora formosa', 'Montipora foliosa'],
    currentSurvivalRate: 72.0,
    currentStatus: 'Sedang Dipantau',
    status: 'Sedang Dipantau',
    auditStatus: 'Ditinjau pihak lain',
    updatedAtLabel: 'Diperbarui 3 hari lalu',
    imageUrl: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821342/satu-paragraf-josjis/progress-transplant.png',
    photos: {
      before: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794893779/satu-paragraf-josjis/article-damaged.jpg',
      after: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821342/satu-paragraf-josjis/progress-transplant.png'
    },
    inspections: [
      {
        date: '2026-11-14',
        ageDays: 300,
        aliveCount: 137,
        deadCount: 33,
        lostCount: 20,
        survivalRate: 72.0,
        notes: 'Struktur dome kokoh menahan ombak laut dalam.',
        auditedBy: 'Sudah Ditinjau Pihak Independen'
      }
    ]
  },
  {
    id: 'SITE-KRG-003',
    reportId: 'PK-2026-KRG3',
    name: 'Lipah',
    regency: 'Karangasem',
    district: 'Abang',
    region: 'Bali',
    publicAreaName: 'Abang, Karangasem · area disamarkan',
    privateCoordinates: { lat: -8.3585, lng: 115.6791 },
    method: 'Spider Web Logam & Meja Akropora Cabang',
    initialCondition: 'Zona teluk dangkal, terdampak gelombang pasang dan jangkar jukung nelayan lokal.',
    plantedAt: '2026-04-10',
    totalPlanted: 120,
    coralGenera: ['Acropora branching', 'Seriatopora hystrix'],
    currentSurvivalRate: 64.0,
    currentStatus: 'Perawatan',
    status: 'Perawatan',
    auditStatus: 'Data tim pelaksana',
    updatedAtLabel: 'Diperbarui 3 hari lalu',
    imageUrl: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821342/satu-paragraf-josjis/progress-staghorn.png',
    photos: {
      before: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821834/satu-paragraf-josjis/coral-bleaching.png',
      after: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821342/satu-paragraf-josjis/progress-staghorn.png'
    },
    inspections: [
      {
        date: '2026-11-14',
        ageDays: 215,
        aliveCount: 77,
        deadCount: 28,
        lostCount: 15,
        survivalRate: 64.0,
        notes: 'Perlu penggantian 5 fragmen yang terlepas karena arus pasang.',
        auditedBy: 'Data Tim Pelaksana'
      }
    ]
  }
]

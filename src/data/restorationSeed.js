export const INITIAL_RESTORATION = [
  {
    id: 'SITE-BALI-001',
    reportId: 'PK-2026-X89B',
    name: 'Zona Pemulihan Nusa Penida - Teluk Karang',
    region: 'Bali',
    publicAreaName: 'Perairan Karang Nusa Penida', // Ditampilkan ke publik (koordinat disamarkan)
    privateCoordinates: { lat: -8.7214, lng: 115.5441 },
    method: 'Struktur Spider Web Logam & Biorock',
    initialCondition: 'Kerusakan akibat hempasan jangkar kapal wisata, tutupan karang hidup awal 18%',
    plantedAt: '2026-03-15',
    totalPlanted: 450,
    coralGenera: ['Acropora formosa', 'Pocillopora verrucosa'],
    currentSurvivalRate: 81.1,
    currentStatus: 'Tumbuh Baik', // Tumbuh Baik (>=70%) | Perlu Perhatian (40-69%) | Kritis (<40%)
    photos: {
      before: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794753742/main-sample.png',
      after: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794753742/main-sample.png'
    },
    inspections: [
      {
        date: '2026-06-15',
        ageDays: 90,
        aliveCount: 380,
        deadCount: 45,
        lostCount: 25,
        survivalRate: 84.4,
        notes: 'Pertumbuhan alga rutin dibersihkan, penempelan fragmen kuat pada substrat.',
        auditedBy: 'Data Tim Pelaksana'
      },
      {
        date: '2026-09-15',
        ageDays: 180,
        aliveCount: 365,
        deadCount: 55,
        lostCount: 30,
        survivalRate: 81.1,
        notes: 'Ikan karang mulai berdiam di substrat buatan, cabang mulai tumbuh ~3cm.',
        auditedBy: 'Sudah Ditinjau Pihak Independen'
      }
    ]
  },
  {
    id: 'SITE-BALI-002',
    reportId: 'PK-2026-M44D',
    name: 'Rehabilitasi Karang Sanur',
    region: 'Bali',
    publicAreaName: 'Perairan Sanur Sektor Selatan',
    privateCoordinates: { lat: -8.6912, lng: 115.2635 },
    method: 'Substrat Beton & Meja Transplantasi',
    initialCondition: 'Patahan karang bercampur sampah, tutupan awal 24%',
    plantedAt: '2026-05-10',
    totalPlanted: 300,
    coralGenera: ['Porites lutea', 'Acropora millepora'],
    currentSurvivalRate: 74.3,
    currentStatus: 'Tumbuh Baik',
    photos: {
      before: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794753742/main-sample.png',
      after: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794753742/main-sample.png'
    },
    inspections: [
      {
        date: '2026-08-10',
        ageDays: 90,
        aliveCount: 223,
        deadCount: 52,
        lostCount: 25,
        survivalRate: 74.3,
        notes: 'Beberapa fragmen terserang sedimentasi, telah dilakukan pembersihan manual.',
        auditedBy: 'Data Tim Pelaksana'
      }
    ]
  }
]

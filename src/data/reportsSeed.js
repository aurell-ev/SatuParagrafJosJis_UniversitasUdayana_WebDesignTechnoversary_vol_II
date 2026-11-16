export const INITIAL_REPORTS = [
  {
    id: 'PK-2026-X89B',
    reporterName: 'Wayan Sudira',
    reporterContact: '081234567890',
    isAnonymous: false,
    damageType: 'bleaching', // bleaching | anchor | trash | blast | sediment | other
    description: 'Ditemukan pemutihan karang cukup masif di kedalaman 5-7 meter akibat anomali suhu air laut.',
    locationName: 'Pantai Melasti Sektor Timur',
    region: 'Bali Selatan',
    coordinates: { lat: -8.8471, lng: 115.1582 },
    imageUrl: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794753742/main-sample.png',
    reportedAt: '2026-11-12T08:30:00Z',
    status: 'diverifikasi', // baru | diverifikasi | tidak_valid | duplikat | dipulihkan
    isPossibleDuplicate: false,
    duplicateOfId: null,
    verificationNotes: 'Dikonfirmasi tim lapangan, tutupan karang yang memutih mencapai ~35%.'
  },
  {
    id: 'PK-2026-A12C',
    reporterName: 'Anonim (Wisatawan)',
    reporterContact: '',
    isAnonymous: true,
    damageType: 'anchor',
    description: 'Bongkahan karang meja (Acropora) patah terhantam jangkar kapal sewaan.',
    locationName: 'Perairan Nusa Penida Barat',
    region: 'Nusa Penida, Bali',
    coordinates: { lat: -8.7214, lng: 115.5441 },
    imageUrl: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794753742/main-sample.png',
    reportedAt: '2026-11-14T11:15:00Z',
    status: 'baru',
    isPossibleDuplicate: false,
    duplicateOfId: null,
    verificationNotes: ''
  },
  {
    id: 'PK-2026-M44D',
    reporterName: 'Gede Artha',
    reporterContact: '081987654321',
    isAnonymous: false,
    damageType: 'trash',
    description: 'Jaring ikan bekas (ghost net) tersangkut dan menutupi koloni karang lunak.',
    locationName: 'Karang Sanur Zona Konservasi',
    region: 'Denpasar, Bali',
    coordinates: { lat: -8.6912, lng: 115.2635 },
    imageUrl: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794753742/main-sample.png',
    reportedAt: '2026-11-15T09:40:00Z',
    status: 'dipulihkan',
    isPossibleDuplicate: false,
    duplicateOfId: null,
    verificationNotes: 'Jaring telah diangkat oleh relawan penyelam, koloni dipantau pulih.'
  }
]

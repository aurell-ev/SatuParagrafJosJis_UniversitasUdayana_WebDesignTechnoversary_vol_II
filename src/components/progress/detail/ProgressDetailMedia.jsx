import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { LuLock } from 'react-icons/lu'

export function ProgressDetailMedia({ location }) {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)

  const coords = location?.privateCoordinates || { lat: -8.6753, lng: 115.2631 }
  const photoUrl = location?.photos?.after || location?.imageUrl || 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821343/satu-paragraf-josjis/progress-thriving.png'
  const inspectionBadge = location?.lastInspectionLabel || (location?.inspections?.length ? `Pemeriksaan ke-${location.inspections.length} · ${location.updatedAtLabel}` : 'Pemeriksaan Terakhir')

  // Inisialisasi Mini Leaflet Map dengan Zona ±500m
  useEffect(() => {
    if (!mapContainerRef.current) return

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        scrollWheelZoom: false,
        dragging: false,
        zoomControl: false,
        attributionControl: false,
        doubleClickZoom: false
      }).setView([coords.lat, coords.lng], 14)

      // Tile layer OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        subdomains: ['a', 'b', 'c']
      }).addTo(map)

      // Lingkaran Area Disamarkan ±500m (Figma node 1155:4050)
      L.circle([coords.lat, coords.lng], {
        radius: 500,
        color: '#0d9488', // teal-600
        weight: 2,
        dashArray: '6, 6',
        fillColor: '#0d9488',
        fillOpacity: 0.18
      }).addTo(map)

      // Marker Tengah Halus (Zona Disamarkan)
      const centerIcon = L.divIcon({
        html: `
          <div class="relative flex items-center justify-center">
            <div class="w-8 h-8 rounded-full bg-teal-500/20 animate-ping absolute"></div>
            <div class="w-4 h-4 rounded-full bg-teal-600 border-2 border-white shadow-md relative z-10"></div>
          </div>
        `,
        className: 'disguised-center-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      })

      L.marker([coords.lat, coords.lng], { icon: centerIcon }).addTo(map)

      mapInstanceRef.current = map
    } else {
      mapInstanceRef.current.setView([coords.lat, coords.lng], 14)
    }
  }, [coords.lat, coords.lng])

  return (
    <div 
      className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full"
      data-node-id="1155:4051"
    >
      {/* Sisi Kiri: Foto Utama (784px / col-span-8) */}
      <div className="lg:col-span-8 relative h-[320px] sm:h-[380px] lg:h-[400px] rounded-3xl overflow-hidden bg-slate-900 shadow-xs border border-slate-200">
        <img
          src={photoUrl}
          alt={`Kondisi terumbu karang ${location?.name || 'lokasi'}`}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />

        {/* Gradient Overlay Lembut di Bawah & Atas */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20 pointer-events-none" />

        {/* Badge Tanggal Pemeriksaan di Pojok Kiri Atas */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900/80 text-white backdrop-blur-md border border-white/20 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{inspectionBadge}</span>
          </span>
        </div>

        {/* Caption Sederhana di Pojok Kiri Bawah */}
        <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
          <p className="text-xs sm:text-sm font-medium text-slate-200 drop-shadow-sm">
            {location?.initialCondition || 'Dokumentasi pemantauan kesehatan karang berkala.'}
          </p>
        </div>
      </div>

      {/* Sisi Kanan: Peta Area Disamarkan + Catatan (392px / col-span-4) */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {/* Peta Mini Area */}
        <div className="relative h-[240px] sm:h-[260px] rounded-3xl overflow-hidden border border-slate-200 shadow-xs bg-slate-100">
          <div ref={mapContainerRef} className="w-full h-full z-0" />
          
          {/* Label Floating Area */}
          <div className="absolute top-3 left-3 z-[400] bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-slate-700 shadow-xs border border-slate-200/80">
            Zona Restorasi ±500m
          </div>
        </div>

        {/* Kotak Catatan Peta Kerahasiaan Koordinat */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-start gap-3 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0 text-teal-700">
            <LuLock className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-ink-900 leading-[1.3]">
              Lokasi disamarkan
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-[1.5]">
              Lingkaran menunjukkan area ±500 m. Titik tanam persis hanya diketahui tim daerah demi mencegah eksploitasi karang muda.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { LuInfo, LuMaximize2 } from 'react-icons/lu'

// Fix default Leaflet icon paths in bundler environments
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

export function BaliLeafletMap({
  regions = [],
  locations = [],
  selectedRegion = null,
  onSelectRegion
}) {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const regionMarkersRef = useRef([])
  const siteMarkersRef = useRef([])
  const regionMarkerMapRef = useRef({})
  const boundsRef = useRef(null)

  // 1. Inisialisasi Peta & Layer
  useEffect(() => {
    if (!mapContainerRef.current) return

    if (!mapInstanceRef.current) {
      // Bounds pulau Bali yang mencakup seluruh Bali Utara (Pemuteran/Tejakula), Timur (Amed), Selatan (Serangan/Nusa Penida)
      const baliBounds = L.latLngBounds([
        [-8.88, 114.45], // Barat Daya
        [-8.05, 115.78]  // Timur Laut
      ])
      boundsRef.current = baliBounds

      const map = L.map(mapContainerRef.current, {
        scrollWheelZoom: false,
        attributionControl: false,
        zoomControl: false,
        maxBounds: [
          [-9.4, 114.1],
          [-7.6, 116.2]
        ]
      })

      // Auto-fit awal dengan padding lega
      map.fitBounds(baliBounds, { padding: [35, 35], maxZoom: 10 })

      // Tile layer resmi OpenStreetMap (Gratis & Bebas Watermark)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        subdomains: ['a', 'b', 'c']
      }).addTo(map)

      // Zoom control di pojok kanan bawah
      L.control.zoom({ position: 'bottomright' }).addTo(map)

      mapInstanceRef.current = map
    }
  }, [])

  // 2. Render Markers: Penanda Daerah (Clusters) + Titik Lokasi Konservasi Individual
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    // Bersihkan marker lama
    regionMarkersRef.current.forEach((m) => m.remove())
    regionMarkersRef.current = []
    regionMarkerMapRef.current = {}

    siteMarkersRef.current.forEach((m) => m.remove())
    siteMarkersRef.current = []

    // --- A. Render Titik-Titik Lokasi Pemulihan Individual ---
    locations.forEach((loc) => {
      const coords = loc.privateCoordinates || loc.coordinates
      if (!coords || typeof coords.lat !== 'number' || typeof coords.lng !== 'number') return

      const isRegionActive = !selectedRegion || selectedRegion.toLowerCase() === (loc.regency || '').toLowerCase()
      const isAudited = loc.auditStatus === 'Ditinjau pihak lain'

      // Tentukan warna titik berdasarkan status
      let dotColor = '#0d9488' // teal-600
      let dotBorder = '#ffffff'
      if (loc.status === 'Dipulihkan') {
        dotColor = '#059669' // emerald-600
      } else if (loc.status === 'Perawatan') {
        dotColor = '#d97706' // amber-600
      } else if (loc.status === 'Penanaman') {
        dotColor = '#0284c7' // sky-600
      }

      const siteMarkerHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group transition-transform duration-200 ${
          isRegionActive ? 'opacity-100 scale-100 hover:scale-125' : 'opacity-35 scale-90'
        }" style="width: 20px; height: 20px;">
          ${
            isRegionActive && selectedRegion
              ? `<div class="absolute -inset-1 rounded-full animate-ping opacity-40 pointer-events-none" style="background-color: ${dotColor};"></div>`
              : ''
          }
          <div class="w-3.5 h-3.5 rounded-full shadow-md flex items-center justify-center transition-all duration-150" 
               style="background-color: ${dotColor}; border: 2px solid ${dotBorder};">
            <div class="w-1 h-1 rounded-full bg-white opacity-80"></div>
          </div>
        </div>
      `

      const siteIcon = L.divIcon({
        html: siteMarkerHtml,
        className: 'custom-site-dot-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      })

      const siteMarker = L.marker([coords.lat, coords.lng], { icon: siteIcon, zIndexOffset: 200 }).addTo(map)

      // Popup informatif detail titik lokasi
      const sitePopupContent = `
        <div style="font-family: inherit; padding: 4px; min-width: 200px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 4px;">
            <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 2px 6px; border-radius: 9999px; background-color: #f0fdfa; color: #0d9488; border: 1px solid #ccfbf1;">
              ${loc.status || 'Pemulihan'}
            </span>
            <span style="font-size: 10px; color: #64748b;">${loc.district || loc.regency}</span>
          </div>
          <h4 style="font-weight: 800; font-size: 14px; margin: 0 0 2px 0; color: #0f172a;">${loc.name}</h4>
          <p style="font-size: 11px; color: #475569; margin: 0 0 8px 0;">${loc.publicAreaName || loc.regency}</p>
          <div style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: #1e293b; background: #f8fafc; padding: 6px 8px; border-radius: 6px; border: 1px solid #e2e8f0;">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #64748b;">Persen Hidup:</span>
              <span style="font-weight: 700; color: #047857;">${loc.currentSurvivalRate ? `${loc.currentSurvivalRate}%` : 'Tahap Awal'}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #64748b;">Total Ditanam:</span>
              <span style="font-weight: 600;">${loc.totalPlanted ? `${loc.totalPlanted} fragmen` : '-'}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 10px; color: #64748b; margin-top: 2px;">
              <span>Audit:</span>
              <span style="font-weight: 600; color: ${isAudited ? '#047857' : '#0284c7'};">${loc.auditStatus || 'Tim Pelaksana'}</span>
            </div>
          </div>
          <a href="/perkembangan/${loc.id}" style="display: block; text-align: center; margin-top: 8px; padding: 5px 8px; border-radius: 6px; background-color: #0d9488; color: #ffffff; text-decoration: none; font-size: 11px; font-weight: 700; transition: background 0.15s;">
            Lihat Detail Perkembangan &rarr;
          </a>
        </div>
      `
      siteMarker.bindPopup(sitePopupContent)

      siteMarker.on('click', () => {
        if (onSelectRegion && loc.regency) {
          onSelectRegion(loc.regency)
        }
      })

      siteMarkersRef.current.push(siteMarker)
    })

    // --- B. Render 4 Penanda Kluster Daerah (Sesuai Desain Figma node 1199:18116) ---
    regions.forEach((reg) => {
      const isSelected = selectedRegion && selectedRegion.toLowerCase() === reg.name.toLowerCase()

      const markerHtml = `
        <div class="relative flex flex-col items-center cursor-pointer group">
          <!-- Halo Sesuai Figma (size 120px, bg-#059669 dengan opacity) -->
          <div class="absolute -top-[45px] -left-[45px] w-[120px] h-[120px] rounded-full bg-emerald-600/20 pointer-events-none transition-all duration-300 ${
            isSelected ? 'animate-pulse bg-emerald-600/40 scale-110' : 'group-hover:bg-emerald-600/30'
          }"></div>
          
          <!-- Pill Badge: bg-emerald-600 border-2 border-white rounded-full py-1 pl-1 pr-3 flex items-center gap-2 shadow-md -->
          <div class="relative flex items-center gap-2 bg-emerald-600 text-white border-2 border-white rounded-full py-1 pl-1 pr-3 shadow-md transition-transform duration-200 ${
            isSelected ? 'ring-2 ring-emerald-300 scale-105 shadow-lg' : 'hover:scale-105'
          }">
            <div class="w-6 h-6 rounded-full bg-white text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
              ${reg.totalLocations}
            </div>
            <span class="font-semibold text-xs whitespace-nowrap text-white tracking-tight">
              ${reg.name}
            </span>
          </div>
        </div>
      `

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-region-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      })

      const marker = L.marker(reg.center, { icon: customIcon, zIndexOffset: 500 }).addTo(map)

      // Popup informatif daerah
      const popupContent = `
        <div style="font-family: inherit; padding: 4px; min-width: 175px;">
          <h4 style="font-weight: 800; font-size: 14px; margin-bottom: 2px; color: #0f172a;">${reg.name}</h4>
          <p style="font-size: 11px; color: #475569; margin-bottom: 6px;">${reg.description || `${reg.totalLocations} lokasi pemulihan`}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; font-weight: 600; color: #047857; background: #ecfdf5; padding: 5px 8px; border-radius: 6px;">
            <span>Kelangsungan:</span>
            <span style="font-weight: 800;">${reg.survivalRate}%</span>
          </div>
        </div>
      `
      marker.bindPopup(popupContent)

      marker.on('click', () => {
        if (onSelectRegion) {
          onSelectRegion(isSelected ? null : reg.name)
        }
      })

      regionMarkersRef.current.push(marker)
      regionMarkerMapRef.current[reg.name.toLowerCase()] = marker
    })
  }, [regions, locations, selectedRegion, onSelectRegion])

  // 3. Pan & Smooth Zoom saat selectedRegion berubah
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    if (selectedRegion) {
      const regKey = selectedRegion.toLowerCase()
      const targetRegion = regions.find((r) => r.name.toLowerCase() === regKey)
      const targetMarker = regionMarkerMapRef.current[regKey]

      if (targetRegion) {
        map.flyTo(targetRegion.center, 11, {
          duration: 1.2,
          easeLinearity: 0.25
        })

        if (targetMarker) {
          setTimeout(() => {
            targetMarker.openPopup()
          }, 700)
        }
      }
    } else if (boundsRef.current) {
      map.closePopup()
      map.flyToBounds(boundsRef.current, {
        padding: [35, 35],
        duration: 1.2
      })
    }
  }, [selectedRegion, regions])

  // 4. Invalidate size saat resize & initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize()
    }, 200)

    const handleResize = () => {
      mapInstanceRef.current?.invalidateSize()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="relative w-full h-full min-h-[440px] sm:min-h-[480px] lg:min-h-[512px] bg-slate-50">
      {/* Container Leaflet */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Tombol Floating Reset Kamera (Jika Daerah Terpilih) */}
      {selectedRegion && (
        <button
          type="button"
          onClick={() => onSelectRegion(null)}
          className="absolute top-3 right-3 z-[400] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 hover:bg-white text-ink-800 text-xs font-semibold shadow-md border border-slate-200 backdrop-blur-xs transition-transform active:scale-95 cursor-pointer"
          title="Kembali ke tampilan seluruh Bali"
        >
          <LuMaximize2 className="h-3.5 w-3.5 text-teal-600" />
          <span>Lihat Seluruh Bali</span>
        </button>
      )}

      {/* Keterangan Peta (Figma node 1199:18135: Info + Keterangan) */}
      <div className="absolute bottom-3 left-3 z-[400] flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white shadow-sm border border-slate-200/80 text-slate-600 text-xs font-normal pointer-events-none">
        <LuInfo className="h-4 w-4 text-slate-500 shrink-0" />
        <span>Penanda menunjukkan daerah, bukan titik tanam.</span>
      </div>

      {/* Atribusi (Figma node 1199:18138) */}
      <div className="absolute bottom-3 right-3 z-[400] hidden sm:block pointer-events-none">
        <div className="px-2 py-0.5 rounded bg-white text-xs text-slate-600 font-normal">
          © OpenStreetMap contributors
        </div>
      </div>
    </div>
  )
}

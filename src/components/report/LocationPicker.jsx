import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { LuLocate, LuMapPin, LuSearch, LuTriangleAlert } from 'react-icons/lu'

export function LocationPicker({
  coordinates,
  locationName,
  onCoordinatesChange,
  onLocationNameChange,
  isPossibleDuplicate,
  nearbyCount
}) {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markerRef = useRef(null)
  const circleRef = useRef(null)

  useEffect(() => {
    if (!mapContainerRef.current) return
    if (mapInstanceRef.current) return

    // Custom coral pin icon with pulse halo
    const customIcon = L.divIcon({
      className: 'custom-coral-pin',
      html: `
        <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; inset: -4px; border-radius: 9999px; background-color: rgba(232, 93, 63, 0.25); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="width: 28px; height: 28px; border-radius: 9999px; background-color: #e85d3f; border: 2.5px solid #ffffff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; color: white;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    })

    const map = L.map(mapContainerRef.current, {
      center: [coordinates.lat, coordinates.lng],
      zoom: 14,
      scrollWheelZoom: false
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    const marker = L.marker([coordinates.lat, coordinates.lng], {
      icon: customIcon,
      draggable: true
    }).addTo(map)

    // Radius circle showing duplicate detection zone (100m)
    const circle = L.circle([coordinates.lat, coordinates.lng], {
      radius: 100,
      color: '#e85d3f',
      fillColor: '#e85d3f',
      fillOpacity: 0.15,
      weight: 1.5,
      dashArray: '4, 4'
    }).addTo(map)

    marker.on('dragend', () => {
      const pos = marker.getLatLng()
      const newCoords = {
        lat: Math.round(pos.lat * 10000) / 10000,
        lng: Math.round(pos.lng * 10000) / 10000
      }
      circle.setLatLng(pos)
      onCoordinatesChange(newCoords)
    })

    map.on('click', (e) => {
      const { lat, lng } = e.latlng
      const newCoords = {
        lat: Math.round(lat * 10000) / 10000,
        lng: Math.round(lng * 10000) / 10000
      }
      marker.setLatLng([lat, lng])
      circle.setLatLng([lat, lng])
      onCoordinatesChange(newCoords)
    })

    mapInstanceRef.current = map
    markerRef.current = marker
    circleRef.current = circle

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // Sync marker position when coordinates change from outside
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current && circleRef.current) {
      const currentPos = markerRef.current.getLatLng()
      if (
        Math.abs(currentPos.lat - coordinates.lat) > 0.0001 ||
        Math.abs(currentPos.lng - coordinates.lng) > 0.0001
      ) {
        markerRef.current.setLatLng([coordinates.lat, coordinates.lng])
        circleRef.current.setLatLng([coordinates.lat, coordinates.lng])
        mapInstanceRef.current.panTo([coordinates.lat, coordinates.lng])
      }
    }
  }, [coordinates])

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newCoords = {
            lat: Math.round(pos.coords.latitude * 10000) / 10000,
            lng: Math.round(pos.coords.longitude * 10000) / 10000
          }
          onCoordinatesChange(newCoords)
          if (!locationName) {
            onLocationNameChange('Lokasi Saat Ini')
          }
        },
        () => {
          // Fallback location e.g. Sanur Kaja perairan
          onCoordinatesChange({ lat: -8.6795, lng: 115.2652 })
        }
      )
    }
  }

  return (
    <div className="space-y-4">
      {/* Map Viewer Container with Overlay Button */}
      <div className="relative overflow-hidden rounded-2xl border border-ink-200/90 shadow-2xs">
        <div ref={mapContainerRef} className="h-64 sm:h-72 w-full z-0 bg-slate-100" />

        {/* Floating Gunakan Lokasi Saya Button */}
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-xl bg-white/95 px-3 py-1.5 text-xs font-semibold text-ink-800 shadow-sm backdrop-blur-xs hover:bg-white hover:text-teal-base transition-colors"
        >
          <LuLocate className="h-4 w-4 text-teal-base" />
          <span>Gunakan lokasi saya</span>
        </button>

        {/* Small Privacy helper in map */}
        <div className="absolute bottom-2 left-2 z-10 rounded-md bg-white/90 px-2 py-0.5 text-[10px] text-ink-600 backdrop-blur-xs">
          Klik peta atau geser pin untuk memindahkan titik
        </div>
      </div>

      {/* Row: Titik Koordinat & Nama Tempat */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="coordinatesDisplay" className="block text-xs font-semibold text-ink-700 mb-1.5">
            Titik lokasi <span className="text-coral-base">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-ink-400">
              <LuMapPin className="h-4 w-4 text-coral-base" />
            </div>
            <input
              type="text"
              id="coordinatesDisplay"
              readOnly
              value={`${coordinates.lat}, ${coordinates.lng}`}
              className="w-full rounded-xl border border-ink-200 bg-ink-50/60 pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-mono text-ink-800 focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label htmlFor="locationName" className="block text-xs font-semibold text-ink-700 mb-1.5">
            Nama tempat (opsional)
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-ink-400">
              <LuSearch className="h-4 w-4 text-ink-400" />
            </div>
            <input
              type="text"
              id="locationName"
              value={locationName}
              onChange={(e) => onLocationNameChange(e.target.value)}
              placeholder="Cth: Depan Pantai Sanur, Dekat dermaga"
              className="w-full rounded-xl border border-ink-200 bg-white pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-ink-900 placeholder:text-ink-400 focus:border-teal-base focus:outline-hidden focus:ring-2 focus:ring-teal-base/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Kemungkinan Duplikasi Banner (<100m) */}
      {isPossibleDuplicate && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 text-xs text-amber-900 flex items-start gap-2.5 animate-in fade-in duration-200">
          <LuTriangleAlert className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold text-amber-900">Kemungkinan duplikasi</p>
            <p className="text-amber-800 leading-relaxed text-[11px] sm:text-xs">
              Ada {nearbyCount || 1} laporan yang mirip dalam radius &lt;100 m pada 30 hari terakhir. Kamu tetap bisa mengirim, dan tim daerah akan memandunya jika duplikat.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

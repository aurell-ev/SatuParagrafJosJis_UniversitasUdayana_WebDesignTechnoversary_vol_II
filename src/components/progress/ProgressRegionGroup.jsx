import { ProgressLocationCard } from './ProgressLocationCard'
import { LuArrowRight, LuChevronDown } from 'react-icons/lu'
import { useState } from 'react'

export function ProgressRegionGroup({ 
  locations = [], 
  selectedRegion = null,
  onSelectRegion
}) {
  const [showAllRegions, setShowAllRegions] = useState(false)

  // Kelompokkan lokasi berdasarkan regency
  const groupedLocations = locations.reduce((acc, loc) => {
    const reg = loc.regency || 'Lainnya'
    if (!acc[reg]) {
      acc[reg] = []
    }
    acc[reg].push(loc)
    return acc
  }, {})

  // Daftar daerah terurut sesuai urutan prioritas Figma (Denpasar, Klungkung, Buleleng, Karangasem)
  const priorityOrder = ['Denpasar', 'Klungkung', 'Buleleng', 'Karangasem']
  const sortedRegencies = Object.keys(groupedLocations).sort((a, b) => {
    const idxA = priorityOrder.indexOf(a)
    const idxB = priorityOrder.indexOf(b)
    if (idxA !== -1 && idxB !== -1) return idxA - idxB
    if (idxA !== -1) return -1
    if (idxB !== -1) return 1
    return a.localeCompare(b)
  })

  // Filter jika ada selectedRegion dari peta atau ringkasan
  const displayedRegencies = selectedRegion
    ? sortedRegencies.filter(r => r.toLowerCase() === selectedRegion.toLowerCase())
    : sortedRegencies

  if (locations.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <div className="bg-white rounded-2xl p-8 border border-slate-200 max-w-md mx-auto shadow-xs">
          <p className="text-base font-semibold text-ink-900">
            Tidak ada lokasi yang cocok
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Coba ubah filter status atau kata kunci pencarian area/desa.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-12 w-full">
      {displayedRegencies.map((regency) => {
        const items = groupedLocations[regency]
        return (
          <div key={regency} className="flex flex-col gap-5 items-start w-full">
            {/* Header Grup Daerah Sesuai Figma node 1155:3512 */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-extrabold text-teal-base leading-[1.5]">
                  {regency}
                </h3>
                {/* Badge X lokasi (Figma node 1155:3483) */}
                <div className="bg-slate-100 px-2.5 py-1 rounded-full text-xs font-semibold text-slate-600">
                  {items.length} lokasi
                </div>
              </div>

              {/* Link Lihat semua di [Daerah] (Figma node 1155:3491) */}
              <button
                type="button"
                onClick={() => onSelectRegion ? onSelectRegion(regency) : null}
                className="text-teal-base text-sm font-semibold flex items-center gap-2 hover:underline"
              >
                <span>Lihat semua di {regency}</span>
                <LuArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Grid 3 Kartu (Figma node 1155:3513) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {items.map((loc) => (
                <ProgressLocationCard key={loc.id} location={loc} />
              ))}
            </div>
          </div>
        )
      })}

      {/* Tombol Tampilkan daerah lain (Figma node 1155:3815: w: 212px, h: 47px) */}
      {!selectedRegion && sortedRegencies.length > 2 && (
        <div className="pt-2 flex justify-center w-full">
          <button
            type="button"
            onClick={() => setShowAllRegions(!showAllRegions)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 bg-white text-sm font-semibold text-teal-base hover:bg-slate-50 transition-colors shadow-xs"
          >
            <span>{showAllRegions ? 'Sembunyikan daerah lain' : 'Tampilkan daerah lain'}</span>
            <LuChevronDown className={`h-4 w-4 transition-transform duration-200 ${showAllRegions ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}
    </div>
  )
}

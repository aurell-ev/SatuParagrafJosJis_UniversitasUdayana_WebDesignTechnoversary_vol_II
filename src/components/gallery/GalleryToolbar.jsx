import { CustomSelect } from '../common/CustomSelect'

export function GalleryToolbar({
  selectedDaerah,
  onSelectDaerah,
  selectedSort,
  onSelectSort,
  daerahList = ['Semua daerah', 'Denpasar', 'Klungkung', 'Buleleng', 'Karangasem']
}) {
  const sortOptions = [
    { value: 'terbaru', label: 'Urutkan: Terbaru' },
    { value: 'terlama', label: 'Urutkan: Terlama' }
  ]

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
      {/* 1. Chips Filter Daerah */}
      <div className="flex flex-wrap items-center gap-2">
        {daerahList.map((daerah) => {
          const isActive =
            selectedDaerah.toLowerCase() === daerah.toLowerCase()
          return (
            <button
              key={daerah}
              type="button"
              onClick={() => onSelectDaerah(daerah)}
              className={`rounded-full px-4 py-2 text-sm transition-colors duration-150 cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base ${
                isActive
                  ? 'bg-teal-100 border border-teal-200 font-semibold text-teal-base'
                  : 'bg-surface-card border border-ink-200 font-medium text-ink-600 hover:border-teal-200 hover:text-teal-base'
              }`}
            >
              {daerah}
            </button>
          )
        })}
      </div>

      {/* 2. Dropdown Urutkan */}
      <div className="w-full sm:w-[220px]">
        <CustomSelect
          value={selectedSort}
          onChange={(e) => onSelectSort(e.target.value)}
          options={sortOptions}
          aria-label="Urutkan galeri"
        />
      </div>
    </div>
  )
}

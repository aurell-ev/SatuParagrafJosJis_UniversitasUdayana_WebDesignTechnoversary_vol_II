import { useState, useRef, useEffect } from 'react'
import { LuChevronDown } from 'react-icons/lu'

export function GalleryToolbar({
  selectedDaerah,
  onSelectDaerah,
  selectedSort,
  onSelectSort,
  daerahList = ['Semua daerah', 'Denpasar', 'Klungkung', 'Buleleng', 'Karangasem']
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const sortOptions = [
    { value: 'terbaru', label: 'Urutkan: Terbaru' },
    { value: 'terlama', label: 'Urutkan: Terlama' }
  ]

  // Tutup dropdown saat klik di luar komponen
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
      <div className="relative w-full sm:w-[220px]" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-xl border border-ink-200 bg-surface-card px-4 py-3 text-sm text-ink-900 shadow-2xs hover:border-teal-300 transition-colors cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base"
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
        >
          <span className="font-normal">
            {sortOptions.find((o) => o.value === selectedSort)?.label ||
              'Urutkan: Terbaru'}
          </span>
          <LuChevronDown
            className={`h-5 w-5 text-ink-600 transition-transform duration-200 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu Panel */}
        {isDropdownOpen && (
          <div className="absolute right-0 z-30 mt-2 w-full rounded-xl border border-ink-200 bg-surface-card py-1.5 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
            {sortOptions.map((opt) => {
              const isSelected = selectedSort === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onSelectSort(opt.value)
                    setIsDropdownOpen(false)
                  }}
                  className={`flex w-full items-center px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50 font-semibold text-teal-base'
                      : 'text-ink-700 hover:bg-ink-50'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

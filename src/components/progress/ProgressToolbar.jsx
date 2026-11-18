import { LuSearch, LuX } from 'react-icons/lu'
import { STATUS_FILTERS } from '../../data/restorationSeed'

export function ProgressToolbar({
  activeStatus = 'all',
  onStatusChange,
  searchQuery = '',
  onSearchChange
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full" data-node-id="1155:3360">
      {/* Status Filter Chips (Figma node 1155:3359) */}
      <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
        {STATUS_FILTERS.map((item) => {
          const isActive = activeStatus === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onStatusChange(item.id)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors duration-150 border ${
                isActive
                  ? 'bg-teal-100 border-teal-200 text-teal-base font-semibold'
                  : 'bg-white border-slate-200 text-slate-600 font-medium hover:border-slate-300'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      {/* Cari Box (Figma node 1155:3333: w: 360px) */}
      <div className="relative w-full md:w-[360px] shrink-0">
        <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-3 transition-colors focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100">
          <LuSearch className="h-5 w-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari area atau desa…"
            className="w-full bg-transparent text-base text-ink-900 placeholder:text-slate-400 focus:outline-hidden"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="text-slate-400 hover:text-slate-600"
              aria-label="Bersihkan pencarian"
            >
              <LuX className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

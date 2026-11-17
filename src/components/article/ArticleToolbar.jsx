import { LuSearch } from 'react-icons/lu'

const ARTICLE_CATEGORIES = [
  'Semua',
  'Jenis Kerusakan',
  'Cara Melapor',
  'Restorasi',
  'Pemantauan'
]

/**
 * Toolbar Kategori & Pencarian Artikel
 * Sesuai desain Figma node 1152:2298 (Toolbar)
 * Terletak tepat di atas Artikel Unggulan (Figma node 1152:2356)
 */
export function ArticleToolbar({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  categories = ARTICLE_CATEGORIES
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
      {/* Kategori Chips (Figma node 1152:2297) */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((category) => {
          const isActive = selectedCategory === category
          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-150 outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base cursor-pointer ${
                isActive
                  ? 'bg-teal-100 text-teal-900 shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {category}
            </button>
          )
        })}
      </div>

      {/* Input Pencarian (Figma node 1152:2271) */}
      <div className="relative w-full md:w-[320px] lg:w-[360px] shrink-0">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
          <LuSearch className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari artikel…"
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-hidden focus:border-teal-base focus:ring-2 focus:ring-teal-100 shadow-2xs"
        />
      </div>
    </div>
  )
}

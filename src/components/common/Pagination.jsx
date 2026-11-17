import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'

/**
 * Komponen Pagination Reusable
 * Sesuai desain Figma node 1152:2507 (Paginasi)
 * - Tombol-tombol bulat sempurna (w-10 h-10 rounded-full)
 * - Jarak antar tombol 8px (gap-2)
 * - State aktif: bg-teal-base (rgb(15, 92, 110)) teks putih tanpa border
 * - State inaktif: bg-white border border-slate-200 teks slate-600
 */
export function Pagination({ currentPage = 1, totalPages = 8, onPageChange }) {
  // Hitung rentang halaman dengan elipsis sesuai layout Figma (1, 2, 3, …, 8)
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 3) {
      return [1, 2, 3, '…', totalPages]
    }

    if (currentPage >= totalPages - 2) {
      return [1, '…', totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, '…', currentPage, '…', totalPages]
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex items-center justify-center pt-8">
      <nav className="inline-flex items-center gap-2" aria-label="Navigasi Halaman">
        {/* Tombol Sebelumnya (Hal prev) */}
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-2xs hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 transition-colors"
          aria-label="Halaman sebelumnya"
        >
          <LuArrowLeft className="h-4 w-4" />
        </button>

        {/* Daftar Nomor Halaman */}
        {pageNumbers.map((item, idx) => {
          if (item === '…') {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-500 shadow-2xs select-none"
              >
                …
              </span>
            )
          }

          const pageNum = Number(item)
          const isActive = currentPage === pageNum

          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange && onPageChange(pageNum)}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold shadow-2xs transition-colors ${
                isActive
                  ? 'bg-teal-base text-white shadow-xs font-bold'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNum}
            </button>
          )
        })}

        {/* Tombol Selanjutnya (Hal next) */}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-2xs hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 transition-colors"
          aria-label="Halaman selanjutnya"
        >
          <LuArrowRight className="h-4 w-4" />
        </button>
      </nav>
    </div>
  )
}

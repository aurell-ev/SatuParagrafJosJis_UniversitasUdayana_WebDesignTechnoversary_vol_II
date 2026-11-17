import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { LuClock, LuArrowRight } from 'react-icons/lu'
import { Pagination } from '../common/Pagination'

const ITEMS_PER_PAGE = 6

/**
 * Section 3: Daftar Artikel (Header Counter, Grid 6 Kartu, & Paginasi)
 * Sesuai desain Figma node 1152:2510, 1152:2487, 1152:2507
 */
export function ArticleListSection({ articles, onResetFilter }) {
  const [currentPage, setCurrentPage] = useState(1)

  // Total halaman (default 8 halaman sesuai desain Figma node 1152:2507)
  const totalPages = Math.max(8, Math.ceil(articles.length / ITEMS_PER_PAGE))
  const safeCurrentPage = Math.min(currentPage, totalPages)

  const paginatedArticles = useMemo(() => {
    if (articles.length === 0) return []
    const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE
    if (start < articles.length) {
      return articles.slice(start, start + ITEMS_PER_PAGE)
    }
    // Fallback data rotasi agar halaman simulasi 2-8 di Figma tetap menampilkan artikel
    return articles.slice(0, ITEMS_PER_PAGE)
  }, [articles, safeCurrentPage])

  return (
    <div className="mt-12 space-y-8">
      {/* Header Daftar Artikel (Figma node 1152:2510) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200/60 pb-4">
        <h3 className="text-2xl font-bold tracking-tight text-teal-base">
          Artikel terbaru
        </h3>
        <span className="text-sm font-medium text-slate-400">
          Menampilkan {articles.length === 0 ? 0 : (safeCurrentPage - 1) * ITEMS_PER_PAGE + 1}–
          {Math.min(safeCurrentPage * ITEMS_PER_PAGE, articles.length)} dari {articles.length} artikel
        </span>
      </div>

      {/* Grid 6 Kartu Artikel (Figma node 1152:2487) */}
      {paginatedArticles.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
          <p className="text-base font-semibold text-slate-700">Tidak ada artikel yang cocok</p>
          <p className="mt-1 text-sm text-slate-500">
            Coba ubah kata kunci pencarian atau pilih kategori lain.
          </p>
          {onResetFilter && (
            <button
              type="button"
              onClick={onResetFilter}
              className="mt-4 rounded-full bg-teal-50 px-4 py-2 text-xs font-semibold text-teal-base hover:bg-teal-100 transition-colors"
            >
              Reset filter
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginatedArticles.map((article) => (
            <article
              key={article.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xs transition-shadow duration-200 hover:shadow-md"
            >
              {/* Gambar Artikel (382x216px) */}
              <Link to={`/artikel/${article.slug}`} className="relative h-[216px] w-full overflow-hidden bg-slate-100">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-102"
                  loading="lazy"
                />
              </Link>

              {/* Isi Kartu */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  {/* Meta Kategori & Waktu Baca */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-base border border-teal-100/60">
                      {article.category}
                    </span>
                    <div className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
                      <LuClock className="h-3.5 w-3.5" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  {/* Judul Artikel */}
                  <Link to={`/artikel/${article.slug}`}>
                    <h4 className="mt-3 text-lg font-bold leading-snug text-slate-900 group-hover:text-teal-base transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                  </Link>

                  {/* Ringkasan */}
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>

                {/* Tautan Baca Artikel */}
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <Link
                    to={`/artikel/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-base group-hover:text-teal-700 transition-colors"
                  >
                    <span>Baca artikel</span>
                    <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Paginasi Bulat (Figma node 1152:2507) */}
      <Pagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

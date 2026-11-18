import {
  LuArrowRight,
  LuArrowUp,
  LuBadgeCheck,
  LuShieldCheck,
  LuSparkles
} from 'react-icons/lu'
import { GalleryCard } from './GalleryCard'

export function GalleryGrid({
  items,
  totalCount,
  visibleCount,
  onLoadMore,
  onShowLess,
  onOpenModal,
  onResetFilter
}) {
  const hasMore = visibleCount < items.length
  const canShowLess = !hasMore && visibleCount > 6 && items.length > 6

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Header Bagian: Judul & Legenda Sumber Audit */}
      <div
        id="semua-lokasi-section"
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between w-full scroll-mt-24"
      >
        <h2 className="text-2xl font-extrabold text-teal-base">
          Semua lokasi
        </h2>

        {/* Legenda */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-state-info-border bg-state-info-bg px-2.5 py-1 text-xs font-semibold text-state-info-text">
            <LuBadgeCheck className="h-3.5 w-3.5" />
            <span>Sudah ditinjau pihak lain</span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 px-2.5 py-1 text-xs font-semibold text-ink-600">
            <LuShieldCheck className="h-3.5 w-3.5 text-teal-base" />
            <span>Data tim pelaksana</span>
          </div>
        </div>
      </div>

      {/* 2. Daftar Grid Kartu Galeri */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-surface-card p-12 text-center">
          <LuSparkles className="h-10 w-10 text-teal-base mb-3 opacity-60" />
          <h3 className="text-lg font-bold text-ink-900">
            Tidak ada foto di daerah ini
          </h3>
          <p className="mt-1 text-sm text-ink-600 max-w-md">
            Belum ada dokumentasi pemulihan karang untuk daerah yang dipilih.
            Coba pilih daerah lain atau kembali ke semua daerah.
          </p>
          {onResetFilter && (
            <button
              type="button"
              onClick={onResetFilter}
              className="mt-4 rounded-full bg-teal-base px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-hover transition-colors cursor-pointer"
            >
              Tampilkan Semua Daerah
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, visibleCount).map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              onClick={onOpenModal}
            />
          ))}
        </div>
      )}

      {/* 3. Tombol Muat Lebih Banyak / Tampilkan Lebih Sedikit (Node 1153:2992) */}
      {items.length > 0 && (
        <div className="mt-4 flex flex-col items-center justify-center gap-3">
          {hasMore ? (
            <button
              type="button"
              onClick={onLoadMore}
              className="inline-flex items-center gap-2 rounded-full border border-secondary bg-surface-card px-6 py-3 text-sm font-semibold text-secondary hover:bg-teal-50 transition-colors cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base"
            >
              <span>Muat lebih banyak</span>
              <LuArrowRight className="h-4 w-4" />
            </button>
          ) : canShowLess ? (
            <button
              type="button"
              onClick={onShowLess}
              className="inline-flex items-center gap-2 rounded-full border border-secondary bg-surface-card px-6 py-3 text-sm font-semibold text-secondary hover:bg-teal-50 transition-colors cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base"
            >
              <span>Tampilkan lebih sedikit</span>
              <LuArrowUp className="h-4 w-4" />
            </button>
          ) : (
            <span className="rounded-full bg-ink-100 px-4 py-1.5 text-xs font-semibold text-ink-600">
              Semua lokasi di daerah ini telah ditampilkan
            </span>
          )}

          <p className="text-xs sm:text-sm text-ink-400">
            Menampilkan {Math.min(visibleCount, items.length)} dari {totalCount}{' '}
            lokasi
          </p>
        </div>
      )}
    </div>
  )
}

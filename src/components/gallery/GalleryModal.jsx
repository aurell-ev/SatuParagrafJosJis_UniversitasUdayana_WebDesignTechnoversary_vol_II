import { useEffect } from 'react'
import { LuX, LuShieldCheck, LuBadgeCheck } from 'react-icons/lu'
import { BeforeAfterSlider } from './BeforeAfterSlider'

export function GalleryModal({ item, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose && onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    // Cegah scroll body saat modal aktif
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  if (!item) return null

  const isIndependentAudited =
    item.auditedBy?.toLowerCase().includes('pihak lain') ||
    item.auditedBy?.toLowerCase().includes('independen')

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink-950/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-surface-card shadow-2xl border border-ink-200">
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-ink-200 px-6 py-4">
          <div>
            <h3 id="modal-title" className="text-lg font-bold text-ink-900">
              {item.title}
            </h3>
            <p className="text-xs text-ink-600">{item.method}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-100 text-ink-600 hover:bg-ink-200 hover:text-ink-900 transition-colors cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base"
            aria-label="Tutup modal"
          >
            <LuX className="h-5 w-5" />
          </button>
        </div>

        {/* Isi Modal: Slider & Cerita Pemulihan */}
        <div className="overflow-y-auto p-6 flex flex-col gap-5">
          {/* Slider Sebelum & Sesudah */}
          <BeforeAfterSlider
            beforeImage={item.beforePhoto.url}
            afterImage={item.afterPhoto.url}
            beforeLabel={item.beforePhoto.label}
            afterLabel={item.afterPhoto.label}
            aspectRatio="aspect-[16/10] sm:aspect-[16/9]"
          />

          {/* Cerita di Balik Pemulihan */}
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-teal-base">
              Dokumentasi & Cerita Pemulihan
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-ink-700">
              {item.story || item.description}
            </p>
          </div>

          {/* Footer Info: Sumber Audit & Tanggal */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink-200 pt-4">
            <div className="flex items-center gap-2">
              {isIndependentAudited ? (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-state-info-border bg-state-info-bg px-2.5 py-1 text-xs font-semibold text-state-info-text">
                  <LuBadgeCheck className="h-3.5 w-3.5" />
                  <span>{item.auditedBy}</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 px-2.5 py-1 text-xs font-semibold text-ink-600">
                  <LuShieldCheck className="h-3.5 w-3.5 text-teal-base" />
                  <span>{item.auditedBy}</span>
                </div>
              )}
            </div>

            <span className="text-xs text-ink-400">
              Kabupaten / Kota: {item.daerah}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

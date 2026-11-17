import { LuArrowRight, LuShieldCheck } from 'react-icons/lu'
import { BeforeAfterSlider } from './BeforeAfterSlider'

export function GalleryFeaturedCard({ item, onOpenModal }) {
  if (!item) return null

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-ink-200 bg-surface-card shadow-xs">
      <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
        {/* Sisi Kiri: Slider Sebelum & Sesudah */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <BeforeAfterSlider
            beforeImage={item.beforePhoto.url}
            afterImage={item.afterPhoto.url}
            beforeLabel={item.beforePhoto.label}
            afterLabel={item.afterPhoto.label}
            aspectRatio="aspect-[4/3] lg:aspect-[607/511]"
            className="w-full"
          />
        </div>

        {/* Sisi Kanan: Informasi & Metrik Unggulan */}
        <div className="lg:col-span-6 flex flex-col justify-center gap-5 p-6 sm:p-8 lg:p-9">
          {/* Badge Pembaruan Terbaru */}
          <div className="self-start rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-base">
            {item.badge || 'Pembaruan terbaru'}
          </div>

          {/* Judul Lokasi */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-base tracking-tight">
            {item.title}
          </h2>

          {/* Deskripsi */}
          <p className="text-sm sm:text-base leading-relaxed text-ink-600">
            {item.description}
          </p>

          {/* Ringkasan Angka (Fragmen & Kelangsungan Hidup) */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="flex flex-col gap-1 rounded-xl bg-ink-50 p-4 border border-ink-100">
              <span className="text-2xl font-extrabold text-ink-900">
                {item.totalPlanted}
              </span>
              <span className="text-xs text-ink-600">fragmen ditanam</span>
            </div>

            <div className="flex flex-col gap-1 rounded-xl bg-state-success-bg p-4 border border-state-success-border text-state-success-text">
              <span className="text-2xl font-extrabold">
                {item.survivalRate}%
              </span>
              <span className="text-xs">{item.ageInfo}</span>
            </div>
          </div>

          {/* Badge Audit Sumber Data */}
          <div className="flex items-center gap-1.5 self-start rounded-full bg-ink-100 px-2.5 py-1 text-xs font-semibold text-ink-600">
            <LuShieldCheck className="h-3.5 w-3.5 text-teal-base" />
            <span>{item.auditedBy}</span>
          </div>

          {/* Tombol Aksi: Lihat Perkembangan / Buka Modal */}
          <button
            type="button"
            onClick={() => onOpenModal && onOpenModal(item)}
            className="inline-flex items-center gap-2 self-start rounded-full bg-teal-light px-5 py-3 text-sm font-semibold text-secondary hover:bg-teal-100 transition-colors cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base"
          >
            <span>Lihat perkembangan</span>
            <LuArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

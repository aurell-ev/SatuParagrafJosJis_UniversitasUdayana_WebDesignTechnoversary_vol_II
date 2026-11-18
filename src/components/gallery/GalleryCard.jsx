import { LuShieldCheck, LuBadgeCheck } from 'react-icons/lu'

export function GalleryCard({ item, onClick }) {
  if (!item) return null

  const isIndependentAudited =
    item.auditedBy?.toLowerCase().includes('pihak lain') ||
    item.auditedBy?.toLowerCase().includes('independen')

  return (
    <article
      onClick={() => onClick && onClick(item)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-surface-card shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick && onClick(item)
        }
      }}
    >
      {/* 1. Baris Foto Split 50:50 (Tinggi ~176px) */}
      <div className="relative flex h-44 w-full gap-[2px] bg-ink-100 overflow-hidden">
        {/* Foto Sebelum */}
        <div className="relative flex-1 overflow-hidden">
          <img
            src={item.beforePhoto.url}
            alt={`Kondisi sebelum di ${item.title}`}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-3 left-3 z-10">
            <span className="inline-block rounded-full bg-ink-900/80 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur-xs">
              {item.beforePhoto.label}
            </span>
          </div>
        </div>

        {/* Foto Sesudah */}
        <div className="relative flex-1 overflow-hidden">
          <img
            src={item.afterPhoto.url}
            alt={`Kondisi sesudah di ${item.title}`}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-3 right-3 z-10">
            <span className="inline-block rounded-full bg-ink-900/80 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur-xs">
              {item.afterPhoto.label}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Isi Keterangan Kartu */}
      <div className="flex flex-col gap-2 p-5">
        <h3 className="text-base font-bold text-ink-900 group-hover:text-teal-base transition-colors">
          {item.title}
        </h3>

        <p className="text-sm text-ink-600 leading-snug">
          {item.method}
        </p>

        {/* Badge Sumber Audit */}
        <div className="mt-1 self-start">
          {isIndependentAudited ? (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-state-info-border bg-state-info-bg px-2.5 py-1 text-xs font-semibold text-state-info-text">
              <LuBadgeCheck className="h-3.5 w-3.5 text-state-info-text" />
              <span>Sudah ditinjau pihak lain</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 px-2.5 py-1 text-xs font-semibold text-ink-600">
              <LuShieldCheck className="h-3.5 w-3.5 text-teal-base" />
              <span>Data tim pelaksana</span>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

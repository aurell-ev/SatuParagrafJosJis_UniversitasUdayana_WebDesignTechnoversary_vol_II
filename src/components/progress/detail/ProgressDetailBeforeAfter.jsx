export function ProgressDetailBeforeAfter({ location }) {
  const beforeUrl = location?.photos?.before || 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821834/satu-paragraf-josjis/coral-bleaching.png'
  const afterUrl = location?.photos?.after || location?.imageUrl || 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821343/satu-paragraf-josjis/progress-thriving.png'
  const beforeLabel = location?.photos?.beforeLabel || 'Sebelum · kondisi awal rusak'
  const afterLabel = location?.photos?.afterLabel || 'Sesudah · pemulihan terkini'

  return (
    <div 
      className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 flex flex-col gap-5 shadow-2xs"
      data-node-id="1155:4294"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-bold text-ink-900 leading-snug">
          Foto sebelum & sesudah
        </h3>
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Dokumentasi titik pemulihan yang sama
        </span>
      </div>

      {/* Grid 2 Foto Berdampingan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Foto Sebelum */}
        <div className="relative h-[220px] sm:h-[250px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 group">
          <img
            src={beforeUrl}
            alt="Kondisi karang sebelum restorasi"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-rose-900/80 text-rose-100 backdrop-blur-xs border border-rose-300/30">
              {beforeLabel}
            </span>
          </div>
        </div>

        {/* Foto Sesudah */}
        <div className="relative h-[220px] sm:h-[250px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 group">
          <img
            src={afterUrl}
            alt="Kondisi karang sesudah restorasi"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-900/80 text-emerald-100 backdrop-blur-xs border border-emerald-300/30">
              {afterLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

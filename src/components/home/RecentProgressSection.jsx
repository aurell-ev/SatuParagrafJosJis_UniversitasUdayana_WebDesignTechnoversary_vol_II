import { Link } from 'react-router-dom'
import { LuArrowRight, LuMapPin, LuActivity, LuChartLine, LuClipboardCheck } from 'react-icons/lu'

/**
 * Section 6: Perkembangan Terbaru
 * Sesuai desain Figma node 1150:1936 (Perkembangan Terbaru)
 */
export function RecentProgressSection() {
  const sites = [
    {
      id: 'sanur-kaja',
      name: 'Sanur Kaja',
      status: 'Perawatan',
      statusIcon: LuActivity,
      statusVariant: 'teal',
      area: 'Denpasar Selatan, Bali · area disamarkan',
      planted: '420 fragmen',
      survival: 68,
      updatedAt: 'Diperbarui 3 hari lalu',
      image:
        'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821213/satu-paragraf-josjis/progress-thriving.png'
    },
    {
      id: 'ped',
      name: 'Ped',
      status: 'Sedang Dipantau',
      statusIcon: LuChartLine,
      statusVariant: 'sky',
      area: 'Nusa Penida, Klungkung · area disamarkan',
      planted: '310 fragmen',
      survival: 54,
      updatedAt: 'Diperbarui 3 hari lalu',
      image:
        'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821214/satu-paragraf-josjis/progress-staghorn.png'
    },
    {
      id: 'les',
      name: 'Les',
      status: 'Sedang Dipantau',
      statusIcon: LuChartLine,
      statusVariant: 'sky',
      area: 'Tejakula, Buleleng · area disamarkan',
      planted: '260 fragmen',
      survival: 81,
      updatedAt: 'Diperbarui 3 hari lalu',
      image:
        'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821215/satu-paragraf-josjis/progress-transplant.png'
    }
  ]

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Header Section (Align: Kiri) */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <span className="h-0.5 w-6 rounded-full bg-teal-base" />
              <span className="text-xs font-bold uppercase tracking-wider text-teal-base">
                PERKEMBANGAN TERBARU
              </span>
            </div>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-teal-base sm:text-4xl lg:text-[36px] lg:leading-[43.2px]">
              Lokasi yang baru diperiksa
            </h2>

            <p className="mt-2 text-base text-ink-600 sm:text-lg">
              Lokasi ditampilkan sampai tingkat area atau desa.
            </p>
          </div>

          {/* Tombol Lihat Semua Lokasi (Pill rounded-full px-5 py-3) */}
          <div className="shrink-0">
            <Link
              to="/perkembangan"
              className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-5 py-3 text-sm font-semibold text-teal-base hover:bg-teal-100/80 transition-colors shadow-2xs"
            >
              <span>Lihat semua lokasi</span>
              <LuArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Grid 3 Kartu Lokasi (384x436px, r=16) */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => {
            const StatusIcon = site.statusIcon
            return (
              <div
                key={site.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xs transition-shadow hover:shadow-md"
              >
                {/* Foto Lokasi & Badge Status */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={site.image}
                    alt={`Pemulihan karang di ${site.name}`}
                    className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold shadow-xs ${
                        site.statusVariant === 'teal'
                          ? 'bg-teal-50 text-teal-base border border-teal-200/60'
                          : 'bg-sky-50 text-sky-700 border border-sky-200/60'
                      }`}
                    >
                      <StatusIcon className="h-3.5 w-3.5" />
                      {site.status}
                    </span>
                  </div>
                </div>

                {/* Konten Kartu */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="text-xl font-bold text-ink-900">
                      {site.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-ink-600">
                      <LuMapPin className="h-3.5 w-3.5 shrink-0 text-teal-base" />
                      <span>{site.area}</span>
                    </div>

                    {/* Metrik Ditanam vs Masih Hidup */}
                    <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                      <div>
                        <span className="block text-xs text-ink-500">Ditanam</span>
                        <span className="text-sm font-bold text-ink-900">
                          {site.planted}
                        </span>
                      </div>
                      <div>
                        <span className="block text-xs text-ink-500">Masih hidup</span>
                        <span className="text-sm font-bold text-emerald-600">
                          {site.survival}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar Kelangsungan Hidup (Isi Bar bg-emerald-600) */}
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-emerald-600 transition-all duration-500"
                        style={{ width: `${site.survival}%` }}
                      />
                    </div>
                  </div>

                  {/* Footer Kartu: Label Data Tim Pelaksana & Pembaruan */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-ink-500">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-600">
                      <LuClipboardCheck className="h-3.5 w-3.5 text-slate-600" />
                      Data tim pelaksana
                    </span>
                    <span>{site.updatedAt}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { LuUsers, LuMapPin, LuCheck, LuArrowUpRight } from 'react-icons/lu'

const OPEN_REGIONS = [
  {
    id: 'denpasar',
    name: 'Denpasar',
    volunteers: '24 relawan',
    locations: '12 lokasi',
    isOpen: true,
    image:
      'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821213/satu-paragraf-josjis/progress-thriving.png'
  },
  {
    id: 'klungkung',
    name: 'Klungkung',
    volunteers: '18 relawan',
    locations: '9 lokasi',
    isOpen: true,
    image:
      'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821214/satu-paragraf-josjis/progress-staghorn.png'
  },
  {
    id: 'buleleng',
    name: 'Buleleng',
    volunteers: '21 relawan',
    locations: '10 lokasi',
    isOpen: true,
    image:
      'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821215/satu-paragraf-josjis/progress-transplant.png'
  },
  {
    id: 'karangasem',
    name: 'Karangasem',
    volunteers: '9 relawan',
    locations: '5 lokasi',
    isOpen: true,
    image:
      'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794893779/satu-paragraf-josjis/article-damaged.jpg'
  }
]

export function ActiveRegionsSection({ onSelectRegion }) {
  const handleCardClick = (regionId) => {
    if (onSelectRegion) {
      onSelectRegion(regionId)
    }
  }

  return (
    <section className="bg-white py-10 sm:py-16 lg:py-20 border-t border-ink-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2">
            <span className="h-[2px] w-5 sm:w-6 rounded-full bg-teal-500" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-teal-500">
              DAERAH AKTIF
            </span>
          </div>

          <h2 className="mt-2.5 sm:mt-3 text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-teal-500">
            Daerah yang sedang membuka pendaftaran
          </h2>

          <p className="mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base text-ink-600">
            Belum ada daerahmu?{' '}
            <Link to="/contact" className="text-teal-base font-medium underline underline-offset-2 hover:text-teal-hover">
              Hubungi kami
            </Link>{' '}
            untuk membuka tim daerah baru.
          </p>
        </div>

        {/* 4 Cards Grid: 1 col on mobile, 2 on sm/md, 4 on lg */}
        <div className="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {OPEN_REGIONS.map((region) => (
            <div
              key={region.id}
              onClick={() => handleCardClick(region.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleCardClick(region.id)
                }
              }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-ink-200/90 bg-surface-card shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base"
            >
              {/* Image Banner: aspect-[16/9] on mobile for better compactness, aspect-[16/10] on sm+ */}
              <div className="relative aspect-[16/9] sm:aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <img
                  src={region.image}
                  alt={`Terumbu karang di ${region.name}`}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-teal-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-bold text-ink-900 group-hover:text-teal-base transition-colors">
                      {region.name}
                    </h3>
                    <LuArrowUpRight className="h-4 w-4 text-ink-400 group-hover:text-teal-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <div className="mt-1.5 sm:mt-2 flex items-center gap-3 text-xs text-ink-600">
                    <span className="inline-flex items-center gap-1">
                      <LuUsers className="h-3.5 w-3.5 text-ink-400" />
                      {region.volunteers}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <LuMapPin className="h-3.5 w-3.5 text-ink-400" />
                      {region.locations}
                    </span>
                  </div>
                </div>

                <div className="mt-3.5 sm:mt-4 pt-2.5 sm:pt-3 border-t border-ink-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 shadow-2xs group-hover:bg-emerald-100 transition-colors">
                    <LuCheck className="h-3 w-3 text-emerald-600" />
                    Menerima relawan
                  </span>
                  <span className="text-[11px] font-semibold text-teal-base opacity-0 group-hover:opacity-100 transition-opacity">
                    Pilih daerah →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

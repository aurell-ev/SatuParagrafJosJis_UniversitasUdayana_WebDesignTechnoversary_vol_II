import { Link } from 'react-router-dom'
import { LuUsers, LuMapPin, LuCheck } from 'react-icons/lu'

const OPEN_REGIONS = [
  {
    name: 'Denpasar',
    volunteers: '24 relawan',
    locations: '12 lokasi',
    isOpen: true,
    image:
      'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821213/satu-paragraf-josjis/progress-thriving.png'
  },
  {
    name: 'Klungkung',
    volunteers: '18 relawan',
    locations: '9 lokasi',
    isOpen: true,
    image:
      'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821214/satu-paragraf-josjis/progress-staghorn.png'
  },
  {
    name: 'Buleleng',
    volunteers: '21 relawan',
    locations: '10 lokasi',
    isOpen: true,
    image:
      'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821215/satu-paragraf-josjis/progress-transplant.png'
  },
  {
    name: 'Karangasem',
    volunteers: '9 relawan',
    locations: '5 lokasi',
    isOpen: true,
    image:
      'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794893779/satu-paragraf-josjis/article-damaged.jpg'
  }
]

export function ActiveRegionsSection() {
  return (
    <section className="bg-white py-14 sm:py-20 border-t border-ink-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2">
            <span className="h-[2px] w-6 rounded-full bg-secondary-500" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-secondary-500">
              DAERAH AKTIF
            </span>
          </div>

          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink-900">
            Daerah yang sedang membuka pendaftaran
          </h2>

          <p className="mt-2 text-sm sm:text-base text-ink-600">
            Belum ada daerahmu?{' '}
            <Link to="/contact" className="text-teal-base font-medium underline underline-offset-2 hover:text-teal-hover">
              Hubungi kami
            </Link>{' '}
            untuk membuka tim daerah baru.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {OPEN_REGIONS.map((region, idx) => (
            <div
              key={idx}
              className="flex flex-col overflow-hidden rounded-2xl border border-ink-200/80 bg-surface-card shadow-2xs transition-all hover:shadow-md"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <img
                  src={region.image}
                  alt={`Terumbu karang di ${region.name}`}
                  className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-lg font-bold text-ink-900">{region.name}</h3>
                  <div className="mt-2 flex items-center gap-3 text-xs text-ink-600">
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

                <div className="mt-4 pt-3 border-t border-ink-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50">
                    <LuCheck className="h-3 w-3 text-emerald-600" />
                    Menerima relawan
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

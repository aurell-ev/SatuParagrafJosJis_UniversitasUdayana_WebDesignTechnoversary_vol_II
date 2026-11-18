import { Link } from 'react-router-dom'
import {
  FiCamera,
  FiArrowRight,
  FiCheckCircle,
  FiShield,
  FiLock,
  FiActivity
} from 'react-icons/fi'

/**
 * Section 1: Hero
 * Sesuai desain Figma node 1150:1501
 */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Kolom Kiri: Teks Hero & Tombol Aksi (Teks Hero 600px) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Judul Utama (60px / Weight 800 / Line Height 66px / Letter Spacing -1.2px) */}
            <h1 className="text-3xl font-extrabold tracking-tight text-teal-base sm:text-4xl md:text-5xl lg:text-[54px] lg:leading-[1.12] lg:tracking-[-1.2px]">
              Laporkan kerusakan karang.{' '}
              <span className="block">
                Pantau pemulihannya secara terbuka.
              </span>
            </h1>

            {/* Deskripsi (18px / Regular / Leading 28.8px) */}
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-ink-600 max-w-xl">
              Kirim foto dan titik lokasi karang rusak tanpa membuat akun. Tim
              restorasi daerah mengecek laporanmu, lalu mencatat berapa persen
              karang yang ditanam masih hidup.
            </p>

            {/* Aksi Utama (Laporkan Kerusakan & Lihat Perkembangan) */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/lapor"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-coral-base px-6 py-3.5 text-base font-semibold text-white shadow-2xs hover:bg-coral-hover transition-colors"
              >
                <FiCamera className="h-5 w-5 shrink-0" />
                <span>Laporkan Kerusakan</span>
              </Link>

              <Link
                to="/perkembangan"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-teal-200 bg-white px-6 py-3.5 text-base font-semibold text-teal-base shadow-2xs hover:bg-teal-50 hover:border-teal-300 transition-colors"
              >
                <span>Lihat Perkembangan</span>
                <FiArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            </div>

            {/* Jaminan / Trust Badges */}
            <div className="mt-8 sm:mt-10 pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm text-ink-600">
              <div className="inline-flex items-center gap-2">
                <FiCheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Tanpa wajib login</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <FiShield className="h-4 w-4 text-teal-base shrink-0" />
                <span>Boleh anonim</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <FiLock className="h-4 w-4 text-teal-base shrink-0" />
                <span>Titik tanam dirahasiakan</span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Foto Hero & Kartu Melayang (Foto Hero 560x600) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] lg:max-w-[560px]">
              {/* Frame Foto Utama (Corner radius 24px) */}
              <div className="relative aspect-[4/3] sm:aspect-[14/15] lg:h-[580px] w-full overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-100 shadow-xl">
                <img
                  src="https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794819287/satu-paragraf-josjis/hero-coral.png"
                  alt="Restorasi Terumbu Karang PulihKarang"
                  className="h-full w-full object-cover object-center"
                  loading="eager"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-teal-950/35 via-transparent to-transparent" />
              </div>

              {/* Kartu Melayang (280x135px, offset -40px di desktop) */}
              <div className="absolute bottom-6 left-4 right-4 sm:bottom-10 sm:left-6 sm:right-auto lg:-left-8 sm:w-[280px] rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <FiActivity className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Sanur Kaja · 180 hari
                    </p>
                    <p className="text-lg font-bold text-ink-900 leading-tight">
                      68% masih hidup
                    </p>
                  </div>
                </div>

                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-emerald-600 transition-all duration-500"
                    style={{ width: '68%' }}
                  />
                </div>

                <p className="mt-2 text-xs text-slate-400 font-normal">
                  286 dari 420 fragmen tercatat hidup
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

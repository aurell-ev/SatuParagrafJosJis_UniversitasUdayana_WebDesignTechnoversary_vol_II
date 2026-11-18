import { ReportForm } from '../../components/report/ReportForm'
import { ReportSidebar } from '../../components/report/ReportSidebar'
import { LuCircleCheck, LuClock, LuShieldCheck } from 'react-icons/lu'

export function ReportPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Header Container */}
      <section className="bg-white border-b border-ink-200/80 pt-8 pb-10 sm:pt-12 sm:pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-ink-500">
            <ol className="flex items-center gap-2">
              <li>
                <a href="/" className="hover:text-teal-base transition-colors">
                  Beranda
                </a>
              </li>
              <li>/</li>
              <li className="font-semibold text-ink-800">Laporkan Kerusakan</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-ink-900 leading-tight">
              Laporkan kerusakan karang
            </h1>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-ink-600">
              Ceritakan apa yang kamu lihat. Laporanmu dicek tim daerah sebelum ditampilkan ke publik, jadi kamu tidak perlu yakin 100%.
            </p>

            {/* Badges strip */}
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
                <LuCircleCheck className="h-3.5 w-3.5 text-emerald-600" />
                Tanpa perlu login
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-base border border-teal-200/60">
                <LuShieldCheck className="h-3.5 w-3.5 text-teal-base" />
                Boleh anonim
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200">
                <LuClock className="h-3.5 w-3.5 text-slate-500" />
                ±3 menit
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Form (8 cols) */}
          <div className="lg:col-span-8">
            <ReportForm />
          </div>

          {/* Right: Sidebar Helper Boxes (4 cols) */}
          <div className="lg:col-span-4 sticky top-24">
            <ReportSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}

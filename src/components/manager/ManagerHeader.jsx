import { useAuth } from '../../context/useAppContext'
import { LuShieldCheck, LuMapPin, LuLogOut, LuArrowRight } from 'react-icons/lu'
import { Link } from 'react-router-dom'

export function ManagerHeader({ activeTab, onTabChange }) {
  const { user, logout } = useAuth()

  const tabs = [
    { id: 'relawan', label: 'Persetujuan Relawan' },
    { id: 'publikasi', label: 'Transparansi & Publikasi Data' },
    { id: 'laporan', label: 'Audit Laporan Kerusakan' }
  ]

  return (
    <div className="bg-white border-b border-ink-200/90 pt-8 pb-4 sm:pt-10 sm:pb-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Profile / Identity Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-ink-100">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-0.5 text-xs font-bold text-teal-base border border-teal-200">
                <LuShieldCheck className="h-3.5 w-3.5" />
                Portal Pengelola Daerah
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-ink-500">
                <LuMapPin className="h-3.5 w-3.5 text-teal-base" />
                {user?.region || 'Wilayah Bali'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-ink-900 tracking-tight">
              Selamat datang, {user?.name || 'Dr. Made Suartana'}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-ink-600">
              Kelola persetujuan calon relawan, verifikasi etika data sains terbuka, dan audit transparansi restorasi.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <Link
              to="/perkembangan"
              className="inline-flex items-center gap-1.5 rounded-xl border border-ink-200 bg-white px-3.5 py-2 text-xs font-semibold text-ink-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <span>Lihat Halaman Publik</span>
              <LuArrowRight className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-coral-200 bg-coral-50/50 px-3.5 py-2 text-xs font-semibold text-coral-700 hover:bg-coral-100 transition-colors cursor-pointer"
            >
              <LuLogOut className="h-3.5 w-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 pt-4 no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-teal-base text-white shadow-xs'
                    : 'text-ink-600 hover:text-ink-900 hover:bg-ink-100/70'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

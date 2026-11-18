import { useAuth } from '../../context/useAppContext'
import { LuShieldCheck, LuMapPin, LuLogOut, LuArrowRight } from 'react-icons/lu'
import { Link } from 'react-router-dom'

export function ManagerHeader() {
  const { user, logout } = useAuth()

  return (
    <div className="bg-white border-b border-ink-200/90 pt-6 pb-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Profile / Identity Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
              Kelola persetujuan relawan baru, verifikasi laporan kerusakan warga, dan perbarui perkembangan sains karang.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

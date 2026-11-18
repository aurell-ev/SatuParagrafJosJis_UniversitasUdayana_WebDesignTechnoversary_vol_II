import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '../common/Logo'
import { useAuth } from '../../context/useAppContext'
import {
  LuUsers,
  LuFileText,
  LuTrendingUp,
  LuShieldCheck,
  LuLogOut
} from 'react-icons/lu'

export function ManagerNavbar({ activeTab, onTabChange }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const tabs = [
    { id: 'relawan', label: 'Relawan', icon: LuUsers },
    { id: 'laporan', label: 'Laporan', icon: LuFileText },
    { id: 'perkembangan', label: 'Perkembangan Karang', icon: LuTrendingUp },
    { id: 'publikasi', label: 'Publikasi Data', icon: LuShieldCheck }
  ]

  const handleLogout = () => {
    logout()
    navigate('/masuk')
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-surface-card/95 backdrop-blur-md border-b border-ink-200 shadow-2xs">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand & Area Badge */}
        <div className="flex items-center gap-3">
          <Link
            to="/pengelola"
            className="outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base rounded-lg shrink-0"
            aria-label="PulihKarang Portal Pengelola"
          >
            <Logo variant="light" />
          </Link>
        </div>

        {/* 4 Main Tabs Nav for Manager (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="Menu Pengelola">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs xl:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-teal-base text-white shadow-xs'
                    : 'text-ink-600 hover:text-ink-900 hover:bg-ink-100/70'
                }`}
              >
                <Icon className={`size-4 ${isActive ? 'text-white' : 'text-ink-500'}`} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Profile & Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">

          {/* Profile Name */}
          <div className="text-right hidden md:block">
            <p className="text-xs font-bold text-ink-900 leading-tight">
              {user?.name || 'Dr. Made Suartana'}
            </p>
            <p className="text-[10px] text-teal-700 font-medium">
              {user?.region || 'Wilayah Bali'}
            </p>
          </div>

          {/* Keluar */}
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-full border border-coral-200 bg-coral-50/60 px-3.5 py-1.5 text-xs font-semibold text-coral-700 hover:bg-coral-100 transition-colors cursor-pointer"
          >
            <LuLogOut className="size-3.5" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar for 4 Tabs */}
      <div className="lg:hidden flex overflow-x-auto gap-1 px-4 py-2 bg-slate-50 border-t border-ink-100 no-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-teal-base text-white shadow-xs'
                  : 'text-ink-600 hover:text-ink-900 hover:bg-ink-100'
              }`}
            >
              <Icon className="size-3.5" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </header>
  )
}

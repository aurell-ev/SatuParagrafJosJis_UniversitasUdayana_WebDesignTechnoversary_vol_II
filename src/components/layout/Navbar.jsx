import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Logo } from '../common/Logo'
import { FiUsers, FiAlertTriangle, FiMenu, FiX } from 'react-icons/fi'

const NAV_LINKS = [
  { label: 'Beranda', path: '/' },
  { label: 'Tentang', path: '/about' },
  { label: 'Artikel', path: '/artikel' },
  { label: 'Galeri', path: '/galeri' },
  { label: 'Perkembangan', path: '/perkembangan' },
  { label: 'Kontak', path: '/contact' }
]

function isLinkActive(currentPath, targetPath) {
  if (targetPath === '/') return currentPath === '/'
  return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`)
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-ink-200 shadow-xs">
      <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/" className="outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base rounded-lg">
          <Logo variant="light" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
          {NAV_LINKS.map((item) => {
            const isActive = isLinkActive(location.pathname, item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors duration-150 outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base ${
                  isActive
                    ? 'bg-teal-50 text-teal-base'
                    : 'text-ink-600 hover:text-ink-900 hover:bg-ink-100'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Action Buttons (Desktop only) */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/gabung"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-teal-base hover:bg-teal-50 transition-colors duration-150 outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base"
          >
            <FiUsers className="h-4 w-4 text-teal-base" />
            <span>Gabung Tim</span>
          </Link>
          <Link
            to="/lapor"
            className="inline-flex items-center gap-2 rounded-xl bg-coral-base hover:bg-coral-hover px-4 py-2.5 text-sm font-bold text-white shadow-xs transition-colors duration-150 outline-hidden focus-visible:ring-2 focus-visible:ring-coral-hover"
          >
            <FiAlertTriangle className="h-4 w-4" />
            <span>Laporkan Kerusakan</span>
          </Link>
        </div>

        {/* Mobile & Tablet Toggle Controls (visible on < lg: screens, including tablets) */}
        <div className="flex lg:hidden items-center gap-2.5">
          <Link
            to="/lapor"
            className="inline-flex items-center gap-1.5 rounded-xl bg-coral-base hover:bg-coral-hover px-3.5 py-2 text-xs sm:text-sm font-bold text-white shadow-xs transition-colors duration-150 outline-hidden focus-visible:ring-2 focus-visible:ring-coral-hover"
          >
            <FiAlertTriangle className="h-4 w-4" />
            <span>Lapor</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-xl p-2 text-ink-700 hover:bg-ink-100 hover:text-ink-900 transition-colors outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base"
            aria-label="Buka Menu Navigasi"
            aria-expanded={isOpen}
          >
            {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      {isOpen && (
        <div className="lg:hidden border-b border-ink-200 bg-white/98 backdrop-blur-md px-4 sm:px-6 pt-3 pb-6 shadow-lg animate-in fade-in duration-150">
          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map((item) => {
              const isActive = isLinkActive(location.pathname, item.path)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-150 ${
                    isActive
                      ? 'bg-teal-50 text-teal-base'
                      : 'text-ink-700 hover:bg-ink-100 hover:text-ink-900'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            <div className="pt-3 mt-2 border-t border-ink-200 flex flex-col gap-2.5">
              <Link
                to="/gabung"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-teal-base px-4 py-2.5 text-sm font-semibold text-teal-base hover:bg-teal-50 transition-colors"
              >
                <FiUsers className="h-4 w-4" />
                <span>Gabung Tim Relawan</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

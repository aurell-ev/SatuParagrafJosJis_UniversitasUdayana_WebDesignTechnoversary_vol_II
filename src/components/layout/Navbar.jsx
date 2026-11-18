import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Logo } from '../common/Logo'
import { useAuth } from '../../context/useAppContext'

/* --- Exact Figma SVG Icons with currentColor for token styling --- */

function ChevronDownIcon({ className = 'size-4' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRightIcon({ className = 'size-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7.5 15L12.5 10L7.5 5"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LoginIcon({ className = 'size-[18px]' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7.5 12.75L11.25 9L7.5 5.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.25 9H2.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.25 2.25H14.25C14.6478 2.25 15.0294 2.40804 15.3107 2.68934C15.592 2.97064 15.75 3.35218 15.75 3.75V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H11.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CameraIcon({ className = 'size-[18px]' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10.4977 3C10.7683 3 11.0339 3.07319 11.2663 3.21183C11.4987 3.35046 11.6892 3.54938 11.8177 3.7875L12.1823 4.4625C12.3108 4.70062 12.5013 4.89954 12.7337 5.03817C12.9661 5.17681 13.2317 5.25 13.5023 5.25H15C15.3978 5.25 15.7794 5.40804 16.0607 5.68934C16.342 5.97064 16.5 6.35218 16.5 6.75V13.5C16.5 13.8978 16.342 14.2794 16.0607 14.5607C15.7794 14.842 15.3978 15 15 15H3C2.60218 15 2.22064 14.842 1.93934 14.5607C1.65804 14.2794 1.5 13.8978 1.5 13.5V6.75C1.5 6.35218 1.65804 5.97064 1.93934 5.68934C2.22064 5.40804 2.60218 5.25 3 5.25H4.49775C4.76807 5.25001 5.03336 5.17698 5.26559 5.03862C5.49781 4.90027 5.68833 4.70173 5.817 4.464L6.18375 3.786C6.31242 3.54827 6.50294 3.34973 6.73516 3.21138C6.96739 3.07302 7.23268 2.99999 7.503 3H10.4977Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.25 9.75C11.25 10.9926 10.2426 12 9 12C7.75736 12 6.75 10.9926 6.75 9.75C6.75 8.50736 7.75736 7.5 9 7.5C10.2426 7.5 11.25 8.50736 11.25 9.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function InfoCircleIcon({ className = 'size-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M18.3333 10C18.3333 14.6024 14.6024 18.3333 10 18.3333C5.39763 18.3333 1.66667 14.6024 1.66667 10C1.66667 5.39763 5.39763 1.66667 10 1.66667C14.6024 1.66667 18.3333 5.39763 18.3333 10Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 13.3333V10"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 6.66667H10.0083"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function HandshakeIcon({ className = 'size-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10.3408 4.85333L7.98833 7.155C7.67588 7.46755 7.50036 7.89139 7.50036 8.33333C7.50036 8.77527 7.67588 9.19912 7.98833 9.51167C8.30088 9.82412 8.72473 9.99964 9.16667 9.99964C9.60861 9.99964 10.0325 9.82412 10.345 9.51167L11.77 8.08667C11.9565 7.90008 12.1779 7.75207 12.4217 7.65109C12.6654 7.5501 12.9266 7.49813 13.1904 7.49813C13.4542 7.49813 13.7155 7.5501 13.9592 7.65109C14.2029 7.75207 14.4243 7.90008 14.6108 8.08667L16.1783 9.655C16.4908 9.96755 16.6663 10.3914 16.6663 10.8333C16.6663 11.2753 16.4908 11.6991 16.1783 12.0117C17.5 10.69 18.3333 9.58333 18.3333 7.91667C18.3333 6.98933 18.052 6.08382 17.5266 5.31972C17.0011 4.55562 16.2562 3.96888 15.3903 3.637C14.5244 3.30512 13.5782 3.2437 12.6767 3.46087C11.7751 3.67804 10.9606 4.16357 10.3408 4.85333ZM16.1783 12.0117C16.014 12.1761 15.8188 12.3065 15.6041 12.3954C15.3893 12.4844 15.1591 12.5302 14.9267 12.5302C14.6942 12.5302 14.464 12.4844 14.2493 12.3954C14.062 12.3178 13.8896 12.2087 13.7395 12.073M10.3408 4.85333C10.2484 4.93967 10.1267 4.98776 10.0002 4.98792C9.87367 4.98807 9.75182 4.94028 9.65917 4.85417C9.0394 4.16445 8.22501 3.67894 7.32355 3.46175C6.42208 3.24456 5.47594 3.3059 4.61006 3.63768C3.74419 3.96946 2.99931 4.55607 2.4738 5.32004C1.94828 6.08401 1.66685 6.9894 1.66667 7.91667C1.66667 9.83333 2.91667 11.25 4.16667 12.5L8.77917 16.9683C8.9317 17.1323 9.11572 17.2639 9.32025 17.3552C9.52477 17.4465 9.7456 17.4957 9.96954 17.4997C10.1935 17.5038 10.4159 17.4626 10.6236 17.3788C10.8313 17.2949 11.02 17.1701 11.1783 17.0117C11.3424 16.8474 11.4725 16.6523 11.5611 16.4377C11.6497 16.2231 11.6952 15.9932 11.6949 15.761C11.6946 15.5288 11.6485 15.2989 11.5593 15.0846C11.4819 14.8986 11.3734 14.7275 11.2387 14.5785M11.2387 14.5785C11.218 14.5557 11.1968 14.5334 11.175 14.5117C11.1957 14.5345 11.2169 14.5568 11.2387 14.5785ZM11.2387 14.5785C11.3865 14.7257 11.5593 14.8459 11.7494 14.9331C11.9674 15.0332 12.2035 15.0879 12.4434 15.094C12.6832 15.1 12.9218 15.0572 13.1446 14.9682C13.3674 14.8791 13.5698 14.7457 13.7394 14.5761C13.9091 14.4064 14.0425 14.2041 14.1315 13.9813C14.2205 13.7585 14.2633 13.5199 14.2573 13.2801C14.2513 13.0402 14.1965 12.8041 14.0964 12.586C14.0087 12.395 13.8878 12.2213 13.7395 12.073M13.7395 12.073C13.7186 12.0521 13.697 12.0316 13.675 12.0117C13.696 12.0327 13.7175 12.0531 13.7395 12.073Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MailIcon({ className = 'size-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M18.3333 5.83333L10.8408 10.6058C10.5866 10.7535 10.2978 10.8313 10.0038 10.8313C9.70972 10.8313 9.42092 10.7535 9.16667 10.6058L1.66667 5.83333"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33333 3.33333H16.6667C17.5871 3.33333 18.3333 4.07953 18.3333 5V15C18.3333 15.9205 17.5871 16.6667 16.6667 16.6667H3.33333C2.41286 16.6667 1.66667 15.9205 1.66667 15V5C1.66667 4.07953 2.41286 3.33333 3.33333 3.33333Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MenuIcon({ className = 'size-6' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 5H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 12H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 19H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CloseIcon({ className = 'size-6' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* --- Route Active Matching Helper (Nested Routes Compliant) --- */
function isLinkActive(currentPath, targetPath) {
  if (targetPath === '/') return currentPath === '/'
  return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`)
}

/* --- Dropdown Items Configuration --- */
const TENTANG_SUBMENU = [
  {
    path: '/about',
    title: 'Tentang PulihKarang',
    description: 'Cara kerja dan tim pelaksana kami.',
    icon: InfoCircleIcon,
  },
  {
    path: '/gabung',
    title: 'Gabung Tim Daerah',
    description: 'Daftar jadi relawan di daerahmu.',
    icon: HandshakeIcon,
  },
  {
    path: '/contact',
    title: 'Kontak & FAQ',
    description: 'Pertanyaan umum dan kontak kami.',
    icon: MailIcon,
  },
]

export function Navbar() {
  const { user, isAuthenticated } = useAuth()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const timeoutRef = useRef(null)
  const location = useLocation()

  // Close both menus when location changes during render (recommended React pattern)
  const [prevPath, setPrevPath] = useState(location.pathname)
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname)
    setIsMobileOpen(false)
    setIsDropdownOpen(false)
  }

  // Click outside listener for desktop dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Keyboard navigation: Escape key closes menus
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      setIsDropdownOpen(false)
      setIsMobileOpen(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Mouse enter/leave handlers with smooth delay for desktop dropdown
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false)
    }, 150)
  }

  // Active check for "Tentang" group
  const isTentangActive =
    isLinkActive(location.pathname, '/about') ||
    isLinkActive(location.pathname, '/gabung') ||
    isLinkActive(location.pathname, '/contact')

  return (
    <header className="sticky top-0 z-50 w-full bg-surface-card/95 backdrop-blur-md border-b border-ink-200">
      <div className="mx-auto flex h-[76px] max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          to="/"
          className="outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base rounded-lg"
          aria-label="PulihKarang Beranda"
        >
          <Logo variant="light" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label="Menu Utama"
        >
          {/* Beranda */}
          <Link
            to="/"
            className={`content-stretch flex items-center px-4 py-2 rounded-full text-base font-medium transition-colors duration-150 outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base ${isLinkActive(location.pathname, '/')
                ? 'bg-teal-50 text-teal-base font-semibold'
                : 'text-ink-600 hover:text-ink-900 hover:bg-ink-100'
              }`}
          >
            Beranda
          </Link>

          {/* Dropdown Tentang */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              className={`content-stretch flex items-center gap-1 px-4 py-2 rounded-full text-base transition-colors duration-150 outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base cursor-pointer ${isTentangActive
                  ? 'bg-teal-50 text-teal-base font-semibold'
                  : isDropdownOpen
                    ? 'bg-ink-100 text-ink-900 font-medium'
                    : 'text-ink-600 hover:text-ink-900 hover:bg-ink-100 font-medium'
                }`}
            >
              <span>Tentang</span>
              <div
                className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                  }`}
              >
                <ChevronDownIcon
                  className={`size-4 ${isTentangActive ? 'text-teal-base' : 'text-ink-600'
                    }`}
                />
              </div>
            </button>

            {/* Menu Dropdown Popover */}
            {isDropdownOpen && (
              <div
                role="menu"
                aria-orientation="vertical"
                className="absolute top-[calc(100%+8px)] left-0 w-[348px] bg-surface-card border border-ink-200 rounded-xl p-2 shadow-xl z-50 flex flex-col gap-1 animate-in fade-in slide-in-from-top-1 duration-150"
              >
                {TENTANG_SUBMENU.map((item) => {
                  const isActive = isLinkActive(location.pathname, item.path)
                  const IconComponent = item.icon
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      role="menuitem"
                      onClick={() => setIsDropdownOpen(false)}
                      className={`group flex items-start gap-3 p-3 rounded-lg transition-colors outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base ${isActive
                          ? 'bg-teal-50'
                          : 'hover:bg-ink-50'
                        }`}
                    >
                      <div
                        className={`size-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isActive
                            ? 'bg-surface-card text-teal-base shadow-xs'
                            : 'bg-teal-50 text-teal-base group-hover:bg-teal-100'
                          }`}
                      >
                        <IconComponent className="size-5" />
                      </div>
                      <div className="flex flex-col gap-0.5 leading-normal">
                        <p
                          className={`text-base font-semibold transition-colors ${isActive ? 'text-teal-base' : 'text-ink-900 group-hover:text-teal-base'
                            }`}
                        >
                          {item.title}
                        </p>
                        <p className="text-sm font-normal text-ink-600">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {/* Artikel */}
          <Link
            to="/artikel"
            className={`content-stretch flex items-center px-4 py-2 rounded-full text-base font-medium transition-colors duration-150 outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base ${isLinkActive(location.pathname, '/artikel')
                ? 'bg-teal-50 text-teal-base font-semibold'
                : 'text-ink-600 hover:text-ink-900 hover:bg-ink-100'
              }`}
          >
            Artikel
          </Link>

          {/* Galeri */}
          <Link
            to="/galeri"
            className={`content-stretch flex items-center px-4 py-2 rounded-full text-base font-medium transition-colors duration-150 outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base ${isLinkActive(location.pathname, '/galeri')
                ? 'bg-teal-50 text-teal-base font-semibold'
                : 'text-ink-600 hover:text-ink-900 hover:bg-ink-100'
              }`}
          >
            Galeri
          </Link>

          {/* Perkembangan */}
          <Link
            to="/perkembangan"
            className={`content-stretch flex items-center px-4 py-2 rounded-full text-base font-medium transition-colors duration-150 outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base ${isLinkActive(location.pathname, '/perkembangan')
                ? 'bg-teal-50 text-teal-base font-semibold'
                : 'text-ink-600 hover:text-ink-900 hover:bg-ink-100'
              }`}
          >
            Perkembangan
          </Link>

          {/* Portal Pengelola (Khusus Pengelola Daerah) */}
          {isAuthenticated && user?.role === 'manager' && (
            <Link
              to="/pengelola"
              className={`content-stretch flex items-center gap-1.5 px-4 py-2 rounded-full text-base font-medium transition-colors duration-150 outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base ${isLinkActive(location.pathname, '/pengelola')
                  ? 'bg-teal-50 text-teal-base font-semibold'
                  : 'text-ink-600 hover:text-ink-900 hover:bg-ink-100'
                }`}
            >
              <span>Portal Pengelola</span>
            </Link>
          )}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Masuk / Logout Link */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to={user?.role === 'manager' ? '/pengelola' : '/perkembangan'}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-150 outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base ${
                  isLinkActive(location.pathname, '/pengelola')
                    ? 'bg-teal-50 text-teal-base'
                    : 'text-teal-base hover:bg-teal-50'
                }`}
              >
                <LoginIcon className="size-[18px] text-teal-base" />
                <span>{user?.name || (user?.role === 'manager' ? 'Dr. Made Suartana' : 'Tim Wilayah')}</span>
              </Link>
            </div>
          ) : (
            <Link
              to="/masuk"
              className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-150 outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base ${
                isLinkActive(location.pathname, '/masuk')
                  ? 'bg-teal-50 text-teal-base'
                  : 'text-teal-base hover:bg-teal-50'
              }`}
            >
              <LoginIcon className="size-[18px] text-teal-base" />
              <span>Masuk</span>
            </Link>
          )}

          {/* Laporkan Kerusakan (Primary Accent Button) */}
          <Link
            to="/lapor"
            className="inline-flex items-center gap-2 rounded-full bg-coral-base hover:bg-coral-hover text-surface-card px-5 py-3 text-sm font-semibold shadow-xs transition-colors duration-150 outline-hidden focus-visible:ring-2 focus-visible:ring-coral-hover"
          >
            <CameraIcon className="size-[18px] text-surface-card" />
            <span>Laporkan Kerusakan</span>
          </Link>
        </div>

        {/* Mobile & Tablet Hamburger Button (lg:hidden) */}
        <div className="flex lg:hidden items-center">
          <button
            type="button"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="size-11 rounded-lg border border-ink-200 bg-surface-card text-ink-900 flex items-center justify-center hover:bg-ink-100 transition-colors outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base"
            aria-label={isMobileOpen ? 'Tutup Menu' : 'Buka Menu'}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? (
              <CloseIcon className="size-6 text-ink-900" />
            ) : (
              <MenuIcon className="size-6 text-ink-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer (lg:hidden) */}
      {isMobileOpen && (
        <div className="lg:hidden border-b border-ink-200 bg-surface-card shadow-xl animate-in fade-in duration-150">
          {/* Mobile Navigation List */}
          <nav className="flex flex-col gap-1 px-4 py-2" aria-label="Menu Mobile">
            {/* Beranda */}
            <Link
              to="/"
              onClick={() => setIsMobileOpen(false)}
              className={`flex h-12 items-center justify-between px-4 py-3 rounded-lg text-base transition-colors ${isLinkActive(location.pathname, '/')
                  ? 'bg-teal-50 text-teal-base font-semibold'
                  : 'text-ink-900 font-medium hover:bg-ink-100'
                }`}
            >
              <span>Beranda</span>
              <ChevronRightIcon
                className={`size-5 ${isLinkActive(location.pathname, '/') ? 'text-teal-base' : 'text-ink-400'
                  }`}
              />
            </Link>

            {/* Artikel */}
            <Link
              to="/artikel"
              onClick={() => setIsMobileOpen(false)}
              className={`flex h-12 items-center justify-between px-4 py-3 rounded-lg text-base transition-colors ${isLinkActive(location.pathname, '/artikel')
                  ? 'bg-teal-50 text-teal-base font-semibold'
                  : 'text-ink-900 font-medium hover:bg-ink-100'
                }`}
            >
              <span>Artikel</span>
              <ChevronRightIcon
                className={`size-5 ${isLinkActive(location.pathname, '/artikel')
                    ? 'text-teal-base'
                    : 'text-ink-400'
                  }`}
              />
            </Link>

            {/* Galeri */}
            <Link
              to="/galeri"
              onClick={() => setIsMobileOpen(false)}
              className={`flex h-12 items-center justify-between px-4 py-3 rounded-lg text-base transition-colors ${isLinkActive(location.pathname, '/galeri')
                  ? 'bg-teal-50 text-teal-base font-semibold'
                  : 'text-ink-900 font-medium hover:bg-ink-100'
                }`}
            >
              <span>Galeri</span>
              <ChevronRightIcon
                className={`size-5 ${isLinkActive(location.pathname, '/galeri')
                    ? 'text-teal-base'
                    : 'text-ink-400'
                  }`}
              />
            </Link>

            {/* Perkembangan */}
            <Link
              to="/perkembangan"
              onClick={() => setIsMobileOpen(false)}
              className={`flex h-12 items-center justify-between px-4 py-3 rounded-lg text-base transition-colors ${isLinkActive(location.pathname, '/perkembangan')
                  ? 'bg-teal-50 text-teal-base font-semibold'
                  : 'text-ink-900 font-medium hover:bg-ink-100'
                }`}
            >
              <span>Perkembangan</span>
              <ChevronRightIcon
                className={`size-5 ${isLinkActive(location.pathname, '/perkembangan')
                    ? 'text-teal-base'
                    : 'text-ink-400'
                  }`}
              />
            </Link>

            {/* Portal Pengelola Mobile Link (Khusus Manager) */}
            {isAuthenticated && user?.role === 'manager' && (
              <Link
                to="/pengelola"
                onClick={() => setIsMobileOpen(false)}
                className={`flex h-12 items-center justify-between px-4 py-3 rounded-lg text-base transition-colors ${isLinkActive(location.pathname, '/pengelola')
                    ? 'bg-teal-50 text-teal-base font-semibold'
                    : 'text-ink-900 font-medium hover:bg-ink-100'
                  }`}
              >
                <span className="font-semibold text-teal-base">Portal Pengelola Daerah</span>
                <ChevronRightIcon className="size-5 text-teal-base" />
              </Link>
            )}

            {/* Group Header: Tentang */}
            <div className="pt-4 pb-1 px-4">
              <p className="text-xs font-semibold tracking-wider uppercase text-ink-400">
                Tentang
              </p>
            </div>

            {/* Submenu Tentang Items */}
            {TENTANG_SUBMENU.map((item) => {
              const isActive = isLinkActive(location.pathname, item.path)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex h-12 items-center justify-between px-4 py-3 rounded-lg text-base transition-colors ${isActive
                      ? 'bg-teal-50 text-teal-base font-semibold'
                      : 'text-ink-900 font-medium hover:bg-ink-100'
                    }`}
                >
                  <span>{item.title}</span>
                  <ChevronRightIcon
                    className={`size-5 ${isActive ? 'text-teal-base' : 'text-ink-400'}`}
                  />
                </Link>
              )
            })}
          </nav>

          {/* Mobile Action Buttons */}
          <div className="border-t border-ink-200 pt-4 pb-6 px-4 flex flex-col gap-3">
            {/* Laporkan Kerusakan */}
            <Link
              to="/lapor"
              onClick={() => setIsMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-coral-base hover:bg-coral-hover text-surface-card py-4 px-7 font-semibold text-base shadow-xs transition-colors"
            >
              <CameraIcon className="size-5 text-surface-card" />
              <span>Laporkan Kerusakan</span>
            </Link>

            {/* Masuk Tim / Portal */}
            {isAuthenticated ? (
              <Link
                to={user?.role === 'manager' ? '/pengelola' : '/perkembangan'}
                onClick={() => setIsMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-teal-50 border border-teal-200 text-teal-base hover:bg-teal-100 py-4 px-7 font-semibold text-base transition-colors"
              >
                <LoginIcon className="size-5 text-teal-base" />
                <span>{user?.role === 'manager' ? 'Buka Portal Pengelola' : 'Area Tim Wilayah'}</span>
              </Link>
            ) : (
              <Link
                to="/masuk"
                onClick={() => setIsMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-surface-card border border-secondary text-secondary hover:bg-teal-50 py-4 px-7 font-semibold text-base transition-colors"
              >
                <LoginIcon className="size-5 text-secondary" />
                <span>Masuk Tim</span>
              </Link>
            )}

            {/* Microcopy note */}
            <p className="text-xs font-normal text-ink-400 text-center leading-relaxed">
              Khusus anggota tim daerah. Melapor tidak perlu akun.
            </p>
          </div>
        </div>
      )}
    </header>
  )
}

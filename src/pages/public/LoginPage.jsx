import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '../../components/common/Logo'
import { useAuth } from '../../context/useAppContext'

/* --- Cloudinary Asset (Transformed with f_auto,q_auto) --- */
const LOGIN_HERO_IMAGE =
  'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1795003068/satu-paragraf-josjis/login-hero.jpg'

/* --- Exact Figma SVG Icons with currentColor --- */

function ArrowLeftIcon({ className = 'size-[18px]' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9 14.25L3.75 9L9 3.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.25 9H3.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function EmailIcon({ className = 'size-5' }) {
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

function LockIcon({ className = 'size-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4.16667 9.16667H15.8333C16.7538 9.16667 17.5 9.91286 17.5 10.8333V16.6667C17.5 17.5871 16.7538 18.3333 15.8333 18.3333H4.16667C3.24619 18.3333 2.5 17.5871 2.5 16.6667V10.8333C2.5 9.91286 3.24619 9.16667 4.16667 9.16667Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.83333 9.16667V5.83333C5.83333 4.72826 6.27232 3.66846 7.05372 2.88706C7.83512 2.10565 8.89493 1.66667 10 1.66667C11.1051 1.66667 12.1649 2.10565 12.9463 2.88706C13.7277 3.66846 14.1667 4.72826 14.1667 5.83333V9.16667"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function EyeIcon({ className = 'size-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1.71833 10.29C1.64888 10.1029 1.64888 9.8971 1.71833 9.71C2.39475 8.06988 3.54293 6.66753 5.01731 5.68075C6.49169 4.69396 8.22587 4.16718 10 4.16718C11.7741 4.16718 13.5083 4.69396 14.9827 5.68075C16.4571 6.66753 17.6052 8.06988 18.2817 9.71C18.3511 9.8971 18.3511 10.1029 18.2817 10.29C17.6052 11.9301 16.4571 13.3325 14.9827 14.3193C13.5083 15.306 11.7741 15.8328 10 15.8328C8.22587 15.8328 6.49169 15.306 5.01731 14.3193C3.54293 13.3325 2.39475 11.9301 1.71833 10.29Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 10C12.5 11.3807 11.3807 12.5 10 12.5C8.61929 12.5 7.5 11.3807 7.5 10C7.5 8.61929 8.61929 7.5 10 7.5C11.3807 7.5 12.5 8.61929 12.5 10Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function EyeOffIcon({ className = 'size-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2.5 2.5L17.5 17.5"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.99167 9.00833C8.59914 9.40087 8.35833 9.94058 8.35833 10.5C8.35833 11.6819 9.3181 12.6417 10.5 12.6417C11.0594 12.6417 11.5991 12.4009 11.9917 12.0083"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.01731 5.68075C3.54293 6.66753 2.39475 8.06988 1.71833 9.71C1.64888 9.8971 1.64888 10.1029 1.71833 10.29C2.39475 11.9301 3.54293 13.3325 5.01731 14.3193C6.49169 15.306 8.22587 15.8328 10 15.8328C11.7741 15.8328 13.5083 15.306 14.9827 14.3193C15.9329 13.6833 16.7455 12.8596 17.3809 11.9056"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.33333 4.30556C8.88047 4.21443 9.4369 4.16738 10 4.16718C11.7741 4.16718 13.5083 4.69396 14.9827 5.68075C16.4571 6.66753 17.6052 8.06988 18.2817 9.71C18.3511 9.8971 18.3511 10.1029 18.2817 10.29C17.9737 11.0366 17.5459 11.7348 17.0167 12.3556"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState(null)

  const { loginAs } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setNotification(null)

    // Log in as MANAGER
    setTimeout(() => {
      setIsLoading(false)
      loginAs('MANAGER')

      setNotification({
        type: 'success',
        message: 'Berhasil masuk! Mengalihkan ke Portal Pengelola Daerah...',
      })

      setTimeout(() => {
        navigate('/pengelola')
      }, 800)
    }, 500)
  }

  // Quick helper to fill demo credentials for competition judges
  const handleFillDemo = () => {
    setEmail('pengelola.bali@pulihkarang.id')
    setPassword('karanglestari')
  }

  return (
    <div className="min-h-screen w-full bg-surface-card flex items-stretch">
      {/* Left Column: Form Section */}
      <div className="flex-1 flex flex-col justify-between min-h-screen px-6 sm:px-12 lg:px-20 py-8 bg-surface-card">
        {/* Top Header: Logo & Back Button */}
        <div className="flex items-center justify-between w-full">
          <Link
            to="/"
            className="outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base rounded-lg"
            aria-label="PulihKarang Beranda"
          >
            <Logo variant="light" />
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-teal-base hover:bg-teal-50 transition-colors duration-150 outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base"
          >
            <ArrowLeftIcon className="size-[18px] text-teal-base" />
            <span>Kembali ke beranda</span>
          </Link>
        </div>

        {/* Center: Main Login Form */}
        <div className="my-auto py-10 flex items-center justify-center w-full">
          <div className="w-full max-w-[400px] flex flex-col gap-8">
            {/* Title & Subtitle */}
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-ink-900 leading-tight">
                Masuk Pengelola
              </h1>
              <p className="text-base font-normal text-ink-600 leading-normal">
                Portal autentikasi khusus pengelola daerah terumbu karang.
              </p>
            </div>

            {/* Notification alert if any */}
            {notification && (
              <div
                className={`p-3.5 rounded-xl text-sm font-medium transition-all ${notification.type === 'success'
                    ? 'bg-state-success-bg text-state-success-text border border-state-success-border'
                    : 'bg-state-error-bg text-state-error-text border border-state-error-border'
                  }`}
              >
                {notification.message}
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Field Email */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email-input"
                  className="text-sm font-semibold text-ink-600"
                >
                  Email
                </label>
                <div className="bg-surface-card border border-ink-200 rounded-xl px-4 py-3 flex items-center gap-3 transition-colors focus-within:ring-2 focus-within:ring-teal-base focus-within:border-teal-base">
                  <div className="size-5 shrink-0 text-ink-400">
                    <EmailIcon className="size-5 text-ink-400" />
                  </div>
                  <input
                    id="email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full text-base font-normal text-ink-900 placeholder:text-ink-400 bg-transparent outline-hidden"
                  />
                </div>
              </div>

              {/* Field Kata Sandi */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password-input"
                  className="text-sm font-semibold text-ink-600"
                >
                  Kata sandi
                </label>
                <div className="bg-surface-card border border-ink-200 rounded-xl px-4 py-3 flex items-center gap-3 transition-colors focus-within:ring-2 focus-within:ring-teal-base focus-within:border-teal-base">
                  <div className="size-5 shrink-0 text-ink-400">
                    <LockIcon className="size-5 text-ink-400" />
                  </div>
                  <input
                    id="password-input"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi"
                    className="w-full text-base font-normal text-ink-900 placeholder:text-ink-400 bg-transparent outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="size-6 flex items-center justify-center text-ink-400 hover:text-ink-600 transition-colors cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base rounded-md"
                    aria-label={
                      showPassword
                        ? 'Sembunyikan kata sandi'
                        : 'Tampilkan kata sandi'
                    }
                  >
                    {showPassword ? (
                      <EyeOffIcon className="size-5" />
                    ) : (
                      <EyeIcon className="size-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Baris Lupa Kata Sandi */}
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setNotification({
                      type: 'success',
                      message:
                        'Tautan pemulihan kata sandi telah dikirim ke email terdaftar.',
                    })
                  }
                  className="text-sm font-semibold text-teal-base hover:text-teal-hover transition-colors cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base rounded-md"
                >
                  Lupa kata sandi?
                </button>
              </div>

              {/* Tombol Masuk */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full bg-teal-base hover:bg-teal-hover text-surface-card py-4 px-7 rounded-full font-semibold text-base flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs disabled:opacity-70 outline-hidden focus-visible:ring-2 focus-visible:ring-teal-hover"
              >
                {isLoading ? 'Memproses...' : 'Masuk'}
              </button>

              {/* Quick Demo Fill Buttons (For Competition Evaluator Convenience) */}
              <div className="pt-2 flex flex-col gap-1.5 items-center">
                <span className="text-xs text-ink-400">
                  Uji Coba Demo Akun Cepat:
                </span>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-xs px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-base hover:bg-teal-100 transition-colors font-semibold cursor-pointer border border-teal-200"
                >
                  Isi Akun Pengelola Daerah
                </button>
              </div>

              {/* Footer Form: Belum Terdaftar */}
              <div className="mt-2 flex items-center justify-center gap-1 text-sm leading-normal">
                <span className="font-normal text-ink-600">
                  Belum terdaftar?
                </span>
                <Link
                  to="/gabung"
                  className="font-semibold text-teal-base hover:underline outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base rounded-xs"
                >
                  Gabung Tim Daerah
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Footer: Copyright */}
        <div className="w-full">
          <p className="text-sm font-normal text-ink-400">
            © 2026 PulihKarang
          </p>
        </div>
      </div>

      {/* Right Column: Hero Photo (Desktop only) */}
      <div className="hidden lg:block w-1/2 min-h-screen relative overflow-hidden bg-teal-900">
        <img
          src={LOGIN_HERO_IMAGE}
          alt="Konservasi dan Restorasi Terumbu Karang PulihKarang"
          className="absolute inset-0 size-full object-cover pointer-events-none"
        />
        {/* Subtle gradient overlay to enhance visual depth */}
        <div className="absolute inset-0 bg-linear-to-t from-teal-950/40 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  )
}
export default LoginPage

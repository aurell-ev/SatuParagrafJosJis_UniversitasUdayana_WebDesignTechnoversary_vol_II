import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAppContext'
import { Logo } from '../../components/common/Logo'
import { LuShieldCheck, LuUsers, LuArrowRight, LuLock, LuInfo } from 'react-icons/lu'

export function LoginPage() {
  const navigate = useNavigate()
  const { loginAs, isAuthenticated, user } = useAuth()
  const [selectedRole, setSelectedRole] = useState('MANAGER') // 'MANAGER' | 'FIELD_TEAM'

  const handleLogin = (e) => {
    e.preventDefault()
    loginAs(selectedRole)
    if (selectedRole === 'MANAGER') {
      navigate('/pengelola', { replace: true })
    } else {
      navigate('/perkembangan', { replace: true })
    }
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-block mb-4">
          <Logo variant="light" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink-900">
          Masuk Portal Wilayah
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-ink-600 max-w-sm mx-auto">
          Pusat kendali tim konservasi dan pengelola daerah PulihKarang.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-surface-card rounded-2xl border border-ink-200/90 p-6 sm:p-8 shadow-xs">
          {isAuthenticated && (
            <div className="mb-6 rounded-xl bg-teal-50 border border-teal-200/80 p-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-teal-900">
                <LuShieldCheck className="h-4 w-4 text-teal-base shrink-0" />
                <span>Masuk sebagai <strong>{user?.name}</strong></span>
              </div>
              <button
                type="button"
                onClick={() => navigate(user?.role === 'manager' ? '/pengelola' : '/perkembangan')}
                className="font-bold text-teal-base hover:underline"
              >
                Buka Portal →
              </button>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-2">
                Pilih Peran Demo untuk Pengujian:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole('MANAGER')}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedRole === 'MANAGER'
                      ? 'border-teal-base bg-teal-50/70 text-teal-900 ring-2 ring-teal-base/20 font-bold'
                      : 'border-ink-200 bg-white text-ink-600 hover:bg-slate-50'
                  }`}
                >
                  <LuShieldCheck className={`h-6 w-6 mb-1.5 ${selectedRole === 'MANAGER' ? 'text-teal-base' : 'text-ink-400'}`} />
                  <span className="text-xs">Pengelola Daerah</span>
                  <span className="text-[10px] text-ink-500 font-normal mt-0.5">Admin &amp; Relawan</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('FIELD_TEAM')}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedRole === 'FIELD_TEAM'
                      ? 'border-teal-base bg-teal-50/70 text-teal-900 ring-2 ring-teal-base/20 font-bold'
                      : 'border-ink-200 bg-white text-ink-600 hover:bg-slate-50'
                  }`}
                >
                  <LuUsers className={`h-6 w-6 mb-1.5 ${selectedRole === 'FIELD_TEAM' ? 'text-teal-base' : 'text-ink-400'}`} />
                  <span className="text-xs">Tim Konservator</span>
                  <span className="text-[10px] text-ink-500 font-normal mt-0.5">Lapangan Bali</span>
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-medium text-ink-600 mb-1">Email Akun</label>
                <input
                  type="email"
                  readOnly
                  value={selectedRole === 'MANAGER' ? 'pengelola.bali@pulihkarang.id' : 'tim.bali@pulihkarang.id'}
                  className="w-full rounded-xl border border-ink-200 bg-ink-50 px-3.5 py-2 text-xs text-ink-700 cursor-not-allowed select-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-600 mb-1">Kata Sandi</label>
                <div className="relative">
                  <input
                    type="password"
                    readOnly
                    value="••••••••••••"
                    className="w-full rounded-xl border border-ink-200 bg-ink-50 px-3.5 py-2 text-xs text-ink-700 cursor-not-allowed select-none"
                  />
                  <LuLock className="absolute right-3.5 top-2.5 h-3.5 w-3.5 text-ink-400" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-teal-100 bg-teal-50/50 p-3 text-xs text-teal-900 flex items-start gap-2">
              <LuInfo className="h-4 w-4 text-teal-base shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                Frontend-only mode untuk juri: klik <strong>Masuk Sekarang</strong> untuk menguji alur verifikasi data tanpa perlu backend.
              </p>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-full bg-teal-base hover:bg-teal-hover py-2.5 px-4 text-xs sm:text-sm font-bold text-white shadow-xs transition-colors cursor-pointer"
            >
              <span>Masuk Sebagai {selectedRole === 'MANAGER' ? 'Pengelola Daerah' : 'Tim Konservator'}</span>
              <LuArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

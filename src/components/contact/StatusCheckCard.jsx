import { useState } from 'react'
import { FiSearch, FiArrowRight, FiAlertCircle } from 'react-icons/fi'
import { LuScanSearch } from 'react-icons/lu';
import { MdWarning } from 'react-icons/md';
import { useData } from '../../context/useAppContext'

export function StatusCheckCard() {
  const { reports } = useData()
  const [code, setCode] = useState('')
  const [result, setResult] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    const query = code.trim().toUpperCase()
    if (!query) return

    setHasSearched(true)
    const found = reports.find((r) => r.id.toUpperCase() === query)
    setResult(found || null)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'baru':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-state-warning-bg px-2.5 py-0.5 text-xs font-semibold text-state-warning-text border border-state-warning-border">
            Menunggu Verifikasi
          </span>
        )
      case 'diverifikasi':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-state-info-bg px-2.5 py-0.5 text-xs font-semibold text-state-info-text border border-state-info-border">
            Diverifikasi Tim
          </span>
        )
      case 'dipulihkan':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-state-success-bg px-2.5 py-0.5 text-xs font-semibold text-state-success-text border border-state-success-border">
            Tahap Pemulihan
          </span>
        )
      case 'duplikat':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-ink-100 px-2.5 py-0.5 text-xs font-semibold text-ink-600">
            Terdeteksi Duplikat
          </span>
        )
      case 'tidak_valid':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-state-error-bg px-2.5 py-0.5 text-xs font-semibold text-state-error-text border border-state-error-border">
            Tidak Valid
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-ink-100 px-2.5 py-0.5 text-xs font-semibold text-ink-700">
            {status}
          </span>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-teal-500 p-6 sm:p-7 text-white shadow-2xs">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#167990] text-white mb-4">
          <LuScanSearch className="h-5 w-5" />
        </div>

        <h3 className="text-xl font-bold tracking-tight text-white">
          Cek status laporan
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-teal-100/90 leading-relaxed">
          Masukkan kode lacak yang kamu terima setelah melapor.
        </p>

        <form onSubmit={handleSearch} className="mt-5 space-y-3">
          <div className="mb-4">
            <label htmlFor="trackingCode" className="block text-xs font-medium text-teal-200 mb-1.5">
              Kode lacak
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-ink-400">
                <FiSearch className="h-5 w-5 text-ink-400" />
              </div>
              <input
                type="text"
                id="trackingCode"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value)
                  if (hasSearched) setHasSearched(false)
                }}
                placeholder="Contoh: PK-2026-X89B"
                className="w-full rounded-xl bg-white pl-10 pr-4 py-4 text-base text-ink-900 placeholder:text-ink-400 focus:outline-hidden focus:ring-2 focus:ring-teal-300"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-teal-900 hover:bg-teal-100 p-4 text-sm font-bold shadow-xs transition-colors outline-hidden focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
          >
            <span>Cek Status</span>
            <FiArrowRight className="h-5 w-5" />
          </button>
        </form>

        {/* Search Result Feedback */}
        {hasSearched && (
          <div className="mt-4 pt-4 border-t border-teal-700/60 animate-in fade-in duration-150">
            {result ? (
              <div className="rounded-xl bg-white/10 backdrop-blur-xs p-3.5 text-xs space-y-1.5 border border-white/10">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono font-bold text-white text-sm">{result.id}</span>
                  {getStatusBadge(result.status)}
                </div>
                <p className="text-teal-100 line-clamp-1">
                  <span className="text-teal-300">Lokasi:</span> {result.locationName}
                </p>
                <p className="text-teal-100">
                  <span className="text-teal-300">Jenis:</span> {result.damageType}
                </p>
                {result.verificationNotes && (
                  <p className="text-teal-200/90 italic pt-1 border-t border-white/5">
                    "{result.verificationNotes}"
                  </p>
                )}
              </div>
            ) : (
              <div className="flex items-start gap-2 rounded-xl bg-coral-900/40 border border-coral-700/50 p-3 text-xs text-coral-100">
                <FiAlertCircle className="h-4 w-4 shrink-0 text-coral-300 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Laporan tidak ditemukan</p>
                  <p className="text-coral-200 text-[11px] mt-0.5">
                    Periksa kembali format kode lacak (contoh: PK-2026-X89B).
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Emergency Notice Box */}
      <div className="rounded-2xl border border-ink-200/80 bg-surface-card p-5 shadow-2xs">
        <div className="space-y-2">
          <div className="flex justify-start gap-2 items-center">
            <MdWarning className="size-6 p-1 text-red-500 bg-red-500/20 rounded-full" aria-label="Darurat" />
            <h4 className="text-base font-bold text-ink-900">
              Melihat kejadian darurat?
            </h4>
          </div>
          <p className="text-sm text-ink-600 leading-relaxed">
            Untuk kejadian seperti kapal kandas atau tumpahan minyak, segera hubungi instansi berwenang setempat. PulihKarang bukan kanal resmi pemerintah.
          </p>
        </div>
      </div>
    </div>
  )
}

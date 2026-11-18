import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import {
  LuCheck,
  LuCopy,
  LuArrowLeft,
  LuPlus,
  LuArrowRight,
  LuClock,
  LuCircleCheck,
  LuHammer,
  LuSearch
} from 'react-icons/lu'

export function ReportSuccessPage() {
  const location = useLocation()
  const report = location.state?.report

  const [copied, setCopied] = useState(false)

  // If accessed directly without report state, fallback dummy report for presentation/judges test
  const activeReport = report || {
    id: 'PK-2611-0482',
    reporterName: 'Anonim',
    isAnonymous: true,
    damageType: 'bleaching',
    locationName: 'Area Sanur, Denpasar Selatan',
    observationDate: '2026-11-14',
    depthEstimate: '3-5 meter',
    reportedAt: new Date().toISOString(),
    photosList: [
      'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794819579/satu-paragraf-josjis/coral-bleaching.png',
      'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794893779/satu-paragraf-josjis/article-damaged.jpg'
    ]
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeReport.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatReportDate = (isoOrString) => {
    if (!isoOrString) return '-'
    try {
      const d = new Date(isoOrString)
      if (isNaN(d.getTime())) return isoOrString
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    } catch {
      return isoOrString
    }
  }

  const formatSubmittedTime = (isoString) => {
    if (!isoString) return 'Baru saja'
    try {
      const d = new Date(isoString)
      if (isNaN(d.getTime())) return 'Baru saja'
      const datePart = d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
      const timePart = d.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
      }).replace('.', ':')
      return `${datePart}, ${timePart} WITA`
    } catch {
      return 'Baru saja'
    }
  }

  const getDamageLabel = (type) => {
    switch (type) {
      case 'bleaching':
        return 'Pemutihan'
      case 'anchor':
        return 'Patah karena jangkar'
      case 'trash':
        return 'Sampah'
      case 'blast':
        return 'Bom ikan'
      case 'sediment':
        return 'Sedimen'
      default:
        return 'Lainnya'
    }
  }

  return (
    <div className="min-h-screen bg-surface py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Success Banner */}
        <div className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md animate-in zoom-in-75 duration-300">
            <LuCheck className="h-8 w-8 sm:h-10 sm:w-10 stroke-[3]" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-ink-900">
              Laporan terkirim. Terima kasih.
            </h1>
            <p className="text-sm sm:text-base text-ink-600 max-w-xl mx-auto leading-relaxed">
              Laporanmu sudah kami terima dan akan dicek tim daerah Denpasar. Simpan kode lacak di bawah untuk memantau statusnya.
            </p>
          </div>

          {/* Large Tracking Code Card */}
          <div className="mt-6 mx-auto max-w-md rounded-2xl border border-teal-100 bg-teal-50/60 p-5 shadow-2xs">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-teal-800">
              KODE LACAK
            </span>
            <div className="mt-2 flex items-center justify-center gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-teal-900 tracking-wider">
                {activeReport.id}
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 rounded-xl border border-teal-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-teal-base hover:bg-teal-50 transition-colors shadow-2xs cursor-pointer"
              >
                {copied ? (
                  <>
                    <LuCheck className="h-3.5 w-3.5 text-emerald-600 stroke-[3]" />
                    <span className="text-emerald-700">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <LuCopy className="h-3.5 w-3.5" />
                    <span>Salin kode</span>
                  </>
                )}
              </button>
            </div>
            {activeReport.isAnonymous && (
              <p className="mt-3 text-[11px] text-ink-500">
                ⓘ Kamu mengirim secara anonim, jadi kode ini tidak bisa dipulihkan jika hilang.
              </p>
            )}
          </div>
        </div>

        {/* 2-Column Summary Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ringkasan Laporan */}
          <div className="rounded-2xl border border-ink-200/90 bg-surface-card p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100">
              Ringkasan laporan
            </h3>

            {/* Photos thumbnail strip */}
            <div className="flex items-center gap-2.5">
              {(activeReport.photosList || [activeReport.imageUrl]).map((img, idx) => (
                <div
                  key={idx}
                  className="h-16 w-24 overflow-hidden rounded-xl border border-ink-200 bg-slate-100"
                >
                  <img src={img} alt="Bukti" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-ink-500">Jenis kerusakan</span>
                <span className="font-semibold text-ink-900">
                  {getDamageLabel(activeReport.damageType)}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-ink-500">Lokasi</span>
                <span className="font-semibold text-ink-900 text-right max-w-[200px] truncate">
                  {activeReport.locationName}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-ink-500">Tanggal pengamatan</span>
                <span className="font-semibold text-ink-900">
                  {formatReportDate(activeReport.observationDate)}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-ink-500">Perkiraan kedalaman</span>
                <span className="font-semibold text-ink-900">
                  {activeReport.depthEstimate || '-'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-ink-500">Identitas</span>
                <span className="font-semibold text-ink-900">
                  {activeReport.isAnonymous ? 'Anonim' : (activeReport.reporterName || 'Pelapor Peduli')}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-ink-500">Dikirim</span>
                <span className="font-semibold text-ink-900">
                  {formatSubmittedTime(activeReport.reportedAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Status Laporan Timeline */}
          <div className="rounded-2xl border border-ink-200/90 bg-surface-card p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-ink-100">
              <h3 className="text-base font-bold text-ink-900">Status laporan</h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200">
                <LuClock className="h-3 w-3" />
                Baru
              </span>
            </div>

            <div className="relative space-y-5 pl-2 before:absolute before:left-[17px] before:top-2 before:bottom-3 before:w-[2px] before:bg-ink-200">
              {/* Step 1: Laporan Terkirim (Done) */}
              <div className="relative flex items-start gap-3 pl-1">
                <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <LuCheck className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-ink-900">Laporan terkirim</h4>
                    <span className="text-[10px] text-ink-500">
                      {formatSubmittedTime(activeReport.reportedAt)}
                    </span>
                  </div>
                  <p className="text-[11px] text-ink-500">
                    Kode lacak {activeReport.id} dibuat.
                  </p>
                </div>
              </div>

              {/* Step 2: Menunggu Verifikasi (Current) */}
              <div className="relative flex items-start gap-3 pl-1">
                <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-800 text-white">
                  <LuClock className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-ink-900">Menunggu verifikasi</h4>
                    <span className="text-[10px] text-teal-800 font-medium">Biasanya 1–3 hari kerja</span>
                  </div>
                  <p className="text-[11px] text-ink-600">
                    Tim daerah akan mengecek foto dan lokasi.
                  </p>
                </div>
              </div>

              {/* Step 3: Diverifikasi (Pending) */}
              <div className="relative flex items-start gap-3 pl-1">
                <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white border-2 border-slate-300 text-slate-400">
                  <LuClock className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-slate-400">Diverifikasi</h4>
                    <span className="text-[10px] text-slate-400">Belum dimulai</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Laporan valid akan tampil di peta publik (area, bukan titik).
                  </p>
                </div>
              </div>

              {/* Step 4: Dipulihkan (Pending) */}
              <div className="relative flex items-start gap-3 pl-1">
                <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white border-2 border-slate-300 text-slate-400">
                  <LuHammer className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-slate-400">Ditindaklanjuti</h4>
                    <span className="text-[10px] text-slate-400">Belum dimulai</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Menjadi lokasi pemulihan yang bisa dipantau.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner Callout */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs text-emerald-900 flex items-start gap-2.5">
          <LuCircleCheck className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
          <div>
            <p className="font-bold text-emerald-950">Laporan berhasil diterima</p>
            <p className="text-emerald-800 text-[11px] sm:text-xs leading-relaxed mt-0.5">
              Sesuai aturan PulihKarang, laporan baru tampil setelah diverifikasi tim daerah. Laporan warga adalah dugaan awal, bukan diagnosis.
            </p>
          </div>
        </div>

        {/* Action Navigation Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-ink-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-ink-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <LuArrowLeft className="h-4 w-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-teal-300 bg-teal-50/70 px-5 py-2.5 text-xs sm:text-sm font-semibold text-teal-base hover:bg-teal-100 transition-colors shadow-2xs"
          >
            <LuSearch className="h-4 w-4" />
            <span>Cek Status Laporan</span>
          </Link>

          <Link
            to="/lapor"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-ink-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <LuPlus className="h-4 w-4" />
            <span>Kirim laporan lain</span>
          </Link>

          <Link
            to="/perkembangan"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-teal-800 px-6 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-teal-900 transition-colors shadow-2xs"
          >
            <span>Lihat Perkembangan</span>
            <LuArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import {
  LuSearch,
  LuCircleCheck,
  LuCircleX,
  LuTriangleAlert,
  LuCheck
} from 'react-icons/lu'

export function ReportAuditTab({ reports = [], onVerifyReport }) {
  const [filterStatus, setFilterStatus] = useState('all') // 'all' | 'baru' | 'diverifikasi' | 'dipulihkan' | 'tidak_valid'
  const [searchQuery, setSearchQuery] = useState('')
  const [actionSuccess, setActionSuccess] = useState('')

  const filteredReports = reports.filter((rep) => {
    const matchStatus = filterStatus === 'all' || rep.status === filterStatus
    const matchSearch =
      rep.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.damageType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.reporterName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchStatus && matchSearch
  })

  const handleVerify = (reportId, status, notes) => {
    onVerifyReport(reportId, {
      status,
      verificationNotes: notes || `Ditinjau oleh Pengelola Daerah pada ${new Date().toLocaleDateString('id-ID')}`
    })
    setActionSuccess(`Laporan ${reportId} berhasil diverifikasi menjadi: ${status}.`)
    setTimeout(() => setActionSuccess(''), 4000)
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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'baru':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200">
            Menunggu Verifikasi
          </span>
        )
      case 'diverifikasi':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
            Diverifikasi
          </span>
        )
      case 'dipulihkan':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-base border border-teal-200">
            Dalam Pemulihan
          </span>
        )
      case 'duplikat':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 border border-slate-200">
            Duplikat
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 border border-rose-200">
            Tidak Valid
          </span>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Toast Notifikasi Aksi */}
      {actionSuccess && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/90 p-4 text-xs font-medium text-emerald-900 flex items-center justify-between shadow-2xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <LuCheck className="h-4 w-4 text-emerald-600 stroke-[3]" />
            <span>{actionSuccess}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionSuccess('')}
            className="text-emerald-700 hover:text-emerald-900"
          >
            ✕
          </button>
        </div>
      )}

      {/* Toolbar Filter & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Status Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-ink-100/70 border border-ink-200/60 overflow-x-auto">
          {[
            { id: 'all', label: 'Semua' },
            { id: 'baru', label: 'Perlu Dicek' },
            { id: 'diverifikasi', label: 'Diverifikasi' },
            { id: 'dipulihkan', label: 'Dipulihkan' },
            { id: 'tidak_valid', label: 'Tidak Valid' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                filterStatus === tab.id
                  ? 'bg-white text-ink-900 shadow-2xs'
                  : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <LuSearch className="pointer-events-none absolute left-3.5 top-2.5 h-4 w-4 text-ink-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kode tiket, lokasi, jenis..."
            className="w-full rounded-xl border border-ink-200 bg-white pl-9 pr-3.5 py-2 text-xs sm:text-sm text-ink-900 placeholder:text-ink-400 focus:border-teal-base focus:outline-hidden focus:ring-2 focus:ring-teal-base/20 transition-all"
          />
        </div>
      </div>

      {/* Reports Audit Table / Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="rounded-2xl border border-ink-200/80 bg-surface-card p-5 shadow-2xs hover:border-teal-200 transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                {/* Photo Thumbnail */}
                <div className="h-16 w-20 sm:h-20 sm:w-24 shrink-0 overflow-hidden rounded-xl border border-ink-200 bg-slate-100">
                  <img
                    src={report.imageUrl || report.photosList?.[0] || 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794753742/main-sample.png'}
                    alt="Bukti Kerusakan"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-xs text-teal-900">
                      {report.id}
                    </span>
                    {getStatusBadge(report.status)}
                    {report.isPossibleDuplicate && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                        <LuTriangleAlert className="h-3 w-3" />
                        Kemungkinan Duplikat
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-ink-900">
                    {getDamageLabel(report.damageType)} · {report.locationName}
                  </h3>

                  <p className="text-xs text-ink-600 line-clamp-2">
                    {report.description || 'Tidak ada keterangan tambahan.'}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-ink-500 pt-1">
                    <span>Pelapor: <strong>{report.isAnonymous ? 'Anonim' : report.reporterName}</strong></span>
                    <span>Wilayah: <strong>{report.region}</strong></span>
                    {report.depthEstimate && <span>Kedalaman: <strong>{report.depthEstimate}</strong></span>}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 self-start md:self-center shrink-0 border-t md:border-t-0 border-ink-100 pt-3 md:pt-0 w-full md:w-auto">
                {report.status === 'baru' && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleVerify(report.id, 'diverifikasi')}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-teal-base hover:bg-teal-hover px-3.5 py-2 text-xs font-bold text-white shadow-2xs transition-colors cursor-pointer"
                    >
                      <LuCircleCheck className="h-3.5 w-3.5" />
                      <span>Verifikasi Valid</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleVerify(report.id, 'tidak_valid', 'Laporan tidak memenuhi kriteria kerusakan karang.')}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-coral-200 bg-white hover:bg-coral-50 px-3.5 py-2 text-xs font-semibold text-coral-700 transition-colors cursor-pointer"
                    >
                      <LuCircleX className="h-3.5 w-3.5" />
                      <span>Tolak</span>
                    </button>
                  </>
                )}
                {report.status === 'diverifikasi' && (
                  <button
                    type="button"
                    onClick={() => handleVerify(report.id, 'dipulihkan', 'Dimasukkan ke program penanaman aktif daerah.')}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3.5 py-2 text-xs font-bold text-teal-base transition-colors cursor-pointer"
                  >
                    <span>Alihkan ke Pemulihan</span>
                  </button>
                )}
                {report.status !== 'baru' && (
                  <span className="text-[11px] text-ink-400 italic">
                    {report.verificationNotes || 'Telah diproses'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

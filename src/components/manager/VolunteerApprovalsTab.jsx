import { useState } from 'react'
import {
  LuSearch,
  LuCheck,
  LuX,
  LuPhone,
  LuMail,
  LuCalendar,
  LuBadgeCheck,
  LuClock,
  LuUser
} from 'react-icons/lu'

export function VolunteerApprovalsTab({ volunteers = [], onReview }) {
  const [filterStatus, setFilterStatus] = useState('all') // 'all' | 'menunggu' | 'disetujui' | 'ditolak'
  const [searchQuery, setSearchQuery] = useState('')
  const [reviewNotes, setReviewNotes] = useState('')
  const [actionSuccess, setActionSuccess] = useState('')

  const filteredVolunteers = volunteers.filter((vol) => {
    const matchStatus = filterStatus === 'all' || vol.status === filterStatus
    const matchSearch =
      vol.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vol.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vol.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (vol.regionName && vol.regionName.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchStatus && matchSearch
  })

  const handleAction = (volunteer, newStatus) => {
    onReview(volunteer.id, {
      status: newStatus,
      reviewNotes: reviewNotes || (newStatus === 'disetujui' ? 'Profil memenuhi kualifikasi.' : 'Kapasitas tim saat ini penuh.')
    })
    setReviewNotes('')
    setActionSuccess(`Pendaftaran ${volunteer.fullName} berhasil diubah statusnya menjadi ${newStatus}.`)
    setTimeout(() => setActionSuccess(''), 4000)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'disetujui':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
            <LuBadgeCheck className="h-3 w-3" />
            Disetujui
          </span>
        )
      case 'ditolak':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 border border-rose-200">
            <LuX className="h-3 w-3" />
            Ditolak
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200">
            <LuClock className="h-3 w-3" />
            Menunggu Tinjauan
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
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-ink-100/70 border border-ink-200/60">
          {[
            { id: 'all', label: 'Semua' },
            { id: 'menunggu', label: 'Menunggu' },
            { id: 'disetujui', label: 'Disetujui' },
            { id: 'ditolak', label: 'Ditolak' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
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
            placeholder="Cari nama, email, kecamatan..."
            className="w-full rounded-xl border border-ink-200 bg-white pl-9 pr-3.5 py-2 text-xs sm:text-sm text-ink-900 placeholder:text-ink-400 focus:border-teal-base focus:outline-hidden focus:ring-2 focus:ring-teal-base/20 transition-all"
          />
        </div>
      </div>

      {/* Volunteer List Cards */}
      {filteredVolunteers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-300 bg-surface-card p-12 text-center">
          <LuUser className="mx-auto h-10 w-10 text-ink-300 mb-3" />
          <h3 className="text-sm font-bold text-ink-800">Tidak ada data relawan</h3>
          <p className="mt-1 text-xs text-ink-500">
            Tidak ada pendaftar yang cocok dengan filter atau kata kunci pencarian.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredVolunteers.map((vol) => (
            <div
              key={vol.id}
              className="rounded-2xl border border-ink-200/80 bg-surface-card p-5 sm:p-6 shadow-2xs hover:border-teal-200 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-base sm:text-lg font-bold text-ink-900">
                      {vol.fullName}
                    </h3>
                    {getStatusBadge(vol.status)}
                    <span className="text-[11px] font-mono text-ink-400">
                      {vol.id}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-ink-600">
                    <span className="inline-flex items-center gap-1">
                      <LuMail className="h-3.5 w-3.5 text-ink-400" />
                      {vol.email}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <LuPhone className="h-3.5 w-3.5 text-ink-400" />
                      {vol.phone}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <LuCalendar className="h-3.5 w-3.5 text-ink-400" />
                      {vol.regionName || 'Bali'} {vol.district ? `(${vol.district})` : ''} · Waktu: {vol.availability}
                    </span>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] font-medium text-ink-500">Keahlian:</span>
                    {vol.skills?.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="rounded-lg bg-teal-50 px-2.5 py-0.5 text-[11px] font-semibold text-teal-800 capitalize"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Motivation text */}
                  {vol.motivation && (
                    <div className="rounded-xl bg-ink-50 p-3 text-xs text-ink-700 leading-relaxed mt-2">
                      <span className="font-semibold text-ink-900">Motivasi: </span>
                      &ldquo;{vol.motivation}&rdquo;
                    </div>
                  )}

                  {/* Existing Review Notes if any */}
                  {vol.reviewNotes && (
                    <p className="text-[11px] text-teal-800 font-medium">
                      Catatan Pengelola: {vol.reviewNotes}
                    </p>
                  )}
                </div>

                {/* Quick Action Buttons */}
                <div className="flex lg:flex-col items-center gap-2 self-start lg:self-center shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-ink-100 w-full lg:w-auto">
                  {vol.status === 'menunggu' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleAction(vol, 'disetujui')}
                        className="flex-1 lg:w-36 inline-flex items-center justify-center gap-1.5 rounded-xl bg-teal-base hover:bg-teal-hover px-4 py-2 text-xs font-bold text-white shadow-2xs transition-colors cursor-pointer"
                      >
                        <LuCheck className="h-3.5 w-3.5 stroke-[3]" />
                        <span>Setujui</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAction(vol, 'ditolak')}
                        className="flex-1 lg:w-36 inline-flex items-center justify-center gap-1.5 rounded-xl border border-coral-300 bg-white hover:bg-coral-50 px-4 py-2 text-xs font-semibold text-coral-700 transition-colors cursor-pointer"
                      >
                        <LuX className="h-3.5 w-3.5" />
                        <span>Tolak</span>
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleAction(vol, vol.status === 'disetujui' ? 'ditolak' : 'disetujui')}
                      className="text-xs font-semibold text-teal-base hover:underline"
                    >
                      Ubah ke {vol.status === 'disetujui' ? 'Tolak' : 'Setujui'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

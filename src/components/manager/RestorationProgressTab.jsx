import { useState } from 'react'
import {
  LuPlus,
  LuPercent,
  LuCheck,
  LuExternalLink,
  LuClock,
  LuSparkles,
  LuX
} from 'react-icons/lu'
import { Link } from 'react-router-dom'

export function RestorationProgressTab({ restorationSites = [], onAddInspection, onUpdateSite }) {
  const [selectedSiteId, setSelectedSiteId] = useState(restorationSites[0]?.id || '')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  // Form State
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0])
  const [formAgeDays, setFormAgeDays] = useState('210')
  const [formAliveCount, setFormAliveCount] = useState('')
  const [formDeadCount, setFormDeadCount] = useState('0')
  const [formLostCount, setFormLostCount] = useState('0')
  const [formActivityType, setFormActivityType] = useState('inspection') // inspection | maintenance | replanting
  const [formAuditedBy, setFormAuditedBy] = useState('Data Tim Pelaksana')
  const [formStatus, setFormStatus] = useState('Sedang Dipantau') // Penanaman | Perawatan | Sedang Dipantau | Dipulihkan
  const [formNotes, setFormNotes] = useState('')

  const activeSite = restorationSites.find((s) => s.id === selectedSiteId) || restorationSites[0]

  const handleOpenModal = (site) => {
    setSelectedSiteId(site.id)
    setFormDate(new Date().toISOString().split('T')[0])
    setFormAliveCount(site.aliveCount ? String(site.aliveCount) : String(Math.round((site.totalPlanted || 300) * 0.75)))
    setFormDeadCount(site.deadCount ? String(site.deadCount) : '20')
    setFormLostCount(site.lostCount ? String(site.lostCount) : '10')
    setFormStatus(site.currentStatus || 'Sedang Dipantau')
    setFormAuditedBy(site.auditStatus || 'Data Tim Pelaksana')
    setFormAgeDays(String((site.ageDays || 180) + 30))
    setFormNotes('')
    setIsModalOpen(true)
  }

  const handleSubmitInspection = (e) => {
    e.preventDefault()
    if (!activeSite) return

    const alive = Number(formAliveCount) || 0
    const dead = Number(formDeadCount) || 0
    const lost = Number(formLostCount) || 0

    onAddInspection(activeSite.id, {
      date: formDate,
      ageDays: Number(formAgeDays) || 30,
      aliveCount: alive,
      deadCount: dead,
      lostCount: lost,
      totalPlanted: activeSite.totalPlanted,
      currentStatus: formStatus,
      activityType: formActivityType,
      auditedBy: formAuditedBy,
      notes: formNotes,
      activityTitle:
        formActivityType === 'maintenance'
          ? 'Perawatan Rutin & Pembersihan Alga'
          : formActivityType === 'replanting'
            ? 'Penyulaman Fragmen Karang'
            : `Pemeriksaan Berkala (${formAgeDays} hari)`
    })

    if (onUpdateSite) {
      onUpdateSite(activeSite.id, {
        currentStatus: formStatus,
        status: formStatus,
        auditStatus: formAuditedBy
      })
    }

    setIsModalOpen(false)
    setSuccessMsg(`Data perkembangan karang untuk "${activeSite.name}" berhasil diperbarui dan tersinkronisasi ke halaman publik.`)
    setTimeout(() => setSuccessMsg(''), 5000)
  }

  // Helper survival rate pill color
  const getSurvivalColor = (rate) => {
    if (rate >= 70) return 'text-emerald-700 bg-emerald-50 border-emerald-200'
    if (rate >= 40) return 'text-amber-700 bg-amber-50 border-amber-200'
    return 'text-rose-700 bg-rose-50 border-rose-200'
  }

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {successMsg && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/90 p-4 text-xs font-semibold text-emerald-900 flex items-center justify-between shadow-2xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <LuCheck className="h-4 w-4 text-emerald-600 stroke-[3]" />
            <span>{successMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => setSuccessMsg('')}
            className="text-emerald-700 hover:text-emerald-900 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Info Callout Box */}
      <div className="rounded-2xl border border-teal-200 bg-teal-50/70 p-5 text-xs text-teal-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-base text-white">
            <LuSparkles className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-teal-950">
              Pencatatan & Pembaruan Perkembangan Sains Terbuka
            </h4>
            <p className="text-teal-800 text-[11px] sm:text-xs leading-relaxed mt-0.5 max-w-2xl">
              Perbarui hasil pemantauan karang hidup (<i>survival rate</i>), pembersihan makroalga, atau penambahan fragmen. Data langsung terhubung secara reaktif ke dashboard transparansi publik.
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-teal-base border border-teal-200 shadow-2xs whitespace-nowrap">
          <LuClock className="h-3.5 w-3.5" />
          Realtime LocalStorage
        </span>
      </div>

      {/* Sites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {restorationSites.map((site) => {
          const rate = site.currentSurvivalRate || 70
          const statusColor = getSurvivalColor(rate)

          return (
            <div
              key={site.id}
              className="rounded-2xl border border-ink-200/90 bg-surface-card overflow-hidden shadow-2xs hover:border-teal-300 transition-all flex flex-col justify-between"
            >
              {/* Card Photo Header */}
              <div className="relative h-44 w-full bg-ink-100 overflow-hidden">
                <img
                  src={site.photos?.after || site.imageUrl || 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821343/satu-paragraf-josjis/progress-thriving.png'}
                  alt={site.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 text-ink-900 shadow-xs border border-white/60">
                    {site.regency || site.region || 'Bali'}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold border shadow-xs ${statusColor} bg-white/95`}>
                    <LuPercent className="h-3 w-3" />
                    {rate}% Hidup
                  </span>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink-950/80 via-ink-950/40 to-transparent p-3 pt-6">
                  <p className="text-white text-xs font-semibold">{site.name}</p>
                  <p className="text-teal-200 text-[10px]">{site.publicAreaName || site.region}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-ink-100">
                    <span className="text-ink-500">Status Saat Ini:</span>
                    <span className="font-bold text-ink-900">{site.currentStatus || 'Sedang Dipantau'}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-ink-100">
                    <span className="text-ink-500">Bibit Ditanam:</span>
                    <span className="font-semibold text-ink-900">{site.totalPlanted || 0} fragmen</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-ink-100">
                    <span className="text-ink-500">Kondisi Fragmen:</span>
                    <span className="text-ink-700">
                      <strong className="text-emerald-700">{site.aliveCount ?? Math.round((site.totalPlanted || 0) * (rate / 100))}</strong> hidup · {site.deadCount ?? 0} mati
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-ink-100">
                    <span className="text-ink-500">Umur Tanam:</span>
                    <span className="font-medium text-ink-800">{site.ageDays || 180} hari</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-ink-500">Label Transparansi:</span>
                    <span className="text-[11px] font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md">
                      {site.auditStatus || 'Data Tim Pelaksana'}
                    </span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-ink-100 flex items-center justify-between gap-2">
                  <Link
                    to={`/perkembangan/${site.id}`}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-ink-600 hover:text-teal-base transition-colors"
                  >
                    <span>Halaman Publik</span>
                    <LuExternalLink className="h-3 w-3" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleOpenModal(site)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-teal-base hover:bg-teal-hover px-3 py-1.5 text-xs font-bold text-white shadow-2xs transition-colors cursor-pointer"
                  >
                    <LuPlus className="h-3.5 w-3.5" />
                    <span>Catat Perkembangan</span>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* MODAL UPDATE PERKEMBANGAN */}
      {isModalOpen && activeSite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-ink-200 p-6 shadow-xl space-y-5 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-ink-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-teal-800 uppercase tracking-wider">
                  {activeSite.id} · {activeSite.regency || activeSite.region}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-ink-900 mt-0.5">
                  Update Perkembangan: {activeSite.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 hover:text-ink-700 cursor-pointer"
              >
                <LuX className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitInspection} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Tanggal */}
                <div>
                  <label className="block text-xs font-bold text-ink-800 mb-1">
                    Tanggal Pencatatan
                  </label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full rounded-xl border border-ink-200 bg-white px-3 py-2 text-xs font-medium text-ink-900 focus:border-teal-base focus:outline-hidden"
                  />
                </div>

                {/* Umur Tanam Hari */}
                <div>
                  <label className="block text-xs font-bold text-ink-800 mb-1">
                    Umur Tanam (Hari)
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formAgeDays}
                    onChange={(e) => setFormAgeDays(e.target.value)}
                    className="w-full rounded-xl border border-ink-200 bg-white px-3 py-2 text-xs font-medium text-ink-900 focus:border-teal-base focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Status Pemulihan & Jenis Kegiatan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-ink-800 mb-1">
                    Tahapan Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="w-full rounded-xl border border-ink-200 bg-white px-3 py-2 text-xs font-medium text-ink-900 focus:border-teal-base focus:outline-hidden"
                  >
                    <option value="Penanaman">Penanaman</option>
                    <option value="Perawatan">Perawatan</option>
                    <option value="Sedang Dipantau">Sedang Dipantau</option>
                    <option value="Dipulihkan">Dipulihkan (Selesai)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink-800 mb-1">
                    Jenis Kegiatan
                  </label>
                  <select
                    value={formActivityType}
                    onChange={(e) => setFormActivityType(e.target.value)}
                    className="w-full rounded-xl border border-ink-200 bg-white px-3 py-2 text-xs font-medium text-ink-900 focus:border-teal-base focus:outline-hidden"
                  >
                    <option value="inspection">Pemeriksaan Berkala (Monitoring)</option>
                    <option value="maintenance">Perawatan / Pembersihan Alga</option>
                    <option value="replanting">Penyulaman Fragmen Tambahan</option>
                  </select>
                </div>
              </div>

              {/* Hitungan Fragmen Karang (Sains Terbuka) */}
              <div className="rounded-xl border border-ink-200 bg-ink-50/60 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ink-900">
                      Sensus Fragmen Karang (Total Awal: {activeSite.totalPlanted} bibit)
                    </span>
                    <span className="text-xs font-extrabold text-teal-base">
                      {Math.round(((Number(formAliveCount) || 0) / (activeSite.totalPlanted || 1)) * 1000) / 10}% Karang Hidup
                    </span>
                  </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-emerald-800 mb-1">
                      Hidup
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      max={activeSite.totalPlanted || 1000}
                      value={formAliveCount}
                      onChange={(e) => setFormAliveCount(e.target.value)}
                      placeholder="Jml hidup"
                      className="w-full rounded-lg border border-emerald-300 bg-white px-2.5 py-1.5 text-xs font-bold text-emerald-900 focus:border-emerald-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-rose-800 mb-1">
                      Mati
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formDeadCount}
                      onChange={(e) => setFormDeadCount(e.target.value)}
                      placeholder="Jml mati"
                      className="w-full rounded-lg border border-rose-300 bg-white px-2.5 py-1.5 text-xs font-medium text-rose-900 focus:border-rose-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-ink-600 mb-1">
                      Hilang / Lepas
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formLostCount}
                      onChange={(e) => setFormLostCount(e.target.value)}
                      placeholder="Jml hilang"
                      className="w-full rounded-lg border border-ink-200 bg-white px-2.5 py-1.5 text-xs font-medium text-ink-900 focus:border-teal-base focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Label Transparansi Sumber */}
              <div>
                <label className="block text-xs font-bold text-ink-800 mb-1">
                  Label Transparansi Sumber
                </label>
                <select
                  value={formAuditedBy}
                  onChange={(e) => setFormAuditedBy(e.target.value)}
                  className="w-full rounded-xl border border-ink-200 bg-white px-3 py-2 text-xs font-medium text-ink-900 focus:border-teal-base focus:outline-hidden"
                >
                  <option value="Data Tim Pelaksana">Data Tim Pelaksana (Internal)</option>
                  <option value="Ditinjau pihak lain">Ditinjau Pihak Lain (Independen / Akademisi)</option>
                </select>
              </div>

              {/* Catatan Lapangan */}
              <div>
                <label className="block text-xs font-bold text-ink-800 mb-1">
                  Catatan Lapangan & Rekomendasi
                </label>
                <textarea
                  rows="3"
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Contoh: Pembersihan alga makro berhasil dilakukan, pertumbuhan fragmen Acropora stabil, substrat tidak goyang."
                  className="w-full rounded-xl border border-ink-200 bg-white p-3 text-xs text-ink-900 placeholder:text-ink-400 focus:border-teal-base focus:outline-hidden"
                />
              </div>

              {/* Form Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-ink-200 text-xs font-semibold text-ink-700 hover:bg-ink-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-base hover:bg-teal-hover text-xs font-bold text-white shadow-2xs cursor-pointer transition-colors"
                >
                  Simpan Pembaruan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

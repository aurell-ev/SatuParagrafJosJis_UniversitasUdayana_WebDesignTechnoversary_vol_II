import { useState } from 'react'
import {
  LuShieldCheck,
  LuLock,
  LuFileCheck,
  LuExternalLink,
  LuPercent
} from 'react-icons/lu'
import { Link } from 'react-router-dom'

export function DataTransparencyTab({ restorationSites = [] }) {
  const [auditFilter, setAuditFilter] = useState('all')

  const filteredSites = restorationSites.filter((site) => {
    if (auditFilter === 'audited') {
      return site.inspections?.some((i) => i.auditedBy && i.auditedBy.toLowerCase().includes('ditinjau'))
    }
    if (auditFilter === 'internal') {
      return site.inspections?.every((i) => !i.auditedBy || i.auditedBy.toLowerCase().includes('tim'))
    }
    return true
  })

  return (
    <div className="space-y-6">
      {/* Banner Prinsip Kerahasiaan Koordinat Presisi */}
      <div className="rounded-2xl border border-teal-200 bg-teal-50/70 p-5 text-xs text-teal-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-base text-white">
            <LuLock className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-teal-950">
              Protokol Perlindungan Koordinat Presisi Terumbu Karang
            </h4>
            <p className="text-teal-800 text-[11px] sm:text-xs leading-relaxed mt-0.5 max-w-2xl">
              Sesuai aturan baku PulihKarang, koordinat titik tanam GPS presisi <strong>TIDAK PERNAH</strong> dibuka ke publik guna mencegah eksploitasi dan penjarahan fragmen karang muda. Publik hanya melihat nama area / desa umum.
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-teal-base border border-teal-200 whitespace-nowrap shadow-2xs">
          <LuShieldCheck className="h-3.5 w-3.5" />
          Privasi Aktif
        </span>
      </div>

      {/* Audit Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-ink-100/70 border border-ink-200/60">
          {[
            { id: 'all', label: 'Semua Lokasi Restorasi' },
            { id: 'audited', label: 'Telah Ditinjau Independen' },
            { id: 'internal', label: 'Data Tim Pelaksana' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setAuditFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                auditFilter === tab.id
                  ? 'bg-white text-ink-900 shadow-2xs'
                  : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-ink-500">
          Menampilkan <strong>{filteredSites.length}</strong> lokasi pemulihan
        </div>
      </div>

      {/* Sites Audit Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSites.map((site) => {
          const latestInspection = site.inspections?.[site.inspections.length - 1]
          const isAudited = latestInspection?.auditedBy && latestInspection.auditedBy.toLowerCase().includes('ditinjau')

          return (
            <div
              key={site.id}
              className="rounded-2xl border border-ink-200/90 bg-surface-card p-5 shadow-2xs space-y-4 hover:border-teal-200 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono text-ink-400 uppercase tracking-wider">
                    {site.id} · {site.region}
                  </span>
                  <h3 className="text-base font-bold text-ink-900 mt-0.5">
                    {site.name}
                  </h3>
                  <p className="text-xs text-ink-500 mt-0.5">
                    Peta Publik: <span className="font-medium text-ink-700">{site.publicAreaName || site.region}</span>
                  </p>
                </div>

                {/* Survival rate pill */}
                <div className="text-right">
                  <div className="inline-flex items-center gap-1 rounded-xl bg-teal-50 px-2.5 py-1 text-xs font-extrabold text-teal-base border border-teal-200">
                    <LuPercent className="h-3 w-3" />
                    <span>{site.currentSurvivalRate || 85}% Hidup</span>
                  </div>
                  <span className="block text-[10px] text-ink-400 mt-0.5">
                    {site.currentStatus || 'Tumbuh Baik'}
                  </span>
                </div>
              </div>

              {/* Data Transparency details */}
              <div className="rounded-xl border border-ink-100 bg-ink-50/50 p-3 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-ink-500">Sumber Label Publik:</span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-[11px] ${
                      isAudited
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}
                  >
                    <LuFileCheck className="h-3 w-3" />
                    {latestInspection?.auditedBy || 'Data Tim Pelaksana'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-ink-500">Bibit Ditanam:</span>
                  <span className="font-semibold text-ink-800">
                    {site.totalPlanted || 0} fragmen ({site.method || 'Spider Web'})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-ink-500">Koordinat Presisi (Internal Only):</span>
                  <span className="font-mono text-[11px] text-ink-600 bg-white px-2 py-0.5 rounded-md border border-ink-200">
                    {site.privateCoordinates
                      ? `${site.privateCoordinates.lat}, ${site.privateCoordinates.lng}`
                      : '-8.6912, 115.2635'}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-ink-100 text-xs">
                <span className="text-ink-500">
                  {site.inspections?.length || 0} riwayat monitoring
                </span>
                <Link
                  to={`/perkembangan/${site.id}`}
                  className="inline-flex items-center gap-1 font-bold text-teal-base hover:underline"
                >
                  <span>Lihat Detail Publik</span>
                  <LuExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

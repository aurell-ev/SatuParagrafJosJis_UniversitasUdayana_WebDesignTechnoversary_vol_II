import { LuFileText, LuMapPin, LuSprout, LuActivity, LuInfo } from 'react-icons/lu'
import { useData } from '../../context/useAppContext'

/**
 * Section 2: Angka Ringkas
 * Sesuai desain Figma node 1150:1553 (Angka Ringkas)
 */
export function StatCardsSection() {
  const { stats } = useData()

  // Sesuai desain Figma 1150:1553: angka prototipe + sinkronisasi dinamis dari state
  const totalReportsCount = 245 + (stats?.totalReports || 0)
  const activeSitesCount = 34 + (stats?.activeSites || 0)
  const totalPlantedCount = 4070 + (stats?.totalPlanted || 0)
  const avgSurvivalPercent = stats?.avgSurvivalRate ? Math.round(stats.avgSurvivalRate) : 71

  const statItems = [
    {
      id: 'reports',
      icon: LuFileText,
      value: totalReportsCount.toLocaleString('id-ID'),
      label: 'Laporan masuk',
      subtext: 'Dari 4 daerah, 2025–2026'
    },
    {
      id: 'sites',
      icon: LuMapPin,
      value: activeSitesCount.toString(),
      label: 'Lokasi pemulihan',
      subtext: 'Dibuat dari laporan valid'
    },
    {
      id: 'fragments',
      icon: LuSprout,
      value: totalPlantedCount.toLocaleString('id-ID'),
      label: 'Fragmen ditanam',
      subtext: 'Tercatat oleh tim daerah'
    },
    {
      id: 'survival',
      icon: LuActivity,
      value: `${avgSurvivalPercent}%`,
      label: 'Rata-rata masih hidup',
      subtext: 'Dari pemeriksaan terakhir'
    }
  ]

  return (
    <section className="border-y border-slate-200/80 bg-slate-50/80 py-12 lg:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* 4 Stat Cards (282x210px di desktop) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs transition-shadow hover:shadow-md"
              >
                <div>
                  {/* Ikon Wadah 48x48 bg-teal-50 text-teal-base */}
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-base">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Angka (36px / ExtraBold / text-ink-900 / tracking -0.36px) */}
                  <p className="text-3xl font-extrabold tracking-[-0.36px] text-ink-900 lg:text-4xl">
                    {item.value}
                  </p>

                  {/* Label (16px / SemiBold 600 / text-ink-900) */}
                  <p className="mt-1 text-base font-semibold text-ink-900">
                    {item.label}
                  </p>

                  {/* Keterangan (14px / Regular 400 / text-ink-600) */}
                  <p className="mt-1 text-sm text-ink-600">
                    {item.subtext}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Disclaimer Baris Bawah */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-ink-500">
          <LuInfo className="h-4 w-4 shrink-0 text-teal-base" />
          <span>
            Data diperbarui berkala dari laporan publik dan kegiatan restorasi mitra di lapangan.
          </span>
        </div>
      </div>
    </section>
  )
}

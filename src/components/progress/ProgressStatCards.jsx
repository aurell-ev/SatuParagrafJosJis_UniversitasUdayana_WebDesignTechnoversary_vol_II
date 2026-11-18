import { LuMapPin, LuSprout, LuActivity, LuBadgeCheck } from 'react-icons/lu'

export function ProgressStatCards({ stats }) {
  const cards = [
    {
      value: stats?.totalLocations || 36,
      label: 'Lokasi pemulihan',
      sublabel: 'Di 4 daerah',
      icon: LuMapPin
    },
    {
      value: stats?.totalFragments ? stats.totalFragments.toLocaleString('id-ID') : '4.820',
      label: 'Fragmen ditanam',
      sublabel: 'Sejak Mei 2025',
      icon: LuSprout
    },
    {
      value: `${stats?.avgSurvivalRate || 71}%`,
      label: 'Rata-rata masih hidup',
      sublabel: 'Pemeriksaan terakhir',
      icon: LuActivity
    },
    {
      value: stats?.auditedCount || 14,
      label: 'Lokasi ditinjau pihak lain',
      sublabel: `Dari ${stats?.totalLocations || 36} lokasi`,
      icon: LuBadgeCheck
    }
  ]

  return (
    <div className="w-full" data-node-id="1155:3266" data-name="Angka">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon
          return (
            <div
              key={idx}
              className="bg-white border border-teal-200 rounded-2xl p-6 flex flex-col gap-4 items-start shadow-xs hover:shadow-md transition-shadow"
              data-node-id="1155:3226"
              data-name="Stat Card"
            >
              {/* Ikon Wadah 48x48 rounded-xl bg-teal-50 (Figma node I1155:3226;1147:1162) */}
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 text-teal-base">
                <Icon className="h-6 w-6 stroke-[2]" />
              </div>

              {/* Isi: Angka, Label, Keterangan (Figma node I1155:3226;1147:1166) */}
              <div className="flex flex-col gap-1 items-start">
                <span className="text-4xl font-extrabold text-ink-900 tracking-[-0.36px] leading-[1.2]">
                  {card.value}
                </span>
                <span className="text-base font-semibold text-ink-900 leading-[1.5]">
                  {card.label}
                </span>
                <span className="text-sm font-normal text-slate-600 leading-[1.5]">
                  {card.sublabel}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

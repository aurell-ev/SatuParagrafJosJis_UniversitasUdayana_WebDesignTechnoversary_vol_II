import { LuSun, LuAnchor, LuTrash2, LuFlame, LuMountain, LuEllipsis, LuCheck } from 'react-icons/lu'

const DAMAGE_TYPES = [
  {
    id: 'bleaching',
    name: 'Pemutihan',
    desc: 'Karang memucat atau putih',
    icon: LuSun,
    badgeBg: 'bg-amber-50 text-amber-700'
  },
  {
    id: 'anchor',
    name: 'Patah karena jangkar',
    desc: 'Pecahan & bekas serat',
    icon: LuAnchor,
    badgeBg: 'bg-teal-50 text-teal-700'
  },
  {
    id: 'trash',
    name: 'Sampah',
    desc: 'Plastik, jaring, tali',
    icon: LuTrash2,
    badgeBg: 'bg-rose-50 text-rose-700'
  },
  {
    id: 'blast',
    name: 'Bom ikan',
    desc: 'Hancur puing karang',
    icon: LuFlame,
    badgeBg: 'bg-orange-50 text-orange-700'
  },
  {
    id: 'sediment',
    name: 'Sedimen',
    desc: 'Tertutup lumpur/pasir',
    icon: LuMountain,
    badgeBg: 'bg-amber-50 text-amber-800'
  },
  {
    id: 'other',
    name: 'Lainnya',
    desc: 'Jelaskan di keterangan',
    icon: LuEllipsis,
    badgeBg: 'bg-slate-50 text-slate-700'
  }
]

export function DamageTypeSelector({ selectedType, onSelectType }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {DAMAGE_TYPES.map((type) => {
        const isSelected = selectedType === type.id
        const Icon = type.icon

        return (
          <div
            key={type.id}
            onClick={() => onSelectType(type.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelectType(type.id)
              }
            }}
            className={`relative flex flex-col justify-between p-4 rounded-2xl border transition-all cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base ${
              isSelected
                ? 'border-teal-base bg-teal-50/70 shadow-xs ring-1 ring-teal-base/30'
                : 'border-ink-200 bg-white hover:border-teal-300 hover:bg-slate-50/70'
            }`}
          >
            {/* Top row: Icon + Radio check */}
            <div className="flex items-center justify-between">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                  isSelected ? 'bg-teal-base text-white' : 'bg-teal-50 text-teal-base'
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* Radio Indicator */}
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                  isSelected
                    ? 'border-teal-base bg-teal-base text-white'
                    : 'border-ink-300 bg-white'
                }`}
              >
                {isSelected && <LuCheck className="h-3.5 w-3.5 stroke-[3]" />}
              </div>
            </div>

            {/* Label & Description */}
            <div className="mt-2.5 sm:mt-3">
              <h4 className="text-xs sm:text-sm font-bold text-ink-900 leading-snug">{type.name}</h4>
              <p className="mt-0.5 text-[11px] sm:text-xs text-ink-500 leading-normal">{type.desc}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

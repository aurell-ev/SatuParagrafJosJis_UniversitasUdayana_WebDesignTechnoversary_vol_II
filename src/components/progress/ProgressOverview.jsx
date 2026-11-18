import { BaliLeafletMap } from './BaliLeafletMap'

export function ProgressOverview({
  regions = [],
  locations = [],
  selectedRegion = null,
  onSelectRegion
}) {
  const regionStats = [
    {
      name: 'Denpasar',
      locationsText: '12 lokasi · 1.640 fragmen',
      survivalRate: 68
    },
    {
      name: 'Klungkung',
      locationsText: '9 lokasi · 1.210 fragmen',
      survivalRate: 62
    },
    {
      name: 'Buleleng',
      locationsText: '10 lokasi · 1.380 fragmen',
      survivalRate: 81
    },
    {
      name: 'Karangasem',
      locationsText: '5 lokasi · 590 fragmen',
      survivalRate: 74
    }
  ]

  return (
    <div
      className="bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col lg:flex-row items-stretch w-full shadow-xs"
      data-node-id="1155:3332"
      data-name="Ikhtisar"
    >
      {/* Sisi Kiri: Peta Bali (Figma node 1199:18113 - w: 788px) */}
      <div className="w-full lg:w-[788px] h-[440px] sm:h-[480px] lg:h-[512px] shrink-0 relative overflow-hidden">
        <BaliLeafletMap
          regions={regions}
          locations={locations}
          selectedRegion={selectedRegion}
          onSelectRegion={onSelectRegion}
        />
      </div>

      {/* Sisi Kanan: Ringkasan Daerah (Figma node 1155:3331 - w: 410px) */}
      <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200 bg-white min-h-[440px] lg:min-h-[512px]">
        <div className="flex flex-col h-full">
          {/* Judul & Subjudul */}
          <div className="shrink-0 pb-1">
            <h3 className="text-lg font-bold text-ink-900 leading-[1.4]" data-node-id="1155:3328">
              Ringkasan per daerah
            </h3>
            <p className="text-sm font-normal text-slate-500 leading-[1.5] mt-1" data-node-id="1155:3329">
              Rata-rata persen hidup, pemeriksaan terakhir
            </p>
          </div>

          {/* Daftar 4 Daerah (Scrollable Container, Lega & Rapi) */}
          <div className="mt-4 flex-1 overflow-y-auto max-h-[360px] lg:max-h-[385px] pr-1.5 space-y-3 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300">
            {regionStats.map((reg) => {
              const isSelected = selectedRegion && selectedRegion.toLowerCase() === reg.name.toLowerCase()
              return (
                <div
                  key={reg.name}
                  onClick={() => onSelectRegion(isSelected ? null : reg.name)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50/90 border-teal-400 ring-2 ring-teal-200 shadow-xs'
                      : 'bg-white border-slate-200/90 hover:border-teal-300 hover:bg-slate-50/80 shadow-2xs'
                  }`}
                  data-node-id="1155:3303"
                >
                  <div className="flex items-center justify-between gap-3 leading-[1.4]">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-base text-ink-900">
                          {reg.name}
                        </h4>
                        {isSelected && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-600 text-white px-2 py-0.5 rounded-full">
                            Dipilih
                          </span>
                        )}
                      </div>
                      <p className="font-normal text-xs text-slate-500 mt-1">
                        {reg.locationsText}
                      </p>
                    </div>
                    <span className="font-extrabold text-xl text-ink-900 shrink-0">
                      {reg.survivalRate}%
                    </span>
                  </div>

                  {/* Progress Bar (Figma node 1155:3302) */}
                  <div className="bg-slate-100 h-2.5 rounded-full w-full mt-3 overflow-hidden">
                    <div
                      className="bg-secondary-500 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${reg.survivalRate}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer Ringkasan (Keterangan Filter Aktif & Reset) */}
        {selectedRegion && (
          <div className="pt-3.5 mt-3 border-t border-slate-100 flex items-center justify-between text-xs shrink-0">
            <span className="text-teal-800 font-semibold">Filter aktif: {selectedRegion}</span>
            <button
              type="button"
              onClick={() => onSelectRegion(null)}
              className="text-slate-500 hover:text-slate-800 underline font-medium cursor-pointer"
            >
              Reset filter
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

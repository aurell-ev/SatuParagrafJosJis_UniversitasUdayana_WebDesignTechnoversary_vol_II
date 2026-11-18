import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { CustomSelect } from '../../common/CustomSelect'

export function ProgressDetailChart({ location }) {
  const shouldReduceMotion = useReducedMotion()
  const [activeGenus, setActiveGenus] = useState('all')
  const [activePoint, setActivePoint] = useState(null)

  // Data poin grafik (default sesuai Figma node 1155:4200)
  const defaultHistory = [
    { day: 0, label: '0 hr', rate: 100 },
    { day: 30, label: '30 hr', rate: 92 },
    { day: 60, label: '60 hr', rate: 84 },
    { day: 90, label: '90 hr', rate: 78 },
    { day: 120, label: '120 hr', rate: 71 },
    { day: 150, label: '150 hr', rate: 70 },
    { day: 180, label: '180 hr', rate: 68 }
  ]

  const points = location?.growthHistory?.length ? location.growthHistory : defaultHistory

  // SVG Chart Dimensions
  const width = 720
  const height = 240
  const paddingLeft = 45
  const paddingRight = 30
  const paddingTop = 20
  const paddingBottom = 40

  const chartW = width - paddingLeft - paddingRight
  const chartH = height - paddingTop - paddingBottom

  // Koordinat Poin (X, Y)
  const maxDay = points[points.length - 1].day || 180
  const coords = points.map((p) => {
    const x = paddingLeft + (p.day / maxDay) * chartW
    // Y: 0% di bawah, 100% di atas
    const y = paddingTop + (1 - p.rate / 100) * chartH
    return { ...p, x, y }
  })

  // Bangun SVG Path kurva halus (Monotone Cubic Bezier)
  const buildSmoothPath = (pts) => {
    if (pts.length < 2) return ''
    let d = `M ${pts[0].x} ${pts[0].y}`
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i]
      const p1 = pts[i + 1]
      const mx = (p0.x + p1.x) / 2
      d += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`
    }
    return d
  }

  const linePath = buildSmoothPath(coords)
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${paddingTop + chartH} L ${coords[0].x} ${paddingTop + chartH} Z`

  // Grid lines
  const gridLevels = [100, 75, 50, 25, 0]

  return (
    <div 
      className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 flex flex-col gap-6 shadow-2xs"
      data-node-id="1155:4200"
    >
      {/* Header Grafik & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5 max-w-lg">
          <div className="flex items-center gap-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200/70">
              {location?.ageDays ? `${location.ageDays} Hari Pemantauan` : '180 Hari Pemantauan'}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-ink-900 leading-snug">
            Persentase hidup menurut umur tanam
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            Dihitung dari fragmen yang diamati pada tiap pemeriksaan berkala.
          </p>
        </div>

        {/* Filter Genus Dropdown (Figma node 1155:4200) */}
        <div className="shrink-0 min-w-[210px]">
          <CustomSelect
            id="genus-filter"
            size="sm"
            value={activeGenus}
            onChange={(e) => setActiveGenus(e.target.value)}
            options={[
              { value: 'all', label: 'Semua fragmen (Agregat)' },
              ...(location?.coralGenera || []).map((g) => ({ value: g, label: g }))
            ]}
            aria-label="Filter Genus Karang"
          />
        </div>
      </div>

      {/* Area Grafik SVG */}
      <div className="relative w-full overflow-x-auto overflow-y-hidden pt-2 scrollbar-none">
        <div className="min-w-[560px]">
          <svg 
            viewBox={`0 0 ${width} ${height}`} 
            className="w-full h-auto overflow-visible select-none"
            aria-label="Grafik kelangsungan hidup karang seiring waktu"
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0d9488" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#0d9488" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Lines & Y-Axis Labels */}
            {gridLevels.map((lvl) => {
              const y = paddingTop + (1 - lvl / 100) * chartH
              return (
                <g key={lvl}>
                  <line
                    x1={paddingLeft}
                    y1={y}
                    x2={width - paddingRight}
                    y2={y}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                    strokeDasharray={lvl === 0 ? '0' : '4 4'}
                  />
                  <text
                    x={paddingLeft - 8}
                    y={y + 4}
                    textAnchor="end"
                    className="text-[11px] font-semibold fill-slate-400 font-sans"
                  >
                    {lvl}%
                  </text>
                </g>
              )
            })}

            {/* Area Gradient di bawah kurva */}
            <motion.path
              d={areaPath}
              fill="url(#chartGradient)"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: shouldReduceMotion ? 0 : 0.4 }}
            />

            {/* Garis Tren Utama */}
            <motion.path
              d={linePath}
              fill="none"
              stroke="#0d9488"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
            />

            {/* Titik-Titik Data & X-Axis Labels */}
            {coords.map((p, idx) => {
              const isHovered = activePoint?.day === p.day
              return (
                <g 
                  key={idx}
                  className="cursor-pointer group"
                  onMouseEnter={() => setActivePoint(p)}
                  onMouseLeave={() => setActivePoint(null)}
                >
                  {/* Invisible Hitbox untuk kemudahan hover di mobile / desktop */}
                  <circle cx={p.x} cy={p.y} r="16" fill="transparent" />

                  {/* Outer Pulsing Ring saat di-hover */}
                  {isHovered && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="9"
                      fill="#0d9488"
                      opacity="0.3"
                      className="animate-ping"
                    />
                  )}

                  {/* Lingkaran Titik Utama */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isHovered ? 6.5 : 5}
                    fill="#ffffff"
                    stroke="#0d9488"
                    strokeWidth={isHovered ? 3.5 : 2.5}
                    className="transition-all duration-150"
                  />

                  {/* Label X-Axis (0 hr, 30 hr, dst) */}
                  <text
                    x={p.x}
                    y={paddingTop + chartH + 20}
                    textAnchor="middle"
                    className={`text-[11px] font-medium font-sans ${isHovered ? 'fill-teal-700 font-bold' : 'fill-slate-500'}`}
                  >
                    {p.label}
                  </text>
                </g>
              )
            })}

            {/* Floating Tooltip saat titik aktif */}
            {activePoint && (
              <g 
                transform={`translate(${Math.min(Math.max(activePoint.x - 45, 10), width - 100)}, ${activePoint.y - 48})`}
                className="pointer-events-none transition-transform duration-100"
              >
                <rect
                  width="90"
                  height="40"
                  rx="8"
                  fill="#0f172a"
                  className="shadow-lg"
                />
                <text x="45" y="16" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-medium font-sans">
                  {activePoint.day} hari
                </text>
                <text x="45" y="31" textAnchor="middle" fill="#ffffff" className="text-[12px] font-extrabold font-sans">
                  {activePoint.rate}% hidup
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  )
}

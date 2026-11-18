import { motion, useReducedMotion } from 'motion/react'

export function ProgressDetailFragments({ location }) {
  const shouldReduceMotion = useReducedMotion()
  const total = location?.totalPlanted || 420
  const alive = location?.aliveCount ?? 286
  const dead = location?.deadCount ?? 72
  const lost = location?.lostCount ?? 34
  const unobserved = location?.unobservedCount ?? 28

  const alivePct = ((alive / total) * 100).toFixed(1)
  const deadPct = ((dead / total) * 100).toFixed(1)
  const lostPct = ((lost / total) * 100).toFixed(1)
  const unobservedPct = ((unobserved / total) * 100).toFixed(1)

  const items = [
    {
      id: 'alive',
      label: 'Hidup',
      count: alive,
      pct: alivePct,
      color: 'bg-emerald-600',
      dotColor: 'bg-emerald-600',
      textColor: 'text-emerald-700'
    },
    {
      id: 'dead',
      label: 'Mati',
      count: dead,
      pct: deadPct,
      color: 'bg-rose-500',
      dotColor: 'bg-rose-500',
      textColor: 'text-rose-700'
    },
    {
      id: 'lost',
      label: 'Hilang',
      count: lost,
      pct: lostPct,
      color: 'bg-amber-500',
      dotColor: 'bg-amber-500',
      textColor: 'text-amber-700'
    },
    {
      id: 'unobserved',
      label: 'Belum diamati',
      count: unobserved,
      pct: unobservedPct,
      color: 'bg-slate-300',
      dotColor: 'bg-slate-400',
      textColor: 'text-slate-600'
    }
  ]

  return (
    <div 
      className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 flex flex-col gap-5 shadow-2xs"
      data-node-id="1155:4294"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h3 className="text-lg sm:text-xl font-bold text-ink-900 leading-snug">
          Kondisi fragmen · pemeriksaan terakhir
        </h3>
        <span className="text-xs text-slate-500 font-medium">
          Total {total.toLocaleString('id-ID')} fragmen termonitor
        </span>
      </div>

      {/* Horizontal Stacked Bar */}
      <div className="h-4 w-full rounded-full bg-slate-100 flex overflow-hidden shadow-inner">
        {items.map((it) => (
          <motion.div
            key={it.id}
            initial={shouldReduceMotion ? { width: `${it.pct}%` } : { width: 0 }}
            whileInView={{ width: `${it.pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={`${it.color} h-full first:rounded-l-full last:rounded-r-full hover:opacity-90 relative group`}
            title={`${it.label}: ${it.count} fragmen (${it.pct}%)`}
          />
        ))}
      </div>

      {/* 4 Kartu Legenda Rincian */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-1">
        {items.map((it, idx) => (
          <motion.div
            key={it.id}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{
              duration: 0.35,
              delay: shouldReduceMotion ? 0 : 0.2 + idx * 0.08,
              ease: [0.21, 0.47, 0.32, 0.98]
            }}
            className="p-3.5 sm:p-4 rounded-2xl border border-slate-100 bg-slate-50/60 flex flex-col gap-1.5 transition-colors hover:bg-slate-50"
          >
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${it.dotColor} shrink-0`} />
              <span className="text-xs font-semibold text-slate-600">
                {it.label}
              </span>
            </div>

            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight leading-none">
                {it.count}
              </span>
              <span className="text-xs font-medium text-slate-500">
                fragmen
              </span>
            </div>

            <span className="text-[11px] font-semibold text-slate-500">
              {it.pct}% dari total
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

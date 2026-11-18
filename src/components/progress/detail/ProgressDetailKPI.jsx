import { motion, useReducedMotion } from 'motion/react'
import { LuSprout, LuActivity, LuCalendar, LuClipboardCheck } from 'react-icons/lu'

export function ProgressDetailKPI({ location }) {
  const shouldReduceMotion = useReducedMotion()

  const cards = [
    {
      icon: LuSprout,
      value: location?.totalPlanted ? location.totalPlanted.toLocaleString('id-ID') : '420',
      label: 'Fragmen ditanam',
      sublabel: location?.plantedAt ? new Date(location.plantedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '18 Mei 2026'
    },
    {
      icon: LuActivity,
      value: location?.currentSurvivalRate ? `${location.currentSurvivalRate}%` : '68%',
      label: 'Masih hidup',
      sublabel: location?.aliveCount && location?.totalPlanted ? `${location.aliveCount} dari ${location.totalPlanted} fragmen` : '286 dari 420 fragmen'
    },
    {
      icon: LuCalendar,
      value: location?.ageDays ? `${location.ageDays} hari` : '180 hari',
      label: 'Umur tanam',
      sublabel: 'Sejak penanaman'
    },
    {
      icon: LuClipboardCheck,
      value: location?.inspectionCount ? `${location.inspectionCount} kali` : (location?.inspections?.length ? `${location.inspections.length} kali` : '6 kali'),
      label: 'Pemeriksaan',
      sublabel: location?.updatedAtLabel ? `Terakhir ${location.updatedAtLabel}` : 'Terakhir 11 Nov 2026'
    }
  ]

  return (
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full"
      data-node-id="1155:4291"
    >
      {cards.map((c, i) => {
        const Icon = c.icon
        return (
          <motion.div
            key={i}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{
              duration: 0.4,
              delay: shouldReduceMotion ? 0 : i * 0.1,
              ease: [0.21, 0.47, 0.32, 0.98]
            }}
            className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col gap-4 shadow-2xs hover:shadow-xs transition-shadow"
            data-node-id="1155:4054"
          >
            {/* Ikon Wadah 48x48 bg-teal-50 */}
            <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 text-teal-base">
              <Icon className="h-6 w-6 stroke-[2]" />
            </div>

            {/* Isi Angka & Keterangan */}
            <div className="flex flex-col gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight leading-none">
                {c.value}
              </span>
              <span className="text-base font-bold text-ink-900 mt-1">
                {c.label}
              </span>
              <span className="text-sm font-normal text-slate-500">
                {c.sublabel}
              </span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

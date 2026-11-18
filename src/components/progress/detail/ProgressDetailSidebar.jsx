import { motion, useReducedMotion } from 'motion/react'
import { LuBadgeCheck, LuCircleCheck, LuClock, LuFileText, LuHammer, LuSprout } from 'react-icons/lu'

export function ProgressDetailSidebar({ location }) {
  const shouldReduceMotion = useReducedMotion()
  // Timeline riwayat kegiatan (default sesuai Figma node 1155:4290)
  const defaultTimeline = [
    {
      id: 'act-6',
      title: 'Pemeriksaan ke-6',
      date: '11 Nov 2026',
      description: '286 hidup, 72 mati, 34 hilang, 28 belum diamati.',
      icon: LuCircleCheck,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
    },
    {
      id: 'act-5',
      title: 'Perawatan',
      date: '28 Okt 2026',
      description: 'Pembersihan alga dan sampah di rangka.',
      icon: LuHammer,
      color: 'text-amber-600 bg-amber-50 border-amber-200'
    },
    {
      id: 'act-4',
      title: 'Pemeriksaan ke-5',
      date: '12 Okt 2026',
      description: '70% hidup pada umur 150 hari.',
      icon: LuClock,
      color: 'text-teal-600 bg-teal-50 border-teal-200'
    },
    {
      id: 'act-3',
      title: 'Penanaman',
      date: '18 Mei 2026',
      description: '420 fragmen ditanam pada 14 rangka.',
      icon: LuSprout,
      color: 'text-sky-600 bg-sky-50 border-sky-200'
    },
    {
      id: 'act-2',
      title: 'Laporan diverifikasi',
      date: '9 Mei 2026',
      description: 'Laporan warga dicek tim daerah.',
      icon: LuFileText,
      color: 'text-slate-600 bg-slate-100 border-slate-200'
    }
  ]

  const timeline = location?.activityTimeline?.length ? location.activityTimeline.map((item) => {
    let Icon = LuCircleCheck
    let color = 'text-emerald-600 bg-emerald-50 border-emerald-200'
    if (item.type === 'maintenance') {
      Icon = LuHammer
      color = 'text-amber-600 bg-amber-50 border-amber-200'
    } else if (item.type === 'planting') {
      Icon = LuSprout
      color = 'text-sky-600 bg-sky-50 border-sky-200'
    } else if (item.type === 'verification') {
      Icon = LuFileText
      color = 'text-slate-600 bg-slate-100 border-slate-200'
    }
    return { ...item, icon: Icon, color }
  }) : defaultTimeline

  const infoRows = [
    { label: 'Metode', value: location?.method || 'Rangka besi (metode tim)' },
    { label: 'Tim pelaksana', value: location?.teamName || `Tim Restorasi ${location?.regency || 'Daerah'}` },
    { label: 'Mulai tanam', value: location?.plantedAt ? new Date(location.plantedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '18 Mei 2026' },
    { label: 'Laporan asal', value: location?.sourceReport || `${location?.reportId || 'PK-2605-0117'} · Kerusakan Karang` },
    { label: 'Pembaruan', value: location?.updatedAtLabel ? location.updatedAtLabel.replace('Diperbarui ', '') : '11 Nov 2026' }
  ]

  return (
    <div 
      className="flex flex-col gap-6 w-full"
      data-node-id="1155:4290"
    >
      {/* 1. Kotak Informasi Lokasi */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 flex flex-col gap-4 shadow-2xs">
        <h3 className="text-lg font-bold text-ink-900 leading-snug">
          Informasi lokasi
        </h3>

        <div className="divide-y divide-slate-100">
          {infoRows.map((row, idx) => (
            <div key={idx} className="py-3 flex flex-col gap-0.5 first:pt-1 last:pb-1">
              <span className="text-xs font-semibold text-slate-400">
                {row.label}
              </span>
              <span className="text-sm font-semibold text-ink-900">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Kotak Riwayat Kegiatan (Vertical Timeline) */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 flex flex-col gap-5 shadow-2xs">
        <h3 className="text-lg font-bold text-ink-900 leading-snug">
          Riwayat kegiatan
        </h3>

        <div className="relative flex flex-col pl-2">
          {timeline.map((step, idx) => {
            const Icon = step.icon || LuCircleCheck
            const isLast = idx === timeline.length - 1
            return (
              <motion.div
                key={step.id || idx}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -12 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{
                  duration: 0.35,
                  delay: shouldReduceMotion ? 0 : idx * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                className="relative flex items-start gap-4 pb-6 last:pb-1 group"
              >
                {/* Garis vertikal penghubung */}
                {!isLast && (
                  <div className="absolute left-[13px] top-[26px] bottom-0 w-[2px] bg-slate-200" />
                )}

                {/* Dot / Icon Penanda */}
                <div className={`relative z-10 w-7 h-7 rounded-full border flex items-center justify-center shrink-0 ${step.color} shadow-2xs`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>

                {/* Konten Timeline */}
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-ink-900">
                      {step.title}
                    </span>
                    <span className="text-xs font-normal text-slate-400">
                      {step.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* 3. Callout Audit (Figma node 1155:4290 Callout) */}
      <div className="bg-teal-50/70 border border-teal-200/90 rounded-3xl p-5 flex items-start gap-3.5 shadow-2xs">
        <div className="w-10 h-10 rounded-2xl bg-white border border-teal-200 flex items-center justify-center shrink-0 text-teal-base shadow-xs">
          <LuBadgeCheck className="h-5 w-5" />
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-sm font-bold text-ink-900">
            Sudah ditinjau pihak lain
          </h4>
          <p className="text-xs text-slate-600 leading-[1.5]">
            Data pemeriksaan lokasi ini telah ditinjau oleh mitra di luar tim pelaksana (contoh: mitra akademik & riset kelautan independen).
          </p>
        </div>
      </div>
    </div>
  )
}

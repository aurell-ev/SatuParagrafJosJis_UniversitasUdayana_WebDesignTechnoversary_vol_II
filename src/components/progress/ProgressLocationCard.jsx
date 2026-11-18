import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { LuMapPin, LuBadgeCheck, LuActivity, LuSprout } from 'react-icons/lu'

export function ProgressLocationCard({ location, index = 0 }) {
  const shouldReduceMotion = useReducedMotion()

  const getStatusBadgeConfig = (status) => {
    switch (status) {
      case 'Penanaman':
        return {
          style: 'bg-sky-50 text-sky-700 border-sky-200',
          icon: LuSprout
        }
      case 'Perawatan':
        return {
          style: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: LuActivity
        }
      case 'Sedang Dipantau':
        return {
          style: 'bg-teal-50 text-teal-800 border-teal-200',
          icon: LuActivity
        }
      case 'Dipulihkan':
        return {
          style: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: LuBadgeCheck
        }
      default:
        return {
          style: 'bg-slate-50 text-slate-700 border-slate-200',
          icon: LuActivity
        }
    }
  }

  const isAudited = location.auditStatus === 'Ditinjau pihak lain' || location.auditStatus === 'Sudah ditinjau pihak lain'
  const isSurvivalAvailable = location.currentSurvivalRate !== null && location.currentSurvivalRate !== undefined
  const statusConfig = getStatusBadgeConfig(location.status)
  const StatusIcon = statusConfig.icon

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-25px' }}
      transition={{
        duration: 0.4,
        delay: shouldReduceMotion ? 0 : (index % 6) * 0.08,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className="w-full flex"
    >
      <Link 
        to={`/perkembangan/${location.id}`}
        className="group bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col items-start w-full shadow-xs hover:shadow-md hover:border-teal-200 transition-all duration-200 cursor-pointer"
        data-node-id="1148:1639"
        data-name="Lokasi Card"
      >
        {/* Gambar Thumbnail (h: 200px) */}
        <div className="relative h-[200px] w-full overflow-hidden p-4 shrink-0 bg-slate-100">
          <img
            src={location.imageUrl}
            alt={`Lokasi pemulihan ${location.name}`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {/* Status Badge di Pojok Kiri Atas (Figma node 1148:1598) */}
          <div className="relative z-10">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-xs ${statusConfig.style}`}>
              <StatusIcon className="h-3.5 w-3.5 shrink-0" />
              <span>{location.status}</span>
            </span>
          </div>
        </div>

        {/* Konten Isi (p: 24px) */}
        <div className="p-6 flex flex-col gap-4 items-start w-full flex-1 justify-between">
          <div className="w-full">
            {/* Judul & Lokasi */}
            <div className="flex flex-col gap-1 items-start">
              <h4 className="text-xl font-bold text-ink-900 group-hover:text-teal-base transition-colors leading-[1.5]">
                {location.name}
              </h4>
              <div className="flex items-center gap-1 text-xs font-normal text-slate-400 leading-[1.5]">
                <LuMapPin className="h-3.5 w-3.5 shrink-0" />
                <span>{location.publicAreaName}</span>
              </div>
            </div>

            {/* Baris Metrik (Ditanam & Masih Hidup) */}
            <div className="flex gap-8 items-start mt-4 leading-[1.5]">
              <div className="flex flex-col gap-1 items-start">
                <span className="text-xs text-slate-600 font-normal">
                  Ditanam
                </span>
                <span className="text-xl font-extrabold text-ink-900">
                  {location.totalPlanted} fragmen
                </span>
              </div>

              <div className="flex flex-col gap-1 items-start">
                <span className="text-xs text-slate-600 font-normal">
                  Masih hidup
                </span>
                <span className="text-xl font-extrabold text-ink-900">
                  {isSurvivalAvailable ? `${location.currentSurvivalRate}%` : 'Belum diperiksa'}
                </span>
              </div>
            </div>

            {/* Progress Bar (Figma node 1148:1609) */}
            <div className="bg-slate-100 h-2 rounded-full w-full mt-4 overflow-hidden">
              {isSurvivalAvailable ? (
                <motion.div 
                  className="bg-emerald-600 h-2 rounded-full"
                  initial={shouldReduceMotion ? { width: `${location.currentSurvivalRate}%` } : { width: 0 }}
                  whileInView={{ width: `${location.currentSurvivalRate}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: shouldReduceMotion ? 0 : 0.15,
                    ease: 'easeOut'
                  }}
                />
              ) : (
                <div className="bg-slate-200 h-2 rounded-full w-0" />
              )}
            </div>
          </div>

          {/* Bawah (Audit Status & Pembaruan Terakhir Sesuai Figma node 1148:1637) */}
          <div className="flex items-center justify-between w-full pt-1 border-t border-slate-100 mt-2">
            {/* Label Data (Figma node 1148:1610 dengan ikon LuBadgeCheck) */}
            <div className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border ${
              isAudited 
                ? 'bg-sky-50 border-sky-200 text-sky-700' 
                : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}>
              <LuBadgeCheck className="h-3.5 w-3.5 shrink-0" />
              <span>{location.auditStatus}</span>
            </div>

            {/* Tanggal Pembaruan (Teks murni tanpa ikon jam sesuai Figma node 1148:1636) */}
            <span className="text-xs text-slate-400 font-normal">
              {location.updatedAtLabel}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

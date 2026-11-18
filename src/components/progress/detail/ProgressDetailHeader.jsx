import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { 
  LuMapPin, 
  LuBadgeCheck, 
  LuShare2, 
  LuCheck, 
  LuCamera, 
  LuArrowRight, 
  LuActivity, 
  LuSprout 
} from 'react-icons/lu'

export function ProgressDetailHeader({ location }) {
  const shouldReduceMotion = useReducedMotion()
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `PulihKarang - ${location?.name || 'Detail Lokasi'}`,
          text: `Lihat perkembangan restorasi karang di ${location?.name || ''}`,
          url: window.location.href
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      }
    } catch {
      try {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      } catch {
        // ignore
      }
    }
  }

  const isAudited = location?.auditStatus === 'Ditinjau pihak lain' || location?.auditStatus === 'Sudah ditinjau pihak lain'

  // Status Badge Sesuai Figma node 1155:3980 (Tone=Primary: bg-teal-50, text-teal-800, ikon tanpa dot)
  const getStatusConfig = (status) => {
    switch (status) {
      case 'Penanaman':
        return {
          icon: LuSprout,
          style: 'bg-teal-50 text-teal-800'
        }
      case 'Perawatan':
        return {
          icon: LuActivity,
          style: 'bg-teal-50 text-teal-800'
        }
      case 'Sedang Dipantau':
        return {
          icon: LuActivity,
          style: 'bg-teal-50 text-teal-800'
        }
      case 'Dipulihkan':
        return {
          icon: LuBadgeCheck,
          style: 'bg-emerald-50 text-emerald-800'
        }
      default:
        return {
          icon: LuActivity,
          style: 'bg-teal-50 text-teal-800'
        }
    }
  }

  const statusConfig = getStatusConfig(location?.status)
  const StatusIcon = statusConfig.icon

  return (
    <motion.div 
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-slate-200/80"
      data-node-id="1155:4037"
      data-name="Kepala"
    >
      {/* Kiri: Judul, Badges & Lokasi (Figma node 1155:4004) */}
      <div className="flex flex-col gap-3 items-start" data-node-id="1155:4004" data-name="Judul">
        {/* Badges Container (Figma node 1155:3997: b - w: 286px, h: 28px, gap: 8px) */}
        <div className="flex flex-wrap items-center gap-2" data-node-id="1155:3997" data-name="b">
          {/* Badge Status (Figma node 1155:3980: Badge Perawatan - Tone=Primary, 100x26, px-2.5 py-1) */}
          <span 
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig.style}`}
            data-node-id="1155:3980"
            data-name="Badge Status"
          >
            <StatusIcon className="h-3.5 w-3.5 shrink-0" />
            <span>{location?.status || 'Perawatan'}</span>
          </span>

          {/* Badge Audit (Figma node 1155:3988: Badge Sudah ditinjau pihak lain - Tone=Info, 178x28, px-2.5 py-1) */}
          <span 
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${
              isAudited 
                ? 'bg-sky-50 text-sky-700 border-sky-200' 
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
            data-node-id="1155:3988"
            data-name="Badge Audit"
          >
            <LuBadgeCheck className="h-3.5 w-3.5 shrink-0" />
            <span>{isAudited ? 'Sudah ditinjau pihak lain' : 'Data tim pelaksana'}</span>
          </span>
        </div>

        {/* Nama Lokasi (Figma node 1155:3998: font-size 48px, font-extrabold text-ink-900) */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink-900 tracking-[-0.72px] leading-[1.2]">
          {location?.name || 'Sanur Kaja'}
        </h1>

        {/* Info Geografis (Figma node 1155:4003: a - map-pin + teks 16px text-slate-600) */}
        <div className="flex items-center gap-2 text-base text-slate-600 font-normal leading-normal" data-node-id="1155:4003">
          <LuMapPin className="h-4 w-4 text-teal-base shrink-0" />
          <span>
            {location?.district ? `${location.district}, ${location.regency}` : location?.publicAreaName || 'Bali'} · area disamarkan
          </span>
        </div>
      </div>

      {/* Kanan: Aksi (Figma node 1155:4036: Aksi - gap: 12px) */}
      <div className="flex flex-wrap items-center gap-3" data-node-id="1155:4036" data-name="Aksi">
        {/* Tombol Bagikan (Figma node 1155:4005: 123x47px, rounded-full, border-teal-base text-teal-base) */}
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-teal-600 bg-white text-sm font-semibold text-teal-base hover:bg-teal-50/60 transition-all shadow-2xs cursor-pointer active:scale-95"
          title="Bagikan tautan lokasi ini"
          data-node-id="1155:4005"
        >
          {copied ? (
            <>
              <LuCheck className="h-4 w-4 text-emerald-600" />
              <span className="text-emerald-700">Tersalin!</span>
            </>
          ) : (
            <>
              <LuShare2 className="h-4 w-4 text-teal-base" />
              <span>Bagikan</span>
            </>
          )}
        </button>

        {/* Tombol Laporkan Kerusakan (Figma node 1155:4021: 267x45px, rounded-full, bg-coral-base text-white) */}
        <Link
          to={`/lapor?lokasi=${encodeURIComponent(location?.name || '')}`}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-coral-base hover:bg-coral-hover text-white text-sm font-semibold shadow-xs hover:shadow-md transition-all active:scale-95"
          data-node-id="1155:4021"
        >
          <LuCamera className="h-4 w-4 text-white shrink-0" />
          <span>Laporkan kerusakan di area ini</span>
          <LuArrowRight className="h-4 w-4 text-white shrink-0" />
        </Link>
      </div>
    </motion.div>
  )
}

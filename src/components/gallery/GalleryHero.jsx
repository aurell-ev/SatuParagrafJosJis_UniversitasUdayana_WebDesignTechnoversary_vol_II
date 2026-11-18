import { motion, useReducedMotion } from 'motion/react'

export function GalleryHero() {
  const shouldReduceMotion = useReducedMotion()
  const heroBg =
    'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794819287/satu-paragraf-josjis/hero-coral.png'

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Background Image with Dark Ocean Overlay */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img
          src={heroBg}
          alt=""
          className="size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-teal-800/75" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col gap-5 items-start max-w-[780px]"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2">
            <span className="h-[2px] w-6 rounded-full bg-secondary-500" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[1.12px] text-teal-200">
              GALERI PEMULIHAN
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight text-white">
            Foto sebelum dan sesudah dari 24 lokasi pemulihan.
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg leading-relaxed text-teal-100 max-w-[680px]">
            Foto diambil tim daerah saat penanaman dan pemeriksaan berkala.
            Lokasi ditampilkan sampai tingkat area atau desa.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

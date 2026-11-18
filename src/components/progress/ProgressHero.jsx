import { motion, useReducedMotion } from 'motion/react'

export function ProgressHero() {
  const shouldReduceMotion = useReducedMotion()

  return (
     <section className="relative overflow-hidden bg-teal-900 pt-16 pb-20 text-white">
        {/* Background Image dengan Cloudinary f_auto,q_auto & Dark Ocean Overlay Sesuai Figma node 1148:1528 */}
        <div
           className="absolute inset-0 bg-cover bg-center"
           style={{
              backgroundImage: `url('https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794819287/satu-paragraf-josjis/hero-coral.png')`,
           }}
           aria-hidden="true"
        />
        <div className="absolute inset-0 bg-teal-800/75" aria-hidden="true" />

        <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
           <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex flex-col items-start gap-5"
           >
              {/* Eyebrow: Garis Cyan + Teks (Figma node 1148:1524) */}
              <div className="flex items-center gap-2">
                 <div className="bg-secondary-500 h-[2px] w-6 shrink-0" />
                 <span className="text-sm font-bold tracking-[1.12px] text-teal-200 uppercase">
                    PERKEMBANGAN PEMULIHAN
                 </span>
              </div>

              {/* Heading (Figma node 1148:1525) */}
              <h1 className="max-w-[760px] text-3xl leading-[1.15] font-extrabold tracking-[-0.72px] text-white sm:text-4xl md:text-5xl">
                 36 lokasi pemulihan di 4 daerah.
              </h1>

              {/* Deskripsi (Figma node 1148:1526) */}
              <p className="max-w-[680px] text-base leading-[1.6] font-normal text-teal-100 sm:text-lg">
                 Lokasi ditampilkan sampai tingkat area atau desa. Titik persis karang yang baru
                 ditanam selalu dirahasiakan.
              </p>
           </motion.div>
        </div>
     </section>
  );
}

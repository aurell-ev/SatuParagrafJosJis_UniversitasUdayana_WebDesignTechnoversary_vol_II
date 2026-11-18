import { motion, useReducedMotion } from 'motion/react'

export function ContactHero() {
  const shouldReduceMotion = useReducedMotion()

  return (
     <section className="relative overflow-hidden bg-teal-900 py-16 text-white sm:py-20">
        {/* Background Image Cloudinary f_auto,q_auto & Dark Ocean Overlay */}
        <div
           className="absolute inset-0 bg-cover bg-center"
           style={{
              backgroundImage: `url('https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794819287/satu-paragraf-josjis/hero-coral.png')`,
           }}
           aria-hidden="true"
        />
        <div className="absolute inset-0 bg-teal-800/75" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex max-w-3xl flex-col items-start gap-3.5"
           >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2">
                 <span className="bg-secondary-500 h-[2px] w-6 rounded-full" />
                 <span className="text-xs font-bold tracking-wider text-teal-200 uppercase sm:text-sm">
                    KONTAK &amp; FAQ
                 </span>
              </div>

              {/* Heading */}
              <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                 Hubungi tim PulihKarang
              </h1>

              {/* Subheading */}
              <p className="max-w-2xl pt-1 text-base leading-relaxed text-teal-100 sm:text-lg">
                 Kirim pertanyaan, ajakan kerja sama, atau masukan. Email dibalas dalam 1–2 hari
                 kerja. Untuk keadaan darurat lingkungan, hubungi instansi berwenang setempat.
              </p>
           </motion.div>
        </div>
     </section>
  );
}

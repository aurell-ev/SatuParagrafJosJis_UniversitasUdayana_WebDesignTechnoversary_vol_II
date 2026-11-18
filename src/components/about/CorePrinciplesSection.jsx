import { motion, useReducedMotion } from 'motion/react'
import { LuMapPin, LuWrench, LuScale, LuLock } from 'react-icons/lu'
import { ScrollReveal } from '../common/ScrollReveal'

export function CorePrinciplesSection() {
  const shouldReduceMotion = useReducedMotion()

  const principles = [
    {
      title: 'Untuk banyak daerah',
      description:
        'Setiap daerah punya tim dan pengelolanya sendiri, dalam satu sistem yang sama.',
      icon: LuMapPin
    },
    {
      title: 'Metode bebas',
      description:
        'Tim boleh memakai metode restorasi apa pun yang sesuai kondisi lokasinya.',
      icon: LuWrench
    },
    {
      title: 'Hasil diukur sama',
      description:
        'Persentase hidup dihitung dengan cara yang sama di semua lokasi, jadi bisa dibandingkan.',
      icon: LuScale
    },
    {
      title: 'Lokasi tanam dirahasiakan',
      description:
        'Titik persis karang yang baru ditanam tidak pernah ditampilkan ke publik.',
      icon: LuLock
    }
  ]

  return (
    <section className="bg-ink-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Header Kiri */}
        <ScrollReveal className="max-w-[720px]">
          <div className="inline-flex items-center gap-2">
            <span className="h-[2px] w-6 rounded-full bg-teal-base" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[1.12px] text-teal-base">
              NILAI PEMBEDA
            </span>
          </div>

          <h2 className="mt-3 text-3xl font-extrabold leading-[1.2] tracking-tight text-teal-base sm:text-4xl">
            Empat aturan kerja PulihKarang
          </h2>
        </ScrollReveal>

        {/* 4 Kartu Nilai dengan Motion Stagger */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-25px' }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : idx * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                className="flex flex-col gap-4 rounded-2xl border border-ink-200 bg-surface-card p-6 shadow-xs transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-base">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold leading-snug text-ink-900">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-600">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

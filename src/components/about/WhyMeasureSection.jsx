import { motion, useReducedMotion } from 'motion/react'
import { LuInfo, LuTriangleAlert, LuActivity } from 'react-icons/lu'
import { ScrollReveal } from '../common/ScrollReveal'

export function WhyMeasureSection() {
  const shouldReduceMotion = useReducedMotion()

  const statCards = [
    {
      stat: '62%',
      title: 'Proyek tanpa ukuran hasil',
      description:
        'Dari 45 proyek restorasi karang di Indonesia yang dikaji, 62% tidak mengukur kelangsungan hidup karang yang ditanam.',
      icon: LuTriangleAlert
    },
    {
      stat: '62 / 184',
      title: 'Fragmen hidup setelah 90 hari',
      description:
        'Contoh di Pulau Pramuka: dari 184 fragmen yang ditanam, hanya 62 yang masih hidup setelah tiga bulan.',
      icon: LuActivity
    }
  ]

  return (
    <section className="bg-ink-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Kolom Kiri: Penjelasan & Callout Cara Mengukur */}
          <div className="flex flex-col gap-6 lg:col-span-6">
            <ScrollReveal direction="left">
              <div>
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2">
                  <span className="h-[2px] w-6 rounded-full bg-teal-base" />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-[1.12px] text-teal-base">
                    KENAPA MENGUKUR HASIL PENTING
                  </span>
                </div>

                {/* Title */}
                <h2 className="mt-3 text-3xl font-extrabold leading-[1.2] tracking-tight text-teal-base sm:text-4xl">
                  Restorasi diukur dari karang yang tetap hidup.
                </h2>
              </div>

              <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink-600">
                Pemeriksaan berkala menunjukkan berapa fragmen yang bertahan pada
                umur 30, 90, dan 180 hari. Tanpa data itu, keberhasilan restorasi
                hanya perkiraan.
              </p>
            </ScrollReveal>

            {/* Callout Box */}
            <ScrollReveal direction="up" delay={0.15}>
              <div className="flex items-start gap-3.5 rounded-xl border border-teal-200 bg-teal-50 p-4 sm:p-5">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-teal-base">
                  <LuInfo className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-1 text-sm leading-relaxed">
                  <p className="font-bold text-teal-base">
                    Cara PulihKarang mengukur
                  </p>
                  <p className="text-ink-600">
                    Setiap pemeriksaan mencatat fragmen hidup, mati, hilang, atau
                    belum diamati. Persentase hidup dihitung otomatis menurut umur
                    tanam, dengan cara yang sama untuk semua lokasi dan metode.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Kolom Kanan: 2 Kartu Data Statistik */}
          <div className="flex flex-col gap-6 lg:col-span-6">
            {statCards.map((card, idx) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.title}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    duration: 0.45,
                    delay: shouldReduceMotion ? 0 : idx * 0.15,
                    ease: [0.21, 0.47, 0.32, 0.98]
                  }}
                  className="flex flex-col gap-3 rounded-2xl border border-ink-200 bg-surface-card p-6 sm:p-7 shadow-xs transition-shadow hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-base">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-teal-base">
                    {card.stat}
                  </p>
                  <h3 className="text-lg font-bold text-ink-900">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-600">
                    {card.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

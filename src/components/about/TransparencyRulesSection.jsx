import { motion, useReducedMotion } from 'motion/react'
import {
  LuShieldCheck,
  LuInfo,
  LuLock,
  LuBadgeCheck,
  LuFilter
} from 'react-icons/lu'
import { ScrollReveal } from '../common/ScrollReveal'

export function TransparencyRulesSection() {
  const shouldReduceMotion = useReducedMotion()

  const rules = [
    {
      text: 'Laporan tidak tampil ke publik sebelum diverifikasi tim daerah.',
      icon: LuShieldCheck
    },
    {
      text: 'Laporan warga adalah dugaan awal. Tim daerah yang memastikannya di lapangan.',
      icon: LuInfo
    },
    {
      text: 'Titik persis lokasi tanam tidak pernah ditampilkan; publik hanya melihat area atau desa.',
      icon: LuLock
    },
    {
      text: 'Setiap hasil diberi label “data tim pelaksana” atau “sudah ditinjau pihak lain”.',
      icon: LuBadgeCheck
    },
    {
      text: 'Laporan anonim disaring dengan captcha dan batas jumlah kiriman.',
      icon: LuFilter
    }
  ]

  return (
    <section className="bg-teal-800 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Kolom Kiri: Headline & Penjelasan */}
          <ScrollReveal direction="left" className="flex flex-col gap-5 lg:col-span-5">
            <div className="inline-flex items-center gap-2">
              <span className="h-[2px] w-6 rounded-full bg-secondary-500" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[1.12px] text-teal-200">
                ATURAN DATA PUBLIK
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold leading-[1.2] tracking-tight text-white">
              Lima aturan sebelum data tampil ke publik
            </h2>

            <p className="text-base sm:text-lg leading-relaxed text-teal-200">
              Aturan ini melindungi karang yang baru ditanam dan mencegah
              laporan yang belum dicek dianggap fakta.
            </p>
          </ScrollReveal>

          {/* Kolom Kanan: Panel 5 Aturan dengan Stagger Motion */}
          <div className="flex flex-col gap-5 rounded-3xl bg-teal-base p-6 sm:p-10 shadow-xl lg:col-span-7">
            {rules.map((rule, idx) => {
              const Icon = rule.icon
              return (
                <motion.div
                  key={idx}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                  whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{
                    duration: 0.4,
                    delay: shouldReduceMotion ? 0 : idx * 0.08,
                    ease: [0.21, 0.47, 0.32, 0.98]
                  }}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-accent text-teal-50">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm sm:text-base leading-snug text-teal-50 font-medium">
                    {rule.text}
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

import { motion, useReducedMotion } from 'motion/react'
import { LuCamera, LuScanSearch, LuSprout, LuChartLine } from 'react-icons/lu'
import { ScrollReveal } from '../common/ScrollReveal'

/**
 * Section 4: Alur PulihKarang
 * Sesuai desain Figma node 1150:1740 (Alur)
 */
export function WorkflowSection() {
  const shouldReduceMotion = useReducedMotion()

  const steps = [
    {
      number: '01',
      role: 'WARGA',
      title: 'Lapor',
      description: 'Kirim foto, titik lokasi, dan jenis kerusakan. Tanpa wajib login.',
      icon: LuCamera
    },
    {
      number: '02',
      role: 'TIM DAERAH',
      title: 'Verifikasi',
      description: 'Tim mengecek laporan ke lapangan: valid, duplikat, atau tidak valid.',
      icon: LuScanSearch
    },
    {
      number: '03',
      role: 'TIM DAERAH',
      title: 'Pulihkan',
      description: 'Mencatat penanaman, perawatan, dan pemeriksaan berkala di lokasi.',
      icon: LuSprout
    },
    {
      number: '04',
      role: 'PUBLIK',
      title: 'Pantau',
      description: 'Melihat perkembangan, termasuk persen karang yang benar-benar hidup.',
      icon: LuChartLine
    }
  ]

  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Header Bagian Alur: Rata Tengah Sesuai Node 1150:1740 (Align=Tengah) */}
        <ScrollReveal className="mx-auto max-w-[720px] text-center">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="h-0.5 w-6 rounded-full bg-teal-base" />
            <span className="text-xs font-bold uppercase tracking-wider text-teal-base">
              ALUR PULIHKARANG
            </span>
          </div>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-teal-base sm:text-4xl lg:text-[36px] lg:leading-[43.2px]">
            Lapor, verifikasi, pulihkan, pantau.
          </h2>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink-600">
            Warga melapor, tim daerah mengecek dan menanam ulang, publik melihat
            hasil tiap pemeriksaan.
          </p>
        </ScrollReveal>

        {/* 4 Langkah Alur (282x261px di Desktop, r=24) */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : idx * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-2xs transition-shadow hover:shadow-md"
              >
                <div>
                  {/* Baris Atas: Ikon Wadah (56x56, r=16, bg-teal-base) & Nomor Urut (36px, #AFD9E3) */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-base text-white shadow-2xs">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-teal-200">
                      {step.number}
                    </span>
                  </div>

                  {/* Isi: Role (secondary), Judul (ink-900), dan Deskripsi (ink-600) */}
                  <p className="mt-6 text-xs font-bold uppercase tracking-wider text-secondary">
                    {step.role}
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-ink-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

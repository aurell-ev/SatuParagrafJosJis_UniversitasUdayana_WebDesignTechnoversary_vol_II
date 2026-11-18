import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { LuCheck, LuClipboardCheck } from 'react-icons/lu'
import { ScrollReveal } from '../common/ScrollReveal'

/**
 * Section 5: Yang Kami Ukur
 * Sesuai desain Figma node 1150:1804 (Yang Diukur)
 */
export function MetricsSection() {
  const chartRef = useRef(null)
  const isInView = useInView(chartRef, { once: true, margin: '-40px' })
  const shouldReduceMotion = useReducedMotion()

  const chartData = [
    { days: '30 hari', rate: '92%', height: '92%', barColor: 'bg-secondary-500' },
    { days: '90 hari', rate: '78%', height: '78%', barColor: 'bg-secondary-500' },
    { days: '180 hari', rate: '68%', height: '68%', barColor: 'bg-secondary' },
    { days: '270 hari', rate: '64%', height: '64%', barColor: 'bg-secondary' }
  ]

  const points = [
    'Metode restorasi bebas, sesuai pilihan tim daerah',
    'Setiap hasil diberi label “data tim pelaksana” atau “sudah ditinjau pihak lain”',
    'Lokasi persis karang yang baru ditanam tetap dirahasiakan'
  ]

  return (
    <section className="bg-teal-800 py-16 sm:py-20 lg:py-24 text-white">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 items-center">
          {/* Kolom Kiri: Penjelasan & Prinsip Pengukuran */}
          <ScrollReveal className="lg:col-span-6 flex flex-col">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="h-0.5 w-6 rounded-full bg-secondary-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-teal-200">
                YANG KAMI UKUR
              </span>
            </div>

            {/* Judul Utama */}
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[36px] lg:leading-[43.2px]">
              Yang dicatat: berapa fragmen masih hidup di tiap pemeriksaan.
            </h2>

            {/* Deskripsi */}
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-teal-200">
              Setiap pemeriksaan mencatat fragmen hidup, mati, hilang, atau belum
              diamati. Persentase hidup dihitung otomatis menurut umur tanam,
              dengan cara yang sama di semua lokasi.
            </p>

            {/* Checklist Poin */}
            <ul className="mt-8 space-y-4">
              {points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-accent text-white">
                    <LuCheck className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm sm:text-base leading-snug text-teal-100">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Kolom Kanan: Visualisasi Grafik Batang Survival Rate (Wadah 560x442, r=24, bg-teal-base) */}
          <ScrollReveal delay={0.15} className="lg:col-span-6">
            <div className="rounded-3xl border border-teal-600/40 bg-teal-base p-6 sm:p-8 shadow-xl">
              {/* Header Grafik */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-teal-200">
                  Contoh · Lokasi Sanur Kaja
                </p>
                <h3 className="mt-1 text-lg sm:text-xl font-bold text-white">
                  Persentase hidup menurut umur tanam
                </h3>
              </div>

              {/* Area Batang Grafik (Tinggi 200px) */}
              <div
                ref={chartRef}
                className="mt-8 flex h-56 items-end justify-between gap-4 border-b border-teal-500/30 pb-4"
              >
                {chartData.map((bar, idx) => (
                  <div
                    key={idx}
                    className="group flex flex-1 flex-col items-center justify-end h-full gap-2"
                  >
                    {/* Nilai Persentase */}
                    <span className="text-sm font-bold text-white transition-transform group-hover:-translate-y-1">
                      {bar.rate}
                    </span>

                    {/* Track & Bar Fill */}
                    <div className="relative flex h-44 w-full max-w-[56px] items-end justify-center rounded-lg bg-teal-950/30 overflow-hidden">
                      <motion.div
                        initial={shouldReduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : { scaleY: shouldReduceMotion ? 1 : 0 }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.7,
                          delay: shouldReduceMotion ? 0 : 0.15 + idx * 0.1,
                          ease: [0.21, 0.47, 0.32, 0.98]
                        }}
                        style={{
                          height: bar.height,
                          transformOrigin: 'bottom'
                        }}
                        className={`w-full rounded-lg ${bar.barColor}`}
                      />
                    </div>

                    {/* Umur Tanam */}
                    <span className="text-xs font-medium text-teal-200 whitespace-nowrap">
                      {bar.days}
                    </span>
                  </div>
                ))}
              </div>

              {/* Legenda & Badge Data Tim Pelaksana */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-teal-200">
                  420 fragmen ditanam · Mar 2026
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600 shadow-2xs">
                  <LuClipboardCheck className="h-3.5 w-3.5 text-slate-600" />
                  Data tim pelaksana
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

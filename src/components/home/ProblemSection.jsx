import { motion, useReducedMotion } from 'motion/react'
import { LuRuler, LuSprout, LuTriangleAlert, LuLayers } from 'react-icons/lu'
import { ScrollReveal } from '../common/ScrollReveal'

/**
 * Section 3: Masalah
 * Sesuai desain Figma node 1150:1669 (Masalah)
 */
export function ProblemSection() {
  const shouldReduceMotion = useReducedMotion()

  const problemCards = [
    {
      id: 'ruler',
      icon: LuRuler,
      hasNumber: true,
      number: '62%',
      title: 'Restorasi tanpa ukuran hasil',
      description:
        'Studi 2024 terhadap 45 proyek restorasi di Indonesia: 62% tidak mengukur kelangsungan hidup karang yang ditanam.'
    },
    {
      id: 'sprout',
      icon: LuSprout,
      hasNumber: true,
      number: '62/184',
      title: 'Yang ditanam belum tentu hidup',
      description:
        'Di Pulau Pramuka, hanya 62 dari 184 fragmen yang masih hidup setelah 90 hari. Tanpa pemantauan, angka ini tak terlihat.'
    },
    {
      id: 'alert',
      icon: LuTriangleAlert,
      hasNumber: false,
      title: 'Kerusakan sering tidak terlaporkan',
      description:
        'Nelayan, penyelam, dan wisatawan melihat karang memutih, patah karena jangkar, atau tertutup sampah, tapi tidak tahu harus melapor ke mana.'
    },
    {
      id: 'layers',
      icon: LuLayers,
      hasNumber: false,
      title: 'Data tercecer dan terpisah',
      description:
        'Laporan, kegiatan pemulihan, dan hasilnya tercatat terpisah, atau tidak tercatat sama sekali.'
    }
  ]

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Kolom Kiri: Eyebrow, Judul, Deskripsi, dan Foto Bukti Kerusakan */}
          <ScrollReveal className="lg:col-span-5 flex flex-col">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3">
              <span className="h-0.5 w-6 bg-teal-base rounded-full" />
              <span className="text-xs font-bold uppercase tracking-wider text-teal-base">
                MASALAH
              </span>
            </div>

            {/* Judul Utama */}
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-teal-base sm:text-4xl lg:text-[36px] lg:leading-[43.2px]">
              Kerusakan jarang dilaporkan, hasil restorasi jarang diukur.
            </h2>

            {/* Deskripsi */}
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink-600">
              Pemutihan karang tercatat di Tejakula dan Nusa Penida pada awal 2024,
              dan terumbu di Sanur dilaporkan rusak sedang hingga berat pada September 2026.
            </p>

            {/* Foto Masalah (Node 1145:1040 Foto/colorbleach - clean 420x260px rounded-2xl) */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-sm">
              <img
                src="https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794819579/satu-paragraf-josjis/coral-bleaching.png"
                alt="Dokumentasi pemutihan karang di Tejakula dan Nusa Penida"
                className="h-[240px] sm:h-[260px] w-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </ScrollReveal>

          {/* Kolom Kanan: 4 Kartu Masalah (Grid 2x2) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {problemCards.map((card, idx) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.id}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    duration: 0.45,
                    delay: shouldReduceMotion ? 0 : idx * 0.08,
                    ease: [0.21, 0.47, 0.32, 0.98]
                  }}
                  className="flex flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs transition-shadow hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-base">
                    <Icon className="h-6 w-6" />
                  </div>

                  {card.hasNumber ? (
                    <>
                      <p className="mt-4 text-3xl font-extrabold tracking-tight text-teal-base">
                        {card.number}
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-ink-900">
                        {card.title}
                      </h3>
                    </>
                  ) : (
                    <h3 className="mt-4 text-lg font-bold text-ink-900">
                      {card.title}
                    </h3>
                  )}

                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
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

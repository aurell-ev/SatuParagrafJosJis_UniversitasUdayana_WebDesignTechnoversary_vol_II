import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { LuArrowRight, LuClock } from 'react-icons/lu'
import { useData } from '../../context/useAppContext'
import { ScrollReveal } from '../common/ScrollReveal'

/**
 * Section 7: Edukasi
 * Sesuai desain Figma node 1150:2024 (Edukasi)
 */
export function EducationSection() {
  const { articles } = useData()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="border-t border-slate-200/80 bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Header Bagian Edukasi (Align: Kiri, Tampilkan Deskripsi: False) */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <span className="h-0.5 w-6 rounded-full bg-teal-base" />
              <span className="text-xs font-bold uppercase tracking-wider text-teal-base">
                EDUKASI
              </span>
            </div>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-teal-base sm:text-4xl lg:text-[36px] lg:leading-[43.2px]">
              Baca sebelum kamu melapor
            </h2>
          </div>

          {/* Tombol Semua Artikel (Pill rounded-full px-5 py-3) */}
          <div className="shrink-0">
            <Link
              to="/artikel"
              className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-5 py-3 text-sm font-semibold text-teal-base hover:bg-teal-100/80 transition-colors shadow-2xs"
            >
              <span>Semua artikel</span>
              <LuArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Grid 3 Kartu Artikel (384x469px, r=16) */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((article, idx) => (
            <motion.article
              key={article.slug}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.45,
                delay: shouldReduceMotion ? 0 : idx * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xs transition-shadow hover:shadow-md"
            >
              {/* Foto Artikel */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Isi Artikel */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  {/* Meta: Kategori (Pill rounded-full tanpa ikon) & Waktu Baca */}
                  <div className="flex items-center gap-3 text-xs">
                    <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 font-semibold text-teal-base">
                      {article.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-ink-500">
                      <LuClock className="h-3.5 w-3.5 text-ink-400" />
                      {article.readTime || `${article.readTimeMinutes} menit baca`}
                    </span>
                  </div>

                  {/* Judul & Ringkasan */}
                  <h3 className="mt-3 text-lg sm:text-xl font-bold leading-snug text-ink-900 line-clamp-2">
                    <Link
                      to={`/artikel/${article.slug}`}
                      className="hover:text-teal-base transition-colors"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600 line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                {/* Tautan Baca Artikel */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    to={`/artikel/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-base hover:text-teal-hover transition-colors"
                  >
                    <span>Baca artikel</span>
                    <LuArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

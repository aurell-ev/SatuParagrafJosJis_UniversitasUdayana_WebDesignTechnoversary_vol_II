import { useParams, Link, Navigate } from 'react-router-dom'
import { LuArrowLeft, LuClock, LuCalendar, LuUser, LuShare2 } from 'react-icons/lu'
import { useData } from '../../context/useAppContext'
import { CallToAction } from '../../components/common/CallToAction'

/**
 * Halaman Detail Artikel Edukasi (/artikel/:slug)
 */
export function ArticleDetailPage() {
  const { slug } = useParams()
  const { articles } = useData()

  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    return <Navigate to="/artikel" replace />
  }

  // Artikel terkait lainnya
  const relatedArticles = articles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Bar / Navigasi Balik */}
      <div className="border-b border-slate-200 bg-slate-50/80 backdrop-blur-xs">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/artikel"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-base hover:text-teal-700 transition-colors"
          >
            <LuArrowLeft className="h-4 w-4" />
            <span>Kembali ke daftar artikel</span>
          </Link>
        </div>
      </div>

      {/* Konten Utama Artikel */}
      <article className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Meta Kategori & Waktu */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-base border border-teal-100">
            {article.category}
          </span>
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <LuClock className="h-3.5 w-3.5" />
            <span>{article.readTime}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <LuCalendar className="h-3.5 w-3.5" />
            <span>10 Nov 2026</span>
          </div>
        </div>

        {/* Judul Artikel */}
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
          {article.title}
        </h1>

        {/* Ringkasan / Lead Paragraph */}
        <p className="mt-4 text-lg font-medium leading-relaxed text-slate-600 sm:text-xl border-l-4 border-teal-base pl-4 italic">
          {article.excerpt}
        </p>

        {/* Penulis */}
        <div className="mt-6 flex items-center justify-between border-y border-slate-100 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-base font-bold">
              <LuUser className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{article.author || 'Tim Edukasi PulihKarang'}</p>
              <p className="text-xs text-slate-500">Divisi Edukasi Konservasi Terumbu Karang</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: article.title, url: window.location.href })
              } else {
                navigator.clipboard.writeText(window.location.href)
                alert('Tautan artikel berhasil disalin!')
              }
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <LuShare2 className="h-3.5 w-3.5" />
            <span>Bagikan</span>
          </button>
        </div>

        {/* Gambar Utama Artikel */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full max-h-[500px] object-cover"
          />
        </div>

        {/* Teks Isi Artikel */}
        <div className="mt-10 space-y-6 text-slate-700 leading-relaxed text-base sm:text-lg">
          {article.content.split('\n\n').map((paragraph, index) => {
            // Render bulleted / numbered list bila ada
            if (paragraph.includes('\n1.') || paragraph.includes('\n-')) {
              const lines = paragraph.split('\n')
              return (
                <div key={index} className="space-y-3">
                  <p className="font-semibold text-slate-900">{lines[0]}</p>
                  <ul className="list-disc pl-6 space-y-2 text-slate-700">
                    {lines.slice(1).map((line, lIdx) => (
                      <li key={lIdx} dangerouslySetInnerHTML={{ __html: line.replace(/^[-*]|\d+\.\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    ))}
                  </ul>
                </div>
              )
            }
            return (
              <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            )
          })}
        </div>
      </article>

      {/* Artikel Terkait */}
      {relatedArticles.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50 py-16">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold tracking-tight text-teal-base">
              Artikel Lainnya
            </h3>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/artikel/${rel.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs hover:shadow-md transition-shadow"
                >
                  <span className="text-xs font-semibold text-teal-base">{rel.category}</span>
                  <h4 className="mt-2 text-base font-bold text-slate-900 group-hover:text-teal-base transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="mt-2 text-xs text-slate-500 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Global Call To Action */}
      <div className="bg-slate-50 pb-16 lg:pb-24">
        <CallToAction />
      </div>
    </div>
  )
}

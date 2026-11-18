/**
 * Section 1: Page Hero (Halaman Artikel)
 * Sesuai desain Figma node 1152:2259 (Page Hero)
 */
export function ArticleHeroSection() {
  return (
    <section className="relative overflow-hidden bg-teal-950 py-16 sm:py-20 lg:py-24">
      {/* Background Image dengan Cloudinary f_auto,q_auto */}
      <img
        src="https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794819287/satu-paragraf-josjis/hero-coral.png"
        alt="Latar Belakang Terumbu Karang"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Dark Teal Overlay (rgb(7, 48, 59) / #07303b 85% opacity) */}
      <div className="absolute inset-0 bg-teal-950/85" />

      {/* Konten Hero */}
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2">
            <span className="h-0.5 w-6 rounded-full bg-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-200">
              EDUKASI
            </span>
          </div>

          {/* Judul Utama */}
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[40px] lg:leading-[48px]">
            Panduan mengenali dan melaporkan kerusakan karang
          </h1>

          {/* Deskripsi */}
          <p className="mt-4 text-base leading-relaxed text-teal-100/90 sm:text-lg">
            Panduan singkat tentang jenis kerusakan terumbu karang, cara memotret dan melapor, serta bagaimana pemulihan diukur.
          </p>
        </div>
      </div>
    </section>
  )
}

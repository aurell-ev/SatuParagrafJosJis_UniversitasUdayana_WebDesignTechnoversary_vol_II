export function VolunteerHero() {
  return (
    <section className="relative overflow-hidden bg-teal-900 py-10 sm:py-16 lg:py-20 text-white">
      {/* Background Image Cloudinary f_auto,q_auto & Dark Ocean Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794892029/satu-paragraf-josjis/about-page-hero.jpg')`
        }}
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 bg-teal-950/75" 
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-2.5 sm:gap-3.5 max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2">
            <span className="h-[2px] w-6 rounded-full bg-teal-200" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-200">
              GABUNG TIM DAERAH
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Daftar sebagai relawan tim restorasi daerah
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg leading-relaxed text-teal-100 max-w-2xl pt-0.5 sm:pt-1">
            Pengelola daerah meninjau pendaftaranmu dalam 1–5 hari kerja. Setelah disetujui, kamu bisa masuk dan mencatat kegiatan.
          </p>
        </div>
      </div>
    </section>
  )
}

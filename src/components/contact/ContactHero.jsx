export function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-teal-900 py-16 sm:py-20 text-white">
      {/* Background Image Cloudinary f_auto,q_auto & Dark Ocean Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794819287/satu-paragraf-josjis/hero-coral.png')`
        }}
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 bg-teal-950/75" 
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-3.5 max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2">
            <span className="h-[2px] w-6 rounded-full bg-teal-200" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-200">
              KONTAK &amp; FAQ
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Hubungi tim PulihKarang
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg leading-relaxed text-teal-100 max-w-2xl pt-1">
            Kirim pertanyaan, ajakan kerja sama, atau masukan. Email dibalas dalam 1–2 hari kerja.
            Untuk keadaan darurat lingkungan, hubungi instansi berwenang setempat.
          </p>
        </div>
      </div>
    </section>
  )
}

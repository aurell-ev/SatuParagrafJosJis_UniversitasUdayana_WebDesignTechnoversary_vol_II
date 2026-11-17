export function AboutHero() {
  const heroBg =
    'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794892029/satu-paragraf-josjis/about-page-hero.jpg'

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Background Image with Dark Ocean Overlay */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img
          src={heroBg}
          alt=""
          className="size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-teal-800/75" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 items-start max-w-[780px]">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2">
            <span className="h-[2px] w-6 rounded-full bg-secondary-500" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[1.12px] text-teal-200">
              TENTANG PULIHKARANG
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight text-white">
            Dari laporan warga ke lokasi pemulihan yang bisa dipantau.
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg leading-relaxed text-teal-100 max-w-[680px]">
            PulihKarang adalah prototipe sistem yang menghubungkan laporan
            warga, kerja tim restorasi daerah, dan hasil pemulihan yang bisa
            dipantau publik.
          </p>
        </div>
      </div>
    </section>
  )
}

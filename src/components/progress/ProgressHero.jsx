export function ProgressHero() {
  return (
    <section className="relative overflow-hidden bg-teal-900 pt-16 pb-20 text-white">
      {/* Background Image dengan Cloudinary f_auto,q_auto & Dark Ocean Overlay Sesuai Figma node 1148:1528 */}
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

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 items-start">
          {/* Eyebrow: Garis Cyan + Teks (Figma node 1148:1524) */}
          <div className="flex items-center gap-2">
            <div className="h-[2px] w-6 bg-secondary-500 shrink-0" />
            <span className="text-sm font-bold tracking-[1.12px] text-teal-200 uppercase">
              PERKEMBANGAN PEMULIHAN
            </span>
          </div>

          {/* Heading (Figma node 1148:1525) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.72px] leading-[1.15] text-white max-w-[760px]">
            36 lokasi pemulihan di 4 daerah.
          </h1>

          {/* Deskripsi (Figma node 1148:1526) */}
          <p className="text-base sm:text-lg text-teal-100 font-normal leading-[1.6] max-w-[680px]">
            Lokasi ditampilkan sampai tingkat area atau desa. Titik persis karang yang baru ditanam selalu dirahasiakan.
          </p>
        </div>
      </div>
    </section>
  )
}

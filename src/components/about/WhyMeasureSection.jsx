import { LuInfo, LuTriangleAlert, LuActivity } from 'react-icons/lu'

export function WhyMeasureSection() {
  return (
    <section className="bg-ink-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Kolom Kiri: Penjelasan & Callout Cara Mengukur */}
          <div className="flex flex-col gap-6 lg:col-span-6">
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2">
                <span className="h-[2px] w-6 rounded-full bg-teal-base" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-[1.12px] text-teal-base">
                  KENAPA MENGUKUR HASIL PENTING
                </span>
              </div>

              {/* Title */}
              <h2 className="mt-3 text-3xl font-extrabold leading-[1.2] tracking-tight text-teal-base sm:text-4xl">
                Restorasi diukur dari karang yang tetap hidup.
              </h2>
            </div>

            <p className="text-base sm:text-lg leading-relaxed text-ink-600">
              Pemeriksaan berkala menunjukkan berapa fragmen yang bertahan pada
              umur 30, 90, dan 180 hari. Tanpa data itu, keberhasilan restorasi
              hanya perkiraan.
            </p>

            {/* Callout Box */}
            <div className="flex items-start gap-3.5 rounded-xl border border-teal-200 bg-teal-50 p-4 sm:p-5">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-teal-base">
                <LuInfo className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-1 text-sm leading-relaxed">
                <p className="font-bold text-teal-base">
                  Cara PulihKarang mengukur
                </p>
                <p className="text-ink-600">
                  Setiap pemeriksaan mencatat fragmen hidup, mati, hilang, atau
                  belum diamati. Persentase hidup dihitung otomatis menurut umur
                  tanam, dengan cara yang sama untuk semua lokasi dan metode.
                </p>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: 2 Kartu Data Statistik */}
          <div className="flex flex-col gap-6 lg:col-span-6">
            {/* Kartu 1: 62% Proyek Tanpa Ukuran Hasil */}
            <div className="flex flex-col gap-3 rounded-2xl border border-ink-200 bg-surface-card p-6 sm:p-7 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-base">
                <LuTriangleAlert className="h-6 w-6" />
              </div>
              <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-teal-base">
                62%
              </p>
              <h3 className="text-lg font-bold text-ink-900">
                Proyek tanpa ukuran hasil
              </h3>
              <p className="text-sm leading-relaxed text-ink-600">
                Dari 45 proyek restorasi karang di Indonesia yang dikaji, 62%
                tidak mengukur kelangsungan hidup karang yang ditanam.
              </p>
            </div>

            {/* Kartu 2: Kasus Lapangan 62 / 184 Fragmen */}
            <div className="flex flex-col gap-3 rounded-2xl border border-ink-200 bg-surface-card p-6 sm:p-7 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-base">
                <LuActivity className="h-6 w-6" />
              </div>
              <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-teal-base">
                62 / 184
              </p>
              <h3 className="text-lg font-bold text-ink-900">
                Fragmen hidup setelah 90 hari
              </h3>
              <p className="text-sm leading-relaxed text-ink-600">
                Contoh di Pulau Pramuka: dari 184 fragmen yang ditanam, hanya 62
                yang masih hidup setelah tiga bulan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

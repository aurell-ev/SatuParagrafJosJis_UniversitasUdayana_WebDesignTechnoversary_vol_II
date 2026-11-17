import { LuCamera, LuScanSearch, LuSprout, LuEye } from 'react-icons/lu'

export function WorkflowStepsSection() {
  const steps = [
    {
      number: '01',
      role: 'WARGA',
      title: 'Lapor',
      description:
        'Foto, titik lokasi di peta, dan jenis kerusakan. Boleh anonim, tanpa login.',
      icon: LuCamera
    },
    {
      number: '02',
      role: 'TIM DAERAH',
      title: 'Verifikasi',
      description:
        'Laporan dicek: diverifikasi, duplikat, atau tidak valid. Belum tampil publik sebelum diverifikasi.',
      icon: LuScanSearch
    },
    {
      number: '03',
      role: 'TIM DAERAH',
      title: 'Pulihkan',
      description:
        'Laporan valid menjadi lokasi pemulihan. Tim mencatat penanaman, perawatan, dan pemeriksaan.',
      icon: LuSprout
    },
    {
      number: '04',
      role: 'PUBLIK',
      title: 'Pantau',
      description:
        'Status, foto, jumlah tanam, dan grafik persen hidup bisa dilihat siapa saja.',
      icon: LuEye
    }
  ]

  return (
    <section className="bg-surface-card py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Header Rata Tengah */}
        <div className="mx-auto max-w-[720px] text-center">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="h-[2px] w-6 rounded-full bg-teal-base" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[1.12px] text-teal-base">
              CARA KERJA
            </span>
          </div>

          <h2 className="mt-3 text-3xl font-extrabold leading-[1.2] tracking-tight text-teal-base sm:text-4xl">
            Empat langkah, tiga peran
          </h2>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink-600">
            Warga melapor, tim daerah menindaklanjuti, publik memantau. Tiap
            langkah punya status yang bisa dicek.
          </p>
        </div>

        {/* 4 Kolom Langkah */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="flex flex-col justify-between rounded-3xl border border-ink-200 bg-surface-card p-6 sm:p-7 shadow-2xs transition-shadow hover:shadow-md"
              >
                <div>
                  {/* Baris Atas: Ikon Wadah & Nomor Urut */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-base text-white shadow-2xs">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-teal-200">
                      {step.number}
                    </span>
                  </div>

                  {/* Isi: Role, Title, Description */}
                  <p className="mt-6 text-xs font-bold uppercase tracking-wider text-secondary">
                    {step.role}
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-ink-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { LuUsers, LuBuilding2, LuEye } from 'react-icons/lu'

export function AboutIntroSection() {
  const photoUrl =
    'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794892005/satu-paragraf-josjis/about-foto-survey.jpg'

  const userRoles = [
    {
      title: 'Untuk warga',
      description: 'Nelayan, penyelam, wisatawan',
      icon: LuUsers
    },
    {
      title: 'Untuk tim daerah',
      description: 'Relawan & pengelola restorasi',
      icon: LuBuilding2
    },
    {
      title: 'Untuk publik',
      description: 'Siapa pun bisa memantau',
      icon: LuEye
    }
  ]

  return (
    <section className="bg-surface-card py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Sisi Kiri: Foto Survey / Dokumentasi Lapangan */}
          <div className="relative h-[360px] sm:h-[440px] lg:h-[520px] w-full overflow-hidden rounded-3xl shadow-md">
            <img
              src={photoUrl}
              alt="Tim konservasi melakukan survey dan restorasi terumbu karang"
              className="size-full object-cover object-center"
            />
          </div>

          {/* Sisi Kanan: Teks Penjelasan & 3 Fakta Peran */}
          <div className="flex flex-col gap-6">
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2">
                <span className="h-[2px] w-6 rounded-full bg-teal-base" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-[1.12px] text-teal-base">
                  APA ITU PULIHKARANG
                </span>
              </div>

              {/* Title */}
              <h2 className="mt-3 text-3xl font-extrabold leading-[1.2] tracking-tight text-teal-base sm:text-4xl">
                Warga melihat kerusakan, tim daerah memulihkannya
              </h2>
            </div>

            <p className="text-base leading-[1.7] text-ink-600">
              Banyak orang melihat karang yang memutih, patah karena jangkar,
              atau tertutup sampah, tapi tidak tahu harus melapor ke mana. Di
              sisi lain, kegiatan restorasi sering tercatat terpisah, dan hasilnya
              jarang diukur.
            </p>

            <p className="text-base leading-[1.7] text-ink-600">
              Di PulihKarang, warga melapor, tim daerah memverifikasi lalu
              menanam ulang, dan publik melihat hasil tiap pemeriksaan di halaman
              lokasi.
            </p>

            {/* 3 Kotak Kartu Peran */}
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {userRoles.map((role) => {
                const Icon = role.icon
                return (
                  <div
                    key={role.title}
                    className="flex flex-col gap-3 rounded-xl bg-ink-50 p-4 sm:p-5 border border-ink-100"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-base">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-ink-900">
                        {role.title}
                      </h3>
                      <p className="mt-1 text-sm text-ink-600 leading-snug">
                        {role.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

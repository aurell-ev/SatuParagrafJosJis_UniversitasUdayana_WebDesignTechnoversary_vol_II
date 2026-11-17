import { LuWaves, LuChartLine, LuUsers, LuCircleCheck, LuClock, LuUserCheck } from 'react-icons/lu'

const PERKS = [
  {
    icon: LuWaves,
    title: 'Turun langsung ke lapangan',
    desc: 'Ikut penanaman, perawatan, dan pemeriksaan berkala bersama tim.'
  },
  {
    icon: LuChartLine,
    title: 'Kerja yang terukur',
    desc: 'Setiap pemeriksaan yang kamu catat menjadi data persen hidup yang bisa dilihat publik.'
  },
  {
    icon: LuUsers,
    title: 'Belajar bersama',
    desc: 'Bekerja bersama penyelam, peneliti, dan warga pesisir di daerahmu.'
  }
]

const STEPS = [
  {
    number: '01',
    title: 'Pilih daerah & isi formulir',
    time: '±3 menit',
    desc: 'Pilih daerah tempat kamu ingin bergabung.'
  },
  {
    number: '02',
    title: 'Ditinjau pengelola daerah',
    time: '1–5 hari kerja',
    desc: 'Pengelola menyetujui atau menolak pendaftaran.'
  },
  {
    number: '03',
    title: 'Masuk sebagai relawan',
    time: 'Setelah disetujui',
    desc: 'Kamu menerima email untuk masuk dan mulai mencatat kegiatan.'
  }
]

export function VolunteerInfo() {
  return (
    <div className="space-y-8">
      {/* 1. Yang Dikerjakan Relawan */}
      <div className="space-y-5">
        <div className="inline-flex items-center gap-2">
          <span className="h-[2px] w-6 rounded-full bg-teal-500" />
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-500">
            KENAPA BERGABUNG
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink-900">
          Yang dikerjakan relawan
        </h2>

        <div className="space-y-4 pt-1">
          {PERKS.map((perk, idx) => {
            const Icon = perk.icon
            return (
              <div
                key={idx}
                className="flex items-start gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-base">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-ink-900">{perk.title}</h3>
                  <p className="mt-1 text-sm sm:text-base text-ink-600 leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 2. Alur Pendaftaran */}
      <div className="rounded-2xl border border-ink-200/80 bg-surface-card p-6 shadow-2xs">
        <h3 className="text-base font-bold text-ink-900 mb-5">Alur pendaftaran</h3>

        <div className="relative space-y-6 before:absolute before:left-[15px] before:top-2 before:bottom-3 before:w-[2px] before:bg-ink-200">
          {STEPS.map((step, idx) => (
            <div key={idx} className="relative flex items-start gap-4 pl-1">
              <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white border-2 border-teal-base text-teal-base">
                {idx === 0 ? (
                  <LuCircleCheck className="h-3.5 w-3.5 fill-teal-base text-white" />
                ) : idx === 1 ? (
                  <LuClock className="h-3.5 w-3.5" />
                ) : (
                  <LuUserCheck className="h-3.5 w-3.5" />
                )}
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h4 className="text-sm font-bold text-ink-900">{step.title}</h4>
                  <span className="text-[11px] font-medium text-ink-500 bg-ink-100 px-2 py-0.5 rounded-full">
                    {step.time}
                  </span>
                </div>
                <p className="mt-1 text-xs text-ink-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

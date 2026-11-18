import { LuWaves, LuChartLine, LuUsers, LuCircleCheck, LuMapPin, LuClock, LuCircleUserRound } from 'react-icons/lu'

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
    desc: 'Pilih daerah tempat kamu ingin bergabung.',
    icon: LuMapPin
  },
  {
    number: '02',
    title: 'Ditinjau pengelola daerah',
    time: '1–5 hari kerja',
    desc: 'Pengelola menyetujui atau menolak pendaftaran.',
    icon: LuClock
  },
  {
    number: '03',
    title: 'Masuk sebagai relawan',
    time: 'Setelah disetujui',
    desc: 'Kamu menerima email untuk masuk dan mulai mencatat kegiatan.',
    icon: LuCircleUserRound
  }
]

export function VolunteerInfo({ currentStep = 1 }) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Yang Dikerjakan Relawan */}
      <div className="space-y-3.5 sm:space-y-5">
        <div className="inline-flex items-center gap-2">
          <span className="h-[2px] w-5 sm:w-6 rounded-full bg-teal-500" />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-teal-500">
            KENAPA BERGABUNG
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-teal-500">
          Yang dikerjakan relawan
        </h2>

        <div className="space-y-3 sm:space-y-4 pt-1">
          {PERKS.map((perk, idx) => {
            const Icon = perk.icon
            return (
              <div
                key={idx}
                className="flex items-start gap-3 sm:gap-4"
              >
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-base">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-ink-900">{perk.title}</h3>
                  <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm lg:text-base text-ink-600 leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 2. Alur Pendaftaran */}
      <div className="rounded-2xl border border-ink-200/80 bg-surface-card p-4 sm:p-6 shadow-2xs">
        <h3 className="text-sm sm:text-base font-bold text-ink-900 mb-4 sm:mb-5">Alur pendaftaran</h3>

        <div className="relative space-y-5 sm:space-y-6 before:absolute before:left-[15px] before:top-2 before:bottom-3 before:w-[2px] before:bg-ink-200">
          {STEPS.map((step, idx) => {
            const stepNum = idx + 1
            const isCompleted = stepNum < currentStep
            const isCurrent = stepNum === currentStep
            const StepIcon = step.icon

            return (
              <div key={idx} className="relative flex items-start gap-3.5 sm:gap-4 pl-1">
                {/* Status Indicator Icon */}
                <div
                  className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                    isCurrent
                      ? 'bg-teal-800 text-white border-2 border-teal-800'
                      : isCompleted
                      ? 'bg-white border-2 border-teal-800 text-teal-800'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <LuCircleCheck className="h-4 w-4 fill-teal-800 text-white" />
                  ) : (
                    <StepIcon className="h-3.5 w-3.5" />
                  )}
                </div>

                {/* Step Details */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h4
                      className={`text-xs sm:text-sm font-bold transition-colors ${
                        isCurrent || isCompleted ? 'text-ink-900' : 'text-slate-400'
                      }`}
                    >
                      {step.title}
                    </h4>
                    <span
                      className={`text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full ${
                        isCurrent || isCompleted
                          ? 'text-ink-600 bg-ink-100'
                          : 'text-slate-400 bg-slate-100'
                      }`}
                    >
                      {step.time}
                    </span>
                  </div>
                  <p
                    className={`mt-0.5 sm:mt-1 text-[11px] sm:text-xs leading-relaxed transition-colors ${
                      isCurrent || isCompleted ? 'text-ink-600' : 'text-slate-400'
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

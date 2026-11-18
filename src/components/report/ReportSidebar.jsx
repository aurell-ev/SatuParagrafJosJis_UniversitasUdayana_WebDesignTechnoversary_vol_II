import { Link } from 'react-router-dom'
import { LuClock, LuShieldCheck, LuCircleHelp, LuArrowRight, LuCheck, LuHammer } from 'react-icons/lu'

export function ReportSidebar() {
  const steps = [
    {
      title: 'Kamu menerima kode lacak',
      time: '1 detik lalu',
      desc: 'Gunakan untuk memantau status laporan.',
      icon: LuCheck,
      iconDone: true
    },
    {
      title: 'Dicek tim daerah',
      time: '1–3 hari kerja',
      desc: 'Status diverifikasi, duplikat, atau tidak valid.',
      icon: LuClock,
      iconActive: true
    },
    {
      title: 'Diverifikasi',
      time: 'Belum dimulai',
      desc: 'Laporan valid akan tampil di peta publik (area, bukan titik).',
      icon: LuClock,
      iconPending: true
    },
    {
      title: 'Ditindaklanjuti',
      time: 'Belum dimulai',
      desc: 'Menjadi lokasi pemulihan yang bisa dipantau.',
      icon: LuHammer,
      iconPending: true
    }
  ]

  return (
    <div className="space-y-6">
      {/* 1. Setelah Kamu Mengirim Box */}
      <div className="rounded-2xl border border-ink-200/80 bg-surface-card p-6 shadow-2xs">
        <h3 className="text-base font-bold text-ink-900 mb-5">
          Setelah kamu mengirim
        </h3>

        <div className="relative space-y-6 before:absolute before:left-[15px] before:top-2 before:bottom-3 before:w-[2px] before:bg-ink-200">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div key={idx} className="relative flex items-start gap-4 pl-1">
                <div
                  className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    step.iconDone
                      ? 'bg-emerald-600 text-white'
                      : step.iconActive
                      ? 'bg-teal-800 text-white'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 stroke-[2.5]" />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h4
                      className={`text-sm font-bold ${
                        step.iconPending ? 'text-slate-500' : 'text-ink-900'
                      }`}
                    >
                      {step.title}
                    </h4>
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                        step.iconActive
                          ? 'bg-teal-50 text-teal-800 font-semibold'
                          : 'bg-ink-100 text-ink-500'
                      }`}
                    >
                      {step.time}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-ink-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 2. Privasimu Terjaga Box */}
      <div className="rounded-2xl border border-teal-100/80 bg-teal-50/40 p-6 shadow-2xs">
        <div className="flex items-center gap-2 text-teal-900 font-bold text-sm mb-3">
          <LuShieldCheck className="h-5 w-5 text-teal-base" />
          <span>Privasimu terjaga</span>
        </div>

        <ul className="space-y-2.5 text-xs text-ink-700">
          <li className="flex items-start gap-2.5">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-base mt-0.5">
              <LuCheck className="h-2.5 w-2.5 stroke-[3]" />
            </span>
            <span>Identitas pelapor tidak pernah ditampilkan.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-base mt-0.5">
              <LuCheck className="h-2.5 w-2.5 stroke-[3]" />
            </span>
            <span>Titik persis hanya dilihat oleh tim daerah.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-base mt-0.5">
              <LuCheck className="h-2.5 w-2.5 stroke-[3]" />
            </span>
            <span>Foto bisa dipakai tim untuk dokumentasi pemulihan.</span>
          </li>
        </ul>
      </div>

      {/* 3. Ragu Memilih Jenis Box */}
      <Link
        to="/artikel"
        className="group flex items-center justify-between gap-3 rounded-2xl border border-ink-200/80 bg-surface-card p-5 shadow-2xs hover:border-teal-base transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-base group-hover:bg-teal-base group-hover:text-white transition-colors">
            <LuCircleHelp className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-ink-900 group-hover:text-teal-base transition-colors">
              Ragu memilih jenis?
            </h4>
            <p className="text-xs text-ink-500">Baca panduan 6 jenis kerusakan</p>
          </div>
        </div>
        <LuArrowRight className="h-4 w-4 text-ink-400 group-hover:text-teal-base group-hover:translate-x-1 transition-all" />
      </Link>
    </div>
  )
}

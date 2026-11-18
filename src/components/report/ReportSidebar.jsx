import { Link } from 'react-router-dom'
import { LuShieldCheck, LuCircleHelp, LuArrowRight, LuCheck } from 'react-icons/lu'

export function ReportSidebar() {
  const steps = [
    {
      num: 1,
      title: 'Kamu menerima kode lacak',
      time: 'Langsung',
      desc: 'Simpan kode unik untuk memantau status laporan secara berkala.'
    },
    {
      num: 2,
      title: 'Menunggu verifikasi',
      time: '1–3 hari kerja',
      desc: 'Tim restorasi daerah memeriksa foto dan kesesuaian lokasi.'
    },
    {
      num: 3,
      title: 'Diverifikasi',
      time: 'Setelah dicek',
      desc: 'Laporan valid akan tampil di peta publik level area (bukan titik presisi).'
    },
    {
      num: 4,
      title: 'Ditindaklanjuti',
      time: 'Tahap pemulihan',
      desc: 'Lokasi masuk agenda pemulihan terhubung ke pemantauan perkembangan.'
    }
  ]

  return (
    <div className="space-y-6">
      {/* 1. Setelah Kamu Mengirim Box */}
      <div className="rounded-2xl border border-ink-200/80 bg-surface-card p-6 shadow-2xs">
        <h3 className="text-base font-bold text-ink-900 mb-5">
          Setelah kamu mengirim
        </h3>

        <div className="relative space-y-6 before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:-translate-x-1/2 before:bg-ink-200">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex items-start gap-4">
              <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-50 border border-teal-200 text-teal-base font-bold text-xs leading-none">
                <span className="flex items-center justify-center translate-y-[-0.5px]">{step.num}</span>
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h4 className="text-sm font-bold text-ink-900">
                    {step.title}
                  </h4>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-ink-100 text-ink-600">
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

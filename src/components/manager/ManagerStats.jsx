import { LuUsers, LuClock, LuCircleCheck, LuShieldAlert } from 'react-icons/lu'

export function ManagerStats({ volunteers = [], reports = [], restorationSites = [] }) {
  const pendingVolunteers = volunteers.filter((v) => v.status === 'menunggu').length
  const approvedVolunteers = volunteers.filter((v) => v.status === 'disetujui').length
  const pendingReports = reports.filter((r) => r.status === 'baru').length

  const stats = [
    {
      label: 'Calon Relawan Menunggu',
      value: pendingVolunteers,
      desc: 'Perlu peninjauan profil & lisensi',
      icon: LuClock,
      color: 'text-amber-600 bg-amber-50 border-amber-200'
    },
    {
      label: 'Relawan Aktif Terverifikasi',
      value: approvedVolunteers,
      desc: 'Terdaftar di regu konservasi daerah',
      icon: LuCircleCheck,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
    },
    {
      label: 'Laporan Masuk Belum Diverifikasi',
      value: pendingReports,
      desc: 'Laporan warga menunggu pengecekan',
      icon: LuShieldAlert,
      color: 'text-coral-base bg-coral-50 border-coral-200'
    },
    {
      label: 'Lokasi Pemulihan Terpublikasi',
      value: restorationSites.length,
      desc: 'Data terbuka tingkat area/desa',
      icon: LuUsers,
      color: 'text-teal-base bg-teal-50 border-teal-200'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item, idx) => {
        const Icon = item.icon
        return (
          <div
            key={idx}
            className="rounded-2xl border border-ink-200/90 bg-surface-card p-5 shadow-2xs hover:border-teal-200 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-ink-600">{item.label}</span>
              <div className={`flex h-8 w-8 items-center justify-center rounded-xl border ${item.color}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight">
              {item.value}
            </div>
            <p className="mt-1 text-[11px] text-ink-500 leading-normal">
              {item.desc}
            </p>
          </div>
        )
      })}
    </div>
  )
}

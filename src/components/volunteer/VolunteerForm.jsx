import { useState } from 'react'
import { LuMail, LuPhone, LuMapPin, LuSend, LuCircleCheck } from 'react-icons/lu'

const SKILL_OPTIONS = [
  { id: 'menyelam', label: 'Menyelam (berlisensi)' },
  { id: 'snorkeling', label: 'Snorkeling' },
  { id: 'dokumentasi', label: 'Dokumentasi foto/video' },
  { id: 'pencatatan', label: 'Pencatatan & analisis' },
  { id: 'edukasi', label: 'Edukasi masyarakat' },
  { id: 'logistik', label: 'Logistik & perahu' }
]

const TIME_AVAILABILITY = ['Akhir pekan', 'Hari kerja', 'Fleksibel']

const REGION_OPTIONS = [
  { value: 'denpasar', label: 'Denpasar', manager: 'Pengelola Tim Daerah Denpasar' },
  { value: 'klungkung', label: 'Klungkung', manager: 'Pengelola Tim Daerah Klungkung' },
  { value: 'buleleng', label: 'Buleleng', manager: 'Pengelola Tim Daerah Buleleng' },
  { value: 'karangasem', label: 'Karangasem', manager: 'Pengelola Tim Daerah Karangasem' }
]

export function VolunteerForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    region: 'denpasar',
    district: '',
    skills: ['menyelam', 'pencatatan'],
    availability: 'Akhir pekan',
    motivation: '',
    agreeConsent: true
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleTextChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const toggleSkill = (skillId) => {
    setFormData((prev) => {
      const exists = prev.skills.includes(skillId)
      return {
        ...prev,
        skills: exists ? prev.skills.filter((s) => s !== skillId) : [...prev.skills, skillId]
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 450)
  }

  const currentRegion = REGION_OPTIONS.find((r) => r.value === formData.region)

  return (
    <div className="rounded-2xl border border-ink-200/80 bg-surface-card p-6 sm:p-8 shadow-2xs">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-ink-900 tracking-tight">
          Formulir pendaftaran relawan
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-ink-600">
          Semua data hanya dilihat pengelola daerah yang kamu pilih.
        </p>
      </div>

      {submitted ? (
        <div className="mt-6 rounded-xl bg-state-success-bg border border-state-success-border p-6 text-center animate-in fade-in duration-200">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-state-success-text mb-3">
            <LuCircleCheck className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-ink-900">Pendaftaran Berhasil Dikirim!</h3>
          <p className="mt-1 text-sm text-ink-600 max-w-sm mx-auto leading-relaxed">
            Terima kasih atas kepedulianmu. Pengelola tim daerah {currentRegion?.label} akan meninjau datamu dalam 1–5 hari kerja.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false)
              setFormData({
                fullName: '',
                email: '',
                phone: '',
                region: 'denpasar',
                district: '',
                skills: ['menyelam', 'pencatatan'],
                availability: 'Akhir pekan',
                motivation: '',
                agreeConsent: true
              })
            }}
            className="mt-5 inline-flex items-center justify-center rounded-full px-5 py-2 text-xs font-semibold text-teal-base bg-teal-50 hover:bg-teal-100 transition-colors"
          >
            Daftar Daerah Lain
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* 1. Nama Lengkap */}
          <div>
            <label htmlFor="fullName" className="block text-xs font-semibold text-ink-700 mb-1.5">
              Nama lengkap <span className="text-coral-base">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleTextChange}
              placeholder="Ni Luh Putu Ayu Lestari"
              className="w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-teal-base focus:outline-hidden focus:ring-2 focus:ring-teal-base/20 transition-all"
            />
          </div>

          {/* 2. Email & No HP/WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-ink-700 mb-1.5">
                Email <span className="text-coral-base">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-ink-400">
                  <LuMail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleTextChange}
                  placeholder="ayu.lestari@gmail.com"
                  className="w-full rounded-xl border border-ink-200 bg-white pl-10 pr-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-teal-base focus:outline-hidden focus:ring-2 focus:ring-teal-base/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-ink-700 mb-1.5">
                No. HP / WhatsApp <span className="text-coral-base">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-ink-400">
                  <LuPhone className="h-4 w-4" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleTextChange}
                  placeholder="08xx-xxxx-xxxx"
                  className="w-full rounded-xl border border-ink-200 bg-white pl-10 pr-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-teal-base focus:outline-hidden focus:ring-2 focus:ring-teal-base/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* 3. Daerah Tujuan & Kecamatan Domisili */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="region" className="block text-xs font-semibold text-ink-700 mb-1.5">
                Daerah tujuan <span className="text-coral-base">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-ink-400">
                  <LuMapPin className="h-4 w-4" />
                </div>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleTextChange}
                  className="w-full appearance-none rounded-xl border border-ink-200 bg-white pl-10 pr-8 py-2.5 text-sm text-ink-900 focus:border-teal-base focus:outline-hidden focus:ring-2 focus:ring-teal-base/20 transition-all cursor-pointer"
                >
                  {REGION_OPTIONS.map((reg) => (
                    <option key={reg.value} value={reg.value}>
                      {reg.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-ink-400">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
              <p className="mt-1 text-[11px] text-ink-500">
                Ditinjau oleh {currentRegion?.manager}
              </p>
            </div>

            <div>
              <label htmlFor="district" className="block text-xs font-semibold text-ink-700 mb-1.5">
                Kecamatan domisili
              </label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleTextChange}
                placeholder="Denpasar Selatan"
                className="w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-teal-base focus:outline-hidden focus:ring-2 focus:ring-teal-base/20 transition-all"
              />
            </div>
          </div>

          {/* 4. Keahlian (Boleh lebih dari satu) */}
          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-2">
              Keahlian <span className="font-normal text-ink-500">(boleh lebih dari satu)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SKILL_OPTIONS.map((skill) => {
                const isChecked = formData.skills.includes(skill.id)
                return (
                  <label
                    key={skill.id}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-colors cursor-pointer text-xs font-medium ${
                      isChecked
                        ? 'border-teal-base bg-teal-50/50 text-teal-base'
                        : 'border-ink-200 hover:bg-ink-50 text-ink-800'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleSkill(skill.id)}
                      className="h-4 w-4 rounded-sm border-ink-300 text-teal-base focus:ring-teal-base cursor-pointer"
                    />
                    <span>{skill.label}</span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* 5. Ketersediaan Waktu (Pill buttons) */}
          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-2">
              Ketersediaan waktu
            </label>
            <div className="flex flex-wrap gap-2">
              {TIME_AVAILABILITY.map((time) => {
                const isSelected = formData.availability === time
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, availability: time }))}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-teal-50 text-teal-base border border-teal-base'
                        : 'bg-white text-ink-600 border border-ink-200 hover:bg-ink-50'
                    }`}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 6. Motivasi Singkat */}
          <div>
            <label htmlFor="motivation" className="block text-xs font-semibold text-ink-700 mb-1.5">
              Motivasi singkat
            </label>
            <textarea
              id="motivation"
              name="motivation"
              rows={3}
              maxLength={300}
              value={formData.motivation}
              onChange={handleTextChange}
              placeholder="Ceritakan kenapa kamu ingin bergabung..."
              className="w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-teal-base focus:outline-hidden focus:ring-2 focus:ring-teal-base/20 transition-all resize-none"
            />
            <p className="mt-1 text-[11px] text-ink-500">Opsional, maks. 300 karakter.</p>
          </div>

          {/* 7. Consent Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.agreeConsent}
                onChange={(e) => setFormData((prev) => ({ ...prev, agreeConsent: e.target.checked }))}
                className="mt-0.5 h-4 w-4 rounded-sm border-ink-300 text-teal-base focus:ring-teal-base cursor-pointer"
              />
              <span className="text-xs text-ink-700 leading-relaxed">
                Saya setuju data ini digunakan pengelola daerah untuk meninjau pendaftaran.
              </span>
            </label>
          </div>

          {/* 8. Bottom Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-ink-100">
            <p className="text-xs text-ink-500">
              Kamu akan menerima email setelah ditinjau.
            </p>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-800 hover:bg-teal-900 px-6 py-2.5 text-sm font-semibold text-white shadow-2xs transition-colors outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base disabled:opacity-70 cursor-pointer"
            >
              <span>{loading ? 'Mengirim...' : 'Kirim Pendaftaran'}</span>
              <LuSend className="h-4 w-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

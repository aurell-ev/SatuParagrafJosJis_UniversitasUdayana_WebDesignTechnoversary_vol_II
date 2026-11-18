import { useState } from 'react'
import {
  LuMail,
  LuPhone,
  LuMapPin,
  LuSend,
  LuCircleCheck,
  LuCircleAlert,
  LuCheck
} from 'react-icons/lu'
import { CustomSelect } from '../common/CustomSelect'

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
  { value: 'denpasar', label: 'Denpasar', description: 'Pengelola Tim Daerah Denpasar', manager: 'Pengelola Tim Daerah Denpasar' },
  { value: 'klungkung', label: 'Klungkung', description: 'Pengelola Tim Daerah Klungkung', manager: 'Pengelola Tim Daerah Klungkung' },
  { value: 'buleleng', label: 'Buleleng', description: 'Pengelola Tim Daerah Buleleng', manager: 'Pengelola Tim Daerah Buleleng' },
  { value: 'karangasem', label: 'Karangasem', description: 'Pengelola Tim Daerah Karangasem', manager: 'Pengelola Tim Daerah Karangasem' }
]

export function VolunteerForm({ onStepChange, selectedRegion, onRegionChange }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    region: selectedRegion || 'denpasar',
    district: '',
    skills: [], // Bersih tanpa auto centang
    availability: '', // Bersih tanpa default
    motivation: '',
    agreeConsent: false // Bersih tanpa auto centang
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [prevRegion, setPrevRegion] = useState(selectedRegion)

  // Mengikuti pola resmi React: state adjustment during render saat prop berubah
  if (selectedRegion && selectedRegion !== prevRegion) {
    setPrevRegion(selectedRegion)
    setFormData((prev) => ({ ...prev, region: selectedRegion }))
  }

  const handleTextChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === 'region' && onRegionChange) {
      onRegionChange(value)
    }
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const toggleSkill = (skillId) => {
    setFormData((prev) => {
      const exists = prev.skills.includes(skillId)
      const nextSkills = exists ? prev.skills.filter((s) => s !== skillId) : [...prev.skills, skillId]
      return { ...prev, skills: nextSkills }
    })
    if (errors.skills) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next.skills
        return next
      })
    }
  }

  const selectAvailability = (time) => {
    setFormData((prev) => ({ ...prev, availability: time }))
    if (errors.availability) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next.availability
        return next
      })
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nama lengkap wajib diisi.'
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Nama terlalu pendek (minimal 3 karakter).'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Alamat email wajib diisi.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid (contoh: nama@email.com).'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor WhatsApp / HP wajib diisi.'
    } else if (!/^[0-9+-\s]{9,16}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Nomor telepon tidak valid (minimal 9 digit angka).'
    }

    if (formData.skills.length === 0) {
      newErrors.skills = 'Pilih minimal salah satu bidang keahlian atau minatmu.'
    }

    if (!formData.availability) {
      newErrors.availability = 'Pilih salah satu ketersediaan waktumu.'
    }

    if (!formData.agreeConsent) {
      newErrors.agreeConsent = 'Kamu harus menyetujui penggunaan data untuk proses verifikasi.'
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      if (onStepChange) onStepChange(2)
    }, 450)
  }

  const currentRegion = REGION_OPTIONS.find((r) => r.value === formData.region)

  return (
    <div className="rounded-2xl border border-ink-200/80 bg-surface-card p-4 sm:p-7 lg:p-8 shadow-2xs">
      <div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-teal-base tracking-tight">
          Formulir pendaftaran relawan
        </h2>
        <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-ink-600">
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
              if (onStepChange) onStepChange(1)
              setFormData({
                fullName: '',
                email: '',
                phone: '',
                region: 'denpasar',
                district: '',
                skills: [],
                availability: '',
                motivation: '',
                agreeConsent: false
              })
            }}
            className="mt-5 inline-flex items-center justify-center rounded-full px-5 py-2 text-xs font-semibold text-teal-base bg-teal-50 hover:bg-teal-100 transition-colors cursor-pointer"
          >
            Daftar Daerah Lain
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
          {/* 1. Nama Lengkap */}
          <div>
            <label htmlFor="fullName" className="block text-xs font-semibold text-ink-700 mb-1.5">
              Nama lengkap <span className="text-coral-base">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleTextChange}
              placeholder="Ni Luh Putu Ayu Lestari"
              className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-hidden transition-all ${errors.fullName
                ? 'border-coral-400 bg-coral-50/20 ring-2 ring-coral-300/40 focus:border-coral-500'
                : 'border-ink-200 focus:border-teal-base focus:ring-2 focus:ring-teal-base/20'
                }`}
            />
            {errors.fullName && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-coral-600 animate-in fade-in duration-150">
                <LuCircleAlert className="h-3.5 w-3.5 shrink-0" />
                <span>{errors.fullName}</span>
              </p>
            )}
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
                  value={formData.email}
                  onChange={handleTextChange}
                  placeholder="ayu.lestari@gmail.com"
                  className={`w-full rounded-xl border bg-white pl-10 pr-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-hidden transition-all ${errors.email
                    ? 'border-coral-400 bg-coral-50/20 ring-2 ring-coral-300/40 focus:border-coral-500'
                    : 'border-ink-200 focus:border-teal-base focus:ring-2 focus:ring-teal-base/20'
                    }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-coral-600 animate-in fade-in duration-150">
                  <LuCircleAlert className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
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
                  value={formData.phone}
                  onChange={handleTextChange}
                  placeholder="08xx-xxxx-xxxx"
                  className={`w-full rounded-xl border bg-white pl-10 pr-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-hidden transition-all ${errors.phone
                    ? 'border-coral-400 bg-coral-50/20 ring-2 ring-coral-300/40 focus:border-coral-500'
                    : 'border-ink-200 focus:border-teal-base focus:ring-2 focus:ring-teal-base/20'
                    }`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-coral-600 animate-in fade-in duration-150">
                  <LuCircleAlert className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>
          </div>

          {/* 3. Daerah Tujuan & Kecamatan Domisili */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="region" className="block text-xs font-semibold text-ink-700 mb-1.5">
                Daerah tujuan <span className="text-coral-base">*</span>
              </label>
              <CustomSelect
                id="region"
                name="region"
                value={formData.region}
                onChange={handleTextChange}
                options={REGION_OPTIONS}
                icon={LuMapPin}
                buttonClassName="font-semibold"
                aria-label="Daerah tujuan relawan"
              />
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
            <label className="block text-xs font-semibold text-ink-700 mb-1.5">
              Keahlian <span className="font-normal text-ink-500">(boleh lebih dari satu)</span> <span className="text-coral-base">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SKILL_OPTIONS.map((skill) => {
                const isChecked = formData.skills.includes(skill.id)
                return (
                  <label
                    key={skill.id}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-colors cursor-pointer text-xs font-medium ${isChecked
                      ? 'border-teal-base bg-teal-50/50 text-teal-base'
                      : 'border-ink-200 hover:bg-ink-50 text-ink-800'
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleSkill(skill.id)}
                      className="sr-only"
                    />
                    <div
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition-colors ${isChecked
                        ? 'border-teal-base bg-teal-base text-white'
                        : 'border-ink-300 bg-white'
                        }`}
                    >
                      {isChecked && <LuCheck className="h-3 w-3 stroke-[3]" />}
                    </div>
                    <span>{skill.label}</span>
                  </label>
                )
              })}
            </div>
            {errors.skills && (
              <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-coral-600 animate-in fade-in duration-150">
                <LuCircleAlert className="h-3.5 w-3.5 shrink-0" />
                <span>{errors.skills}</span>
              </p>
            )}
          </div>

          {/* 5. Ketersediaan Waktu (Pill buttons) */}
          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1.5">
              Ketersediaan waktu <span className="text-coral-base">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {TIME_AVAILABILITY.map((time) => {
                const isSelected = formData.availability === time
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => selectAvailability(time)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${isSelected
                      ? 'bg-teal-50 text-teal-base border border-teal-base'
                      : 'bg-white text-ink-600 border border-ink-200 hover:bg-ink-50'
                      }`}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
            {errors.availability && (
              <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-coral-600 animate-in fade-in duration-150">
                <LuCircleAlert className="h-3.5 w-3.5 shrink-0" />
                <span>{errors.availability}</span>
              </p>
            )}
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
            <label className={`flex items-start gap-2.5 p-3 rounded-xl border transition-colors cursor-pointer ${errors.agreeConsent ? 'border-coral-300 bg-coral-50/30' : 'border-transparent'
              }`}>
              <input
                type="checkbox"
                checked={formData.agreeConsent}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, agreeConsent: e.target.checked }))
                  if (errors.agreeConsent) {
                    setErrors((prev) => {
                      const next = { ...prev }
                      delete next.agreeConsent
                      return next
                    })
                  }
                }}
                className="sr-only"
              />
              <div
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition-colors ${formData.agreeConsent
                  ? 'border-teal-base bg-teal-base text-white'
                  : 'border-ink-300 bg-white'
                  }`}
              >
                {formData.agreeConsent && <LuCheck className="h-3 w-3 stroke-[3]" />}
              </div>
              <span className="text-xs text-ink-700 leading-relaxed">
                Saya setuju data ini digunakan pengelola daerah untuk meninjau pendaftaran. <span className="text-coral-base">*</span>
              </span>
            </label>
            {errors.agreeConsent && (
              <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-coral-600 px-3 animate-in fade-in duration-150">
                <LuCircleAlert className="h-3.5 w-3.5 shrink-0" />
                <span>{errors.agreeConsent}</span>
              </p>
            )}
          </div>

          {/* 8. Bottom Action Row */}
          <div className="pt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-ink-100">
            <p className="text-xs text-ink-500">
              Kamu akan menerima email setelah ditinjau.
            </p>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-teal-500 hover:bg-teal-600 px-6 py-3 sm:py-2.5 text-sm font-semibold text-white shadow-2xs transition-colors outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base disabled:opacity-70 cursor-pointer"
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

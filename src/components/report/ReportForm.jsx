import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../context/useAppContext'
import { findNearbyDuplicates } from '../../utils/duplicateDetector'
import { PhotoUploader } from './PhotoUploader'
import { LocationPicker } from './LocationPicker'
import { DamageTypeSelector } from './DamageTypeSelector'
import { LuSend, LuCircleAlert, LuLock, LuCheck, LuShieldCheck } from 'react-icons/lu'

export function ReportForm() {
  const navigate = useNavigate()
  const { reports, submitReport } = useData()

  // Form states - Tanpa auto-fill default
  const [photos, setPhotos] = useState([])
  const [coordinates, setCoordinates] = useState({ lat: -8.6795, lng: 115.2652 })
  const [locationName, setLocationName] = useState('')
  const [damageType, setDamageType] = useState('')
  const [observationDate, setObservationDate] = useState('')
  const [depthEstimate, setDepthEstimate] = useState('')
  const [description, setDescription] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [reporterName, setReporterName] = useState('')
  const [reporterEmail, setReporterEmail] = useState('')
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(false)
  const [agreeConsent, setAgreeConsent] = useState(false)

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Real-time duplicate calculation (<100m, 30 days, same damageType)
  const nearbyDuplicates = useMemo(() => {
    if (!damageType) return []
    const dummy = {
      coordinates,
      damageType,
      reportedAt: new Date().toISOString()
    }
    return findNearbyDuplicates(dummy, reports, 100)
  }, [coordinates, damageType, reports])

  const validate = () => {
    const newErrors = {}
    if (photos.length === 0) {
      newErrors.photos = 'Unggah minimal 1 foto bukti kerusakan karang.'
    }
    if (!coordinates.lat || !coordinates.lng) {
      newErrors.coordinates = 'Tentukan titik koordinat di peta.'
    }
    if (!damageType) {
      newErrors.damageType = 'Pilih salah satu jenis kerusakan karang.'
    }
    if (!observationDate) {
      newErrors.observationDate = 'Pilih tanggal pengamatan karang.'
    }
    if (!isAnonymous && !reporterName.trim()) {
      newErrors.reporterName = 'Nama lengkap wajib diisi jika tidak mengirim secara anonim.'
    }
    if (!isCaptchaChecked) {
      newErrors.captcha = 'Centang verifikasi "Saya bukan robot" untuk melanjutkan.'
    }
    if (!agreeConsent) {
      newErrors.agreeConsent = 'Kamu harus menyetujui bahwa laporan ini adalah dugaan awal.'
    }
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      // Scroll to first error field
      const firstErrorKey = Object.keys(validationErrors)[0]
      const el = document.getElementById(firstErrorKey) || document.querySelector(`[data-error-target="${firstErrorKey}"]`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      } else {
        window.scrollTo({ top: 180, behavior: 'smooth' })
      }
      return
    }

    setErrors({})
    setIsSubmitting(true)

    setTimeout(() => {
      // Pick first photo as main image or standard Cloudinary sample
      const primaryImage =
        photos[0] ||
        'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794753742/main-sample.png'

      const newReport = submitReport({
        isAnonymous,
        reporterName: isAnonymous ? 'Anonim' : reporterName.trim(),
        reporterContact: reporterEmail.trim(),
        damageType,
        description: description.trim(),
        locationName: locationName.trim() || 'Perairan Bali',
        region: 'Denpasar, Bali',
        coordinates,
        imageUrl: primaryImage,
        photosList: photos,
        depthEstimate: depthEstimate || 'Tidak ditentukan',
        observationDate
      })

      setIsSubmitting(false)

      // Navigate to success confirmation page with report state
      navigate('/lapor/terkirim', { state: { report: newReport } })
    }, 600)
  }

  // Tombol aktif penuh saat syarat minimal utama terpenuhi
  const isFormReady =
    photos.length > 0 &&
    Boolean(damageType) &&
    Boolean(observationDate) &&
    isCaptchaChecked &&
    agreeConsent &&
    (isAnonymous || Boolean(reporterName.trim()))

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 sm:space-y-8">
      {/* Step 1: Foto Kerusakan */}
      <div className="rounded-2xl border border-ink-200/90 bg-surface-card p-4 sm:p-7 shadow-2xs">
        <div className="flex items-center gap-2.5 sm:gap-3 mb-1">
          <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-teal-base text-white text-[11px] sm:text-xs font-bold">
            1
          </span>
          <h3 className="text-sm sm:text-lg font-bold text-ink-900">
            Foto kerusakan
          </h3>
        </div>
        <p className="text-[11px] sm:text-xs text-ink-500 ml-8.5 sm:ml-10 mb-4 sm:mb-5">
          Minimal 1 foto. Foto dekat dan jauh lebih baik.
        </p>

        <PhotoUploader photos={photos} onPhotosChange={setPhotos} />

        {errors.photos && (
          <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-coral-600 animate-in fade-in">
            <LuCircleAlert className="h-3.5 w-3.5 shrink-0" />
            <span>{errors.photos}</span>
          </p>
        )}
      </div>

      {/* Step 2: Lokasi */}
      <div className="rounded-2xl border border-ink-200/90 bg-surface-card p-4 sm:p-7 shadow-2xs">
        <div className="flex items-center gap-2.5 sm:gap-3 mb-1">
          <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-teal-base text-white text-[11px] sm:text-xs font-bold">
            2
          </span>
          <h3 className="text-sm sm:text-lg font-bold text-ink-900">
            Lokasi
          </h3>
        </div>
        <p className="text-[11px] sm:text-xs text-ink-500 ml-8.5 sm:ml-10 mb-4 sm:mb-5">
          Geser penanda ke titik kerusakan. Titik ini tidak ditampilkan persis ke publik.
        </p>

        <LocationPicker
          coordinates={coordinates}
          locationName={locationName}
          onCoordinatesChange={setCoordinates}
          onLocationNameChange={setLocationName}
          isPossibleDuplicate={nearbyDuplicates.length > 0}
          nearbyCount={nearbyDuplicates.length}
        />
      </div>

      {/* Step 3: Jenis Kerusakan */}
      <div className="rounded-2xl border border-ink-200/90 bg-surface-card p-4 sm:p-7 shadow-2xs">
        <div className="flex items-center gap-2.5 sm:gap-3 mb-1">
          <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-teal-base text-white text-[11px] sm:text-xs font-bold">
            3
          </span>
          <h3 className="text-sm sm:text-lg font-bold text-ink-900">
            Jenis kerusakan
          </h3>
        </div>
        <p className="text-[11px] sm:text-xs text-ink-500 ml-8.5 sm:ml-10 mb-4 sm:mb-5">
          Pilih yang paling mendekati. Ini dugaan awal, bukan diagnosis.
        </p>

        <DamageTypeSelector
          selectedType={damageType}
          onSelectType={(type) => {
            setDamageType(type)
            if (errors.damageType) {
              setErrors((prev) => {
                const next = { ...prev }
                delete next.damageType
                return next
              })
            }
          }}
        />

        {errors.damageType && (
          <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-coral-600 animate-in fade-in">
            <LuCircleAlert className="h-3.5 w-3.5 shrink-0" />
            <span>{errors.damageType}</span>
          </p>
        )}
      </div>

      {/* Step 4: Detail Tambahan */}
      <div className="rounded-2xl border border-ink-200/90 bg-surface-card p-4 sm:p-7 shadow-2xs">
        <div className="flex items-center gap-2.5 sm:gap-3 mb-1">
          <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-teal-base text-white text-[11px] sm:text-xs font-bold">
            4
          </span>
          <h3 className="text-sm sm:text-lg font-bold text-ink-900">
            Detail tambahan
          </h3>
        </div>
        <p className="text-[11px] sm:text-xs text-ink-500 ml-8.5 sm:ml-10 mb-4 sm:mb-5">
          Opsional, membantu tim restorasi saat datang ke lokasi.
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="observationDate" className="block text-xs font-semibold text-ink-700 mb-1.5">
                Tanggal pengamatan <span className="text-coral-base">*</span>
              </label>
              <input
                type="date"
                id="observationDate"
                value={observationDate}
                onChange={(e) => {
                  setObservationDate(e.target.value)
                  if (errors.observationDate) {
                    setErrors((prev) => {
                      const next = { ...prev }
                      delete next.observationDate
                      return next
                    })
                  }
                }}
                className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs sm:text-sm text-ink-900 focus:outline-hidden focus:ring-2 transition-all cursor-pointer ${
                  errors.observationDate
                    ? 'border-coral-400 focus:border-coral-base focus:ring-coral-base/20'
                    : 'border-ink-200 focus:border-teal-base focus:ring-teal-base/20'
                }`}
              />
              {errors.observationDate && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-coral-600 animate-in fade-in">
                  <LuCircleAlert className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.observationDate}</span>
                </p>
              )}
            </div>

            <div>
              <label htmlFor="depthEstimate" className="block text-xs font-semibold text-ink-700 mb-1.5">
                Perkiraan kedalaman
              </label>
              <select
                id="depthEstimate"
                value={depthEstimate}
                onChange={(e) => setDepthEstimate(e.target.value)}
                className="w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-ink-900 focus:border-teal-base focus:outline-hidden focus:ring-2 focus:ring-teal-base/20 transition-all cursor-pointer"
              >
                <option value="">Pilih kedalaman (opsional)</option>
                <option value="< 3 meter">&lt; 3 meter (Dangkal / Snorkeling)</option>
                <option value="3-5 meter">3–5 meter</option>
                <option value="6-10 meter">6–10 meter (Diving dangkal)</option>
                <option value="> 10 meter">&gt; 10 meter (Diving dalam)</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-xs font-semibold text-ink-700 mb-1.5">
              Keterangan
            </label>
            <textarea
              id="description"
              rows={3}
              maxLength={500}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ceritakan luas perkiraan, kondisi sekitar, atau hal lain yang kamu amati..."
              className="w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-ink-900 placeholder:text-ink-400 focus:border-teal-base focus:outline-hidden focus:ring-2 focus:ring-teal-base/20 transition-all resize-none"
            />
            <p className="mt-1 text-[11px] text-ink-500">Opsional, maks. 500 karakter.</p>
          </div>
        </div>
      </div>

      {/* Step 5: Identitas & Kirim */}
      <div className="rounded-2xl border border-ink-200/90 bg-surface-card p-4 sm:p-7 shadow-2xs">
        <div className="flex items-center gap-2.5 sm:gap-3 mb-1">
          <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-teal-base text-white text-[11px] sm:text-xs font-bold">
            5
          </span>
          <h3 className="text-sm sm:text-lg font-bold text-ink-900">
            Identitas &amp; kirim
          </h3>
        </div>
        <p className="text-[11px] sm:text-xs text-ink-500 ml-8.5 sm:ml-10 mb-4 sm:mb-5">
          Laporan anonim tetap diterima, tidak mempengaruhi kecepatan tindak lanjut.
        </p>

        <div className="space-y-4">
          {/* Toggle Kirim sebagai anonim */}
          <div className="flex items-center gap-3 py-1">
            <button
              type="button"
              role="switch"
              aria-checked={isAnonymous}
              onClick={() => {
                const nextVal = !isAnonymous
                setIsAnonymous(nextVal)
                if (nextVal && errors.reporterName) {
                  setErrors((prev) => {
                    const next = { ...prev }
                    delete next.reporterName
                    return next
                  })
                }
              }}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                isAnonymous ? 'bg-teal-800' : 'bg-ink-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  isAnonymous ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <div>
              <span className="text-xs sm:text-sm font-bold text-ink-900">Kirim sebagai anonim</span>
              <p className="text-[11px] text-ink-500">
                Nama dan kontakmu tidak disimpan bersama laporan.
              </p>
            </div>
          </div>

          {/* Form Nama jika Anonim dinonaktifkan */}
          {!isAnonymous && (
            <div className="animate-in fade-in slide-in-from-top-1 duration-200">
              <label htmlFor="reporterName" className="block text-xs font-semibold text-ink-700 mb-1.5">
                Nama lengkapmu <span className="text-coral-base">*</span>
              </label>
              <input
                type="text"
                id="reporterName"
                value={reporterName}
                onChange={(e) => {
                  setReporterName(e.target.value)
                  if (errors.reporterName) {
                    setErrors((prev) => {
                      const next = { ...prev }
                      delete next.reporterName
                      return next
                    })
                  }
                }}
                placeholder="Cth: Wayan Artawa"
                className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs sm:text-sm text-ink-900 placeholder:text-ink-400 focus:outline-hidden focus:ring-2 transition-all ${
                  errors.reporterName
                    ? 'border-coral-400 focus:border-coral-base focus:ring-coral-base/20'
                    : 'border-ink-200 focus:border-teal-base focus:ring-teal-base/20'
                }`}
              />
              {errors.reporterName && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-coral-600 animate-in fade-in">
                  <LuCircleAlert className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.reporterName}</span>
                </p>
              )}
            </div>
          )}

          {/* Email input for status notification */}
          <div>
            <label htmlFor="reporterEmail" className="block text-xs font-semibold text-ink-700 mb-1.5">
              Email untuk kabar status (opsional)
            </label>
            <input
              type="email"
              id="reporterEmail"
              value={reporterEmail}
              onChange={(e) => setReporterEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-ink-900 placeholder:text-ink-400 focus:border-teal-base focus:outline-hidden focus:ring-2 focus:ring-teal-base/20 transition-all"
            />
            <p className="mt-1 text-[11px] text-ink-500">
              Hanya untuk mengirim kode lacak dan kabar status, tidak pernah dibagikan ke publik.
            </p>
          </div>

          {/* Mock Captcha Box */}
          <div>
            <div
              className={`w-full rounded-2xl border px-5 py-4 flex items-center justify-between transition-all cursor-pointer bg-white ${
                errors.captcha
                  ? 'border-coral-400 bg-coral-50/20'
                  : 'border-ink-200/90 hover:border-ink-300'
              }`}
              onClick={() => {
                const nextVal = !isCaptchaChecked
                setIsCaptchaChecked(nextVal)
                if (nextVal && errors.captcha) {
                  setErrors((prev) => {
                    const next = { ...prev }
                    delete next.captcha
                    return next
                  })
                }
              }}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                    isCaptchaChecked
                      ? 'border-teal-base bg-teal-base text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isCaptchaChecked && <LuCheck className="h-4 w-4 stroke-[3]" />}
                </div>
                <span className="text-sm font-medium text-ink-900 select-none">
                  Saya bukan robot
                </span>
              </div>
              <div className="flex flex-col items-center select-none text-slate-400">
                <LuShieldCheck className="h-6 w-6 text-slate-400 stroke-[1.75]" />
                <span className="text-[11px] font-medium text-slate-400 tracking-tight mt-0.5">Captcha</span>
              </div>
            </div>
            {errors.captcha && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-coral-600 animate-in fade-in">
                <LuCircleAlert className="h-3.5 w-3.5 shrink-0" />
                <span>{errors.captcha}</span>
              </p>
            )}
          </div>

          {/* Consent Checkbox */}
          <div>
            <label
              className={`flex items-start gap-2.5 p-3 rounded-xl border transition-colors cursor-pointer ${
                errors.agreeConsent ? 'border-coral-300 bg-coral-50/30' : 'border-transparent'
              }`}
            >
              <input
                type="checkbox"
                checked={agreeConsent}
                onChange={(e) => {
                  setAgreeConsent(e.target.checked)
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
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition-colors ${
                  agreeConsent
                    ? 'border-teal-base bg-teal-base text-white'
                    : 'border-ink-300 bg-white'
                }`}
              >
                {agreeConsent && <LuCheck className="h-3 w-3 stroke-[3]" />}
              </div>
              <span className="text-xs text-ink-700 leading-relaxed select-none">
                Saya tahu laporan ini adalah dugaan awal dan akan diverifikasi tim daerah. <span className="text-coral-base">*</span>
              </span>
            </label>
            {errors.agreeConsent && (
              <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-coral-600 px-3 animate-in fade-in">
                <LuCircleAlert className="h-3.5 w-3.5 shrink-0" />
                <span>{errors.agreeConsent}</span>
              </p>
            )}
          </div>
        </div>

        {/* Bottom Submission Strip */}
        <div className="mt-6 pt-5 border-t border-ink-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {!isFormReady ? (
            <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-3.5 py-2 text-xs text-amber-800 border border-amber-200/60">
              <LuLock className="h-4 w-4 shrink-0 text-amber-600" />
              <span>Lengkapi foto, tanggal, captcha, dan persetujuan untuk mengaktifkan tombol kirim.</span>
            </div>
          ) : (
            <div className="text-xs text-ink-500">
              Semua field wajib telah terisi. Siap dikirim ke tim daerah.
            </div>
          )}

          <div className="flex flex-col items-end gap-1.5 w-full sm:w-auto">
            <button
              type="submit"
              disabled={!isFormReady || isSubmitting}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold shadow-xs transition-colors outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base cursor-pointer ${
                isFormReady && !isSubmitting
                  ? 'bg-coral-base hover:bg-coral-hover text-white shadow-sm'
                  : 'bg-ink-200 text-ink-400 cursor-not-allowed'
              }`}
            >
              <span>{isSubmitting ? 'Mengirim Laporan...' : 'Kirim Laporan'}</span>
              <LuSend className="h-4 w-4" />
            </button>
            {Object.keys(errors).length > 0 && (
              <p className="text-xs font-semibold text-coral-600 flex items-center gap-1 animate-in fade-in">
                <LuCircleAlert className="h-3.5 w-3.5 shrink-0" />
                <span>Masih ada {Object.keys(errors).length} bagian formulir yang belum lengkap.</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}

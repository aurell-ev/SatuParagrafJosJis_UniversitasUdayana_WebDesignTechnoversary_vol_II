import { useState } from 'react'
import { FiSend, FiCheckCircle } from 'react-icons/fi'
import { LuTag } from 'react-icons/lu'
import { CustomSelect } from '../common/CustomSelect'

const TOPIC_OPTIONS = [
  'Pertanyaan umum',
  'Kerja sama / Kemitraan',
  'Pendaftaran relawan daerah',
  'Koreksi atau verifikasi data',
  'Masukan untuk platform'
]

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Pertanyaan umum',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate instant local submit
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 400)
  }

  return (
    <div className="bg-surface-card rounded-2xl border border-ink-200/80 p-6 sm:p-8 shadow-2xs">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-ink-900 tracking-tight">
          Kirim pesan
        </h2>
        <p className="mt-1 text-sm text-ink-600">
          Kami akan membalas ke email yang kamu tulis.
        </p>
      </div>

      {submitted ? (
        <div className="mt-6 rounded-xl bg-state-success-bg border border-state-success-border p-6 text-center animate-in fade-in duration-200">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-state-success-text mb-3">
            <FiCheckCircle className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-ink-900">Pesan Berhasil Terkirim!</h3>
          <p className="mt-1 text-sm text-ink-600 max-w-sm mx-auto">
            Terima kasih telah menghubungi kami. Tim PulihKarang akan segera menindaklanjuti pesanmu dalam 1–2 hari kerja.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false)
              setFormData({ name: '', email: '', topic: 'Pertanyaan umum', message: '' })
            }}
            className="mt-5 inline-flex items-center justify-center rounded-xl px-4 py-2 text-xs font-semibold text-teal-base bg-teal-50 hover:bg-teal-100 transition-colors"
          >
            Kirim Pesan Lain
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Row: Nama & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-ink-700 mb-1.5">
                Nama <span className="text-coral-base">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama kamu"
                className="w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-teal-base focus:outline-hidden focus:ring-2 focus:ring-teal-base/20 transition-all"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-ink-700 mb-1.5">
                Email <span className="text-coral-base">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nama@email.com"
                  className="w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-teal-base focus:outline-hidden focus:ring-2 focus:ring-teal-base/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Topik dropdown */}
          <div>
            <label htmlFor="topic" className="block text-xs font-semibold text-ink-700 mb-1.5">
              Topik <span className="text-coral-base">*</span>
            </label>
            <CustomSelect
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              options={TOPIC_OPTIONS}
              icon={LuTag}
            />
          </div>

          {/* Pesan */}
          <div>
            <label htmlFor="message" className="block text-xs font-semibold text-ink-700 mb-1.5">
              Pesan <span className="text-coral-base">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Tulis pesanmu di sini..."
              className="w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-teal-base focus:outline-hidden focus:ring-2 focus:ring-teal-base/20 transition-all resize-none"
            />
          </div>

          {/* Bottom row: disclaimer & submit button */}
          <div className="pt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-ink-500">
              Dengan mengirim, kamu menyetujui kebijakan privasi.
            </p>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-teal-500 hover:bg-teal-600 px-6 py-3 sm:py-2.5 text-sm font-semibold text-white shadow-2xs transition-colors outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base disabled:opacity-70 cursor-pointer"
            >
              <span>{loading ? 'Mengirim...' : 'Kirim Pesan'}</span>
              <FiSend className="h-4 w-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

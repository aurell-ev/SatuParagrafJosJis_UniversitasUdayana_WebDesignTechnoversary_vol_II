import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiX, FiHelpCircle, FiArrowRight } from 'react-icons/fi'

const FAQ_ITEMS = [
  {
    question: 'Apakah saya harus login untuk melapor?',
    answer:
      'Tidak. Kamu bisa melapor tanpa akun, bahkan secara anonim. Laporan anonim disaring dengan captcha dan batas jumlah kiriman.'
  },
  {
    question: 'Kenapa laporan saya belum muncul di halaman publik?',
    answer:
      'Setiap laporan warga diverifikasi terlebih dahulu oleh tim daerah setempat (biasanya 1–3 hari kerja) untuk memastikan validitas data dan menghindari laporan palsu atau duplikat sebelum ditampilkan pada peta publik.'
  },
  {
    question: 'Kenapa lokasi persis tidak ditampilkan?',
    answer:
      'Untuk melindungi terumbu karang yang rentan atau yang baru ditanam dari potensi eksploitasi berlebih, pencurian bibit, atau lonjakan kunjungan wisata yang belum terkelola. Peta publik hanya menyajikan tingkat area atau desa.'
  },
  {
    question: 'Bagaimana persentase hidup dihitung?',
    answer:
      'Persentase kelangsungan hidup dihitung dari jumlah fragmen karang yang tercatat masih hidup dibagi total bibit awal yang ditanam pada lokasi restorasi tersebut (≥70% Kondisi Baik, 40–69% Perlu Perhatian, <40% Kritis).'
  },
  {
    question: 'Apa arti label "data tim pelaksana" dan "sudah ditinjau pihak lain"?',
    answer:
      'Label "Data Tim Pelaksana" berarti data dicatat langsung oleh tim yang menanam di lapangan. Sedangkan "Sudah Ditinjau Pihak Lain" menandakan data hasil inspeksi tersebut telah diaudit atau divalidasi silang oleh peninjau independen, akademisi, atau mitra konservasi luar.'
  },
  {
    question: 'Bagaimana cara bergabung dengan tim daerah?',
    answer:
      'Kamu bisa mendaftar melalui halaman Gabung Tim. Kami menyambut relawan dengan lisensi selam untuk monitoring bawah air, maupun relawan tim darat untuk logistik, pengolahan data, dan edukasi komunitas.'
  }
]

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0)

  const toggleItem = (idx) => {
    setOpenIdx((prev) => (prev === idx ? -1 : idx))
  }

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center gap-2">
          <span className="h-[2px] w-6 rounded-full bg-secondary-500" />
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-secondary-500">
            FAQ
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink-900">
          Pertanyaan yang sering diajukan
        </h2>
      </div>

      {/* Accordion List */}
      <div className="max-w-4xl mx-auto space-y-3.5">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIdx === idx
          return (
            <div
              key={idx}
              className="rounded-2xl border border-ink-200/80 bg-surface-card overflow-hidden shadow-2xs transition-all duration-150"
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer outline-hidden focus-visible:bg-teal-50/50"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-bold text-ink-900">
                  {item.question}
                </span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${isOpen
                      ? 'bg-teal-base text-white'
                      : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
                    }`}
                >
                  {isOpen ? <FiX className="h-4 w-4" /> : <FiPlus className="h-4 w-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 animate-in fade-in duration-150">
                  <p className="text-sm leading-relaxed text-ink-600 border-t border-ink-100 pt-3.5">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Bottom Help Banner */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-teal-50 border border-teal-100/80 p-4 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3 text-sm text-teal-900">
            <FiHelpCircle className="h-5 w-5 shrink-0 text-teal-base" />
            <span className="font-medium text-xs sm:text-sm">
              Pertanyaanmu belum terjawab? Kirim pesan lewat formulir di atas.
            </span>
          </div>
          <Link
            to="/artikel"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-teal-900 hover:bg-teal-100/60 transition-colors shadow-2xs shrink-0"
          >
            <span>Baca artikel panduan</span>
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

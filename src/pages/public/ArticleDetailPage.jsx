import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  LuArrowLeft,
  LuArrowRight,
  LuClock,
  LuCalendar,
  LuShare2,
  LuBookmark,
  LuCheck,
  LuSun,
  LuAnchor,
  LuTrash2,
  LuFlame,
  LuMountain,
  LuCircleEllipsis,
  LuInfo,
  LuCamera,
  LuList
} from 'react-icons/lu'
import { useData } from '../../context/useAppContext'

/**
 * 6 Jenis Kerusakan Karang data spesifik sesuai Figma Desktop/Artikel Detail (node 1153:2742)
 */
const DAMAGE_TYPES = [
  {
    id: 1,
    title: '1. Pemutihan (coral bleaching)',
    icon: LuSun,
    iconBg: 'bg-amber-100 text-amber-700 border-amber-200',
    visual: 'Karang tampak putih pucat sampai putih kapur, tetapi struktur rangkanya masih utuh tanpa patah.',
    cause: 'Suhu laut naik berkepanjangan; karang melepaskan alga simbiotik (zooxanthellae) yang memberinya warna dan makanan.',
    action: 'Tim mencatat tingkat keparahan dan mengukur suhu air untuk memprediksi potensi pemulihan alami.'
  },
  {
    id: 2,
    title: '2. Patah karena jangkar',
    icon: LuAnchor,
    iconBg: 'bg-sky-100 text-sky-700 border-sky-200',
    visual: 'Cabang karang patah berserakan, koloni meja retak atau terbelah, kadang terlihat bekas seretan rantai di dasar laut.',
    cause: 'Kapal wisata atau perahu nelayan membuang jangkar langsung ke terumbu karang hidup bukan di fasilitas mooring buoy.',
    action: 'Pecahan cabang sehat bisa diselamatkan ke nursery karang sebelum tertutup alga atau lumpur.'
  },
  {
    id: 3,
    title: '3. Terlilit sampah laut',
    icon: LuTrash2,
    iconBg: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    visual: 'Jaring hantu (ghost nets), plastik, karung beras, atau tali pancing melilit koloni karang dan meremukkan cabangnya.',
    cause: 'Alat tangkap nelayan yang hanyut atau sampah daratan yang terbawa arus muara sungai.',
    action: 'Tim penyelam relawan mengorganisasi aksi pembersihan (dive clean-up) dengan teknik pelepasan hati-hati.'
  },
  {
    id: 4,
    title: '4. Bekas bom ikan (destructive fishing)',
    icon: LuFlame,
    iconBg: 'bg-rose-100 text-rose-700 border-rose-200',
    visual: 'Karang hancur menjadi puing-puing kecil (rubble) membentuk kawah melingkar, ikan kecil mati mengapung di dasar.',
    cause: 'Penggunaan bahan peledak rakitan atau bius potasium sianida untuk menangkap ikan secara instan.',
    action: 'Laporan segera dikoordinasikan dengan Polairud dan kawasan konservasi setempat untuk pengetatan patroli.'
  },
  {
    id: 5,
    title: '5. Tertutup sedimen / lumpur',
    icon: LuMountain,
    iconBg: 'bg-orange-100 text-orange-800 border-orange-200',
    visual: 'Lapisan lumpur cokelat keabu-abuan menutupi permukaan karang, air keruh, polip tampak tertutup partikel halus.',
    cause: 'Limpasan erosi tanah dari darat, pengerukan pesisir, reklamasi, atau deforestasi di hulu sungai.',
    action: 'Identifikasi sumber limpasan bersama otoritas lingkungan darat dan evaluasi filter sedimen pesisir.'
  },
  {
    id: 6,
    title: '6. Lainnya (penyakit, predator berlebih, dll.)',
    icon: LuCircleEllipsis,
    iconBg: 'bg-purple-100 text-purple-700 border-purple-200',
    visual: 'Bercak hitam/putih pita penyakit, serbuan bintang laut berduri (Acanthaster planci / COTS), atau anomali lainnya.',
    cause: 'Ketidakseimbangan ekosistem laut atau patogen bakteri perairan.',
    action: 'Tim biolog kelautan mengambil sampel visual untuk diagnosis jenis penyakit karang.'
  }
]

const REPORTING_TIPS = [
  'Ambil foto dari dua sudut: jarak dekat (close-up) untuk detail kerusakan, dan sudut lebar (wide) untuk memperlihatkan kondisi sekitarnya.',
  'Aktifkan GPS / geotagging pada kamera ponsel atau catatan koordinat kapal saat mengambil foto.',
  'Sertakan patokan ukuran tanpa menyentuh karang (misalnya fin selam atau kamera cadangan sebagai pembanding skala).',
  'Jaga daya apung (buoyancy) netral. Jangan pernah berdiri, menginjak, atau mematahkan karang hanya demi memotret.',
  'Catat perkiraan kedalaman (meter) dan kondisi arus di catatan tambahan formulir pelaporan.'
]

/**
 * Halaman Detail Artikel Edukasi (/artikel/:slug)
 * Mengacu pada desain Figma Desktop/Artikel Detail (node 1153:2742)
 */
export function ArticleDetailPage() {
  const { slug } = useParams()
  const { articles } = useData()
  const [isSaved, setIsSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    return <Navigate to="/artikel" replace />
  }

  // Artikel terkait lainnya (3 kartu)
  const relatedArticles = articles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: article.title, url: window.location.href }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const isSixDamageTypesArticle = article.slug === 'mengenal-6-jenis-kerusakan-karang'

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* 1. KEPALA ARTIKEL (Figma node 1153:2357) */}
      <section className="bg-white border-b border-slate-200 pt-8 pb-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigasi */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
            <Link
              to="/"
              className="hover:text-teal-base transition-colors focus-visible:outline-2 focus-visible:outline-teal-base rounded-xs"
            >
              Beranda
            </Link>
            <span className="text-slate-300">/</span>
            <Link
              to="/artikel"
              className="hover:text-teal-base transition-colors focus-visible:outline-2 focus-visible:outline-teal-base rounded-xs"
            >
              Artikel
            </Link>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-slate-800 line-clamp-1">{article.category}</span>
          </nav>

          {/* Badge Kategori */}
          <div className="mt-6">
            <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-base border border-teal-100">
              {article.category}
            </span>
          </div>

          {/* Judul Artikel */}
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[42px] leading-tight max-w-4xl">
            {article.title}
          </h1>

          {/* Ringkasan / Lead Subtitle */}
          <p className="mt-4 text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-4xl">
            {article.excerpt}
          </p>

          {/* Garis Pembatas Halus */}
          <div className="mt-8 border-t border-slate-200 pt-6 flex flex-wrap items-center justify-between gap-4">
            {/* Info Penulis & Tanggal */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-base font-bold text-sm ring-2 ring-white">
                TE
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{article.author || 'Tim Edukasi PulihKarang'}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <div className="flex items-center gap-1">
                    <LuCalendar className="h-3.5 w-3.5 text-slate-400" />
                    <span>{article.publishedAt ? '10 November 2026' : '10 November 2026'}</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <LuClock className="h-3.5 w-3.5 text-slate-400" />
                    <span>{article.readTime || '6 menit baca'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol Interaksi: Simpan & Bagikan */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-teal-base ${
                  isSaved
                    ? 'bg-teal-50 text-teal-base border border-teal-200'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
                aria-label="Simpan artikel"
              >
                <LuBookmark className={`h-4 w-4 ${isSaved ? 'fill-current text-teal-base' : 'text-slate-500'}`} />
                <span>{isSaved ? 'Tersimpan' : 'Simpan'}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="relative inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors focus-visible:outline-2 focus-visible:outline-teal-base"
                aria-label="Bagikan artikel"
              >
                <LuShare2 className="h-4 w-4 text-slate-500" />
                <span>{copied ? 'Tautan Disalin!' : 'Bagikan'}</span>
              </button>
            </div>
          </div>

          {/* Foto Sampul Utama */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-2xs">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full max-h-[520px] object-cover"
            />
          </div>
          <p className="mt-3 text-xs sm:text-sm text-slate-500 italic text-center sm:text-left">
            Terumbu karang dengan tanda pemutihan sebagian di perairan dangkal. Foto: Tim Edukasi PulihKarang / CC-BY
          </p>
        </div>
      </section>

      {/* 2. KONTEN ARTIKEL & SIDEBAR (Figma node 1153:2523) */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Kolom Kiri: Isi Artikel Utama (760px / col-span-8) */}
            <main className="lg:col-span-8">
              {isSixDamageTypesArticle ? (
                /* Konten spesifik artikel 6 jenis kerusakan sesuai desain Figma */
                <article className="prose-slate max-w-none text-slate-700">
                  <p className="text-base sm:text-lg leading-relaxed text-slate-700 font-normal">
                    Karang adalah hewan purba yang peka terhadap perubahan lingkungan. Di perairan Indonesia, ancaman
                    datang dari berbagai sumber—mulai dari kenaikan suhu laut global sampai aktivitas manusia yang ceroboh
                    di tingkat lokal. Mengenali jenis kerusakan adalah langkah pertama agar laporanmu bisa segera ditindaklanjuti
                    oleh tim daerah yang tepat.
                  </p>

                  {/* Section 1: Enam Jenis Kerusakan */}
                  <div id="jenis-kerusakan" className="mt-10 scroll-mt-28">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Enam jenis kerusakan yang bisa kamu laporkan
                    </h2>
                    <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                      Berikut enam kategori yang paling sering ditemui di lapangan, lengkap dengan ciri visual dan kemungkinan penyebabnya:
                    </p>

                    <div className="mt-6 space-y-6">
                      {DAMAGE_TYPES.map((item) => {
                        const IconComponent = item.icon
                        return (
                          <div
                            key={item.id}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs transition-shadow hover:shadow-xs"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${item.iconBg}`}>
                                <IconComponent className="h-5 w-5" />
                              </div>
                              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                                {item.title}
                              </h3>
                            </div>
                            <div className="mt-4 space-y-2.5 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                              <p>
                                <strong className="text-slate-800 font-semibold">Ciri visual:</strong> {item.visual}
                              </p>
                              <p>
                                <strong className="text-slate-800 font-semibold">Penyebab:</strong> {item.cause}
                              </p>
                              <p>
                                <strong className="text-teal-base font-semibold">Tindak lanjut lapangan:</strong> {item.action}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Callout Box: Dugaan bukan Diagnosis (Figma node 1153:2464) */}
                  <div className="mt-10 rounded-2xl border border-teal-200 bg-teal-50/70 p-6 sm:p-7">
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-base text-white">
                        <LuInfo className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-teal-950">
                          Laporanmu adalah dugaan, bukan diagnosis
                        </h4>
                        <p className="mt-1.5 text-sm sm:text-base text-teal-900/90 leading-relaxed">
                          Kamu tidak perlu menjadi biolog laut untuk melapor. Cukup pilih kategori yang paling mendekati apa yang kamu lihat di perairan. Tim verifikator daerah kami yang akan memvalidasi dan mengonfirmasi kondisi lapangan sebenarnya.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Cara Melapor yang Baik */}
                  <div id="cara-melapor" className="mt-12 scroll-mt-28">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Cara melapor yang baik
                    </h2>
                    <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                      Dokumentasi foto yang baik sangat menentukan seberapa cepat laporan dapat diverifikasi tanpa perlu survei ulang yang memakan waktu:
                    </p>

                    <ul className="mt-5 space-y-3.5 text-sm sm:text-base text-slate-700">
                      {REPORTING_TIPS.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-base mt-0.5">
                            <LuCheck className="h-3.5 w-3.5 stroke-[3]" />
                          </div>
                          <span className="leading-relaxed">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Foto Pendukung di Tengah Konten */}
                  <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-2xs">
                    <img
                      src="https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794821834/satu-paragraf-josjis/edu-survey.png"
                      alt="Penyelam relawan mendokumentasikan karang"
                      className="w-full max-h-[420px] object-cover"
                    />
                  </div>
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-500 italic text-center sm:text-left">
                    Penyelam relawan mendokumentasikan kondisi substrat karang menggunakan patokan kuadratik. Foto: Tim Edukasi PulihKarang / CC-BY
                  </p>

                  {/* Section 3: Setelah Laporan Terkirim */}
                  <div id="setelah-lapor" className="mt-12 scroll-mt-28">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Setelah laporan terkirim
                    </h2>
                    <p className="mt-3 text-slate-700 text-sm sm:text-base leading-relaxed">
                      Setelah mengirim formulir melalui form di PulihKarang, kamu akan mendapatkan kode pelacak unik (misal: <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-teal-base font-semibold">#PK-2026-088</code>). Tim verifikator lokal akan meninjau foto dan koordinat dalam waktu 1–3 hari kerja.
                    </p>
                    <p className="mt-3 text-slate-700 text-sm sm:text-base leading-relaxed">
                      Jika kerusakan terkonfirmasi parah (kategori kritis), titik lokasi langsung diteruskan ke agenda intervensi restorasi dan pembersihan oleh tim daerah terdekat. Kamu bisa memantau perkembangannya kapan saja dari halaman Perkembangan.
                    </p>
                  </div>

                  {/* Tag Chips */}
                  <div className="mt-10 border-t border-slate-200 pt-6 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500 mr-1">Tag:</span>
                    {['Pemutihan', 'Jangkar', 'Cara Melapor', 'Panduan Dasar'].map((tag) => (
                      <Link
                        key={tag}
                        to={`/artikel?search=${encodeURIComponent(tag)}`}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-base transition-colors focus-visible:outline-2 focus-visible:outline-teal-base"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </article>
              ) : (
                /* Konten umum untuk artikel lainnya */
                <article className="prose-slate max-w-none text-slate-700 space-y-6 text-base sm:text-lg leading-relaxed">
                  {article.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.includes('\n1.') || paragraph.includes('\n-')) {
                      const lines = paragraph.split('\n')
                      return (
                        <div key={index} className="space-y-3">
                          <p className="font-semibold text-slate-900">{lines[0]}</p>
                          <ul className="list-disc pl-6 space-y-2 text-slate-700">
                            {lines.slice(1).map((line, lIdx) => (
                              <li
                                key={lIdx}
                                dangerouslySetInnerHTML={{
                                  __html: line
                                    .replace(/^[-*]|\d+\.\s*/, '')
                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>')
                                }}
                              />
                            ))}
                          </ul>
                        </div>
                      )
                    }
                    return (
                      <p
                        key={index}
                        dangerouslySetInnerHTML={{
                          __html: paragraph.replace(
                            /\*\*(.*?)\*\*/g,
                            '<strong class="font-semibold text-slate-900">$1</strong>'
                          )
                        }}
                      />
                    )
                  })}
                </article>
              )}
            </main>

            {/* Kolom Kanan: Sidebar Sticky (360px / col-span-4) */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 self-start">
              
              {/* Kartu Daftar Isi */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <LuList className="h-4 w-4 text-teal-base" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Daftar isi
                  </h3>
                </div>
                <nav className="mt-4 flex flex-col space-y-2.5 text-sm">
                  <a
                    href="#jenis-kerusakan"
                    className="text-slate-600 hover:text-teal-base transition-colors focus-visible:outline-2 focus-visible:outline-teal-base rounded-xs"
                  >
                    1. Enam jenis kerusakan karang
                  </a>
                  <a
                    href="#cara-melapor"
                    className="text-slate-600 hover:text-teal-base transition-colors focus-visible:outline-2 focus-visible:outline-teal-base rounded-xs"
                  >
                    2. Cara melapor yang baik
                  </a>
                  <a
                    href="#setelah-lapor"
                    className="text-slate-600 hover:text-teal-base transition-colors focus-visible:outline-2 focus-visible:outline-teal-base rounded-xs"
                  >
                    3. Setelah laporan terkirim
                  </a>
                </nav>
              </div>

              {/* Kartu Lapor CTA (Figma node 1153:2519) */}
              <div className="rounded-2xl bg-teal-900 text-white p-6 shadow-xs relative overflow-hidden">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-800 text-teal-200 mb-4">
                  <LuCamera className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold leading-snug">
                  Melihat salah satunya di laut?
                </h3>
                <p className="mt-2 text-sm text-teal-100/90 leading-relaxed">
                  Kirim foto dan titik lokasinya. Bantuanmu membantu tim daerah merespons kerusakan lebih cepat.
                </p>
                <Link
                  to="/lapor"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-coral-base px-5 py-3 text-sm font-semibold text-white shadow-xs hover:bg-coral-hover transition-colors focus-visible:outline-2 focus-visible:outline-white"
                >
                  <span>Laporkan Kerusakan</span>
                  <LuArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Tombol Kembali ke Daftar Artikel */}
              <div>
                <Link
                  to="/artikel"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-teal-base transition-colors focus-visible:outline-2 focus-visible:outline-teal-base shadow-2xs"
                >
                  <LuArrowLeft className="h-4 w-4" />
                  <span>Kembali ke semua artikel</span>
                </Link>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* 3. ARTIKEL TERKAIT (Figma node 1153:2615) */}
      {relatedArticles.length > 0 && (
        <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-base">
                  BACA JUGA
                </span>
                <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  Artikel terkait
                </h3>
              </div>
              <Link
                to="/artikel"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-teal-base transition-colors focus-visible:outline-2 focus-visible:outline-teal-base self-start sm:self-auto"
              >
                <span>Semua artikel</span>
                <LuArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/artikel/${rel.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs hover:shadow-md transition-shadow focus-visible:outline-2 focus-visible:outline-teal-base"
                >
                  <div className="h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={rel.imageUrl}
                      alt={rel.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-teal-base">{rel.category}</span>
                      <span>{rel.readTime}</span>
                    </div>
                    <h4 className="mt-2.5 text-base font-bold text-slate-900 group-hover:text-teal-base transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-base">
                      <span>Baca selengkapnya</span>
                      <LuArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

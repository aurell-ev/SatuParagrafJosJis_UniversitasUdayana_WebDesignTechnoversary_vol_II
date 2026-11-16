import { Link } from 'react-router-dom'
import { Logo } from '../common/Logo'

export function Footer() {
  return (
    <footer className="w-full bg-[#07303B] text-[#AFD9E3]">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8">
        {/* Atas: Brand & 3 Kolom Navigasi */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Brand Column (2 cols width) */}
          <div className="space-y-4 lg:col-span-2">
            <Link to="/" className="inline-block outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg">
              <Logo variant="dark" />
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-[#AFD9E3]">
              Menghubungkan laporan kerusakan karang dari publik dengan tim restorasi daerah, serta membuka perkembangan pemulihannya untuk dipantau bersama secara transparan.
            </p>
          </div>

          {/* Kolom 1: Jelajahi */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">Jelajahi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-150">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors duration-150">
                  Tentang PulihKarang
                </Link>
              </li>
              <li>
                <Link to="/artikel" className="hover:text-white transition-colors duration-150">
                  Artikel Edukasi
                </Link>
              </li>
              <li>
                <Link to="/galeri" className="hover:text-white transition-colors duration-150">
                  Galeri Pemulihan
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 2: Partisipasi */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">Partisipasi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/lapor" className="hover:text-white transition-colors duration-150">
                  Laporkan Kerusakan
                </Link>
              </li>
              <li>
                <Link to="/perkembangan" className="hover:text-white transition-colors duration-150">
                  Pantau Perkembangan
                </Link>
              </li>
              <li>
                <Link to="/gabung" className="hover:text-white transition-colors duration-150">
                  Gabung Tim Daerah
                </Link>
              </li>
              <li>
                <Link to="/masuk" className="hover:text-white transition-colors duration-150">
                  Masuk Tim Konservasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Bantuan */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">Bantuan</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="hover:text-white transition-colors duration-150">
                  Kontak & FAQ
                </Link>
              </li>
              <li>
                <Link to="/artikel/panduan-melaporkan-kerusakan-karang-bagi-penyelam" className="hover:text-white transition-colors duration-150">
                  Cara Melapor yang Baik
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors duration-150">
                  Aturan Data Publik
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Garis Pembatas Sesuai Figma (#0F5C6E) */}
        <div className="my-10 h-px w-full bg-[#0F5C6E]" />

        {/* Bawah: Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#AFD9E3]">
          <p>© 2026 PulihKarang · Web Design Competition Techno Versary Vol. II</p>
          <p>EcoDigital For Environment · HIMA-TI FKOM Universitas Kuningan</p>
        </div>
      </div>
    </footer>
  )
}

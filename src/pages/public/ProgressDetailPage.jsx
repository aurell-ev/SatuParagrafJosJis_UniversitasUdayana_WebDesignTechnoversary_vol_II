import { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useData } from '../../context/useAppContext'
import { INITIAL_RESTORATION } from '../../data/restorationSeed'
import { ProgressDetailBreadcrumb } from '../../components/progress/detail/ProgressDetailBreadcrumb'
import { ProgressDetailHeader } from '../../components/progress/detail/ProgressDetailHeader'
import { ProgressDetailMedia } from '../../components/progress/detail/ProgressDetailMedia'
import { ProgressDetailKPI } from '../../components/progress/detail/ProgressDetailKPI'
import { ProgressDetailChart } from '../../components/progress/detail/ProgressDetailChart'
import { ProgressDetailFragments } from '../../components/progress/detail/ProgressDetailFragments'
import { ProgressDetailBeforeAfter } from '../../components/progress/detail/ProgressDetailBeforeAfter'
import { ProgressDetailSidebar } from '../../components/progress/detail/ProgressDetailSidebar'
import { CtaSection } from '../../components/home/CtaSection'

export function ProgressDetailPage() {
  const { id } = useParams()
  const { restorationSites } = useData()

  const allSites = restorationSites?.length ? restorationSites : INITIAL_RESTORATION
  
  // Cari site berdasarkan ID atau slug/nama (case-insensitive)
  const location = allSites.find(
    (s) => s.id?.toLowerCase() === id?.toLowerCase() ||
           s.name?.toLowerCase().replace(/\s+/g, '-') === id?.toLowerCase()
  ) || allSites[0] // fallback ke Sanur Kaja jika ID tak ditemukan

  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!location) {
    return <Navigate to="/perkembangan" replace />
  }

  return (
    <div className="bg-surface min-h-screen" data-node-id="1155:4438">
      {/* Kontainer Utama Lebar 1200px (Sesuai Figma node 1155:4052 & 1155:4293) */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col gap-8 sm:gap-10">
        {/* 1. Breadcrumb Nav */}
        <ProgressDetailBreadcrumb locationName={location.name} />

        {/* 2. Kepala Halaman: Judul, Badges & Aksi Bagikan / Lapor */}
        <ProgressDetailHeader location={location} />

        {/* 3. Media: Foto Utama + Mini Peta Area Disamarkan */}
        <ProgressDetailMedia location={location} />

        {/* 4. Seksi KPI: 4 Stat Cards */}
        <ProgressDetailKPI location={location} />

        {/* 5. Kolom Konten Utama (784px) & Sidebar (392px) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          {/* Kolom Kiri Utama (col-span-8 / 784px) */}
          <div className="lg:col-span-8 flex flex-col gap-8 w-full">
            {/* A. Kartu Grafik Garis Tren Kelangsungan Hidup */}
            <ProgressDetailChart location={location} />

            {/* B. Rincian Kondisi Fragmen & Bar Bertumpuk */}
            <ProgressDetailFragments location={location} />

            {/* C. Komparasi Foto Sebelum & Sesudah */}
            <ProgressDetailBeforeAfter location={location} />
          </div>

          {/* Kolom Kanan Sidebar (col-span-4 / 392px) */}
          <aside className="lg:col-span-4 w-full">
            <ProgressDetailSidebar location={location} />
          </aside>
        </div>
      </div>

      {/* 6. Banner CTA Lapor & Gabung Tim */}
      <CtaSection />
    </div>
  )
}

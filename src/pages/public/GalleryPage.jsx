import { useState, useMemo } from 'react'
import { GalleryHero } from '../../components/gallery/GalleryHero'
import { GalleryToolbar } from '../../components/gallery/GalleryToolbar'
import { GalleryFeaturedCard } from '../../components/gallery/GalleryFeaturedCard'
import { GalleryGrid } from '../../components/gallery/GalleryGrid'
import { GalleryModal } from '../../components/gallery/GalleryModal'
import { CallToAction } from '../../components/common/CallToAction'
import {
  FEATURED_GALLERY_ITEM,
  INITIAL_GALLERY_ITEMS
} from '../../data/gallerySeed'

/**
 * Halaman Galeri Foto Pemulihan (/galeri)
 * Sesuai desain Figma Desktop/Galeri (Node ID 1153:3164)
 */
export function GalleryPage() {
  const [selectedDaerah, setSelectedDaerah] = useState('Semua daerah')
  const [selectedSort, setSelectedSort] = useState('terbaru')
  const [visibleCount, setVisibleCount] = useState(6)
  const [activeModalItem, setActiveModalItem] = useState(null)

  // Filter client-side berdasarkan daerah
  const filteredItems = useMemo(() => {
    let result = [...INITIAL_GALLERY_ITEMS]

    if (selectedDaerah !== 'Semua daerah') {
      result = result.filter(
        (item) => item.daerah.toLowerCase() === selectedDaerah.toLowerCase()
      )
    }

    // Urutkan berdasarkan tanggal (terbaru / terlama)
    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return selectedSort === 'terbaru' ? dateB - dateA : dateA - dateB
    })

    return result
  }, [selectedDaerah, selectedSort])

  const handleDaerahChange = (daerah) => {
    setSelectedDaerah(daerah)
    setVisibleCount(6) // Reset pagination saat ganti filter
  }

  const handleSortChange = (sortValue) => {
    setSelectedSort(sortValue)
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6)
  }

  const handleShowLess = () => {
    setVisibleCount(6)
    const section = document.getElementById('semua-lokasi-section')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="flex flex-col">
      {/* 1. Page Hero Banner */}
      <GalleryHero />

      {/* 2. Konten Utama Galeri (Toolbar, Unggulan, Grid) */}
      <section className="bg-surface py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
          {/* Toolbar: Filter Daerah & Pengurutan */}
          <GalleryToolbar
            selectedDaerah={selectedDaerah}
            onSelectDaerah={handleDaerahChange}
            selectedSort={selectedSort}
            onSelectSort={handleSortChange}
          />

          {/* Kartu Unggulan (Hanya tampil saat filter "Semua daerah" atau "Klungkung") */}
          {(selectedDaerah === 'Semua daerah' ||
            selectedDaerah.toLowerCase() ===
              FEATURED_GALLERY_ITEM.daerah.toLowerCase()) && (
            <GalleryFeaturedCard
              item={FEATURED_GALLERY_ITEM}
              onOpenModal={setActiveModalItem}
            />
          )}

          {/* Grid Daftar Semua Lokasi */}
          <GalleryGrid
            items={filteredItems}
            totalCount={24}
            visibleCount={visibleCount}
            onLoadMore={handleLoadMore}
            onShowLess={handleShowLess}
            onOpenModal={setActiveModalItem}
            onResetFilter={() => handleDaerahChange('Semua daerah')}
          />
        </div>
      </section>

      {/* 3. CTA Banner */}
      <CallToAction
        title="Laporkan kerusakan karang yang kamu lihat"
        description="Tanpa akun, boleh anonim. Laporan tampil di peta publik setelah dicek tim daerah."
        primaryAction={{
          label: 'Laporkan Kerusakan',
          to: '/lapor'
        }}
        secondaryAction={{
          label: 'Gabung Tim Daerah',
          to: '/gabung'
        }}
      />

      {/* 4. Modal Lightbox Viewer */}
      {activeModalItem && (
        <GalleryModal
          item={activeModalItem}
          onClose={() => setActiveModalItem(null)}
        />
      )}
    </div>
  )
}

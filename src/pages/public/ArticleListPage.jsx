import { useState, useMemo } from 'react'
import { useData } from '../../context/useAppContext'
import { ArticleHeroSection } from '../../components/article/ArticleHeroSection'
import { ArticleToolbar } from '../../components/article/ArticleToolbar'
import { ArticleFeaturedSection } from '../../components/article/ArticleFeaturedSection'
import { ArticleListSection } from '../../components/article/ArticleListSection'
import { CallToAction } from '../../components/common/CallToAction'
import { ScrollReveal } from '../../components/common/ScrollReveal'

/**
 * Halaman Publik: Daftar Artikel & Edukasi (/artikel)
 * Mengikuti spesifikasi Figma node 1152:2660 (Desktop/Artikel)
 *
 * Urutan Layout Sesuai Figma Container 1152:2511:
 * 1. Toolbar Filter Kategori & Cari (1152:2298) - Di atas Artikel Unggulan
 * 2. Artikel Unggulan (1152:2356)
 * 3. Kepala & Grid Daftar Artikel (1152:2510 & 1152:2487) + Paginasi
 */
export function ArticleListPage() {
  const { articles } = useData()
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')

  // Artikel Unggulan Default (Figma node 1152:2356)
  const defaultFeatured =
    articles.find((a) => a.isFeatured) || articles[0]

  // Filter artikel berdasarkan Toolbar
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchCategory =
        selectedCategory === 'Semua' || article.category === selectedCategory

      const query = searchQuery.toLowerCase().trim()
      const matchSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)

      return matchCategory && matchSearch
    })
  }, [articles, selectedCategory, searchQuery])

  // Apakah artikel unggulan cocok dengan filter saat ini?
  const isFeaturedMatched = useMemo(() => {
    if (!defaultFeatured) return false
    const matchCat =
      selectedCategory === 'Semua' || defaultFeatured.category === selectedCategory
    const query = searchQuery.toLowerCase().trim()
    const matchSearch =
      !query ||
      defaultFeatured.title.toLowerCase().includes(query) ||
      defaultFeatured.excerpt.toLowerCase().includes(query)
    return matchCat && matchSearch
  }, [defaultFeatured, selectedCategory, searchQuery])

  // Grid artikel (mengecualikan artikel unggulan agar tidak dobel)
  const gridArticles = useMemo(() => {
    return filteredArticles.filter((a) => a.slug !== defaultFeatured?.slug)
  }, [filteredArticles, defaultFeatured])

  const handleResetFilter = () => {
    setSelectedCategory('Semua')
    setSearchQuery('')
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 1. Page Hero Banner (Figma node 1152:2259) */}
      <ArticleHeroSection />

      {/* 2. Container Konten Utama (Figma node 1152:2511) */}
      <div className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Toolbar diletakkan di ATAS Artikel Unggulan (Figma node 1152:2298) */}
        <ScrollReveal>
          <ArticleToolbar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </ScrollReveal>

        {/* Artikel Unggulan (Hanya tampil jika cocok dengan filter) */}
        {isFeaturedMatched && (
          <ScrollReveal className="mb-12">
            <ArticleFeaturedSection article={defaultFeatured} />
          </ScrollReveal>
        )}

        {/* Daftar 6 Artikel Terbaru & Paginasi (Figma node 1152:2510 & 1152:2487) */}
        <ArticleListSection
          articles={gridArticles}
          onResetFilter={handleResetFilter}
        />
      </div>

      {/* 3. Global Call To Action Banner (Figma node 1152:2537) */}
      <div className="bg-slate-50 pb-16 lg:pb-24">
        <CallToAction />
      </div>
    </div>
  )
}

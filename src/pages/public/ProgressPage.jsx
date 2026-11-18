import { useState, useMemo } from 'react'
import { useData } from '../../context/useAppContext'
import { OVERVIEW_STATS, REGIONS_OVERVIEW, INITIAL_RESTORATION } from '../../data/restorationSeed'
import { ProgressHero } from '../../components/progress/ProgressHero'
import { ProgressStatCards } from '../../components/progress/ProgressStatCards'
import { ProgressOverview } from '../../components/progress/ProgressOverview'
import { ProgressToolbar } from '../../components/progress/ProgressToolbar'
import { ProgressRegionGroup } from '../../components/progress/ProgressRegionGroup'
import { CtaSection } from '../../components/home/CtaSection'
import { ScrollReveal } from '../../components/common/ScrollReveal'

export function ProgressPage() {
  const { restorationSites } = useData()
  const rawLocations = restorationSites?.length ? restorationSites : INITIAL_RESTORATION

  // Filter States
  const [activeStatus, setActiveStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState(null)

  // Filter Logic
  const filteredLocations = useMemo(() => {
    return rawLocations.filter((loc) => {
      // 1. Filter Wilayah / Regency
      if (selectedRegion) {
        if (!loc.regency || loc.regency.toLowerCase() !== selectedRegion.toLowerCase()) {
          return false
        }
      }

      // 2. Filter Status
      if (activeStatus !== 'all') {
        const normalizedLocStatus = (loc.status || '').toLowerCase().replace(/\s+/g, '-')
        if (normalizedLocStatus !== activeStatus) {
          return false
        }
      }

      // 3. Search Query (area, desa, regency, nama lokasi)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchName = (loc.name || '').toLowerCase().includes(query)
        const matchArea = (loc.publicAreaName || '').toLowerCase().includes(query)
        const matchDistrict = (loc.district || '').toLowerCase().includes(query)
        const matchRegency = (loc.regency || '').toLowerCase().includes(query)
        if (!matchName && !matchArea && !matchDistrict && !matchRegency) {
          return false
        }
      }

      return true
    })
  }, [rawLocations, selectedRegion, activeStatus, searchQuery])

  return (
    <div className="bg-surface min-h-screen">
      {/* 1. Page Hero (Figma node 1155:3214) */}
      <ProgressHero />

      {/* 2. Daftar Lokasi Main Section Container (Figma node 1155:3817 / 1155:3816 - w: 1200px) */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-10">
        {/* Seksi Angka: 4 Stat Cards (Figma node 1155:3266) */}
        <ProgressStatCards stats={OVERVIEW_STATS} />

        {/* Seksi Ikhtisar: Peta Interaktif Leaflet + Ringkasan Daerah (Figma node 1155:3332) */}
        <ProgressOverview
          regions={REGIONS_OVERVIEW}
          locations={rawLocations}
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
        />

        {/* Seksi Toolbar: Status Chips & Search Input (Figma node 1155:3360) */}
        <ScrollReveal>
          <ProgressToolbar
            activeStatus={activeStatus}
            onStatusChange={setActiveStatus}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </ScrollReveal>

        {/* Seksi Daftar Lokasi Dikelompokkan per Daerah (Figma node 1155:3514 dkk) */}
        <ProgressRegionGroup
          locations={filteredLocations}
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
        />
      </div>

      {/* 3. CTA Banner (Figma node 1155:3818) */}
      <CtaSection />
    </div>
  )
}

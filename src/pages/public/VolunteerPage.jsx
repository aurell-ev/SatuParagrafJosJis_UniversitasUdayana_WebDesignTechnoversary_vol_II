import { useState, useRef } from 'react'
import { VolunteerHero } from '../../components/volunteer/VolunteerHero'
import { VolunteerInfo } from '../../components/volunteer/VolunteerInfo'
import { VolunteerForm } from '../../components/volunteer/VolunteerForm'
import { ActiveRegionsSection } from '../../components/volunteer/ActiveRegionsSection'

export function VolunteerPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedRegion, setSelectedRegion] = useState('denpasar')
  const formRef = useRef(null)

  const handleSelectRegion = (regionId) => {
    setSelectedRegion(regionId)
    // Smooth scroll ke formulir pendaftaran
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // Fokuskan input daerah
      setTimeout(() => {
        const selectEl = document.getElementById('region')
        if (selectEl) {
          selectEl.focus()
        }
      }, 500)
    }
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* 1. Hero Section */}
      <VolunteerHero />

      {/* 2. Main 2-Column Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <VolunteerInfo currentStep={currentStep} />
          </div>

          <div ref={formRef} className="lg:col-span-7 scroll-mt-24">
            <VolunteerForm
              onStepChange={setCurrentStep}
              selectedRegion={selectedRegion}
              onRegionChange={setSelectedRegion}
            />
          </div>
        </div>
      </div>

      <ActiveRegionsSection onSelectRegion={handleSelectRegion} />
    </div>
  )
}

import { HeroSection } from '../../components/home/HeroSection'
import { StatCardsSection } from '../../components/home/StatCardsSection'
import { ProblemSection } from '../../components/home/ProblemSection'
import { WorkflowSection } from '../../components/home/WorkflowSection'
import { MetricsSection } from '../../components/home/MetricsSection'
import { RecentProgressSection } from '../../components/home/RecentProgressSection'
import { EducationSection } from '../../components/home/EducationSection'
import { CtaSection } from '../../components/home/CtaSection'

export function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Section 1: Hero */}
      <HeroSection />

      {/* Section 2: Angka Ringkas (Stat Cards) */}
      <StatCardsSection />

      {/* Section 3: Masalah Kerusakan Karang */}
      <ProblemSection />

      {/* Section 4: Alur PulihKarang */}
      <WorkflowSection />

      {/* Section 5: Yang Diukur (Metrik & Grafik Batang Survival Rate) */}
      <MetricsSection />

      {/* Section 6: Perkembangan Terbaru (Kartu Lokasi yang Baru Diperiksa) */}
      <RecentProgressSection />

      {/* Section 7: Edukasi (Baca Sebelum Kamu Melapor) */}
      <EducationSection />

      {/* Section 8: CTA Banner (Laporkan Kerusakan & Gabung Tim) */}
      <CtaSection />
    </div>
  )
}

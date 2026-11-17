import { AboutHero } from '../../components/about/AboutHero'
import { AboutIntroSection } from '../../components/about/AboutIntroSection'
import { WhyMeasureSection } from '../../components/about/WhyMeasureSection'
import { WorkflowStepsSection } from '../../components/about/WorkflowStepsSection'
import { CorePrinciplesSection } from '../../components/about/CorePrinciplesSection'
import { TransparencyRulesSection } from '../../components/about/TransparencyRulesSection'
import { CallToAction } from '../../components/common/CallToAction'

export function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* 1. Page Hero Banner */}
      <AboutHero />

      {/* 2. Seksi Apa itu PulihKarang & 3 Peran */}
      <AboutIntroSection />

      {/* 3. Seksi Kenapa Mengukur Hasil Penting (Statistik 62% & Kasus 90 Hari) */}
      <WhyMeasureSection />

      {/* 4. Seksi Alur Cara Kerja (4 Langkah, 3 Peran) */}
      <WorkflowStepsSection />

      {/* 5. Seksi Nilai Pembeda (4 Aturan Kerja PulihKarang) */}
      <CorePrinciplesSection />

      {/* 6. Seksi Aturan Transparansi / Aturan Data Publik */}
      <TransparencyRulesSection />

      {/* 7. Call To Action Banner */}
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
    </div>
  )
}

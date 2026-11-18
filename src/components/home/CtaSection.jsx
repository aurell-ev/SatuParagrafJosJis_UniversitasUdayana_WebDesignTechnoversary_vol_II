import { CallToAction } from '../common/CallToAction'

/**
 * Section 8: Call to Action (CTA)
 * Sesuai node Figma 1150:2049 (CTA Banner)
 */
export function CtaSection() {
  return (
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
  )
}

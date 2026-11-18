import { Link } from 'react-router-dom'
import { LuCamera, LuArrowRight, LuSprout } from 'react-icons/lu'
import { ScrollReveal } from './ScrollReveal'

/**
 * Reusable CallToAction Banner Component
 * Sesuai desain Figma node 1150:2049 (CTA Banner)
 */
export function CallToAction({
  title = 'Laporkan kerusakan karang yang kamu lihat',
  description = 'Tanpa akun, boleh anonim. Laporan tampil di peta publik setelah dicek tim daerah.',
  primaryAction = {
    label: 'Laporkan Kerusakan',
    to: '/lapor',
    icon: LuCamera
  },
  secondaryAction = {
    label: 'Gabung Tim Daerah',
    to: '/gabung',
    icon: LuArrowRight
  },
  className = ''
}) {
  const PrimaryIcon = primaryAction?.icon || LuCamera
  const SecondaryIcon = secondaryAction?.icon || LuArrowRight

  return (
    <section className={`bg-slate-50 py-12 sm:py-16 lg:py-20 ${className}`}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* CTA Banner Container (1200x352 di desktop, r=24, bg-teal-base) */}
        <ScrollReveal className="relative overflow-hidden rounded-3xl bg-teal-base px-8 py-12 sm:px-12 sm:py-14 lg:px-16 lg:py-14 shadow-xl">
          <div className="relative z-10 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            {/* Teks & Tombol Aksi (Max 620px) */}
            <div className="max-w-[620px]">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[36px] lg:leading-[43.2px]">
                {title}
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-teal-100">
                {description}
              </p>

              {/* Tombol Aksi: Pill rounded-full */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {primaryAction && (
                  <Link
                    to={primaryAction.to}
                    className="inline-flex items-center justify-center gap-2.5 rounded-full bg-coral-base px-7 py-3.5 sm:py-4 text-base font-bold text-white shadow-sm hover:bg-coral-hover transition-colors"
                  >
                    <PrimaryIcon className="h-5 w-5 shrink-0" />
                    <span>{primaryAction.label}</span>
                  </Link>
                )}

                {secondaryAction && (
                  <Link
                    to={secondaryAction.to}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 sm:py-4 text-base font-bold text-teal-800 shadow-sm hover:bg-slate-50 transition-colors"
                  >
                    <span>{secondaryAction.label}</span>
                    <SecondaryIcon className="h-5 w-5 shrink-0 text-teal-800" />
                  </Link>
                )}
              </div>
            </div>

            {/* Dekorasi Konsentris Vektor Tunas Karang (Dekor 240x240, Dalam 160x160, Ikon 72x72) */}
            <div className="hidden lg:flex shrink-0 items-center justify-center">
              <div className="flex h-60 w-60 items-center justify-center rounded-full bg-teal-accent">
                <div className="flex h-40 w-40 items-center justify-center rounded-full bg-teal-base shadow-inner">
                  <LuSprout className="h-[72px] w-[72px] text-teal-200" />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

import { motion, useReducedMotion } from 'motion/react'
import { FiMail, FiMessageCircle, FiMapPin } from 'react-icons/fi'

const CONTACT_INFO = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'halo@pulihkarang.id',
    sub: 'Dibalas dalam 1–2 hari kerja',
    href: 'mailto:halo@pulihkarang.id'
  },
  {
    icon: FiMessageCircle,
    label: 'WhatsApp',
    value: '+62 812-0000-0000',
    sub: 'Senin - Jumat, 09.00-17.00 WITA',
    href: 'https://wa.me/6281200000000'
  },
  {
    icon: FiMapPin,
    label: 'Sekretariat',
    value: 'Denpasar, Bali',
    sub: 'Kunjungan dengan janji temu',
    href: null
  }
]

export function ContactInfoCards() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="space-y-4">
      {/* 3 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {CONTACT_INFO.map((item, idx) => {
          const Icon = item.icon
          const content = (
            <div className="flex items-start gap-4 p-5 sm:p-6 bg-surface-card rounded-2xl border border-ink-200/80 shadow-2xs transition-shadow duration-150 hover:shadow-sm h-full">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-base">
                <Icon className="size-6" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                  {item.label}
                </span>
                <p className="mt-0.5 text-base sm:text-lg font-bold text-ink-900 truncate">
                  {item.value}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-ink-500">
                  {item.sub}
                </p>
              </div>
            </div>
          )

          const motionProps = {
            initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
            whileInView: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
            viewport: { once: true, margin: '-20px' },
            transition: {
              duration: 0.4,
              delay: shouldReduceMotion ? 0 : idx * 0.1,
              ease: [0.21, 0.47, 0.32, 0.98]
            }
          }

          if (item.href) {
            return (
              <motion.a
                key={idx}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="block outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base rounded-2xl"
                {...motionProps}
              >
                {content}
              </motion.a>
            )
          }

          return (
            <motion.div key={idx} {...motionProps}>
              {content}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

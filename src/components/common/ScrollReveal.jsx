import { motion, useReducedMotion } from 'motion/react'

/**
 * Reusable ScrollReveal wrapper adhering to Hallmark & Ponytail guidelines:
 * - Only animates transform (y) & opacity (never width/height)
 * - Respects prefers-reduced-motion automatically
 * - once: true ensures zero re-trigger layout thrashing
 */
export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  yOffset = 24,
  duration = 0.5
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: yOffset }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: shouldReduceMotion ? 0.1 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

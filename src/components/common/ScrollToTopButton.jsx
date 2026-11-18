import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { LuArrowUp } from 'react-icons/lu'

/**
 * Reusable & Modular ScrollToTopButton
 * Sesuai prinsip Hallmark (aksesibilitas, reduced-motion, focus-visible) & Ponytail
 */
export function ScrollToTopButton({ threshold = 300, className = '' }) {
  const [isVisible, setIsVisible] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    function toggleVisibility() {
      if (window.scrollY > threshold) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    toggleVisibility()

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [threshold])

  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={handleScrollToTop}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 10 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={`fixed bottom-6 right-6 z-[1050] flex h-12 w-12 items-center justify-center rounded-full bg-teal-base text-white shadow-lg shadow-teal-900/20 hover:bg-teal-hover active:scale-95 transition-all cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-teal-light ${className}`}
          aria-label="Kembali ke atas"
          title="Kembali ke atas"
        >
          <LuArrowUp className="h-5 w-5 stroke-[2.5]" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

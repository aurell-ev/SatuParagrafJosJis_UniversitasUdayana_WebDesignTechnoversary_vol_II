import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { LuChevronDown, LuCheck } from 'react-icons/lu'

/**
 * Reusable CustomSelect component
 * Sesuai prinsip Hallmark (aksesibilitas WCAG, keyboard navigation, focus-visible) & Ponytail
 */
export function CustomSelect({
  id,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Pilih opsi...',
  icon: Icon = null,
  size = 'md',
  className = '',
  buttonClassName = '',
  menuClassName = '',
  'aria-label': ariaLabel,
  disabled = false
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  // Normalisasi options agar bisa menerima array of string maupun array of object
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { value: opt, label: String(opt), description: null }
    }
    return {
      value: opt.value,
      label: opt.label ?? String(opt.value),
      description: opt.description ?? null
    }
  })

  const currentOption = normalizedOptions.find((opt) => opt.value === value)
  const displayText = currentOption ? currentOption.label : placeholder

  // Tutup dropdown saat klik di luar atau tekan Escape
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleSelect = (val) => {
    if (disabled) return
    if (onChange) {
      // Kirim event object tiruan atau value langsung
      onChange({ target: { name: name || id, value: val } })
    }
    setIsOpen(false)
  }

  const handleButtonKeyDown = (e) => {
    if (disabled) return
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsOpen((prev) => !prev)
    }
  }

  const isSmall = size === 'sm'

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        name={name}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        onKeyDown={handleButtonKeyDown}
        className={`w-full flex items-center justify-between rounded-xl border bg-white text-ink-900 transition-all cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-teal-base/20 ${
          isSmall ? 'px-3 py-1.5 text-xs font-semibold' : 'px-3.5 py-2.5 text-sm font-medium'
        } ${
          isOpen
            ? 'border-teal-base ring-2 ring-teal-base/20 shadow-xs'
            : 'border-ink-200 hover:border-ink-300'
        } ${disabled ? 'opacity-60 cursor-not-allowed bg-ink-50' : ''} ${buttonClassName}`}
      >
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          {Icon && (
            <Icon className={`${isSmall ? 'h-3.5 w-3.5' : 'h-4 w-4'} text-teal-base shrink-0`} />
          )}
          <span className="truncate">{displayText}</span>
        </div>

        <LuChevronDown
          className={`${isSmall ? 'h-3.5 w-3.5' : 'h-4 w-4'} text-ink-400 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180 text-teal-base' : ''
          }`}
        />
      </button>

      {/* Dropdown Popover Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.98 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute left-0 right-0 top-full mt-1.5 z-[100] rounded-xl border border-ink-200 bg-surface-card p-1.5 shadow-lg overflow-hidden min-w-[180px] max-h-60 overflow-y-auto scrollbar-thin ${menuClassName}`}
          >
            <ul role="listbox" className="space-y-0.5">
              {normalizedOptions.map((opt) => {
                const isSelected = value === opt.value
                return (
                  <li
                    key={String(opt.value)}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleSelect(opt.value)
                      }
                    }}
                    tabIndex={0}
                    className={`flex items-center justify-between rounded-lg cursor-pointer transition-colors outline-hidden focus-visible:bg-teal-50 ${
                      isSmall ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-sm'
                    } ${
                      isSelected
                        ? 'bg-teal-50 text-teal-base font-semibold'
                        : 'text-ink-800 hover:bg-ink-50 hover:text-ink-900'
                    }`}
                  >
                    <div className="flex flex-col text-left pr-2">
                      <span className="font-semibold truncate">{opt.label}</span>
                      {opt.description && (
                        <span className="text-[11px] text-ink-500 font-normal">{opt.description}</span>
                      )}
                    </div>
                    {isSelected && (
                      <LuCheck className={`${isSmall ? 'h-3.5 w-3.5' : 'h-4 w-4'} text-teal-base stroke-[2.5] shrink-0`} />
                    )}
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

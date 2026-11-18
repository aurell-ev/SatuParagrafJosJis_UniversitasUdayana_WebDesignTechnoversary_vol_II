import { useState, useRef, useCallback } from 'react'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Sebelum',
  afterLabel = 'Sesudah',
  className = '',
  aspectRatio = 'aspect-[607/511]'
}) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [])

  const handleTouchMove = useCallback(
    (e) => {
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX)
      }
    },
    [handleMove]
  )

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return
      handleMove(e.clientX)
    },
    [isDragging, handleMove]
  )

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5))
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5))
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-2xl sm:rounded-3xl cursor-ew-resize ${aspectRatio} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      {/* 0. Base Image Layer (Mencegah celah subpixel) */}
      <img
        src={afterImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover pointer-events-none"
      />

      {/* 1. After Image (Sesudah) Layer - Terpotong dari kiri oleh sliderPosition */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
      >
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 size-full object-cover"
        />

        {/* Label Sesudah (Kanan Bawah) - Ikut tertutup saat slider digeser ke kanan */}
        <div className="absolute bottom-4 right-4 z-10">
          <span className="inline-block rounded-full bg-ink-900/80 px-3 py-1 text-xs sm:text-sm font-semibold text-white shadow-xs backdrop-blur-xs">
            {afterLabel}
          </span>
        </div>
      </div>

      {/* 2. Before Image (Sebelum) Layer - Terpotong dari kanan oleh (100 - sliderPosition) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 size-full object-cover"
        />

        {/* Label Sebelum (Kiri Bawah) - Ikut tertutup saat slider digeser ke kiri */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="inline-block rounded-full bg-ink-900/80 px-3 py-1 text-xs sm:text-sm font-semibold text-white shadow-xs backdrop-blur-xs">
            {beforeLabel}
          </span>
        </div>
      </div>

      {/* 3. Garis Pembatas Vertikal */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-surface-card pointer-events-none shadow-md"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      />

      {/* 4. Handle Geser Lingkaran di Tengah */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Geser untuk membandingkan sebelum dan sesudah"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-surface-card text-teal-base shadow-lg transition-transform hover:scale-105 active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-teal-base"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="flex items-center justify-center gap-0.5">
          <LuChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          <LuChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
      </div>
    </div>
  )
}

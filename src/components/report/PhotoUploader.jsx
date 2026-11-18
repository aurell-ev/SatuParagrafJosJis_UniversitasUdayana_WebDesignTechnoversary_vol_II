import { useState, useRef } from 'react'
import { LuCloudUpload, LuX, LuInfo, LuPlus } from 'react-icons/lu'

export function PhotoUploader({ photos, onPhotosChange }) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleFiles = (files) => {
    const fileList = Array.from(files)
    if (fileList.length === 0) return

    const remainingSlots = 3 - photos.length
    const filesToProcess = fileList.slice(0, remainingSlots)

    filesToProcess.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          onPhotosChange((prev) => {
            if (prev.length >= 3) return prev
            return [...prev, e.target.result]
          })
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const removePhoto = (index) => {
    onPhotosChange((prev) => prev.filter((_, idx) => idx !== index))
  }

  return (
    <div className="space-y-4">
      {/* Dropzone Box */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => {
          if (photos.length < 3 && fileInputRef.current) {
            fileInputRef.current.click()
          }
        }}
        className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-5 sm:p-7 text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-teal-base bg-teal-50/70'
            : 'border-teal-300/80 bg-teal-50/40 hover:bg-teal-50/70 hover:border-teal-base'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files)
          }}
        />

        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white shadow-xs text-teal-base mb-2.5 sm:mb-3">
          <LuCloudUpload className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>

        <p className="text-xs sm:text-sm font-bold text-ink-900 leading-snug">
          Seret foto ke sini atau <span className="text-teal-base underline">pilih dari perangkat</span>
        </p>
        <p className="mt-1 text-[11px] sm:text-xs text-ink-500">
          JPG/PNG maks. 3 foto, masing-masing ≤5MB
        </p>
      </div>

      {/* Thumbnails of Added Photos & Stock Helpers */}
      <div className="flex flex-wrap items-center gap-3">
        {photos.map((photoUrl, idx) => (
          <div
            key={idx}
            className="group relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-xl border border-ink-200 bg-slate-100 shadow-2xs"
          >
            <img
              src={photoUrl}
              alt={`Bukti kerusakan ${idx + 1}`}
              className="h-full w-full object-cover object-center"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                removePhoto(idx)
              }}
              className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-coral-base transition-colors"
              title="Hapus foto"
            >
              <LuX className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {photos.length < 3 && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-20 w-20 sm:h-24 sm:w-24 flex-col items-center justify-center rounded-xl border border-dashed border-ink-300 bg-white text-ink-500 hover:border-teal-base hover:text-teal-base transition-colors"
            title="Tambah foto"
          >
            <LuPlus className="h-6 w-6" />
            <span className="text-[11px] font-medium mt-1">Tambah</span>
          </button>
        )}
      </div>

      {/* Panduan Memotret Callout */}
      <div className="rounded-xl border border-teal-100/90 bg-teal-50/50 p-3.5 text-xs text-teal-900 flex items-start gap-2.5">
        <LuInfo className="h-4 w-4 shrink-0 text-teal-base mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-bold">Panduan memotret karang:</p>
          <p className="text-teal-800 leading-relaxed text-[11px] sm:text-xs">
            Ambil foto dari dekat dan jelas, sertakan patokan ukuran (tangan atau sirip), dan jangan menyentuh karang. Foto yang jelas mempercepat verifikasi.
          </p>
        </div>
      </div>
    </div>
  )
}

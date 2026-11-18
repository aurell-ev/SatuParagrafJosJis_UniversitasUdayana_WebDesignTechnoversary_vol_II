import { Link } from 'react-router-dom'
import { LuChevronRight } from 'react-icons/lu'

export function ProgressDetailBreadcrumb({ locationName = 'Detail Lokasi' }) {
  return (
    <nav 
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-sm text-slate-500 font-medium py-1"
      data-node-id="1155:3979"
    >
      <Link 
        to="/" 
        className="hover:text-teal-base transition-colors"
      >
        Beranda
      </Link>
      <LuChevronRight className="h-4 w-4 text-slate-400 shrink-0" />
      
      <Link 
        to="/perkembangan" 
        className="hover:text-teal-base transition-colors"
      >
        Perkembangan
      </Link>
      <LuChevronRight className="h-4 w-4 text-slate-400 shrink-0" />
      
      <span className="text-ink-900 font-semibold truncate max-w-[200px] sm:max-w-none">
        {locationName}
      </span>
    </nav>
  )
}

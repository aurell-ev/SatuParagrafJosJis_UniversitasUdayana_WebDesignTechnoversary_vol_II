import { Link } from 'react-router-dom';
import { LuArrowRight, LuUser, LuCalendar, LuClock } from 'react-icons/lu';

/**
 * Section 2: Artikel Unggulan
 * Sesuai desain Figma node 1152:2356 (Artikel Unggulan)
 */
export function ArticleFeaturedSection({ article }) {
   if (!article) return null;

   return (
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
         <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Gambar Artikel Unggulan (Figma node 1152:2299) */}
            <div className="relative lg:col-span-6 xl:col-span-7">
               <Link to={`/artikel/${article.slug}`} className="group block h-full overflow-hidden">
                  <img
                     src={article.imageUrl}
                     alt={article.title}
                     className="h-[260px] w-full object-cover transition-transform duration-300 group-hover:scale-102 sm:h-[340px] lg:h-full"
                  />
               </Link>
            </div>

            {/* Konten Artikel Unggulan (Figma node 1152:2355) */}
            <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-6 lg:p-10 xl:col-span-5">
               <div>
                  {/* Badges Kategori & Status (Panduan dasar & Jenis Kerusakan) */}
                  <div className="flex flex-wrap items-center gap-2">
                     {(article.badges || ['Panduan dasar', article.category]).map((badge, idx) => (
                        <span
                           key={idx}
                           className="text-teal-base rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-semibold"
                        >
                           {badge}
                        </span>
                     ))}
                  </div>

                  {/* Judul Artikel */}
                  <Link to={`/artikel/${article.slug}`}>
                     <h2 className="text-teal-base mt-4 text-2xl font-extrabold tracking-tight transition-colors hover:text-teal-700 sm:text-3xl lg:text-[28px] lg:leading-[34px]">
                        {article.title}
                     </h2>
                  </Link>

                  {/* Ringkasan */}
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                     {article.excerpt}
                  </p>

                  {/* Meta Informasi (Penulis, Tanggal, Durasi Baca) */}
                  <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
                     <div className="inline-flex items-center gap-1.5">
                        <LuUser className="text-teal-base h-4 w-4 shrink-0" />
                        <span>{article.author || 'Tim Edukasi PulihKarang'}</span>
                     </div>
                     <div className="inline-flex items-center gap-1.5">
                        <LuCalendar className="text-teal-base h-4 w-4 shrink-0" />
                        <span>10 Nov 2026</span>
                     </div>
                     <div className="inline-flex items-center gap-1.5">
                        <LuClock className="text-teal-base h-4 w-4 shrink-0" />
                        <span>{article.readTime}</span>
                     </div>
                  </div>
               </div>

               {/* Tombol Baca Artikel */}
               <div className="mt-6 border-t border-slate-100 pt-4">
                  <Link
                     to={`/artikel/${article.slug}`}
                     className="bg-teal-base inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-2xs transition-colors hover:bg-teal-700"
                  >
                     <span>Baca artikel</span>
                     <LuArrowRight className="h-4 w-4" />
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}

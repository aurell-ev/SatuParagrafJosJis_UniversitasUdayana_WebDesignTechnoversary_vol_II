import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DataProvider } from './context/DataContext'
import { AuthProvider } from './context/AuthContext'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ScrollToTopButton } from './components/common/ScrollToTopButton'
import { HomePage } from './pages/public/HomePage'
import { ArticleListPage } from './pages/public/ArticleListPage'
import { ArticleDetailPage } from './pages/public/ArticleDetailPage'
import { AboutPage } from './pages/public/AboutPage'
import { ProgressPage } from './pages/public/ProgressPage'
import { ProgressDetailPage } from './pages/public/ProgressDetailPage'
import { ContactPage } from './pages/public/ContactPage'
import { VolunteerPage } from './pages/public/VolunteerPage'
import { GalleryPage } from './pages/public/GalleryPage'

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <AuthProvider>
          <div className="flex min-h-screen flex-col bg-surface text-ink-900">
            {/* Skip to Content for Accessibility (WCAG 2.4.1) */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:bg-teal-base focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white focus:shadow-lg focus:outline-hidden focus:ring-2 focus:ring-teal-light"
            >
              Lewati ke konten utama
            </a>

            {/* Global Navbar */}
            <Navbar />

            {/* Main Content Area */}
            <main id="main-content" tabIndex={-1} className="flex-1 outline-hidden">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/artikel" element={<ArticleListPage />} />
                <Route path="/artikel/:slug" element={<ArticleDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/perkembangan" element={<ProgressPage />} />
                <Route path="/perkembangan/:id" element={<ProgressDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/gabung" element={<VolunteerPage />} />
                <Route path="/galeri" element={<GalleryPage />} />
              </Routes>
            </main>

            {/* Global Footer */}
            <Footer />

            {/* Global Floating Scroll-To-Top Button */}
            <ScrollToTopButton />
          </div>
        </AuthProvider>
      </DataProvider>
    </BrowserRouter>
  )
}

export default App

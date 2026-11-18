import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { DataProvider } from './context/DataContext'
import { AuthProvider } from './context/AuthContext'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { HomePage } from './pages/public/HomePage'
import { ArticleListPage } from './pages/public/ArticleListPage'
import { ArticleDetailPage } from './pages/public/ArticleDetailPage'
import { AboutPage } from './pages/public/AboutPage'
import { ProgressPage } from './pages/public/ProgressPage'
import { ProgressDetailPage } from './pages/public/ProgressDetailPage'
import { ContactPage } from './pages/public/ContactPage'
import { VolunteerPage } from './pages/public/VolunteerPage'
import { GalleryPage } from './pages/public/GalleryPage'
import { ReportPage } from './pages/public/ReportPage'
import { ReportSuccessPage } from './pages/public/ReportSuccessPage'
import { LoginPage } from './pages/public/LoginPage'
import { ManagerPortalPage } from './pages/manager/ManagerPortalPage'

function AppContent() {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/masuk'
  const isManagerPage = location.pathname.startsWith('/pengelola')

  return (
    <div className="flex min-h-screen flex-col bg-surface text-ink-900">
      {/* Global Navbar (Hidden on Auth standalone page & Manager Portal) */}
      {!isAuthPage && !isManagerPage && <Navbar />}

      {/* Main Content Area */}
      <main className="flex-1">
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
          <Route path="/lapor" element={<ReportPage />} />
          <Route path="/lapor/terkirim" element={<ReportSuccessPage />} />
          <Route path="/masuk" element={<LoginPage />} />
          <Route path="/login" element={<Navigate to="/masuk" replace />} />
          <Route path="/pengelola" element={<ManagerPortalPage />} />
        </Routes>
      </main>

      {/* Global Footer (Hidden on Auth standalone page) */}
      {!isAuthPage && <Footer />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </DataProvider>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DataProvider } from './context/DataContext'
import { AuthProvider } from './context/AuthContext'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { HomePage } from './pages/public/HomePage'
import { ArticleListPage } from './pages/public/ArticleListPage'
import { ArticleDetailPage } from './pages/public/ArticleDetailPage'
import { AboutPage } from './pages/public/AboutPage'

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <AuthProvider>
          <div className="flex min-h-screen flex-col bg-surface text-ink-900">
            {/* Global Navbar */}
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/artikel" element={<ArticleListPage />} />
                <Route path="/artikel/:slug" element={<ArticleDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </main>

            {/* Global Footer */}
            <Footer />
          </div>
        </AuthProvider>
      </DataProvider>
    </BrowserRouter>
  )
}

export default App

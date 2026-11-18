import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth, useData } from '../../context/useAppContext'
import { ManagerNavbar } from '../../components/layout/ManagerNavbar'
import { ManagerHeader } from '../../components/manager/ManagerHeader'
import { ManagerStats } from '../../components/manager/ManagerStats'
import { VolunteerApprovalsTab } from '../../components/manager/VolunteerApprovalsTab'
import { DataTransparencyTab } from '../../components/manager/DataTransparencyTab'
import { ReportAuditTab } from '../../components/manager/ReportAuditTab'
import { RestorationProgressTab } from '../../components/manager/RestorationProgressTab'

export function ManagerPortalPage() {
  const { isAuthenticated } = useAuth()
  const {
    volunteers,
    reviewVolunteer,
    reports,
    verifyReport,
    restorationSites,
    addInspection,
    updateRestorationSite
  } = useData()
  const [activeTab, setActiveTab] = useState('relawan') // 'relawan' | 'laporan' | 'perkembangan' | 'publikasi'

  // If not logged in, redirect to login demo page
  if (!isAuthenticated) {
    return <Navigate to="/masuk" replace />
  }

  return (
    <div className="min-h-screen bg-surface pb-16">
      {/* 1. Navbar Khusus Pengelola (4 Navigasi Utama) */}
      <ManagerNavbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 2. Header Profil Pengelola */}
      <ManagerHeader />

      {/* 3. Main Workspace Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        {/* KPI Stats Overview */}
        <ManagerStats
          volunteers={volunteers}
          reports={reports}
          restorationSites={restorationSites}
        />

        {/* Tab Contents */}
        <div className="pt-2">
          {activeTab === 'relawan' && (
            <VolunteerApprovalsTab
              volunteers={volunteers}
              onReview={reviewVolunteer}
            />
          )}

          {activeTab === 'laporan' && (
            <ReportAuditTab
              reports={reports}
              onVerifyReport={verifyReport}
            />
          )}

          {activeTab === 'perkembangan' && (
            <RestorationProgressTab
              restorationSites={restorationSites}
              onAddInspection={addInspection}
              onUpdateSite={updateRestorationSite}
            />
          )}

          {activeTab === 'publikasi' && (
            <DataTransparencyTab
              restorationSites={restorationSites}
            />
          )}
        </div>
      </div>
    </div>
  )
}

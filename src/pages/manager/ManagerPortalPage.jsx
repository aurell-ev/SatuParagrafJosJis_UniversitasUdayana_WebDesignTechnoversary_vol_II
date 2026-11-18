import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth, useData } from '../../context/useAppContext'
import { ManagerHeader } from '../../components/manager/ManagerHeader'
import { ManagerStats } from '../../components/manager/ManagerStats'
import { VolunteerApprovalsTab } from '../../components/manager/VolunteerApprovalsTab'
import { DataTransparencyTab } from '../../components/manager/DataTransparencyTab'
import { ReportAuditTab } from '../../components/manager/ReportAuditTab'

export function ManagerPortalPage() {
  const { isAuthenticated } = useAuth()
  const { volunteers, reviewVolunteer, reports, verifyReport, restorationSites } = useData()
  const [activeTab, setActiveTab] = useState('relawan') // 'relawan' | 'publikasi' | 'laporan'

  // If not logged in, redirect to login demo page
  if (!isAuthenticated) {
    return <Navigate to="/masuk" replace />
  }

  return (
    <div className="min-h-screen bg-surface pb-16">
      {/* 1. Portal Header & Navigation Bar */}
      <ManagerHeader activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 2. Main Workspace Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
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

          {activeTab === 'publikasi' && (
            <DataTransparencyTab
              restorationSites={restorationSites}
            />
          )}

          {activeTab === 'laporan' && (
            <ReportAuditTab
              reports={reports}
              onVerifyReport={verifyReport}
            />
          )}
        </div>
      </div>
    </div>
  )
}

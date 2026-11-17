import { useState, useEffect } from 'react'
import { INITIAL_REPORTS } from '../data/reportsSeed'
import { INITIAL_RESTORATION } from '../data/restorationSeed'
import { INITIAL_ARTICLES } from '../data/articlesSeed'
import { findNearbyDuplicates, generateTrackingCode } from '../utils/duplicateDetector'
import { DataContext } from './contexts'

const STORAGE_KEYS = {
  REPORTS: 'pulihkarang_reports',
  RESTORATION: 'pulihkarang_restoration',
  ARTICLES: 'pulihkarang_articles'
}

function loadInitial(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

export function DataProvider({ children }) {
  const [reports, setReports] = useState(() => loadInitial(STORAGE_KEYS.REPORTS, INITIAL_REPORTS))
  const [restorationSites, setRestorationSites] = useState(() =>
    loadInitial(STORAGE_KEYS.RESTORATION, INITIAL_RESTORATION)
  )
  const [articles] = useState(() => loadInitial(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES))

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports))
    } catch {
      // ignore storage errors
    }
  }, [reports])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RESTORATION, JSON.stringify(restorationSites))
    } catch {
      // ignore storage errors
    }
  }, [restorationSites])

  /**
   * Submit a new citizen report
   */
  const submitReport = (reportData) => {
    const id = generateTrackingCode()
    const newReport = {
      id,
      reporterName: reportData.isAnonymous ? 'Anonim' : reportData.reporterName || 'Warga Pesisir',
      reporterContact: reportData.isAnonymous ? '' : reportData.reporterContact || '',
      isAnonymous: Boolean(reportData.isAnonymous),
      damageType: reportData.damageType,
      description: reportData.description || '',
      locationName: reportData.locationName || 'Lokasi Pesisir',
      region: reportData.region || 'Indonesia',
      coordinates: reportData.coordinates || { lat: -8.7, lng: 115.2 },
      imageUrl: reportData.imageUrl || 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794753742/main-sample.png',
      reportedAt: new Date().toISOString(),
      status: 'baru',
      isPossibleDuplicate: false,
      duplicateOfId: null,
      verificationNotes: ''
    }

    // Duplicate detection check
    const duplicates = findNearbyDuplicates(newReport, reports, 100)
    if (duplicates.length > 0) {
      newReport.isPossibleDuplicate = true
      newReport.duplicateOfId = duplicates[0].id
    }

    setReports((prev) => [newReport, ...prev])
    return newReport
  }

  /**
   * Update report status (Tim Verification Action)
   */
  const verifyReport = (reportId, { status, verificationNotes, duplicateOfId = null }) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId
          ? {
              ...r,
              status,
              verificationNotes: verificationNotes ?? r.verificationNotes,
              duplicateOfId: duplicateOfId ?? r.duplicateOfId
            }
          : r
      )
    )
  }

  /**
   * Create restoration site from a valid report
   */
  const createRestorationSite = (siteData) => {
    const newSite = {
      id: `SITE-${Date.now().toString().slice(-4)}`,
      reportId: siteData.reportId,
      name: siteData.name,
      region: siteData.region,
      publicAreaName: siteData.publicAreaName,
      privateCoordinates: siteData.privateCoordinates,
      method: siteData.method,
      initialCondition: siteData.initialCondition || '',
      plantedAt: siteData.plantedAt || new Date().toISOString().split('T')[0],
      totalPlanted: Number(siteData.totalPlanted) || 0,
      coralGenera: siteData.coralGenera || [],
      currentSurvivalRate: 100,
      currentStatus: 'Tumbuh Baik',
      photos: siteData.photos || {
        before: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794753742/main-sample.png',
        after: 'https://res.cloudinary.com/gjrghchd/image/upload/f_auto,q_auto/v1794753742/main-sample.png'
      },
      inspections: []
    }

    setRestorationSites((prev) => [newSite, ...prev])
    return newSite
  }

  /**
   * Add inspection record to a restoration site
   */
  const addInspection = (siteId, inspectionData) => {
    setRestorationSites((prev) =>
      prev.map((site) => {
        if (site.id !== siteId) return site

        const alive = Number(inspectionData.aliveCount) || 0
        const total = site.totalPlanted || 1
        const rate = Math.round((alive / total) * 1000) / 10

        let status = 'Tumbuh Baik'
        if (rate < 40) status = 'Kritis'
        else if (rate < 70) status = 'Perlu Perhatian'

        const record = {
          date: inspectionData.date || new Date().toISOString().split('T')[0],
          ageDays: Number(inspectionData.ageDays) || 30,
          aliveCount: alive,
          deadCount: Number(inspectionData.deadCount) || 0,
          lostCount: Number(inspectionData.lostCount) || 0,
          survivalRate: rate,
          notes: inspectionData.notes || '',
          auditedBy: inspectionData.auditedBy || 'Data Tim Pelaksana'
        }

        return {
          ...site,
          currentSurvivalRate: rate,
          currentStatus: status,
          inspections: [...(site.inspections || []), record]
        }
      })
    )
  }

  // Aggregate stats for hero section
  const stats = {
    totalReports: reports.length,
    activeSites: restorationSites.length,
    totalPlanted: restorationSites.reduce((sum, s) => sum + (s.totalPlanted || 0), 0),
    avgSurvivalRate: restorationSites.length
      ? Math.round(
          (restorationSites.reduce((sum, s) => sum + (s.currentSurvivalRate || 0), 0) /
            restorationSites.length) *
            10
        ) / 10
      : 0
  }

  return (
    <DataContext.Provider
      value={{
        reports,
        restorationSites,
        articles,
        stats,
        submitReport,
        verifyReport,
        createRestorationSite,
        addInspection
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

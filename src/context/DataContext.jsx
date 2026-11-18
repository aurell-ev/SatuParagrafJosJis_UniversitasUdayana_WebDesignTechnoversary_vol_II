import { useState, useEffect } from 'react'
import { INITIAL_REPORTS } from '../data/reportsSeed'
import { INITIAL_RESTORATION } from '../data/restorationSeed'
import { INITIAL_ARTICLES } from '../data/articlesSeed'
import { INITIAL_VOLUNTEERS } from '../data/volunteersSeed'
import { findNearbyDuplicates, generateTrackingCode } from '../utils/duplicateDetector'
import { DataContext } from './contexts'

const STORAGE_KEYS = {
  REPORTS: 'pulihkarang_reports',
  RESTORATION: 'pulihkarang_restoration',
  ARTICLES: 'pulihkarang_articles',
  VOLUNTEERS: 'pulihkarang_volunteers'
}

function loadInitial(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    if (!saved) return fallback
    const parsed = JSON.parse(saved)
    if (Array.isArray(fallback) && Array.isArray(parsed) && parsed.length < fallback.length) {
      return fallback
    }
    return parsed
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
  const [volunteers, setVolunteers] = useState(() => loadInitial(STORAGE_KEYS.VOLUNTEERS, INITIAL_VOLUNTEERS))

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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(volunteers))
    } catch {
      // ignore storage errors
    }
  }, [volunteers])

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
      photosList: reportData.photosList || (reportData.imageUrl ? [reportData.imageUrl] : []),
      depthEstimate: reportData.depthEstimate || '',
      observationDate: reportData.observationDate || '',
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
   * Add inspection or update progress record to a restoration site
   */
  const addInspection = (siteId, inspectionData) => {
    setRestorationSites((prev) =>
      prev.map((site) => {
        if (site.id !== siteId) return site

        const total = Number(inspectionData.totalPlanted) || site.totalPlanted || 1
        const alive = Number(inspectionData.aliveCount) || 0
        const dead = Number(inspectionData.deadCount) || 0
        const lost = Number(inspectionData.lostCount) || 0
        const unobserved = Math.max(0, total - (alive + dead + lost))

        // Rumus Survival Rate Karang Hidup: (Alive / Total Planted) * 100
        const rate = Math.round((alive / total) * 1000) / 10

        let status = 'Tumbuh Baik'
        if (rate < 40) status = 'Kritis'
        else if (rate < 70) status = 'Perlu Perhatian'

        const record = {
          date: inspectionData.date || new Date().toISOString().split('T')[0],
          ageDays: Number(inspectionData.ageDays) || (site.ageDays ? site.ageDays + 30 : 30),
          aliveCount: alive,
          deadCount: dead,
          lostCount: lost,
          unobservedCount: unobserved,
          survivalRate: rate,
          notes: inspectionData.notes || '',
          auditedBy: inspectionData.auditedBy || 'Data Tim Pelaksana'
        }

        // Timeline activity entry
        const newActivity = {
          id: `act-${Date.now().toString().slice(-4)}`,
          title: inspectionData.activityTitle || `Pemeriksaan (${record.ageDays} hari)`,
          date: inspectionData.date || 'Hari ini',
          description: `${alive} hidup, ${dead} mati, ${lost} hilang, ${unobserved} belum diamati. ${inspectionData.notes || ''}`.trim(),
          type: inspectionData.activityType || 'inspection',
          status: rate >= 70 ? 'success' : rate >= 40 ? 'warning' : 'danger'
        }

        const ageDaysNum = Number(inspectionData.ageDays) || (site.ageDays ? site.ageDays + 30 : 30)
        const updatedHistory = [
          ...(site.growthHistory || []),
          {
            day: ageDaysNum,
            label: `${ageDaysNum} hr`,
            rate
          }
        ]

        return {
          ...site,
          currentSurvivalRate: rate,
          currentStatus: inspectionData.currentStatus || status,
          status: inspectionData.currentStatus || status,
          ageDays: ageDaysNum,
          aliveCount: alive,
          deadCount: dead,
          lostCount: lost,
          unobservedCount: unobserved,
          auditStatus: inspectionData.auditedBy || site.auditStatus || 'Data Tim Pelaksana',
          lastInspectionLabel: `Pemeriksaan · ${inspectionData.date || 'Hari ini'}`,
          updatedAtLabel: 'Baru saja diperbarui',
          inspectionCount: (site.inspectionCount || site.inspections?.length || 0) + 1,
          inspections: [...(site.inspections || []), record],
          activityTimeline: [newActivity, ...(site.activityTimeline || [])],
          growthHistory: updatedHistory
        }
      })
    )
  }

  /**
   * Update restoration site metadata (Method, Coral Genera, Status, Transparency Audit)
   */
  const updateRestorationSite = (siteId, updateData) => {
    setRestorationSites((prev) =>
      prev.map((site) => {
        if (site.id !== siteId) return site
        return {
          ...site,
          ...updateData,
          updatedAtLabel: 'Baru saja diperbarui'
        }
      })
    )
  }

  /**
   * Submit a new volunteer application from public form
   */
  const submitVolunteer = (volunteerData) => {
    const newVol = {
      id: `VOL-${Date.now().toString().slice(-4)}`,
      fullName: volunteerData.fullName,
      email: volunteerData.email,
      phone: volunteerData.phone,
      region: volunteerData.region || 'denpasar',
      regionName: volunteerData.regionName || 'Denpasar',
      district: volunteerData.district || '',
      skills: volunteerData.skills || [],
      availability: volunteerData.availability || 'Fleksibel',
      motivation: volunteerData.motivation || '',
      status: 'menunggu',
      submittedAt: new Date().toISOString(),
      reviewNotes: ''
    }
    setVolunteers((prev) => [newVol, ...prev])
    return newVol
  }

  /**
   * Review volunteer application (Manager action: approve or reject)
   */
  const reviewVolunteer = (volunteerId, { status, reviewNotes = '' }) => {
    setVolunteers((prev) =>
      prev.map((v) =>
        v.id === volunteerId
          ? {
            ...v,
            status,
            reviewNotes: reviewNotes ?? v.reviewNotes,
            reviewedAt: new Date().toISOString()
          }
          : v
      )
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
        volunteers,
        stats,
        submitReport, 
        verifyReport,
        createRestorationSite,
        addInspection,
        updateRestorationSite,
        submitVolunteer,
        reviewVolunteer
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

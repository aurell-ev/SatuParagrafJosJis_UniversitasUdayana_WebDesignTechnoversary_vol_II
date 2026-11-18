/**
 * Haversine distance calculator between two coordinates in meters
 */
export function getDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3 // Earth radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

/**
 * Checks if a new report is within radius (default 100m) and 30 days of existing reports of the same damage type
 */
export function findNearbyDuplicates(newReport, existingReports, radiusMeters = 100) {
  if (!newReport.coordinates?.lat || !newReport.coordinates?.lng) return []

  const now = new Date(newReport.reportedAt || new Date()).getTime()
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000

  return existingReports.filter((r) => {
    if (r.id === newReport.id) return false
    if (r.damageType !== newReport.damageType) return false
    if (!r.coordinates?.lat || !r.coordinates?.lng) return false

    const rTime = new Date(r.reportedAt).getTime()
    if (Math.abs(now - rTime) > thirtyDaysMs) return false

    const distance = getDistanceMeters(
      newReport.coordinates.lat,
      newReport.coordinates.lng,
      r.coordinates.lat,
      r.coordinates.lng
    )
    return distance <= radiusMeters
  })
}

/**
 * Generate human-readable unique tracking code e.g. PK-2026-X89B
 */
export function generateTrackingCode() {
  const year = new Date().getFullYear()
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `PK-${year}-${randomChars}`
}

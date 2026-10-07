import type { AppData } from './api'

export const PUBLIC_CACHE_TTL_MS = 10 * 60 * 1000
const API_SCOPE = (import.meta.env.VITE_APPS_SCRIPT_URL?.trim() || 'no-api-configured').replace(/[^a-zA-Z0-9_-]/g, '_').slice(-120)
export const PUBLIC_CACHE_KEY = `lm_public_bootstrap_v1:${API_SCOPE}`

interface PublicCacheRecord {
  version: 1
  savedAt: number
  data: AppData
}

export interface PublicCacheSnapshot {
  data: AppData
  savedAt: number
  ageMs: number
  fresh: boolean
  expiresAt: number
}

function isAppData(value: unknown): value is AppData {
  if (!value || typeof value !== 'object') return false
  const data = value as Partial<AppData>
  return Boolean(
    data.institute &&
      Array.isArray(data.courses) &&
      Array.isArray(data.notices) &&
      Array.isArray(data.materials) &&
      Array.isArray(data.gallery) &&
      Array.isArray(data.videoLectures),
  )
}

export function readPublicCache(now = Date.now()): PublicCacheSnapshot | null {
  try {
    const raw = localStorage.getItem(PUBLIC_CACHE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as Partial<PublicCacheRecord>
    if (parsed.version !== 1 || !Number.isFinite(parsed.savedAt) || !isAppData(parsed.data)) {
      localStorage.removeItem(PUBLIC_CACHE_KEY)
      return null
    }

    const savedAt = Number(parsed.savedAt)
    const ageMs = Math.max(0, now - savedAt)

    return {
      data: parsed.data,
      savedAt,
      ageMs,
      fresh: ageMs < PUBLIC_CACHE_TTL_MS,
      expiresAt: savedAt + PUBLIC_CACHE_TTL_MS,
    }
  } catch {
    // Corrupted/private-mode storage should never break the website.
    try { localStorage.removeItem(PUBLIC_CACHE_KEY) } catch { /* ignore */ }
    return null
  }
}

export function writePublicCache(data: AppData, now = Date.now()) {
  try {
    const record: PublicCacheRecord = {
      version: 1,
      savedAt: now,
      data,
    }
    localStorage.setItem(PUBLIC_CACHE_KEY, JSON.stringify(record))
  } catch {
    // Storage quota/private-mode failures are non-fatal; network data still works.
  }
}

export function clearPublicCache() {
  try { localStorage.removeItem(PUBLIC_CACHE_KEY) } catch { /* ignore */ }
}
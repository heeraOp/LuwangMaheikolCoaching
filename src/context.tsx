import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { ActivityLog, Course, Enquiry, GalleryItem, Material, Notice, VideoLecture } from './types'
import { api, type AdminData, type AppData, type InstituteInfo } from './services/api'
import { fallbackData } from './services/fallback'
import { PUBLIC_CACHE_TTL_MS, readPublicCache } from './services/publicCache'

interface AppContextValue {
  institute: InstituteInfo
  courses: Course[]
  notices: Notice[]
  materials: Material[]
  gallery: GalleryItem[]
  videoLectures: VideoLecture[]
  enquiries: Enquiry[]
  activityLogs: ActivityLog[]
  loading: boolean
  usingFallback: boolean
  error: string
  refreshPublic: () => Promise<void>
  refreshAdmin: () => Promise<void>
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData | AdminData>(fallbackData)
  const [loading, setLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)
  const [error, setError] = useState('')
  const refreshTimer = useRef<number | null>(null)

  const clearRefreshTimer = () => {
    if (refreshTimer.current !== null) {
      window.clearTimeout(refreshTimer.current)
      refreshTimer.current = null
    }
  }

  const schedulePublicRefresh = (expiresAt: number) => {
    clearRefreshTimer()
    const delay = Math.max(0, expiresAt - Date.now())
    refreshTimer.current = window.setTimeout(() => {
      void refreshPublic(true)
    }, delay)
  }

  const refreshPublic = async (background = false) => {
    if (!background) setLoading(true)
    setError('')
    try {
      const next = await api.getBootstrap()
      setData(next)
      setUsingFallback(false)
      setLoading(false)
      schedulePublicRefresh(Date.now() + PUBLIC_CACHE_TTL_MS)
    } catch (e) {
      const cached = readPublicCache()
      if (cached) {
        setData(cached.data)
        setUsingFallback(false)
        setError(background ? 'Live data refresh failed. Showing the last saved site data.' : '')
      } else {
        setUsingFallback(true)
        setError(e instanceof Error ? e.message : 'Unable to load site data')
      }
      setLoading(false)
    }
  }

  const refreshAdmin = async () => {
    setLoading(true); setError('')
    try {
      const next = await api.getAdminBootstrap()
      setData(next); setUsingFallback(false)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to load admin data')
      throw e
    } finally { setLoading(false) }
  }

  useEffect(() => {
    const cached = readPublicCache()

    if (cached?.fresh) {
      setData(cached.data)
      setUsingFallback(false)
      setLoading(false)
      schedulePublicRefresh(cached.expiresAt)
      return () => clearRefreshTimer()
    }

    // A stale cache is still useful while we revalidate it from the live API.
    if (cached) {
      setData(cached.data)
      setUsingFallback(false)
    }

    void refreshPublic()
    return () => clearRefreshTimer()
  }, [])

  const value = useMemo<AppContextValue>(() => ({
    institute: data.institute,
    courses: data.courses,
    notices: data.notices,
    materials: data.materials,
    gallery: data.gallery,
    videoLectures: data.videoLectures,
    enquiries: 'enquiries' in data ? data.enquiries : [],
    activityLogs: 'activityLogs' in data ? data.activityLogs : [],
    loading, usingFallback, error, refreshPublic: () => refreshPublic(false), refreshAdmin,
  }), [data, loading, usingFallback, error])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppData() {
  const value = useContext(AppContext)
  if (!value) throw new Error('useAppData must be used inside AppProvider')
  return value
}
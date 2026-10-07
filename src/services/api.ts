import type { ActivityLog, Course, Enquiry, GalleryItem, Material, Notice, VideoLecture } from '../types'
import { clearPublicCache, writePublicCache } from './publicCache'

export interface InstituteInfo {
  name: string; shortName: string; eyebrow: string; tagline: string; location: string; phone: string; email: string
  timings: string[]; classes: string[]; subjects: string[]; highlights: { title: string; text: string }[]
}
export interface AppData { institute: InstituteInfo; courses: Course[]; notices: Notice[]; materials: Material[]; gallery: GalleryItem[]; videoLectures: VideoLecture[] }
export interface AdminData extends AppData { enquiries: Enquiry[]; activityLogs: ActivityLog[] }

const API_URL = import.meta.env.VITE_APPS_SCRIPT_URL?.trim() || ''
export const getApiUrl = () => API_URL

const PUBLIC_CACHE_INVALIDATING_ACTIONS = new Set([
  'upsertCourse', 'setCourseStatus',
  'upsertNotice', 'setNoticeStatus',
  'upsertMaterial', 'setMaterialStatus',
  'upsertGallery', 'setGalleryStatus',
  'upsertVideo', 'setVideoStatus',
  'deleteRecord', 'updateInstitute',
])

async function request<T>(action: string, payload: Record<string, unknown> = {}, authenticated = false): Promise<T> {
  if (!API_URL) throw new Error('VITE_APPS_SCRIPT_URL is not configured.')
  const token = sessionStorage.getItem('lm_teacher_session') || ''
  const body = { action, ...(authenticated ? { session_token: token } : {}), ...payload }
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), 30000)

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body),
      signal: controller.signal,
    })
    const text = await response.text()
    if (!response.ok) throw new Error(`API request failed (${response.status})`)

    let result: { success?: boolean; error?: string; data?: T }
    try { result = JSON.parse(text) } catch { throw new Error('The API returned an invalid response. Check the Apps Script deployment.') }
    if (!result.success) throw new Error(result.error || 'Request failed')

    if (PUBLIC_CACHE_INVALIDATING_ACTIONS.has(action)) clearPublicCache()
    return result.data as T
  } catch (e) {
    if (e instanceof DOMException && e.name === 'AbortError') throw new Error('The API request timed out. Please try again.')
    throw e
  } finally {
    window.clearTimeout(timer)
  }
}

let publicBootstrapInFlight: Promise<AppData> | null = null

function pickPublicData(data: AdminData): AppData {
  return {
    institute: data.institute,
    courses: data.courses,
    notices: data.notices,
    materials: data.materials,
    gallery: data.gallery,
    videoLectures: data.videoLectures,
  }
}

export const api = {
  getBootstrap: (): Promise<AppData> => {
    if (!publicBootstrapInFlight) {
      publicBootstrapInFlight = request<AppData>('getBootstrap')
        .then(data => {
          writePublicCache(data)
          return data
        })
        .finally(() => { publicBootstrapInFlight = null })
    }
    return publicBootstrapInFlight
  },
  getAdminBootstrap: async (): Promise<AdminData> => {
    const data = await request<AdminData>('getAdminBootstrap', {}, true)
    // Admin bootstrap contains the same public content, so keep the public cache warm too.
    writePublicCache(pickPublicData(data))
    return data
  },
  login: (username: string, password: string) => request<{ sessionToken: string; user: { username: string; role: string; displayName: string } }>('login', { username, password }),
  validateSession: () => request<{ username: string; role: string; displayName: string }>('validateSession', {}, true),
  logout: () => request<{ ok: boolean }>('logout', {}, true),
  submitEnquiry: (input: Omit<Enquiry, 'id' | 'date' | 'status'>) => request<Enquiry>('submitEnquiry', { enquiry: input }),
  upsertCourse: (course: Partial<Course>) => request<Course>('upsertCourse', { course }, true),
  upsertNotice: (notice: Partial<Notice>) => request<Notice>('upsertNotice', { notice }, true),
  upsertMaterial: (material: Partial<Material>) => request<Material>('upsertMaterial', { material }, true),
  upsertGallery: (gallery: Partial<GalleryItem>) => request<GalleryItem>('upsertGallery', { gallery }, true),
  upsertVideo: (video: Partial<VideoLecture>) => request<VideoLecture>('upsertVideo', { video }, true),
  deleteRecord: (sheet: 'Courses'|'Notices'|'Materials'|'Gallery'|'Videos', id: string) => request<{ id: string; deleted: boolean }>('deleteRecord', { sheet, id }, true),
  setEnquiryStatus: (id: string, status: Enquiry['status']) => request<Enquiry>('setEnquiryStatus', { id, status }, true),
  updateInstitute: (institute: Partial<InstituteInfo>) => request<InstituteInfo>('updateInstitute', { institute }, true),
  uploadFile: (file: { name: string; mimeType: string; base64: string; folder: 'gallery'|'materials'|'notices'|'videos' }) => request<{ fileId: string; url: string; thumbnailUrl?: string; name: string }>('uploadFile', { file }, true),
}
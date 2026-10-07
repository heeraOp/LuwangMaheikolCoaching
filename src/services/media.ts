export function youtubeId(url?: string) {
  if (!url) return ''
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1).split('/')[0]
    if (u.searchParams.get('v')) return u.searchParams.get('v') || ''
    const parts = u.pathname.split('/').filter(Boolean)
    const i = parts.findIndex(p => p === 'embed' || p === 'shorts' || p === 'live')
    return i >= 0 ? parts[i + 1] || '' : ''
  } catch { return '' }
}

export function youtubeThumbnail(url?: string) {
  const id = youtubeId(url)
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : ''
}

export function driveId(url?: string) {
  if (!url) return ''
  const value = String(url)
  const match = value.match(/(?:id=|\/d\/|\/file\/d\/)([A-Za-z0-9_-]{20,})/)
  return match?.[1] || ''
}

export function driveThumbnail(url?: string) {
  const id = driveId(url)
  return id ? `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w1600` : ''
}

/** Convert legacy Drive file/folder URLs into an embeddable image URL when possible. */
export function galleryImageUrl(url?: string) {
  if (!url) return ''
  if (url.includes('drive.google.com')) return driveThumbnail(url)
  return url
}

export function videoThumbnail(url?: string) {
  if (!url) return ''
  return youtubeThumbnail(url) || driveThumbnail(url)
}

export type Status = 'ACTIVE' | 'ARCHIVED'

export interface Course {
  id: string
  title: string
  audience: string
  subjects: string[]
  schedule: string
  duration: string
  fee: string
  description: string
  featured?: boolean
  status: Status
  imageUrl?: string
  fileId?: string
}

export interface Notice {
  id: string
  title: string
  date: string
  category: string
  content: string
  status: Status
  attachmentUrl?: string
  fileId?: string
}

export interface Material {
  id: string
  title: string
  subject: string
  className: string
  type: 'PDF' | 'Worksheet' | 'Notes'
  size: string
  date: string
  description: string
  status: Status
  fileUrl?: string
  fileId?: string
}

export interface GalleryItem {
  id: string
  title: string
  category: string
  description: string
  tone: 'blue' | 'gold' | 'teal' | 'violet'
  status: Status
  imageUrl?: string
  fileId?: string
}

export interface Enquiry {
  id: string
  name: string
  phone: string
  className: string
  message: string
  date: string
  status: 'NEW' | 'CONTACTED'
}


export interface VideoLecture {
  id: string
  title: string
  subject: string
  className: string
  duration: string
  date: string
  description: string
  youtubeUrl: string
  videoUrl?: string
  thumbnailUrl?: string
  fileId?: string
  status: Status
}

export interface ActivityLog {
  id: string
  action: string
  section: string
  actor: string
  date: string
  status: 'SUCCESS' | 'INFO'
}

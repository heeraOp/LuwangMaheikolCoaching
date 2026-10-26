
import type { SVGProps, ReactNode } from 'react'

type Props = SVGProps<SVGSVGElement> & { size?: number }

const I = ({
  children,
  size,
  ...p
}: Props & { children: ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    width={size}
    height={size}
    {...p}
  >
    {children}
  </svg>
)

export const ArrowRight = (p: Props) => (
  <I {...p}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </I>
)

export const ArrowUpRight = (p: Props) => (
  <I {...p}>
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </I>
)

export const Menu = (p: Props) => (
  <I {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </I>
)

export const X = (p: Props) => (
  <I {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </I>
)

export const Sparkles = (p: Props) => (
  <I {...p}>
    <path d="m12 3-1.3 5.7L5 10l5.7 1.3L12 17l1.3-5.7L19 10l-5.7-1.3L12 3Z" />
    <path d="m19 15-.7 3.3L15 19l3.3.7L19 23l.7-3.3L23 19l-3.3-.7L19 15Z" />
  </I>
)

export const Clock3 = (p: Props) => (
  <I {...p}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l3 2" />
  </I>
)

export const MapPin = (p: Props) => (
  <I {...p}>
    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </I>
)

export const Phone = (p: Props) => (
  <I {...p}>
    <path d="M6.5 3.5 9 4.8l-1.5 3a15 15 0 0 0 8.7 8.7l3-1.5 1.3 2.5-1.5 2.7c-.4.7-1.2 1-2 .8C9.1 18.8 5.2 14.9 3 7.9c-.2-.8.1-1.6.8-2Z" />
  </I>
)

export const Mail = (p: Props) => (
  <I {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </I>
)

export const MonitorPlay = (p: Props) => (
  <I {...p}>
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="m10 8 5 2.5-5 2.5V8ZM8 21h8" />
  </I>
)

export const NotebookPen = (p: Props) => (
  <I {...p}>
    <path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4Z" />
    <path d="M8 8h6M8 12h6M8 16h3" />
    <path d="m16 16 3-3 2 2-3 3-3 .7.7-2.7Z" />
  </I>
)

export const WalletCards = (p: Props) => (
  <I {...p}>
    <rect x="3" y="6" width="18" height="13" rx="2" />
    <path d="M3 10h18M16 14h2" />
  </I>
)

export const CheckCircle2 = (p: Props) => (
  <I {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12 2.5 2.5L16 9" />
  </I>
)

export const BookOpen = (p: Props) => (
  <I {...p}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v17H6.5A2.5 2.5 0 0 0 4 22V5.5ZM20 5.5A2.5 2.5 0 0 0 17.5 3H13v17h4.5A2.5 2.5 0 0 1 20 22V5.5Z" />
  </I>
)

export const FileText = (p: Props) => (
  <I {...p}>
    <path d="M6 3h8l4 4v14H6z" />
    <path d="M14 3v5h5M9 13h6M9 17h6" />
  </I>
)

export const FolderOpen = (p: Props) => (
  <I {...p}>
    <path d="M3 7h7l2 2h9v10H3z" />
    <path d="M3 9h18" />
  </I>
)

export const GalleryHorizontal = (p: Props) => (
  <I {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="8" cy="10" r="1.5" />
    <path d="m5 17 5-5 3 3 2-2 4 4" />
  </I>
)

export const Home = (p: Props) => (
  <I {...p}>
    <path d="m3 11 9-8 9 8" />
    <path d="M5 10v10h14V10M9 20v-6h6v6" />
  </I>
)

export const Inbox = (p: Props) => (
  <I {...p}>
    <path d="M4 5h16l1 11H3L4 5Z" />
    <path d="M3 16h5l1.5 2h5L16 16h5" />
  </I>
)

export const LogOut = (p: Props) => (
  <I {...p}>
    <path d="M10 5H5v14h5M14 8l4 4-4 4M18 12H9" />
  </I>
)

export const LockKeyhole = (p: Props) => (
  <I {...p}>
    <rect x="5" y="10" width="14" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
  </I>
)

export const Plus = (p: Props) => (
  <I {...p}>
    <path d="M12 5v14M5 12h14" />
  </I>
)

export const Download = (p: Props) => (
  <I {...p}>
    <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
  </I>
)

export const Search = (p: Props) => (
  <I {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </I>
)

export const Send = (p: Props) => (
  <I {...p}>
    <path d="m4 4 16 8-16 8 3-8-3-8Z" />
    <path d="M7 12h13" />
  </I>
)

export const ImageIcon = (p: Props) => (
  <I {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="8" cy="9" r="1.5" />
    <path d="m5 17 5-5 3 3 2-2 4 4" />
  </I>
)

export const Bell = (p: Props) => (
  <I {...p}>
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" />
  </I>
)

export const Image = (p: Props) => <ImageIcon {...p} />

export const Trash2 = (p: Props) => (
  <I {...p}>
    <path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6" />
  </I>
)

export const Edit3 = (p: Props) => (
  <I {...p}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
  </I>
)

export const UploadCloud = (p: Props) => (
  <I {...p}>
    <path d="M16 16l-4-4-4 4M12 12v9" />
    <path d="M20 16.5A5.5 5.5 0 0 0 18 6h-1A7 7 0 0 0 4 9.5 4.5 4.5 0 0 0 5.5 18H8" />
  </I>
)

export const ExternalLink = (p: Props) => (
  <I {...p}>
    <path d="M14 5h5v5" />
    <path d="M10 14 19 5" />
    <path d="M19 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" />
  </I>
)

export const MessageCircle = (p: Props) => (
  <I {...p}>
    <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.6 8.6 0 0 1-3.2-.6L4 20l1.5-4.2A7.4 7.4 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" />
    <path d="M8 11h.01M12 11h.01M16 11h.01" />
  </I>
)

export const RotateCcw = (p: Props) => (
  <I {...p}>
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <path d="M3 5v5h5" />
  </I>
)

// Additional icons required by the Hostel page.

export const BedDouble = (p: Props) => (
  <I {...p}>
    <path d="M2 4v16" />
    <path d="M2 8h18a2 2 0 0 1 2 2v10" />
    <path d="M2 17h20" />
    <path d="M6 8v9" />
  </I>
)

export const ClipboardList = (p: Props) => (
  <I {...p}>
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14H4V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4M12 16h4" />
    <path d="M8 11h.01M8 16h.01" />
  </I>
)

export const ShieldCheck = (p: Props) => (
  <I {...p}>
    <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
    <path d="m9 12 2 2 4-4" />
  </I>
)

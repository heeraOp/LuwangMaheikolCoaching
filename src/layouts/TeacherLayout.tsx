import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { BookOpen, FileText, FolderOpen, GalleryHorizontal, Home, Inbox, LogOut, Menu, X, MonitorPlay, NotebookPen, Clock3 } from '../components/Icons'
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { useAppData } from '../context'

const links = [
  ['/teacher', 'Dashboard', Home], ['/teacher/courses', 'Courses', BookOpen], ['/teacher/notices', 'Notices', FileText], ['/teacher/materials', 'Materials', FolderOpen], ['/teacher/video-lectures', 'Video Lectures', MonitorPlay], ['/teacher/gallery', 'Gallery', GalleryHorizontal], ['/teacher/enquiries', 'Enquiries', Inbox], ['/teacher/activity-logs', 'Activity Logs', Clock3], ['/teacher/coaching-info', 'Centre Info', NotebookPen],
] as const

export default function TeacherLayout() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { refreshAdmin } = useAppData()
  useEffect(() => { void refreshAdmin() }, [])
  const logout = async () => { try { await api.logout() } catch {} sessionStorage.removeItem('lm_teacher_session'); navigate('/teacher/login') }
  return <div className="admin-shell">
    <aside className={`admin-sidebar ${open ? 'open' : ''}`}>
      <div className="admin-logo"><img className="brand-logo" src={`${import.meta.env.BASE_URL}assets/luwang-maheikol-logo.png`} alt="Luwang Maheikol Coaching Cum Hostel logo" /><span><strong>Teacher / Admin</strong><small>Content manager</small></span></div>
      <nav>{links.map(([to, label, Icon]) => <NavLink end={to === '/teacher'} key={to} to={to} onClick={() => setOpen(false)}><Icon size={18}/>{label}</NavLink>)}</nav>
      <button className="admin-logout" onClick={logout}><LogOut size={18}/> Sign out</button>
    </aside>
    <div className="admin-main">
      <header className="admin-topbar"><button className="icon-button" onClick={() => setOpen(v => !v)} aria-label="Open navigation">{open ? <X/> : <Menu/>}</button><Link to="/" className="back-site">View website ↗</Link></header>
      <section className="admin-content"><Outlet /></section>
    </div>
  </div>
}

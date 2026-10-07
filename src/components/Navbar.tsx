import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ArrowRight, Menu, X } from './Icons'
import { useAppData } from '../context'

const items = [
  ['/', 'Home'], ['about', 'About'], ['courses', 'Courses'], ['materials', 'Materials'], ['gallery', 'Gallery'], ['video-lectures', 'Video Lectures'], ['notices', 'Notices'], ['contact', 'Contact'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { institute } = useAppData()
  const name = institute?.name || 'Luwang Maheikol'
  return <header className="site-header"><div className="container nav-shell">
    <Link to="/" className="brand" onClick={() => setOpen(false)}>
      <img className="brand-logo" src="/assets/luwang-maheikol-logo.png" alt="Luwang Maheikol Coaching Cum Hostel logo" />
      <span><strong>{name}</strong><small>Science • Maths • Classes 9–12</small></span>
    </Link>
    <button className="icon-button mobile-menu" aria-label="Toggle menu" onClick={() => setOpen(v => !v)}>{open ? <X /> : <Menu />}</button>
    <nav className={`main-nav ${open ? 'is-open' : ''}`}>
      {items.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>)}
      <Link className="nav-cta" to="/enquiry" onClick={() => setOpen(false)}>Enquire <ArrowRight size={16} /></Link>
    </nav>
  </div></header>
}

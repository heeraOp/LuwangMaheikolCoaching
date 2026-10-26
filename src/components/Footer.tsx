
import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, MessageCircle } from './Icons'
import { useAppData } from '../context'

function getWhatsAppNumber(phone: string | undefined): string {
  let number = String(phone ?? '').replace(/\D/g, '')

  if (number.startsWith('00')) {
    number = number.slice(2)
  }

  if (number.length === 10) {
    number = `91${number}`
  } else if (number.length === 11 && number.startsWith('0')) {
    number = `91${number.slice(1)}`
  }

  return /^\d{10,15}$/.test(number) ? number : ''
}

export default function Footer() {
  const { institute } = useAppData()

  if (!institute) return null

  const whatsappNumber = getWhatsAppNumber(institute.phone)

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        'Hello Luwang Maheikol, I would like to enquire about your coaching classes and hostel facilities.'
      )}`
    : ''

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand">
            <img
              className="brand-logo"
              src={`${import.meta.env.BASE_URL}assets/luwang-maheikol-logo.png`}
              alt="Luwang Maheikol logo"
            />

            <span>
              <strong>{institute.name}</strong>
              <small>{institute.eyebrow}</small>
            </span>
          </div>

          <p className="muted">
            Focused academic support for Classes 9–12 with printed study
            notes and audio-visual learning.
          </p>
        </div>

        <div>
          <h4>Explore</h4>

          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/hostel">Hostel</Link>
            <Link to="/materials">Study materials</Link>
            <Link to="/video-lectures">Video lectures</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/notices">Notices</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <h4>Contact</h4>

          <div className="contact-list">
            <a href={`tel:${institute.phone}`}>
              <Phone size={16} /> {institute.phone}
            </a>

            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            )}

            <a href={`mailto:${institute.email}`}>
              <Mail size={16} /> {institute.email}
            </a>

            <span>
              <MapPin size={16} /> {institute.location}
            </span>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © 2026 {institute.name}. Powered by the coaching content system.
        </span>

        <Link to="/teacher/login">Teacher portal</Link>
      </div>
    </footer>
  )
}

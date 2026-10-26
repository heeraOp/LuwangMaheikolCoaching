
import {
  Clock3,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  MessageCircle,
} from '../components/Icons'
import { Link } from 'react-router-dom'
import { useAppData } from '../context'

export default function Contact() {
  const { institute } = useAppData()

  // Normalize the institute phone number for WhatsApp.
  // Indian 10-digit numbers automatically receive the +91 country code.
  let whatsappNumber = String(institute.phone ?? '').replace(/\D/g, '')

  if (whatsappNumber.startsWith('00')) {
    whatsappNumber = whatsappNumber.slice(2)
  }

  if (whatsappNumber.length === 10) {
    whatsappNumber = `91${whatsappNumber}`
  } else if (
    whatsappNumber.length === 11 &&
    whatsappNumber.startsWith('0')
  ) {
    whatsappNumber = `91${whatsappNumber.slice(1)}`
  }

  const validWhatsappNumber = /^\d{10,15}$/.test(whatsappNumber)

  const whatsappMessage = encodeURIComponent(
    'Hello, I would like to enquire about admissions, fees, subjects, timings or batch availability at Luwang Maheikol.'
  )

  const whatsappUrl = validWhatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
    : ''

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1>Talk to the coaching centre directly.</h1>
          <p className="muted">
            For admission, fees, subjects, timings or batch availability,
            use the direct contact options below.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-modern">
          <div className="contact-main">

            {/* Phone call */}
            <div className="contact-card contact-primary">
              <div className="contact-icon">
                <Phone />
              </div>

              <div>
                <span className="eyebrow">Call</span>
                <h2>{institute.phone}</h2>
                <p>
                  Best for quick questions about batches, fees and timings.
                </p>

                <a
                  className="button primary"
                  href={`tel:${institute.phone}`}
                >
                  Call the centre <Phone size={15} />
                </a>
              </div>
            </div>

            {/* Direct WhatsApp chat */}
            <div className="contact-card">
              <div className="contact-icon">
                <MessageCircle />
              </div>

              <div>
                <span className="eyebrow">WhatsApp</span>
                <h3>Chat with the centre</h3>
                <p>
                  Message us directly about admissions, fees, classes
                  or batch availability. Your message will be ready to send.
                </p>

                {validWhatsappNumber ? (
                  <a
                    className="button primary"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat on WhatsApp <MessageCircle size={15} />
                  </a>
                ) : (
                  <p className="muted">
                    A valid contact number is needed to enable WhatsApp chat.
                  </p>
                )}
              </div>
            </div>

            {/* Centre location */}
            <div className="contact-card">
              <div className="contact-icon">
                <MapPin />
              </div>

              <div>
                <span className="eyebrow">Visit</span>
                <h3>Centre location</h3>
                <p>{institute.location}</p>

                <div className="contact-hours">
                  <Clock3 size={16} />
                  <span>{institute.timings.join(' • ')}</span>
                </div>
              </div>
            </div>

            {/* Email contact */}
            <div className="contact-card">
              <div className="contact-icon">
                <Mail />
              </div>

              <div>
                <span className="eyebrow">Email</span>
                <h3>{institute.email}</h3>
                <p>
                  Use email for detailed academic or document-related questions.
                </p>

                <a
                  className="button secondary"
                  href={`mailto:${institute.email}`}
                >
                  Send email <Mail size={15} />
                </a>
              </div>
            </div>

          </div>

          {/* Enquiry form */}
          <aside className="contact-action card">
            <div className="action-icon">
              <MessageCircle />
            </div>

            <span className="eyebrow">Need help choosing?</span>
            <h2>Send an enquiry</h2>

            <p className="muted">
              Tell us your class, subjects and what you need.
              The teacher can review it from the admin portal.
            </p>

            <Link className="button primary" to="/enquiry">
              Open enquiry form <ArrowRight size={15} />
            </Link>

            {validWhatsappNumber && (
              <p>
                Prefer WhatsApp?{' '}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Message us directly
                </a>
              </p>
            )}
          </aside>
        </div>
      </section>
    </>
  )
}

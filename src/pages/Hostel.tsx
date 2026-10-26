
import {
  ArrowRight,
  BedDouble,
  CheckCircle2,
  ClipboardList,
  Clock3,
  MapPin,
  Phone,
  ShieldCheck,
  WalletCards,
  MessageCircle,
} from '../components/Icons'
import { Link } from 'react-router-dom'
import { useAppData } from '../context'

// Topics visitors should discuss with the centre.
const questions = [
  {
    icon: BedDouble,
    title: 'Accommodation & facilities',
    text: 'Ask about room arrangements, meals, bathrooms, drinking water, electricity and study space. Confirm which facilities are actually provided.',
  },
  {
    icon: ShieldCheck,
    title: 'Supervision & safety',
    text: 'Discuss supervision, visitor rules, emergency contacts, daily routines and eligibility requirements before making a decision.',
  },
  {
    icon: WalletCards,
    title: 'Fees & admission',
    text: 'Request the complete fee structure, any deposit, what is included, payment schedules, availability and admission procedures.',
  },
]

// Convert Indian mobile numbers into WhatsApp's international number format.
function formatWhatsAppNumber(phone: string | undefined): string {
  let number = String(phone ?? '').replace(/\D/g, '')

  if (number.startsWith('00')) {
    number = number.slice(2)
  }

  if (number.length === 10) {
    return `91${number}`
  }

  if (number.length === 11 && number.startsWith('0')) {
    return `91${number.slice(1)}`
  }

  return number
}

export default function Hostel() {
  const { institute } = useAppData()

  const whatsappNumber = formatWhatsAppNumber(institute.phone)
  const whatsappAvailable = /^\d{10,15}$/.test(whatsappNumber)

  const hostelMessage = encodeURIComponent(
    'Hello Luwang Maheikol, I would like to enquire about hostel accommodation. Please share the current availability, facilities, fees, food arrangements and admission requirements.'
  )

  const whatsappUrl = whatsappAvailable
    ? `https://wa.me/${whatsappNumber}?text=${hostelMessage}`
    : ''

  return (
    <>
      {/* Hero section */}
      <section className="hostel-page-hero">
        <div className="container hostel-hero-grid">
          <div className="hostel-hero-copy">
            <span className="eyebrow">
              <BedDouble size={15} />
              Coaching cum hostel
            </span>

            <h1>
              Study support and hostel information,{' '}
              <span className="gradient-text">in one place.</span>
            </h1>

            <p>
              Explore hostel information at Luwang Maheikol in{' '}
              {institute.location}. Contact the centre to confirm
              accommodation availability, facilities, fees and admission
              requirements.
            </p>

            <div className="hero-actions">
              <Link
                className="button primary"
                to="/enquiry?topic=hostel"
              >
                Ask about the hostel <ArrowRight size={16} />
              </Link>

              {whatsappAvailable && (
                <a
                  className="button secondary"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={16} />
                  WhatsApp us
                </a>
              )}

              <a
                className="button secondary"
                href={`tel:${institute.phone}`}
              >
                <Phone size={16} />
                Call the centre
              </a>
            </div>

            <div className="meta-row hostel-meta-row">
              <span>
                <MapPin size={15} />
                {institute.location}
              </span>

              <span>
                <Clock3 size={15} />
                Coaching: {institute.timings.join(' · ')}
              </span>
            </div>
          </div>

          {/* Direct contact card */}
          <aside className="hostel-contact-card card">
            <div className="hostel-contact-icon">
              <ClipboardList size={25} />
            </div>

            <span className="feature-number">BEFORE YOU DECIDE</span>

            <h2>Get the current details directly.</h2>

            <p className="muted">
              Contact the centre to confirm the latest hostel details
              instead of relying on unverified information.
            </p>

            <div className="hostel-confirm-list">
              <span>
                <CheckCircle2 size={16} />
                Availability and eligibility
              </span>

              <span>
                <CheckCircle2 size={16} />
                Facilities and daily routine
              </span>

              <span>
                <CheckCircle2 size={16} />
                Fees and admission steps
              </span>
            </div>

            {whatsappAvailable && (
              <a
                className="button primary hostel-call-link"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={16} />
                Enquire on WhatsApp
              </a>
            )}

            <a
              className="button secondary hostel-call-link"
              href={`tel:${institute.phone}`}
            >
              <Phone size={15} />
              {institute.phone}
            </a>
          </aside>
        </div>
      </section>

      {/* Information section */}
      <section className="section">
        <div className="container">
          <div className="section-head hostel-section-head">
            <div>
              <span className="eyebrow">Questions worth asking</span>
              <h2>Know what is included before enrolling.</h2>
            </div>

            <p className="muted">
              Use these prompts when speaking with the centre so you can
              compare options and plan with confidence.
            </p>
          </div>

          <div className="grid-3 hostel-question-grid">
            {questions.map(({ icon: Icon, title, text }, index) => (
              <article className="card hostel-question-card" key={title}>
                <div className="hostel-question-icon">
                  <Icon size={23} />
                </div>

                <span className="feature-number">
                  0{index + 1}
                </span>

                <h3>{title}</h3>
                <p className="muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final enquiry section */}
      <section className="section hostel-bottom-section">
        <div className="container">
          <div className="hostel-bottom-cta">
            <div>
              <span className="eyebrow">Talk to the centre</span>

              <h2>
                Have a question about staying at Luwang Maheikol?
              </h2>

              <p>
                Ask about availability, fees, facilities and the admission
                process. Include the student's class and expected stay
                period to make your enquiry more useful.
              </p>
            </div>

            <div className="hostel-bottom-actions">
              <Link
                className="button primary"
                to="/enquiry?topic=hostel"
              >
                Send hostel enquiry <ArrowRight size={16} />
              </Link>

              {whatsappAvailable && (
                <a
                  className="button secondary"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp
                </a>
              )}

              <a
                className="text-link"
                href={`mailto:${institute.email}`}
              >
                Email {institute.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

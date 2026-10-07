import { CheckCircle2, Clock3, Mail, MapPin, MonitorPlay, NotebookPen, Phone, WalletCards } from '../components/Icons'
import { useAppData } from '../context'
import { Link } from 'react-router-dom'

export default function About() {
  const { institute } = useAppData()

  const details = [
    { Icon: MapPin, label: 'Location', value: institute.location },
    { Icon: Clock3, label: 'Class timings', value: institute.timings.join('  •  ') },
    { Icon: Phone, label: 'Phone', value: institute.phone, href: `tel:${institute.phone}` },
    { Icon: Mail, label: 'Email', value: institute.email, href: `mailto:${institute.email}` },
  ]

  const features = [
    [MonitorPlay, 'Audio-visual learning', 'Projector-supported explanations and demonstrations for clearer concepts.'],
    [NotebookPen, 'Quality study notes', 'Printed notes and revision material designed for regular practice.'],
    [WalletCards, 'Accessible coaching', 'Practical academic support with a focus on affordability and consistency.'],
    [CheckCircle2, 'Focused batches', 'Morning and afternoon schedules that make regular attendance easier.'],
  ] as const

  return (
    <>
      <section className="about-intro">
        <div className="container about-intro-grid">
          <div>
            <span className="eyebrow">About {institute.name}</span>
            <h1>Clear guidance. Consistent practice. Better preparation.</h1>
            <p className="about-lead">
              {institute.name} provides focused academic support for Classes 9–12, combining classroom guidance,
              printed study material, problem-solving practice and audio-visual learning.
            </p>
            <div className="about-actions">
              <Link className="button primary" to="/enquiry">Ask about a batch</Link>
              <Link className="button secondary" to="/courses">View courses</Link>
            </div>
          </div>
          <div className="about-summary card">
            <div className="about-summary-top">
              <div className="about-logo-wrap">
                <img src="/assets/luwang-maheikol-logo.png" alt={`${institute.name} logo`} />
              </div>
              <div>
                <span className="feature-number">OUR APPROACH</span>
                <h2>Simple, structured academic support.</h2>
              </div>
            </div>
            <p className="muted">
              The goal is straightforward: help students understand concepts, practise consistently and approach
              examinations with confidence.
            </p>
            <div className="tags">
              {institute.subjects.map(subject => <span className="tag" key={subject}>{subject}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section about-details-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Centre information</span>
              <h2>Everything you need to know.</h2>
            </div>
            <p className="muted">Find the centre, check the timings, or contact the teacher directly.</p>
          </div>

          <div className="about-details-grid">
            {details.map(({ Icon, label, value, href }) => (
              <article className="about-detail-item" key={label}>
                <div className="about-detail-icon"><Icon size={22} /></div>
                <div className="about-detail-copy">
                  <span>{label}</span>
                  {href ? <a href={href}>{value}</a> : <strong>{value}</strong>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-support-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">What students get</span>
              <h2>Practical support for regular progress.</h2>
            </div>
          </div>
          <div className="grid-4">
            {features.map(([Icon, title, text]) => (
              <article className="card feature-card" key={title}>
                <div className="feature-icon"><Icon size={22} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

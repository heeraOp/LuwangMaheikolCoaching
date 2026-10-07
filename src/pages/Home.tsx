import { ArrowRight, Clock3, MapPin, Phone, Sparkles } from '../components/Icons'
import { Link } from 'react-router-dom'
import { useAppData } from '../context'

export default function Home() {
  const { institute, courses, usingFallback } = useAppData()
  const activeCourses = courses.filter(c => c.status === 'ACTIVE')

  return <>
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <span className="eyebrow"><Sparkles size={14}/> {institute.eyebrow}</span>
          <h1>Learn with <span className="gradient-text">clarity.</span><br/>Prepare with purpose.</h1>
          <p>{institute.tagline} {institute.name} supports Classes 9–12 with {institute.subjects.join(', ')}, printed notes and audio-visual learning.</p>
          <div className="hero-actions"><Link className="button primary" to="/courses">Explore courses <ArrowRight size={17}/></Link><a className="button secondary" href={`tel:${institute.phone}`}><Phone size={16}/> Call now</a></div>
          <div className="meta-row" style={{marginTop:24}}><span><MapPin size={15}/> {institute.location}</span><span><Clock3 size={15}/> {institute.timings.join(' & ')}</span></div>
          {usingFallback && <div className="sync-note">Ready-to-use centre content is shown instantly while the latest data is checked in the background.</div>}
        </div>
        <div className="hero-card">
          <div className="hero-visual">
            <div className="hero-logo-stage">
              <div className="hero-logo-glow" />
              <img className="hero-main-logo" src="/assets/luwang-maheikol-logo.png" alt="Luwang Maheikol" />
              <div className="hero-logo-caption"><strong>Luwang Maheikol</strong><span>Coaching Cum Hostel · Est. 2024</span></div>
            </div>
            <div className="floating">
              <div className="float-card"><b>9–12</b><span>Classes supported</span></div>
              <div className="float-card"><b>{institute.subjects.length}</b><span>Core subjects</span></div>
              <div className="float-card"><b>{institute.timings.length}</b><span>Daily time slots</span></div>
              <div className="float-card"><b>AV</b><span>Projector learning</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section"><div className="container"><div className="stats"><div className="stat"><b>9–12</b><span>Classes</span></div><div className="stat"><b>{institute.subjects.length}</b><span>Core subjects</span></div><div className="stat"><b>{institute.timings.length}</b><span>Daily time slots</span></div><div className="stat"><b>{activeCourses.length}</b><span>Current batches</span></div></div></div></section>
    <section className="section" style={{paddingTop:0}}><div className="container"><div className="section-head"><div><span className="eyebrow">Why students choose us</span><h2>Built around everyday learning.</h2></div><p className="muted">Clear guidance, practical study support and flexible timings.</p></div><div className="grid-4">{institute.highlights.map((item,i)=><article className="card feature-card" key={item.title}><span className="feature-number">0{i+1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>
    <section className="section"><div className="container"><div className="section-head"><div><span className="eyebrow">Featured batches</span><h2>Choose your preparation track.</h2></div><Link className="button secondary" to="/courses">View all <ArrowRight size={16}/></Link></div><div className="grid-3">{activeCourses.slice(0,3).map(course=><article className="card course-card" key={course.id}><div className="course-top"><span className="pill">{course.audience}</span><h3>{course.title}</h3><div className="tags">{course.subjects.map(s=><span className="tag" key={s}>{s}</span>)}</div></div><div className="course-body"><p>{course.description}</p><div className="meta-row"><span><Clock3 size={14}/>{course.schedule}</span><span>{course.fee}</span></div><Link className="button secondary" to="/enquiry">Ask about this batch <ArrowRight size={15}/></Link></div></article>)}</div></div></section>
  </>
}

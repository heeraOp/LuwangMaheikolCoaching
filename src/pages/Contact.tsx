import { Clock3, Mail, MapPin, Phone, ArrowRight, MessageCircle } from '../components/Icons'
import { Link } from 'react-router-dom'
import { useAppData } from '../context'

export default function Contact() {
  const { institute } = useAppData()
  return <>
    <section className="page-hero"><div className="container"><span className="eyebrow">Contact</span><h1>Talk to the coaching centre directly.</h1><p className="muted">For admission, fees, subjects, timings or batch availability, use the direct contact options below.</p></div></section>
    <section className="section"><div className="container contact-modern">
      <div className="contact-main"><div className="contact-card contact-primary"><div className="contact-icon"><Phone/></div><div><span className="eyebrow">Call</span><h2>{institute.phone}</h2><p>Best for quick questions about batches, fees and timings.</p><a className="button primary" href={`tel:${institute.phone}`}>Call the centre <Phone size={15}/></a></div></div>
        <div className="contact-card"><div className="contact-icon"><MapPin/></div><div><span className="eyebrow">Visit</span><h3>Centre location</h3><p>{institute.location}</p><div className="contact-hours"><Clock3 size={16}/><span>{institute.timings.join(' • ')}</span></div></div></div>
        <div className="contact-card"><div className="contact-icon"><Mail/></div><div><span className="eyebrow">Email</span><h3>{institute.email}</h3><p>Use email for detailed academic or document-related questions.</p><a className="button secondary" href={`mailto:${institute.email}`}>Send email <Mail size={15}/></a></div></div>
      </div>
      <aside className="contact-action card"><div className="action-icon"><MessageCircle/></div><span className="eyebrow">Need help choosing?</span><h2>Send an enquiry</h2><p className="muted">Tell us your class, subjects and what you need. The teacher can review it from the admin portal.</p><Link className="button primary" to="/enquiry">Open enquiry form <ArrowRight size={15}/></Link></aside>
    </div></section>
  </>
}

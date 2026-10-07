import { CheckCircle2, Clock3, Mail, MapPin, Phone, Send, RotateCcw } from '../components/Icons'
import { useState } from 'react'
import { useAppData } from '../context'
import { api } from '../services/api'

export default function Enquiry() {
  const { institute } = useAppData()
  const [done,setDone]=useState(false); const [loading,setLoading]=useState(false); const [error,setError]=useState('')
  const [form,setForm]=useState({name:'',phone:'',className:institute.classes[2] || institute.classes[0] || 'Class 11',message:''})
  const submit=async(e:React.FormEvent)=>{e.preventDefault();setLoading(true);setError('');if(form.phone.replace(/\D/g,'').length<10){setError('Enter a valid 10-digit phone number.');setLoading(false);return}try{await api.submitEnquiry(form);setDone(true)}catch(err){setError(err instanceof Error?err.message:'Unable to send enquiry. Please call the centre directly.')}finally{setLoading(false)}}
  return <>
    <section className="page-hero"><div className="container"><span className="eyebrow">Enquiry</span><h1>Tell us what you need.</h1><p className="muted">One short form for admissions, fees, timings and subject questions.</p></div></section>
    <section className="section"><div className="container enquiry-layout">
      <aside className="enquiry-info card"><span className="feature-number">QUICK DETAILS</span><h2>Before you submit</h2><p className="muted">A teacher/admin can review your message from the private portal.</p><div className="info-stack"><div><Phone size={17}/><span>{institute.phone}</span></div><div><Mail size={17}/><span>{institute.email}</span></div><div><MapPin size={17}/><span>{institute.location}</span></div><div><Clock3 size={17}/><span>{institute.timings.join(' • ')}</span></div></div><div className="tags">{institute.subjects.map(s=><span className="tag" key={s}>{s}</span>)}</div></aside>
      <div className="card enquiry-form-card">{done?<div className="success-panel"><CheckCircle2 size={56}/><span className="eyebrow">Submitted</span><h2>Enquiry received.</h2><p className="muted">Your message has been saved. The coaching team can now review it.</p><button className="button secondary" onClick={()=>{setDone(false);setForm({name:'',phone:'',className:institute.classes[2]||institute.classes[0]||'Class 11',message:''})}}><RotateCcw size={15}/> Send another enquiry</button></div>:<form className="form" onSubmit={submit}><div className="form-heading"><span className="feature-number">CONTACT FORM</span><h2>Student / parent enquiry</h2></div><div className="form-grid"><div className="field"><label>Name</label><input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Student or parent name"/></div><div className="field"><label>Phone</label><input required inputMode="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="10-digit phone number"/></div></div><div className="field"><label>Class</label><select value={form.className} onChange={e=>setForm({...form,className:e.target.value})}>{institute.classes.map(c=><option key={c}>{c}</option>)}</select></div><div className="field"><label>Message</label><textarea required minLength={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Ask about fees, timings, subjects, admission or study material..."/></div>{error&&<div className="error-box">{error}</div>}<button className="button primary" disabled={loading}>{loading?'Sending…':<>Send enquiry <Send size={15}/></>}</button></form>}</div>
    </div></section>
  </>
}

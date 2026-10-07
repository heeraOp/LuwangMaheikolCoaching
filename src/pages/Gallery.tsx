import { Image as ImageIcon } from '../components/Icons'
import { useAppData } from '../context'
import { galleryImageUrl } from '../services/media'

export default function Gallery(){
  const {gallery}=useAppData()
  const active=gallery.filter(g=>g.status==='ACTIVE')
  return <><section className="page-hero"><div className="container"><span className="eyebrow"><ImageIcon size={14}/> Gallery</span><h1>Inside Luwang Maheikol.</h1><p className="muted">Classroom, study material and centre photos published from the teacher portal.</p></div></section><section className="section"><div className="container gallery-modern">{active.map(g=>{const image=galleryImageUrl(g.imageUrl);return <article className="gallery-card" key={g.id}><div className={`gallery-image ${g.tone||'blue'}`}>{image?<img src={image} alt={g.title} loading="lazy" onError={e=>{e.currentTarget.style.display='none';e.currentTarget.parentElement?.classList.add('image-load-failed')}}/>:<div className="gallery-placeholder"><ImageIcon size={36}/><span>Photo preview</span></div>}</div><div className="gallery-card-body"><span className="pill">{g.category}</span><h3>{g.title}</h3><p className="muted">{g.description}</p></div></article>})}{!active.length&&<div className="empty-state card"><ImageIcon size={34}/><h3>Gallery is being updated</h3><p className="muted">New centre photos will appear here.</p></div>}</div></section></>
}

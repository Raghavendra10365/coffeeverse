import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Types.css'

const TYPES = [
  {
    name: 'Espresso',
    photo: 'https://images.unsplash.com/photo-1595928642581-f50f4f3453a5?w=800&auto=format&fit=crop',
    tag: 'The foundation of everything',
    desc: 'A concentrated shot of coffee made by forcing hot water through finely ground coffee at high pressure. Bold, rich, and the base for almost every coffee drink you\'ve ever had.',
    specs: { Ratio:'1:2', Volume:'30ml', Temp:'93°C', Time:'25–30s' },
    flavours: ['Dark Chocolate','Caramel','Nuts'],
    bars: { Intensity:95, Bitterness:80, Acidity:40 },
  },
  {
    name: 'Americano',
    photo: 'https://images.unsplash.com/photo-1531835207745-506a1bc035d8?w=800&auto=format&fit=crop',
    tag: 'Espresso, opened up',
    desc: 'An espresso shot diluted with hot water. You get all the depth and complexity of espresso but in a longer, gentler drink. Clean, bold, and completely black.',
    specs: { Ratio:'1:8', Volume:'240ml', Temp:'93°C', Time:'5min' },
    flavours: ['Dark Chocolate','Roasted','Earthy'],
    bars: { Intensity:65, Bitterness:60, Acidity:35 },
  },
  {
    name: 'Cappuccino',
    photo: 'https://images.unsplash.com/photo-1608070734668-e74dc3dda037?w=800&auto=format&fit=crop',
    tag: 'Equal thirds — a classic',
    desc: 'One third espresso, one third steamed milk, one third thick foam. The foam gives it a light, airy texture. Traditionally a morning drink in Italy, never ordered after noon.',
    specs: { Ratio:'1:4', Volume:'150ml', Temp:'65°C', Time:'5min' },
    flavours: ['Creamy','Caramel','Mild Coffee'],
    bars: { Intensity:55, Bitterness:35, Acidity:25 },
  },
  {
    name: 'Latte',
    photo: 'https://plus.unsplash.com/premium_photo-1674327105076-36c4419864cf?w=800&auto=format&fit=crop',
    tag: 'The world\'s favourite',
    desc: 'One shot of espresso with a large amount of steamed milk and a thin layer of microfoam. Mild, creamy, and the most approachable espresso drink. The canvas for latte art.',
    specs: { Ratio:'1:6', Volume:'300ml', Temp:'65°C', Time:'5min' },
    flavours: ['Creamy','Sweet Milk','Subtle Coffee'],
    bars: { Intensity:40, Bitterness:20, Acidity:20 },
  },
  {
    name: 'Cold Brew',
    photo: 'https://images.unsplash.com/photo-1591933940638-d253adcdcb98?w=800&auto=format&fit=crop',
    tag: 'No heat, no bitterness',
    desc: 'Coffee steeped in cold water for 12–24 hours. No heat means no bitterness — just naturally sweet, smooth, concentrated coffee. Served over ice, often diluted with water or milk.',
    specs: { Ratio:'1:8', Volume:'300ml', Temp:'Cold', Time:'12–24h' },
    flavours: ['Chocolate','Sweet','Smooth'],
    bars: { Intensity:70, Bitterness:15, Acidity:20 },
  },
]

export default function Types() {
  const barRefs = useRef([])
  const revealRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          // animate bars
          e.target.querySelectorAll('.bar-fill').forEach(b => {
            b.style.width = b.dataset.width + '%'
          })
        }
      }),
      { threshold: 0.15 }
    )
    revealRefs.current.forEach(r => r && observer.observe(r))
    return () => observer.disconnect()
  }, [])

  const addRef = el => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el) }

  return (
    <main>
      {/* HERO */}
      <section className="page-hero">
        <div className="page-hero-content">
          <p className="page-hero-tag">What's in your cup</p>
          <h1 className="page-hero-title">Coffee<br/><em>Types</em></h1>
          <p className="page-hero-desc">Five essential coffee drinks — what they are, how they're made, and how they taste. Start here if you're new to coffee.</p>
        </div>
      </section>

      <div className="sep" />

      {/* TYPES */}
      <section className="types-section">
        {TYPES.map((type, i) => (
          <div key={type.name} ref={addRef} className={`reveal type-row ${i % 2 === 1 ? 'type-row-flip' : ''}`}>
            <div className="type-img-wrap">
              <img src={type.photo} alt={type.name} className="type-img" />
            </div>
            <div className="type-info">
              <p className="type-tag">{type.tag}</p>
              <h2 className="type-name">{type.name}</h2>
              <p className="type-desc">{type.desc}</p>
              <div className="type-flavours">
                {type.flavours.map(f => <span key={f} className="flavour-tag">{f}</span>)}
              </div>
            </div>
            <div className="type-specs-wrap">
              <div className="type-specs">
                {Object.entries(type.specs).map(([k, v]) => (
                  <div key={k} className="spec-item">
                    <span className="spec-val">{v}</span>
                    <span className="spec-key">{k}</span>
                  </div>
                ))}
              </div>
              <div className="type-bars">
                {Object.entries(type.bars).map(([k, v]) => (
                  <div key={k} className="bar-row">
                    <span className="bar-label">{k}</span>
                    <div className="bar-track">
                      <div className="bar-fill" data-width={v} style={{width:0}} />
                    </div>
                    <span className="bar-val">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="sep" />

      {/* CTA */}
      <section className="types-cta">
        <p className="section-label">Not sure which suits you?</p>
        <h2 className="section-title">Find Your<br/>Perfect Coffee</h2>
        <Link to="/quiz" className="btn btn-primary">Take the Quiz →</Link>
      </section>

      <div className="sep" />

      <footer className="footer">
        <Link to="/" className="footer-logo">CoffeeVerse</Link>
        <ul className="footer-links">
          {['/types','/brewing','/origins','/roast','/calculator','/quiz','/glossary'].map(path => (
            <li key={path}><Link to={path}>{path.slice(1).charAt(0).toUpperCase()+path.slice(2)}</Link></li>
          ))}
        </ul>
        <span className="footer-copy">© 2025 CoffeeVerse</span>
      </footer>
    </main>
  )
}
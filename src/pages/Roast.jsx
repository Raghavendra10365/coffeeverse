import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Roast.css'

const ROASTS = [
  {
    name: 'Light Roast',
    temp: '196–205°C',
    tag: 'Origin forward',
    colour: '#c8a060',
    desc: 'Roasted just at or before the first crack. The bean retains most of its original character — fruity, floral, bright, and acidic. Higher caffeine than dark roast. Used in specialty pour overs.',
    characteristics: { Acidity: 90, Body: 30, Bitterness: 15, Sweetness: 70 },
    beans: ['Ethiopian Yirgacheffe', 'Kenyan AA', 'Panama Geisha'],
    bestFor: ['Pour Over', 'Filter Coffee', 'AeroPress'],
    flavours: ['Blueberry', 'Jasmine', 'Citrus', 'Peach'],
  },
  {
    name: 'Medium Roast',
    temp: '210–220°C',
    tag: 'The crowd pleaser',
    colour: '#8a5a1e',
    desc: 'Roasted between the first and second crack. The most popular roast worldwide — balances origin character with caramel and nutty roast notes. Lower acidity than light, more complexity than dark.',
    characteristics: { Acidity: 50, Body: 60, Bitterness: 45, Sweetness: 80 },
    beans: ['Colombian Huila', 'Brazilian Santos', 'Guatemalan Antigua'],
    bestFor: ['Drip Coffee', 'French Press', 'Espresso'],
    flavours: ['Caramel', 'Chocolate', 'Nuts', 'Brown Sugar'],
  },
  {
    name: 'Dark Roast',
    temp: '225°C+',
    tag: 'Bold and smoky',
    colour: '#3a1a08',
    desc: 'Roasted past the second crack. The bean\'s surface becomes oily, acidity drops significantly, and roasty, smoky, bitter notes dominate. Origin flavours are largely replaced by the roasting process itself.',
    characteristics: { Acidity: 15, Body: 90, Bitterness: 85, Sweetness: 30 },
    beans: ['Italian Blend', 'Sumatran Mandheling', 'French Roast'],
    bestFor: ['Espresso', 'Moka Pot', 'Cold Brew'],
    flavours: ['Dark Chocolate', 'Smoke', 'Caramel', 'Molasses'],
  },
]

export default function Roast() {
  const revealRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          e.target.querySelectorAll('.roast-bar-fill').forEach(b => {
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
      <section className="page-hero">
        <div className="page-hero-content">
          <p className="page-hero-tag">From green bean to brown</p>
          <h1 className="page-hero-title">Roast<br/><em>Levels</em></h1>
          <p className="page-hero-desc">The roast level transforms a green bean into what ends up in your cup. Light, medium, or dark — each tells a completely different story.</p>
        </div>
      </section>

      <div className="sep" />

      {/* SPECTRUM */}
      <section className="spectrum-section">
        <p className="section-label">Temperature Spectrum</p>
        <div className="spectrum-bar">
          <div className="spectrum-fill" />
          <div className="spectrum-labels">
            <span>Light — 196°C</span>
            <span>Medium — 215°C</span>
            <span>Dark — 225°C+</span>
          </div>
        </div>
      </section>

      <div className="sep" />

      {/* ROAST CARDS */}
      <section className="roasts-section">
        <div className="roasts-grid">
          {ROASTS.map((roast, i) => (
            <div key={roast.name} ref={addRef} className={`reveal d${i+1} roast-card`}>
              <div className="roast-card-header" style={{background: roast.colour}}>
                <svg className="bean-svg" viewBox="0 0 80 100">
                  <ellipse cx="40" cy="50" rx="28" ry="38" fill="rgba(0,0,0,.3)" />
                  <path d="M40 15 Q55 35 55 50 Q55 70 40 85" stroke="rgba(0,0,0,.4)" strokeWidth="2" fill="none" />
                </svg>
                <div className="roast-card-title-wrap">
                  <p className="roast-tag">{roast.tag}</p>
                  <h3 className="roast-name">{roast.name}</h3>
                  <p className="roast-temp">{roast.temp}</p>
                </div>
              </div>
              <div className="roast-card-body">
                <p className="roast-desc">{roast.desc}</p>
                <div className="roast-bars">
                  {Object.entries(roast.characteristics).map(([k,v]) => (
                    <div key={k} className="roast-bar-row">
                      <span className="roast-bar-label">{k}</span>
                      <div className="roast-bar-track">
                        <div className="roast-bar-fill" data-width={v} style={{width:0}} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="roast-flavours">
                  {roast.flavours.map(f => <span key={f} className="roast-flavour">{f}</span>)}
                </div>
                <div className="roast-lists">
                  <div className="roast-list">
                    <p className="roast-list-label">Best beans</p>
                    {roast.beans.map(b => <p key={b} className="roast-list-item">— {b}</p>)}
                  </div>
                  <div className="roast-list">
                    <p className="roast-list-label">Best for</p>
                    {roast.bestFor.map(b => <p key={b} className="roast-list-item">— {b}</p>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
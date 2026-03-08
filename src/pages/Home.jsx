import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import './Home.css'

export default function Home() {
  const revealRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.15 }
    )
    revealRefs.current.forEach(r => r && observer.observe(r))
    return () => observer.disconnect()
  }, [])

  const addRef = el => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el) }

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <p className="hero-tag">Your guide to the world of coffee</p>
          <h1 className="hero-title">
            The World<br/>in a <em>Cup</em>
          </h1>
          <p className="hero-desc">
            From the highlands of Ethiopia to the farms of Colombia — explore every roast, brew method, and origin. No experience needed.
          </p>
          <div className="hero-actions">
            <Link to="/quiz" className="btn btn-primary">Find My Coffee →</Link>
            <Link to="/types" className="btn btn-ghost">Explore Types</Link>
          </div>
        </div>
        <div className="hero-scroll">
          <span />
          <p>Scroll</p>
        </div>
      </section>

      <div className="sep" />

      {/* STATS */}
      <section className="stats">
        <div ref={addRef} className="reveal stat-item">
          <span className="stat-num">4</span>
          <span className="stat-label">Growing Regions</span>
        </div>
        <div ref={addRef} className="reveal d1 stat-item">
          <span className="stat-num">5</span>
          <span className="stat-label">Coffee Types</span>
        </div>
        <div ref={addRef} className="reveal d2 stat-item">
          <span className="stat-num">5</span>
          <span className="stat-label">Brew Methods</span>
        </div>
        <div ref={addRef} className="reveal d3 stat-item">
          <span className="stat-num">50</span>
          <span className="stat-label">Glossary Terms</span>
        </div>
      </section>

      <div className="sep" />

      {/* PAGES GRID */}
      <section className="pages-section">
        <div className="pages-header">
          <p ref={addRef} className="reveal section-label">Explore</p>
          <h2 ref={addRef} className="reveal d1 section-title">Everything<br/>Coffee</h2>
        </div>
        <div className="pages-grid">
          {[
            { to:'/types',      num:'01', title:'Coffee Types',   desc:'Espresso, latte, cold brew and more — what they are and how they differ.' },
            { to:'/brewing',    num:'02', title:'Brew Methods',   desc:'French Press to AeroPress. Interactive timers for every method.' },
            { to:'/origins',    num:'03', title:'Origins',        desc:'Africa, South America, Asia. How where it grows shapes how it tastes.' },
            { to:'/roast',      num:'04', title:'Roast Levels',   desc:'Light, medium, dark. What changes in the roaster and in your cup.' },
            { to:'/calculator', num:'05', title:'Calculator',     desc:'Enter your beans and water. Get the perfect ratio every time.' },
            { to:'/quiz',       num:'06', title:'Find My Coffee', desc:'5 questions. One personalised recommendation. Perfect for beginners.' },
            { to:'/glossary',   num:'07', title:'Glossary',       desc:'50 coffee terms explained in plain English. No jargon.' },
          ].map((p, i) => (
            <Link key={p.to} to={p.to} ref={addRef} className={`reveal d${(i%4)+1} page-card`}>
              <span className="page-card-num">{p.num}</span>
              <h3 className="page-card-title">{p.title}</h3>
              <p className="page-card-desc">{p.desc}</p>
              <span className="page-card-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="sep" />

      {/* QUOTE */}
      <section className="quote-section" ref={addRef}>
        <div className="reveal quote-wrap">
          <p className="quote-text">"Coffee is a language in itself."</p>
          <p className="quote-author">— Jackie Chan</p>
        </div>
      </section>

      <div className="sep" />

      {/* FOOTER */}
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
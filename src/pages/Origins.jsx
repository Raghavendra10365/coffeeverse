import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Origins.css'

const REGIONS = [
  {
    name: 'Africa',
    photo: 'https://images.unsplash.com/photo-1630861412229-67e2acb44b7a?w=800&auto=format&fit=crop',
    sub: 'Ethiopia · Kenya · Rwanda',
    desc: 'The birthplace of coffee. African beans are known for their extraordinary complexity — bright acidity, floral aromas, and fruit-forward flavours that no other region can match.',
    flavours: ['Blueberry', 'Jasmine', 'Citrus', 'Bergamot'],
    stats: { Altitude:'1800–2200m', Harvest:'Oct–Jan', Process:'Washed / Natural', Roast:'Light–Medium' },
    highlight: 'Ethiopia is where coffee was first discovered — the Kaffa region still grows wild coffee trees.',
  },
  {
    name: 'South America',
    photo: 'https://images.unsplash.com/photo-1493925410384-84f842e616fb?w=800&auto=format&fit=crop',
    sub: 'Colombia · Brazil · Peru',
    desc: 'The world\'s largest coffee producing region. South American coffees are known for their balance, sweetness, and approachability — perfect for beginners and espresso blends.',
    flavours: ['Caramel', 'Chocolate', 'Nuts', 'Brown Sugar'],
    stats: { Altitude:'1200–1800m', Harvest:'Apr–Aug', Process:'Washed / Natural', Roast:'Medium' },
    highlight: 'Brazil produces nearly 40% of the world\'s coffee supply — more than any other country.',
  },
  {
    name: 'Central America',
    photo: 'https://images.unsplash.com/photo-1712607613395-3f0612ad16eb?w=800&auto=format&fit=crop',
    sub: 'Guatemala · Costa Rica · Panama',
    desc: 'Central American coffees sit between Africa\'s brightness and South America\'s sweetness — clean, structured, and often with a delicate fruit or honey character.',
    flavours: ['Apple', 'Honey', 'Toffee', 'Stone Fruit'],
    stats: { Altitude:'1300–1800m', Harvest:'Dec–Mar', Process:'Washed / Honey', Roast:'Light–Medium' },
    highlight: 'Panama Geisha — grown near Boquete — is the most expensive coffee in the world.',
  },
  {
    name: 'Asia Pacific',
    photo: 'https://plus.unsplash.com/premium_photo-1668149518588-774c7c9aa142?w=800&auto=format&fit=crop',
    sub: 'Indonesia · Vietnam · Papua New Guinea',
    desc: 'Asian coffees are a completely different experience — low acidity, heavy body, earthy and syrupy. Often used in dark roast blends and traditional espresso for their bold depth.',
    flavours: ['Earth', 'Cedar', 'Dark Chocolate', 'Spice'],
    stats: { Altitude:'700–1500m', Harvest:'May–Nov', Process:'Wet-hulled / Natural', Roast:'Medium–Dark' },
    highlight: 'Sumatra\'s wet-hulling process (Giling Basah) creates its signature earthy, heavy character.',
  },
]

export default function Origins() {
  const revealRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.12 }
    )
    revealRefs.current.forEach(r => r && observer.observe(r))
    return () => observer.disconnect()
  }, [])

  const addRef = el => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el) }

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-content">
          <p className="page-hero-tag">Where it all begins</p>
          <h1 className="page-hero-title">Coffee<br/><em>Origins</em></h1>
          <p className="page-hero-desc">Where a coffee grows shapes everything about how it tastes. Explore the four great coffee-growing regions of the world.</p>
        </div>
      </section>

      <div className="sep" />

      <section className="origins-section">
        {REGIONS.map((region, i) => (
          <div key={region.name} ref={addRef} className={`reveal origin-row ${i % 2 === 1 ? 'origin-row-flip' : ''}`}>
            <div className="origin-map">
              <img src={region.photo} alt={region.name} className="origin-map-img" />
              <div className="origin-map-inner">
                <p className="origin-map-name">{region.name}</p>
                <p className="origin-map-sub">{region.sub}</p>
                <div className="origin-flavours">
                  {region.flavours.map(f => <span key={f} className="origin-flavour">{f}</span>)}
                </div>
              </div>
            </div>
            <div className="origin-info">
              <p className="origin-tag">{region.sub}</p>
              <h2 className="origin-name">{region.name}</h2>
              <p className="origin-desc">{region.desc}</p>
              <div className="origin-highlight">
                <span className="highlight-bar" />
                <p>{region.highlight}</p>
              </div>
              <div className="origin-stats">
                {Object.entries(region.stats).map(([k,v]) => (
                  <div key={k} className="origin-stat">
                    <span className="origin-stat-val">{v}</span>
                    <span className="origin-stat-key">{k}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
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
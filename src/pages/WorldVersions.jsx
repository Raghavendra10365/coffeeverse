import { useParams, Link } from 'react-router-dom'
import './WorldVersions.css'

const WORLD_VERSIONS = {
  latte: [
    { country: 'Italy', name: 'Caffè Latte', photo: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=600&auto=format&fit=crop' },
    { country: 'Japan', name: 'Matcha Latte', photo: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop' },
    { country: 'India', name: 'Masala Coffee', photo: 'https://images.unsplash.com/photo-1606791422814-b32c705e3e2f?w=600&auto=format&fit=crop' },
    { country: 'Middle East', name: 'Cardamom Latte', photo: 'https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=600&auto=format&fit=crop' },
    { country: 'Hong Kong', name: 'Yuanyang', photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop' },
    { country: 'France', name: 'Café au Lait', photo: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=600&auto=format&fit=crop' },
  ],
  cappuccino: [
    { country: 'Italy', name: 'Classic Cappuccino', photo: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop' },
    { country: 'Austria', name: 'Wiener Melange', photo: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&auto=format&fit=crop' },
    { country: 'Ethiopia', name: 'Buna', photo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop' },
    { country: 'Morocco', name: 'Café des Épices', photo: 'https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=600&auto=format&fit=crop' },
    { country: 'Australia', name: 'Flat White', photo: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&auto=format&fit=crop' },
    { country: 'Greece', name: 'Frappé', photo: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop' },
  ],
  espresso: [
    { country: 'Italy', name: 'Espresso Romano', photo: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=600&auto=format&fit=crop' },
    { country: 'Cuba', name: 'Café Cubano', photo: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&auto=format&fit=crop' },
    { country: 'Portugal', name: 'Bica', photo: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&auto=format&fit=crop' },
    { country: 'Turkey', name: 'Türk Kahvesi', photo: 'https://images.unsplash.com/photo-1606791422814-b32c705e3e2f?w=600&auto=format&fit=crop' },
    { country: 'Vietnam', name: 'Cà Phê Đá', photo: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop' },
    { country: 'Sweden', name: 'Koppi Shot', photo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop' },
  ],
  americano: [
    { country: 'USA', name: 'Classic Americano', photo: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&auto=format&fit=crop' },
    { country: 'Scandinavia', name: 'Filterkaffi', photo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop' },
    { country: 'Colombia', name: 'Tinto', photo: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&auto=format&fit=crop' },
    { country: 'Ethiopia', name: 'Jebena Buna', photo: 'https://images.unsplash.com/photo-1606791422814-b32c705e3e2f?w=600&auto=format&fit=crop' },
    { country: 'Japan', name: 'Iced Americano', photo: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop' },
    { country: 'Australia', name: 'Long Black', photo: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=600&auto=format&fit=crop' },
  ],
  cold_brew: [
    { country: 'USA', name: 'Classic Cold Brew', photo: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop' },
    { country: 'Japan', name: 'Kyoto Drip', photo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop' },
    { country: 'Vietnam', name: 'Cà Phê Sữa Đá', photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop' },
    { country: 'Thailand', name: 'Oliang', photo: 'https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=600&auto=format&fit=crop' },
    { country: 'Australia', name: 'Cold Brew Tonic', photo: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&auto=format&fit=crop' },
    { country: 'Korea', name: 'Dalgona Cold Brew', photo: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop' },
  ],
  pour_over: [
    { country: 'Japan', name: 'V60 Pour Over', photo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop' },
    { country: 'Germany', name: 'Chemex', photo: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&auto=format&fit=crop' },
    { country: 'Ethiopia', name: 'Jebena Pour', photo: 'https://images.unsplash.com/photo-1606791422814-b32c705e3e2f?w=600&auto=format&fit=crop' },
    { country: 'USA', name: 'Kalita Wave', photo: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=600&auto=format&fit=crop' },
    { country: 'Scandinavia', name: 'Nordic Light Roast', photo: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&auto=format&fit=crop' },
    { country: 'Australia', name: 'Single Origin Pour', photo: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&auto=format&fit=crop' },
  ],
  french_press: [
    { country: 'France', name: 'Classic French Press', photo: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&auto=format&fit=crop' },
    { country: 'Brazil', name: 'Cafezinho Press', photo: 'https://images.unsplash.com/photo-1606791422814-b32c705e3e2f?w=600&auto=format&fit=crop' },
    { country: 'UK', name: 'British Plunger Coffee', photo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop' },
    { country: 'Scandinavia', name: 'Kokekaffe', photo: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&auto=format&fit=crop' },
    { country: 'Canada', name: 'Maple Press', photo: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=600&auto=format&fit=crop' },
    { country: 'Ethiopia', name: 'Spiced Press', photo: 'https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=600&auto=format&fit=crop' },
  ],
}

export default function WorldVersions() {
  const { drink } = useParams()
  const versions = WORLD_VERSIONS[drink] || []
  const drinkName = drink.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

  return (
    <main>
      <div className="wv-page">
        <div className="wv-header">
          <Link to="/quiz" className="wv-back">← Back to My Result</Link>
          <p className="wv-tag">Around the World</p>
          <h1 className="wv-title">{drinkName}<br/><em>Worldwide</em></h1>
          <p className="wv-desc">Every culture puts its own spin on this beloved drink. Here are 6 versions from around the globe.</p>
        </div>
        <div className="wv-grid">
          {versions.map((v, i) => (
            <div key={i} className="wv-card">
              <div className="wv-card-img-wrap">
                <img src={v.photo} alt={v.name} className="wv-card-img" />
                <span className="wv-card-country">{v.country}</span>
              </div>
              <div className="wv-card-info">
                <p className="wv-card-name">{v.name}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="wv-actions">
          <Link to="/quiz" className="btn btn-ghost">← Retake Quiz</Link>
          <Link to="/" className="btn btn-primary">Explore CoffeeVerse →</Link>
        </div>
      </div>
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
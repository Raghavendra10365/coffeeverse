import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Navbar.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  let lastY = 0

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setHidden(y > 80 && y > lastY)
      lastY = y
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div className={`nav-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />
      <nav className={`nav ${hidden ? 'nav-hidden' : ''}`}>
        <Link to="/" className="nav-logo">Coffee<span>Verse</span></Link>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/types" onClick={() => setMenuOpen(false)}>Coffee Types</NavLink></li>
          <li><NavLink to="/brewing" onClick={() => setMenuOpen(false)}>Brewing</NavLink></li>
          <li><NavLink to="/origins" onClick={() => setMenuOpen(false)}>Origins</NavLink></li>
          <li><NavLink to="/roast" onClick={() => setMenuOpen(false)}>Roast Levels</NavLink></li>
          <li><NavLink to="/calculator" onClick={() => setMenuOpen(false)}>Calculator</NavLink></li>
          <li><NavLink to="/quiz" onClick={() => setMenuOpen(false)}>Quiz</NavLink></li>
          <li><NavLink to="/glossary" onClick={() => setMenuOpen(false)}>Glossary</NavLink></li>
        </ul>
        <Link to="/login" className="nav-login-btn">Login</Link>
        <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </nav>
    </>
  )
}
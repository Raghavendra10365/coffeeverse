import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import './Leaderboard.css'

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('quiz_results')
      .select('username, drink, score, created_at')
      .not('username', 'is', null)
      .order('score', { ascending: false })
      .limit(20)
      .then(({ data }) => {
        setEntries(data || [])
        setLoading(false)
      })
  }, [])

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-content">
          <p className="page-hero-tag">Top Coffee Lovers</p>
          <h1 className="page-hero-title">Leader<br/><em>board</em></h1>
          <p className="page-hero-desc">The top quiz takers in the CoffeeVerse community.</p>
        </div>
      </section>

      <div className="sep" />

      <section className="lb-section">
        {loading ? (
          <p className="lb-loading">Loading...</p>
        ) : entries.length === 0 ? (
          <div className="lb-empty">
            <p>No entries yet. Be the first!</p>
            <Link to="/quiz" className="lb-cta">Take the Quiz →</Link>
          </div>
        ) : (
          <div className="lb-list">
            {entries.map((entry, i) => (
              <div key={i} className={`lb-row ${i < 3 ? 'lb-top' : ''}`}>
                <span className="lb-rank">
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                </span>
                <div className="lb-info">
                  <p className="lb-name">{entry.username}</p>
                  <p className="lb-drink">{entry.drink}</p>
                </div>
                <span className="lb-score">{entry.score}</span>
              </div>
            ))}
          </div>
        )}
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
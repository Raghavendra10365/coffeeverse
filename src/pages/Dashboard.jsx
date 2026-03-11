import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import './Dashboard.css'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('profile')
  const [user, setUser] = useState(null)
  const [quizHistory, setQuizHistory] = useState([])
  const [savedBrews, setSavedBrews] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { navigate('/login'); return }
      setUser(data.user)
    })
  }, [])

  useEffect(() => {
    if (!user) return
    supabase.from('quiz_results').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).then(({ data }) => setQuizHistory(data || []))
    supabase.from('saved_brews').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).then(({ data }) => setSavedBrews(data || []))
  }, [user])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  if (!user) return null

  return (
    <main className="dash-main">
      <div className="dash-header">
        <div>
          <p className="dash-welcome">Welcome back</p>
          <h1 className="dash-name">{user.user_metadata?.full_name || user.email}</h1>
        </div>
        <button className="dash-logout" onClick={handleLogout}>Log Out</button>
      </div>

      <div className="dash-tabs">
        {['profile', 'quiz', 'brews'].map(tab => (
          <button key={tab} className={`dash-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab === 'profile' ? 'Profile' : tab === 'quiz' ? 'Quiz History' : 'Saved Brews'}
          </button>
        ))}
        <div className="dash-tab-indicator" style={{ left: `calc(${['profile','quiz','brews'].indexOf(activeTab)} * 33.333%)` }} />
      </div>

      <div className="dash-content">
        {activeTab === 'profile' && (
          <div className="dash-section">
            <div className="dash-profile-card">
              <div className="dash-avatar">{(user.user_metadata?.full_name || user.email)[0].toUpperCase()}</div>
              <div className="dash-profile-info">
                <p className="dash-profile-name">{user.user_metadata?.full_name || '—'}</p>
                <p className="dash-profile-email">{user.email}</p>
                <p className="dash-profile-joined">Joined {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
            <div className="dash-stats">
              <div className="dash-stat-card">
                <span className="dash-stat-num">{quizHistory.length}</span>
                <span className="dash-stat-label">Quizzes Taken</span>
              </div>
              <div className="dash-stat-card">
                <span className="dash-stat-num">{savedBrews.length}</span>
                <span className="dash-stat-label">Saved Brews</span>
              </div>
              <div className="dash-stat-card">
                <span className="dash-stat-num">{quizHistory.length > 0 ? Math.max(...quizHistory.map(q => q.score || 0)) : '—'}</span>
                <span className="dash-stat-label">Best Score</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="dash-section">
            {quizHistory.length === 0 ? (
              <div className="dash-empty">
                <p>No quiz results yet.</p>
                <Link to="/quiz" className="dash-cta">Take the Quiz →</Link>
              </div>
            ) : (
              <div className="dash-list">
                {quizHistory.map((q, i) => (
                  <div key={i} className="dash-list-item">
                    <div>
                      <p className="dash-item-title">{q.drink || 'Quiz Result'}</p>
                      <p className="dash-item-date">{new Date(q.created_at).toLocaleDateString()}</p>
                    </div>
                    <span className="dash-item-score">{q.score ?? '—'}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'brews' && (
          <div className="dash-section">
            {savedBrews.length === 0 ? (
              <div className="dash-empty">
                <p>No saved brews yet.</p>
                <Link to="/calculator" className="dash-cta">Try the Calculator →</Link>
              </div>
            ) : (
              <div className="dash-list">
                {savedBrews.map((b, i) => (
                  <div key={i} className="dash-list-item">
                    <div>
                      <p className="dash-item-title">{b.method || 'Brew'} — {b.coffee_g}g coffee</p>
                      <p className="dash-item-date">{new Date(b.created_at).toLocaleDateString()}</p>
                    </div>
                    <span className="dash-item-score">{b.water_ml}ml</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
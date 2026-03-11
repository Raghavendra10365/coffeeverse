import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const [mode, setMode] = useState('login') // 'login' or 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Backend coming soon!')
  }

  return (
    <main className="auth-main">
      <div className="auth-card">
        <Link to="/" className="auth-logo">Coffee<span>Verse</span></Link>
        <div className="auth-tabs">
          <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Log In</button>
          <button className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')}>Sign Up</button>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="auth-field">
              <label>Your Name</label>
              <input type="text" placeholder="e.g. Alex" value={name} onChange={e => setName(e.target.value)} required />
            </div>
          )}
          <div className="auth-field">
            <label>Email</label>
            <input type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="auth-btn">
            {mode === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>
        <p className="auth-switch">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
            {mode === 'login' ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </main>
  )
}
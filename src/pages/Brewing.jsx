import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Brewing.css'

const METHODS = [
  {
    name: 'French Press',
    tag: 'Full immersion',
    desc: 'Grounds steep directly in hot water for 4 minutes. The metal filter keeps oils in — producing a rich, full-bodied cup. Most forgiving method for beginners.',
    specs: { Ratio:'1:15', Grind:'Coarse', Temp:'93°C', Time:'4 min' },
    duration: 240,
    steps: [
      'Add coarsely ground coffee — 1g per 15ml of water',
      'Pour 93°C water slowly over all the grounds',
      'Place lid on top without pressing — wait 4 minutes',
      'Press plunger down slowly and steadily',
      'Pour immediately — don\'t let it sit',
    ]
  },
  {
    name: 'Pour Over',
    tag: 'Clean and nuanced',
    desc: 'Hot water poured slowly over grounds in a paper filter. Produces a crystal-clear, light-bodied cup that highlights the bean\'s origin character.',
    specs: { Ratio:'1:16', Grind:'Medium', Temp:'93°C', Time:'3:30 min' },
    duration: 210,
    steps: [
      'Rinse paper filter with hot water first',
      'Add medium-ground coffee to filter',
      'Pour small amount of water to bloom — wait 30 seconds',
      'Pour remaining water slowly in spirals over 3 minutes',
      'Let it drain fully before removing dripper',
    ]
  },
  {
    name: 'AeroPress',
    tag: 'Fast and forgiving',
    desc: 'Air pressure pushes water through coffee in 90 seconds. Produces clean, concentrated coffee. Highly versatile — great for travel and experimentation.',
    specs: { Ratio:'1:12', Grind:'Medium-Fine', Temp:'85°C', Time:'90 sec' },
    duration: 90,
    steps: [
      'Insert filter, rinse with hot water',
      'Add medium-fine ground coffee',
      'Pour 85°C water and stir 10 seconds',
      'Attach plunger and wait 60 seconds',
      'Press down slowly over 30 seconds',
    ]
  },
  {
    name: 'Espresso',
    tag: 'Concentrated and intense',
    desc: 'High pressure forces water through finely ground coffee in 25–30 seconds. The foundation of lattes, cappuccinos, and Americanos.',
    specs: { Ratio:'1:2', Grind:'Fine', Temp:'93°C', Time:'30 sec' },
    duration: 30,
    steps: [
      'Grind coffee fine — like table salt',
      'Dose 18–20g into portafilter',
      'Tamp firmly and evenly with 15kg pressure',
      'Lock portafilter and start extraction',
      'Target 36–40g of liquid in 25–30 seconds',
    ]
  },
  {
    name: 'Cold Brew',
    tag: 'No heat, no bitterness',
    desc: 'Coarse grounds steeped in cold water for 12–24 hours. No heat means no bitterness. Naturally sweet and smooth. Perfect served over ice.',
    specs: { Ratio:'1:8', Grind:'Coarse', Temp:'Cold', Time:'12–24h' },
    duration: 60,
    steps: [
      'Add coarsely ground coffee to jar or pitcher',
      'Pour cold filtered water over grounds',
      'Stir gently to ensure all grounds are wet',
      'Cover and refrigerate for 12–24 hours',
      'Strain through fine mesh or paper filter',
    ]
  },
]

function Timer({ method }) {
  const [time, setTime] = useState(method.duration)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const intervalRef = useRef(null)

  const progress = ((method.duration - time) / method.duration) * 100
  const radius = 54
  const circ = 2 * Math.PI * radius
  const offset = circ - (progress / 100) * circ

  const fmt = s => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`

  const start = () => {
    if (done) return
    setRunning(true)
    intervalRef.current = setInterval(() => {
      setTime(t => {
        if (t <= 1) {
          clearInterval(intervalRef.current)
          setRunning(false)
          setDone(true)
          return 0
        }
        return t - 1
      })
    }, 1000)
  }

  const pause = () => { clearInterval(intervalRef.current); setRunning(false) }

  const reset = () => {
    clearInterval(intervalRef.current)
    setRunning(false); setDone(false); setTime(method.duration)
  }

  const currentStep = Math.floor(((method.duration - time) / method.duration) * method.steps.length)

  return (
    <div className={`timer-card ${done ? 'timer-done' : ''}`}>
      <div className="timer-header">
        <p className="timer-method-tag">{method.tag}</p>
        <h3 className="timer-method-name">{method.name}</h3>
      </div>

      <div className="timer-specs">
        {Object.entries(method.specs).map(([k,v]) => (
          <div key={k} className="timer-spec">
            <span className="timer-spec-val">{v}</span>
            <span className="timer-spec-key">{k}</span>
          </div>
        ))}
      </div>

      <div className="timer-circle-wrap">
        <svg className="timer-svg" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} className="timer-track" />
          <circle cx="60" cy="60" r={radius} className="timer-fill"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{transition: running ? 'stroke-dashoffset 1s linear' : 'none'}}
          />
        </svg>
        <div className="timer-time">
          {done ? '✓' : fmt(time)}
        </div>
      </div>

      <div className="timer-controls">
        {!running && !done && <button className="timer-btn timer-btn-start" onClick={start}>Start</button>}
        {running && <button className="timer-btn timer-btn-pause" onClick={pause}>Pause</button>}
        {!running && time < method.duration && !done && <button className="timer-btn timer-btn-resume" onClick={start}>Resume</button>}
        <button className="timer-btn timer-btn-reset" onClick={reset}>Reset</button>
      </div>

      <div className="timer-steps">
        {method.steps.map((step, i) => (
          <div key={i} className={`timer-step ${i < currentStep ? 'step-done' : ''} ${i === currentStep && time < method.duration ? 'step-active' : ''}`}>
            <span className="step-num">{String(i+1).padStart(2,'0')}</span>
            <span className="step-text">{step}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Brewing() {
  const revealRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.1 }
    )
    revealRefs.current.forEach(r => r && observer.observe(r))
    return () => observer.disconnect()
  }, [])

  const addRef = el => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el) }

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-content">
          <p className="page-hero-tag">Make it yourself</p>
          <h1 className="page-hero-title">Brew<br/><em>Methods</em></h1>
          <p className="page-hero-desc">Five ways to brew coffee at home — each with an interactive timer and step-by-step guide. Pick a method and start brewing.</p>
        </div>
      </section>

      <div className="sep" />

      <section className="brewing-section">
        <div className="brewing-grid">
          {METHODS.map((m, i) => (
            <div key={m.name} ref={addRef} className={`reveal d${(i%3)+1}`}>
              <Timer method={m} />
            </div>
          ))}
        </div>
      </section>

      <div className="sep" />

      <section className="brewing-tips">
        <p ref={addRef} className="reveal section-label">Universal Tips</p>
        <h2 ref={addRef} className="reveal d1 section-title">Brew Better</h2>
        <div className="tips-grid">
          {[
            { title:'Always weigh', desc:'Use a scale, not scoops. 1g of coffee per 15–16ml of water is your baseline.' },
            { title:'Water quality', desc:'Coffee is 98% water. Use filtered water at the right temperature — 90–96°C.' },
            { title:'Fresh beans', desc:'Buy coffee roasted within the last 2–4 weeks. Check the roast date on the bag.' },
            { title:'Grind fresh', desc:'Grind just before brewing. Pre-ground coffee goes stale within 15 minutes of opening.' },
          ].map((t, i) => (
            <div key={t.title} ref={addRef} className={`reveal d${i+1} tip-card`}>
              <h3 className="tip-title">{t.title}</h3>
              <p className="tip-desc">{t.desc}</p>
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
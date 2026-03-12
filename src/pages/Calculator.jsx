import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import './Calculator.css'

const METHODS = {
  'French Press': { ratio: 15, temp: '93°C', grind: 'Coarse', time: '4 min', steps: ['Boil water, let cool to 93°C', 'Add ground coffee to press', 'Pour water, stir gently', 'Wait 4 minutes', 'Press and pour immediately'] },
  'Pour Over':    { ratio: 16, temp: '93°C', grind: 'Medium', time: '3:30 min', steps: ['Rinse paper filter', 'Add ground coffee', 'Bloom with small pour — 30s', 'Pour remaining water in spirals', 'Let drain fully'] },
  'AeroPress':    { ratio: 12, temp: '85°C', grind: 'Medium-Fine', time: '90 sec', steps: ['Rinse filter, assemble AeroPress', 'Add ground coffee', 'Pour water, stir 10 seconds', 'Wait 60 seconds', 'Press slowly over 30 seconds'] },
  'Espresso':     { ratio: 2,  temp: '93°C', grind: 'Fine', time: '30 sec', steps: ['Grind fine — like table salt', 'Dose 18–20g into portafilter', 'Tamp firmly and evenly', 'Lock in and start shot', 'Target 36–40g in 25–30s'] },
  'Cold Brew':    { ratio: 8,  temp: 'Cold', grind: 'Coarse', time: '12–24h', steps: ['Add coffee to jar', 'Pour cold filtered water', 'Stir gently', 'Cover and refrigerate', 'Strain after 12–24 hours'] },
  'Moka Pot':     { ratio: 7,  temp: '100°C', grind: 'Medium-Fine', time: '5 min', steps: ['Fill bottom chamber with water', 'Add ground coffee to basket', 'Assemble and place on heat', 'Remove when gurgling starts', 'Pour and serve immediately'] },
}

const STRENGTHS = { Light: 0.8, Medium: 1, Strong: 1.25 }

export default function Calculator() {
  const [method, setMethod] = useState('Pour Over')
  const [mode, setMode] = useState('water')
  const [water, setWater] = useState(300)
  const [coffee, setCoffee] = useState(18)
  const [strength, setStrength] = useState('Medium')
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  const m = METHODS[method]
  const ratio = m.ratio * STRENGTHS[strength]

  const calcCoffee = w => Math.round((w / ratio) * 10) / 10
  const calcWater = c => Math.round(c * ratio)

  const displayCoffee = mode === 'water' ? calcCoffee(water) : coffee
  const displayWater = mode === 'water' ? water : calcWater(coffee)

  const copyRecipe = () => {
    const text = `${method} Recipe\nCoffee: ${displayCoffee}g\nWater: ${displayWater}ml\nRatio: 1:${ratio}\nGrind: ${m.grind}\nTemp: ${m.temp}\nTime: ${m.time}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const saveBrew = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { alert('Please log in to save brews!'); return }
    const { error } = await supabase.from('saved_brews').insert({
      user_id: user.id,
      brew_method: method,
      coffee_grams: displayCoffee,
      water_ml: displayWater,
      strength: strength,
      ratio: String(ratio)
    })
    if (error) { console.error(error.message); return }
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-content">
          <p className="page-hero-tag">Perfect every time</p>
          <h1 className="page-hero-title">Brew<br/><em>Calculator</em></h1>
          <p className="page-hero-desc">Enter your water or coffee amount and get the perfect ratio for any brew method. Adjust strength to taste.</p>
        </div>
      </section>

      <div className="sep" />

      <section className="calc-section">
        <div className="calc-wrap">

          {/* LEFT — CONTROLS */}
          <div className="calc-controls">

            {/* Method tabs */}
            <div className="calc-group">
              <p className="calc-label">Brew Method</p>
              <div className="method-tabs">
                {Object.keys(METHODS).map(m => (
                  <button key={m} className={`method-tab ${method === m ? 'active' : ''}`} onClick={() => setMethod(m)}>{m}</button>
                ))}
              </div>
            </div>

            {/* Mode toggle */}
            <div className="calc-group">
              <p className="calc-label">I know my...</p>
              <div className="mode-toggle">
                <button className={`mode-btn ${mode === 'water' ? 'active' : ''}`} onClick={() => setMode('water')}>Water Amount</button>
                <button className={`mode-btn ${mode === 'coffee' ? 'active' : ''}`} onClick={() => setMode('coffee')}>Coffee Amount</button>
              </div>
            </div>

            {/* Input */}
            <div className="calc-group">
              {mode === 'water' ? (
                <>
                  <p className="calc-label">Water (ml)</p>
                  <div className="calc-input-wrap">
                    <input type="number" className="calc-input" value={water}
                      onChange={e => setWater(Number(e.target.value))} min="50" max="2000" />
                    <span className="calc-unit">ml</span>
                  </div>
                  <input type="range" className="calc-range" value={water}
                    onChange={e => setWater(Number(e.target.value))} min="50" max="1000" step="10" />
                </>
              ) : (
                <>
                  <p className="calc-label">Coffee (g)</p>
                  <div className="calc-input-wrap">
                    <input type="number" className="calc-input" value={coffee}
                      onChange={e => setCoffee(Number(e.target.value))} min="5" max="200" />
                    <span className="calc-unit">g</span>
                  </div>
                  <input type="range" className="calc-range" value={coffee}
                    onChange={e => setCoffee(Number(e.target.value))} min="5" max="100" step="1" />
                </>
              )}
            </div>

            {/* Strength */}
            <div className="calc-group">
              <p className="calc-label">Strength</p>
              <div className="strength-tabs">
                {Object.keys(STRENGTHS).map(s => (
                  <button key={s} className={`strength-tab ${strength === s ? 'active' : ''}`} onClick={() => setStrength(s)}>{s}</button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — RESULTS */}
          <div className="calc-results">
            <div className="result-hero-nums">
              <div className="result-big">
                <span className="result-num">{displayCoffee}</span>
                <span className="result-unit-big">g coffee</span>
              </div>
              <div className="result-divider">:</div>
              <div className="result-big">
                <span className="result-num">{displayWater}</span>
                <span className="result-unit-big">ml water</span>
              </div>
            </div>

            <div className="result-specs">
              {[
                { label: 'Ratio', val: `1 : ${ratio}` },
                { label: 'Grind', val: m.grind },
                { label: 'Temperature', val: m.temp },
                { label: 'Brew Time', val: m.time },
              ].map(s => (
                <div key={s.label} className="result-spec">
                  <span className="result-spec-label">{s.label}</span>
                  <span className="result-spec-val">{s.val}</span>
                </div>
              ))}
            </div>

            <div className="result-steps">
              <p className="result-steps-label">Quick Guide</p>
              {m.steps.map((step, i) => (
                <div key={i} className="result-step">
                  <span className="result-step-num">{String(i+1).padStart(2,'0')}</span>
                  <span className="result-step-text">{step}</span>
                </div>
              ))}
            </div>

            <div className="calc-btn-row">
              <button className="copy-btn" onClick={copyRecipe}>
                {copied ? '✓ Copied!' : 'Copy Recipe'}
              </button>
              <button className="copy-btn" onClick={saveBrew}>
                {saved ? '✓ Saved!' : 'Save Brew'}
              </button>
            </div>
          </div>
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
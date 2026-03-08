import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import './Glossary.css'

const TERMS = [
  { term:'Acidity', cat:'Flavour', letter:'A', def:'The bright, tangy quality in coffee — not like stomach acid, but more like the pleasant sharpness in fruit or wine. High acidity = lively and fruity. Low acidity = smooth and mellow.' },
  { term:'AeroPress', cat:'Equipment', letter:'A', def:'A small plastic brewing device that uses gentle air pressure to push coffee through a paper filter. Very forgiving for beginners, produces clean coffee in about 90 seconds.', link:'/brewing' },
  { term:'Arabica', cat:'Bean Type', letter:'A', def:'The most popular species of coffee bean — accounts for about 60% of global production. Smoother and more complex than Robusta. Most specialty coffee is Arabica.' },
  { term:'Barista', cat:'People', letter:'B', def:'A person who professionally prepares and serves coffee drinks. The word is Italian for "bartender." A skilled barista understands extraction, milk texturing, and latte art.' },
  { term:'Bloom', cat:'Brewing', letter:'B', def:'The first small pour of water over ground coffee before a full brew. It causes the grounds to bubble and expand as CO₂ is released. Usually 30 seconds. Makes extraction more even.', link:'/brewing' },
  { term:'Body', cat:'Flavour', letter:'B', def:'How heavy or thick a coffee feels in your mouth. A French Press has a full body — rich and coating. A pour over has a light body — clean and tea-like.' },
  { term:'Brew Ratio', cat:'Brewing', letter:'B', def:'The ratio of coffee to water. Usually written as 1:15 — meaning 1g of coffee per 15ml of water. The most important number in brewing.', link:'/calculator' },
  { term:'Caffeine', cat:'Science', letter:'C', def:'The natural stimulant in coffee. Dark roasts have slightly less caffeine than light roasts — the longer roasting process breaks some down. Robusta has roughly double the caffeine of Arabica.' },
  { term:'Cappuccino', cat:'Drink', letter:'C', def:'Equal thirds: espresso, steamed milk, and thick milk foam. Traditionally served in a small 150ml cup. A classic morning drink in Italy.', link:'/types' },
  { term:'Channelling', cat:'Espresso', letter:'C', def:'When water finds a weak path through the coffee puck and rushes through unevenly, causing under-extraction. Leads to sour, unbalanced espresso.' },
  { term:'Cold Brew', cat:'Drink', letter:'C', def:'Coffee made by steeping coarse grounds in cold water for 12–24 hours. No heat means naturally sweet, low-acid, and smooth. Usually diluted before drinking.', link:'/types' },
  { term:'Crema', cat:'Espresso', letter:'C', def:'The golden-brown foam on top of a freshly pulled espresso shot. Made of emulsified coffee oils and CO₂. A sign of freshly roasted beans and proper extraction.' },
  { term:'Cupping', cat:'Tasting', letter:'C', def:'The professional method for tasting and evaluating coffee. Ground coffee is steeped in hot water in a bowl, then slurped from a spoon to coat the palate.' },
  { term:'Dark Roast', cat:'Roasting', letter:'D', def:'Coffee roasted past the second crack at around 225°C+. Oily surface, low acidity, high bitterness. Roasty, smoky, chocolatey notes dominate.', link:'/roast' },
  { term:'Decaf', cat:'Processing', letter:'D', def:'Coffee with most of its caffeine removed — usually 97%+. Swiss Water Process produces the best flavour. Decaf has come a long way from its bad reputation.' },
  { term:'Dose', cat:'Brewing', letter:'D', def:'The amount of ground coffee used in a brew. For espresso, a standard dose is 18–20g. Always weigh it rather than using a scoop.' },
  { term:'Drip Coffee', cat:'Brewing', letter:'D', def:'Coffee brewed by hot water dripping through ground coffee in a paper filter. The most common brewing method — your kitchen coffee machine makes drip coffee.' },
  { term:'Espresso', cat:'Drink', letter:'E', def:'A concentrated shot made by forcing 93°C water through finely ground coffee at 9 bars of pressure in 25–30 seconds. About 30ml. The foundation of lattes, cappuccinos, and Americanos.', link:'/types' },
  { term:'Extraction', cat:'Science', letter:'E', def:'The process of dissolving flavour compounds from coffee into water. Under-extracted = sour and weak. Over-extracted = bitter and harsh. Controlled by grind size, water temp, and time.' },
  { term:'Filter Coffee', cat:'Brewing', letter:'F', def:'Any coffee brewed by passing hot water through ground coffee and a filter. Includes pour over, drip machines, and Chemex. Produces a clean, clear cup.', link:'/brewing' },
  { term:'Flat White', cat:'Drink', letter:'F', def:'An espresso drink with steamed milk and a very thin layer of microfoam. Smaller and stronger than a latte. Originated in Australia and New Zealand.' },
  { term:'French Press', cat:'Equipment', letter:'F', def:'A cylindrical brewer where grounds steep in hot water for 4 minutes, then a metal mesh plunger separates them. Produces a rich, full-bodied cup.', link:'/brewing' },
  { term:'Geisha', cat:'Bean Type', letter:'G', def:'A rare variety originally from Ethiopia, now famously grown in Panama. Extraordinary floral and tea-like flavour — jasmine, bergamot, peach. Regularly sells for hundreds of dollars per pound.' },
  { term:'Green Coffee', cat:'Processing', letter:'G', def:'Unroasted coffee beans. Green or grey-green in colour before roasting. Can be stored for years. Roasters buy green coffee and roast it themselves.' },
  { term:'Grind Size', cat:'Brewing', letter:'G', def:'How coarsely or finely coffee is ground. Coarse for French Press and cold brew. Medium for pour over and drip. Fine for espresso. Wrong grind = wrong extraction.' },
  { term:'Honey Process', cat:'Processing', letter:'H', def:'The cherry skin is removed but some sticky mucilage is left on the bean during drying. More sweetness and body than washed coffees, cleaner than naturals.' },
  { term:'Immersion Brewing', cat:'Brewing', letter:'I', def:'Coffee grounds are fully submerged in water for the whole brew time. French Press and AeroPress are immersion methods. Fuller-bodied and more consistent than pour over.' },
  { term:'Latte', cat:'Drink', letter:'L', def:'An espresso drink with a large amount of steamed milk and a thin layer of microfoam. Usually 240–300ml. The most popular espresso drink in the world.', link:'/types' },
  { term:'Light Roast', cat:'Roasting', letter:'L', def:'Roasted to around 196–205°C. Retains origin flavours: fruity, floral, bright, acidic. Higher caffeine than dark roast. Used in specialty pour overs.', link:'/roast' },
  { term:'Medium Roast', cat:'Roasting', letter:'M', def:'The most popular roast level. Roasted between first and second crack. Balances origin character with caramel and nutty notes. Suits almost every brew method.', link:'/roast' },
  { term:'Microfoam', cat:'Milk', letter:'M', def:'Steamed milk with tiny, uniform bubbles — silky and glossy like wet paint. Essential for latte art. Achieved by introducing air at the start of steaming.' },
  { term:'Mocha', cat:'Drink', letter:'M', def:'An espresso drink with steamed milk and chocolate. Essentially a latte with chocolate added. Not to be confused with Mocha, Yemen — the ancient port city where coffee was first traded.' },
  { term:'Mouthfeel', cat:'Flavour', letter:'M', def:'The physical sensation of coffee in your mouth — weight, texture, and coating. A heavy French Press has a thick mouthfeel. A light pour over has a thin, tea-like mouthfeel.' },
  { term:'Natural Process', cat:'Processing', letter:'N', def:'The whole cherry is dried in the sun before the bean is extracted. Produces intensely fruity, wine-like, heavy-bodied coffees. Common in Ethiopia and Brazil.' },
  { term:'Origin', cat:'Geography', letter:'O', def:'Where a coffee was grown. Origin has an enormous impact on flavour. Single origin coffee comes from one farm or region; blends mix multiple origins.', link:'/origins' },
  { term:'Over-extraction', cat:'Science', letter:'O', def:'Too many compounds dissolved from the coffee, including bitter ones. Tastes harsh, dry, and astringent. Fix: grind coarser or reduce brew time.' },
  { term:'Portafilter', cat:'Equipment', letter:'P', def:'The metal handle that holds the coffee puck in an espresso machine. You fill it with ground coffee, tamp it, and lock it into the group head.' },
  { term:'Pour Over', cat:'Brewing', letter:'P', def:'Hot water poured over ground coffee in a paper filter. Produces a clean, nuanced, light-bodied cup. V60, Chemex, and Kalita Wave are popular methods.', link:'/brewing' },
  { term:'Puck', cat:'Espresso', letter:'P', def:'The compressed disc of coffee grounds in a portafilter after tamping. Should come out dry and intact after pulling a shot.' },
  { term:'Roast Date', cat:'Freshness', letter:'R', def:'The date a coffee was roasted. Coffee is best 7–28 days after roasting. Always buy coffee with a recent roast date printed on the bag.' },
  { term:'Robusta', cat:'Bean Type', letter:'R', def:'The second most common coffee species. Higher in caffeine, more bitter, less complex. Used in instant coffee and many espresso blends. More resistant to disease than Arabica.' },
  { term:'Single Origin', cat:'Sourcing', letter:'S', def:'Coffee from one specific country, region, or farm — not a blend. Lets you experience the distinct character of that place.', link:'/origins' },
  { term:'Specialty Coffee', cat:'Quality', letter:'S', def:'Coffee that scores 80+ points on the SCA grading scale. Represents the top ~3% of coffee produced globally. Focused on traceability and quality.' },
  { term:'Tamp', cat:'Espresso', letter:'T', def:'Compressing ground coffee in a portafilter using a tamper. Press down with about 15–20kg of force to create an even, compact puck. Uneven tamping causes channelling.' },
  { term:'TDS', cat:'Science', letter:'T', def:'Total Dissolved Solids — how much is dissolved in water or brewed coffee. For water, the ideal range is 75–150ppm for brewing. A refractometer measures TDS.' },
  { term:'Terroir', cat:'Geography', letter:'T', def:'The complete natural environment where a coffee is grown: soil, altitude, rainfall, temperature. Two farms side by side can produce completely different tasting coffees.', link:'/origins' },
  { term:'Under-extraction', cat:'Science', letter:'U', def:'Too few flavour compounds dissolved from the coffee. Tastes sour, thin, and weak. Fix: grind finer or increase brew time.' },
  { term:'V60', cat:'Equipment', letter:'V', def:'A cone-shaped pour over dripper by Hario with spiral ridges inside. One of the most popular specialty coffee tools. Named for its 60-degree angle.', link:'/brewing' },
  { term:'Washed Process', cat:'Processing', letter:'W', def:'The fruit is completely removed before the bean is dried. Produces the cleanest expression of a bean\'s origin flavour. Bright, acidic, transparent. Common in Ethiopia and Colombia.' },
]

export default function Glossary() {
  const [search, setSearch] = useState('')
  const [activeLetter, setActiveLetter] = useState(null)

  const letters = [...new Set(TERMS.map(t => t.letter))].sort()

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return TERMS.filter(t => {
      const matchLetter = !activeLetter || t.letter === activeLetter
      const matchSearch = !q || t.term.toLowerCase().includes(q) || t.def.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q)
      return matchLetter && matchSearch
    })
  }, [search, activeLetter])

  const grouped = useMemo(() => {
    const g = {}
    filtered.forEach(t => { if (!g[t.letter]) g[t.letter] = []; g[t.letter].push(t) })
    return g
  }, [filtered])

  const highlight = (text) => {
    if (!search.trim()) return text
    const re = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi')
    const parts = text.split(re)
    return parts.map((p, i) => re.test(p) ? <mark key={i} className="hl">{p}</mark> : p)
  }

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-content">
          <p className="page-hero-tag">No jargon allowed</p>
          <h1 className="page-hero-title">Coffee<br/><em>Glossary</em></h1>
          <p className="page-hero-desc">Every coffee term explained in plain English. If you've seen a word on a menu or recipe and had no idea what it meant — it's here.</p>
        </div>
      </section>

      <div className="sep" />

      {/* SEARCH */}
      <div className="glossary-search-wrap">
        <div className="glossary-search-box">
          <span className="glossary-search-icon">⌕</span>
          <input
            className="glossary-search-input"
            type="text" placeholder="Search any term… e.g. bloom, crema, TDS"
            value={search} onChange={e => { setSearch(e.target.value); setActiveLetter(null) }}
          />
        </div>
        <p className="glossary-count">
          {filtered.length === TERMS.length ? `All ${TERMS.length} terms` : `${filtered.length} term${filtered.length===1?'':'s'} found`}
        </p>
      </div>

      {/* ALPHA */}
      <div className="glossary-alpha">
        <button className={`alpha-btn ${!activeLetter ? 'active' : ''}`} onClick={() => setActiveLetter(null)}>All</button>
        {letters.map(l => (
          <button key={l} className={`alpha-btn ${activeLetter===l ? 'active' : ''}`}
            onClick={() => { setActiveLetter(l); setSearch('') }}>{l}</button>
        ))}
      </div>

      {/* TERMS */}
      <div className="glossary-wrap">
        {Object.keys(grouped).length === 0 && (
          <div className="glossary-empty">
            <p className="glossary-empty-title">No terms found</p>
            <p className="glossary-empty-sub">Try a different search</p>
          </div>
        )}
        {Object.entries(grouped).sort().map(([letter, terms]) => (
          <div key={letter} className="glossary-group">
            <div className="glossary-letter">{letter}</div>
            {terms.map(t => (
              <div key={t.term} className="glossary-row">
                <div className="glossary-term-wrap">
                  <p className="glossary-term-name">{highlight(t.term)}</p>
                  <p className="glossary-term-cat">{t.cat}</p>
                </div>
                <div className="glossary-term-def">
                  <p>{highlight(t.def)}</p>
                  {t.link && <Link to={t.link} className="glossary-term-link">Learn more →</Link>}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="glossary-cta">
        <div>
          <h3 className="glossary-cta-title">Still not sure what to order?</h3>
          <p className="glossary-cta-sub">Take the 2-minute quiz and get a personalised coffee recommendation.</p>
        </div>
        <Link to="/quiz" className="btn btn-primary">Take the Quiz →</Link>
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
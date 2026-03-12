import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Quiz.css'
import { supabase } from '../supabaseClient'

const QUESTIONS = [
  {
    id: 'temp',
    text: 'How do you like your drinks?',
    hint: 'Think about what you usually reach for.',
    options: [
      { icon:'☀️', label:'Hot — warming and comforting', sub:'Classic hot coffee', value:'hot' },
      { icon:'🧊', label:'Cold — refreshing and cool', sub:'Iced drinks, cold brew', value:'cold' },
      { icon:'🤷', label:'Either works for me', sub:'I\'m flexible', value:'either' },
    ]
  },
  {
    id: 'strength',
    text: 'How strong do you like your drinks?',
    hint: 'There\'s no wrong answer here.',
    options: [
      { icon:'💪', label:'Strong — I want to feel it', sub:'Bold, intense, wakes me up', value:'strong' },
      { icon:'⚖️', label:'Balanced — not too strong, not weak', sub:'Medium intensity', value:'medium' },
      { icon:'🌸', label:'Mild — gentle and smooth', sub:'Light, easy to drink', value:'mild' },
    ]
  },
  {
    id: 'milk',
    text: 'Do you like milk or cream in your coffee?',
    hint: 'Think about what you add to tea or other drinks.',
    options: [
      { icon:'🥛', label:'Yes — I love creamy drinks', sub:'Lattes, cappuccinos, flat whites', value:'yes' },
      { icon:'⬛', label:'No — keep it pure and black', sub:'Americano, filter, espresso', value:'no' },
      { icon:'✨', label:'A little is fine', sub:'Just a splash', value:'little' },
    ]
  },
  {
    id: 'taste',
    text: 'What flavours do you naturally enjoy?',
    hint: 'Think about chocolate, fruit, or other drinks you like.',
    options: [
      { icon:'🍫', label:'Chocolate, caramel, nutty', sub:'Rich and sweet', value:'sweet' },
      { icon:'🍋', label:'Fruity, bright, tangy', sub:'Like berries or citrus', value:'fruity' },
      { icon:'🌑', label:'Dark, smoky, bitter', sub:'Bold with depth', value:'dark' },
      { icon:'🌿', label:'Clean and simple', sub:'Neutral, not too complex', value:'neutral' },
    ]
  },
  {
    id: 'effort',
    text: 'How much effort do you want to put in?',
    hint: 'Be honest — there\'s a perfect coffee for every lifestyle.',
    options: [
      { icon:'⚡', label:'Zero effort — quick and easy', sub:'Just press a button', value:'easy' },
      { icon:'🎯', label:'Some effort is fine', sub:'I can measure and time things', value:'medium' },
      { icon:'🧑‍🍳', label:'I want to learn the craft', sub:'I\'m ready to dive deep', value:'craft' },
    ]
  },
]

const RESULTS = {
  cold_brew: { drinkKey:'cold_brew', photo:'https://images.unsplash.com/photo-1591933940638-d253adcdcb98?w=800&auto=format&fit=crop', drink:'Cold Brew', emoji:'🧊', tagline:'Smooth, sweet, and incredibly easy to love.', why:'You want something cold, smooth, and not too intense. Cold brew is made by steeping coffee in cold water for 12–24 hours — no heat, no bitterness, naturally sweet.', how:'Add 1g of coarsely ground coffee per 8ml of cold water. Stir, cover, and leave in the fridge overnight. Strain in the morning. Serve over ice.', tips:['Buy cold brew concentrate at any supermarket to start.','Try it with oat milk for an extra creamy flavour.','It keeps in the fridge for up to 2 weeks.','Start with a medium roast Colombian bean.'], link:'/types' },
  latte: { drinkKey:'latte', photo:'https://plus.unsplash.com/premium_photo-1674327105076-36c4419864cf?w=800&auto=format&fit=crop', drink:'Latte', emoji:'🥛', tagline:'Creamy, gentle, and the world\'s most popular coffee drink.', why:'You like warm, creamy drinks with a mild flavour. A latte is one shot of espresso in a large amount of steamed milk — gentle and very easy to enjoy.', how:'At a café, ask for a latte. At home, brew strong coffee and heat up milk — froth it if you can. Pour the hot milk over the coffee.', tips:['Ask for oat milk if you\'re dairy-free.','A vanilla latte adds sweetness without being overwhelming.','Try it with a medium roast for the best flavour.','If a latte feels too milky, try a flat white next.'], link:'/types' },
  cappuccino: { drinkKey:'cappuccino', photo:'https://images.unsplash.com/photo-1608070734668-e74dc3dda037?w=800&auto=format&fit=crop', drink:'Cappuccino', emoji:'☁️', tagline:'Equal parts espresso, milk, and foam — a classic for good reason.', why:'You want something balanced — not too milky, not too strong. A cappuccino is the perfect middle ground: espresso, steamed milk, and thick foam.', how:'Order one at any café. At home, brew strong coffee, heat and froth milk to create thick foam, then pour milk and spoon foam on top.', tips:['A dry cappuccino has more foam, less milk.','A wet cappuccino has more milk, less foam.','Traditionally a morning drink in Italy.','Try with a medium-dark roast for the classic flavour.'], link:'/types' },
  americano: { drinkKey:'americano', photo:'https://images.unsplash.com/photo-1531835207745-506a1bc035d8?w=800&auto=format&fit=crop', drink:'Americano', emoji:'⬛', tagline:'Bold, clean, and honest. Coffee at its most straightforward.', why:'You want something strong and black. An Americano is espresso diluted with hot water — the depth of espresso with a gentler, longer drinking experience.', how:'Order one at any café. At home, brew a strong espresso and add hot water to taste. Start with a 1:3 ratio and adjust.', tips:['If it tastes too bitter, use slightly hotter water.','Try Ethiopian beans for a cleaner, fruity taste.','Let it cool slightly before drinking.','The Americano was named after WWII American soldiers.'], link:'/types' },
  pour_over: { drinkKey:'pour_over', photo:'https://images.unsplash.com/photo-1545665225-b23b99e4d45e?w=800&auto=format&fit=crop', drink:'Pour Over', emoji:'🫗', tagline:'Clean, nuanced, and genuinely rewarding to make.', why:'You enjoy light, bright, and fruity flavours and you\'re willing to learn. Pour over lets the bean\'s character shine through completely.', how:'Use a V60. Rinse the filter, add medium-ground coffee, bloom with a small pour for 30 seconds, then pour slowly in spirals. Total brew time: 3–4 minutes.', tips:['A light roast Ethiopian gives incredible blueberry notes.','Always rinse your paper filter first.','The bloom releases CO₂ for more even extraction.','Invest in a gooseneck kettle.'], link:'/brewing' },
  french_press: { drinkKey:'french_press', photo:'https://images.unsplash.com/photo-1721406769891-f2ba651401d9?w=800&auto=format&fit=crop', drink:'French Press', emoji:'🫙', tagline:'Rich, full-bodied, and deeply satisfying.', why:'You like bold, chocolatey flavours and a simple process. French Press steeps grounds in hot water for 4 minutes — rich and full-bodied.', how:'Add coarsely ground coffee (1g per 15ml water). Pour 93°C water. Wait 4 minutes. Press slowly. Pour immediately.', tips:['Use a coarse grind — too fine tastes muddy.','Don\'t press too hard or too fast.','Pour all the coffee out immediately after pressing.','Brazilian beans work beautifully in a French Press.'], link:'/brewing' },
  espresso: { drinkKey:'espresso', photo:'https://images.unsplash.com/photo-1595928642581-f50f4f3453a5?w=800&auto=format&fit=crop', drink:'Espresso', emoji:'☕', tagline:'The purest, most concentrated expression of coffee.', why:'You like strong, intense, no-nonsense coffee. Espresso is 30ml of pure concentrated coffee — bold, complex, with a thick golden crema on top.', how:'You\'ll need an espresso machine. Use 18–20g of finely ground coffee, tamp firmly, and pull a shot in 25–30 seconds.', tips:['Grind size is everything — small adjustments matter.','If it tastes sour, grind finer.','If it tastes bitter, grind coarser.','A great espresso should taste sweet, not just strong.'], link:'/brewing' },
}

function getResult(answers) {
  const { temp, strength, milk, taste, effort } = answers
  if (temp === 'cold') return RESULTS.cold_brew
  if (milk === 'yes') return strength === 'mild' || strength === 'medium' ? RESULTS.latte : RESULTS.cappuccino
  if (milk === 'little') return strength === 'strong' ? RESULTS.americano : RESULTS.cappuccino
  if (milk === 'no') {
    if (taste === 'fruity' && effort !== 'easy') return RESULTS.pour_over
    if (taste === 'dark' || strength === 'strong') return RESULTS.espresso
    if (effort === 'craft') return RESULTS.pour_over
    return RESULTS.americano
  }
  if (taste === 'sweet' || taste === 'neutral') return RESULTS.latte
  if (strength === 'strong') return RESULTS.americano
  return RESULTS.cappuccino
}

export default function Quiz() {
  const [screen, setScreen] = useState('intro')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const navigate = useNavigate()

  const select = (qId, value) => setAnswers(a => ({...a, [qId]: value}))

  const next = () => {
    if (currentQ < QUESTIONS.length - 1) setCurrentQ(q => q + 1)
    else { 
      const r = getResult(answers)
      setResult(r)
      setScreen('result')
      saveQuizResult(r.drink)
    }
  }

  const back = () => { if (currentQ > 0) setCurrentQ(q => q - 1) }

  const retake = () => { setScreen('intro'); setCurrentQ(0); setAnswers({}); setResult(null) }

  const q = QUESTIONS[currentQ]
  const progress = ((currentQ + 1) / QUESTIONS.length) * 100

  const saveQuizResult = async (drinkName) => {
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase
      .from('quiz_results')
      .insert({
        drink: drinkName,
        score: Object.keys(answers).length,
        total_questions: QUESTIONS.length,
        percentage: 100,
        time_taken_seconds: 0,
        user_id: user?.id ?? null,
        username: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Anonymous'
      })
    if (error) console.error('Error saving:', error.message)
  }
  return (
    <main>
      <div className="quiz-page">

        {/* INTRO */}
        {screen === 'intro' && (
          <div className="quiz-intro">
            <p className="quiz-tag">For complete beginners</p>
            <h1 className="quiz-title">Find Your<br/><em>Perfect Coffee</em></h1>
            <p className="quiz-desc">Never sure what to order? Answer 5 simple questions and we'll tell you exactly what coffee suits you — and how to make it.</p>
            <p className="quiz-meta">5 questions · 2 minutes · No coffee knowledge needed</p>
            <button className="btn btn-primary" onClick={() => setScreen('quiz')}>Start the Quiz →</button>
          </div>
        )}

        {/* QUIZ */}
        {screen === 'quiz' && (
          <div className="quiz-wrap">
            <div className="quiz-progress">
              <div className="quiz-progress-header">
                <span className="quiz-progress-label">Question {currentQ+1} of {QUESTIONS.length}</span>
                <span className="quiz-progress-frac">{currentQ+1} / {QUESTIONS.length}</span>
              </div>
              <div className="quiz-progress-track">
                <div className="quiz-progress-fill" style={{width: progress+'%'}} />
              </div>
            </div>

            <div className="quiz-question">
              <p className="quiz-q-num">Question {currentQ+1}</p>
              <h2 className="quiz-q-text">{q.text}</h2>
              <p className="quiz-q-hint">{q.hint}</p>
              <div className="quiz-options">
                {q.options.map(o => (
                  <div key={o.value}
                    className={`quiz-option ${answers[q.id] === o.value ? 'selected' : ''}`}
                    onClick={() => select(q.id, o.value)}>
                    <span className="quiz-option-icon">{o.icon}</span>
                    <span className="quiz-option-text">
                      <span className="quiz-option-label">{o.label}</span>
                      <span className="quiz-option-sub">{o.sub}</span>
                    </span>
                    <span className="quiz-option-check" />
                  </div>
                ))}
              </div>
              <div className="quiz-footer">
                <button className="quiz-nav-btn quiz-back" onClick={back} style={{visibility: currentQ===0?'hidden':'visible'}}>← Back</button>
                <button className="quiz-nav-btn quiz-next" onClick={next} disabled={!answers[q.id]}>
                  {currentQ === QUESTIONS.length-1 ? 'See My Coffee →' : 'Next →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RESULT */}
        {screen === 'result' && result && (
          <div className="quiz-result">
            <div className="quiz-result-hero">
              <p className="quiz-result-tag">Your perfect coffee is</p>
              <span className="quiz-result-emoji">{result.emoji}</span>
              <h2 className="quiz-result-drink">{result.drink}</h2>
              <p className="quiz-result-tagline">{result.tagline}</p>
              <div className="quiz-result-photo-wrap">
                <img
                  src={result.photo}
                  alt={result.drink}
                  className="quiz-result-photo"
                />
              </div>
              <button
                className="quiz-world-btn"
                onClick={() => navigate(`/quiz/world-versions/${result.drinkKey}`)}
              >
                See World Versions of {result.drink} →
              </button>
            </div>
            <div className="quiz-result-grid">
              <div className="quiz-result-box">
                <p className="quiz-result-box-label">Why this suits you</p>
                <p>{result.why}</p>
              </div>
              <div className="quiz-result-box">
                <p className="quiz-result-box-label">How to make it</p>
                <p>{result.how}</p>
              </div>
            </div>
            <div className="quiz-result-tips">
              <p className="quiz-tips-label">Beginner Tips</p>
              <div className="quiz-tips-grid">
                {result.tips.map((t,i) => (
                  <div key={i} className="quiz-tip">
                    <div className="quiz-tip-dot" />
                    <p>{t}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="quiz-result-actions">
              <Link to={result.link} className="btn btn-primary">Learn More →</Link>
              <button className="btn btn-ghost" onClick={retake}>Retake Quiz</button>
              <Link to="/" className="btn btn-ghost">Explore CoffeeVerse</Link>
            </div>
          </div>
        )}
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
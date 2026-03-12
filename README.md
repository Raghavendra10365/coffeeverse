# CoffeeVerse ☕

A comprehensive coffee education web app built with React + Vite. Designed for complete beginners and coffee enthusiasts alike — covering everything from brew methods to origins, roast levels, and personalised recommendations.

🌐 **Live Site:** [coffeeverse-seven.vercel.app](https://coffeeverse-seven.vercel.app)

---

## Pages

| Page | Description |
|------|-------------|
| **Home** | Landing page with hero, stats, and navigation cards |
| **Coffee Types** | Espresso, Americano, Cappuccino, Latte, Cold Brew — with flavour bars and specs |
| **Brewing Methods** | French Press, Pour Over, AeroPress, Espresso, Cold Brew — with interactive timers |
| **Origins** | Africa, South America, Central America, Asia Pacific — flavour profiles and stats |
| **Roast Levels** | Light, Medium, Dark — animated characteristic bars and bean recommendations |
| **Calculator** | Brew ratio calculator for 6 methods with strength adjustment and save to account |
| **Coffee Quiz** | 5-question personalised coffee recommendation quiz with 7 possible results |
| **Glossary** | 50 coffee terms with live search, A–Z filter, and plain English definitions |

---

## Tech Stack

- **React 18** — component-based UI
- **Vite 7** — fast dev server and build tool
- **React Router v6** — client-side routing
- **Supabase** — authentication, database, and row-level security
- **CSS Variables** — shared design system (no CSS framework)
- **Deployed on Vercel** — auto-deploys on every push to main

---

## Features

- **User accounts** — sign up, log in, log out via Supabase Auth
- **Dashboard** — personal profile, quiz history, and saved brews
- **Leaderboard** — top quiz scores across all users
- **Save brews** — save calculator results to your account
- **Quiz history** — all past quiz results saved per user
- Custom animated cursor
- Scroll-reveal animations via IntersectionObserver
- Interactive brew timers with step tracker
- Live search and filtering in Glossary
- Personalised quiz with 7 possible result types and world variant explorer
- Custom 404 page
- Responsive design — works on mobile and desktop
- Consistent design system across all pages

---

## Design System
```
Fonts:    Cormorant (display) · Jost (body) · DM Mono (labels)
Colours:  Warm amber palette — bark, honey, gold, cream, latte
```

---

## Database Schema (Supabase)

**`quiz_results`** — stores quiz submissions per user
```
id, created_at, score, total_questions, percentage, time_taken_seconds, drink, user_id, username
```

**`saved_brews`** — stores calculator results per user
```
id, created_at, brew_method, coffee_grams, water_ml, ratio, notes, strength, user_id
```

---

## Getting Started
```bash
# Clone the repo
git clone https://github.com/Raghavendra10365/coffeeverse.git

# Install dependencies
cd coffeeverse
npm install

# Add environment variables
# Create a .env.local file with your Supabase credentials:
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Start dev server
npm run dev
```

---

## Roadmap

- [x] Supabase database integration
- [x] Save quiz results and brew history
- [x] User accounts and authentication
- [x] Leaderboard
- [x] Custom 404 page
- [ ] Fix Brewing page animated timer
- [ ] Delete saved brews from dashboard
- [ ] PWA support (installable on mobile)
- [ ] SEO meta tags

---

Built by [Raghavendra10365](https://github.com/Raghavendra10365)
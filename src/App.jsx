import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'
import Home from './pages/Home'
import Types from './pages/Types'
import Brewing from './pages/Brewing'
import Origins from './pages/Origins'
import Roast from './pages/Roast'
import Calculator from './pages/Calculator'
import Quiz from './pages/Quiz'
import Glossary from './pages/Glossary'
import WorldVersions from './pages/WorldVersions'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Leaderboard from './pages/Leaderboard'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <Routes>
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz/world-versions/:drink" element={<WorldVersions />} />        
        <Route path="/" element={<Home />} />
        <Route path="/types" element={<Types />} />
        <Route path="/brewing" element={<Brewing />} />
        <Route path="/origins" element={<Origins />} />
        <Route path="/roast" element={<Roast />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
import './App.css'
import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { Education } from './components/Education'
import { Contact } from './components/Contact'
import { Chatbot } from './components/Chatbot'
import SplashCursor from './components/animations/SplashCursor'

const THEME_KEY = 'portfolio-theme'

function readThemeFromDom() {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.getAttribute('data-theme') === 'light'
    ? 'light'
    : 'dark'
}

function App() {
  const [theme, setTheme] = useState(readThemeFromDom)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  const toggleTheme = () =>
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <div className="app">
      {!reduceMotion ? (
        <SplashCursor
          key={theme}
          TRANSPARENT
          RAINBOW_MODE={false}
          COLOR={theme === 'light' ? '#0284c7' : '#38bdf8'}
          BACK_COLOR={{ r: 0, g: 0, b: 0 }}
          SPLAT_RADIUS={0.18}
          SPLAT_FORCE={5200}
          DENSITY_DISSIPATION={3.2}
          CURL={2.5}
          DYE_RESOLUTION={1024}
        />
      ) : null}
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero theme={theme} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Chatbot />
    </div>
  )
}

export default App

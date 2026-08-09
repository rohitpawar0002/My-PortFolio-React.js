import { motion, useScroll } from 'framer-motion'
import { createPortal } from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import { navLinks, profile } from '../data/content'

const LINKS = [{ id: 'top', label: 'Home' }, ...navLinks]
const SECTION_IDS = LINKS.map((l) => l.id)

function IconSun() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function IconMoon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function IconMenu() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

const MOBILE_NAV_MAX = 900

export function Navbar({ theme, onToggleTheme }) {
  const headerRef = useRef(null)
  const [activeId, setActiveId] = useState('top')
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(88)

  useEffect(() => {
    const updateActive = () => {
      const navH = headerRef.current?.offsetHeight ?? 88
      const line = window.scrollY + navH + 12

      let current = 'top'
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= line) current = id
      }
      setActiveId(current)
    }

    updateActive()
    const raf = requestAnimationFrame(updateActive)

    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [])

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const sync = () => setHeaderHeight(el.getBoundingClientRect().height)
    sync()
    const ro = new ResizeObserver(sync)
    ro.observe(el)
    window.addEventListener('resize', sync)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', sync)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > MOBILE_NAV_MAX) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const toggleMenu = () => setMenuOpen((o) => !o)

  const nameParts = profile.name.trim().split(/\s+/)
  const firstName = nameParts[0] || profile.name
  const lastName = nameParts.slice(1).join(' ')

  const { scrollYProgress } = useScroll()

  return (
    <motion.header
      ref={headerRef}
      className="nav"
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav__pill">
        <a href="#top" className="nav__brand" onClick={closeMenu}>
          <span className="nav__brand-first">Rohit's</span>
          {lastName ? (
            <span className="nav__brand-last">Portfolio</span>
          ) : (
            <span className="nav__dot">.</span>
          )}
        </a>

        <nav className="nav__links nav__links--desktop" aria-label="Primary">
          {LINKS.map((link) => {
            const isActive = link.id === activeId
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={
                  isActive ? 'nav__link nav__link--active' : 'nav__link'
                }
                aria-current={isActive ? 'location' : undefined}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="nav__actions">
          <a href="#contact" className="nav__cta" onClick={closeMenu}>
            Get in touch
          </a>

          <button
            type="button"
            className="nav__theme"
            onClick={onToggleTheme}
            aria-label={
              theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            }
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </button>

          {profile.photo ? (
            <a
              href="#top"
              className="nav__avatar"
              aria-label={`${profile.name} — back to top`}
              onClick={closeMenu}
            >
              <img
                src={profile.photo}
                alt=""
                width={36}
                height={36}
                decoding="async"
              />
            </a>
          ) : null}

          <button
            type="button"
            className="nav__menu"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="nav-mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>

        <motion.div
          className="nav__scroll-line"
          aria-hidden
          style={{
            scaleX: scrollYProgress,
            transformOrigin: '0% 50%',
          }}
        />
      </div>

      {menuOpen &&
        createPortal(
          <div className="nav__drawer">
            <button
              type="button"
              className="nav__drawer-backdrop"
              aria-label="Close menu"
              onClick={closeMenu}
            />
            <nav
              id="nav-mobile-menu"
              className="nav__drawer-panel"
              aria-label="Primary"
              style={{ top: headerHeight + 8 }}
            >
              <ul className="nav__drawer-list">
                {LINKS.map((link) => {
                  const isActive = link.id === activeId
                  return (
                    <li key={link.id} className="nav__drawer-item">
                      <a
                        href={`#${link.id}`}
                        className={
                          isActive
                            ? 'nav__drawer-link nav__drawer-link--active'
                            : 'nav__drawer-link'
                        }
                        aria-current={isActive ? 'location' : undefined}
                        onClick={closeMenu}
                      >
                        {link.label}
                      </a>
                    </li>
                  )
                })}
                <li className="nav__drawer-item">
                  <a
                    href="#contact"
                    className="nav__drawer-cta"
                    onClick={closeMenu}
                  >
                    Get in touch
                  </a>
                </li>
              </ul>
            </nav>
          </div>,
          document.body,
        )}
    </motion.header>
  )
}

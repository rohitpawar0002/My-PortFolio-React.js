import { motion } from 'framer-motion'
import { navLinks, profile } from '../data/content'

export function Navbar() {
  return (
    <motion.header
      className="nav"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#top" className="nav__brand">
        {profile.name.split(' ')[0]}
        <span className="nav__dot">.</span>
      </a>
      <nav className="nav__links" aria-label="Primary">
        {navLinks.map((link) => (
          <a key={link.id} href={`#${link.id}`} className="nav__link">
            {link.label}
          </a>
        ))}
      </nav>
    </motion.header>
  )
}

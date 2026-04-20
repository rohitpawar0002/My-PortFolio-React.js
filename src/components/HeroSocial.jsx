import { motion } from 'framer-motion'
import { profile } from '../data/content'

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="hero-social__svg">
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  )
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="hero-social__svg">
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
      />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="hero-social__svg">
      <path
        fill="currentColor"
        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
      />
    </svg>
  )
}

function IconGitHub() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="hero-social__svg">
      <path
        fill="currentColor"
        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
      />
    </svg>
  )
}

function IconProjects() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="hero-social__svg">
      <path
        fill="currentColor"
        d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2zm0 2h8v12H4V6h6V4zm2 7h-2v2h2v-2zm0-4h-2v2h2V9zm4 4h-2v2h2v-2zm0-4h-2v2h2V9z"
      />
    </svg>
  )
}

const icons = {
  linkedin: IconLinkedIn,
  mail: IconMail,
  phone: IconPhone,
  github: IconGitHub,
  projects: IconProjects,
}

export function HeroSocial() {
  const items = [
    { key: 'in', href: profile.linkedin, label: 'LinkedIn', icon: 'linkedin' },
    { key: 'mail', href: `mailto:${profile.email}`, label: 'Email', icon: 'mail' },
    {
      key: 'phone',
      href: `tel:${profile.phone.replace(/\s/g, '')}`,
      label: 'Phone',
      icon: 'phone',
    },
    profile.github
      ? {
          key: 'gh',
          href: profile.github,
          label: 'GitHub',
          icon: 'github',
        }
      : {
          key: 'proj',
          href: '#projects',
          label: 'Projects',
          icon: 'projects',
        },
  ]

  return (
    <div className="hero-social">
      {items.map(({ key, href, label, icon }) => {
        const Icon = icons[icon]
        return (
          <motion.a
            key={key}
            href={href}
            className="hero-social__link"
            aria-label={label}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Icon />
          </motion.a>
        )
      })}
    </div>
  )
}

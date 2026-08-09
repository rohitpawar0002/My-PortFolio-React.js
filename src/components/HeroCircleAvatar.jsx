import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/content'

function initialsFromName(name) {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/**
 * Organic blob avatar — glowing outline + blue fill + clipped photo.
 */
export function HeroCircleAvatar() {
  const reduce = useReducedMotion()
  const [photoFailed, setPhotoFailed] = useState(false)
  const initials = initialsFromName(profile.name)
  const showPhoto = Boolean(profile.photo) && !photoFailed

  return (
    <motion.div
      className={`hero__blob${reduce ? ' hero__blob--static' : ''}`}
      initial={reduce ? false : { opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="hero__blob-aura" aria-hidden />
      <div className="hero__blob-shell">
        <div className="hero__blob-fill" aria-hidden />
        {showPhoto ? (
          <img
            className="hero__blob-img"
            src={profile.photo}
            alt={profile.name}
            width={320}
            height={320}
            decoding="async"
            onError={() => setPhotoFailed(true)}
          />
        ) : (
          <span className="hero__blob-fallback" aria-hidden>
            {initials}
          </span>
        )}
        <span className="hero__blob-ring" aria-hidden />
      </div>
    </motion.div>
  )
}

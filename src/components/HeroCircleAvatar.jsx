import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/content'

function initialsFromName(name) {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function HeroCircleAvatar() {
  const reduce = useReducedMotion()
  const [photoFailed, setPhotoFailed] = useState(false)
  const initials = initialsFromName(profile.name)
  const showPhoto = profile.photo && !photoFailed

  return (
    <motion.div
      className="hero__circle hero__circle--hero"
      initial={reduce ? false : { opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="hero__circle-ring"
        aria-hidden
        animate={
          reduce ? undefined : { rotate: [0, 4, -4, 0], scale: [1, 1.02, 1] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="hero__circle-clip">
        {showPhoto ? (
          <img
            className="hero__circle-img"
            src={profile.photo}
            alt=""
            width={256}
            height={256}
            onError={() => setPhotoFailed(true)}
          />
        ) : (
          <span className="hero__circle-fallback" aria-hidden>
            {initials}
          </span>
        )}
      </div>
    </motion.div>
  )
}

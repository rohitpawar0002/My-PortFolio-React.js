import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

const presets = {
  up: {
    hidden: { opacity: 0, y: 36, filter: 'blur(8px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  left: {
    hidden: { opacity: 0, x: -28, filter: 'blur(6px)' },
    show: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  right: {
    hidden: { opacity: 0, x: 28, filter: 'blur(6px)' },
    show: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94, filter: 'blur(6px)' },
    show: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
}

/**
 * Scroll-triggered reveal — blur + fade + motion.
 * Respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  duration = 0.7,
  className = '',
  once = true,
  amount = 0.25,
  margin = '-60px',
  style,
}) {
  const reduceMotion = useReducedMotion()
  const MotionTag = motion[Tag] || motion.div
  const preset = presets[variant] || presets.up

  if (reduceMotion) {
    const Static = Tag === 'div' ? 'div' : Tag
    return (
      <Static className={className} style={style}>
        {children}
      </Static>
    )
  }

  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin }}
      variants={{
        hidden: preset.hidden,
        show: {
          ...preset.show,
          transition: { duration, delay, ease: EASE },
        },
      }}
    >
      {children}
    </MotionTag>
  )
}

export function RevealStagger({
  children,
  className = '',
  stagger = 0.08,
  delayChildren = 0.05,
  once = true,
  margin = '-50px',
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export const revealItem = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: EASE },
  },
}

export const revealItemSpring = {
  hidden: { opacity: 0, scale: 0.88, y: 14 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 340, damping: 22 },
  },
}

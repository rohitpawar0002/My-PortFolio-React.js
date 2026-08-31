import { motion, useReducedMotion } from 'framer-motion'
import ScrollFloat from './react-bits/ScrollFloat'

export function SectionHeading({ eyebrow, title, titleId }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="section-head">
      {eyebrow ? (
        <motion.p
          className="section-head__eyebrow"
          initial={reduceMotion ? false : { opacity: 0, y: 12, letterSpacing: '0.28em' }}
          whileInView={
            reduceMotion
              ? undefined
              : { opacity: 1, y: 0, letterSpacing: '0.18em' }
          }
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow}
        </motion.p>
      ) : null}

      {reduceMotion ? (
        <h2 id={titleId} className="section-head__title">
          {title}
        </h2>
      ) : (
        <ScrollFloat
          as="h2"
          id={titleId}
          containerClassName="section-head__title"
          textClassName="section-head__title-text"
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="top bottom-=15%"
          scrollEnd="top 45%"
          stagger={0.03}
        >
          {title}
        </ScrollFloat>
      )}

      <motion.span
        className="section-head__line"
        aria-hidden
        initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
        whileInView={reduceMotion ? undefined : { scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{
          duration: 0.7,
          delay: 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ transformOrigin: '0% 50%' }}
      />
    </div>
  )
}

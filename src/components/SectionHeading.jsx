import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

export function SectionHeading({ eyebrow, title, titleId }) {
  return (
    <motion.div
      className="section-head"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
    >
      {eyebrow && <p className="section-head__eyebrow">{eyebrow}</p>}
      <h2 id={titleId} className="section-head__title">
        {title}
      </h2>
    </motion.div>
  )
}

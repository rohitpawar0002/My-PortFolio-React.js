import { motion, useReducedMotion } from 'framer-motion'
import { skills } from '../data/content'
import { revealItemSpring } from './animations/Reveal'
import { SectionHeading } from './SectionHeading'

export function Skills() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <SectionHeading
        eyebrow="Toolkit"
        title="Skills & technologies"
        titleId="skills-title"
      />
      <motion.ul
        className="skills"
        initial={reduceMotion ? false : 'hidden'}
        whileInView={reduceMotion ? undefined : 'show'}
        viewport={{ once: true, margin: '-40px' }}
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.035, delayChildren: 0.08 },
          },
        }}
      >
        {skills.map((skill) => (
          <motion.li
            key={skill}
            className="skills__pill"
            variants={revealItemSpring}
            whileHover={
              reduceMotion ? undefined : { y: -4, transition: { duration: 0.2 } }
            }
          >
            {skill}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}

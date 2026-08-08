import { motion } from 'framer-motion'
import { skills } from '../data/content'
import { SectionHeading } from './SectionHeading'

export function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <SectionHeading
        eyebrow="Toolkit"
        title="Skills & technologies"
        titleId="skills-title"
      />
      <motion.ul
        className="skills"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.04 },
          },
        }}
      >
        {skills.map((skill) => (
          <motion.li
            key={skill}
            className="skills__pill"
            variants={{
              hidden: { opacity: 0, scale: 0.85, y: 12 },
              show: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { type: 'spring', stiffness: 380, damping: 24 },
              },
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            {skill}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}

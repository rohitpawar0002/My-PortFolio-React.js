import { motion, useReducedMotion } from 'framer-motion'
import { awards, education } from '../data/content'
import educationCap from '../assets/education-cap.svg'
import { Reveal, revealItem } from './animations/Reveal'
import { AnimatedImage } from './AnimatedImage'
import { SectionHeading } from './SectionHeading'

export function Education() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="section" id="education" aria-labelledby="edu-title">
      <SectionHeading
        eyebrow="Background"
        title="Education & awards"
        titleId="edu-title"
      />

      <Reveal variant="scale">
        <AnimatedImage
          src={educationCap}
          alt=""
          className="education__banner"
          imgClassName="education__banner-img"
          float={false}
          delay={0}
        />
      </Reveal>

      <div className="edu-grid">
        <Reveal variant="up" className="edu-block" delay={0.05}>
          <h3 className="edu-block__h">Education</h3>
          <motion.ul
            className="edu-list"
            initial={reduceMotion ? false : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.1, delayChildren: 0.1 },
              },
            }}
          >
            {education.map((e) => (
              <motion.li
                key={e.degree + e.period}
                className="edu-list__item"
                variants={revealItem}
              >
                <span className="edu-list__degree">{e.degree}</span>
                <span className="edu-list__school">
                  {e.school}, {e.location}
                </span>
                <span className="edu-list__period">{e.period}</span>
              </motion.li>
            ))}
          </motion.ul>
        </Reveal>

        <Reveal
          variant="up"
          className="edu-block edu-block--awards"
          delay={0.12}
        >
          <h3 className="edu-block__h">Awards & certifications</h3>
          <motion.ul
            className="awards-list"
            initial={reduceMotion ? false : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.1, delayChildren: 0.1 },
              },
            }}
          >
            {awards.map((a) => (
              <motion.li
                key={a.title}
                className="awards-list__item"
                variants={revealItem}
              >
                <span className="awards-list__title">{a.title}</span>
                {a.year && <span className="awards-list__year">{a.year}</span>}
                <p className="awards-list__detail">{a.detail}</p>
              </motion.li>
            ))}
          </motion.ul>
        </Reveal>
      </div>
    </section>
  )
}

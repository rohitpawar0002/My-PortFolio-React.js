import { motion } from 'framer-motion'
import { awards, education } from '../data/content'
import educationCap from '../assets/education-cap.svg'
import { AnimatedImage } from './AnimatedImage'
import { SectionHeading } from './SectionHeading'

export function Education() {
  return (
    <section className="section" id="education" aria-labelledby="edu-title">
      <SectionHeading
        eyebrow="Background"
        title="Education & awards"
        titleId="edu-title"
      />

      <AnimatedImage
        src={educationCap}
        alt=""
        className="education__banner"
        imgClassName="education__banner-img"
        float={false}
        delay={0}
      />

      <div className="edu-grid">
        <motion.div
          className="edu-block"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <h3 className="edu-block__h">Education</h3>
          <ul className="edu-list">
            {education.map((e) => (
              <li key={e.degree + e.period} className="edu-list__item">
                <span className="edu-list__degree">{e.degree}</span>
                <span className="edu-list__school">
                  {e.school}, {e.location}
                </span>
                <span className="edu-list__period">{e.period}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="edu-block edu-block--awards"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          <h3 className="edu-block__h">Awards & certifications</h3>
          <ul className="awards-list">
            {awards.map((a) => (
              <li key={a.title} className="awards-list__item">
                <span className="awards-list__title">{a.title}</span>
                {a.year && <span className="awards-list__year">{a.year}</span>}
                <p className="awards-list__detail">{a.detail}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

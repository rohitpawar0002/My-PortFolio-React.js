import { motion } from 'framer-motion'
import { experience } from '../data/content'
import { AnimatedImage } from './AnimatedImage'
import { SectionHeading } from './SectionHeading'

/** Served from `public/` — stable URL on static hosts; works with plain `<img>`. */
const EXPERIENCE_MAP_SRC = `${import.meta.env.BASE_URL}experience-map.svg`

export function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="exp-title">
      <SectionHeading eyebrow="Career" title="Experience" titleId="exp-title" />
      <AnimatedImage
        src={EXPERIENCE_MAP_SRC}
        alt=""
        className="experience__banner"
        imgClassName="experience__banner-img"
        float={false}
        delay={0.05}
      />
      <ol className="timeline">
        {experience.map((job, index) => (
          <motion.li
            key={job.company + job.period}
            className="timeline__item"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="timeline__marker" aria-hidden />
            <motion.article
              className="timeline__card"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <div className="timeline__head">
                <h3 className="timeline__role">{job.role}</h3>
                <p className="timeline__company">{job.company}</p>
                <p className="timeline__meta">
                  {job.location} · {job.period}
                </p>
              </div>
              <p className="timeline__stack">{job.stack}</p>
              <ul className="timeline__list">
                {job.highlights.map((h) => (
                  <li key={h.slice(0, 48)}>{h}</li>
                ))}
              </ul>
            </motion.article>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}

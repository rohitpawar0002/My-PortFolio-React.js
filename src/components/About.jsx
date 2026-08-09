import { motion } from 'framer-motion'
import { summary } from '../data/content'
import { Reveal, RevealStagger, revealItem } from './animations/Reveal'
import { SectionHeading } from './SectionHeading'

export function About() {
  return (
    <section
      className="section section--about"
      id="about"
      aria-labelledby="about-title"
    >
      <SectionHeading eyebrow="Profile" title="About me" titleId="about-title" />
      <div className="about__grid">
        <Reveal variant="left" delay={0.05} className="about__figure-wrap">
          <figure className="about__figure">
            <img
              className="about__img"
              src="/about-dashboard.png"
              alt="Futuristic holographic dashboard interface"
              width={720}
              height={1280}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </Reveal>
        <RevealStagger className="about__copy" stagger={0.12}>
          {summary.map((paragraph, i) => (
            <motion.p key={i} className="about__p" variants={revealItem}>
              {paragraph}
            </motion.p>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}

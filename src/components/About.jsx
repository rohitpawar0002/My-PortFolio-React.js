import { motion } from 'framer-motion'
import { summary } from '../data/content'
import aboutCode from '../assets/about-code.svg'
import { Reveal, RevealStagger, revealItem } from './animations/Reveal'
import { AnimatedImage } from './AnimatedImage'
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
        <Reveal variant="left" delay={0.05}>
          <AnimatedImage
            src={aboutCode}
            alt=""
            className="about__figure"
            imgClassName="about__img"
            delay={0}
          />
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

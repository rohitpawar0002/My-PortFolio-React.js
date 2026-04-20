import { motion } from 'framer-motion'
import { summary } from '../data/content'
import aboutCode from '../assets/about-code.svg'
import { AnimatedImage } from './AnimatedImage'
import { SectionHeading } from './SectionHeading'

const list = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const line = {
  hidden: { opacity: 0, x: -16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

export function About() {
  return (
    <section
      className="section section--about"
      id="about"
      aria-labelledby="about-title"
    >
      <SectionHeading eyebrow="Profile" title="About me" titleId="about-title" />
      <div className="about__grid">
        <AnimatedImage
          src={aboutCode}
          alt=""
          className="about__figure"
          imgClassName="about__img"
          delay={0.05}
        />
        <motion.div
          className="about__copy"
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {summary.map((paragraph, i) => (
            <motion.p key={i} className="about__p" variants={line}>
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

import { motion, useReducedMotion } from 'framer-motion'
import { awards, education } from '../data/content'
import educationCap from '../assets/education-cap.svg'
import { Reveal, revealItem } from './animations/Reveal'
import GlareHover from './react-bits/GlareHover'
import TiltedMedia from './react-bits/TiltedMedia'
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

      <Reveal variant="scale" className="education__banner-wrap">
        <div className="education__banner-stage">
          <div className="education__banner-glow" aria-hidden />
          <GlareHover
            className="education__banner-glare"
            width="100%"
            height="auto"
            background="transparent"
            borderColor="transparent"
            borderRadius="1rem"
            glareColor="#e0f2fe"
            glareOpacity={0.32}
            glareSize={220}
            transitionDuration={700}
          >
            <TiltedMedia rotateAmplitude={14} scaleOnHover={1.045}>
              <motion.div
                className="education__banner"
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 36, rotateX: 18, scale: 0.94 }
                }
                whileInView={
                  reduceMotion
                    ? undefined
                    : { opacity: 1, y: 0, rotateX: 0, scale: 1 }
                }
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformPerspective: 1200 }}
              >
                <motion.div
                  className="education__banner-float"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          y: [0, -10, 0],
                          rotateX: [0, 4, 0],
                          rotateY: [0, -3, 0],
                        }
                  }
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <img
                    src={educationCap}
                    alt=""
                    className="education__banner-img"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
              </motion.div>
            </TiltedMedia>
          </GlareHover>
        </div>
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

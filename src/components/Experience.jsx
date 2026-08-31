import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { experience } from '../data/content'
import experienceMap from '../assets/experience-map.svg'
import { Reveal, revealItem } from './animations/Reveal'
import { AnimatedImage } from './AnimatedImage'
import ScrollFloat from './react-bits/ScrollFloat'
import { SectionHeading } from './SectionHeading'

export function Experience() {
  const listRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 70%', 'end 55%'],
  })
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    restDelta: 0.001,
  })
  const lineScale = useTransform(progress, [0, 1], [0, 1])

  return (
    <section className="section" id="experience" aria-labelledby="exp-title">
      <SectionHeading eyebrow="Career" title="Experience" titleId="exp-title" />
      <Reveal variant="scale" delay={0.05}>
        <AnimatedImage
          src={experienceMap}
          alt=""
          className="experience__banner"
          imgClassName="experience__banner-img"
          float={false}
          delay={0}
          loading="eager"
        />
      </Reveal>
      <div className="timeline-wrap" ref={listRef}>
        <div className="timeline__track" aria-hidden>
          {!reduceMotion ? (
            <motion.div
              className="timeline__progress"
              style={{ scaleY: lineScale, transformOrigin: 'top center' }}
            />
          ) : (
            <div className="timeline__progress timeline__progress--static" />
          )}
        </div>
        <ol className="timeline">
          {experience.map((job, index) => (
            <motion.li
              key={job.company + job.period}
              className="timeline__item"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 40, filter: 'blur(8px)' }
              }
              whileInView={
                reduceMotion
                  ? undefined
                  : { opacity: 1, y: 0, filter: 'blur(0px)' }
              }
              viewport={{ once: true, margin: '-40px', amount: 0.3 }}
              transition={{
                duration: 0.65,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                className="timeline__marker"
                aria-hidden
                initial={reduceMotion ? false : { scale: 0 }}
                whileInView={reduceMotion ? undefined : { scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  stiffness: 420,
                  damping: 18,
                  delay: 0.1 + index * 0.06,
                }}
              />
              <motion.article
                className="timeline__card"
                whileHover={reduceMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.25 }}
              >
                <div className="timeline__head">
                  {reduceMotion ? (
                    <h3 className="timeline__role">{job.role}</h3>
                  ) : (
                    <ScrollFloat
                      as="h3"
                      containerClassName="timeline__role"
                      animationDuration={1}
                      ease="back.inOut(2)"
                      scrollStart="top bottom-=10%"
                      scrollEnd="top 55%"
                      stagger={0.025}
                    >
                      {job.role}
                    </ScrollFloat>
                  )}
                  <p className="timeline__company">{job.company}</p>
                  <p className="timeline__meta">
                    {job.location} · {job.period}
                  </p>
                </div>
                <p className="timeline__stack">{job.stack}</p>
                <motion.ul
                  className="timeline__list"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.06,
                        delayChildren: 0.12,
                      },
                    },
                  }}
                >
                  {job.highlights.map((h) => (
                    <motion.li key={h.slice(0, 48)} variants={revealItem}>
                      {h}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

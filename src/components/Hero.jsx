import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/content'
import Threads from './backgrounds/Threads'
import { HeroCircleAvatar } from './HeroCircleAvatar'
import { HeroSocial } from './HeroSocial'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const itemPhoto = {
  hidden: { opacity: 0, x: 32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

/** @param {{ theme?: 'dark' | 'light' }} props */
export function Hero({ theme = 'dark' }) {
  const reduceMotion = useReducedMotion()
  const threadsColor =
    theme === 'light' ? [0.02, 0.52, 0.78] : [0.22, 0.74, 0.97]

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      {!reduceMotion ? (
        <div className="hero__threads" aria-hidden>
          <Threads
            color={threadsColor}
            amplitude={1.15}
            distance={0}
            enableMouseInteraction
          />
        </div>
      ) : null}
      <div className="hero__glow hero__glow--1" aria-hidden />
      <div className="hero__glow hero__glow--2" aria-hidden />

      <div className="hero__layout">
        <motion.div
          className="hero__split"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="hero__col hero__col--text">
            <motion.p className="hero__greeting" variants={item}>
              {profile.greeting}
            </motion.p>
            <motion.h1
              id="hero-title"
              className="hero__title hero__title--hero"
              variants={item}
            >
              {profile.name}
            </motion.h1>
            <motion.p className="hero__role" variants={item}>
              {profile.roleLeadIn}{' '}
              <span className="hero__role-accent">{profile.title}</span>.
            </motion.p>
            <motion.p
              className="hero__tagline hero__tagline--hero"
              variants={item}
            >
              {profile.tagline}
            </motion.p>
            <motion.div variants={item}>
              <HeroSocial />
            </motion.div>
            <motion.div
              className="hero__actions hero__actions--hero"
              variants={item}
            >
              <motion.a
                className="btn btn--hero"
                href="#contact"
                whileHover={reduceMotion ? {} : { scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get in touch
              </motion.a>
              <motion.a
                className="btn btn--hero-outline"
                href="#experience"
                whileHover={reduceMotion ? {} : { scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View experience
              </motion.a>
              {profile.resumeUrl ? (
                <motion.a
                  className="btn btn--ghost"
                  href={profile.resumeUrl}
                  download={profile.resumeDownloadName}
                  whileHover={reduceMotion ? {} : { scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Download resume
                </motion.a>
              ) : null}
            </motion.div>
          </div>

          <motion.div
            className="hero__col hero__col--visual"
            variants={itemPhoto}
          >
            <div className="hero__avatar-stage">
              <HeroCircleAvatar />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        aria-hidden
      >
        <span className="hero__scroll-line" />
      </motion.div>
    </section>
  )
}

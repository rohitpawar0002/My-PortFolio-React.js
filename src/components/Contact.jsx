import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/content'
import contactMail from '../assets/contact-mail.svg'
import { Reveal } from './animations/Reveal'
import ScrollReveal from './react-bits/ScrollReveal'

export function Contact() {
  const reduceMotion = useReducedMotion()

  return (
    <footer className="contact" id="contact" aria-labelledby="contact-title">
      <Reveal variant="up" className="contact__inner" amount={0.2}>
        <motion.div
          className="contact__illus"
          aria-hidden
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          whileInView={
            reduceMotion ? undefined : { opacity: 1, scale: 1 }
          }
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={contactMail}
            alt=""
            width={320}
            height={200}
            decoding="async"
            animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {reduceMotion ? (
          <h2 id="contact-title" className="contact__title">
            Let&apos;s build something great
          </h2>
        ) : (
          <ScrollReveal
            as="h2"
            id="contact-title"
            containerClassName="contact__title"
            baseOpacity={0.15}
            baseRotation={2}
            blurStrength={4}
            enableBlur
            rotationEnd="top 70%"
            wordAnimationEnd="top 55%"
          >
            Let&apos;s build something great
          </ScrollReveal>
        )}

        <motion.p
          className="contact__lead"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Open to roles in front-end and full-stack development — Pune, remote,
          or UK relocation (visa sponsorship required).
        </motion.p>
        <motion.div
          className="contact__links"
          initial={reduceMotion ? false : 'hidden'}
          whileInView={reduceMotion ? undefined : 'show'}
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.08, delayChildren: 0.15 },
            },
          }}
        >
          {profile.resumeUrl ? (
            <motion.a
              className="contact__link"
              href={profile.resumeUrl}
              download={profile.resumeDownloadName}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Download resume (PDF)
            </motion.a>
          ) : null}
          <motion.a
            className="contact__link"
            href={`mailto:${profile.email}`}
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {profile.email}
          </motion.a>
          <motion.a
            className="contact__link contact__link--secondary"
            href={`tel:${profile.phone.replace(/\s/g, '')}`}
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {profile.phone}
          </motion.a>
          <motion.a
            className="contact__link contact__link--secondary"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            LinkedIn profile
          </motion.a>
          {profile.github ? (
            <motion.a
              className="contact__link contact__link--secondary"
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              GitHub profile
            </motion.a>
          ) : null}
        </motion.div>
        <p className="contact__copy">
          © {new Date().getFullYear()} {profile.name}. Built with React & Framer
          Motion.
        </p>
      </Reveal>
    </footer>
  )
}

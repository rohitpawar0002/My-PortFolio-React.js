import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/content'
import contactMail from '../assets/contact-mail.svg'

export function Contact() {
  const reduceMotion = useReducedMotion()

  return (
    <footer className="contact" id="contact" aria-labelledby="contact-title">
      <motion.div
        className="contact__inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="contact__illus"
          aria-hidden
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
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
        <h2 id="contact-title" className="contact__title">
          Let&apos;s build something great
        </h2>
        <p className="contact__lead">
          Open to roles in Angular, Ionic, and full-stack development across Pune
          or remote.
        </p>
        <div className="contact__links">
          <motion.a
            className="contact__link"
            href={`mailto:${profile.email}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {profile.email}
          </motion.a>
          <motion.a
            className="contact__link contact__link--secondary"
            href={`tel:${profile.phone.replace(/\s/g, '')}`}
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            LinkedIn profile
          </motion.a>
        </div>
        <p className="contact__copy">
          © {new Date().getFullYear()} {profile.name}. Built with React & Framer
          Motion.
        </p>
      </motion.div>
    </footer>
  )
}

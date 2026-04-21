import { motion, useReducedMotion } from 'framer-motion'

/**
 * Decorative image: fades in on scroll; optional gentle vertical float.
 */
export function AnimatedImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  float = true,
  delay = 0,
  ...imgProps
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={
          reduce || !float
            ? undefined
            : { y: [0, -10, 0] }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <img
          src={src}
          alt={alt}
          className={imgClassName}
          loading="lazy"
          decoding="async"
          {...imgProps}
        />
      </motion.div>
    </motion.div>
  )
}

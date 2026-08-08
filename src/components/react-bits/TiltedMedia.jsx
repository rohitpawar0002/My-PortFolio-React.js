import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useRef } from 'react'
import './TiltedMedia.css'

const springValues = {
  damping: 28,
  stiffness: 120,
  mass: 1.6,
}

/**
 * TiltedCard-style 3D shell (React Bits) wrapping live project media.
 * @see https://reactbits.dev/components/tilted-card
 */
export default function TiltedMedia({
  children,
  className = '',
  rotateAmplitude = 11,
  scaleOnHover = 1.035,
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const rotateX = useSpring(useMotionValue(0), springValues)
  const rotateY = useSpring(useMotionValue(0), springValues)
  const scale = useSpring(1, springValues)

  function handleMouse(e) {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2
    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude)
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude)
  }

  function handleMouseEnter() {
    if (reduce) return
    scale.set(scaleOnHover)
  }

  function handleMouseLeave() {
    scale.set(1)
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div
      ref={ref}
      className={`tilted-media ${className}`.trim()}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="tilted-media__inner"
        style={{ rotateX, rotateY, scale, transformPerspective: 900 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

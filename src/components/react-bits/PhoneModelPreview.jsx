import { useInView } from 'framer-motion'
import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ProjectPhoneSlideshow } from '../ProjectPhoneSlideshow'

const PhoneModelViewer = lazy(() => import('./PhoneModelViewer'))

class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {
    /* fall back to 2D slideshow */
  }

  render() {
    if (this.state.failed) return this.props.fallback
    return this.props.children
  }
}

/**
 * Lazy Model Viewer phone for screenshot projects, with 2D slideshow fallback.
 */
export function PhoneModelPreview({ shots, intervalMs = 3000 }) {
  const wrapRef = useRef(null)
  const isInView = useInView(wrapRef, { amount: 0.12, margin: '-20px' })
  const [index, setIndex] = useState(0)
  const [webglOk, setWebglOk] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)

  const imageShots = shots.filter(
    (s) => s?.src && !s.video && !/\.(mp4|webm|ogg)(\?|$)/i.test(s.src),
  )
  const n = imageShots.length

  const slideshow = (
    <ProjectPhoneSlideshow
      shots={shots}
      intervalMs={intervalMs}
      variant="phone"
    />
  )

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      if (!gl) setWebglOk(false)
    } catch {
      setWebglOk(false)
    }
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!webglOk || n <= 1 || reduceMotion || !isInView) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % n)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [webglOk, n, reduceMotion, isInView, intervalMs])

  if (!webglOk || n === 0 || reduceMotion) {
    return slideshow
  }

  const current = imageShots[index % n]

  return (
    <div
      ref={wrapRef}
      className="project-card__media project-card__media--device project-card__media--model"
      aria-label={`3D phone preview, ${index + 1} of ${n}`}
    >
      <ModelErrorBoundary fallback={slideshow}>
        <Suspense
          fallback={
            <div className="phone-model-viewer__loading" aria-hidden>
              Loading 3D phone…
            </div>
          }
        >
          <PhoneModelViewer
            shots={imageShots}
            index={index}
            active={isInView}
            autoRotate
          />
        </Suspense>
      </ModelErrorBoundary>

      {current?.label ? (
        <p className="project-device__caption">{current.label}</p>
      ) : null}

      {n > 1 ? (
        <div
          className="project-device__dots"
          role="tablist"
          aria-label="Choose screen"
        >
          {imageShots.map((s, i) => (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={i === index % n}
              aria-label={s.label || `Screen ${i + 1}`}
              className={
                i === index % n
                  ? 'project-device__dot is-active'
                  : 'project-device__dot'
              }
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

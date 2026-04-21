import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const DEFAULT_INTERVAL_MS = 3500

/** @param {{ shots: Array<{ src: string, label?: string }>, intervalMs?: number, variant?: 'phone' | 'browser', browserTitle?: string }} props */
export function ProjectPhoneSlideshow({
  shots,
  intervalMs = DEFAULT_INTERVAL_MS,
  variant = 'phone',
  browserTitle = 'Web app',
}) {
  const wrapRef = useRef(null)
  const isInView = useInView(wrapRef, { amount: 0.2, margin: '-60px' })
  const [index, setIndex] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(
    /** @type {number | null} */ (null),
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const n = shots.length
  const safeIndex = n ? (reduceMotion ? 0 : index % n) : 0
  const current = shots[safeIndex]

  useEffect(() => {
    if (n <= 1 || reduceMotion || !isInView) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % n)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [n, reduceMotion, isInView, intervalMs])

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (n > 1 && e.key === 'ArrowLeft') {
        e.preventDefault()
        setLightboxIndex((i) => {
          if (i == null) return i
          const next = (i - 1 + n) % n
          setIndex(next)
          return next
        })
      }
      if (n > 1 && e.key === 'ArrowRight') {
        e.preventDefault()
        setLightboxIndex((i) => {
          if (i == null) return i
          const next = (i + 1) % n
          setIndex(next)
          return next
        })
      }
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [lightboxIndex, n])

  const openLightbox = () => {
    setLightboxIndex(safeIndex)
  }

  const closeLightbox = () => setLightboxIndex(null)

  const goLightboxPrev = () => {
    if (n <= 1) return
    setLightboxIndex((i) => {
      if (i == null) return i
      const next = (i - 1 + n) % n
      setIndex(next)
      return next
    })
  }

  const goLightboxNext = () => {
    if (n <= 1) return
    setLightboxIndex((i) => {
      if (i == null) return i
      const next = (i + 1) % n
      setIndex(next)
      return next
    })
  }

  if (!n || !current) return null

  const mediaClass =
    variant === 'browser'
      ? 'project-card__media project-card__media--browser'
      : 'project-card__media project-card__media--device'

  const shotClass =
    variant === 'browser'
      ? 'project-browser__shot project-slideshow__shot--zoomable'
      : 'project-device__shot project-slideshow__shot--zoomable'

  const slide = (
    <AnimatePresence mode="wait" initial={false}>
      <motion.img
        key={current.src}
        src={current.src}
        alt={current.label || `Screen ${safeIndex + 1}`}
        className={shotClass}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.38 }}
        loading={safeIndex === 0 ? 'eager' : 'lazy'}
        decoding="async"
        onClick={openLightbox}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            openLightbox()
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`View larger: ${current.label || `screen ${safeIndex + 1}`}`}
      />
    </AnimatePresence>
  )

  const lbShot =
    lightboxIndex !== null && shots[lightboxIndex]
      ? shots[lightboxIndex]
      : null
  const lbLabel =
    lbShot?.label || (lightboxIndex != null ? `Screen ${lightboxIndex + 1}` : '')

  const lightboxNode =
    lightboxIndex !== null &&
    lbShot &&
    createPortal(
      <div
        className="project-lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Enlarged screenshot gallery"
      >
        <button
          type="button"
          className="project-lightbox__backdrop"
          aria-label="Close enlarged image"
          onClick={closeLightbox}
        />
        <figure className="project-lightbox__figure">
          <button
            type="button"
            className="project-lightbox__close"
            aria-label="Close"
            onClick={closeLightbox}
          >
            ×
          </button>
          <img
            key={lbShot.src}
            src={lbShot.src}
            alt={lbLabel}
            className="project-lightbox__img"
          />
          {lbLabel ? (
            <figcaption className="project-lightbox__caption">
              {lbLabel}
            </figcaption>
          ) : null}
          {n > 1 ? (
            <div
              className="project-lightbox__nav"
              aria-label="Gallery navigation"
            >
              <button
                type="button"
                className="project-lightbox__nav-btn"
                onClick={goLightboxPrev}
                aria-label="Previous image"
              >
                Previous
              </button>
              <span className="project-lightbox__counter" aria-live="polite">
                {lightboxIndex + 1} / {n}
              </span>
              <button
                type="button"
                className="project-lightbox__nav-btn"
                onClick={goLightboxNext}
                aria-label="Next image"
              >
                Next
              </button>
            </div>
          ) : null}
        </figure>
      </div>,
      document.body,
    )

  return (
    <div
      ref={wrapRef}
      className={mediaClass}
      aria-live={reduceMotion ? 'off' : 'polite'}
      aria-label={`Preview, ${safeIndex + 1} of ${n}`}
    >
      {variant === 'browser' ? (
        <div className="project-browser">
          <div className="project-browser__chrome" aria-hidden>
            <span className="project-browser__traffic">
              <span className="project-browser__traffic-dot" />
              <span className="project-browser__traffic-dot" />
              <span className="project-browser__traffic-dot" />
            </span>
            <div className="project-browser__url">{browserTitle}</div>
          </div>
          <div className="project-browser__viewport">{slide}</div>
        </div>
      ) : (
        <div className="project-device project-device--iphone16-pro">
          <div className="project-device__bezel">
            <div className="project-device__screen">{slide}</div>
          </div>
        </div>
      )}
      {current.label ? (
        <p className="project-device__caption">{current.label}</p>
      ) : null}
      {n > 1 ? (
        <div
          className="project-device__dots"
          role="tablist"
          aria-label="Choose screen"
        >
          {shots.map((s, i) => (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={i === safeIndex}
              aria-label={s.label || `Screen ${i + 1}`}
              className={
                i === safeIndex
                  ? 'project-device__dot is-active'
                  : 'project-device__dot'
              }
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      ) : null}
      <div className="project-card__media-shine" />
      {lightboxNode}
    </div>
  )
}

import { AnimatePresence, motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { DepthCarouselModal } from './react-bits/DepthCarouselModal'

const DEFAULT_INTERVAL_MS = 3000

function isVideoShot(s) {
  if (!s || !s.src) return false
  if (s.video === true) return true
  return /\.(mp4|webm|ogg)(\?|$)/i.test(s.src)
}

/** @param {{ shots: Array<{ src: string, label?: string, video?: boolean, poster?: string }>, intervalMs?: number, variant?: 'phone' | 'browser', browserTitle?: string }} props */
export function ProjectPhoneSlideshow({
  shots,
  intervalMs = DEFAULT_INTERVAL_MS,
  variant = 'phone',
  browserTitle = 'Web app',
}) {
  const wrapRef = useRef(null)
  const stageRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const videoRef = useRef(/** @type {HTMLVideoElement | null} */ (null))
  const isInView = useInView(wrapRef, { amount: 0.2, margin: '-60px' })
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(
    /** @type {number | null} */ (null),
  )
  const [carouselCaption, setCarouselCaption] = useState('')

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.4 })
  const springY = useSpring(my, { stiffness: 180, damping: 22, mass: 0.4 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-14, 14])

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
      setDir(1)
      setIndex((i) => (i + 1) % n)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [n, reduceMotion, isInView, intervalMs])

  useEffect(() => {
    const el = videoRef.current
    if (!el || !isVideoShot(current)) return
    if (reduceMotion || !isInView) {
      el.pause()
    } else {
      void el.play().catch(() => {})
    }
  }, [current, reduceMotion, isInView, safeIndex])

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex])

  const carouselItems = useMemo(
    () =>
      shots.map((s) => ({
        image: isVideoShot(s) ? s.poster || s.src : s.src,
        alt: s.label || '',
      })),
    [shots],
  )

  const onPointerMove = (e) => {
    if (reduceMotion || !stageRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mx.set(x)
    my.set(y)
  }

  const onPointerLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const openLightbox = () => {
    setCarouselCaption(current?.label || '')
    setLightboxIndex(safeIndex)
  }

  const closeLightbox = () => setLightboxIndex(null)

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
    <AnimatePresence mode="wait" custom={dir} initial={false}>
      {isVideoShot(current) ? (
        <motion.video
          key={current.src}
          ref={videoRef}
          src={current.src}
          poster={current.poster || undefined}
          className={shotClass}
          muted
          loop
          playsInline
          preload="metadata"
          custom={dir}
          variants={{
            enter: (d) =>
              reduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    rotateY: d > 0 ? 48 : -48,
                    scale: 0.9,
                    filter: 'blur(4px)',
                  },
            center: {
              opacity: 1,
              rotateY: 0,
              scale: 1,
              filter: 'blur(0px)',
            },
            exit: (d) =>
              reduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    rotateY: d > 0 ? -48 : 48,
                    scale: 0.9,
                    filter: 'blur(4px)',
                  },
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: reduceMotion ? 0 : 0.52, ease: [0.22, 1, 0.36, 1] }}
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
      ) : (
        <motion.img
          key={current.src}
          src={current.src}
          alt={current.label || `Screen ${safeIndex + 1}`}
          className={shotClass}
          custom={dir}
          variants={{
            enter: (d) =>
              reduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    rotateY: d > 0 ? 48 : -48,
                    scale: 0.9,
                    filter: 'blur(4px)',
                  },
            center: {
              opacity: 1,
              rotateY: 0,
              scale: 1,
              filter: 'blur(0px)',
            },
            exit: (d) =>
              reduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    rotateY: d > 0 ? -48 : 48,
                    scale: 0.9,
                    filter: 'blur(4px)',
                  },
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: reduceMotion ? 0 : 0.52, ease: [0.22, 1, 0.36, 1] }}
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
      )}
    </AnimatePresence>
  )

  const lightboxNode = (
    <DepthCarouselModal
      open={lightboxIndex !== null}
      items={carouselItems}
      initialIndex={lightboxIndex ?? 0}
      title="Project screens"
      caption={carouselCaption}
      variant={variant}
      onClose={closeLightbox}
      onChange={(i, item) => {
        setIndex(i)
        setCarouselCaption(item?.alt || shots[i]?.label || '')
      }}
    />
  )

  const stageStyle =
    reduceMotion || variant !== 'phone'
      ? undefined
      : { rotateX, rotateY, transformStyle: 'preserve-3d' }

  return (
    <div
      ref={wrapRef}
      className={mediaClass}
      aria-live={reduceMotion ? 'off' : 'polite'}
      aria-label={`Preview, ${safeIndex + 1} of ${n}`}
    >
      <div className="project-preview-stage" ref={stageRef}>
        <div className="project-preview-stage__glow" aria-hidden />
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
          <motion.div
            className="project-preview-stage__tilt"
            style={stageStyle}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            animate={
              reduceMotion || !isInView
                ? { y: 0 }
                : { y: [0, -6, 0] }
            }
            transition={
              reduceMotion || !isInView
                ? { duration: 0 }
                : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            <div className="project-device project-device--iphone16-pro">
              <div className="project-device__bezel">
                <div className="project-device__screen">{slide}</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
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
              onClick={() => {
                setDir(i > safeIndex ? 1 : -1)
                setIndex(i)
              }}
            />
          ))}
        </div>
      ) : null}
      <div className="project-card__media-shine" />
      {lightboxNode}
    </div>
  )
}

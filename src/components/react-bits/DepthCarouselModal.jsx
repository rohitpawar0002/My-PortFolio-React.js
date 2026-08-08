import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import DepthCarousel from './DepthCarousel'
import './DepthCarouselModal.css'

/**
 * @param {'phone' | 'browser'} variant
 */
function useCarouselCardSize(variant = 'phone') {
  const [size, setSize] = useState(
    variant === 'browser'
      ? { width: 840, height: 350 }
      : { width: 270, height: 585 },
  )

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight
      const vw = window.innerWidth

      if (variant === 'browser') {
        // SWM / Nueotel captures are ultra-wide (~1024×430 ≈ 2.4:1), not 16:10
        const maxH = Math.min(vh * 0.48, 400)
        const maxW = Math.min(vw * 0.82, 960)
        const aspect = 2.4
        let width = maxW
        let height = width / aspect
        if (height > maxH) {
          height = maxH
          width = height * aspect
        }
        setSize({
          width: Math.round(width),
          height: Math.round(height),
        })
        return
      }

      // iPhone-ish portrait
      const maxH = Math.min(vh * 0.64, 620)
      const maxW = Math.min(vw * 0.48, 290)
      const aspect = 9 / 19.5
      let height = maxH
      let width = height * aspect
      if (width > maxW) {
        width = maxW
        height = width / aspect
      }
      setSize({
        width: Math.round(width),
        height: Math.round(height),
      })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [variant])

  return size
}

/**
 * Fullscreen preview of project screens using React Bits Depth Carousel.
 * @see https://reactbits.dev/components/depth-carousel
 */
export function DepthCarouselModal({
  open,
  items,
  initialIndex = 0,
  title = 'Screens',
  caption,
  variant = 'phone',
  onClose,
  onChange,
}) {
  const cardSize = useCarouselCardSize(variant)
  const isBrowser = variant === 'browser'

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open || !items?.length) return null

  return createPortal(
    <div
      className={`depth-carousel-modal${isBrowser ? ' depth-carousel-modal--browser' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        className="depth-carousel-modal__backdrop"
        aria-label="Close gallery"
        onClick={onClose}
      />
      <div className="depth-carousel-modal__panel">
        <header className="depth-carousel-modal__header">
          <div>
            <p className="depth-carousel-modal__eyebrow">Gallery</p>
            <h3 className="depth-carousel-modal__title">{title}</h3>
          </div>
          <button
            type="button"
            className="depth-carousel-modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        <div className="depth-carousel-modal__stage">
          <DepthCarousel
            key={`dc-${variant}-${initialIndex}-${items.length}-${cardSize.width}`}
            items={items}
            initialIndex={initialIndex}
            cardWidth={cardSize.width}
            cardHeight={cardSize.height}
            radius={isBrowser ? 14 : 24}
            depth={isBrowser ? 120 : 220}
            spread={isBrowser ? 55 : 95}
            tilt={isBrowser ? 10 : 22}
            visibleCards={isBrowser ? 3 : 4}
            blur={4}
            autoplay={false}
            showControls
            showIndicators
            onChange={onChange}
            className={isBrowser ? 'depth-carousel--browser' : 'depth-carousel--phone'}
          />
        </div>

        {caption ? (
          <p className="depth-carousel-modal__caption">{caption}</p>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}

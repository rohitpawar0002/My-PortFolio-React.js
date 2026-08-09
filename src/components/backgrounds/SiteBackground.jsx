import { useEffect, useState } from 'react'

const LAYERS = [
  {
    id: 'eyes',
    src: '/bg-cyber-eyes.png',
    position: 'center 42%',
    /** Keep eyes subtler than other scroll BGs */
    maxOpacity: 0.38,
  },
  {
    id: 'hands',
    src: '/bg-scroll-1-hands.png',
    position: 'center center',
    maxOpacity: 0.72,
  },
  {
    id: 'hacker',
    src: '/bg-scroll-2-hacker.png',
    position: 'center center',
    maxOpacity: 0.72,
  },
  {
    id: 'plexus',
    src: '/bg-scroll-3-plexus.png',
    position: 'center center',
    maxOpacity: 0.72,
  },
]

/** Smoothstep for softer crossfades between scroll backgrounds. */
function smoothstep(edge0, edge1, x) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

/**
 * Opacity for layer i given scroll progress 0–1 across n layers.
 * Each layer peaks in its segment and crossfades with neighbors.
 */
function layerOpacity(progress, index, count) {
  if (count <= 1) return 1
  const segment = 1 / (count - 1)
  const center = index * segment
  const half = segment * 0.85
  const dist = Math.abs(progress - center)
  if (dist >= half) return 0
  return 1 - smoothstep(0, half, dist)
}

/**
 * Dark-theme site backgrounds that crossfade on page scroll.
 * 1) cyber eyes → 2) hands → 3) hacker → 4) plexus
 */
export function SiteBackground() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      const doc = document.documentElement
      const max = Math.max(1, doc.scrollHeight - window.innerHeight)
      setProgress(Math.min(1, Math.max(0, window.scrollY / max)))
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Preload so crossfades don't flash empty
  useEffect(() => {
    LAYERS.forEach((layer) => {
      const img = new Image()
      img.src = layer.src
    })
  }, [])

  return (
    <div className="site-bg" aria-hidden>
      {LAYERS.map((layer, i) => {
        const opacity =
          layerOpacity(progress, i, LAYERS.length) * (layer.maxOpacity ?? 1)
        return (
          <div
            key={layer.id}
            className={`site-bg__layer site-bg__layer--${layer.id}`}
            style={{
              backgroundImage: `url(${layer.src})`,
              backgroundPosition: layer.position,
              opacity,
            }}
          />
        )
      })}
      <div className="site-bg__glow" />
      <div className="site-bg__vignette" />
      <div className="site-bg__haze" />
    </div>
  )
}

import { useRef } from 'react'
import './SpotlightCard.css'

/**
 * React Bits SpotlightCard — adapted for portfolio project cards.
 * @see https://reactbits.dev/components/spotlight-card
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(56, 189, 248, 0.22)',
}) {
  const divRef = useRef(null)

  const handleMouseMove = (e) => {
    const el = divRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--mouse-x', `${x}px`)
    el.style.setProperty('--mouse-y', `${y}px`)
    el.style.setProperty('--spotlight-color', spotlightColor)
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`.trim()}
    >
      {children}
    </div>
  )
}

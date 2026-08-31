import { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollFloat.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * React Bits ScrollFloat — adapted for portfolio text + media wrappers.
 * @see https://reactbits.dev/text-animations/scroll-float
 */
export default function ScrollFloat({
  children,
  as: Tag = 'h2',
  id,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03,
}) {
  const containerRef = useRef(null)
  const isText = typeof children === 'string'

  const splitText = useMemo(() => {
    if (!isText) return null
    return children.split('').map((char, index) => (
      <span className="char" key={`${char}-${index}`}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }, [children, isText])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const scroller =
      scrollContainerRef?.current ? scrollContainerRef.current : window

    if (isText) {
      const charElements = el.querySelectorAll('.char')
      if (!charElements.length) return

      const tween = gsap.fromTo(
        charElements,
        {
          willChange: 'opacity, transform',
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: '50% 0%',
        },
        {
          duration: animationDuration,
          ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
          },
        },
      )

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    }

    const tween = gsap.fromTo(
      el,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        y: 72,
        scale: 0.94,
        rotate: 2.5,
        transformOrigin: '50% 80%',
      },
      {
        duration: animationDuration,
        ease,
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [
    isText,
    scrollContainerRef,
    animationDuration,
    ease,
    scrollStart,
    scrollEnd,
    stagger,
  ])

  if (isText) {
    return (
      <Tag
        ref={containerRef}
        id={id}
        className={`scroll-float ${containerClassName}`.trim()}
      >
        <span className={`scroll-float-text ${textClassName}`.trim()}>
          {splitText}
        </span>
      </Tag>
    )
  }

  return (
    <Tag
      ref={containerRef}
      id={id}
      className={`scroll-float scroll-float--block ${containerClassName}`.trim()}
    >
      {children}
    </Tag>
  )
}

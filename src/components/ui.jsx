import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

/** Rubrik som avslöjas ord för ord */
export function SplitWords({ text, className, delay = 0, as: Tag = 'span', accentFrom = -1 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion()
  const words = text.split(' ')
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="word-mask">
            <motion.span
              className="word"
              style={accentFrom >= 0 && i >= accentFrom ? { color: 'var(--accent)' } : undefined}
              initial={reduce ? false : { y: '110%' }}
              animate={inView || reduce ? { y: '0%' } : { y: '110%' }}
              transition={{ duration: 0.9, ease, delay: delay + i * 0.06 }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}

/** Sektion/innehåll som glider in vid scroll */
export function Reveal({ children, delay = 0, y = 36, className, as = 'div', ...rest }) {
  const reduce = useReducedMotion()
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

/** Magnetisk knapp/länk */
export function Magnetic({ children, strength = 0.3 }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.span
      ref={ref}
      style={{ x, y, display: 'inline-flex' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="hover"
    >
      {children}
    </motion.span>
  )
}

/** Siffra som räknar upp */
export function Counter({ to, duration = 1.6, suffix = '', prefix = '', format }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(reduce ? to : 0)

  useEffect(() => {
    if (reduce) {
      setVal(to)
      return
    }
    if (!inView) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - p, 4)
      setVal(to * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration, reduce])

  const shown = format ? format(val) : Math.round(val).toLocaleString('sv-SE')
  return (
    <span ref={ref}>
      {prefix}
      {shown}
      {suffix}
    </span>
  )
}

export function SectionHead({ eyebrow, title, lead, children }) {
  return (
    <header className="section-head">
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <h2 className="h2">
        <SplitWords text={title} />
      </h2>
      {lead && (
        <Reveal delay={0.15}>
          <p className="lead" style={{ marginTop: 28 }}>
            {lead}
          </p>
        </Reveal>
      )}
      {children}
    </header>
  )
}

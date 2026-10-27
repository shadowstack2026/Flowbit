import { lazy, Suspense, useEffect, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Magnetic, SplitWords } from './ui.jsx'
import { onAnchorClick } from '../utils.js'

const Character3D = lazy(() => import('./Character3D.jsx'))

function StaticBot() {
  return (
    <svg className="hero__static" viewBox="0 0 260 300" role="img" aria-label="Flowbits robotmaskot">
      <line x1="150" y1="30" x2="150" y2="62" stroke="#12161b" strokeWidth="4" />
      <circle cx="150" cy="26" r="11" fill="#c6ff3d" />
      <rect x="40" y="62" width="180" height="130" rx="46" fill="#e4e8dc" />
      <rect x="62" y="86" width="136" height="80" rx="34" fill="#12161b" />
      <ellipse cx="104" cy="122" rx="11" ry="15" fill="#c6ff3d" />
      <ellipse cx="156" cy="122" rx="11" ry="15" fill="#c6ff3d" />
      <path d="M118 148 Q130 160 142 148" stroke="#c6ff3d" strokeWidth="4" fill="none" strokeLinecap="round" />
      <rect x="62" y="200" width="136" height="76" rx="30" fill="#e4e8dc" />
      <rect x="92" y="222" width="76" height="30" rx="8" fill="#12161b" />
      <rect x="104" y="232" width="12" height="10" fill="#c6ff3d" />
      <rect x="124" y="228" width="12" height="18" fill="#c6ff3d" />
      <rect x="144" y="232" width="12" height="10" fill="#c6ff3d" />
    </svg>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const [use3d, setUse3d] = useState(false)
  const { scrollY } = useScroll()
  const gridY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 120])
  const figY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : -60])

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 860px)').matches
    const fine = window.matchMedia('(pointer: fine)').matches
    if (wide && fine && !reduce) setUse3d(true)
  }, [reduce])

  return (
    <section className="hero" id="top">
      <motion.div className="hero__grid" style={{ y: gridY }} aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Flowbit · Helsingborg
          </motion.span>
          <h1 className="hero__title">
            <SplitWords text="Fler bokningar från kunderna ni redan har" delay={0.4} accentFrom={4} />
          </h1>
          <motion.p
            className="lead hero__lead"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9 }}
          >
            Med <strong>Rekall</strong> hjälper vi er att väcka liv i kundregistret. Vi hör av oss till kunder som en
            gång var nöjda men som glömt att boka igen – i ert namn, och bara med meddelanden ni godkänt.
          </motion.p>
          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.9 }}
          >
            <Magnetic>
              <a href="#kontakt" className="btn btn--primary" onClick={(e) => onAnchorClick(e, 'kontakt')}>
                Boka ett kostnadsfritt samtal <ArrowRight size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#sa-funkar-det" className="btn btn--ghost" onClick={(e) => onAnchorClick(e, 'sa-funkar-det')}>
                Så funkar det
              </a>
            </Magnetic>
          </motion.div>
          <motion.ul
            className="hero__facts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 1 }}
          >
            <li>Ingen startavgift</li>
            <li>Betala per bokning</li>
            <li>Ni godkänner allt först</li>
          </motion.ul>
        </div>

        <motion.div
          className="hero__figure"
          style={{ y: figY }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero__ring" aria-hidden="true" />
          {use3d ? (
            <Suspense fallback={<div className="hero__loading" aria-hidden="true" />}>
              <Character3D />
            </Suspense>
          ) : (
            <StaticBot />
          )}
          <span className="hero__tag" aria-hidden="true">
            Hej! Jag är Flow 👋
          </span>
        </motion.div>
      </div>
    </section>
  )
}

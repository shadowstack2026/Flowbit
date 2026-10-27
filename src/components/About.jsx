import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Users, Target, ShieldCheck } from 'lucide-react'
import { Reveal, SectionHead } from './ui.jsx'
import { LogoMark } from './Logo.jsx'

const values = [
  { icon: Users, title: 'Tillsammans', text: 'Vi jobbar nära er, från första samtalet till resultatet.' },
  { icon: Target, title: 'Resultat först', text: 'Ni betalar för det som ger effekt, inte för timmar.' },
  { icon: ShieldCheck, title: 'Ärligt och tryggt', text: 'GDPR, tydliga avtal och inga dolda avgifter.' },
]

export default function About() {
  const reduce = useReducedMotion()
  const wrap = useRef(null)
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start end', 'end start'] })
  const py = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 40, reduce ? 0 : -40])

  const onMove = (e) => {
    if (reduce) return
    const r = wrap.current.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <section className="section section--line" id="om-oss">
      <div className="container">
        <div className="about">
          <div className="about__photo-col">
            <motion.div
              ref={wrap}
              className="about__photo-wrap"
              style={{ y: py, rotateX: rx, rotateY: ry, transformPerspective: 900 }}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              data-cursor="hover"
            >
              <div className="about__frame" aria-hidden="true" />
              <div className="about__photo about__logo" role="img" aria-label="Flowbit-logotyp">
                <LogoMark size={160} />
                <span className="about__wordmark">
                  Flowbit<span className="nav__logo-dot" />
                </span>
              </div>
            </motion.div>
          </div>

          <div className="about__text">
            <SectionHead eyebrow="Om oss" title="Teknik som jobbar för er, inte tvärtom" />
            <Reveal delay={0.1}>
              <p className="about__lede">
                Flowbit är ett IT-företag från Helsingborg. Vi bygger system som hjälper lokala företag att växa med
                teknik som tidigare bara stora kedjor haft råd med.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                Vi är ingenjörer i grunden och drivs av att lösa riktiga problem. Vi driver själva e-handel och vet hur
                det är att ha fullt upp med kärnverksamheten. Därför bygger vi lösningar som sköter sig själva, så att
                ni kan fokusera på det ni är bäst på.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Vi tror på nära samarbeten. Vi sätter oss ner tillsammans med er, går igenom er verksamhet och bygger det
                som faktiskt gör skillnad. Litet, lokalt och personligt, med teknik i världsklass.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="values">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08} className="value">
              <v.icon size={26} strokeWidth={1.5} />
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

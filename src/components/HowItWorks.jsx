import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ClipboardList, MessageSquareText, CalendarCheck, LineChart } from 'lucide-react'
import { Reveal, SectionHead } from './ui.jsx'

const steps = [
  {
    icon: ClipboardList,
    title: 'Vi går igenom er kundlista tillsammans',
    text: 'Vi tittar på vilka kunder som inte varit hos er på ett tag och väljer ut vilka vi ska höra av oss till.',
  },
  {
    icon: MessageSquareText,
    title: 'Systemet kontaktar era gamla kunder',
    text: 'Personliga SMS och mejl skickas i ert namn. Ni godkänner varje meddelande innan något går iväg.',
  },
  {
    icon: CalendarCheck,
    title: 'Kunderna svarar och bokas in',
    text: 'Kunden svarar eller väljer en tid direkt. Frågor besvaras, och bokningen landar hos er.',
  },
  {
    icon: LineChart,
    title: 'Ni får en tydlig rapport',
    text: 'Ni ser exakt vilka bokningar som kommit in och vad de lett till i ny omsättning.',
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section className="section section--line" id="sa-funkar-det">
      <div className="container">
        <SectionHead
          eyebrow="Så funkar det"
          title="Fyra steg från glömd kund till ny bokning"
          lead="Vi sköter det tunga arbetet och ni behåller kontrollen. Så här går det till, steg för steg."
        />
        <div className="steps" ref={ref}>
          <div className="steps__rail" aria-hidden="true">
            <motion.div className="steps__rail-fill" style={{ scaleY: progress }} />
          </div>
          {steps.map((s, i) => (
            <Reveal key={s.title} className="step" delay={0.05}>
              <div className="step__num">0{i + 1}</div>
              <div className="step__card">
                <div className="step__icon">
                  <s.icon size={24} strokeWidth={1.6} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

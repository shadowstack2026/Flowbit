import { Globe, Workflow, Sparkles, Boxes, ArrowRight } from 'lucide-react'
import { Magnetic, Reveal, SectionHead } from './ui.jsx'
import { onAnchorClick } from '../utils.js'

const services = [
  { icon: Globe, title: 'Hemsidor', text: 'Snabba, snygga sidor som ger besökare ett bra första intryck och får dem att höra av sig.' },
  { icon: Workflow, title: 'Automation', text: 'Vi tar bort de tråkiga, upprepande uppgifterna så att ni får tid över till det viktiga.' },
  { icon: Sparkles, title: 'AI-lösningar', text: 'Praktisk AI som faktiskt sparar tid i vardagen, utan krångel eller fluff.' },
  { icon: Boxes, title: 'Skräddarsydda system', text: 'Behöver ni något som inte finns på hyllan? Vi bygger det som passar just er verksamhet.' },
]

export default function Services() {
  return (
    <section className="section section--line" id="tjanster">
      <div className="container">
        <SectionHead
          eyebrow="Andra IT-tjänster"
          title="Har ni en idé eller ett problem? Vi löser det tillsammans."
          lead="Rekall är vår första produkt, men Flowbit hjälper till med mycket mer när det gäller teknik som utvecklar ert företag."
        />
        <div className="services">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 0.08} className="service">
              <span className="service__idx">0{i + 1}</span>
              <s.icon size={28} strokeWidth={1.4} />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="services__cta" delay={0.1}>
          <Magnetic>
            <a href="#kontakt" className="btn btn--ghost" onClick={(e) => onAnchorClick(e, 'kontakt')}>
              Berätta vad ni behöver <ArrowRight size={18} />
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}

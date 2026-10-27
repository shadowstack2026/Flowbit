import { MessageSquare, Mail, Bot, Link2, BarChart3, ShieldCheck, BadgeCheck } from 'lucide-react'
import { Reveal, SectionHead } from './ui.jsx'

const features = [
  { icon: MessageSquare, title: 'Automatiska SMS-utskick', text: 'Vänliga, personliga SMS som når kunden direkt i mobilen.' },
  { icon: Mail, title: 'Mejlkampanjer', text: 'Snygga mejl i ert namn för de kunder som föredrar det.' },
  { icon: Bot, title: 'Smarta svar', text: 'Systemet hanterar kundernas frågor och bokningar, så ni slipper.' },
  { icon: Link2, title: 'Personliga bokningslänkar', text: 'Varje kund får en egen länk, och vi ser vad som leder till bokning.' },
  { icon: BarChart3, title: 'Rapporter', text: 'Tydlig överblick över bokningar och omsättning, utan krångel.' },
  { icon: ShieldCheck, title: 'GDPR-säker hantering', text: 'Vi tecknar personuppgiftsbiträdesavtal och hanterar uppgifterna rätt.' },
  { icon: BadgeCheck, title: 'Ni godkänner först', text: 'Inget skickas innan ni har godkänt alla meddelanden.' },
]

export default function System() {
  return (
    <section className="section section--line">
      <div className="container">
        <SectionHead
          eyebrow="Vårt system"
          title="Allt ni behöver, utan att göra jobbet själva"
          lead="Rekall är byggt för små företag. Det gör det tunga så att ni kan fokusera på kunderna som kommer."
        />
        <div className="features">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 0.07} className={`feature ${i === 0 ? 'feature--wide' : ''}`}>
              <span className="feature__glow" aria-hidden="true" />
              <f.icon size={26} strokeWidth={1.5} className="feature__icon" />
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

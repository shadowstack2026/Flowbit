import { Clock, Inbox, Timer, ShieldCheck, HandCoins } from 'lucide-react'
import { Reveal, SectionHead } from './ui.jsx'

const reasons = [
  {
    icon: Clock,
    title: 'Det tar tid från det ni är bäst på',
    text: 'Ni vill jobba med bilar, hår eller patienter – inte sitta och skriva meddelanden till gamla kunder.',
  },
  {
    icon: Inbox,
    title: 'Det svåra är alla svar',
    text: 'Utskicket är den enkla delen. Det som tar tid är att svara på frågor och boka in alla som hör av sig.',
  },
  {
    icon: Timer,
    title: 'Timing och formulering avgör',
    text: 'Samma erbjudande kan ge många bokningar eller inga alls, beroende på när och hur det sägs.',
  },
  {
    icon: ShieldCheck,
    title: 'Regler som ska följas',
    text: 'GDPR och marknadsföringsreglerna är lätta att trampa fel på. Vi tar hand om det tillsammans med er.',
  },
  {
    icon: HandCoins,
    title: 'Ni betalar bara för resultat',
    text: 'Med oss finns ingen startavgift. Kommer det inga bokningar kostar det ingenting.',
  },
]

export default function WhyUs() {
  return (
    <section className="section section--line">
      <div className="container">
        <SectionHead
          eyebrow="Varför inte göra det själv?"
          title="Ni kan – men vi tar det tillsammans"
          lead="Många försöker först på egen hand, och det är klokt. Men det finns en anledning till att det sällan blir av. Så här ser vi på det."
        />
        <div className="why">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 0.08} className="why__item">
              <r.icon size={26} strokeWidth={1.5} />
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

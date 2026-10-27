import { Reveal, SectionHead } from './ui.jsx'

const slots = [
  { label: 'Återkomna kunder', hint: 'Antal kunder som bokat igen' },
  { label: 'Bokningar', hint: 'Antal bokningar från pilot' },
  { label: 'Ny omsättning', hint: 'Intäkter från återvunna kunder' },
]

export default function Results() {
  return (
    <section className="section section--line">
      <div className="container">
        <SectionHead
          eyebrow="Resultat"
          title="Här visar vi vad våra pilotkunder uppnår"
          lead="Vi redovisar bara riktiga siffror, och först när de finns. Tills dess ligger platshållarna här."
        />
        <div className="results">
          {slots.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="result">
              <span className="result__label">{s.label}</span>
              <span className="result__num placeholder">[FYLL I]</span>
              <span className="result__hint">{s.hint}</span>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <blockquote className="result-quote">
            <span className="placeholder">[FYLL I: citat från en pilotkund, först när ni har ett riktigt]</span>
            <cite>[FYLL I: namn, företag]</cite>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}

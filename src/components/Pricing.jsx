import { Check, ArrowRight } from 'lucide-react'
import { Magnetic, Reveal, SplitWords } from './ui.jsx'
import { onAnchorClick } from '../utils.js'

const points = ['Ingen startavgift', 'Ni betalar bara för bokningar som kommer in', 'Inga bokningar, ingen kostnad', 'Ni godkänner alla meddelanden']

export default function Pricing() {
  return (
    <section className="section section--line" id="pris">
      <div className="container">
        <Reveal className="pricing">
          <div className="pricing__glow" aria-hidden="true" />
          <span className="eyebrow">Pilotkunder i Helsingborg</span>
          <h2 className="pricing__title">
            <SplitWords text="Inga bokningar, ingen kostnad." accentFrom={2} />
          </h2>
          <p className="lead">
            Vi tar just nu in ett fåtal pilotkunder i Helsingborg. Ingen startavgift – ni betalar bara för bokningar
            som kommer in. Inga bokningar, ingen kostnad.
          </p>
          <ul className="pricing__list">
            {points.map((p) => (
              <li key={p}>
                <Check size={18} /> {p}
              </li>
            ))}
          </ul>
          <Magnetic>
            <a href="#kontakt" className="btn btn--primary" onClick={(e) => onAnchorClick(e, 'kontakt')}>
              Bli pilotkund <ArrowRight size={18} />
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}

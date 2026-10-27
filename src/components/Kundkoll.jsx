import { useState } from 'react'
import { FileSearch, FileDown, LifeBuoy } from 'lucide-react'
import { Counter, Magnetic, Reveal, SectionHead } from './ui.jsx'
import { onAnchorClick } from '../utils.js'

const RATE = 0.05

const kr = (n) => Math.round(n).toLocaleString('sv-SE') + ' kr'

export default function Kundkoll() {
  const [customers, setCustomers] = useState(400)
  const [value, setValue] = useState(900)

  const returning = Math.round(customers * RATE)
  const revenue = customers * RATE * value

  const clamp = (v, max) => Math.max(0, Math.min(max, Number.isFinite(v) ? v : 0))

  return (
    <section className="section section--line">
      <div className="container">
        <SectionHead
          eyebrow="Kundkoll"
          title="Ta reda på vad era glömda kunder är värda"
          lead="Vi har ett system som granskar er kunddata och räknar ut hur många kunder som inte kommit tillbaka – och vad de är värda för er."
        />

        <div className="kk">
          <div className="kk__help">
            {[
              { icon: FileSearch, t: 'Vi granskar åt er', d: 'Ni ger oss kunddatan. Vi räknar ut hur många som inte kommit tillbaka och vad de är värda.' },
              { icon: FileDown, t: 'Vet ni inte hur ni tar ut listan?', d: 'Då hjälper vi er att exportera den från ert system, steg för steg.' },
              { icon: LifeBuoy, t: 'Vet ni inte alls?', d: 'Skicka bara det ni har. Vi löser det tillsammans.' },
            ].map((x, i) => (
              <Reveal key={x.t} delay={i * 0.08} className="kk__help-item">
                <x.icon size={22} strokeWidth={1.6} />
                <div>
                  <h3>{x.t}</h3>
                  <p>{x.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="calc" delay={0.1}>
            <div className="calc__head">
              <span>Räkna själv</span>
              <span className="calc__badge">Uppskattning</span>
            </div>

            <div className="calc__field">
              <label htmlFor="kunder">Antal gamla kunder som slutat komma</label>
              <div className="calc__row">
                <input
                  id="kunder"
                  type="range"
                  min="50"
                  max="5000"
                  step="50"
                  value={customers}
                  onChange={(e) => setCustomers(Number(e.target.value))}
                />
                <input
                  type="number"
                  inputMode="numeric"
                  aria-label="Antal gamla kunder"
                  value={customers}
                  onChange={(e) => setCustomers(clamp(Number(e.target.value), 100000))}
                />
              </div>
            </div>

            <div className="calc__field">
              <label htmlFor="snitt">Snittvärde per besök (kr)</label>
              <div className="calc__row">
                <input
                  id="snitt"
                  type="range"
                  min="100"
                  max="10000"
                  step="50"
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                />
                <input
                  type="number"
                  inputMode="numeric"
                  aria-label="Snittvärde per besök i kronor"
                  value={value}
                  onChange={(e) => setValue(clamp(Number(e.target.value), 1000000))}
                />
              </div>
            </div>

            <div className="calc__result" aria-live="polite">
              <span className="calc__result-label">Om 5 % av kunderna kommer tillbaka</span>
              <strong className="calc__result-num">
                <Counter key={Math.round(revenue)} to={revenue} duration={0.8} suffix=" kr" />
              </strong>
              <span className="calc__result-sub">
                ≈ {returning.toLocaleString('sv-SE')} återkommande kunder · potentiell omsättning
              </span>
            </div>

            <p className="calc__note">
              Detta är en uppskattning och inte ett löfte. Verkligt utfall beror på er bransch, era kunder och hur
              länge sedan de var hos er. 5 % är ett räkneexempel, inte en garanti.
            </p>

            <Magnetic>
              <a href="#kontakt" className="btn btn--primary" onClick={(e) => onAnchorClick(e, 'kontakt')}>
                Låt oss räkna på era riktiga siffror
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

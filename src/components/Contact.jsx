import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2, Send, Check } from 'lucide-react'
import { Reveal, SectionHead } from './ui.jsx'

const TYPES = [
  'Rekall – få tillbaka kunder',
  'Boka ett möte',
  'Samarbete',
  'Annan IT-hjälp',
  'Övrigt',
]

const FALLBACK_EMAIL = 'kontakt@flowbit.se'

const empty = { name: '', company: '', email: '', phone: '', type: TYPES[0], message: '', website: '' }

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Skriv ditt namn.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Skriv en giltig e-postadress.'
  if (v.phone.trim() && !/^[+\d][\d\s\-()]{5,}$/.test(v.phone.trim())) e.phone = 'Kontrollera telefonnumret.'
  if (v.message.trim().length < 5) e.message = 'Berätta kort vad du undrar över.'
  return e
}

export default function Contact() {
  const [v, setV] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const [errMsg, setErrMsg] = useState('')

  const set = (k) => (e) => {
    setV((s) => ({ ...s, [k]: e.target.value }))
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }))
  }

  const mailto = () => {
    const body = `Namn: ${v.name}\nFöretag: ${v.company}\nTelefon: ${v.phone}\nTyp: ${v.type}\n\n${v.message}`
    return `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent('Förfrågan från flowbit-sidan')}&body=${encodeURIComponent(body)}`
  }

  const submit = async (e) => {
    e.preventDefault()
    const found = validate(v)
    setErrors(found)
    if (Object.keys(found).length) return
    setStatus('loading')
    setErrMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(v),
      })
      if (!res.ok) {
        let msg = ''
        try {
          msg = (await res.json()).error
        } catch {
          /* lokalt saknas /api helt */
        }
        if (res.status === 404) {
          msg = 'Formuläret kräver servern på Vercel (RESEND_API_KEY saknas eller /api är inte igång lokalt).'
        }
        throw new Error(msg || 'Det gick inte att skicka just nu.')
      }
      setStatus('done')
      setV(empty)
    } catch (err) {
      setErrMsg(err.message || 'Det gick inte att skicka just nu.')
      setStatus('error')
    }
  }

  const field = (k, label, props = {}) => (
    <div className={`field ${errors[k] ? 'field--err' : ''}`}>
      <label htmlFor={`f-${k}`}>{label}</label>
      <input id={`f-${k}`} value={v[k]} onChange={set(k)} aria-invalid={!!errors[k]} {...props} />
      {errors[k] && <span className="field__err" role="alert">{errors[k]}</span>}
    </div>
  )

  return (
    <section className="section section--line" id="kontakt">
      <div className="container contact">
        <div className="contact__intro">
          <SectionHead
            eyebrow="Kontakt"
            title="Låt oss prata"
            lead="Berätta kort om er verksamhet så hör vi av oss. Samtalet är kostnadsfritt och utan förpliktelser."
          />
        </div>

        <Reveal className="contact__panel" delay={0.1}>
          <AnimatePresence mode="wait">
            {status === 'done' ? (
              <motion.div
                key="done"
                className="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                role="status"
              >
                <svg viewBox="0 0 80 80" className="done__check" aria-hidden="true">
                  <motion.circle cx="40" cy="40" r="34" fill="none" stroke="var(--accent)" strokeWidth="3"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7 }} />
                  <motion.path d="M25 41l10 10 20-22" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6 }} />
                </svg>
                <h3>Tack! Vi hör av oss snart.</h3>
                <p>Ditt meddelande är skickat. Vi återkommer så fort vi kan, oftast inom en arbetsdag.</p>
                <button className="btn btn--ghost btn--sm" onClick={() => setStatus('idle')}>
                  Skicka ett till
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}>
                <div className="form-grid">
                  {field('name', 'Namn', { autoComplete: 'name' })}
                  {field('company', 'Företag', { autoComplete: 'organization' })}
                  {field('email', 'E-post', { type: 'email', autoComplete: 'email' })}
                  {field('phone', 'Telefon (valfritt)', { type: 'tel', autoComplete: 'tel' })}
                </div>
                <div className="field">
                  <label htmlFor="f-type">Typ av förfrågan</label>
                  <select id="f-type" value={v.type} onChange={set('type')}>
                    {TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className={`field ${errors.message ? 'field--err' : ''}`}>
                  <label htmlFor="f-message">Meddelande</label>
                  <textarea id="f-message" rows="5" value={v.message} onChange={set('message')} aria-invalid={!!errors.message} />
                  {errors.message && <span className="field__err" role="alert">{errors.message}</span>}
                </div>
                {/* honeypot mot spam */}
                <input type="text" tabIndex="-1" autoComplete="off" value={v.website} onChange={set('website')} className="hp" aria-hidden="true" />

                {status === 'error' && (
                  <div className="form-error" role="alert">
                    <p>{errMsg}</p>
                    <p>
                      Du kan istället <a href={mailto()}>skicka ett mejl direkt</a>.
                    </p>
                  </div>
                )}

                <button type="submit" className="btn btn--primary btn--block" disabled={status === 'loading'}>
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={18} className="spin" /> Skickar…
                    </>
                  ) : (
                    <>
                      Skicka förfrågan <Send size={17} />
                    </>
                  )}
                </button>
                <p className="form-note">
                  <Check size={14} /> Vi använder dina uppgifter bara för att svara dig.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}

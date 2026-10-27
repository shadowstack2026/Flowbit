import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Magnetic } from './ui.jsx'
import { onAnchorClick, scrollToId } from '../utils.js'
import Logo from './Logo.jsx'

const links = [
  { id: 'rekall', label: 'Rekall' },
  { id: 'sa-funkar-det', label: 'Så funkar det' },
  { id: 'om-oss', label: 'Om oss' },
  { id: 'tjanster', label: 'Tjänster' },
  { id: 'kontakt', label: 'Kontakt' },
]

export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  // stäng menyn först så att sidan kan scrolla, scrolla sedan till sektionen
  const go = (e, id) => {
    if (!open) return onAnchorClick(e, id)
    e.preventDefault()
    setOpen(false)
    setTimeout(() => {
      scrollToId(id)
      history.replaceState(null, '', `#${id}`)
    }, 80)
  }

  return (
    <motion.header
      className={`nav ${solid || open ? 'nav--solid' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <div className="container nav__inner">
        <a href="#top" className="nav__logo" onClick={(e) => { e.preventDefault(); window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' }) }} aria-label="Flowbit – till toppen">
          <Logo />
        </a>

        <nav className="nav__links" aria-label="Huvudmeny">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={(e) => go(e, l.id)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__cta">
          <Magnetic strength={0.25}>
            <a href="#kontakt" className="btn btn--primary btn--sm" onClick={(e) => go(e, 'kontakt')}>
              Boka ett möte
            </a>
          </Magnetic>
        </div>

        <button
          className="nav__burger"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Stäng meny' : 'Öppna meny'}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__sheet"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => go(e, l.id)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i + 0.05 }}
              >
                {l.label}
              </motion.a>
            ))}
            <a href="#kontakt" className="btn btn--primary" onClick={(e) => go(e, 'kontakt')}>
              Boka ett möte
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

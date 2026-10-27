import { onAnchorClick } from '../utils.js'

const links = [
  { id: 'rekall', label: 'Rekall' },
  { id: 'sa-funkar-det', label: 'Så funkar det' },
  { id: 'om-oss', label: 'Om oss' },
  { id: 'tjanster', label: 'Tjänster' },
  { id: 'kontakt', label: 'Kontakt' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__big" aria-hidden="true">Flowbit</div>
        <div className="footer__grid">
          <div>
            <h4>Flowbit</h4>
            <p>Helsingborg</p>
            {/* TODO byt till riktigt nummer */}
            <p>
              <a href="tel:+46700000000">070-000 00 00</a>
            </p>
            <p>
              <a href="mailto:kontakt@flowbit.se">kontakt@flowbit.se</a>
            </p>
          </div>
          <nav aria-label="Sidfot">
            <h4>Länkar</h4>
            {links.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={(e) => onAnchorClick(e, l.id)}>
                {l.label}
              </a>
            ))}
          </nav>
          <div>
            <h4>Rekall</h4>
            <p>Få gamla kunder att boka igen. Vi tar just nu in pilotkunder i Helsingborg.</p>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 Flowbit</span>
          <span>Byggt i Helsingborg</span>
        </div>
      </div>
    </footer>
  )
}

const items = ['Däckfirmor', 'Verkstäder', 'Frisörer', 'Kliniker', 'Webbutiker']

export default function Marquee() {
  const row = [...items, ...items, ...items, ...items]
  return (
    <div className="marquee" aria-label="Branscher vi hjälper: Däckfirmor, verkstäder, frisörer, kliniker, webbutiker">
      <div className="marquee__track" aria-hidden="true">
        {[0, 1].map((k) => (
          <div className="marquee__group" key={k}>
            {row.map((t, i) => (
              <span key={i} className="marquee__item">
                {t}
                <i className="marquee__dot" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

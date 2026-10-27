import { Reveal, SectionHead } from './ui.jsx'

export default function Problem() {
  return (
    <section className="section section--line" id="rekall">
      <div className="container problem">
        <SectionHead eyebrow="Problemet" title="Era gamla kunder har inte valt bort er. De har bara glömt." />
        <div className="problem__body">
          <Reveal>
            <p className="problem__big">
              Ni har hundratals kunder som en gång var nöjda – men som slutat komma.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              Ingen har sagt upp sig. Livet har bara kommit emellan, och ingen har påmint dem om att det är dags igen.
              Varje sådan kund är pengar som redan finns i ert register – men som ingen hör av sig till, eftersom
              vardagen går före.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="problem__card">
              <span className="problem__label">Rekall</span>
              <p>
                Vi bygger ett system som tillsammans med er hör av sig till just de kunderna – vänligt, personligt och
                i rätt tid – så att de hittar tillbaka till er.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

import { useEffect } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Problem from './components/Problem.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Kundkoll from './components/Kundkoll.jsx'
import WhyUs from './components/WhyUs.jsx'
import System from './components/System.jsx'
// import Results from './components/Results.jsx' // aktiveras när riktiga case finns
import Pricing from './components/Pricing.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Cursor from './components/Cursor.jsx'

export default function App() {
  const reduce = useReducedMotion()

  useEffect(() => {
    // ingen Lenis på pekskärmar eller vid reducerad rörelse
    if (reduce || window.matchMedia('(pointer: coarse)').matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    let raf
    const loop = (t) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    window.__lenis = lenis
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      window.__lenis = null
    }
  }, [reduce])

  return (
    <>
      <a href="#innehall" className="skip-link">
        Hoppa till innehållet
      </a>
      <Cursor />
      <Navbar />
      <main id="innehall">
        <Hero />
        <Marquee />
        <Problem />
        <HowItWorks />
        <Kundkoll />
        <WhyUs />
        <System />
        {/* Resultat-sektionen är dold tills vi har riktiga case att visa.
            Aktivera genom att ta bort kommentaren här och importen ovan. */}
        {/* <Results /> */}
        <Pricing />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

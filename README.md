# Flowbit – hemsida

Vite + React + JavaScript. Svenska. Framer Motion, Lenis, react-three-fiber, lucide-react, vanlig CSS med variabler.

## Kör projektet

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # produktionsbygge i dist/
```

> Kontaktformuläret anropar `/api/contact`, som är en Vercel-funktion. Med `npm run dev` finns den inte,
> så formuläret visar då ett tydligt felmeddelande och en `mailto:`-reserv. Vill du testa hela flödet lokalt:
> `npx vercel dev` (efter att du lagt in miljövariablerna nedan).


## Resend (kontaktformuläret)

1. Skapa konto på https://resend.com och en API-nyckel (*API Keys*).
2. Sätt miljövariabler (lokalt i `.env.local`, på Vercel under *Settings → Environment Variables*):

| Variabel | Beskrivning |
| --- | --- |
| `RESEND_API_KEY` | Din Resend-nyckel (`re_...`) |
| `CONTACT_TO` | Mottagare, t.ex. `kontakt@flowbit.se` (flera: kommaseparerade) |
| `CONTACT_FROM` | *(valfri)* Avsändare, t.ex. `Flowbit <kontakt@dindomän.se>`. Kräver verifierad domän i Resend. Utan den används `onboarding@resend.dev`, som bara kan skicka till din egen Resend-adress. |

3. `FALLBACK_EMAIL` i `src/components/Contact.jsx` är `kontakt@flowbit.se` (används i `mailto:`-reserven).

## Deploya till Vercel

1. Lägg projektet på GitHub och importera det på https://vercel.com/new (Vite identifieras automatiskt).
2. Lägg in miljövariablerna ovan och deploya.
3. Mappen `api/` blir automatiskt serverless-funktioner, så `/api/contact` fungerar utan extra konfiguration.

Alternativt via CLI: `npx vercel` och sedan `npx vercel --prod`.

## Struktur

```
api/contact.js          Vercel-funktion (Resend)
src/components/         Navbar, Hero, Character3D, Marquee, Problem, HowItWorks, Kundkoll,
                        WhyUs, System, Results, Pricing, About, Services, Contact, Footer, Cursor
src/styles/global.css   Färgvariabler (:root), typografi, knappar
src/styles/sections.css Sektionernas stilar
```

Färger ändrar du i `:root` i `src/styles/global.css` (`--accent` är limegrönt, byt till t.ex. `#FF6B35` för orange;
3D-figuren har samma färg som konstant `ACCENT` överst i `Character3D.jsx`).

## Prestanda och tillgänglighet

- 3D-scenen laddas lazy och bara på bredare skärmar med mus. Mobil och surfplatta får en statisk SVG-figur.
- `prefers-reduced-motion` stänger av mjuk scroll, custom cursor, parallax och ord-för-ord-animationer samt använder statisk figur.

## Att uppdatera senare

- `src/components/Footer.jsx` – telefonnumret `070-000 00 00` är en platshållare (markerad med TODO)
- `src/App.jsx` – Resultat-sektionen är dold. Fyll i `Results.jsx` och aktivera den när riktiga case finns

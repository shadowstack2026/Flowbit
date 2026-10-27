import { Resend } from 'resend'

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Metoden stöds inte.' })
  }

  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env
  if (!RESEND_API_KEY || !CONTACT_TO) {
    return res.status(500).json({
      error: 'Formuläret är inte konfigurerat än (RESEND_API_KEY eller CONTACT_TO saknas).',
    })
  }

  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  if (b.website) return res.status(200).json({ ok: true }) // honeypot

  const name = String(b.name || '').trim()
  const email = String(b.email || '').trim()
  const message = String(b.message || '').trim()
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || message.length < 5) {
    return res.status(400).json({ error: 'Kontrollera fälten och försök igen.' })
  }
  if (name.length > 200 || message.length > 5000) {
    return res.status(400).json({ error: 'Texten är för lång.' })
  }

  const resend = new Resend(RESEND_API_KEY)
  try {
    const { error } = await resend.emails.send({
      from: CONTACT_FROM || 'Flowbit <onboarding@resend.dev>',
      to: CONTACT_TO.split(',').map((s) => s.trim()),
      replyTo: email,
      subject: `Ny förfrågan: ${String(b.type || 'Övrigt').slice(0, 80)} – ${name}`,
      html: `
        <h2>Ny förfrågan från flowbit-sidan</h2>
        <p><strong>Namn:</strong> ${esc(name)}</p>
        <p><strong>Företag:</strong> ${esc(b.company)}</p>
        <p><strong>E-post:</strong> ${esc(email)}</p>
        <p><strong>Telefon:</strong> ${esc(b.phone)}</p>
        <p><strong>Typ:</strong> ${esc(b.type)}</p>
        <p><strong>Meddelande:</strong></p>
        <p>${esc(message).replace(/\n/g, '<br>')}</p>`,
    })
    if (error) throw new Error(error.message)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error(err)
    return res.status(502).json({ error: 'Det gick inte att skicka just nu.' })
  }
}

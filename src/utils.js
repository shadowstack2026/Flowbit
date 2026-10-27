export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -70, duration: 1.3 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export function onAnchorClick(e, id, after) {
  e.preventDefault()
  scrollToId(id)
  history.replaceState(null, '', `#${id}`)
  if (after) after()
}

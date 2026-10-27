import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 })

  useEffect(() => {
    const ok =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!ok) return
    setEnabled(true)
    document.body.classList.add('has-cursor')
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target
      setHover(!!(t.closest && t.closest('a, button, select, input, textarea, [data-cursor="hover"]')))
    }
    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      document.body.classList.remove('has-cursor')
    }
  }, [x, y])

  if (!enabled) return null
  return (
    <motion.div
      className="cursor"
      style={{ x: sx, y: sy }}
      animate={{ scale: hover ? 2.6 : 1, opacity: hover ? 0.9 : 1 }}
      transition={{ duration: 0.25 }}
      aria-hidden="true"
    />
  )
}

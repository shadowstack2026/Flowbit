export function LogoMark({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="logo__mark">
      <rect width="32" height="32" rx="8" fill="#0b0d10" stroke="rgba(236,240,232,0.24)" />
      <path d="M9 22V10h12M9 16h9" stroke="#c6ff3d" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export default function Logo({ size = 32 }) {
  return (
    <span className="logo">
      <LogoMark size={size} />
      <span className="logo__word">
        Flowbit<span className="nav__logo-dot" />
      </span>
    </span>
  )
}

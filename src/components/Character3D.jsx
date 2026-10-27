import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

const SHELL = '#e4e8dc'
const SHELL_SHADE = '#c9cfc0'
const DARK = '#12161b'
const ACCENT = '#c6ff3d'

const damp = THREE.MathUtils.damp

function Robot({ pointer, wave }) {
  const root = useRef()
  const body = useRef()
  const head = useRef()
  const eyes = useRef()
  const eyeL = useRef()
  const eyeR = useRef()
  const armR = useRef()
  const armL = useRef()
  const antenna = useRef()
  const glow = useRef()
  const blink = useRef({ next: 2.5, until: 0 })

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    const { x: px, y: py } = pointer.current

    // andas och gungar
    root.current.position.y = Math.sin(t * 1.3) * 0.07
    root.current.rotation.z = Math.sin(t * 0.9) * 0.02
    root.current.rotation.y = damp(root.current.rotation.y, px * 0.22, 4, dt)
    body.current.scale.y = 1 + Math.sin(t * 1.9) * 0.014

    // huvud följer musen
    head.current.rotation.y = damp(head.current.rotation.y, px * 0.55, 6, dt)
    head.current.rotation.x = damp(head.current.rotation.x, -py * 0.32, 6, dt)

    // ögonen tittar lite extra
    eyes.current.position.x = damp(eyes.current.position.x, px * 0.07, 10, dt)
    eyes.current.position.y = damp(eyes.current.position.y, 0.05 + py * 0.04, 10, dt)

    // blinkning
    const b = blink.current
    if (t > b.next) {
      b.until = t + 0.14
      b.next = t + 2.2 + Math.random() * 3.2
    }
    const closed = t < b.until
    const target = closed ? 0.08 : 1
    eyeL.current.scale.y = damp(eyeL.current.scale.y, target * 1.3, 40, dt)
    eyeR.current.scale.y = damp(eyeR.current.scale.y, target * 1.3, 40, dt)

    // vink
    const waving = t < wave.current.until
    const strong = wave.current.strong
    const tR = waving ? 2.55 + Math.sin(t * 11) * (strong ? 0.42 : 0.3) : 0.14 + Math.sin(t * 1.3) * 0.03
    armR.current.rotation.z = damp(armR.current.rotation.z, tR, waving ? 12 : 5, dt)
    armL.current.rotation.z = damp(armL.current.rotation.z, -0.14 - Math.sin(t * 1.3 + 1) * 0.03, 5, dt)
    if (waving && strong) head.current.rotation.z = Math.sin(t * 9) * 0.07
    else head.current.rotation.z = damp(head.current.rotation.z, 0, 8, dt)

    // antenn
    antenna.current.rotation.z = Math.sin(t * 2.2) * 0.08
    glow.current.intensity = 1.4 + Math.sin(t * 3) * 0.5
  })

  const shell = <meshStandardMaterial color={SHELL} roughness={0.38} metalness={0.15} />
  const shade = <meshStandardMaterial color={SHELL_SHADE} roughness={0.5} metalness={0.2} />
  const dark = <meshStandardMaterial color={DARK} roughness={0.25} metalness={0.5} />
  const lit = <meshBasicMaterial color={ACCENT} toneMapped={false} />

  return (
    <group ref={root}>
      {/* kropp */}
      <group ref={body}>
        <RoundedBox args={[1.35, 1.25, 0.95]} radius={0.34} smoothness={5} position={[0, -0.05, 0]}>
          {shell}
        </RoundedBox>
        <RoundedBox args={[0.7, 0.4, 0.06]} radius={0.06} smoothness={3} position={[0, 0, 0.47]}>
          {dark}
        </RoundedBox>
        {[-0.2, 0, 0.2].map((x, i) => (
          <mesh key={i} position={[x, 0, 0.51]}>
            <boxGeometry args={[0.1, 0.2 - Math.abs(x) * 0.5, 0.02]} />
            {lit}
          </mesh>
        ))}
        {/* svävarring */}
        <mesh position={[0, -0.78, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.5, 0.045, 12, 40]} />
          {lit}
        </mesh>
        <mesh position={[0, -0.7, 0]}>
          <cylinderGeometry args={[0.46, 0.3, 0.14, 32]} />
          {dark}
        </mesh>
      </group>

      {/* nacke */}
      <mesh position={[0, 0.66, 0]}>
        <cylinderGeometry args={[0.2, 0.26, 0.2, 20]} />
        {dark}
      </mesh>

      {/* huvud */}
      <group ref={head} position={[0, 1.28, 0]}>
        <RoundedBox args={[1.7, 1.2, 1.15]} radius={0.42} smoothness={6}>
          {shell}
        </RoundedBox>
        {/* visir */}
        <RoundedBox args={[1.32, 0.72, 0.1]} radius={0.3} smoothness={5} position={[0, 0.02, 0.56]}>
          {dark}
        </RoundedBox>
        <group ref={eyes} position={[0, 0.05, 0.64]}>
          <mesh ref={eyeL} position={[-0.3, 0.06, 0]} scale={[1, 1.3, 0.4]}>
            <sphereGeometry args={[0.11, 20, 20]} />
            {lit}
          </mesh>
          <mesh ref={eyeR} position={[0.3, 0.06, 0]} scale={[1, 1.3, 0.4]}>
            <sphereGeometry args={[0.11, 20, 20]} />
            {lit}
          </mesh>
          <mesh position={[0, -0.18, 0]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.09, 0.016, 8, 20, Math.PI]} />
            {lit}
          </mesh>
        </group>
        {/* öron */}
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 0.9, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.16, 24]} />
            {shade}
          </mesh>
        ))}
        {[-1, 1].map((s) => (
          <mesh key={`e${s}`} position={[s * 0.98, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 0.06, 20]} />
            {lit}
          </mesh>
        ))}
        {/* antenn */}
        <group ref={antenna} position={[0.25, 0.6, 0]}>
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.024, 0.024, 0.4, 8]} />
            {dark}
          </mesh>
          <mesh position={[0, 0.46, 0]}>
            <sphereGeometry args={[0.1, 20, 20]} />
            {lit}
          </mesh>
          <pointLight ref={glow} position={[0, 0.5, 0.2]} color={ACCENT} distance={4} intensity={1.6} />
        </group>
      </group>

      {/* armar */}
      <group ref={armR} position={[0.82, 0.38, 0]}>
        <mesh position={[0, -0.34, 0]}>
          <capsuleGeometry args={[0.1, 0.46, 8, 16]} />
          {shade}
        </mesh>
        <mesh position={[0, -0.74, 0]}>
          <sphereGeometry args={[0.15, 20, 20]} />
          {dark}
        </mesh>
      </group>
      <group ref={armL} position={[-0.82, 0.38, 0]}>
        <mesh position={[0, -0.34, 0]}>
          <capsuleGeometry args={[0.1, 0.46, 8, 16]} />
          {shade}
        </mesh>
        <mesh position={[0, -0.74, 0]}>
          <sphereGeometry args={[0.15, 20, 20]} />
          {dark}
        </mesh>
      </group>
    </group>
  )
}

function Scene({ pointer, wave }) {
  // hover/klick sätts här så att tiden kommer från three-klockan
  const clock = useRef(0)
  useFrame((s) => {
    clock.current = s.clock.elapsedTime
    const w = wave.current
    if (w.fire) {
      wave.current = { until: s.clock.elapsedTime + (w.fire === 'click' ? 2.4 : 1.6), strong: w.fire === 'click' }
    }
  })
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <directionalLight position={[-4, 1, -2]} intensity={0.8} color="#9fb0a0" />
      <group
        onClick={() => (wave.current = { ...wave.current, fire: 'click' })}
        onPointerOver={() => {
          if (!wave.current.fire && clock.current > (wave.current.until || 0)) wave.current = { ...wave.current, fire: 'hover' }
        }}
      >
        <Robot pointer={pointer} wave={wave} />
      </group>
    </>
  )
}

export default function Character3D() {
  const pointer = useRef({ x: 0, y: 0 })
  const wave = useRef({ until: 0, strong: false, fire: null })

  useEffect(() => {
    const move = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', move, { passive: true })
    // liten välkomstvinkning
    const id = setTimeout(() => (wave.current = { until: 0, strong: false, fire: 'hover' }), 1800)
    return () => {
      window.removeEventListener('mousemove', move)
      clearTimeout(id)
    }
  }, [])

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.35, 7.2], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-label="Flowbits vänliga robot som följer musen"
    >
      <Scene pointer={pointer} wave={wave} />
    </Canvas>
  )
}

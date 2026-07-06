import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Sparkles } from '@react-three/drei'

function DriftingField() {
  const stars = useRef(null)
  useFrame((_, delta) => {
    if (stars.current) stars.current.rotation.y += delta * 0.006
  })

  return (
    <group ref={stars}>
      <Stars radius={80} depth={50} count={2200} factor={3.2} saturation={0} fade speed={0.6} />
      <Sparkles count={60} scale={[60, 30, 30]} size={2.5} speed={0.25} color="#8b5cf6" opacity={0.5} />
      <Sparkles count={40} scale={[60, 30, 30]} size={2.5} speed={0.2} color="#22d3ee" opacity={0.4} />
      <Sparkles count={30} scale={[60, 30, 30]} size={2.5} speed={0.3} color="#ec4899" opacity={0.4} />
    </group>
  )
}

export default function Background3D() {
  return (
    <Canvas
      className="bg3d-canvas"
      camera={{ position: [0, 0, 1], fov: 75 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <DriftingField />
      </Suspense>
    </Canvas>
  )
}

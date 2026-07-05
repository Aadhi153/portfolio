import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function TiltRig({ children }) {
  const group = useRef(null)

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const { pointer } = state
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pointer.y * 0.28, 4, delta)
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.x * 0.4, 4, delta)
  })

  return <group ref={group}>{children}</group>
}

function Core() {
  const mesh = useRef(null)
  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.25
  })

  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.1}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.35, 4]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          emissive="#4c1d95"
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.6}
          distort={0.38}
          speed={2.2}
        />
      </mesh>
    </Float>
  )
}

function OrbitingShape({ position, color, geometry, speed = 1 }) {
  const mesh = useRef(null)
  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime * speed
    mesh.current.rotation.x = t * 0.6
    mesh.current.rotation.y = t * 0.4
  })

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={2} position={position}>
      <mesh ref={mesh}>
        {geometry}
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} roughness={0.25} metalness={0.5} />
      </mesh>
    </Float>
  )
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 4, 5]} intensity={40} color="#22d3ee" />
        <pointLight position={[-5, -3, 3]} intensity={40} color="#ec4899" />

        <TiltRig>
          <Core />
          <OrbitingShape position={[-1.7, 0.75, -0.5]} color="#22d3ee" geometry={<torusGeometry args={[0.28, 0.1, 16, 48]} />} speed={0.8} />
          <OrbitingShape position={[1.6, -0.6, -0.3]} color="#ec4899" geometry={<octahedronGeometry args={[0.34, 0]} />} speed={1.1} />
          <OrbitingShape position={[1.2, 1.05, -1]} color="#34d399" geometry={<boxGeometry args={[0.36, 0.36, 0.36]} />} speed={0.6} />
        </TiltRig>

        <Sparkles count={80} scale={6} size={2} speed={0.3} color="#a78bfa" opacity={0.6} />
      </Suspense>
    </Canvas>
  )
}

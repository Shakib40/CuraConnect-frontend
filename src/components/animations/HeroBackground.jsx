import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Float } from '@react-three/drei'

function FloatingGeometries() {
  return (
    <>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1.2, 32, 32]} position={[-3, 1, -5]}>
          <meshStandardMaterial color='#0ea5e9' wireframe={true} opacity={0.3} transparent />
        </Sphere>
      </Float>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <Sphere args={[1.8, 32, 32]} position={[4, -1, -6]}>
          <meshStandardMaterial color='#0f766e' wireframe={true} opacity={0.2} transparent />
        </Sphere>
      </Float>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={3}>
        <Sphere args={[0.7, 32, 32]} position={[0, 2, -3]}>
          <meshStandardMaterial color='#3b82f6' wireframe={true} opacity={0.4} transparent />
        </Sphere>
      </Float>
      <Float speed={2.5} rotationIntensity={2} floatIntensity={1}>
        <Sphere args={[0.9, 16, 16]} position={[-2, -2, -4]}>
          <meshStandardMaterial color='#14b8a6' wireframe={true} opacity={0.25} transparent />
        </Sphere>
      </Float>
    </>
  )
}

const HeroBackground = () => {
  return (
    <div className='absolute inset-0 z-0 bg-slate-900 overflow-hidden'>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color='#ccfbf1' />
        <pointLight position={[-10, -10, -10]} intensity={1} color='#0ea5e9' />
        <FloatingGeometries />
      </Canvas>
    </div>
  )
}

export default HeroBackground

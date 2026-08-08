/* eslint-disable react/no-unknown-property */
import { ContactShadows, OrbitControls, RoundedBox } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import './PhoneModelViewer.css'

const PHONE_W = 1.2
const PHONE_H = 2.45
const PHONE_D = 0.12
const BEZEL = 0.06
const SCREEN_W = PHONE_W - BEZEL * 2
const SCREEN_H = PHONE_H - BEZEL * 2.2

function ScreenTextures({ urls, index, children }) {
  const [textures, setTextures] = useState(/** @type {THREE.Texture[]} */ ([]))
  const urlsKey = urls.join('|')

  useEffect(() => {
    let cancelled = false
    const loader = new THREE.TextureLoader()
    Promise.all(
      urls.map(
        (url) =>
          new Promise((resolve) => {
            loader.load(
              url,
              (tex) => {
                tex.colorSpace = THREE.SRGBColorSpace
                tex.minFilter = THREE.LinearFilter
                tex.magFilter = THREE.LinearFilter
                tex.generateMipmaps = false
                tex.needsUpdate = true
                resolve(tex)
              },
              undefined,
              () => resolve(null),
            )
          }),
      ),
    ).then((list) => {
      if (!cancelled) setTextures(list.filter(Boolean))
    })
    return () => {
      cancelled = true
    }
  }, [urlsKey]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => textures.forEach((t) => t.dispose()), [textures])

  const map = textures.length ? textures[index % textures.length] : null
  return children(map)
}

function PhoneModel({ map, autoRotate }) {
  const group = useRef(/** @type {THREE.Group | null} */ (null))
  const matRef = useRef(/** @type {THREE.MeshBasicMaterial | null} */ (null))

  useEffect(() => {
    if (!matRef.current) return
    matRef.current.map = map
    matRef.current.color.set(map ? '#ffffff' : '#38bdf8')
    matRef.current.needsUpdate = true
  }, [map])

  useFrame((_, dt) => {
    if (!group.current || !autoRotate) return
    group.current.rotation.y += dt * 0.35
  })

  return (
    <group ref={group} position={[0, -0.05, 0]} rotation={[0.15, -0.4, 0]}>
      {/* Body */}
      <RoundedBox args={[PHONE_W, PHONE_H, PHONE_D]} radius={0.12} smoothness={4} castShadow>
        <meshStandardMaterial
          color="#3a3d44"
          metalness={0.75}
          roughness={0.35}
          envMapIntensity={0.8}
        />
      </RoundedBox>

      {/* Front glass plate */}
      <mesh position={[0, 0, PHONE_D / 2 + 0.002]}>
        <planeGeometry args={[SCREEN_W + 0.04, SCREEN_H + 0.04]} />
        <meshBasicMaterial color="#0a0a0a" />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0.01, PHONE_D / 2 + 0.008]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial
          ref={matRef}
          color={map ? '#ffffff' : '#38bdf8'}
          map={map || undefined}
          toneMapped={false}
        />
      </mesh>

      {/* Dynamic Island */}
      <mesh position={[0, SCREEN_H / 2 - 0.1, PHONE_D / 2 + 0.01]}>
        <capsuleGeometry args={[0.03, 0.14, 4, 12]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Side button */}
      <mesh position={[PHONE_W / 2 + 0.01, 0.2, 0]}>
        <boxGeometry args={[0.025, 0.32, 0.05]} />
        <meshStandardMaterial color="#2a2c30" metalness={0.8} roughness={0.4} />
      </mesh>
    </group>
  )
}

function Scene({ urls, index, autoRotate }) {
  return (
    <>
      <color attach="background" args={['#07080d']} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} castShadow />
      <directionalLight position={[-3, 2, 2]} intensity={0.8} color="#7dd3fc" />
      <pointLight position={[0, 0, 3]} intensity={0.6} />

      <ScreenTextures urls={urls} index={index}>
        {(map) => <PhoneModel map={map} autoRotate={autoRotate} />}
      </ScreenTextures>

      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.55}
        scale={8}
        blur={2.5}
        far={4}
      />

      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.7}
        minDistance={2.4}
        maxDistance={5.5}
        target={[0, 0, 0]}
        autoRotate={false}
      />
    </>
  )
}

/**
 * Model Viewer–style phone with screenshot textures on the screen.
 * @see https://reactbits.dev/components/model-viewer
 */
export default function PhoneModelViewer({
  shots = [],
  index = 0,
  active = true,
  autoRotate = true,
}) {
  const urls = useMemo(
    () =>
      shots
        .filter((s) => s?.src && !s.video && !/\.(mp4|webm|ogg)(\?|$)/i.test(s.src))
        .map((s) => s.src),
    [shots],
  )
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  if (!urls.length) {
    return (
      <div className="phone-model-viewer phone-model-viewer--empty">
        No screens
      </div>
    )
  }

  return (
    <div className="phone-model-viewer">
      <Canvas
        className="phone-model-viewer__canvas"
        dpr={[1, 2]}
        camera={{ position: [0, 0.2, 3.4], fov: 40, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        frameloop={active && !reduceMotion ? 'always' : 'demand'}
        shadows
        style={{ width: '100%', height: '100%', display: 'block' }}
        onCreated={({ gl, camera }) => {
          gl.setClearColor('#07080d', 1)
          gl.outputColorSpace = THREE.SRGBColorSpace
          camera.lookAt(0, 0, 0)
        }}
      >
        <Suspense fallback={null}>
          <Scene
            urls={urls}
            index={index}
            autoRotate={autoRotate && !reduceMotion && active}
          />
        </Suspense>
      </Canvas>
      <p className="phone-model-viewer__hint">Drag to rotate</p>
    </div>
  )
}

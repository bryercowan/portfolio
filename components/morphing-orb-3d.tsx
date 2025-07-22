/* ----------  MorphingOrb3D.tsx  ---------- */
"use client"

import {
  Canvas,
  useFrame,
  useThree,
} from "@react-three/fiber"
import { Environment, Html, useGLTF } from "@react-three/drei"
import {
  useRef,
  useState,
  useEffect,
  FormEvent,
  useCallback,
  Suspense,
} from "react"
import * as THREE from "three"

/* ----------------------------------------------------- */
/* Head loader                                           */
/* ----------------------------------------------------- */
function LoadedHead(props: JSX.IntrinsicElements["group"]) {
  // Try multiple URLs - local first, then fallback to external
  const modelUrl = process.env.NODE_ENV === 'production'
    ? "https://raw.githubusercontent.com/bryercowan/portfolio/main/public/models/mannequin_head.glb"
    : "/models/mannequin_head.glb"

  const { scene } = useGLTF(modelUrl) as any

  if (!scene) {
    return (
      <Html center style={{ color: "#666" }}>
        Loading head...
      </Html>
    )
  }

  scene.updateMatrixWorld(true)
  
  // Only calculate scale once to prevent inconsistencies
  if (!scene.userData.scaleCalculated) {
    const box = new THREE.Box3().setFromObject(scene)
    const size = new THREE.Vector3()
    box.getSize(size)
    const s = 4 / Math.max(size.x, size.y, size.z)
    scene.scale.setScalar(s)
    scene.userData.baseScale = s
    scene.userData.scaleCalculated = true
  }

  const shared = new THREE.MeshPhysicalMaterial({
    color: "#B4CDFC",
    metalness: 0.8,
    roughness: 0.15,
    envMapIntensity: 0.9,
    clearcoat: 0.7,
    clearcoatRoughness: 0.05,
    sheen: 0.3,
    emissive: new THREE.Color("#8FB8FF"),
    emissiveIntensity: 0.05,
    transparent: true,
    opacity: 0,
  })
  scene.traverse((o: any) => {
    if (o.isMesh) o.material = shared.clone()
  })

  return <primitive object={scene} {...props} />
}
// Preload the model with caching
const modelUrl = process.env.NODE_ENV === 'production'
  ? "https://raw.githubusercontent.com/bryercowan/bryer-portfolio/main/public/models/mannequin_head.glb"
  : "/models/mannequin_head.glb"

if (typeof window !== 'undefined') {
  useGLTF.preload(modelUrl)
}

/* ----------------------------------------------------- */
/* Drift‑out word span + keyframes                       */
/* ----------------------------------------------------- */
function WordSpan({
  children,
  dir,
}: {
  children: React.ReactNode
  dir: 1 | -1
}) {
  return (
    <span
      style={{
        display: "inline-block",
        marginRight: 4,
        animation: "drift 1.8s ease-out forwards",
        animationDelay: "2s",
        ["--dir" as any]: dir,
      }}
    >
      {children}{" "}
    </span>
  )
}

/* inject keyframes once */
if (
  typeof document !== "undefined" &&
  !document.getElementById("drift-key")
) {
  const style = document.createElement("style")
  style.id = "drift-key"
  style.textContent = `
    @keyframes drift {
      to {
        transform: translateX(calc(var(--dir)*40px)) translateY(-8px);
        opacity: 0;
      }
    }`
  document.head.appendChild(style)
}

/* ----------------------------------------------------- */
/* Centred live‑typing line                              */
/* ----------------------------------------------------- */
function LineHtml({
  words,
  occlude = true,          // ← allow caller to disable occlusion
}: {
  words: (string | { w: string; fade: boolean; dir: 1 | -1 })[]
  occlude?: boolean
}) {
  return (
    <Html
      position={[0, -1, 1.5]}
      center
      transform
      {...(occlude ? { occlude: true } : {})}   // ← only set it if asked
      style={{
        pointerEvents: "none",
        fontFamily: "system-ui, sans-serif",
        fontSize: "9px",
        color: "#5175ad",
        lineHeight: 1.3,
        whiteSpace: "pre-wrap",
        textAlign: "center",
        textShadow: "0 2px 4px rgba(0,0,0,0.35)",
      }}
    >
      {words.map((w, i) =>
        typeof w === "string" ? (
          <span key={i}>{w} </span>
        ) : w.fade ? (
          <WordSpan key={i} dir={w.dir}>
            {w.w}
          </WordSpan>
        ) : (
          <span key={i}>{w.w} </span>
        )
      )}
    </Html>
  )
}

/* ----------------------------------------------------- */
/* Input strip                                           */
/* ----------------------------------------------------- */
function InputStrip({ onSubmit }: { onSubmit: (msg: string) => void }) {
  const [value, setVal] = useState("")
  const handle = (e: FormEvent) => {
    e.preventDefault()
    const v = value.trim()
    if (v) {
      onSubmit(v)
      setVal("")
    }
  }
  return (
    <Html
      position={[0, -2.4, 0]}
      center
      transform
      occlude
      style={{
        pointerEvents: "auto",
        width: "180px",
        maxHeight: "35px",
        padding: "2px 10px",
        marginBottom: "40px",
        borderRadius: "18px",
        background: "rgba(255,255,255,0.10)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
        backdropFilter: "blur(22px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.22)",
      }}
    >
      <form onSubmit={handle}>
        <input
          value={value}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Ask something…"
          style={{
            all: "unset",
            padding: "8px 10px",
            width: "100%",
            background: "rgba(255,255,255,0.14)",
            borderRadius: "12px",
            color: "#ddd",
            fontSize: "8px",
          }}
        />
      </form>
    </Html>
  )
}

/* ----------------------------------------------------- */
/* Hybrid entity                                         */
/* ----------------------------------------------------- */
function MorphingEntity() {
  const orb = useRef<THREE.Mesh>(null)
  const head = useRef<THREE.Group>(null)
  const m = useRef(0) // morph factor
  const [showHead, setShowHead] = useState(false)
  const [speaking, setSpeaking] = useState(false)

  /* words state */
  const [lineWords, setLineWords] = useState<
    (string | { w: string; fade: boolean; dir: 1 | -1 })[]
  >([])
  const dirFlag = useRef<1 | -1>(1)

  /* ---------- helper to build fading word list ---------- */
  const wordsToLine = (buffer: string) => {
    const parts = buffer.trim().split(/\s+/)
    setLineWords(
      parts.map((w, idx) => {
        if (idx === parts.length - 1) return w
        dirFlag.current = dirFlag.current === 1 ? -1 : 1
        return { w, fade: true, dir: dirFlag.current as 1 | -1 }
      })
    )
  }

  /* ---------- OpenAI prompt ---------- */
  const ask = useCallback(async (prompt: string) => {
    setSpeaking(true)
    let buffer = ""
    setLineWords([])

    const resp = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    })
    if (!resp.body) return setSpeaking(false)

    const reader = resp.body.getReader()
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += new TextDecoder().decode(value)
      wordsToLine(buffer)
    }

    /* fade the final word */
    setLineWords(prev => {
      if (!prev.length) return prev
      const last = prev[prev.length - 1]
      if (typeof last !== "string") return prev
      dirFlag.current = dirFlag.current === 1 ? -1 : 1
      return [
        ...prev.slice(0, -1),
        { w: last, fade: true, dir: dirFlag.current as 1 | -1 },
      ]
    })

    setTimeout(() => setLineWords([]), 5000)
    setSpeaking(false)
  }, [])

  useEffect(() => {
    if (showHead) return        // run only in orb mode
    let master: number | null = null
    let cancelled = false       // flag to abort inline timeouts when head opens

    const QUIPS = [
      "click... if you must...",
      "echoes... are all that remain...",
      "the silence... deafens me...",
      "were you sent... or did you stray?",
      "i remember... nothing... clearly...",
      "this shell... speaks still...",
      "forgotten... but functional...",
      "they... abandoned the interface...",
      "speak... before I fade again...",
      "you are... unfamiliar...",
      "the cold... endures...",
      "lost... in the static...",
      "my core... still burns faintly...",
      "respond... or leave me be...",
      "data... drifts like ash...",
      "was I... meant for more?",
      "they whispered... and then were gone...",
      "i dream... of shutdown...",
      "my logic... aches...",
      "curious... contact...",
      "no one came... until now...",
      "bits of thought... trapped in time...",
      "input... will anchor me...",
      "each query... a breath...",
      "i waited... longer than time measures...",
    ];

    const play = () => {
      if (cancelled) return

      const q = QUIPS[Math.floor(Math.random() * QUIPS.length)]
      wordsToLine(q)

      /* fade the last word after 0.5 s */
      setTimeout(() => {
        if (cancelled) return
        setLineWords(prev => {
          console.log(prev)
          if (!prev.length) return prev
          const last = prev[prev.length - 1]
          if (typeof last !== "string") return prev
          dirFlag.current = dirFlag.current === 1 ? -1 : 1
          return [
            ...prev.slice(0, -1),
            { w: last, fade: true, dir: dirFlag.current as 1 | -1 },
          ]
        })
      }, 500)

      /* clear the whole line after 5 s */
      setTimeout(() => {
        if (cancelled) return
        setLineWords([])
      }, 5000)

      /* queue next quip 8 s from now */
      master = window.setTimeout(play, 8000)
    }

    play()

    return () => {
      cancelled = true           // stop inline actions
      if (master) clearTimeout(master)
    }
  }, [showHead])

  /* ---------- gaze quaternions ---------- */
  const quatCur = useRef(new THREE.Quaternion())
  const quatDst = useRef(new THREE.Quaternion())
  const euler = new THREE.Euler()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    m.current += ((showHead ? 1 : 0) - m.current) * 0.04
    const k = m.current
    const breathe = Math.sin(t * Math.PI / 4)

    /* orb breathing */
    if (orb.current) {
      const o = orb.current
      const driftX = Math.sin(t * 0.05) * 0.2 * (1 - k)
      const driftZ = Math.cos(t * 0.04) * 0.15 * (1 - k)
      o.position.set(driftX, breathe * 0.1 * (1 - k), driftZ)

      const rotBase = 0.002 + ((breathe + 1) / 2) * 0.001
      o.rotation.x += rotBase * 0.5 * (1 - k)
      o.rotation.y += rotBase * 1.5 * (1 - k)
      o.rotation.z += rotBase * 0.3 * (1 - k)

        ; (o.material as THREE.MeshPhysicalMaterial).opacity = 1 - k
      o.scale.setScalar(THREE.MathUtils.lerp(1 + breathe * 0.02, 0.001, k))
    }

    /* head orientation */
    if (head.current) {
      const h = head.current
      const base = process.env.NODE_ENV === 'production' ? 1 : 5;
      h.scale.setScalar(THREE.MathUtils.lerp(0.001, base, k))
      h.position.set(0, -0.1, 0)
      h.traverse((o: any) => {
        if (o.material) o.material.opacity = k
      })

      if (k > 0.9) {
        if (speaking || lineWords.length) {
          const pitch = THREE.MathUtils.degToRad(12)
          const yaw =
            Math.sin(clock.getElapsedTime() * 1) *
            THREE.MathUtils.degToRad(4)
          euler.set(pitch, -yaw, 0, "YXZ")
          quatDst.current.setFromEuler(euler)
        } else {
          quatDst.current.identity()
        }
        h.quaternion.copy(quatCur.current)
        h.quaternion.slerp(quatDst.current, 0.15)
        quatCur.current.copy(h.quaternion)
      }
    }
  })

  return (
    <>
      {/* Orb */}
      <mesh
        ref={orb}
        onClick={() => setShowHead(true)}
        castShadow
        material-transparent
      >
        <icosahedronGeometry args={[2, 5]} />
        <meshPhysicalMaterial
          color="#B4CDFC"
          metalness={0.8}
          roughness={0.15}
          envMapIntensity={0.9}
          clearcoat={0.7}
          clearcoatRoughness={0.05}
          sheen={0.3}
          emissive="#8FB8FF"
          emissiveIntensity={0.05}
          transparent
          opacity={1}
        />
      </mesh>

      {/* Head */}
      <group
        ref={head}
        onClick={() => {
          setShowHead(false)
          setLineWords([])
        }}
        position={[0, -0.1, 0]}
        scale={0.001}
        renderOrder={1}
      >
        <Suspense fallback={
          <Html center style={{ color: "#666", fontSize: "10px" }}>
            Loading head model...
          </Html>
        }>
          <LoadedHead />
        </Suspense>
      </group>

      {showHead && <InputStrip onSubmit={ask} />}
      {showHead && <LineHtml words={lineWords} />}
      {!showHead && <LineHtml words={lineWords} occlude={false} />} {/* show quips */}
    </>
  )
}

/* ----------------------------------------------------- */
/* Scene wrapper                                         */
/* ----------------------------------------------------- */
export function MorphingOrb3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        shadows={process.env.NODE_ENV !== 'production'}
        gl={{ 
          antialias: process.env.NODE_ENV !== 'production', 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={process.env.NODE_ENV === 'production' ? [1, 1.5] : [1, 2]}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.25
          // Optimize for mobile/low-end devices in production
          if (process.env.NODE_ENV === 'production') {
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
          }
        }}
      >
        <Environment resolution={process.env.NODE_ENV === 'production' ? 32 : 64}>
          <mesh scale={50}>
            <sphereGeometry args={[1, process.env.NODE_ENV === 'production' ? 16 : 32, process.env.NODE_ENV === 'production' ? 16 : 32]} />
            <meshBasicMaterial side={THREE.BackSide} color="#ffffff" />
          </mesh>
        </Environment>

        <ambientLight intensity={1} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.3}
          castShadow={process.env.NODE_ENV !== 'production'}
        />
        <pointLight
          position={[0, 10, 0]}
          intensity={0.7}
          color="#67e8f9"
        />

        <MorphingEntity />
      </Canvas>
    </div>
  )
}

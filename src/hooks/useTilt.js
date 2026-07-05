import { useRef, useCallback } from 'react'

// Mouse-driven 3D tilt: rotates an element toward the cursor and lifts it
// toward the viewer (translateZ), giving cards real perspective depth.
export default function useTilt({ strength = 10, lift = 24, scale = 1.02 } = {}) {
  const ref = useRef(null)

  const onMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotateY = (px - 0.5) * strength * 2
    const rotateX = (0.5 - py) * strength * 2

    el.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${lift}px) scale(${scale})`
    el.style.setProperty('--glow-x', `${px * 100}%`)
    el.style.setProperty('--glow-y', `${py * 100}%`)
  }, [strength, lift, scale])

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  let rx = 0, ry = 0, mx = 0, my = 0

  useEffect(() => {
    const move = e => { mx = e.clientX; my = e.clientY }
    const loop = () => {
      if (dot.current) {
        dot.current.style.left = mx + 'px'
        dot.current.style.top = my + 'px'
      }
      if (ring.current) {
        rx += (mx - rx) * 0.1
        ry += (my - ry) * 0.1
        ring.current.style.left = rx + 'px'
        ring.current.style.top = ry + 'px'
      }
      requestAnimationFrame(loop)
    }
    document.addEventListener('mousemove', move)
    const id = requestAnimationFrame(loop)
    return () => {
      document.removeEventListener('mousemove', move)
      cancelAnimationFrame(id)
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  )
}
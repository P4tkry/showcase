'use client'

import { useEffect, useRef } from 'react'

export default function HeroGlow() {
  const glowRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const glow = glowRef.current
    const container = glow?.parentElement

    if (!glow || !container || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return
    }

    let frameId = 0
    let currentX = container.clientWidth / 2
    let currentY = container.clientHeight / 2
    let targetX = currentX
    let targetY = currentY

    const render = () => {
      currentX += (targetX - currentX) * 0.1
      currentY += (targetY - currentY) * 0.1
      glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      frameId = window.requestAnimationFrame(render)
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()

      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        glow.dataset.visible = 'false'
        return
      }

      targetX = event.clientX - rect.left
      targetY = event.clientY - rect.top
      glow.dataset.visible = 'true'
    }

    const handlePointerLeave = () => {
      glow.dataset.visible = 'false'
    }

    frameId = window.requestAnimationFrame(render)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerleave', handlePointerLeave)
    window.addEventListener('scroll', handlePointerLeave, { passive: true })

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
      window.removeEventListener('scroll', handlePointerLeave)
    }
  }, [])

  return (
    <div aria-hidden={'true'} className={'hero-glow'} data-visible={'false'} ref={glowRef}>
      <div className={'hero-glow-shape'} />
    </div>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

type TypedDescriptionProps = {
  text: string
}

export default function TypedDescription({ text }: TypedDescriptionProps) {
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!elementRef.current) {
      return
    }

    const typed = new Typed(elementRef.current, {
      strings: [text],
      typeSpeed: 22,
      startDelay: 300,
      showCursor: true,
      cursorChar: '_',
      contentType: 'null',
    })

    return () => {
      typed.destroy()
    }
  }, [text])

  return <span ref={elementRef} />
}

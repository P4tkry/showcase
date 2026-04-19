'use client'

import { isDocumentEvent, ready } from '@payloadcms/live-preview'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProjectLivePreview() {
  const router = useRouter()

  useEffect(() => {
    const serverURL = window.location.origin

    ready({ serverURL })

    const onMessage = (event: MessageEvent) => {
      if (isDocumentEvent(event, serverURL)) {
        router.refresh()
      }
    }

    window.addEventListener('message', onMessage)

    return () => {
      window.removeEventListener('message', onMessage)
    }
  }, [router])

  return null
}

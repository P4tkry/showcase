'use client'

import { useEffect, useState } from 'react'

import CountUpClient from '@/app/(frontend)/Landing/CountUpClient'

const VISIT_SESSION_KEY = 'landing-visit-tracked'

type TrackVisitResponse = {
  totalDocs: number
}

export default function VisitCounter({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    if (window.sessionStorage.getItem(VISIT_SESSION_KEY) === '1') {
      return
    }

    let isCancelled = false

    const trackVisit = async () => {
      try {
        const response = await fetch('/api/system/visits/track', {
          method: 'POST',
        })

        if (!response.ok) {
          return
        }

        const data = (await response.json()) as Partial<TrackVisitResponse>

        if (!isCancelled && typeof data.totalDocs === 'number') {
          setCount(data.totalDocs)
          window.sessionStorage.setItem(VISIT_SESSION_KEY, '1')
        }
      } catch {
        // Ignore client-side tracking failures and keep the server count.
      }
    }

    void trackVisit()

    return () => {
      isCancelled = true
    }
  }, [])

  return <CountUpClient count={count} />
}

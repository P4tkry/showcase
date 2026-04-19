'use client'

import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Button } from '@payloadcms/ui'
import { FaDownload } from 'react-icons/fa'

type ImportResponse = {
  created: number
  message: string
  skipped: number
  totalFetched: number
  updated: number
}

const wrapperStyle: CSSProperties = {
  display: 'grid',
  gap: 10,
  marginBottom: 16,
}

const rowStyle: CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  gap: 12,
}

const messageStyle: CSSProperties = {
  color: 'var(--theme-elevation-700)',
  fontSize: 13,
  lineHeight: 1.6,
}

export function CertificatesImportButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const importCertificates = async () => {
    setIsLoading(true)
    setError(null)
    setMessage(null)

    try {
      const response = await fetch('/api/integrations/credly/import-certificates', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const data = (await response.json()) as Partial<ImportResponse> & { error?: string }

      if (!response.ok) {
        throw new Error(data.error || 'Credly import failed.')
      }

      setMessage(
        data.message ||
          `Imported ${data.totalFetched ?? 0} badges. Created ${data.created ?? 0}, updated ${data.updated ?? 0}, skipped ${data.skipped ?? 0}.`,
      )

      window.setTimeout(() => {
        window.location.reload()
      }, 700)
    } catch (caughtError) {
      const nextMessage = caughtError instanceof Error ? caughtError.message : 'Credly import failed.'
      setError(nextMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={wrapperStyle}>
      <div style={rowStyle}>
        <Button buttonStyle="primary" icon={<FaDownload />} onClick={importCertificates} size="small">
          {isLoading ? 'Importing from Credly...' : 'Import from Credly'}
        </Button>
        <div style={messageStyle}>Fetches badges from Credly and upserts them by external badge ID.</div>
      </div>

      {message ? <div style={{ ...messageStyle, color: 'var(--theme-success-500)' }}>{message}</div> : null}
      {error ? <div style={{ ...messageStyle, color: 'var(--theme-error-500)' }}>{error}</div> : null}
    </div>
  )
}

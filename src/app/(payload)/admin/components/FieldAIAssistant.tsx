'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Button, FieldLabel, useField, useForm, useLocale } from '@payloadcms/ui'
import { FaMagic, FaTimes } from 'react-icons/fa'

import { lexicalToPlainText, plainTextToLexical } from '@/lib/richText'

type ImproveFieldResponse = {
  message: string
  text: string
}

type FieldAIAssistantProps = {
  field?: {
    label?: string | Record<string, string>
    localized?: boolean
    required?: boolean
  }
  label?: string
  localized?: boolean
  path?: string
  required?: boolean
}

const wrapperStyle: CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  gap: 10,
  justifyContent: 'space-between',
  marginBottom: 8,
  position: 'relative',
}

const popoverStyle: CSSProperties = {
  background: 'var(--theme-elevation-50)',
  border: '1px solid var(--theme-elevation-150)',
  boxShadow: '0 18px 45px color-mix(in srgb, var(--theme-bg) 72%, transparent)',
  display: 'grid',
  gap: 12,
  padding: 14,
  position: 'absolute',
  right: 0,
  top: 'calc(100% + 6px)',
  width: 'min(420px, calc(100vw - 48px))',
  zIndex: 20,
}

const subtleTextStyle: CSSProperties = {
  color: 'var(--theme-elevation-500)',
  fontSize: 12,
  lineHeight: 1.5,
}

export function FieldAIAssistant(props: FieldAIAssistantProps) {
  const { code: locale } = useLocale()
  const { getFields, replaceState, setModified } = useForm()
  const { path, value, setValue } = useField<any>()
  const { value: titleValue } = useField<string>({ potentiallyStalePath: 'title' })
  const { value: myContributionValue } = useField<string>({ potentiallyStalePath: 'myContribution' })
  const { value: summaryValue } = useField<string>({ potentiallyStalePath: 'summary' })
  const { value: contentValue } = useField<any>({ potentiallyStalePath: 'content' })

  const [isOpen, setIsOpen] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState<ImproveFieldResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const resolvedPath = props.path ?? path ?? ''
  const rootField = useMemo(() => {
    if (!resolvedPath) {
      return ''
    }

    return resolvedPath.split('.')[0] || resolvedPath
  }, [resolvedPath])

  const fieldLabel = rootField === 'content' ? 'content' : rootField === 'summary' ? 'summary' : rootField || 'field'
  const resolvedLabel = props.label ?? props.field?.label ?? fieldLabel
  const resolvedLocalized = props.localized ?? props.field?.localized ?? false
  const resolvedRequired = props.required ?? props.field?.required ?? false
  const currentText = useMemo(() => {
    if (rootField === 'content') {
      return lexicalToPlainText(value)
    }

    return typeof value === 'string' ? value : ''
  }, [rootField, value])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const applyResult = useCallback(() => {
    if (!result?.text) {
      return
    }

    if (rootField === 'content' && resolvedPath) {
      const nextContentValue = plainTextToLexical(result.text)
      const currentFields = getFields()
      const currentContentField = currentFields[resolvedPath] ?? {}

      replaceState({
        ...currentFields,
        [resolvedPath]: {
          ...currentContentField,
          initialValue: nextContentValue,
          value: nextContentValue,
        },
      })
      setModified(true)
      return
    }

    setValue(result.text)
  }, [getFields, replaceState, resolvedPath, result, rootField, setModified, setValue])

  const generate = useCallback(async () => {
    const trimmedPrompt = prompt.trim()

    if (!trimmedPrompt) {
      setError('Wpisz polecenie dla AI.')
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/improve-project-field', {
        body: JSON.stringify({
          content: rootField === 'content' ? currentText : lexicalToPlainText(contentValue),
          field: rootField,
          locale,
          myContribution: typeof myContributionValue === 'string' ? myContributionValue : '',
          prompt: trimmedPrompt,
          summary: typeof summaryValue === 'string' ? summaryValue : '',
          targetText: currentText,
          title: typeof titleValue === 'string' ? titleValue : '',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const data = (await response.json()) as ImproveFieldResponse & { error?: string }

      if (!response.ok) {
        throw new Error(data.error || 'Nie udalo sie wygenerowac poprawki.')
      }

      setResult(data)
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : 'Nie udalo sie wygenerowac poprawki.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [contentValue, currentText, locale, myContributionValue, prompt, rootField, summaryValue, titleValue])

  return (
    <div ref={rootRef} style={wrapperStyle}>
      <FieldLabel label={resolvedLabel} localized={resolvedLocalized} path={resolvedPath || undefined} required={resolvedRequired} />
      <div style={{ position: 'relative' }}>
        <Button buttonStyle="secondary" disabled={!resolvedPath} icon={<FaMagic />} onClick={() => setIsOpen((open) => !open)} size="small">
          AI
        </Button>

        {isOpen ? (
          <div style={popoverStyle}>
            <div style={{ alignItems: 'start', display: 'flex', gap: 12, justifyContent: 'space-between' }}>
              <div style={{ display: 'grid', gap: 4 }}>
                <strong style={{ color: 'var(--theme-text)', fontSize: 14 }}>AI dla pola {fieldLabel}</strong>
                <div style={subtleTextStyle}>Np. popraw bledy, skroc tekst, zrob bardziej techniczny ton.</div>
              </div>
              <button
                aria-label="Close"
                onClick={() => setIsOpen(false)}
                style={{
                  alignItems: 'center',
                  background: 'transparent',
                  border: 0,
                  color: 'var(--theme-elevation-700)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  padding: 2,
                }}
                type="button"
              >
                <FaTimes />
              </button>
            </div>

            <textarea
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Np. popraw bledy i uprosc styl"
              rows={4}
              style={{
                background: 'var(--theme-elevation-0)',
                border: '1px solid var(--theme-elevation-150)',
                color: 'var(--theme-text)',
                outline: 'none',
                padding: 12,
                resize: 'vertical',
                width: '100%',
              }}
              value={prompt}
            />

            <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <div style={subtleTextStyle}>AI pracuje tylko na tym polu, ale dostaje tez kontekst projektu.</div>
              <Button buttonStyle="primary" disabled={isLoading} onClick={generate} size="small">
                {isLoading ? 'Generating...' : 'Generate'}
              </Button>
            </div>

            {error ? <div style={{ color: 'var(--theme-error-500)', fontSize: 13 }}>{error}</div> : null}

            {result ? (
              <div style={{ borderTop: '1px solid var(--theme-elevation-100)', display: 'grid', gap: 10, paddingTop: 12 }}>
                <div style={subtleTextStyle}>{result.message}</div>
                <div style={{ color: 'var(--theme-text)', fontSize: 13, lineHeight: 1.7, maxHeight: 220, overflow: 'auto', whiteSpace: 'pre-wrap' }}>
                  {result.text || '-'}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button buttonStyle="secondary" disabled={!result.text} onClick={applyResult} size="small">
                    Zastap {fieldLabel}
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

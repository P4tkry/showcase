'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Button, useDocumentInfo, useForm, useLocale, useConfig } from '@payloadcms/ui'
import { FaLanguage, FaTimes } from 'react-icons/fa'

type TranslateProjectResponse = {
  message: string
  translation: {
    content: string
    contentLexical?: unknown
    myContribution: string
    summary: string
    title: string
  }
}

const containerStyle: CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  marginRight: 10,
  position: 'relative',
}

const popoverStyle: CSSProperties = {
  background: 'var(--theme-elevation-50)',
  border: '1px solid var(--theme-elevation-150)',
  boxShadow: '0 18px 45px color-mix(in srgb, var(--theme-bg) 72%, transparent)',
  display: 'grid',
  gap: 12,
  padding: 14,
  position: 'fixed',
  width: 'min(360px, calc(100vw - 24px))',
  zIndex: 30,
}

const subtleTextStyle: CSSProperties = {
  color: 'var(--theme-elevation-500)',
  fontSize: 12,
  lineHeight: 1.5,
}

function getLocaleLabel(locale: any): string {
  if (typeof locale?.label === 'string') {
    return locale.label
  }

  if (locale?.label && typeof locale.label === 'object') {
    const firstLabel = Object.values(locale.label).find((value) => typeof value === 'string')

    if (typeof firstLabel === 'string') {
      return firstLabel
    }
  }

  if (typeof locale?.code === 'string') {
    return locale.code.toUpperCase()
  }

  return ''
}

export function ProjectTranslateButton() {
  const locale = useLocale()
  const { config } = useConfig()
  const { id, collectionSlug } = useDocumentInfo()
  const { getFields, replaceState, setModified } = useForm()
  const currentLocale = typeof locale?.code === 'string' ? locale.code : ''

  const [isOpen, setIsOpen] = useState(false)
  const [sourceLocale, setSourceLocale] = useState('')
  const [result, setResult] = useState<TranslateProjectResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [popoverPosition, setPopoverPosition] = useState<{ left: number; top: number }>({ left: 12, top: 12 })

  const availableLocales = useMemo(() => {
    const localization = config?.localization

    if (!localization || !Array.isArray(localization.locales)) {
      return []
    }

    const locales = localization.locales as Array<string | { code?: string; label?: string | Record<string, string> }>

    return locales
      .map((locale) => (typeof locale === 'string' ? { code: locale, label: locale.toUpperCase() } : locale))
      .filter((locale): locale is { code: string; label?: string | Record<string, string> } => {
        return typeof locale?.code === 'string' && locale.code !== currentLocale
      })
  }, [config, currentLocale])

  useEffect(() => {
    if (!sourceLocale && availableLocales.length > 0) {
      setSourceLocale(availableLocales[0].code)
    }
  }, [availableLocales, sourceLocale])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const updatePopoverPosition = () => {
      const root = rootRef.current

      if (!root) {
        return
      }

      const rect = root.getBoundingClientRect()
      const popoverWidth = Math.min(360, window.innerWidth - 24)
      const left = Math.max(12, Math.min(rect.right - popoverWidth, window.innerWidth - popoverWidth - 12))
      const top = Math.min(rect.bottom + 2, window.innerHeight - 24)

      setPopoverPosition({ left, top })
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

    updatePopoverPosition()
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', updatePopoverPosition)
    window.addEventListener('scroll', updatePopoverPosition, true)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', updatePopoverPosition)
      window.removeEventListener('scroll', updatePopoverPosition, true)
    }
  }, [isOpen])

  const applyTranslation = useCallback(() => {
    if (!result?.translation) {
      return
    }

    const currentFields = getFields()
    const nextState = { ...currentFields }
    const fieldEntries = Object.entries(currentFields)

    const resolveTextFieldPath = (basePath: string) => {
      const exactLocalizedPath = `${basePath}.${currentLocale}`
      const candidates = [
        exactLocalizedPath,
        ...fieldEntries
          .map(([path]) => path)
          .filter((path) => path !== exactLocalizedPath && path.startsWith(`${basePath}.`) && path.endsWith(`.${currentLocale}`)),
        basePath,
      ]

      return candidates.find((path) => {
        const state = currentFields[path]
        const value = state?.value

        return !!state && (typeof value === 'string' || value === null || value === undefined)
      })
    }

    const resolveRichTextFieldPath = (basePath: string) => {
      const exactLocalizedPath = `${basePath}.${currentLocale}`
      const candidates = [
        exactLocalizedPath,
        ...fieldEntries
          .map(([path]) => path)
          .filter((path) => path !== exactLocalizedPath && path.startsWith(`${basePath}.`) && path.endsWith(`.${currentLocale}`)),
        basePath,
      ]

      return candidates.find((path) => {
        const state = currentFields[path]
        const value = state?.value

        return !!state && (!!value ? typeof value === 'object' && 'root' in value : true)
      })
    }

    const updateFieldState = (fieldPath: string | undefined, nextValue: unknown) => {
      if (!fieldPath) {
        return
      }

      const currentFieldState = currentFields[fieldPath]

      if (!currentFieldState) {
        return
      }

      nextState[fieldPath] = {
        ...currentFieldState,
        initialValue: nextValue,
        value: nextValue,
      }
    }

    updateFieldState(resolveTextFieldPath('title'), result.translation.title)
    updateFieldState(resolveTextFieldPath('summary'), result.translation.summary)
    updateFieldState(resolveTextFieldPath('myContribution'), result.translation.myContribution)

    if (result.translation.contentLexical) {
      updateFieldState(resolveRichTextFieldPath('content'), result.translation.contentLexical)
    }

    replaceState(nextState)
    setModified(true)
  }, [currentLocale, getFields, replaceState, result, setModified])

  const translate = useCallback(async () => {
    if (!id || !sourceLocale || !currentLocale) {
      setError('Brakuje dokumentu albo locale do tlumaczenia.')
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/translate-project-locale', {
        body: JSON.stringify({
          collectionSlug,
          id,
          sourceLocale,
          targetLocale: currentLocale,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const data = (await response.json()) as TranslateProjectResponse & { error?: string }

      if (!response.ok) {
        throw new Error(data.error || 'Nie udalo sie przetlumaczyc projektu.')
      }

      setResult(data)
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : 'Nie udalo sie przetlumaczyc projektu.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [collectionSlug, currentLocale, id, sourceLocale])

  return (
    <div ref={rootRef} style={containerStyle}>
      <Button buttonStyle="secondary" disabled={!id || availableLocales.length === 0} icon={<FaLanguage />} onClick={() => setIsOpen((open) => !open)} size="small">
        Przetlumacz
      </Button>

      {isOpen ? (
        <div style={{ ...popoverStyle, left: popoverPosition.left, top: popoverPosition.top }}>
          <div style={{ alignItems: 'start', display: 'flex', gap: 12, justifyContent: 'space-between' }}>
            <div style={{ display: 'grid', gap: 4 }}>
              <strong style={{ color: 'var(--theme-text)', fontSize: 14 }}>Przetlumacz z innego jezyka</strong>
              <div style={subtleTextStyle}>AI przetlumaczy `title`, `summary`, `myContribution` i `content` do aktualnego locale.</div>
            </div>
            <button
              aria-label="Close"
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 0, color: 'var(--theme-elevation-700)', cursor: 'pointer', padding: 2 }}
              type="button"
            >
              <FaTimes />
            </button>
          </div>

          <label style={{ color: 'var(--theme-text)', display: 'grid', fontSize: 13, gap: 6 }}>
            Z jakiego jezyka tlumaczyc
            <select
              onChange={(event) => setSourceLocale(event.target.value)}
              style={{ background: 'var(--theme-elevation-0)', border: '1px solid var(--theme-elevation-150)', color: 'var(--theme-text)', padding: 10 }}
              value={sourceLocale}
            >
              {availableLocales.map((locale) => (
                <option key={locale.code} value={locale.code}>
                  {getLocaleLabel(locale)}
                </option>
              ))}
            </select>
          </label>

          <div style={subtleTextStyle}>
            Cel: <strong style={{ color: 'var(--theme-text)' }}>{currentLocale.toUpperCase()}</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button buttonStyle="primary" disabled={isLoading || !sourceLocale} onClick={translate} size="small">
              {isLoading ? 'Translating...' : 'Przetlumacz'}
            </Button>
          </div>

          {error ? <div style={{ color: 'var(--theme-error-500)', fontSize: 13 }}>{error}</div> : null}

          {result ? (
            <div style={{ borderTop: '1px solid var(--theme-elevation-100)', display: 'grid', gap: 10, paddingTop: 12 }}>
              <div style={subtleTextStyle}>{result.message}</div>
              <div style={{ color: 'var(--theme-text)', fontSize: 13 }}>
                Gotowe do wstawienia dla locale <strong>{currentLocale.toUpperCase()}</strong>.
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button buttonStyle="secondary" onClick={applyTranslation} size="small">
                  Wstaw tlumaczenie
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

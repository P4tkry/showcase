'use client'

import type { CheckboxFieldClientProps } from 'payload'
import { FieldDescription, FieldError, FieldLabel, RenderCustomComponent, useField } from '@payloadcms/ui'

export function CredentialToggleField(props: CheckboxFieldClientProps) {
  const {
    field: {
      admin: { className, description } = {},
      label,
      localized,
      required,
    },
    path: pathFromProps,
    readOnly,
  } = props

  const {
    customComponents: { Description, Error, Label } = {},
    disabled,
    path,
    setValue,
    showError,
    value,
  } = useField<boolean>({
    potentiallyStalePath: pathFromProps,
  })

  const isDisabled = Boolean(readOnly || disabled)
  const isPdf = Boolean(value)

  return (
    <div className={['field-type', 'checkbox', className, showError && 'error', isDisabled && 'read-only'].filter(Boolean).join(' ')}>
      <RenderCustomComponent
        CustomComponent={Label}
        Fallback={<FieldLabel label={label} localized={localized} path={path} required={required} />}
      />

      <div className={'field-type__wrap'}>
        <RenderCustomComponent CustomComponent={Error} Fallback={<FieldError path={path} showError={showError} />} />

        <button
          type={'button'}
          disabled={isDisabled}
          onClick={() => {
            if (!isDisabled) {
              setValue(!isPdf)
            }
          }}
          aria-pressed={isPdf}
          className={'cursor-pointer'}
          style={{
            alignItems: 'center',
            background: 'var(--theme-elevation-50)',
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: 999,
            display: 'inline-flex',
            gap: 4,
            padding: 4,
          }}
        >
          <span
            style={{
              background: !isPdf ? 'var(--theme-elevation-0)' : 'transparent',
              border: !isPdf ? '1px solid var(--theme-elevation-150)' : '1px solid transparent',
              borderRadius: 999,
              color: !isPdf ? 'var(--theme-text)' : 'var(--theme-elevation-500)',
              fontFamily: 'var(--font-jetbrains-mono)',
              fontSize: 11,
              letterSpacing: '0.12em',
              minWidth: 56,
              padding: '7px 12px',
              textAlign: 'center',
              transition: 'background 160ms ease, border-color 160ms ease, color 160ms ease',
              textTransform: 'uppercase',
            }}
          >
            URL
          </span>

          <span
            style={{
              background: isPdf ? 'var(--theme-elevation-0)' : 'transparent',
              border: isPdf ? '1px solid var(--theme-elevation-150)' : '1px solid transparent',
              borderRadius: 999,
              color: isPdf ? 'var(--theme-text)' : 'var(--theme-elevation-500)',
              fontFamily: 'var(--font-jetbrains-mono)',
              fontSize: 11,
              letterSpacing: '0.12em',
              minWidth: 56,
              padding: '7px 12px',
              textAlign: 'center',
              transition: 'background 160ms ease, border-color 160ms ease, color 160ms ease',
              textTransform: 'uppercase',
            }}
          >
            PDF
          </span>
        </button>
      </div>

      <RenderCustomComponent CustomComponent={Description} Fallback={<FieldDescription description={description} path={path} />} />
    </div>
  )
}

'use client'

import { useCallback, useMemo, useState } from 'react'
import type { SelectFieldClientProps } from 'payload'
import { FieldDescription, FieldError, FieldLabel, ReactSelect, RenderCustomComponent, useField } from '@payloadcms/ui'

import { featuredSkillIconValues, type SkillIconValue } from '@/lib/skills'
import { SkillIconOptionContent } from '@/app/(payload)/admin/components/skillIcons'

type SkillOption = {
  label: string
  value: SkillIconValue
}

function SkillOptionRow({ value }: { value: SkillIconValue }) {
  return <SkillIconOptionContent value={value} />
}

function Option(props: any) {
  const { data, innerProps, innerRef, isFocused, isSelected } = props

  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        background: isSelected ? 'rgba(59, 130, 246, 0.18)' : isFocused ? 'rgba(255, 255, 255, 0.06)' : 'transparent',
        cursor: 'pointer',
        padding: '10px 12px',
      }}
    >
      <SkillOptionRow value={data.value} />
    </div>
  )
}

function SingleValue(props: any) {
  const { data } = props

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        insetBlockStart: '50%',
        insetInlineStart: 0,
        maxWidth: '100%',
        minWidth: 0,
        pointerEvents: 'none',
        position: 'absolute',
        transform: 'translateY(-50%)',
      }}
    >
      <SkillOptionRow value={data.value} />
    </div>
  )
}

export function SkillIconSelectField(props: SelectFieldClientProps) {
  const {
    field,
    field: {
      admin: { className, description, isClearable = true, isSortable = true, placeholder } = {},
      label,
      localized,
      required,
    },
    path: pathFromProps,
    readOnly,
  } = props

  const options = useMemo<SkillOption[]>(
    () =>
      field.options.map((option) => {
        if (typeof option === 'string') {
          return {
            label: option,
            value: option as SkillIconValue,
          }
        }

        return {
          label: String(option.label),
          value: option.value as SkillIconValue,
        }
      }),
    [field.options],
  )
  const [inputValue, setInputValue] = useState('')

  const {
    customComponents: { AfterInput, BeforeInput, Description, Error, Label } = {},
    disabled,
    path,
    setValue,
    showError,
    value,
  } = useField<string>({
    potentiallyStalePath: pathFromProps,
  })

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) ?? null,
    [options, value],
  )

  const filteredOptions = useMemo(() => {
    const query = inputValue.trim().toLowerCase()

    if (query.length < 2) {
      return options.filter((option) => {
        if (selectedOption?.value === option.value) {
          return true
        }

        return featuredSkillIconValues.has(option.value)
      })
    }

    return options
      .filter((option) => {
        const normalizedLabel = option.label.toLowerCase()
        const normalizedValue = option.value.toLowerCase()

        return normalizedLabel.includes(query) || normalizedValue.includes(query)
      })
      .slice(0, 120)
  }, [inputValue, options, selectedOption])

  const onChange = useCallback(
    (selected: SkillOption | SkillOption[] | null) => {
      if (readOnly || disabled || Array.isArray(selected)) {
        return
      }

      setValue(selected?.value ?? null)
    },
    [disabled, readOnly, setValue],
  )

  const onInputChange = useCallback((nextValue: string) => {
    setInputValue(nextValue)
  }, [])

  const resolvedPlaceholder = typeof placeholder === 'string' ? placeholder : undefined

  return (
    <div className={['field-type', 'select', className, showError && 'error', (readOnly || disabled) && 'read-only'].filter(Boolean).join(' ')}>
      <RenderCustomComponent
        CustomComponent={Label}
        Fallback={<FieldLabel label={label} localized={localized} path={path} required={required} />}
      />
      <div className={'field-type__wrap'}>
        <RenderCustomComponent CustomComponent={Error} Fallback={<FieldError path={path} showError={showError} />} />
        {BeforeInput}
        <ReactSelect
          components={{ Option, SingleValue } as any}
          disabled={Boolean(readOnly || disabled)}
          isClearable={Boolean(isClearable)}
          isSortable={Boolean(isSortable)}
          onChange={onChange as any}
          onInputChange={onInputChange as any}
          options={filteredOptions as any}
          placeholder={resolvedPlaceholder}
          showError={Boolean(showError)}
          value={(selectedOption ?? undefined) as any}
          noOptionsMessage={() =>
            inputValue.trim().length < 2
              ? 'Type at least 2 characters to search all icons.'
              : 'No matching icons found.'
          }
        />
        {AfterInput}
      </div>
      <RenderCustomComponent CustomComponent={Description} Fallback={<FieldDescription description={description} path={path} />} />
    </div>
  )
}

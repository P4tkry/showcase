'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type FilterOption = {
  label: string
  value: string
}

type FilterMultiSelectProps = {
  allLabel: string
  label: string
  onChange: (values: string[]) => void
  options: FilterOption[]
  selectedValues: string[]
}

export default function FilterMultiSelect({
  allLabel,
  label,
  onChange,
  options,
  selectedValues,
}: FilterMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

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

  const selectedOptions = useMemo(
    () => options.filter((option) => selectedValues.includes(option.value)),
    [options, selectedValues],
  )

  const toggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((entry) => entry !== value))
      return
    }

    onChange([...selectedValues, value])
  }

  const clearSelection = () => onChange([])

  return (
    <div ref={rootRef} className={'relative grid gap-2'}>
      <span className={'font-jetbrains-mono text-[11px] uppercase tracking-[0.2em] text-[#8e99a7]'}>{label}</span>

      <button
        type={'button'}
        onClick={() => setIsOpen((open) => !open)}
        className={'flex min-h-11 items-center justify-between gap-3 rounded-xl border border-white/6 bg-[#23282f] px-4 py-2 text-left transition hover:border-white/12'}
      >
        <div className={'flex min-w-0 flex-1 flex-wrap items-center gap-2'}>
          {selectedOptions.length ? (
            selectedOptions.map((option) => (
              <span
                key={option.value}
                className={'inline-flex max-w-full items-center rounded-md border border-white/8 bg-[#1b2026] px-2.5 py-1 font-jetbrains-mono text-[10px] uppercase tracking-[0.12em] text-[#d6dde5]'}
              >
                <span className={'truncate'}>{option.label}</span>
              </span>
            ))
          ) : (
            <span className={'font-jetbrains-mono text-sm text-[#94a0ae]'}>{allLabel}</span>
          )}
        </div>

        <span className={`font-jetbrains-mono text-xs text-[#94a0ae] transition ${isOpen ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {isOpen ? (
        <div className={'absolute left-0 top-full z-20 mt-2 w-full rounded-2xl border border-white/8 bg-[#1d2228] p-2 shadow-[0_20px_40px_rgba(0,0,0,0.28)]'}>
          <div className={'mb-2 flex items-center justify-between gap-3 border-b border-white/6 px-2 pb-2'}>
            <span className={'font-jetbrains-mono text-[10px] uppercase tracking-[0.14em] text-[#7f8b99]'}>{label}</span>
            <button
              type={'button'}
              onClick={clearSelection}
              className={'font-jetbrains-mono text-[10px] uppercase tracking-[0.14em] text-[#9aa5b3] transition hover:text-white'}
            >
              {allLabel}
            </button>
          </div>

          <div className={'max-h-72 space-y-1 overflow-y-auto pr-1'}>
            {options.map((option) => {
              const isSelected = selectedValues.includes(option.value)

              return (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition ${
                    isSelected ? 'bg-[#2a3038] text-white' : 'text-[#c4ccd5] hover:bg-[#252b32]'
                  }`}
                >
                  <input
                    type={'checkbox'}
                    checked={isSelected}
                    onChange={() => toggleOption(option.value)}
                    className={'h-4 w-4 rounded border-white/10 bg-[#161b20] accent-[#91a0b1]'}
                  />
                  <span className={'min-w-0 truncate text-sm'}>{option.label}</span>
                </label>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}

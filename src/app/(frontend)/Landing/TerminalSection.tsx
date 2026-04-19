'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import type { Locale } from '@/i18n/config'
import { getTranslations } from '@/i18n/translations'
import type { Command } from '@/payload-types'

type TerminalSectionProps = {
  commands: Command[]
  locale: Locale
}

const terminalLines = {
  en: [
    '> /help for available commands',
    '',
  ],
  pl: [
    '> /help aby zobaczyć dostępne komendy',
    '',
  ],
} satisfies Record<Locale, string[]>

const terminalMessages = {
  en: {
    availableCommands: 'available commands:',
    helpDescription: '/help - show available commands',
    unknown: 'unknown command. try /help',
  },
  pl: {
    availableCommands: 'dostępne komendy:',
    helpDescription: '/help - pokaż dostępne komendy',
    unknown: 'nieznana komenda. użyj /help',
  },
} satisfies Record<Locale, { availableCommands: string; helpDescription: string; unknown: string }>

export default function TerminalSection({ commands, locale }: TerminalSectionProps) {
  const t = getTranslations(locale)
  const [command, setCommand] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [systemCrashVisible, setSystemCrashVisible] = useState(false)
  const outputRef = useRef<HTMLDivElement | null>(null)
  const lines = terminalLines[locale]
  const messages = terminalMessages[locale]
  const hiddenHelpCommands = useMemo(() => new Set(['/rm -rf /', '/rm-rf-root']), [])
  const commandMap = useMemo(
    () =>
      new Map(
        commands
          .filter((entry) => typeof entry.command === 'string' && entry.command.trim().length > 0)
          .map((entry) => [entry.command.trim(), entry] as const),
      ),
    [commands],
  )
  const transcript = useMemo(() => [...lines, ...history], [history, lines])

  useEffect(() => {
    const container = outputRef.current

    if (!container) {
      return
    }

    container.scrollTop = container.scrollHeight
  }, [transcript])

  useEffect(() => {
    if (!systemCrashVisible) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSystemCrashVisible(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [systemCrashVisible])

  return (
    <footer className={'snap-section border-t border-white/10 bg-[var(--bg-base)] bg-[image:var(--bg-gradient)] bg-fixed'}>
      <div className={'mx-auto max-w-[1480px] px-4 py-14 md:px-8 xl:px-10'}>
        <div className={'relative overflow-hidden rounded-[28px] border border-white/10 bg-[#09111d]/82 shadow-[0_28px_100px_rgba(2,8,20,0.58)] backdrop-blur-md'}>
          <div className={'pointer-events-none absolute inset-0'}>
            <div className={'absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent'} />
            <div className={'absolute inset-y-0 left-[7%] w-px bg-cyan-400/8'} />
            <div className={'absolute right-[-3%] top-[-8%] h-56 w-56 rounded-full bg-cyan-400/12 blur-3xl'} />
            <div className={'absolute bottom-[-20%] left-[-4%] h-64 w-64 rounded-full bg-orange-500/10 blur-3xl'} />
            <div
              className={'absolute inset-0 opacity-[0.07]'}
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
                backgroundPosition: 'center',
                backgroundSize: '36px 36px',
              }}
            />
          </div>

          <div className={'relative z-10 border-b border-white/8 px-5 py-3 md:px-8'}>
            <div className={'flex flex-wrap items-center gap-3 font-jetbrains-mono text-[11px] uppercase tracking-[0.18em] text-slate-400'}>
              <span className={'inline-flex items-center gap-2'}>
                <span className={'h-2.5 w-2.5 rounded-full bg-orange-400/90'} />
                <span>{t.terminalEyebrow}</span>
              </span>
              <span className={'text-slate-600'}>/</span>
              <span className={'text-cyan-200/70'}>terminal/root</span>
              <span className={'ml-auto text-slate-500'}>idle</span>
            </div>
          </div>

          <div className={'relative z-10 px-5 py-8 md:px-8 md:py-10'}>
            <div className={'mb-3 flex items-center gap-2 font-jetbrains-mono text-[10px] uppercase tracking-[0.18em] text-slate-500'}>
              <span className={'text-cyan-200/80'}>$</span>
              <span>root/output</span>
            </div>

            <div className={'flex h-[28rem] flex-col overflow-hidden rounded-[20px] border border-white/8 bg-[#060b14]/55'}>
              <div ref={outputRef} className={'flex-1 overflow-y-auto px-4 py-5 md:px-6'}>
                <div className={'space-y-3 font-jetbrains-mono text-[12px] leading-7 tracking-[0.08em] text-slate-300 md:text-[13px]'}>
                  <div className={'min-h-[1.75rem] text-cyan-300/72'}>{'>'} init /terminal</div>

                  {transcript.map((line, index) => (
                    <div key={`${line}-${index}`} className={'min-h-[1.75rem]'}>
                      {line ? <span>{line}</span> : <span>&nbsp;</span>}
                    </div>
                  ))}
                </div>
              </div>

              <form
                className={'flex items-center gap-2 border-t border-white/8 px-4 py-4 text-cyan-200 md:px-6'}
                onSubmit={(event) => {
                  event.preventDefault()

                  const trimmed = command.trim()

                  if (!trimmed) {
                    return
                  }

                  const normalized = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
                  const nextLines = [`> ${normalized}`]
                  const matchedCommand = commandMap.get(normalized)

                  if (normalized === '/rm -rf /' || normalized === '/rm-rf-root') {
                    nextLines.push('critical: destructive command detected')
                    nextLines.push('kernel panic: root filesystem corruption imminent')
                    setSystemCrashVisible(true)
                  } else if (normalized === '/help') {
                    nextLines.push(messages.availableCommands)
                    nextLines.push(messages.helpDescription)

                    commands.forEach((entry) => {
                      if (typeof entry.command !== 'string' || typeof entry.description !== 'string') {
                        return
                      }

                      if (hiddenHelpCommands.has(entry.command.trim())) {
                        return
                      }

                      nextLines.push(`${entry.command} - ${entry.description}`)
                    })
                  } else if (matchedCommand && typeof matchedCommand.output === 'string') {
                    nextLines.push(
                      ...matchedCommand.output
                        .split(/\r?\n/)
                        .map((line: string) => line.trimEnd())
                        .filter((line: string, index: number, all: string[]) => line.length > 0 || index < all.length - 1),
                    )
                  } else {
                    nextLines.push(messages.unknown)
                  }

                  setHistory((current) => [...current, ...nextLines, ''])
                  setCommand('')
                }}
              >
                <span>{'>'}</span>
                <input
                  value={command}
                  onChange={(event) => setCommand(event.target.value)}
                  className={
                    'min-w-0 flex-1 bg-transparent text-cyan-100 caret-cyan-300 outline-none placeholder:text-slate-600'
                  }
                  placeholder={locale === 'pl' ? '/wpisz-komendę' : '/type-command'}
                  spellCheck={false}
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      {systemCrashVisible ? (
        <div className={'fixed inset-0 z-[120] bg-[#04070d]'} onClick={() => setSystemCrashVisible(false)}>
          <div className={'absolute inset-0 opacity-90'} style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(239,68,68,0.16) 0%, transparent 30%), radial-gradient(circle at 80% 15%, rgba(34,211,238,0.12) 0%, transparent 28%), linear-gradient(180deg, #070b12 0%, #020409 100%)' }} />
          <div className={'absolute inset-0 opacity-[0.08]'} style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)', backgroundSize: '100% 4px' }} />

          <div
            className={'relative z-10 flex min-h-screen flex-col justify-between px-6 py-8 md:px-10 md:py-10'}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={'flex items-center justify-between gap-4 font-jetbrains-mono text-[11px] uppercase tracking-[0.22em] text-red-300/80'}>
              <span>system.failure</span>
              <span>panic mode</span>
            </div>

            <div className={'mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center'}>
              <div className={'mb-6 font-jetbrains-mono text-xs uppercase tracking-[0.28em] text-red-400/80'}>
                fatal exception 0x000terminal
              </div>
              <h2 className={'max-w-4xl text-4xl font-semibold uppercase tracking-[0.04em] text-white sm:text-6xl md:text-7xl'}>
                System Crash
              </h2>
              <div className={'mt-8 grid gap-3 font-jetbrains-mono text-sm text-red-100/78 md:grid-cols-2'}>
                <div>[FAIL] root filesystem integrity check</div>
                <div>[FAIL] process manager heartbeat</div>
                <div>[WARN] unauthorized recursive deletion request</div>
                <div>[INFO] emergency recovery shell available</div>
              </div>
            </div>

            <div className={'flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between'}>
              <div className={'font-jetbrains-mono text-[11px] uppercase tracking-[0.18em] text-slate-400'}>
                press esc or use recovery button
              </div>
              <button
                type={'button'}
                onClick={() => setSystemCrashVisible(false)}
                className={'cursor-pointer rounded-full border border-cyan-300/22 bg-cyan-400/10 px-5 py-3 font-jetbrains-mono text-[11px] uppercase tracking-[0.18em] text-cyan-100 transition hover:bg-cyan-400/16 hover:text-white'}
              >
                Recover system
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </footer>
  )
}

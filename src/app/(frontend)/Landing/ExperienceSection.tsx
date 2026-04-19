import type { Locale } from '@/i18n/config'
import { getTranslations } from '@/i18n/translations'
import type { Experience } from '@/payload-types'

type ExperienceSectionProps = {
  entries: Experience[]
  locale: Locale
}

export default function ExperienceSection({ entries, locale }: ExperienceSectionProps) {
  const t = getTranslations(locale)
  const dateFormatter = new Intl.DateTimeFormat(localeMap(locale), {
    month: 'short',
    year: 'numeric',
  })

  return (
    <section
      className={'snap-section relative overflow-hidden border-t border-white/10'}
      style={{
        backgroundAttachment: 'fixed',
        backgroundColor: 'var(--bg-base)',
        backgroundImage: 'var(--bg-gradient)',
      }}
    >

      <div className={'relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center px-6 py-16 md:px-10'}>
        <div className={'mb-12 max-w-3xl'}>
          <p className={'mb-4 font-jetbrains-mono text-sm uppercase tracking-[0.28em] text-orange-400'}>{t.experienceEyebrow}</p>
          <h2 className={'mb-5 text-3xl font-semibold text-white sm:text-4xl md:text-5xl'}>{t.experienceTitle}</h2>
          <p className={'text-base text-slate-300 md:text-lg'}>{t.experienceLead}</p>
        </div>

        {entries.length === 0 ? (
          <p className={'text-base text-slate-300'}>{t.experienceEmpty}</p>
        ) : (
          <div className={'relative'}>
            <div className={'absolute bottom-0 left-6 top-0 w-px bg-[linear-gradient(180deg,rgba(248,113,113,0.15),rgba(251,113,133,0.85),rgba(56,189,248,0.15))] md:left-1/2 md:-translate-x-1/2'} />

            <div className={'space-y-10 md:space-y-14'}>
              {entries.map((entry, index) => {
                const isRight = index % 2 === 1
                const periodRange = entry.endDate
                  ? `${dateFormatter.format(new Date(entry.startDate))} - ${dateFormatter.format(new Date(entry.endDate))}`
                  : dateFormatter.format(new Date(entry.startDate))

                const timelineMeta = (
                  <div className={`max-w-[180px] ${isRight ? 'text-right' : 'text-left'}`}>
                    <div className={'font-jetbrains-mono text-sm uppercase tracking-[0.14em] text-white/90'}>{entry.periodLabel}</div>
                    <div className={'mt-2 font-jetbrains-mono text-[11px] uppercase tracking-[0.18em] text-sky-200/80'}>{periodRange}</div>
                  </div>
                )

                const timelineCard = (
                  <div
                    className={
                      'relative rounded-[26px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.08))] p-6 text-slate-100 shadow-[0_20px_60px_rgba(1,10,28,0.22)] backdrop-blur-xl'
                    }
                  >
                    <p className={'mb-3 font-jetbrains-mono text-[11px] uppercase tracking-[0.22em] text-rose-500'}>{t.experienceCardLabel}</p>
                    <h3 className={'mb-2 text-2xl font-semibold text-white'}>{entry.title}</h3>
                    {entry.organization ? <p className={'mb-4 text-sm font-medium text-sky-100/70'}>{entry.organization}</p> : null}
                    <p className={'text-sm leading-7 text-slate-200/88'}>{entry.description}</p>
                  </div>
                )

                return (
                  <div key={entry.id} className={'relative grid gap-4 md:grid-cols-[minmax(0,1fr)_84px_minmax(0,1fr)] md:gap-8'}>
                    <div
                      className={`hidden md:block md:pt-5 ${
                        isRight ? 'md:col-start-1 md:pr-2' : 'md:col-start-1'
                      }`}
                    >
                      {isRight ? (
                        <div className={'flex justify-end'}>{timelineMeta}</div>
                      ) : (
                        timelineCard
                      )}
                    </div>

                    <div className={'relative hidden h-full md:col-start-2 md:flex md:justify-center'}>
                      <span className={'absolute top-[2.2rem] z-10 h-4 w-4 rounded-full border-4 border-white bg-rose-500 shadow-[0_0_0_3px_rgba(244,63,94,0.18)]'} />
                    </div>

                    <div
                      className={`hidden md:block md:pt-5 ${
                        isRight ? 'md:col-start-3' : 'md:col-start-3 md:pl-2'
                      }`}
                    >
                      {isRight ? (
                        timelineCard
                      ) : (
                        <div className={'flex justify-start'}>{timelineMeta}</div>
                      )}
                    </div>

                    <div className={'relative pl-14 md:hidden'}>
                      <span className={'absolute left-[20px] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-4 border-white bg-rose-500 shadow-[0_0_0_3px_rgba(244,63,94,0.18)]'} />
                      <div className={'font-jetbrains-mono text-sm uppercase tracking-[0.14em] text-white/90'}>{entry.periodLabel}</div>
                      <div className={'mt-2 font-jetbrains-mono text-[11px] uppercase tracking-[0.18em] text-sky-200/80'}>{periodRange}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function localeMap(locale: Locale) {
  return locale === 'pl' ? 'pl-PL' : 'en-US'
}

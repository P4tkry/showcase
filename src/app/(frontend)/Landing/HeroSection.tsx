import CountUpClient from '@/app/(frontend)/Landing/CountUpClient'
import HeroGlow from '@/app/(frontend)/Landing/HeroGlow'
import TypedDescription from '@/app/(frontend)/Landing/TypedDescription'
import type { Locale } from '@/i18n/config'
import { getTranslations } from '@/i18n/translations'

type HeroSectionProps = {
  aboutMe: string
  locale: Locale
  visitsCount: number
}

export default function HeroSection({ aboutMe, locale, visitsCount }: HeroSectionProps) {
  const t = getTranslations(locale)

  return (
    <section className={'snap-section relative min-h-screen overflow-hidden'}>
      <div className={'pointer-events-none absolute inset-0 z-0 overflow-hidden'}>
        <HeroGlow />
      </div>

      <div className={'relative z-10 mx-auto flex min-h-screen max-w-[1400px] items-center px-6 py-20 md:px-10 md:py-0'}>
        <div className={'w-full max-w-6xl'}>
          <p className={'font-jetbrains-mono pb-4 text-orange-400'}>
            {t.visitorPrefix} <CountUpClient count={visitsCount} /> {t.visitorSuffix}
          </p>
          <h1 className={'mb-4 text-4xl font-semibold sm:text-5xl md:text-6xl'}>
            {t.introPrefix}{' '}
            <a
              href={'https://www.linkedin.com/in/patryk-rusak/'}
              target={'_blank'}
              rel={'noreferrer'}
              className={'hero-link'}
            >
              <span className={'hero-link-label'}>{t.introSuffix}</span>
            </a>
          </h1>

          <div className={'max-w-6xl text-gray-300'}>
            <p>
              <TypedDescription text={aboutMe} />
            </p>
          </div>
        </div>
      </div>

      <a href={'#projects'} className={'hero-scroll'} aria-label={t.heroCta}>
        <span className={'hero-scroll-icon'} aria-hidden={'true'} />
        <span className={'hero-scroll-label'}>{t.heroCta}</span>
      </a>
    </section>
  )
}

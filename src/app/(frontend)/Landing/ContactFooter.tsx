import { FaEnvelope, FaGithub, FaLinkedinIn } from 'react-icons/fa6'

import type { Locale } from '@/i18n/config'

type ContactFooterProps = {
  locale: Locale
}

const links = [
  {
    href: 'https://github.com/p4tkry',
    icon: FaGithub,
    label: 'GitHub',
    value: 'p4tkry',
  },
  {
    href: 'mailto:patryk.rusak.contact@gmail.com',
    icon: FaEnvelope,
    label: 'Email',
    value: 'patryk.rusak.contact@gmail.com',
  },
  {
    href: 'https://www.linkedin.com/in/patryk-rusak/',
    icon: FaLinkedinIn,
    label: 'LinkedIn',
    value: 'patryk-rusak',
  },
]

export default function ContactFooter({ locale }: ContactFooterProps) {
  const copyright =
    locale === 'pl'
      ? 'Patryk Rusak. Wszystkie prawa zastrzeżone.'
      : 'Patryk Rusak. All rights reserved.'

  return (
    <footer className={'border-t border-[#31363d] bg-[#20252b]'}>
      <div className={'mx-auto max-w-[1480px] px-4 py-6 md:px-8 xl:px-10'}>
        <div className={'grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center'}>
          <div className={'flex flex-wrap gap-x-6 gap-y-3'}>
            {links.map((link) => {
              const Icon = link.icon

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer noopener'}
                  className={
                    'inline-flex items-center gap-3 text-sm text-[#cfd7df] transition hover:text-white'
                  }
                >
                  <span className={'inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/6 bg-white/[0.03] text-[13px] text-[#9eacb9]'}>
                    <Icon />
                  </span>
                  <span className={'font-jetbrains-mono text-[10px] uppercase tracking-[0.18em] text-[#7f8b97]'}>{link.label}</span>
                  <span className={'text-[15px]'}>{link.value}</span>
                </a>
              )
            })}
          </div>

          <p className={'font-jetbrains-mono text-[10px] uppercase tracking-[0.18em] text-[#74808b]'}>{copyright}</p>
        </div>
      </div>
    </footer>
  )
}

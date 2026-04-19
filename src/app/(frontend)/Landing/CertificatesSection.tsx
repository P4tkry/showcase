'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaArrowUpRightFromSquare, FaAward } from 'react-icons/fa6'

import type { Locale } from '@/i18n/config'
import { getTranslations } from '@/i18n/translations'
import type { Certificate, Media } from '@/payload-types'

type CertificatesSectionProps = {
  entries: Certificate[]
  locale: Locale
}

function resolveCertificateImage(entry: Certificate): { alt: string; src: string } | null {
  if (entry.imageUsesUpload && entry.image && typeof entry.image === 'object') {
    const uploadedImage = entry.image as Media
    const uploadedUrl = typeof uploadedImage.url === 'string' ? uploadedImage.url : null

    if (uploadedUrl) {
      return {
        alt: uploadedImage.alt || entry.title,
        src: uploadedUrl,
      }
    }
  }

  if (!entry.imageUsesUpload && typeof entry.imageUrl === 'string' && entry.imageUrl.trim().length > 0) {
    return {
      alt: entry.title,
      src: entry.imageUrl,
    }
  }

  if (entry.image && typeof entry.image === 'object') {
    const uploadedImage = entry.image as Media
    const uploadedUrl = typeof uploadedImage.url === 'string' ? uploadedImage.url : null

    if (uploadedUrl) {
      return {
        alt: uploadedImage.alt || entry.title,
        src: uploadedUrl,
      }
    }
  }

  if (typeof entry.imageUrl === 'string' && entry.imageUrl.trim().length > 0) {
    return {
      alt: entry.title,
      src: entry.imageUrl,
    }
  }

  return null
}

function resolveCertificateCredential(entry: Certificate): string | null {
  if (entry.credentialIsPdf && entry.credentialFile && typeof entry.credentialFile === 'object') {
    const uploadedFile = entry.credentialFile as Media
    return typeof uploadedFile.url === 'string' ? uploadedFile.url : null
  }

  if (typeof entry.credentialUrl === 'string' && entry.credentialUrl.trim().length > 0) {
    return entry.credentialUrl
  }

  return null
}

export default function CertificatesSection({ entries, locale }: CertificatesSectionProps) {
  const t = getTranslations(locale)
  const [activeCertificateId, setActiveCertificateId] = useState<number | string | null>(null)
  const dateFormatter = new Intl.DateTimeFormat(locale === 'pl' ? 'pl-PL' : 'en-US', {
    month: 'short',
    year: 'numeric',
  })
  const activeCertificate = entries.find((entry) => entry.id === activeCertificateId) ?? null

  useEffect(() => {
    if (!activeCertificate) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveCertificateId(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeCertificate])

  return (
    <section className={'snap-section border-t border-[#31363d] bg-[#20252b]'}>
      <div className={'mx-auto max-w-[1480px] px-4 py-14 md:px-8 xl:px-10'}>
        <div className={'mb-10 max-w-3xl'}>
          <p className={'mb-4 font-jetbrains-mono text-xs uppercase tracking-[0.28em] text-[#8e99a7]'}>{t.certificatesEyebrow}</p>
          <h2 className={'mb-4 text-3xl font-semibold text-[#e6ebf0] sm:text-4xl md:text-5xl'}>{t.certificatesTitle}</h2>
          <p className={'text-sm leading-7 text-[#9aa5b3] md:text-base'}>{t.certificatesLead}</p>
        </div>

        {entries.length > 0 ? (
          <div className={'grid gap-4 md:grid-cols-2 xl:grid-cols-3'}>
            {entries.map((entry) => {
              const certificateImage = resolveCertificateImage(entry)
              const credentialHref = resolveCertificateCredential(entry)

              return (
                <button
                  key={entry.id}
                  type={'button'}
                  onClick={() => setActiveCertificateId(entry.id)}
                  className={
                    'grid cursor-pointer gap-4 rounded-[20px] border border-white/8 bg-white/[0.04] p-4 text-left shadow-[0_10px_30px_rgba(1,10,28,0.12)] backdrop-blur-md transition hover:border-white/15 hover:bg-white/[0.06] sm:grid-cols-[84px_minmax(0,1fr)] sm:items-center'
                  }
                  aria-label={locale === 'pl' ? `Otwórz certyfikat ${entry.title}` : `Open certificate ${entry.title}`}
                >
                  <div className={'flex items-center justify-center'}>
                    <div className={'relative flex aspect-square w-full max-w-[84px] items-center justify-center overflow-hidden rounded-[18px] border border-white/8 bg-slate-950/20 p-2.5'}>
                      {certificateImage ? (
                        <Image
                          alt={certificateImage.alt}
                          className={'h-full w-full object-contain'}
                          height={72}
                          src={certificateImage.src}
                          unoptimized
                          width={72}
                        />
                      ) : (
                        <span className={'inline-flex h-10 w-10 items-center justify-center rounded-[14px] border border-cyan-300/20 bg-cyan-400/10 text-cyan-200'}>
                          <FaAward className={'text-base'} />
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={'flex h-full flex-col justify-between gap-4'}>
                    <div className={'space-y-2'}>
                      <p className={'font-jetbrains-mono text-[10px] uppercase tracking-[0.18em] text-sky-200/70'}>
                        {dateFormatter.format(new Date(entry.issuedAt))}
                      </p>

                      <h3 className={'text-lg font-semibold leading-snug text-white'}>{entry.title}</h3>
                      <p className={'font-jetbrains-mono text-[11px] uppercase tracking-[0.16em] text-cyan-100/65'}>{entry.issuer}</p>
                    </div>

                    {credentialHref ? (
                      <div>
                        <a
                          href={credentialHref}
                          target={'_blank'}
                          rel={'noreferrer noopener'}
                          onClick={(event) => event.stopPropagation()}
                          className={'inline-flex items-center gap-2 font-jetbrains-mono text-[10px] uppercase tracking-[0.16em] text-cyan-200 transition hover:text-white'}
                        >
                          <span>{t.certificatesViewCredential}</span>
                          <FaArrowUpRightFromSquare className={'text-[11px]'} />
                        </a>
                      </div>
                    ) : null}
                  </div>
                </button>
              )
            })}
          </div>
        ) : (
          <div className={'rounded-[24px] border border-dashed border-white/12 bg-white/5 p-8 text-slate-300 backdrop-blur-xl'}>
            <p className={'font-jetbrains-mono text-sm uppercase tracking-[0.18em] text-cyan-200/80'}>{t.certificatesEmpty}</p>
          </div>
        )}
      </div>

      {activeCertificate ? (
        <div
          className={'fixed inset-0 z-50 flex items-center justify-center bg-black/72 p-4 backdrop-blur-sm'}
          onClick={() => setActiveCertificateId(null)}
        >
          {(() => {
            const activeCertificateImage = resolveCertificateImage(activeCertificate)
            const activeCredentialHref = resolveCertificateCredential(activeCertificate)

            return (
          <div
            className={'grid w-full max-w-4xl gap-6 rounded-[24px] border border-white/8 bg-[#1d2228] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] md:p-6'}
            onClick={(event) => {
              event.stopPropagation()
            }}
            role={'dialog'}
            aria-modal={'true'}
            aria-label={activeCertificate.title}
          >
            <div className={'relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[20px] border border-white/8 bg-slate-950/25 p-8 md:p-10'}>
              {activeCertificateImage ? (
                <Image
                  alt={activeCertificateImage.alt}
                  className={'max-h-full w-auto object-contain'}
                  height={320}
                  sizes={'(max-width: 1024px) 100vw, 420px'}
                  src={activeCertificateImage.src}
                  unoptimized
                  width={320}
                />
              ) : (
                <span className={'inline-flex h-20 w-20 items-center justify-center rounded-[22px] border border-cyan-300/20 bg-cyan-400/10 text-cyan-200'}>
                  <FaAward className={'text-3xl'} />
                </span>
              )}
            </div>

            <div className={'flex flex-col gap-5'}>
              <div className={'flex items-start justify-between gap-4'}>
                <div className={'space-y-2'}>
                  <p className={'font-jetbrains-mono text-[10px] uppercase tracking-[0.18em] text-sky-200/70'}>
                    {dateFormatter.format(new Date(activeCertificate.issuedAt))}
                  </p>
                  <h3 className={'text-2xl font-semibold leading-tight text-[#eef2f6]'}>{activeCertificate.title}</h3>
                  <p className={'font-jetbrains-mono text-[11px] uppercase tracking-[0.16em] text-cyan-100/65'}>
                    {activeCertificate.issuer}
                  </p>
                </div>

                <button
                  type={'button'}
                  onClick={() => setActiveCertificateId(null)}
                  className={'cursor-pointer font-jetbrains-mono text-[11px] uppercase tracking-[0.18em] text-[#a8b3bf] transition hover:text-white'}
                  aria-label={locale === 'pl' ? 'Zamknij modal' : 'Close modal'}
                >
                  {locale === 'pl' ? 'Zamknij' : 'Close'}
                </button>
              </div>

              {activeCertificate.description ? (
                <p className={'text-sm leading-7 text-[#c5d0da]'}>{activeCertificate.description}</p>
              ) : null}

              {activeCertificate.skills && activeCertificate.skills.length > 0 ? (
                <div className={'space-y-3'}>
                  <p className={'font-jetbrains-mono text-[10px] uppercase tracking-[0.18em] text-[#8e99a7]'}>
                    {locale === 'pl' ? 'Umiejętności' : 'Skills'}
                  </p>
                  <div className={'flex flex-wrap gap-2'}>
                    {activeCertificate.skills.map((skill, index) => (
                      <span
                        key={`${activeCertificate.id}-skill-${index}-${skill.name}`}
                        className={'rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 font-jetbrains-mono text-[10px] uppercase tracking-[0.14em] text-[#d6dee7]'}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className={'mt-auto flex flex-wrap gap-3'}>
                {activeCredentialHref ? (
                  <a
                    href={activeCredentialHref}
                    target={'_blank'}
                    rel={'noreferrer noopener'}
                    className={'inline-flex items-center gap-2 rounded-full border border-cyan-300/18 bg-cyan-400/8 px-4 py-2 font-jetbrains-mono text-[10px] uppercase tracking-[0.16em] text-cyan-200 transition hover:text-white'}
                  >
                    <span>{t.certificatesViewCredential}</span>
                    <FaArrowUpRightFromSquare className={'text-[11px]'} />
                  </a>
                ) : null}

                {activeCertificate.globalActivityUrl ? (
                  <a
                    href={activeCertificate.globalActivityUrl}
                    target={'_blank'}
                    rel={'noreferrer noopener'}
                    className={'inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-jetbrains-mono text-[10px] uppercase tracking-[0.16em] text-[#c5d0da] transition hover:text-white'}
                  >
                    <span>{locale === 'pl' ? 'Zobacz szczegóły' : 'View details'}</span>
                    <FaArrowUpRightFromSquare className={'text-[11px]'} />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
            )
          })()}
        </div>
      ) : null}
    </section>
  )
}

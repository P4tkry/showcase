import Link from 'next/link'
import Image from 'next/image'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { FaFacebook, FaGithub, FaGlobe, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import type { IconType } from 'react-icons'

import config from '@payload-config'
import ProjectGallery from '@/app/(frontend)/Landing/ProjectGallery'
import { localeMap, statusClassNames, statusLabels } from '@/app/(frontend)/Landing/projects.utils'
import { SkillIcon } from '@/app/(payload)/admin/components/skillIcons'
import type { Locale } from '@/i18n/config'
import { isLocale } from '@/i18n/config'
import { getTranslations } from '@/i18n/translations'
import type { Media, Person, Project, Skill } from '@/payload-types'
import ProjectLivePreview from './ProjectLivePreview'

export const dynamic = 'force-dynamic'

type ProjectDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

type ProjectWithContentAndGallery = Project & {
  content?: unknown
  gallery?: {
    id?: string | null
    image: number | Media
  }[] | null
  mediaLinks?: {
    id?: string | null
    label: string
    url: string
  }[] | null
}

function getMediaLinkMeta(url: string): { icon: IconType; hostname: string } {
  try {
    const { hostname } = new URL(url)
    const normalizedHostname = hostname.replace(/^www\./, '').toLowerCase()

    if (normalizedHostname.includes('github.com')) {
      return { hostname: normalizedHostname, icon: FaGithub }
    }

    if (normalizedHostname.includes('linkedin.com')) {
      return { hostname: normalizedHostname, icon: FaLinkedin }
    }

    if (normalizedHostname.includes('youtube.com') || normalizedHostname.includes('youtu.be')) {
      return { hostname: normalizedHostname, icon: FaYoutube }
    }

    if (normalizedHostname.includes('instagram.com')) {
      return { hostname: normalizedHostname, icon: FaInstagram }
    }

    if (normalizedHostname.includes('twitter.com') || normalizedHostname.includes('x.com')) {
      return { hostname: normalizedHostname, icon: FaTwitter }
    }

    if (normalizedHostname.includes('facebook.com')) {
      return { hostname: normalizedHostname, icon: FaFacebook }
    }

    return { hostname: normalizedHostname, icon: FaGlobe }
  } catch {
    return { hostname: url, icon: FaGlobe }
  }
}

export default async function ProjectDetailPage({ params, searchParams }: ProjectDetailPageProps) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const resolvedParams = await params
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const { locale, slug } = resolvedParams

  if (!isLocale(locale)) {
    notFound()
  }

  const livePreviewParam = resolvedSearchParams.livePreview
  const isLivePreviewRequest = Array.isArray(livePreviewParam) ? livePreviewParam.includes('true') : livePreviewParam === 'true'
  const requestHeaders = await headers()
  const { user } = await payload.auth({ headers: requestHeaders })
  const canReadDraft = isLivePreviewRequest && Boolean(user)

  const numericProjectId = Number(slug)
  const isNumericProjectId = Number.isInteger(numericProjectId)

  const projectResult = await payload.find({
    collection: 'projects',
    locale: locale as 'en' | 'pl',
    depth: 2,
    draft: canReadDraft,
    limit: 1,
    where: {
      or: [
        {
          slug: {
            equals: slug,
          },
        },
        ...(isNumericProjectId
          ? [
              {
                id: {
                  equals: numericProjectId,
                },
              },
            ]
          : []),
      ],
    },
  })

  const project = projectResult.docs[0] as ProjectWithContentAndGallery | undefined

  if (!project) {
    notFound()
  }

  const t = getTranslations(locale as Locale)
  const dateFormatter = new Intl.DateTimeFormat(localeMap[locale as Locale], {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
  const thumbnail = typeof project.thumbnail === 'object' ? (project.thumbnail as Media) : null
  const skills = (project.skills ?? []).filter((skill): skill is Skill => typeof skill === 'object')
  const people = (project.people ?? []).filter((person): person is Person => typeof person === 'object')
  const mediaLinks = project.mediaLinks ?? []
  const content = project.content
  const galleryImages = (project.gallery ?? [])
    .map((item) => (typeof item.image === 'object' ? (item.image as Media) : null))
    .filter((image): image is Media => Boolean(image?.url))
    .map((image) => ({
      alt: image.alt || image.filename || 'Project image',
      id: image.id,
      url: image.url as string,
    }))

  const mainImage = thumbnail?.url
    ? {
        alt: thumbnail.alt || thumbnail.filename || 'Project image',
        id: thumbnail.id,
        url: thumbnail.url,
      }
    : null

  return (
    <section className={'relative w-full overflow-hidden bg-[#20252b] px-4 py-8 md:px-8 md:py-12'}>
      {canReadDraft ? <ProjectLivePreview /> : null}

      <div
        aria-hidden={'true'}
        className={'pointer-events-none absolute inset-0 opacity-60'}
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
          backgroundPosition: 'center center',
          backgroundSize: '56px 56px',
          maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,0.12))',
          WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,0.12))',
        }}
      />

      <div className={'relative mx-auto flex w-full max-w-[1380px] flex-col gap-8'}>
        <Link
          href={`/${locale}`}
          className={'inline-flex w-fit items-center gap-2 font-jetbrains-mono text-[11px] uppercase tracking-[0.24em] text-[#93a0af] transition hover:text-[#d7dee7]'}
        >
          <span aria-hidden={'true'}>{'<'} </span>
          <span>{t.backToProjects}</span>
        </Link>

        <header className={'rounded-[24px] border border-white/6 bg-[#1d2228] p-5 md:p-6'}>
          <div className={'grid gap-6'}>
            <div className={'grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(240px,0.5fr)]'}>
              <div className={'space-y-4'}>
                <p className={'font-jetbrains-mono text-[11px] uppercase tracking-[0.28em] text-[#7f8b99]'}>{t.projectPageEyebrow}</p>
                <h1 className={'max-w-4xl text-3xl font-semibold leading-[1.02] text-[#f2f5f7] sm:text-4xl md:text-5xl'}>{project.title}</h1>
                <p className={'max-w-3xl text-sm leading-7 text-[#9eabb8] md:text-base'}>{project.summary}</p>
              </div>

              <div className={'grid gap-4 self-start'}>
                <div className={`rounded-xl border px-4 py-3.5 ${statusClassNames[project.projectStatus]}`}>
                  <p className={'mb-2 font-jetbrains-mono text-[11px] uppercase tracking-[0.24em] text-[#738090]'}>{t.projectStatusLabel}</p>
                  <p className={'text-sm font-medium uppercase tracking-[0.08em]'}>{statusLabels[locale as Locale][project.projectStatus]}</p>
                </div>
                <div className={'rounded-xl border border-white/6 bg-[#23282f] px-4 py-3.5'}>
                  <p className={'mb-2 font-jetbrains-mono text-[11px] uppercase tracking-[0.24em] text-[#738090]'}>{t.projectStartDateLabel}</p>
                  <p className={'text-sm font-medium text-[#e5ebf0]'}>{dateFormatter.format(new Date(project.startDate))}</p>
                </div>
              </div>
            </div>

            {project.myContribution ? (
              <div className={'rounded-xl border border-white/6 bg-[#23282f] px-4 py-3.5'}>
                <p className={'mb-2 font-jetbrains-mono text-[11px] uppercase tracking-[0.24em] text-[#738090]'}>{t.projectContributionLabel}</p>
                <p className={'text-sm leading-7 text-[#d6dde5]'}>{project.myContribution}</p>
              </div>
            ) : null}
          </div>
        </header>

        {mainImage ? <ProjectGallery mainImage={mainImage} images={galleryImages} /> : null}

        <div className={'grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]'}>
          <article className={'min-w-0 rounded-[24px] border border-white/6 bg-[#1d2228] p-6 md:p-8'}>
            <div className={'mb-8 flex items-end justify-between gap-4 border-b border-white/6 pb-5'}>
              <h2 className={'text-2xl font-semibold text-[#eef2f6] md:text-3xl'}>{t.projectOverviewTitle}</h2>
            </div>

            {content ? (
              <div className={'project-article project-article-board'}>
                <RichText data={content as any} />
              </div>
            ) : (
              <p className={'text-sm leading-8 text-[#aab5c0] md:text-base'}>{project.summary}</p>
            )}
          </article>

          <aside className={'space-y-6'}>
            <div className={'rounded-[24px] border border-white/6 bg-[#1d2228] p-5'}>
              <p className={'mb-3 font-jetbrains-mono text-[11px] uppercase tracking-[0.24em] text-[#738090]'}>{t.projectTagsLabel}</p>
              <div className={'flex flex-wrap gap-2'}>
                {project.tags?.length ? (
                  project.tags.map(({ id, tag }) => (
                    <span
                      key={id ?? tag}
                      className={'inline-flex rounded-md border border-white/8 bg-[#23282f] px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[#c4ccd5]'}
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <p className={'text-sm text-[#6f7b89]'}>{t.projectTagsEmpty}</p>
                )}
              </div>
            </div>

            <div className={'rounded-[24px] border border-white/6 bg-[#1d2228] p-5'}>
              <p className={'mb-3 font-jetbrains-mono text-[11px] uppercase tracking-[0.24em] text-[#738090]'}>{t.projectAuthorsLabel}</p>
              <div className={'space-y-3'}>
                {people.length ? (
                  people.map((person) => {
                    const profileImage = person.profileImage && typeof person.profileImage === 'object' ? (person.profileImage as Media) : null
                    const initials = person.fullName
                      .split(' ')
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((part) => part[0]?.toUpperCase() ?? '')
                      .join('')
                    const cardClassName = person.socialMediaLink
                      ? 'flex items-center gap-3 rounded-lg border border-white/6 bg-[#23282f] px-3 py-2 text-sm text-[#d6dde5] transition hover:border-white/12 hover:bg-[#2a3038]'
                      : 'flex items-center gap-3 rounded-lg border border-white/6 bg-[#23282f] px-3 py-2 text-sm text-[#d6dde5]'

                    const content = (
                      <div className={cardClassName}>
                        <div className={'relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/8 bg-[#1a1f25]'}>
                          {profileImage?.url ? (
                            <Image
                              src={profileImage.url}
                              alt={profileImage.alt}
                              fill
                              className={'object-cover'}
                              sizes={'40px'}
                            />
                          ) : (
                            <div className={'flex h-full w-full items-center justify-center font-jetbrains-mono text-[11px] uppercase tracking-[0.08em] text-[#c7d0d9]'}>
                              {initials || person.fullName.slice(0, 1).toUpperCase()}
                            </div>
                          )}
                        </div>

                        <div className={'min-w-0 flex-1'}>
                          <p className={'truncate font-medium text-[#eef2f6]'}>{person.fullName}</p>
                        </div>
                      </div>
                    )

                    return person.socialMediaLink ? (
                      <a
                        key={person.id}
                        href={person.socialMediaLink}
                        target={'_blank'}
                        rel={'noreferrer noopener'}
                        className={'block'}
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={person.id}>{content}</div>
                    )
                  })
                ) : (
                  <p className={'text-sm text-[#6f7b89]'}>{t.projectAuthorsEmpty}</p>
                )}
              </div>
            </div>

            <div className={'rounded-[24px] border border-white/6 bg-[#1d2228] p-5'}>
              <p className={'mb-3 font-jetbrains-mono text-[11px] uppercase tracking-[0.24em] text-[#738090]'}>{t.projectSkillsLabel}</p>
              <div className={'space-y-3'}>
                {skills.length ? (
                  skills.map((skill) => (
                    <div key={skill.id} className={'flex items-center gap-3 rounded-lg border border-white/6 bg-[#23282f] px-3 py-2 text-sm text-[#d6dde5]'}>
                      <span className={'flex h-[18px] w-[18px] shrink-0 items-center justify-center text-[#9bacbd]'}>
                        <SkillIcon value={skill.icon} />
                      </span>
                      <span>{skill.name}</span>
                    </div>
                  ))
                ) : (
                  <p className={'text-sm text-[#6f7b89]'}>{t.projectSkillsEmpty}</p>
                )}
              </div>
            </div>

            {mediaLinks.length ? (
              <div className={'rounded-[24px] border border-white/6 bg-[#1d2228] p-5'}>
                <p className={'mb-3 font-jetbrains-mono text-[11px] uppercase tracking-[0.24em] text-[#738090]'}>{t.projectMediaLinksLabel}</p>
                <div className={'space-y-3'}>
                  {mediaLinks.map((mediaLink: NonNullable<ProjectWithContentAndGallery['mediaLinks']>[number]) => {
                    const { icon: Icon, hostname } = getMediaLinkMeta(mediaLink.url)

                    return (
                      <a
                        key={mediaLink.id ?? mediaLink.url}
                        href={mediaLink.url}
                        target={'_blank'}
                        rel={'noreferrer noopener'}
                        className={'flex items-center gap-3 rounded-lg border border-white/6 bg-[#23282f] px-3 py-2 text-sm text-[#d6dde5] transition hover:border-white/12 hover:bg-[#2a3038]'}
                      >
                        <span className={'flex h-[18px] w-[18px] shrink-0 items-center justify-center text-[#9bacbd]'}>
                          <Icon />
                        </span>
                        <span className={'min-w-0 flex-1'}>
                          <span className={'block truncate text-[#eef2f6]'}>{mediaLink.label}</span>
                          <span className={'block truncate text-xs text-[#7f8b99]'}>{hostname}</span>
                        </span>
                      </a>
                    )
                  })}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </section>
  )
}





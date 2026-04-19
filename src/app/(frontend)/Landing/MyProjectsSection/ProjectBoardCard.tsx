import Image from 'next/image'
import Link from 'next/link'
import { FaRegClock } from 'react-icons/fa'

import type { Locale } from '@/i18n/config'
import type { Media, Person, Project } from '@/payload-types'

import { getTagClassName, localeMap } from '@/app/(frontend)/Landing/projects.utils'

type ProjectBoardCardProps = {
  locale: Locale
  project: Project
}

export default function ProjectBoardCard({ locale, project }: ProjectBoardCardProps) {
  const projectIdentifier = project.slug || String(project.id)
  const projectHref = `/${locale}/projects/${projectIdentifier}`
  const thumbnail = typeof project.thumbnail === 'object' ? (project.thumbnail as Media) : null
  const allAuthors = (project.people ?? []).filter((person): person is Person => typeof person === 'object')
  const authors = allAuthors.slice(0, 4)
  const hiddenAuthorsCount = Math.max(allAuthors.length - authors.length, 0)
  const dateFormatter = new Intl.DateTimeFormat(localeMap[locale], {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <Link
      href={projectHref}
      className={
        'group block rounded-xl border border-white/6 bg-[#23282f] p-4 transition duration-150 hover:border-white/12 hover:bg-[#2a3038]'
      }
    >
      <article className={'space-y-3'}>
        <div className={'flex items-start justify-between gap-3'}>
          <div className={'min-w-0 space-y-2'}>
            <p className={'font-jetbrains-mono text-[11px] uppercase tracking-[0.18em] text-[#7f8b99]'}>{project.slug || `PRJ-${project.id}`}</p>
            <h3 className={'text-base font-medium leading-6 text-[#d9dee5] transition group-hover:text-white'}>{project.title}</h3>
          </div>

          <div className={'relative mt-0.5 h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-white/8 bg-[#1b2026]'}>
            {thumbnail?.url ? (
              <Image
                src={thumbnail.url}
                alt={thumbnail.alt}
                fill
                className={'object-cover'}
                sizes={'56px'}
              />
            ) : (
              <div className={'flex h-full w-full items-center justify-center font-jetbrains-mono text-sm uppercase tracking-[0.12em] text-[#7f8b99]'}>
                {project.title.slice(0, 1)}
              </div>
            )}
          </div>
        </div>

        <p className={'line-clamp-4 text-sm leading-6 text-[#9aa5b3]'}>{project.summary}</p>

        {project.tags?.length ? (
          <div className={'flex flex-wrap gap-2 pt-1'}>
            {project.tags.slice(0, 3).map(({ id, tag }) => (
              <span
                key={id ?? tag}
                className={`inline-flex rounded-md border px-2 py-1 text-[10px] uppercase tracking-[0.14em] ${getTagClassName(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className={'flex items-end justify-between gap-3 pt-1'}>
          <div className={`flex items-center ${authors.length ? 'min-h-8' : ''}`}>
            {authors.length ? (
              <div className={'flex items-center'}>
                {authors.map((author, index) => {
                  const profileImage = author.profileImage && typeof author.profileImage === 'object' ? (author.profileImage as Media) : null
                  const initials = author.fullName
                    .split(' ')
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((part) => part[0]?.toUpperCase() ?? '')
                    .join('')

                  return (
                    <div
                      key={author.id}
                      className={'relative -ml-2 h-8 w-8 overflow-hidden rounded-full border-2 border-[#23282f] bg-[#1a1f25] shadow-[0_4px_12px_rgba(0,0,0,0.22)] first:ml-0'}
                      title={author.fullName}
                    >
                      {profileImage?.url ? (
                        <Image
                          src={profileImage.url}
                          alt={profileImage.alt}
                          fill
                          className={'object-cover'}
                          sizes={'32px'}
                          priority={index === 0}
                        />
                      ) : (
                        <div className={'flex h-full w-full items-center justify-center font-jetbrains-mono text-[10px] uppercase tracking-[0.08em] text-[#c7d0d9]'}>
                          {initials || author.fullName.slice(0, 1).toUpperCase()}
                        </div>
                      )}
                    </div>
                  )
                })}

                {hiddenAuthorsCount > 0 ? (
                  <div
                    className={
                      'relative -ml-2 flex h-8 min-w-8 items-center justify-center rounded-full border-2 border-[#23282f] bg-[#303741] px-2 font-jetbrains-mono text-[10px] uppercase tracking-[0.08em] text-[#d4dbe3] shadow-[0_4px_12px_rgba(0,0,0,0.22)]'
                    }
                    title={`${hiddenAuthorsCount} more`}
                  >
                    +{hiddenAuthorsCount}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <span className={'inline-flex items-center gap-2 rounded-full border border-white/8 bg-[#1c2127] px-3 py-1.5 font-jetbrains-mono text-[10px] uppercase tracking-[0.14em] text-[#9aa5b3]'}>
            <FaRegClock className={'text-[11px] text-[#7f8b99]'} />
            <span>Od {dateFormatter.format(new Date(project.startDate))}</span>
          </span>
        </div>
      </article>
    </Link>
  )
}

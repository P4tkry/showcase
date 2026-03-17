import Image from 'next/image'

import type { Locale } from '@/i18n/config'
import type { Media, Project } from '@/payload-types'

import { getTagClassName, localeMap, statusClasses, statusLabels } from '@/app/(frontend)/Landing/projects.utils'

type ProjectCardProps = {
  locale: Locale
  project: Project
}

export default function ProjectCard({ locale, project }: ProjectCardProps) {
  const dateFormatter = new Intl.DateTimeFormat(localeMap[locale], {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  const thumbnail = typeof project.thumbnail === 'object' ? (project.thumbnail as Media) : null

  return (
    <article className={'overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]'}>
      <div className={'relative aspect-video bg-white/5'}>
        {thumbnail?.url ? (
          <Image
            src={thumbnail.url}
            alt={thumbnail.alt}
            fill
            className={'object-cover'}
            sizes={'(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw'}
          />
        ) : null}
        <div className={`absolute left-4 top-4 inline-flex rounded-full border px-3 py-1 text-xs uppercase tracking-[0.22em] backdrop-blur-sm ${statusClasses[project.status]}`}>
          {statusLabels[locale][project.status]}
        </div>
        <div className={'absolute right-4 top-4 inline-flex rounded-full border border-white/10 bg-black/55 px-3 py-1 text-xs uppercase tracking-[0.18em] text-gray-200 backdrop-blur-sm'}>
          {dateFormatter.format(new Date(project.startDate))}
        </div>
      </div>
      <div className={'p-5'}>
        <div className={'mb-4 flex flex-wrap items-center gap-3'}>
          {project.tags?.map(({ id, tag }) => (
            <div
              key={id ?? tag}
              className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em] ${getTagClassName(tag)}`}
            >
              {tag}
            </div>
          ))}
        </div>
        <h3 className={'mb-3 text-xl font-semibold text-white md:text-2xl'}>{project.title}</h3>
        <p className={'text-sm leading-6 text-gray-400'}>{project.summary}</p>
      </div>
    </article>
  )
}

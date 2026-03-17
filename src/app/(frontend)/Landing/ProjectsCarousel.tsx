'use client'

import { useRef } from 'react'

import type { Locale } from '@/i18n/config'
import type { Project } from '@/payload-types'

import ProjectCard from '@/app/(frontend)/Landing/ProjectCard'

type ProjectsCarouselProps = {
  locale: Locale
  projects: Project[]
}

export default function ProjectsCarousel({ locale, projects }: ProjectsCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null)

  const scrollByAmount = (direction: 'prev' | 'next') => {
    const track = trackRef.current

    if (!track) {
      return
    }

    const amount = Math.max(track.clientWidth * 0.82, 320)
    track.scrollBy({
      left: direction === 'next' ? amount : -amount,
      behavior: 'smooth',
    })
  }

  return (
    <div className={'relative'}>
      <div className={'mb-5 flex justify-end gap-3'}>
        <button
          type={'button'}
          onClick={() => scrollByAmount('prev')}
          className={'inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white transition hover:bg-white/10'}
          aria-label={'Previous projects'}
        >
          ←
        </button>
        <button
          type={'button'}
          onClick={() => scrollByAmount('next')}
          className={'inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white transition hover:bg-white/10'}
          aria-label={'Next projects'}
        >
          →
        </button>
      </div>

      <div
        ref={trackRef}
        className={'flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'}
      >
        {projects.map((project) => (
          <div key={project.id} className={'w-[88vw] max-w-[420px] flex-none snap-start md:w-[46vw] xl:w-[32vw]'}>
            <ProjectCard locale={locale} project={project} />
          </div>
        ))}
      </div>
    </div>
  )
}

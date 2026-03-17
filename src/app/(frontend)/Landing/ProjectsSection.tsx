import { getTranslations } from '@/i18n/translations'
import type { Locale } from '@/i18n/config'
import type { Project } from '@/payload-types'

import ProjectCard from '@/app/(frontend)/Landing/ProjectCard'
import ProjectsCarousel from '@/app/(frontend)/Landing/ProjectsCarousel'

type ProjectsSectionProps = {
  locale: Locale
  projects: Project[]
}

export default function ProjectsSection({ locale, projects }: ProjectsSectionProps) {
  const t = getTranslations(locale)
  const shouldUseCarousel = projects.length > 6

  return (
    <section id={'projects'} className={'snap-section border-t border-white/10'}>
      <div className={'mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center px-6 py-16 md:px-10'}>
        <p className={'mb-4 font-jetbrains-mono text-sm uppercase tracking-[0.28em] text-orange-400'}>{t.projectsEyebrow}</p>
        <h2 className={'mb-5 text-3xl font-semibold sm:text-4xl md:text-5xl'}>{t.projectsTitle}</h2>
        <p className={'mb-12 max-w-3xl text-base text-gray-400 md:text-lg'}>{t.projectsLead}</p>

        {projects.length === 0 ? (
          <p className={'text-lg text-gray-400'}>{t.noProjects}</p>
        ) : shouldUseCarousel ? (
          <ProjectsCarousel locale={locale} projects={projects} />
        ) : (
          <div className={'grid gap-6 md:grid-cols-2 xl:grid-cols-3'}>
            {projects.map((project) => (
              <ProjectCard key={project.id} locale={locale} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

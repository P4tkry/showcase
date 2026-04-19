import type { Locale } from '@/i18n/config'
import type { Project } from '@/payload-types'

import ProjectBoardCard from './ProjectBoardCard'

type ProjectBoardColumnProps = {
  locale: Locale
  projects: Project[]
  title: string
}

export default function ProjectBoardColumn({ locale, projects, title }: ProjectBoardColumnProps) {
  return (
    <div className={'flex min-h-[28rem] flex-col rounded-2xl border border-white/6 bg-[#1d2228]'}>
      <div className={'border-b border-white/6 px-5 py-4'}>
        <div className={'flex items-center justify-between gap-3'}>
          <h3 className={'font-jetbrains-mono text-xs uppercase tracking-[0.22em] text-[#c8d0d8]'}>{title}</h3>
          <span className={'rounded-md bg-[#2a3038] px-2.5 py-1 font-jetbrains-mono text-[11px] text-[#8f9baa]'}>{projects.length}</span>
        </div>
      </div>

      <div className={'flex-1 space-y-3 p-3'}>
        {projects.length > 0 ? (
          projects.map((project) => <ProjectBoardCard key={project.id} locale={locale} project={project} />)
        ) : (
          <div className={'rounded-xl border border-dashed border-white/8 bg-[#20252b] px-4 py-8 text-center text-sm text-[#697482]'}>
            Brak projektów
          </div>
        )}
      </div>
    </div>
  )
}

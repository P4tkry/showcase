'use client'

import { useMemo, useState } from 'react'

import { getTranslations } from '@/i18n/translations'
import type { Locale } from '@/i18n/config'
import type { Person, Project, Skill } from '@/payload-types'

import { statusLabels } from '@/app/(frontend)/Landing/projects.utils'
import FilterMultiSelect from './FilterMultiSelect'
import ProjectBoardColumn from './ProjectBoardColumn'

type MyProjectsSectionProps = {
  locale: Locale
  projects: Project[]
}

export default function MyProjectsSection({ locale, projects }: MyProjectsSectionProps) {
  const t = getTranslations(locale)
  const [selectedPersonIds, setSelectedPersonIds] = useState<string[]>([])
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([])

  const peopleOptions = useMemo(() => {
    const peopleMap = new Map<number, Person>()

    projects.forEach((project) => {
      ;(project.people ?? []).forEach((person) => {
        if (typeof person === 'object' && person?.id) {
          peopleMap.set(person.id, person as Person)
        }
      })
    })

    return Array.from(peopleMap.values())
      .sort((left, right) => left.fullName.localeCompare(right.fullName))
      .map((person) => ({ label: person.fullName, value: String(person.id) }))
  }, [projects])

  const skillOptions = useMemo(() => {
    const skillsMap = new Map<number, Skill>()

    projects.forEach((project) => {
      ;(project.skills ?? []).forEach((skill) => {
        if (typeof skill === 'object' && skill?.id) {
          skillsMap.set(skill.id, skill as Skill)
        }
      })
    })

    return Array.from(skillsMap.values())
      .sort((left, right) => left.name.localeCompare(right.name))
      .map((skill) => ({ label: skill.name, value: String(skill.id) }))
  }, [projects])

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesPerson =
        selectedPersonIds.length === 0 ||
        (project.people ?? []).some((person) => typeof person === 'object' && selectedPersonIds.includes(String(person.id)))

      const matchesSkill =
        selectedSkillIds.length === 0 ||
        (project.skills ?? []).some((skill) => typeof skill === 'object' && selectedSkillIds.includes(String(skill.id)))

      return matchesPerson && matchesSkill
    })
  }, [projects, selectedPersonIds, selectedSkillIds])

  const plannedProjects = filteredProjects.filter((project) => project.projectStatus === 'planned')
  const inProgressProjects = filteredProjects.filter((project) => project.projectStatus === 'in-progress')
  const completedProjects = filteredProjects.filter((project) => project.projectStatus === 'completed')

  return (
    <section id={'projects'} className={'snap-section border-t border-[#31363d] bg-[#20252b]'}>
      <div className={'mx-auto flex min-h-screen max-w-[1480px] flex-col justify-center px-4 py-14 md:px-8 xl:px-10'}>
        <div className={'mb-8 max-w-3xl'}>
          <p className={'mb-4 font-jetbrains-mono text-xs uppercase tracking-[0.28em] text-[#8e99a7]'}>{t.projectsEyebrow}</p>
          <h2 className={'mb-4 text-3xl font-semibold text-[#e6ebf0] sm:text-4xl md:text-5xl'}>{t.projectsTitle}</h2>
          <p className={'text-sm leading-7 text-[#9aa5b3] md:text-base'}>{t.projectsLead}</p>
        </div>

        {projects.length === 0 ? (
          <p className={'text-lg text-[#9aa5b3]'}>{t.noProjects}</p>
        ) : (
          <>
            <div className={'mb-6 grid gap-4 md:grid-cols-2'}>
              <FilterMultiSelect
                label={t.projectsFilterPeople}
                allLabel={t.projectsFilterAllPeople}
                options={peopleOptions}
                selectedValues={selectedPersonIds}
                onChange={setSelectedPersonIds}
              />

              <FilterMultiSelect
                label={t.projectsFilterSkills}
                allLabel={t.projectsFilterAllSkills}
                options={skillOptions}
                selectedValues={selectedSkillIds}
                onChange={setSelectedSkillIds}
              />
            </div>

            <div className={'grid gap-4 lg:grid-cols-3'}>
              <ProjectBoardColumn locale={locale} projects={plannedProjects} title={statusLabels[locale].planned} />
              <ProjectBoardColumn locale={locale} projects={inProgressProjects} title={statusLabels[locale]['in-progress']} />
              <ProjectBoardColumn locale={locale} projects={completedProjects} title={statusLabels[locale].completed} />
            </div>
          </>
        )}
      </div>
    </section>
  )
}

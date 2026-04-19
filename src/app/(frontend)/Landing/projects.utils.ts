import type { Locale } from '@/i18n/config'
import type { Project } from '@/payload-types'

type ProjectStatus = Project['projectStatus']

export const statusLabels: Record<Locale, Record<ProjectStatus, string>> = {
  en: {
    planned: 'Planned',
    'in-progress': 'In progress',
    completed: 'Completed',
  },
  pl: {
    planned: 'Planowany',
    'in-progress': 'W trakcie',
    completed: 'Ukończony',
  },
}

export const statusClassNames: Record<ProjectStatus, string> = {
  planned: 'border-amber-400/20 bg-amber-950/18 text-amber-100',
  'in-progress': 'border-sky-400/20 bg-sky-950/18 text-sky-100',
  completed: 'border-emerald-400/20 bg-emerald-950/18 text-emerald-100',
}

const tagClasses = [
  'border-cyan-400/20 bg-cyan-950/40 text-cyan-200',
  'border-fuchsia-400/20 bg-fuchsia-950/40 text-fuchsia-200',
  'border-lime-400/20 bg-lime-950/40 text-lime-200',
  'border-rose-400/20 bg-rose-950/40 text-rose-200',
  'border-violet-400/20 bg-violet-950/40 text-violet-200',
  'border-orange-400/20 bg-orange-950/40 text-orange-200',
] as const

export const getTagClassName = (tag: string) => {
  let hash = 0

  for (let index = 0; index < tag.length; index += 1) {
    hash = (hash * 31 + tag.charCodeAt(index)) >>> 0
  }

  return tagClasses[hash % tagClasses.length]
}

export const localeMap: Record<Locale, string> = {
  en: 'en-US',
  pl: 'pl-PL',
}

import type { Locale } from '@/i18n/config'

type Translations = {
  introPrefix: string
  introSuffix: string
  visitorPrefix: string
  visitorSuffix: string
  heroCta: string
  projectsEyebrow: string
  projectsTitle: string
  projectsLead: string
  projectStatusLabel: string
  projectTagsLabel: string
  projectStartDateLabel: string
  noProjects: string
}

const translations: Record<Locale, Translations> = {
  en: {
    introPrefix: 'Hi, my name is',
    introSuffix: 'Patryk Rusak...',
    visitorPrefix: "You're the",
    visitorSuffix: 'person watching this page.',
    heroCta: 'Learn more',
    projectsEyebrow: 'Selected work',
    projectsTitle: 'My projects',
    projectsLead: 'A focused snapshot of things I build across software, systems, and product execution.',
    projectStatusLabel: 'Status',
    projectTagsLabel: 'Tags',
    projectStartDateLabel: 'Started',
    noProjects: 'No projects have been added yet.',
  },
  pl: {
    introPrefix: 'Cześć, mam na imię',
    introSuffix: 'Patryk Rusak...',
    visitorPrefix: 'Jesteś',
    visitorSuffix: 'osobą odwiedzającą tę stronę.',
    heroCta: 'Dowiedz się więcej',
    projectsEyebrow: 'To robię',
    projectsTitle: 'Moje projekty',
    projectsLead: 'Krótki przekrój rzeczy, którymi w wolnym czasie zajmuję się zawodowo i hobbystycznie.',
    projectStatusLabel: 'Status',
    projectTagsLabel: 'Tagi',
    projectStartDateLabel: 'Start',
    noProjects: 'Nie dodano jeszcze żadnych projektów.',
  },
}

export const getTranslations = (locale: Locale): Translations => translations[locale]

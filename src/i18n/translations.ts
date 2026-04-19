import type { Locale } from '@/i18n/config'

type Translations = {
  introPrefix: string
  introSuffix: string
  visitorPrefix: string
  visitorSuffix: string
  heroCta: string
  experienceEyebrow: string
  experienceTitle: string
  experienceLead: string
  experienceCardLabel: string
  experienceEmpty: string
  certificatesEyebrow: string
  certificatesTitle: string
  certificatesLead: string
  certificatesEmpty: string
  certificatesViewCredential: string
  certificatesCredentialIdLabel: string
  terminalEyebrow: string
  projectsEyebrow: string
  projectsTitle: string
  projectsLead: string
  projectsFilterPeople: string
  projectsFilterSkills: string
  projectsFilterAllPeople: string
  projectsFilterAllSkills: string
  projectStatusLabel: string
  projectContributionLabel: string
  projectTagsLabel: string
  projectAuthorsLabel: string
  projectAuthorsEmpty: string
  projectSkillsLabel: string
  projectMediaLinksLabel: string
  projectStartDateLabel: string
  backToProjects: string
  projectPageEyebrow: string
  projectOverviewTitle: string
  projectTagsEmpty: string
  projectSkillsEmpty: string
  projectMediaLinksEmpty: string
  noProjects: string
}

const translations: Record<Locale, Translations> = {
  en: {
    introPrefix: 'Hi, my name is',
    introSuffix: 'Patryk Rusak...',
    visitorPrefix: "You're the",
    visitorSuffix: 'person watching this page.',
    heroCta: 'Learn more',
    experienceEyebrow: 'Journey',
    experienceTitle: 'My timeline',
    experienceLead: 'Key stages that shaped how I learn, build and grow.',
    experienceCardLabel: 'Timeline entry',
    experienceEmpty: 'No timeline entries have been added yet.',
    certificatesEyebrow: 'Certificates',
    certificatesTitle: 'Certificates',
    certificatesLead: 'Selected certifications that confirm my knowledge and practical skills.',
    certificatesEmpty: 'Certificates will appear here once they are added.',
    certificatesViewCredential: 'View credential',
    certificatesCredentialIdLabel: 'Credential ID',
    terminalEyebrow: 'Terminal',
    projectsEyebrow: 'Selected work',
    projectsTitle: 'My projects',
    projectsLead: 'A focused snapshot of things I build across software, systems, and product execution.',
    projectsFilterPeople: 'People',
    projectsFilterSkills: 'Skills',
    projectsFilterAllPeople: 'All people',
    projectsFilterAllSkills: 'All skills',
    projectStatusLabel: 'Status',
    projectContributionLabel: 'What I worked on',
    projectTagsLabel: 'Tags',
    projectAuthorsLabel: 'Authors',
    projectAuthorsEmpty: 'No authors have been assigned.',
    projectSkillsLabel: 'Skills',
    projectMediaLinksLabel: 'Media',
    projectStartDateLabel: 'Started',
    backToProjects: 'Back to projects',
    projectPageEyebrow: 'Project overview',
    projectOverviewTitle: 'About this project',
    projectTagsEmpty: 'No tags have been added.',
    projectSkillsEmpty: 'No skills have been assigned.',
    projectMediaLinksEmpty: 'No media links have been added.',
    noProjects: 'No projects have been added yet.',
  },
  pl: {
    introPrefix: 'Cześć, mam na imię',
    introSuffix: 'Patryk Rusak...',
    visitorPrefix: 'Jesteś',
    visitorSuffix: 'osobą odwiedzającą tę stronę.',
    heroCta: 'Dowiedz się więcej',
    experienceEyebrow: 'Historia',
    experienceTitle: 'Moja oś czasu',
    experienceLead: 'Najważniejsze etapy, które zbudowały mój sposób myślenia i pracy.',
    experienceCardLabel: 'Etap',
    experienceEmpty: 'Nie dodano jeszcze wpisów na osi czasu.',
    certificatesEyebrow: 'Certyfikaty',
    certificatesTitle: 'Certyfikaty',
    certificatesLead: 'Wybrane certyfikaty potwierdzające moją wiedzę i praktyczne umiejętności.',
    certificatesEmpty: 'Certyfikaty pojawią się tutaj po ich dodaniu.',
    certificatesViewCredential: 'Zobacz certyfikat',
    certificatesCredentialIdLabel: 'ID certyfikatu',
    terminalEyebrow: 'Terminal',
    projectsEyebrow: 'To robię',
    projectsTitle: 'Moje projekty',
    projectsLead: 'Krótki przekrój rzeczy, którymi w wolnym czasie zajmuję się zawodowo i hobbystycznie.',
    projectsFilterPeople: 'Ludzie',
    projectsFilterSkills: 'Umiejętności',
    projectsFilterAllPeople: 'Wszyscy',
    projectsFilterAllSkills: 'Wszystkie',
    projectStatusLabel: 'Status',
    projectContributionLabel: 'Za co odpowiadałem',
    projectTagsLabel: 'Tagi',
    projectAuthorsLabel: 'Autorzy',
    projectAuthorsEmpty: 'Nie przypisano autorów.',
    projectSkillsLabel: 'Umiejętności',
    projectMediaLinksLabel: 'Media',
    projectStartDateLabel: 'Start',
    backToProjects: 'Powrót do projektów',
    projectPageEyebrow: 'O projekcie',
    projectOverviewTitle: 'Opis projektu',
    projectTagsEmpty: 'Nie dodano tagów.',
    projectSkillsEmpty: 'Nie przypisano umiejętności.',
    projectMediaLinksEmpty: 'Nie dodano linków do mediów.',
    noProjects: 'Nie dodano jeszcze żadnych projektów.',
  },
}

export const getTranslations = (locale: Locale): Translations => translations[locale]

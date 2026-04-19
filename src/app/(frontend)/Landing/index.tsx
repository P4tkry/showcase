import { getPayload } from 'payload'

import CertificatesSection from '@/app/(frontend)/Landing/CertificatesSection'
import ContactFooter from '@/app/(frontend)/Landing/ContactFooter'
import config from '@payload-config'
import ExperienceSection from '@/app/(frontend)/Landing/ExperienceSection'
import HeroSection from '@/app/(frontend)/Landing/HeroSection'
import MyProjectsSection from '@/app/(frontend)/Landing/MyProjectsSection'
import TerminalSection from '@/app/(frontend)/Landing/TerminalSection'
import type { Locale } from '@/i18n/config'

export const dynamic = 'force-dynamic'

export default async function LandingPage({ locale }: { locale: Locale }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const visitsCount = await payload.count({
    collection: 'visits',
  })

  const landingPageData = await payload.findGlobal({
    slug: 'landing-page',
    locale: locale as 'en' | 'pl',
  })

  const projects = await payload.find({
    collection: 'projects',
    locale: locale as 'en' | 'pl',
    depth: 1,
    limit: 12,
    sort: '-createdAt',
  })

  const experiences = await payload.find({
    collection: 'experiences',
    locale: locale as 'en' | 'pl',
    depth: 0,
    limit: 50,
    sort: 'startDate',
  })

  const certificates = await payload.find({
    collection: 'certificates',
    locale: locale as 'en' | 'pl',
    depth: 1,
    limit: 50,
    sort: '-issuedAt',
    where: {
      visible: {
        equals: true,
      },
    },
  })

  const commands = await payload.find({
    collection: 'commands' as any,
    depth: 0,
    limit: 100,
    pagination: false,
    sort: ['sortOrder', 'command'],
    where: {
      visible: {
        equals: true,
      },
    },
  })

  return (
    <div className={'relative isolate w-full'}>
      <div className={'relative z-10'}>
        <HeroSection aboutMe={landingPageData.aboutMe} locale={locale} visitsCount={visitsCount.totalDocs} />
        <MyProjectsSection locale={locale} projects={projects.docs} />
        <ExperienceSection locale={locale} entries={experiences.docs} />
        <CertificatesSection locale={locale} entries={certificates.docs} />
        <TerminalSection locale={locale} commands={commands.docs} />
        <ContactFooter locale={locale} />
      </div>
    </div>
  )
}

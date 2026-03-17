'use server'

import { getPayload } from 'payload'

import config from '@payload-config'
import HeroSection from '@/app/(frontend)/Landing/HeroSection'
import ProjectsSection from '@/app/(frontend)/Landing/ProjectsSection'
import type { Locale } from '@/i18n/config'

const payloadConfig = await config
const payload = await getPayload({ config: payloadConfig })

export default async function LandingPage({ locale }: { locale: Locale }) {
  await payload.create({
    collection: 'visits',
    data: {
      timestamp: new Date().toISOString(),
    },
  })

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

  return (
    <div className={'relative isolate w-full'}>
      <div className={'relative z-10'}>
        <HeroSection aboutMe={landingPageData.aboutMe} locale={locale} visitsCount={visitsCount.totalDocs} />
        <ProjectsSection locale={locale} projects={projects.docs} />
      </div>
    </div>
  )
}

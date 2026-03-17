import { notFound } from 'next/navigation'

import LandingPage from '@/app/(frontend)/Landing'
import { isLocale } from '@/i18n/config'

type HomePageProps = {
  params: Promise<{ locale: string }> | { locale: string }
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await Promise.resolve(params)

  if (!isLocale(locale)) {
    notFound()
  }

  return <LandingPage locale={locale} />
}

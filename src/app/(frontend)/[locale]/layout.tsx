import React from 'react'
import { Inter, Open_Sans, JetBrains_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'

import { isLocale } from '@/i18n/config'
import '../styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

const inter = Inter({ subsets: ['latin'] })
const openSans = Open_Sans({ subsets: ['latin'] })
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] })

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }> | { locale: string }
}

export default async function LocaleLayout(props: LayoutProps) {
  const { children, params } = props
  const { locale } = await Promise.resolve(params)

  if (!isLocale(locale)) {
    notFound()
  }

  return (
    <html lang={locale} className={`${inter.className} ${openSans.className} ${jetBrainsMono.className} text-gray-200`}>
      <body>
        <main className={'flex min-h-screen w-full flex-col items-center justify-center'}>
          {children}
        </main>
      </body>
    </html>
  )
}


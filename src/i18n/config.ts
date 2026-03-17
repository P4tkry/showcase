export const locales = ['pl', 'en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'pl'

export const isLocale = (value: string): value is Locale => locales.includes(value as Locale)

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import OpenAI from 'openai'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Visits } from './collections/Visits'
import { Projects } from './collections/Projects'
import { Skills } from './collections/Skills'
import { People } from './collections/People'
import { Experiences } from './collections/Experiences'
import { Certificates } from './collections/Certificates'
import { Commands } from './collections/Commands'
import { CertificateScans } from './collections/CertificateScans'
import { migrations } from './migrations'
import { LandingPage } from '@/globals/LandingPage'
import { collectLexicalTextNodes, lexicalToPlainText, replaceLexicalTextNodes } from '@/lib/richText'
import { en } from '@payloadcms/translations/languages/en'
import { pl } from '@payloadcms/translations/languages/pl'

const CREDLY_BADGES_URL = process.env.CREDLY_BADGES_URL || 'https://www.credly.com/users/patryk-rusak.4706d45e/badges.json'

type CredlySkill = {
  name?: string | null
}

type CredlyIssuerEntity = {
  entity?: {
    name?: string | null
  } | null
}

type CredlyBadge = {
  badge_template?: {
    description?: string | null
    global_activity_url?: string | null
    image_url?: string | null
    name?: string | null
    skills?: CredlySkill[] | null
    type_category?: string | null
    url?: string | null
  } | null
  id?: string | null
  image_url?: string | null
  is_private_badge?: boolean | null
  issued_at?: string | null
  issued_at_date?: string | null
  issued_to?: string | null
  issuer?: {
    entities?: CredlyIssuerEntity[] | null
  } | null
  last_updated_at?: string | null
  updated_at?: string | null
  expires_at?: string | null
  expires_at_date?: string | null
}

const normalizeDate = (value: string | null | undefined) => {
  if (!value) {
    return null
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return date.toISOString()
}

const resolveCredlyIssuerName = (badge: CredlyBadge) => {
  const entities = Array.isArray(badge.issuer?.entities) ? badge.issuer.entities : []
  const primaryEntity = entities.find((entry) => typeof entry?.entity?.name === 'string' && entry.entity.name.trim().length > 0)

  if (typeof primaryEntity?.entity?.name === 'string') {
    return primaryEntity.entity.name.trim()
  }

  return 'Unknown issuer'
}

const mapCredlyBadgeToCertificate = (badge: CredlyBadge) => {
  const issuedAt = normalizeDate(badge.issued_at || badge.issued_at_date)

  if (!issuedAt || typeof badge.id !== 'string' || badge.id.trim().length === 0) {
    return null
  }

  const skills = Array.isArray(badge.badge_template?.skills) ? badge.badge_template.skills : []

  return {
    source: 'credly',
    visible: true,
    externalId: badge.id,
    title:
      typeof badge.badge_template?.name === 'string' && badge.badge_template.name.trim().length > 0
        ? badge.badge_template.name.trim()
        : 'Untitled badge',
    issuer: resolveCredlyIssuerName(badge),
    description:
      typeof badge.badge_template?.description === 'string' && badge.badge_template.description.trim().length > 0
        ? badge.badge_template.description.trim()
        : '',
    issuedAt,
    expiresAt: normalizeDate(badge.expires_at || badge.expires_at_date),
    issuedTo: typeof badge.issued_to === 'string' ? badge.issued_to : '',
    credentialIsPdf: false,
    imageUsesUpload: false,
    credentialUrl:
      typeof badge.badge_template?.url === 'string' && badge.badge_template.url.trim().length > 0
        ? badge.badge_template.url
        : '',
    globalActivityUrl:
      typeof badge.badge_template?.global_activity_url === 'string' && badge.badge_template.global_activity_url.trim().length > 0
        ? badge.badge_template.global_activity_url
        : '',
    imageUrl:
      typeof badge.image_url === 'string' && badge.image_url.trim().length > 0
        ? badge.image_url
        : typeof badge.badge_template?.image_url === 'string'
          ? badge.badge_template.image_url
          : '',
    sourceUpdatedAt: normalizeDate(badge.updated_at || badge.last_updated_at),
    skills: skills
      .filter((skill): skill is CredlySkill & { name: string } => typeof skill?.name === 'string' && skill.name.trim().length > 0)
      .map((skill) => ({
        name: skill.name.trim(),
      })),
  }
}

const improveProjectFieldEndpoint = {
  handler: async (req: any) => {
    if (!req.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ error: 'Missing OPENAI_API_KEY environment variable.' }, { status: 500 })
    }

    const body = await req.json?.()
    const locale = typeof body?.locale === 'string' ? body.locale : 'en'
    const field = typeof body?.field === 'string' ? body.field : ''
    const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : ''
    const targetText = typeof body?.targetText === 'string' ? body.targetText.trim() : ''
    const title = typeof body?.title === 'string' ? body.title.trim() : ''
    const myContribution = typeof body?.myContribution === 'string' ? body.myContribution.trim() : ''
    const summary = typeof body?.summary === 'string' ? body.summary.trim() : ''
    const content = typeof body?.content === 'string' ? body.content.trim() : ''

    if (!prompt) {
      return Response.json({ error: 'Prompt is required.' }, { status: 400 })
    }

    if (field !== 'summary' && field !== 'myContribution' && field !== 'content') {
      return Response.json({ error: 'Unsupported field.' }, { status: 400 })
    }

    const language = locale === 'pl' ? 'Polish' : 'English'
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    let result: any

    try {
      result = await openai.responses.create({
        input: [
          {
            content: [
              {
                text:
                  `You improve a single field inside a portfolio project CMS entry.\n` +
                  `Write in ${language}.\n` +
                  `Return valid JSON only with this exact shape: {"message":"string","text":"string"}.\n` +
                  `Edit only the requested target field.\n` +
                  `Preserve the original meaning unless the user explicitly requests a rewrite.\n` +
                  `Do not add markdown fences or explanations outside JSON.`,
                type: 'input_text',
              },
            ],
            role: 'developer',
          },
          {
            content: [
              {
                text:
                  `Target field: ${field}\n\n` +
                  `User instruction:\n${prompt}\n\n` +
                  `Project title:\n${title || '(empty)'}\n\n` +
                  `What I worked on:\n${myContribution || '(empty)'}\n\n` +
                  `Project summary:\n${summary || '(empty)'}\n\n` +
                  `Project content:\n${content || '(empty)'}\n\n` +
                  `Current target field text:\n${targetText || '(empty)'}`,
                type: 'input_text',
              },
            ],
            role: 'user',
          },
        ],
        model: process.env.OPENAI_PROJECT_WRITER_MODEL || 'gpt-4.1-mini',
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'OpenAI request failed.'

      return Response.json({ error: message }, { status: 502 })
    }

    const outputText =
      typeof result?.output_text === 'string'
        ? result.output_text
        : Array.isArray(result?.output)
          ? result.output
              .flatMap((entry: any) => (Array.isArray(entry?.content) ? entry.content : []))
              .map((entry: any) => (typeof entry?.text === 'string' ? entry.text : ''))
              .join('')
          : ''

    if (!outputText) {
      return Response.json({ error: 'OpenAI returned an empty response.' }, { status: 502 })
    }

    try {
      const parsed = JSON.parse(outputText)

      return Response.json({
        message: typeof parsed?.message === 'string' ? parsed.message : '',
        text: typeof parsed?.text === 'string' ? parsed.text : '',
      })
    } catch {
      return Response.json({ error: 'OpenAI returned invalid JSON.' }, { status: 502 })
    }
  },
  method: 'post' as const,
  path: '/ai/improve-project-field',
}

const translateProjectLocaleEndpoint = {
  handler: async (req: any) => {
    if (!req.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ error: 'Missing OPENAI_API_KEY environment variable.' }, { status: 500 })
    }

    const body = await req.json?.()
    const id = body?.id
    const collectionSlug = typeof body?.collectionSlug === 'string' ? body.collectionSlug : ''
    const sourceLocale = typeof body?.sourceLocale === 'string' ? body.sourceLocale : ''
    const targetLocale = typeof body?.targetLocale === 'string' ? body.targetLocale : ''

    if (collectionSlug !== 'projects') {
      return Response.json({ error: 'Unsupported collection.' }, { status: 400 })
    }

    if ((!['string', 'number'].includes(typeof id) || id === '') || !sourceLocale || !targetLocale) {
      return Response.json({ error: 'Missing translation parameters.' }, { status: 400 })
    }

    const readProjectForLocale = async (draft: boolean) => {
      return req.payload.findByID({
        collection: 'projects',
        depth: 0,
        draft,
        fallbackLocale: false,
        id,
        locale: sourceLocale,
      })
    }

    const extractSourceContent = (project: any) => {
      return {
        content: lexicalToPlainText(project?.content).trim(),
        contentLexical: project?.content && typeof project.content === 'object' ? project.content : null,
        myContribution: typeof project?.myContribution === 'string' ? project.myContribution.trim() : '',
        summary: typeof project?.summary === 'string' ? project.summary.trim() : '',
        title: typeof project?.title === 'string' ? project.title.trim() : '',
      }
    }

    let project: any

    try {
      project = await readProjectForLocale(true)
    } catch {
      try {
        project = await readProjectForLocale(false)
      } catch {
        return Response.json({ error: 'Project not found.' }, { status: 404 })
      }
    }

    let { title, summary, myContribution, content, contentLexical } = extractSourceContent(project)

    if (!title && !summary && !myContribution && !content) {
      try {
        const publishedProject = await readProjectForLocale(false)
        const publishedContent = extractSourceContent(publishedProject)

        title = publishedContent.title
        summary = publishedContent.summary
        myContribution = publishedContent.myContribution
        content = publishedContent.content
        contentLexical = publishedContent.contentLexical
      } catch {
        // keep original empty values and return a user-facing error below
      }
    }

    if (!title && !summary && !myContribution && !content) {
      return Response.json({ error: 'No source content found in selected locale.' }, { status: 400 })
    }

    const localeNames: Record<string, string> = {
      en: 'English',
      pl: 'Polish',
    }

    const sourceLanguage = localeNames[sourceLocale] || sourceLocale.toUpperCase()
    const targetLanguage = localeNames[targetLocale] || targetLocale.toUpperCase()
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    let result: any

    try {
      const contentTextNodes = contentLexical ? collectLexicalTextNodes(contentLexical) : []

      result = await openai.responses.create({
        input: [
          {
            content: [
              {
                text:
                  `You translate a portfolio project entry between locales in a CMS.\n` +
                  `Translate from ${sourceLanguage} to ${targetLanguage}.\n` +
                  `Return valid JSON only with this exact shape: {"message":"string","translation":{"title":"string","summary":"string","myContribution":"string","content":"string","contentTextNodes":"string[]"}}.\n` +
                  `Preserve meaning, structure, and technical terminology.\n` +
                  `Keep the tone professional and natural.\n` +
                  `contentTextNodes must preserve the exact order and exact array length of the input content text nodes.\n` +
                  `Do not add markdown fences or explanations outside JSON.`,
                type: 'input_text',
              },
            ],
            role: 'developer',
          },
          {
            content: [
              {
                text:
                  `Source locale: ${sourceLocale}\n` +
                  `Target locale: ${targetLocale}\n\n` +
                  `Project title:\n${title || '(empty)'}\n\n` +
                  `Project summary:\n${summary || '(empty)'}\n\n` +
                  `What I worked on:\n${myContribution || '(empty)'}\n\n` +
                  `Project content:\n${content || '(empty)'}\n\n` +
                  `Project content text nodes JSON:\n${JSON.stringify(contentTextNodes)}`,
                type: 'input_text',
              },
            ],
            role: 'user',
          },
        ],
        model: process.env.OPENAI_PROJECT_WRITER_MODEL || 'gpt-4.1-mini',
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'OpenAI request failed.'

      return Response.json({ error: message }, { status: 502 })
    }

    const outputText =
      typeof result?.output_text === 'string'
        ? result.output_text
        : Array.isArray(result?.output)
          ? result.output
              .flatMap((entry: any) => (Array.isArray(entry?.content) ? entry.content : []))
              .map((entry: any) => (typeof entry?.text === 'string' ? entry.text : ''))
              .join('')
          : ''

    if (!outputText) {
      return Response.json({ error: 'OpenAI returned an empty response.' }, { status: 502 })
    }

    try {
      const parsed = JSON.parse(outputText)

      return Response.json({
        message: typeof parsed?.message === 'string' ? parsed.message : '',
        translation: {
          content: typeof parsed?.translation?.content === 'string' ? parsed.translation.content : '',
          contentLexical:
            contentLexical &&
            Array.isArray(parsed?.translation?.contentTextNodes) &&
            parsed.translation.contentTextNodes.every((entry: unknown) => typeof entry === 'string')
              ? replaceLexicalTextNodes(contentLexical, parsed.translation.contentTextNodes)
              : contentLexical,
          myContribution:
            typeof parsed?.translation?.myContribution === 'string' ? parsed.translation.myContribution : '',
          summary: typeof parsed?.translation?.summary === 'string' ? parsed.translation.summary : '',
          title: typeof parsed?.translation?.title === 'string' ? parsed.translation.title : '',
        },
      })
    } catch {
      return Response.json({ error: 'OpenAI returned invalid JSON.' }, { status: 502 })
    }
  },
  method: 'post' as const,
  path: '/ai/translate-project-locale',
}

const importCredlyCertificatesEndpoint = {
  handler: async (req: any) => {
    if (!req.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let response: Response

    try {
      response = await fetch(CREDLY_BADGES_URL, {
        headers: {
          Accept: 'application/json,text/plain,*/*',
          Referer: CREDLY_BADGES_URL.replace(/\.json$/, ''),
          'User-Agent': 'Mozilla/5.0',
        },
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Credly request failed.'

      return Response.json({ error: message }, { status: 502 })
    }

    if (!response.ok) {
      return Response.json(
        {
          error: `Credly returned ${response.status}.`,
        },
        { status: 502 },
      )
    }

    let payload: { data?: CredlyBadge[] }

    try {
      payload = (await response.json()) as { data?: CredlyBadge[] }
    } catch {
      return Response.json({ error: 'Credly returned invalid JSON.' }, { status: 502 })
    }

    const badges = Array.isArray(payload?.data) ? payload.data : []

    let created = 0
    let updated = 0
    let skipped = 0

    for (const badge of badges) {
      const mappedBadge = mapCredlyBadgeToCertificate(badge)

      if (!mappedBadge) {
        skipped += 1
        continue
      }

      const existing = await req.payload.find({
        collection: 'certificates',
        depth: 0,
        limit: 1,
        overrideAccess: true,
        pagination: false,
        where: {
          externalId: {
            equals: mappedBadge.externalId,
          },
        },
      })

      const existingDoc = existing.docs[0]

      if (existingDoc) {
        await req.payload.update({
          id: existingDoc.id,
          collection: 'certificates',
          data: mappedBadge,
          depth: 0,
          overrideAccess: true,
        })
        updated += 1
      } else {
        await req.payload.create({
          collection: 'certificates',
          data: mappedBadge,
          depth: 0,
          overrideAccess: true,
        })
        created += 1
      }
    }

    return Response.json({
      created,
      message: `Credly sync finished. Created ${created}, updated ${updated}, skipped ${skipped}.`,
      skipped,
      totalFetched: badges.length,
      updated,
    })
  },
  method: 'post' as const,
  path: '/integrations/credly/import-certificates',
}

const trackVisitEndpoint = {
  handler: async (req: any) => {
    await req.payload.create({
      collection: 'visits',
      data: {
        timestamp: new Date().toISOString(),
      },
      depth: 0,
      overrideAccess: true,
    })

    const visitsCount = await req.payload.count({
      collection: 'visits',
      overrideAccess: true,
    })

    return Response.json({
      totalDocs: visitsCount.totalDocs,
    })
  },
  method: 'post' as const,
  path: '/system/visits/track',
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      autoGenerate: false,
      baseDir: path.resolve(dirname),
      importMapFile: path.resolve(dirname, 'app/(payload)/admin/importMap.js'),
    },
  },
  localization:{
    defaultLocale: 'en',
      locales: ['en', 'pl'],
  },
  i18n:{
    supportedLanguages: {en, pl}
  },
  collections: [Users, Media, CertificateScans, Visits, Skills, Projects, People, Experiences, Certificates, Commands],
  editor: lexicalEditor(),
  endpoints: [improveProjectFieldEndpoint, translateProjectLocaleEndpoint, importCredlyCertificatesEndpoint, trackVisitEndpoint],
  secret: process.env.PAYLOAD_SECRET || '',
  globals: [LandingPage],
  typescript: {
    autoGenerate: false,
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [],
})

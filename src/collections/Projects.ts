import type { CollectionConfig } from 'payload'

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const getProjectIdentifier = (doc: { id?: number | string; slug?: string | null | undefined }) => {
  if (typeof doc?.slug === 'string' && doc.slug.trim().length > 0) {
    return doc.slug
  }

  if (doc?.id !== undefined && doc?.id !== null) {
    return String(doc.id)
  }

  return ''
}

export const Projects: CollectionConfig = {
  slug: 'projects',
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: 'title',
    components: {
      edit: {
        beforeDocumentControls: ['@/app/(payload)/admin/components/ProjectTranslateButton#ProjectTranslateButton'],
      },
    },
    preview: (doc, { locale }) => {
      const projectIdentifier = getProjectIdentifier(doc)

      if (!projectIdentifier) {
        return null
      }

      return `/${locale}/projects/${projectIdentifier}`
    },
    livePreview: {
      url: ({ data, locale }) => {
        const projectIdentifier = getProjectIdentifier(data)
        const localeCode = typeof locale === 'string' ? locale : locale?.code

        if (!projectIdentifier || !localeCode) {
          return null
        }

        return `/${localeCode}/projects/${projectIdentifier}?livePreview=true`
      },
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        components: {
          Label: '@/app/(payload)/admin/components/FieldAIAssistant#FieldAIAssistant',
        },
      },
    },
    {
      name: 'myContribution',
      label: 'What I worked on',
      type: 'textarea',
      required: false,
      localized: true,
      admin: {
        components: {
          Label: '@/app/(payload)/admin/components/FieldAIAssistant#FieldAIAssistant',
        },
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
      admin: {
        components: {
          Label: '@/app/(payload)/admin/components/FieldAIAssistant#FieldAIAssistant',
        },
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ data, siblingData, value }) => {
            if (typeof value === 'string' && value.trim().length > 0) {
              return slugify(value)
            }

            const title = siblingData?.title ?? data?.title

            if (typeof title === 'string') {
              return slugify(title)
            }

            if (title && typeof title === 'object') {
              const localizedTitle = Object.values(title).find(
                (entry): entry is string => typeof entry === 'string' && entry.trim().length > 0,
              )

              if (localizedTitle) {
                return slugify(localizedTitle)
              }
            }

            return value
          },
        ],
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'skills',
      type: 'relationship',
      relationTo: 'skills',
      hasMany: true,
    },
    {
      name: 'mediaLinks',
      label: 'Media links',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'people',
      label: 'Authors',
      type: 'relationship',
      relationTo: 'people',
      hasMany: true,
    },
    {
      name: 'projectStatus',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Planned',
          value: 'planned',
        },
        {
          label: 'In Progress',
          value: 'in-progress',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
      ],
      defaultValue: 'planned',
    },
    {
      name: 'startDate',
      label: 'Start date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      label: 'Gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}

import type { CollectionConfig } from 'payload'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'periodLabel', 'startDate'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Tytuł',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'organization',
      label: 'Miejsce / organizacja',
      type: 'text',
      localized: true,
    },
    {
      name: 'description',
      label: 'Opis',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'periodLabel',
      label: 'Etykieta okresu',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'startDate',
      label: 'Data rozpoczęcia',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'endDate',
      label: 'Data zakończenia',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
  ],
}

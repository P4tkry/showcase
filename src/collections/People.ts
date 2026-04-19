import type { CollectionConfig } from 'payload'

export const People: CollectionConfig = {
  slug: 'people',
  admin: {
    useAsTitle: 'fullName',
  },
  fields: [
    {
      name: 'fullName',
      label: 'Imię i nazwisko',
      type: 'text',
      required: true,
    },
    {
      name: 'canLogin',
      label: 'Czy użytkownik może się logować',
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
    {
      name: 'profileImage',
      label: 'Profilowe',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'socialMediaLink',
      label: 'Link do social media',
      type: 'text',
      required: false,
    },
  ],
}

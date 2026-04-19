import type { CollectionConfig } from 'payload'

export const Commands: CollectionConfig = {
  slug: 'commands',
  admin: {
    useAsTitle: 'command',
    defaultColumns: ['command', 'visible', 'sortOrder', 'description'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'command',
      label: 'Command',
      type: 'text',
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (typeof value !== 'string') {
              return value
            }

            const trimmed = value.trim()

            if (!trimmed) {
              return trimmed
            }

            return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
          },
        ],
      },
    },
    {
      name: 'description',
      label: 'Short description',
      type: 'text',
      required: true,
    },
    {
      name: 'output',
      label: 'Terminal output',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Use new lines to create multiple output rows in the terminal.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'visible',
          label: 'Visible in help and terminal',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'sortOrder',
          label: 'Sort order',
          type: 'number',
          defaultValue: 0,
          admin: {
            width: '50%',
          },
        },
      ],
    },
  ],
}

import type { CollectionConfig } from 'payload'

export const Visits: CollectionConfig = {
  slug: 'visits',
  fields: [
    {
      name: 'timestamp',
      type: 'date',
      required: true,
    },
  ],
}
import type { CollectionConfig } from 'payload'

import { skillIconOptions } from '@/lib/skills'

export const Skills: CollectionConfig = {
  slug: 'skills',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      admin: {
        components: {
          afterInput: ['@/app/(payload)/admin/components/SkillIconPreview#SkillIconPreview'],
        },
      },
      options: skillIconOptions,
    },
  ],
}

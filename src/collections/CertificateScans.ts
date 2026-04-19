import type { CollectionConfig } from 'payload'

export const CertificateScans: CollectionConfig = {
  slug: 'certificate-scans',
  admin: {
    useAsTitle: 'alt',
    hidden: true,
  },
  access: {
    create: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'alt',
      label: 'Description',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}

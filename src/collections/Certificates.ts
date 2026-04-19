import type { CollectionConfig } from 'payload'

export const Certificates: CollectionConfig = {
  slug: 'certificates',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'issuer', 'issuedAt', 'source'],
    components: {
      beforeList: ['@/app/(payload)/admin/components/CertificatesImportButton#CertificatesImportButton'],
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'source',
      type: 'select',
      required: true,
      defaultValue: 'manual',
      options: [
        {
          label: 'Manual',
          value: 'manual',
        },
        {
          label: 'Credly',
          value: 'credly',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'visible',
      label: 'Visible on website',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'externalId',
      label: 'External ID',
      type: 'text',
      unique: true,
      admin: {
        condition: (_, siblingData) => siblingData?.source === 'credly',
        position: 'sidebar',
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ siblingData, value }) => {
            if (siblingData?.source !== 'credly') {
              return undefined
            }

            if (typeof value === 'string') {
              const trimmed = value.trim()
              return trimmed.length > 0 ? trimmed : undefined
            }

            return value
          },
        ],
      },
      validate: (value: unknown, { siblingData }: { siblingData?: { source?: string } }) => {
        if (siblingData?.source === 'credly') {
          return typeof value === 'string' && value.trim().length > 0 ? true : 'External ID is required for Credly certificates.'
        }

        return true
      },
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'issuer',
      label: 'Issuer',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'issuedAt',
          label: 'Issued at',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
            },
            width: '50%',
          },
        },
        {
          name: 'expiresAt',
          label: 'Expires at',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
            },
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'issuedTo',
      label: 'Issued to',
      type: 'text',
    },
    {
      name: 'credentialIsPdf',
      label: 'Credential verification type',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        components: {
          Field: '@/app/(payload)/admin/components/CredentialToggleField#CredentialToggleField',
        },
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'credentialUrl',
          label: 'Credential URL',
          type: 'text',
          admin: {
            condition: (_, siblingData) => !siblingData?.credentialIsPdf,
            width: '50%',
          },
          validate: (value: unknown, { siblingData }: { siblingData?: { credentialIsPdf?: boolean } }) => {
            if (siblingData?.credentialIsPdf) {
              return true
            }

            return typeof value === 'string' && value.trim().length > 0 ? true : 'Credential URL is required when credential type is URL.'
          },
        },
        {
          name: 'credentialFile',
          label: 'Credential PDF',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.credentialIsPdf),
            width: '50%',
          },
          validate: (value: unknown, { siblingData }: { siblingData?: { credentialIsPdf?: boolean } }) => {
            if (siblingData?.credentialIsPdf) {
              return value ? true : 'Credential PDF is required when credential type is PDF.'
            }

            return true
          },
        },
      ],
    },
    {
      name: 'globalActivityUrl',
      label: 'Activity URL',
      type: 'text',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'imageUsesUpload',
          label: 'Certificate image source',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            width: '40%',
            components: {
              Field: '@/app/(payload)/admin/components/ImageSourceToggleField#ImageSourceToggleField',
            },
          },
        },
        {
          name: 'sourceUpdatedAt',
          label: 'Source updated at',
          type: 'date',
          admin: {
            condition: (_, siblingData) => siblingData?.source === 'credly',
            readOnly: true,
            width: '20%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'image',
          label: 'Uploaded image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.imageUsesUpload),
            width: '50%',
          },
          validate: (value: unknown, { siblingData }: { siblingData?: { imageUsesUpload?: boolean } }) => {
            if (siblingData?.imageUsesUpload) {
              return value ? true : 'Uploaded image is required when image source is Upload.'
            }

            return true
          },
        },
        {
          name: 'imageUrl',
          label: 'Image URL',
          type: 'text',
          admin: {
            condition: (_, siblingData) => !siblingData?.imageUsesUpload,
            width: '50%',
          },
          validate: (value: unknown, { siblingData }: { siblingData?: { imageUsesUpload?: boolean } }) => {
            if (siblingData?.imageUsesUpload) {
              return true
            }

            return typeof value === 'string' && value.trim().length > 0 ? true : 'Image URL is required when image source is URL.'
          },
        },
      ],
    },
    {
      name: 'skills',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'scans',
      label: 'Confidential certificate scans',
      type: 'upload',
      relationTo: 'certificate-scans' as any,
      hasMany: true,
      admin: {
        description: 'Visible only in the admin panel. These files are not intended for public frontend use.',
      },
    },
  ],
}

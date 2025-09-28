import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'domain',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'settings',
      type: 'group',
      fields: [
        {
          name: 'themeColor',
          type: 'text',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'direction',
          type: 'select',
          options: [
            { label: 'RTL', value: 'rtl' },
            { label: 'LTR', value: 'ltr' },
          ],
          required: true,
        },
      ],
    },
  ],
}

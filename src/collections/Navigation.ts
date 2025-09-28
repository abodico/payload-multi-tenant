import { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: {
    read: () => true,
  },
  label: {
    singular: 'Navigation',
    plural: 'Navigation',
  },
  fields: [
    { name: 'brandName', type: 'text', localized: true },
    {
      name: 'links',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'href',
          type: 'text',
        },
      ],
    },
    {
      name: 'direction',
      type: 'select',
      defaultValue: 'ltr',
      options: [
        { label: 'Left to Right', value: 'ltr' },
        { label: 'Right to Left', value: 'rtl' },
      ],
      localized: true,
    },
  ],
}

import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  label: {
    singular: 'Footer',
    plural: 'Footers',
  },
  fields: [
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
        },
        {
          name: 'href',
          type: 'text',
        },
      ],
    },
    {
      name: 'socials',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
        },
        {
          name: 'href',
          type: 'text',
        },
        {
          name: 'icon',
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

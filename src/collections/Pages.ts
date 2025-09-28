import { CollectionConfig } from 'payload'

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'tenant', 'status', 'updatedAt'],
    preview: (doc) => {
      // Preview URL for visual editing
      return `${process.env.PAYLOAD_PUBLIC_SITE_URL}/api/preview?url=${doc.slug}&tenant=${doc.tenant}&secret=${process.env.PAYLOAD_PUBLIC_PREVIEW_SECRET}`
    },
  },
  versions: {
    drafts: true, // Enable draft/published system for visual editing
    maxPerDoc: 10, // Keep 10 versions per page
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true, // Support multiple languages
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        description: 'URL path for the page (e.g., "about", "contact")',
      },
      hooks: {
        beforeValidate: [
          ({ value }) => {
            // Auto-generate slug from title if empty
            if (!value) return undefined
            return value
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)+/g, '')
          },
        ],
      },
    },
    {
      name: 'fullSlug',
      type: 'text',
      unique: true,
      admin: { readOnly: true },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data?.slug && data?.tenant) {
              return `${data?.tenant}-${data?.slug}`
            }
          },
        ],
      },
    },
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
    // Page Content using Layout Builder for visual editing
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        // Hero Section
        {
          slug: 'hero',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'subheading',
              type: 'text',
              localized: true,
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'ctaButton',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
          ],
        },
        // Features Grid
        {
          slug: 'features',
          fields: [
            {
              name: 'heading',
              type: 'text',
              localized: true,
            },
            {
              name: 'features',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'icon',
                  type: 'text',
                },
              ],
            },
          ],
        },
        // Call to Action
        {
          slug: 'cta',
          fields: [
            {
              name: 'heading',
              type: 'text',
              localized: true,
            },
            {
              name: 'buttonText',
              type: 'text',
              localized: true,
            },
            {
              name: 'buttonLink',
              type: 'text',
            },
          ],
        },
        // Inside layout.blocks
        {
          slug: 'products',
          fields: [
            {
              name: 'heading',
              type: 'text',
              localized: true,
            },
            {
              name: 'products',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                },
                {
                  name: 'price',
                  type: 'number',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        {
          slug: 'testimonials',
          fields: [
            {
              name: 'heading',
              type: 'text',
              localized: true,
            },
            {
              name: 'testimonials',
              type: 'array',
              fields: [
                {
                  name: 'author',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'role',
                  type: 'text',
                },
                {
                  name: 'quote',
                  type: 'textarea',
                  required: true,
                  localized: true,
                },
                {
                  name: 'avatar',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        {
          slug: 'contact',
          fields: [
            {
              name: 'heading',
              type: 'text',
              localized: true,
            },
            {
              name: 'contacts',
              type: 'array',
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  options: [
                    { label: 'Address', value: 'address' },
                    { label: 'Phone', value: 'phone' },
                    { label: 'Email', value: 'email' },
                    { label: 'Custom', value: 'custom' },
                  ],
                },
                {
                  name: 'label',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'value',
                  type: 'text',
                },
                {
                  name: 'icon',
                  type: 'text',
                  admin: {
                    description: 'FontAwesome class (e.g., "fa-solid fa-phone")',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    // SEO Fields
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'keywords',
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
  access: {
    read: ({ req: { user } }) => {
      // Published pages are publicly readable
      // Drafts are only visible to admins and editors
      if (user) return true
      return {
        status: { equals: 'published' },
      }
    },
  },
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        // Revalidate the page when published
        if (operation === 'update' && doc.status === 'published') {
          try {
            await fetch(`${process.env.PAYLOAD_PUBLIC_SITE_URL}/api/revalidate`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Secret: process.env.REVALIDATION_SECRET || '',
              },
              body: JSON.stringify({
                slug: doc.slug,
                tenant: doc.tenant,
              }),
            })
          } catch (error) {
            console.error('Revalidation failed:', error)
          }
        }
      },
    ],
  },
}

export default Pages

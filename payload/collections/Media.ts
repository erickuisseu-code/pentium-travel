import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Contenu',
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'public/uploads',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 200,
        height: 200,
        position: 'centre',
      },
      {
        name: 'card',
        width: 600,
        height: 400,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texte alternatif',
    },
  ],
}

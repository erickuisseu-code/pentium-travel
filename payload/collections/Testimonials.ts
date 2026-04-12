import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    group: 'Contenu',
    defaultColumns: ['name', 'location', 'type', 'published'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nom du client',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      label: 'Pays / Ville',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      label: 'Type de témoignage',
      required: true,
      options: [
        { label: 'Texte', value: 'text' },
        { label: 'Vidéo', value: 'video' },
      ],
      defaultValue: 'text',
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Témoignage (texte)',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'text',
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Lien vidéo (YouTube / Vimeo)',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'video',
        description: 'Collez le lien YouTube ou Vimeo complet',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo du client (optionnel)',
    },
    {
      name: 'published',
      type: 'checkbox',
      label: 'Publié',
      defaultValue: true,
    },
    {
      name: 'order',
      type: 'number',
      label: "Ordre d'affichage",
      defaultValue: 0,
      admin: {
        description: 'Nombre plus petit = affiché en premier',
      },
    },
  ],
}

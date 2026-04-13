import type { CollectionConfig } from 'payload'

export const HeroSlides: CollectionConfig = {
  slug: 'hero-slides',
  admin: {
    useAsTitle: 'label',
    group: 'Contenu',
    defaultColumns: ['label', 'order', 'active'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Titre (référence admin)',
      required: true,
    },
    {
      name: 'imageSource',
      type: 'select',
      label: 'Source de l\'image',
      options: [
        { label: 'Upload (fichier)', value: 'upload' },
        { label: 'URL externe', value: 'url' },
      ],
      defaultValue: 'url',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image uploadée',
      admin: {
        description: 'Photo HD recommandée : 1920×1080px minimum',
        condition: (_, siblingData) => siblingData?.imageSource === 'upload',
      },
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'URL de la photo HD',
      admin: {
        description: 'URL complète d\'une photo (ex: https://images.unsplash.com/...?w=1920&q=85)',
        condition: (_, siblingData) => siblingData?.imageSource === 'url',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Ordre d\'affichage',
      defaultValue: 0,
      admin: { description: 'Nombre croissant — 0 apparaît en premier' },
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Afficher sur le site',
      defaultValue: true,
    },
  ],
}

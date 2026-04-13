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
      label: 'Titre (pour référence admin)',
      required: true,
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'URL de la photo HD',
      required: true,
      admin: {
        description: 'URL complète d\'une photo HD (ex: https://images.unsplash.com/...?w=1920&q=85)',
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

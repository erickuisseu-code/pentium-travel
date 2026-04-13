import type { CollectionConfig } from 'payload'

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  admin: {
    useAsTitle: 'name',
    group: 'Contenu',
    defaultColumns: ['name', 'region', 'type', 'active'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nom de la destination',
      required: true,
    },
    {
      name: 'region',
      type: 'select',
      label: 'Région',
      required: true,
      options: [
        { label: 'Europe', value: 'europe' },
        { label: 'Amérique du Nord', value: 'amerique-nord' },
        { label: 'Afrique', value: 'afrique' },
        { label: 'Asie & Moyen-Orient', value: 'asie-moyen-orient' },
        { label: 'Amérique du Sud', value: 'amerique-sud' },
        { label: 'Océanie', value: 'oceanie' },
      ],
    },
    {
      name: 'type',
      type: 'select',
      label: 'Type de service',
      required: true,
      options: [
        { label: 'Études + Tourisme', value: 'both' },
        { label: 'Études uniquement', value: 'etudes' },
        { label: 'Tourisme uniquement', value: 'tourisme' },
      ],
      defaultValue: 'both',
    },
    {
      name: 'flag',
      type: 'text',
      label: 'Emoji drapeau',
      admin: { description: 'Ex: 🇫🇷' },
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Afficher sur le site',
      defaultValue: true,
    },
  ],
}

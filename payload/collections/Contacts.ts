import type { CollectionConfig } from 'payload'

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  admin: {
    useAsTitle: 'name',
    group: 'Leads',
    defaultColumns: ['name', 'email', 'service', 'createdAt'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nom complet',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Téléphone',
    },
    {
      name: 'service',
      type: 'select',
      label: 'Service souhaité',
      required: true,
      options: [
        { label: 'Visa étudiant', value: 'visa-etudiant' },
        { label: 'Accompagnement académique', value: 'accompagnement-academique' },
        { label: 'Logement étudiant', value: 'logement-etudiant' },
        { label: 'Visa touristique', value: 'visa-touristique' },
        { label: "Réservation d'hôtel", value: 'hotel' },
        { label: "Billet d'avion", value: 'billet-avion' },
        { label: 'Autre', value: 'autre' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Message',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Statut',
      options: [
        { label: 'Nouveau', value: 'new' },
        { label: 'En cours', value: 'in-progress' },
        { label: 'Traité', value: 'done' },
      ],
      defaultValue: 'new',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}

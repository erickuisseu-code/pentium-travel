import type { GlobalConfig } from 'payload'

export const SocialLinks: GlobalConfig = {
  slug: 'social-links',
  label: 'Réseaux sociaux',
  admin: {
    group: 'Paramètres',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'facebook',
      type: 'text',
      label: 'Facebook (URL)',
      admin: { description: 'Ex: https://facebook.com/pentiumtravel' },
    },
    {
      name: 'whatsapp',
      type: 'text',
      label: 'WhatsApp (numéro international sans +)',
      admin: { description: 'Ex: 33605693375 — génère un lien wa.me/...' },
    },
    {
      name: 'tiktok',
      type: 'text',
      label: 'TikTok (URL)',
      admin: { description: 'Ex: https://tiktok.com/@pentiumtravel' },
    },
    {
      name: 'instagram',
      type: 'text',
      label: 'Instagram (URL)',
      admin: { description: 'Ex: https://instagram.com/pentiumtravel' },
    },
  ],
}

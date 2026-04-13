import { getPayload } from 'payload'
// @ts-ignore
import config from '@payload-config'
import { NextResponse } from 'next/server'

const SEED_SECRET = process.env.SEED_SECRET || 'pentium-seed-2026'

const testimonialsData = [
  {
    name: 'Joyce Kamdem',
    location: 'USA',
    type: 'text' as const,
    text: "Une expérience incroyable du début à la fin. Votre équipe a fait preuve d'un professionnalisme rare et d'une efficacité remarquable. Merci à Mr Yves et à toute l'équipe Pentium Travel.",
    published: true,
    order: 1,
  },
  {
    name: 'Jeanne Tchatoie',
    location: 'Allemagne',
    type: 'text' as const,
    text: 'Simply exceptional service. Professionalism, speed, and efficiency at their best. Thanks to the entire Pentium Travel team.',
    published: true,
    order: 2,
  },
  {
    name: 'Léa Dogmo',
    location: 'France',
    type: 'text' as const,
    text: "Je n'ai pas de mots pour décrire le service exceptionnel que j'ai reçu de votre entreprise. Je recommande vivement.",
    published: true,
    order: 3,
  },
  {
    name: 'Coralie Bridaelle',
    location: 'France',
    type: 'text' as const,
    text: "Je n'ai pas de mots pour décrire le service exceptionnel que j'ai reçu de votre entreprise. Leur équipe s'est surpassée pour répondre à nos besoins et a dépassé nos attentes.",
    published: true,
    order: 4,
  },
  {
    name: 'Franck Essaka',
    location: 'Canada',
    type: 'text' as const,
    text: "Un immense merci à l'agence de voyage Pentium Travel pour l'accompagnement exceptionnel, la patience et le professionnalisme. Grâce à votre sérieux, le rêve devient réalité. Je recommande à 100% !",
    published: true,
    order: 5,
  },
  {
    name: 'Famille Mbappé',
    location: 'Cameroun',
    type: 'text' as const,
    text: "Pentium Travel a rendu notre voyage de rêve au Cameroun possible. Leur service était exceptionnel et leur connaissance de la région est inégalée. Nous recommandons vivement leurs services !",
    published: true,
    order: 6,
  },
]

const destinationsData = [
  // Études + Tourisme
  { name: 'France', flag: '🇫🇷', region: 'europe', type: 'both', active: true },
  { name: 'États-Unis', flag: '🇺🇸', region: 'amerique-nord', type: 'both', active: true },
  { name: 'Canada', flag: '🇨🇦', region: 'amerique-nord', type: 'both', active: true },
  { name: 'Espagne', flag: '🇪🇸', region: 'europe', type: 'both', active: true },
  // Tourisme uniquement
  { name: 'Maroc', flag: '🇲🇦', region: 'afrique', type: 'tourisme', active: true },
  { name: 'Tunisie', flag: '🇹🇳', region: 'afrique', type: 'tourisme', active: true },
  { name: 'Émirats Arabes Unis', flag: '🇦🇪', region: 'asie-moyen-orient', type: 'tourisme', active: true },
  { name: 'Turquie', flag: '🇹🇷', region: 'asie-moyen-orient', type: 'tourisme', active: true },
  { name: 'Italie', flag: '🇮🇹', region: 'europe', type: 'tourisme', active: true },
  { name: 'Portugal', flag: '🇵🇹', region: 'europe', type: 'tourisme', active: true },
  { name: 'Sénégal', flag: '🇸🇳', region: 'afrique', type: 'tourisme', active: true },
  { name: "Côte d'Ivoire", flag: '🇨🇮', region: 'afrique', type: 'tourisme', active: true },
  { name: 'Gabon', flag: '🇬🇦', region: 'afrique', type: 'tourisme', active: true },
  { name: 'Chine', flag: '🇨🇳', region: 'asie-moyen-orient', type: 'tourisme', active: true },
  { name: 'Thaïlande', flag: '🇹🇭', region: 'asie-moyen-orient', type: 'tourisme', active: true },
]

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('secret') !== SEED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })

  // Clear existing data
  const existingTestimonials = await payload.find({ collection: 'testimonials', limit: 100 })
  for (const t of existingTestimonials.docs) {
    await payload.delete({ collection: 'testimonials', id: t.id })
  }

  const existingDestinations = await payload.find({ collection: 'destinations', limit: 100 })
  for (const d of existingDestinations.docs) {
    await payload.delete({ collection: 'destinations', id: d.id })
  }

  // Seed testimonials
  const createdTestimonials = []
  for (const t of testimonialsData) {
    const created = await payload.create({ collection: 'testimonials', data: t })
    createdTestimonials.push(created.id)
  }

  // Seed destinations
  const createdDestinations = []
  for (const d of destinationsData) {
    const created = await payload.create({ collection: 'destinations', data: d })
    createdDestinations.push(created.id)
  }

  return NextResponse.json({
    ok: true,
    testimonials: createdTestimonials.length,
    destinations: createdDestinations.length,
  })
}

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
  { name: 'France',       flag: '🇫🇷', region: 'europe',           type: 'both',     active: true, photo: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80' },
  { name: 'États-Unis',   flag: '🇺🇸', region: 'amerique-nord',    type: 'both',     active: true, photo: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600&q=80' },
  { name: 'Canada',       flag: '🇨🇦', region: 'amerique-nord',    type: 'both',     active: true, photo: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&q=80' },
  { name: 'Espagne',      flag: '🇪🇸', region: 'europe',           type: 'both',     active: true, photo: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80' },
  // Tourisme uniquement
  { name: 'Maroc',              flag: '🇲🇦', region: 'afrique',           type: 'tourisme', active: true, photo: 'https://images.unsplash.com/photo-1489493512598-d08130f49bea?w=600&q=80' },
  { name: 'Tunisie',            flag: '🇹🇳', region: 'afrique',           type: 'tourisme', active: true, photo: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=600&q=80' },
  { name: 'Émirats Arabes Unis',flag: '🇦🇪', region: 'asie-moyen-orient', type: 'tourisme', active: true, photo: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80' },
  { name: 'Turquie',            flag: '🇹🇷', region: 'asie-moyen-orient', type: 'tourisme', active: true, photo: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&q=80' },
  { name: 'Italie',             flag: '🇮🇹', region: 'europe',           type: 'tourisme', active: true, photo: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80' },
  { name: 'Portugal',           flag: '🇵🇹', region: 'europe',           type: 'tourisme', active: true, photo: 'https://images.unsplash.com/photo-1558370781-d6196949e317?w=600&q=80' },
  { name: 'Sénégal',            flag: '🇸🇳', region: 'afrique',           type: 'tourisme', active: true, photo: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80' },
  { name: "Côte d'Ivoire",      flag: '🇨🇮', region: 'afrique',           type: 'tourisme', active: true, photo: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80' },
  { name: 'Gabon',              flag: '🇬🇦', region: 'afrique',           type: 'tourisme', active: true, photo: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80' },
  { name: 'Chine',              flag: '🇨🇳', region: 'asie-moyen-orient', type: 'tourisme', active: true, photo: 'https://images.unsplash.com/photo-1508804052814-cd3ba865a116?w=600&q=80' },
  { name: 'Thaïlande',          flag: '🇹🇭', region: 'asie-moyen-orient', type: 'tourisme', active: true, photo: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80' },
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

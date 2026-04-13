export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
// @ts-ignore
import config from '@payload-config'
import HeroSection, { type HeroSlide } from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProcessSection from '@/components/sections/ProcessSection'
import PassportChecker from '@/components/shared/PassportChecker'
import TestimonialsSection, { type Testimonial } from '@/components/sections/TestimonialsSection'
import CtaFinalSection from '@/components/sections/CtaFinalSection'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const [testimonialsResult, slidesResult] = await Promise.all([
    payload.find({
      collection: 'testimonials',
      where: { published: { equals: true } },
      sort: 'order',
      limit: 20,
    }),
    payload.find({
      collection: 'hero-slides',
      where: { active: { equals: true } },
      sort: 'order',
      limit: 10,
    }),
  ])

  const testimonials: Testimonial[] = testimonialsResult.docs.map((t) => {
    const avatar = t.avatar
    const avatarUrl =
      avatar && typeof avatar === 'object' && 'url' in avatar
        ? (avatar as { url: string }).url
        : null
    return {
      id: t.id,
      name: t.name,
      location: t.location,
      text: t.text ?? '',
      type: (t.type as 'text' | 'video') ?? 'text',
      videoUrl: (t as any).videoUrl ?? '',
      avatarUrl,
    }
  })

  const slides: HeroSlide[] = slidesResult.docs.map((s) => ({
    id: s.id,
    imageUrl: (s as any).imageUrl ?? '',
  }))

  return (
    <>
      <HeroSection slides={slides} />
      <ServicesSection />
      <ProcessSection />
      <PassportChecker />
      <TestimonialsSection testimonials={testimonials} />
      <CtaFinalSection />
    </>
  )
}

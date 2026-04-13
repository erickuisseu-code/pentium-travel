import { getPayload } from 'payload'
// @ts-ignore
import config from '@payload-config'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProcessSection from '@/components/sections/ProcessSection'
import VisaCheckSection from '@/components/sections/VisaCheckSection'
import TestimonialsSection, { type Testimonial } from '@/components/sections/TestimonialsSection'
import CtaFinalSection from '@/components/sections/CtaFinalSection'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'testimonials',
    where: { published: { equals: true } },
    sort: 'order',
    limit: 20,
  })

  const testimonials: Testimonial[] = result.docs.map((t) => ({
    id: t.id,
    name: t.name,
    location: t.location,
    text: t.text ?? '',
  }))

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <VisaCheckSection />
      <TestimonialsSection testimonials={testimonials} />
      <CtaFinalSection />
    </>
  )
}

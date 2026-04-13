'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Quote, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Testimonial = {
  id: string | number
  name: string
  location: string
  text: string
  type?: 'text' | 'video'
  videoUrl?: string
}

type Props = {
  testimonials: Testimonial[]
}

/** Converts YouTube/Vimeo watch URL to embed URL */
function toEmbedUrl(url: string): string | null {
  if (!url) return null
  // YouTube: watch?v=ID or youtu.be/ID or embed/ID
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0`
  // Vimeo: vimeo.com/ID
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  return null
}

function TestimonialCard({ t, center }: { t: Testimonial; center?: boolean }) {
  const embedUrl = t.type === 'video' ? toEmbedUrl(t.videoUrl ?? '') : null

  return (
    <div
      className={cn(
        'bg-neutral-50 border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300',
        center && 'bg-white border-brand-red shadow-md scale-105'
      )}
    >
      {embedUrl ? (
        /* Video testimonial */
        <div className="rounded-xl overflow-hidden aspect-video bg-black">
          <iframe
            src={embedUrl}
            title={`Témoignage de ${t.name}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      ) : t.type === 'video' && t.videoUrl ? (
        /* Video URL but unrecognized format — show link */
        <a
          href={t.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-brand-red text-sm font-semibold hover:underline"
        >
          <Play size={16} />
          Voir la vidéo
        </a>
      ) : (
        /* Text testimonial */
        <>
          <Quote size={24} className="text-brand-red shrink-0" />
          <p className="text-neutral-600 text-sm leading-relaxed flex-1">
            &ldquo;{t.text}&rdquo;
          </p>
        </>
      )}

      <div className="flex items-center gap-3 pt-2 border-t border-neutral-200">
        <div className="w-10 h-10 rounded-full bg-brand-red/20 flex items-center justify-center text-brand-red font-bold text-sm">
          {t.name.charAt(0)}
        </div>
        <div>
          <p className="text-brand-navy font-semibold text-sm">{t.name}</p>
          <p className="text-neutral-500 text-xs">{t.location}</p>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsSection({ testimonials }: Props) {
  const [current, setCurrent] = useState(0)
  const total = testimonials.length

  if (total === 0) return null

  const prev = () => setCurrent((c) => (c - 1 + total) % total)
  const next = () => setCurrent((c) => (c + 1) % total)

  const visible = [
    testimonials[current % total],
    testimonials[(current + 1) % total],
    testimonials[(current + 2) % total],
  ]

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-neutral-500 text-lg">
            Ils nous ont fait confiance. Voici leurs expériences.
          </p>
        </div>

        {/* Cards desktop (3 colonnes) */}
        <div className="hidden md:grid grid-cols-3 gap-6 mb-10">
          {visible.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} t={t} center={i === 1} />
          ))}
        </div>

        {/* Card mobile (1 à la fois) */}
        <div className="md:hidden mb-8">
          <TestimonialCard t={testimonials[current]} />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-brand-navy hover:bg-neutral-100 transition-colors"
            aria-label="Précédent"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-200',
                  i === current ? 'bg-brand-red w-6' : 'bg-neutral-300'
                )}
                aria-label={`Témoignage ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-brand-navy hover:bg-neutral-100 transition-colors"
            aria-label="Suivant"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}

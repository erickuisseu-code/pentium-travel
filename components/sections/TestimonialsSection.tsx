'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    name: 'Joyce Kamdem',
    location: 'USA',
    text: 'Une expérience incroyable du début à la fin. Votre équipe a fait preuve d\'un professionnalisme rare et d\'une efficacité remarquable. Merci à Mr Yves et à toute l\'équipe Pentium Travel.',
    avatar: null,
  },
  {
    name: 'Jeanne Tchatoie',
    location: 'Allemagne',
    text: 'Simply exceptional service. Professionalism, speed, and efficiency at their best. Thanks to the entire Pentium Travel team.',
    avatar: null,
  },
  {
    name: 'Léa Dogmo',
    location: 'France',
    text: 'Je n\'ai pas de mots pour décrire le service exceptionnel que j\'ai reçu de votre entreprise. Je recommande vivement.',
    avatar: null,
  },
  {
    name: 'Coralie Bridaelle',
    location: 'France',
    text: 'Je n\'ai pas de mots pour décrire le service exceptionnel que j\'ai reçu de votre entreprise. Leur équipe s\'est surpassée pour répondre à nos besoins et a dépassé nos attentes.',
    avatar: null,
  },
  {
    name: 'Franck Essaka',
    location: 'Canada',
    text: 'Un immense merci à l\'agence de voyage Pentium Travel pour l\'accompagnement exceptionnel, la patience et le professionnalisme. Grâce à votre sérieux, le rêve devient réalité. Je recommande à 100% !',
    avatar: null,
  },
  {
    name: 'Famille Mbappé',
    location: 'Cameroun',
    text: 'Pentium Travel a rendu notre voyage de rêve au Cameroun possible. Leur service était exceptionnel et leur connaissance de la région est inégalée. Nous recommandons vivement leurs services !',
    avatar: null,
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const total = testimonials.length

  const prev = () => setCurrent((c) => (c - 1 + total) % total)
  const next = () => setCurrent((c) => (c + 1) % total)

  // 3 visibles à la fois sur desktop
  const visible = [
    testimonials[current % total],
    testimonials[(current + 1) % total],
    testimonials[(current + 2) % total],
  ]

  return (
    <section className="py-20 md:py-28 bg-brand-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-neutral-400 text-lg">
            Ils nous ont fait confiance. Voici leurs expériences.
          </p>
        </div>

        {/* Cards desktop (3 colonnes) */}
        <div className="hidden md:grid grid-cols-3 gap-6 mb-10">
          {visible.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className={cn(
                'bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300',
                i === 1 && 'bg-white/10 scale-105'
              )}
            >
              <Quote size={24} className="text-brand-red shrink-0" />
              <p className="text-neutral-300 text-sm leading-relaxed flex-1">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-brand-red/20 flex items-center justify-center text-brand-red font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-neutral-400 text-xs">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Card mobile (1 à la fois) */}
        <div className="md:hidden mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
            <Quote size={24} className="text-brand-red" />
            <p className="text-neutral-300 text-sm leading-relaxed">
              "{testimonials[current].text}"
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-white/10">
              <div className="w-10 h-10 rounded-full bg-brand-red/20 flex items-center justify-center text-brand-red font-bold text-sm">
                {testimonials[current].name.charAt(0)}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{testimonials[current].name}</p>
                <p className="text-neutral-400 text-xs">{testimonials[current].location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="Précédent"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Indicateurs */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-200',
                  i === current ? 'bg-brand-red w-6' : 'bg-white/30'
                )}
                aria-label={`Témoignage ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="Suivant"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}

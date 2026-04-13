'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { GraduationCap, Plane } from 'lucide-react'
import { cn } from '@/lib/utils'

export type HeroSlide = {
  id: string | number
  imageUrl: string
}

type Props = {
  slides: HeroSlide[]
}

export default function HeroSection({ slides = [] }: Props) {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const total = slides.length

  const startInterval = () => {
    if (total <= 1) return
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total)
    }, 4000)
  }

  const stopInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useEffect(() => {
    startInterval()
    return () => stopInterval()
  }, [total])

  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-brand-navy"
      onMouseEnter={stopInterval}
      onMouseLeave={() => { stopInterval(); startInterval() }}
    >
      {/* Slides photos */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
            i === current ? 'opacity-100' : 'opacity-0'
          )}
        >
          <img
            src={slide.imageUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Overlay sombre pour lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/50 to-[#0d1f3c]/70 z-10" />

      {/* Motif décoratif */}
      <div className="absolute inset-0 z-10 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #B91C1C 0%, transparent 50%), radial-gradient(circle at 80% 20%, #7DB8D8 0%, transparent 40%)',
        }}
      />

      {/* Contenu */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-3xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-red text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest mb-8">
            <Plane size={14} />
            BAC EN POCHE · VISA EN MAIN !
          </div>

          {/* H1 */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Votre projet à l&apos;étranger{' '}
            <span className="text-brand-blue">commence ici.</span>
          </h1>

          {/* Sous-titre */}
          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-10 max-w-2xl">
            Études à l&apos;étranger ou voyage touristique — Pentium Travel vous accompagne
            de la première idée jusqu&apos;à votre installation, sans rien laisser au hasard.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/etudiants"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-red text-white font-bold text-base hover:bg-brand-red-dark transition-colors duration-200 shadow-lg"
            >
              <GraduationCap size={20} />
              Je suis étudiant
            </Link>
            <Link
              href="/touristes"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white text-white font-bold text-base hover:bg-white/10 transition-colors duration-200"
            >
              <Plane size={20} />
              Je veux voyager
            </Link>
          </div>
        </div>
      </div>

      {/* Indicateurs */}
      {total > 1 && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { stopInterval(); setCurrent(i); startInterval() }}
              aria-label={`Slide ${i + 1}`}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === current ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/70'
              )}
            />
          ))}
        </div>
      )}

      {/* Vague décorative bas */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 20C1200 60 900 0 720 20C540 40 240 0 0 20L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}

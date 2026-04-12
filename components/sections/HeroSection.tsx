import Link from 'next/link'
import { GraduationCap, Plane } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-brand-navy">
      {/* Fond dégradé */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-[#0d1f3c] z-0" />

      {/* Motif décoratif */}
      <div className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #B91C1C 0%, transparent 50%), radial-gradient(circle at 80% 20%, #7DB8D8 0%, transparent 40%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-3xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-red text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest mb-8">
            <Plane size={14} />
            BAC EN POCHE · VISA EN MAIN !
          </div>

          {/* H1 */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Votre projet à l'étranger{' '}
            <span className="text-brand-blue">commence ici.</span>
          </h1>

          {/* Sous-titre */}
          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-10 max-w-2xl">
            Études à l'étranger ou voyage touristique — Pentium Travel vous accompagne
            de la première idée jusqu'à votre installation, sans rien laisser au hasard.
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

      {/* Vague décorative bas */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 20C1200 60 900 0 720 20C540 40 240 0 0 20L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}

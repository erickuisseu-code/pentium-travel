import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

export default function CtaFinalSection() {
  return (
    <section className="py-20 md:py-28 bg-brand-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
          Votre projet mérite les meilleurs.
          <br />
          <span className="text-red-100">Démarrez maintenant.</span>
        </h2>

        <p className="text-red-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Études ou tourisme — nos experts sont disponibles pour vous accompagner
          de l'idée jusqu'à la réalisation. Aucun détail laissé au hasard.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-brand-red font-bold text-base hover:bg-red-50 transition-colors duration-200 shadow-lg group"
          >
            Démarrer mon projet
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="tel:+237657644907"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white text-white font-bold text-base hover:bg-white/10 transition-colors duration-200"
          >
            <Phone size={20} />
            +237 657 644 907
          </a>
        </div>
      </div>
    </section>
  )
}

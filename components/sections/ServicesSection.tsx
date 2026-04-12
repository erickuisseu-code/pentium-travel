import Link from 'next/link'
import { GraduationCap, Plane, ArrowRight, CheckCircle2 } from 'lucide-react'

const services = [
  {
    icon: GraduationCap,
    badge: 'Étudiants',
    title: "Tu viens d'avoir ton bac ?",
    description: "Pentium Travel t'accompagne de l'idée de ton projet jusqu'à ton installation complète à l'étranger.",
    features: [
      "Choix de l'université et préinscription",
      'Dossier visa étudiant complet',
      'Réservation logement étudiant',
      "Suivi jusqu'à l'installation",
    ],
    cta: 'Démarrer mon projet étudiant',
    href: '/etudiants',
    accent: 'bg-brand-red',
    border: 'border-brand-red/20',
    badgeBg: 'bg-brand-red-light text-brand-red',
  },
  {
    icon: Plane,
    badge: 'Touristes',
    title: "L'idée du voyage suffit.",
    description: "Quelle que soit votre destination, nous gérons tout : visa, hôtel, billet d'avion. C'est toi le voyageur, c'est nous les facilitateurs.",
    features: [
      'Visa touristique toutes destinations',
      "Réservation hôtel et billet d'avion",
      'Accompagnement de A à Z',
      'Niveau de satisfaction élevé garanti',
    ],
    cta: 'Planifier mon voyage',
    href: '/touristes',
    accent: 'bg-brand-blue',
    border: 'border-brand-blue/20',
    badgeBg: 'bg-brand-blue-light text-brand-blue-dark',
  },
]

export default function ServicesSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            Nos services
          </h2>
          <p className="text-neutral-600 text-lg leading-relaxed">
            Fiabilité, efficacité, rapidité et solutions adaptées à votre budget.
            Pentium Travel ne laisse rien à l'approximation.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.badge}
                className={`bg-white rounded-2xl p-8 shadow-sm border ${s.border} hover:shadow-md transition-shadow duration-200 flex flex-col`}
              >
                {/* Badge + icône */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl ${s.accent} flex items-center justify-center`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${s.badgeBg}`}>
                    {s.badge}
                  </span>
                </div>

                {/* Titre + description */}
                <h3 className="font-display text-2xl font-bold text-brand-navy mb-3">
                  {s.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  {s.description}
                </p>

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-neutral-700">
                      <CheckCircle2 size={16} className="text-brand-red mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={s.href}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-red text-white font-semibold text-sm hover:bg-brand-red-dark transition-colors duration-200 group"
                >
                  {s.cta}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

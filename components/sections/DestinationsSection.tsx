import { MapPin } from 'lucide-react'

const regions = [
  {
    name: 'Europe',
    destinations: [
      'France', 'Espagne', 'Allemagne', 'Belgique',
      'Suisse', 'Royaume-Uni', 'Italie', 'Portugal',
      'Pays-Bas', 'Suède',
    ],
  },
  {
    name: 'Amérique du Nord',
    destinations: ['Canada', 'États-Unis', 'Mexique'],
  },
  {
    name: 'Afrique',
    destinations: [
      'Maroc', 'Tunisie', 'Algérie', 'Égypte',
      'Sénégal', "Côte d'Ivoire", 'Gabon', 'Cameroun',
    ],
  },
  {
    name: 'Asie & Moyen-Orient',
    destinations: [
      'Émirats Arabes Unis', 'Turquie', 'Thaïlande',
      'Chine', 'Qatar', 'Arabie Saoudite',
    ],
  },
]

export default function DestinationsSection() {
  return (
    <section className="py-20 md:py-28 bg-neutral-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            Explorez des horizons qui éveillent vos sens
          </h2>
          <p className="text-neutral-600 text-lg leading-relaxed">
            Que vous recherchiez l'aventure, la découverte culturelle ou un nouveau départ académique,
            Pentium Travel couvre toutes les destinations.
          </p>
        </div>

        {/* Grille par région */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {regions.map((region) => (
            <div key={region.name} className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={16} className="text-brand-red" />
                <h3 className="font-display font-bold text-brand-navy text-base">
                  {region.name}
                </h3>
              </div>
              <ul className="flex flex-col gap-2">
                {region.destinations.map((dest) => (
                  <li
                    key={dest}
                    className="text-sm text-neutral-600 py-1 border-b border-neutral-100 last:border-0"
                  >
                    {dest}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-sm text-neutral-400 mt-8">
          Et bien d'autres destinations — contactez-nous pour toute demande spécifique.
        </p>
      </div>
    </section>
  )
}

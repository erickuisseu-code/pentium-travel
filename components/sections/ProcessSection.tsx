const steps = [
  {
    number: '01',
    title: 'Votre projet',
    description: 'Vous nous partagez votre idée — études, tourisme, peu importe. On écoute, on analyse, on conseille.',
  },
  {
    number: '02',
    title: 'Consultation personnalisée',
    description: 'Nos experts étudient votre profil, votre budget et définissent avec vous la meilleure stratégie.',
  },
  {
    number: '03',
    title: 'Préparation du dossier',
    description: "Université, visa, logement ou hôtel et billet d'avion — nous préparons chaque document avec rigueur.",
  },
  {
    number: '04',
    title: 'Dépôt et suivi',
    description: "Nous déposons les dossiers et assurons le suivi à chaque étape jusqu'à l'obtention du visa.",
  },
  {
    number: '05',
    title: 'Vous partez serein',
    description: "Logement réservé, billet en main, visa obtenu. Vous partez l'esprit libre. C'est ça, Pentium Travel.",
  },
]

export default function ProcessSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-neutral-600 text-lg leading-relaxed">
            Un processus simple, transparent et efficace — du premier contact à votre départ.
          </p>
        </div>

        {/* Timeline desktop */}
        <div className="hidden md:flex items-start gap-0">
          {steps.map((step, i) => (
            <div key={step.number} className="flex-1 flex flex-col items-center text-center relative">
              {/* Ligne de connexion */}
              {i < steps.length - 1 && (
                <div className="absolute top-6 left-1/2 w-full h-0.5 bg-brand-red-light z-0" />
              )}

              {/* Numéro */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center font-display font-bold text-sm mb-4 shrink-0 shadow-md">
                {step.number}
              </div>

              {/* Contenu */}
              <div className="px-3">
                <h3 className="font-display font-bold text-brand-navy text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline mobile */}
        <div className="flex md:hidden flex-col gap-6">
          {steps.map((step) => (
            <div key={step.number} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center font-display font-bold text-sm shrink-0 shadow-md">
                {step.number}
              </div>
              <div>
                <h3 className="font-display font-bold text-brand-navy text-base mb-1">
                  {step.title}
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  GraduationCap, ArrowRight,
  CheckCircle2, Plane
} from 'lucide-react'
import { getPayload } from 'payload'
// @ts-ignore
import config from '@payload-config'

export const metadata: Metadata = {
  title: 'Étudiants',
  description: "Pentium Travel accompagne les nouveaux bacheliers dans leur projet d'études à l'étranger : visa, université, logement.",
}

const services = [
  {
    image: '/services/WhatsApp Image 2026-02-03 at 06.20.09 (1).jpeg',
    title: 'Consultation personnalisée',
    description: "Nous discutons de vos objectifs d'études, explorons les meilleures options universitaires et destinations adaptées à votre profil et à votre budget.",
  },
  {
    image: '/services/WhatsApp Image 2026-02-03 at 06.20.10.jpeg',
    title: 'Assistance complète aux admissions',
    description: "Nous vous guidons à travers le processus d'admission, de la sélection des programmes à la préparation des documents nécessaires pour une candidature réussie.",
  },
  {
    image: '/services/WhatsApp Image 2026-02-03 at 06.22.00 (4).jpeg',
    title: 'Processus de visa et logistique',
    description: "Bénéficiez de notre expertise pour les démarches de visa étudiant et l'organisation logistique de votre voyage, du départ à l'arrivée.",
  },
]

const steps = [
  { number: '01', label: 'Ton projet' },
  { number: '02', label: 'Choix université' },
  { number: '03', label: 'Dossier visa' },
  { number: '04', label: 'Logement réservé' },
  { number: '05', label: 'Ton installation' },
]

export default async function EtudiantsPage() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'destinations',
    where: {
      and: [
        { type: { in: ['etudes', 'both'] } },
        { active: { equals: true } },
      ],
    },
    limit: 20,
  })
  const destinations = result.docs.map((d) => ({
    flag: (d as any).flag ?? '',
    country: d.name,
    photo: (d as any).photo ?? '',
  }))

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-[#0d1f3c] z-0" />
        <div className="absolute inset-0 opacity-10 z-0"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #B91C1C 0%, transparent 50%)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-brand-red text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
              <GraduationCap size={14} />
              Nouveaux bacheliers
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              Tu viens d&apos;avoir ton bac ?{' '}
              <span className="text-brand-blue">L&apos;aventure commence ici.</span>
            </h1>
            <p className="text-neutral-300 text-lg leading-relaxed mb-8 max-w-2xl">
              Pentium Travel t&apos;accompagne de l&apos;idée de ton projet jusqu&apos;à ton installation complète —
              visa, université, logement. On gère tout, tu te concentres sur ton avenir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-red text-white font-bold hover:bg-brand-red-dark transition-colors shadow-lg group"
              >
                Démarrer mon projet
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/33605693375"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white text-white font-bold hover:bg-white/10 transition-colors"
              >
                Nous écrire sur WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L1440 60L1440 20C1200 60 900 0 720 20C540 40 240 0 0 20L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Accroche BAC EN POCHE */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-red-light border border-brand-red/20 rounded-2xl p-8 md:p-12 text-center">
            <p className="font-display text-3xl md:text-4xl font-extrabold text-brand-red uppercase tracking-tight mb-3">
              BAC EN POCHE · VISA EN MAIN !
            </p>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Des services entièrement conçus pour les étudiants souhaitant poursuivre leurs études à l&apos;étranger.
              Fiabilité, efficacité, rapidité et solutions moins coûteuses pour concrétiser vos rêves académiques.
            </p>
          </div>
        </div>
      </section>

      {/* Destinations études */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display text-3xl font-bold text-brand-blue mb-4">
              Nos destinations d&apos;études phares
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              Pentium Travel vous ouvre les portes des meilleures universités à travers le monde.
              Chaque destination est sélectionnée pour la qualité de son système éducatif,
              les opportunités qu&apos;elle offre et l&apos;accompagnement que nous pouvons vous garantir sur place.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {destinations.map((d) => {
              return (
                <div key={d.country} className="relative rounded-xl overflow-hidden group">
                  <div className="aspect-video">
                    <img
                      src={d.photo || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80'}
                      alt={d.country}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center gap-2">
                    <span className="text-xl">{d.flag}</span>
                    <span className="text-white font-semibold text-sm drop-shadow">{d.country}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services spécialisés avec images */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-display text-3xl font-bold text-brand-navy mb-4">Nos services spécialisés pour étudiants</h2>
            <p className="text-neutral-600">Notre approche est entièrement centrée sur l&apos;étudiant.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition-shadow bg-white">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-brand-navy text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process étudiant */}
      <section className="py-20 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="font-display text-3xl font-bold text-white mb-4">De l&apos;idée à l&apos;installation</h2>
            <p className="text-neutral-400">5 étapes claires, zéro approximation.</p>
          </div>
          <div className="flex flex-col md:flex-row items-start gap-4 md:gap-0">
            {steps.map((s, i) => (
              <div key={s.number} className="flex-1 flex flex-col items-center text-center relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-brand-red/30 z-0" />
                )}
                <div className="relative z-10 w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center font-bold text-sm mb-3 shadow-md">
                  {s.number}
                </div>
                <p className="text-white font-semibold text-sm px-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logement étudiant */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Texte + petite galerie */}
            <div>
              <h2 className="font-display text-3xl font-bold text-brand-navy mb-4">
                <span className="text-brand-blue">Logement</span> Étudiant
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                De la recherche d&apos;universités à l&apos;obtention de votre visa, en passant par les conseils
                d&apos;intégration culturelle, notre équipe vous accompagne jusqu&apos;à votre installation dans votre
                nouveau logement. Nous nous assurons que vous ayez toutes les chances de vous installer sereinement.
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {[
                  'Recherche et sélection de logements adaptés',
                  'Réservation sécurisée de chambres étudiantes',
                  "Accompagnement à l'intégration culturelle",
                  'Suivi post-arrivée',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                    <CheckCircle2 size={16} className="text-brand-red mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-red text-white font-semibold hover:bg-brand-red-dark transition-colors group mb-8"
              >
                Demander un devis
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Grille de petites photos */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300&q=75',
                  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&q=75',
                  'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=300&q=75',
                  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&q=75',
                  'https://images.unsplash.com/photo-1560448075-bb485b067938?w=300&q=75',
                  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&q=75',
                ].map((src, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={src}
                      alt={`Logement étudiant ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Grande image principale */}
            <div className="self-stretch">
              <div className="rounded-2xl overflow-hidden shadow-xl h-full min-h-[400px]">
                <img
                  src="https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800&q=80"
                  alt="Logement étudiant confortable"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 bg-brand-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4">
            Prêt à décoller vers ton avenir ?
          </h2>
          <p className="text-red-100 text-lg mb-8 max-w-xl mx-auto">
            Nos experts sont disponibles maintenant. Un simple message suffit pour démarrer.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-brand-red font-bold hover:bg-red-50 transition-colors shadow-lg group"
          >
            Contactez-nous
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  )
}

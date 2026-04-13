import type { Metadata } from 'next'
import Link from 'next/link'
import { Plane, Hotel, FileText, ArrowRight, CheckCircle2, Shield, Clock, Star } from 'lucide-react'
import { getPayload } from 'payload'
// @ts-ignore
import config from '@payload-config'

export const metadata: Metadata = {
  title: 'Touristes',
  description: "Pentium Travel vous accompagne pour votre visa touristique, réservation d'hôtel et billet d'avion vers toutes les destinations.",
}

const services = [
  {
    icon: FileText,
    title: 'Visa touristique',
    description: 'Toutes destinations. Nous préparons et déposons votre dossier visa complet avec un suivi à chaque étape.',
  },
  {
    icon: Hotel,
    title: "Réservation d'hôtel",
    description: 'Des hébergements sélectionnés selon votre budget et vos préférences, réservés et confirmés avant votre départ.',
  },
  {
    icon: Plane,
    title: "Billet d'avion",
    description: 'Nous recherchons et réservons les meilleures options de vol pour votre destination et vos dates.',
  },
]

const values = [
  { icon: Shield, label: 'Fiabilité', desc: 'Dossiers traités avec rigueur et sérieux' },
  { icon: Clock,  label: 'Rapidité',  desc: 'Délais respectés, sans mauvaises surprises' },
  { icon: Star,   label: 'Excellence', desc: 'Niveau de satisfaction élevé garanti' },
]

const destinationPhotos: Record<string, string> = {
  'France': 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80',
  'États-Unis': 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600&q=80',
  'Canada': 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&q=80',
  'Espagne': 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80',
  'Maroc': 'https://images.unsplash.com/photo-1489493512598-d08130f49bea?w=600&q=80',
  'Tunisie': 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=600&q=80',
  'Émirats Arabes Unis': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
  'Turquie': 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&q=80',
  'Italie': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80',
  'Portugal': 'https://images.unsplash.com/photo-1558370781-d6196949e317?w=600&q=80',
  'Sénégal': 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80',
  "Côte d'Ivoire": 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80',
  'Gabon': 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80',
  'Chine': 'https://images.unsplash.com/photo-1508804052814-cd3ba865a116?w=600&q=80',
  'Thaïlande': 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80',
}

const steps = [
  { number: '01', title: "Votre idée de voyage", desc: 'Vous nous dites où vous voulez aller et quand.' },
  { number: '02', title: 'On planifie', desc: 'Nos experts définissent la meilleure stratégie visa, hôtel et vol.' },
  { number: '03', title: 'Visa + réservations', desc: 'Nous gérons tous les dossiers et réservations à votre place.' },
  { number: '04', title: 'Vous partez serein', desc: "Visa en main, billet et hôtel confirmés. L'esprit libre." },
]

export default async function TouristesPage() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'destinations',
    where: {
      and: [
        { type: { in: ['tourisme', 'both'] } },
        { active: { equals: true } },
      ],
    },
    limit: 50,
  })
  const destinations = result.docs.map((d) => ({
    flag: (d as any).flag ?? '',
    country: d.name,
  }))

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d0d] via-[#0d1f3c] to-[#0d0d0d] z-0" />
        <div className="absolute inset-0 opacity-10 z-0"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 60%, #7DB8D8 0%, transparent 50%)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-brand-blue text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
              <Plane size={14} />
              Voyageurs
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              L&apos;idée du voyage suffit.{' '}
              <span className="text-brand-blue">On s&apos;occupe du reste.</span>
            </h1>
            <p className="text-neutral-300 text-lg leading-relaxed mb-4 max-w-2xl">
              Quelle que soit votre destination, Pentium Travel vous accompagne depuis votre idée jusqu&apos;à la
              matérialisation de votre voyage avec un niveau de satisfaction élevé.
            </p>
            <p className="text-brand-blue font-semibold text-lg mb-8">
              C&apos;est toi le voyageur, c&apos;est nous les facilitateurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-red text-white font-bold hover:bg-brand-red-dark transition-colors shadow-lg group"
              >
                Planifier mon voyage
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/33605693375"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white text-white font-bold hover:bg-white/10 transition-colors"
              >
                WhatsApp
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

      {/* Valeurs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div key={v.label} className="flex flex-col items-center text-center bg-neutral-50 rounded-2xl p-8 border border-neutral-200">
                  <div className="w-14 h-14 rounded-full bg-brand-red flex items-center justify-center mb-4">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-display font-bold text-brand-navy text-lg mb-2">{v.label}</h3>
                  <p className="text-sm text-neutral-500">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-display text-3xl font-bold text-brand-navy mb-4">Ce que nous prenons en charge</h2>
            <p className="text-neutral-600">Notre équipe d&apos;experts gère tout. Vous n&apos;avez qu&apos;à partir.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.title} className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-brand-red flex items-center justify-center mb-5">
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-display font-bold text-brand-navy text-xl mb-3">{s.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{s.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Destinations populaires */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl font-bold text-brand-blue mb-4">
              Explorez des horizons qui éveillent vos sens
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              Plongez dans notre sélection de destinations conçues pour inspirer. Que vous recherchiez l&apos;aventure,
              la découverte culturelle ou la quiétude d&apos;un nouveau départ, chaque voyage avec Pentium Travel
              promet une expérience riche et mémorable. Laissez-vous transporter vers des lieux où chaque moment
              est une découverte et chaque panorama une invitation à la sérénité.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {destinations.map((d) => {
              const photo = destinationPhotos[d.country]
              return (
                <div key={d.country} className="relative rounded-xl overflow-hidden group">
                  <div className="aspect-video">
                    <img
                      src={photo ?? `https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80`}
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
          <p className="text-center text-sm text-neutral-400 mt-6">Et bien d&apos;autres destinations — contactez-nous pour toute demande spécifique.</p>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="font-display text-3xl font-bold text-brand-navy mb-4">Comment ça se passe ?</h2>
            <p className="text-neutral-600">Simple, rapide, sans stress.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.number} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-brand-red text-white flex items-center justify-center font-display font-bold text-lg mb-4 shadow-md">
                  {s.number}
                </div>
                <h3 className="font-display font-bold text-brand-navy mb-2">{s.title}</h3>
                <p className="text-sm text-neutral-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4">
            Votre prochaine destination vous attend.
          </h2>
          <p className="text-red-100 text-lg mb-8 max-w-xl mx-auto">
            Pentium Travel ne laisse rien à l&apos;approximation. Contactez-nous dès aujourd&apos;hui.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-brand-red font-bold hover:bg-red-50 transition-colors shadow-lg group"
          >
            Démarrer mon voyage
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  )
}

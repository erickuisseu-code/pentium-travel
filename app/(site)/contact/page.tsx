import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import ContactForm from '@/components/shared/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Pentium Travel pour votre projet étudiant ou touristique. Douala · Yaoundé.',
}

const infos = [
  {
    icon: Phone,
    label: 'Téléphone',
    lines: ['+237 657 644 907', '+33 605 69 33 75'],
    href: 'tel:+237657644907',
  },
  {
    icon: Mail,
    label: 'Email',
    lines: ['pentiumtravel@yahoo.com'],
    href: 'mailto:pentiumtravel@yahoo.com',
  },
  {
    icon: MapPin,
    label: 'Adresses',
    lines: ['Douala — Cameroun', 'Yaoundé — Cameroun'],
    href: null,
  },
  {
    icon: Clock,
    label: "Heures d'ouverture",
    lines: ['Lun – Ven : 8h00 – 18h00', 'Samedi : 09h00 – 14h00', 'Dimanche : Fermé'],
    href: null,
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-4">
            Parlons de votre projet
          </h1>
          <p className="text-neutral-300 text-lg max-w-xl mx-auto">
            Études ou tourisme — notre équipe vous répond rapidement et vous guide vers la meilleure solution.
          </p>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Infos */}
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-brand-navy mb-2">Nos coordonnées</h2>
                <p className="text-neutral-500 text-sm">Disponibles 6 jours sur 7 pour vous accompagner.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {infos.map((info) => {
                  const Icon = info.icon
                  return (
                    <div key={info.label} className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-red-light flex items-center justify-center">
                          <Icon size={14} className="text-brand-red" />
                        </div>
                        <span className="font-semibold text-sm text-brand-navy">{info.label}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        {info.lines.map((line) =>
                          info.href ? (
                            <a
                              key={line}
                              href={info.href}
                              className="text-sm text-brand-blue hover:text-brand-navy transition-colors"
                            >
                              {line}
                            </a>
                          ) : (
                            <span key={line} className="text-sm text-neutral-600">{line}</span>
                          )
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Liens rapides WhatsApp */}
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                <p className="font-semibold text-green-800 mb-2 text-sm">Réponse rapide sur WhatsApp</p>
                <a
                  href="https://wa.me/237657644907"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:text-green-900 transition-colors"
                >
                  Écrire sur WhatsApp →
                </a>
              </div>
            </div>

            {/* Formulaire */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200">
              <h2 className="font-display text-2xl font-bold text-brand-navy mb-2">Envoyer un message</h2>
              <p className="text-neutral-500 text-sm mb-6">Nous vous répondons sous 24h.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

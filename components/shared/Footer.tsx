import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { getPayload } from 'payload'
// @ts-ignore
import config from '@payload-config'

const facebookIcon = (
  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M24 12.073C24 5.404 18.629 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
)

const whatsappIcon = (
  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
)

const tiktokIcon = (
  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.24 8.24 0 0 0 4.83 1.56V6.79a4.85 4.85 0 0 1-1.06-.1z"/>
  </svg>
)

const instagramIcon = (
  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
)

export default async function Footer() {
  const payload = await getPayload({ config })
  const social = await payload.findGlobal({ slug: 'social-links' })

  const facebookHref = (social as any).facebook || null
  const whatsappNumber = (social as any).whatsapp || null
  const whatsappHref = whatsappNumber ? `https://wa.me/${whatsappNumber}` : null
  const tiktokHref = (social as any).tiktok || null
  const instagramHref = (social as any).instagram || null

  const socialLinks = [
    { label: 'Facebook',  href: facebookHref,  bg: 'bg-[#1877F2]', icon: facebookIcon },
    { label: 'WhatsApp',  href: whatsappHref,  bg: 'bg-[#25D366]', icon: whatsappIcon },
    { label: 'TikTok',    href: tiktokHref,    bg: 'bg-black',     icon: tiktokIcon },
    { label: 'Instagram', href: instagramHref, bg: 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#515BD4]', icon: instagramIcon },
  ].filter((s) => s.href)

  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Infos contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <h2 className="text-2xl font-display font-bold text-white">
            Contactez-nous
          </h2>

          {/* Adresses */}
          <div className="flex flex-col gap-1">
            <div className="flex items-start gap-2 text-neutral-400">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand-blue" />
              <div className="text-sm leading-relaxed">
                <p>Douala — Cameroun</p>
                <p>Yaoundé — Cameroun</p>
              </div>
            </div>
          </div>

          {/* Horaires */}
          <div className="flex flex-col gap-1">
            <div className="flex items-start gap-2">
              <Clock size={16} className="mt-0.5 shrink-0 text-brand-blue" />
              <div className="text-sm text-neutral-400 leading-relaxed">
                <p className="text-white font-semibold mb-1">Heures d&apos;ouverture</p>
                <p>Lundi – Vendredi : 8h00 – 18h00</p>
                <p>Samedi : 09h00 – 14h00</p>
                <p>Dimanche : Fermé</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <p className="text-white font-semibold text-sm">Contact</p>
            <a
              href="tel:+237657644907"
              className="flex items-center gap-2 text-brand-blue hover:text-white transition-colors text-sm"
            >
              <Phone size={14} />
              +237 657 644 907 / +33 605 69 33 75
            </a>
            <a
              href="mailto:pentiumtravel@yahoo.com"
              className="flex items-center gap-2 text-brand-blue hover:text-white transition-colors text-sm"
            >
              <Mail size={14} />
              pentiumtravel@yahoo.com
            </a>
          </div>

          {/* Réseaux sociaux */}
          <div className="flex flex-col gap-3">
            <p className="text-white font-semibold text-sm">Réseaux sociaux</p>
            {socialLinks.length > 0 ? (
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${s.bg} hover:opacity-80 transition-opacity`}
                  >
                    {s.icon}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 text-xs">Liens configurables dans le backoffice.</p>
            )}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-4 text-center">
        <p className="text-neutral-400 text-sm">© 2026 Pentium Travel. Tous droits réservés.</p>
      </div>
    </footer>
  )
}

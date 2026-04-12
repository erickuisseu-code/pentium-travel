'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, CheckCircle2, XCircle, AlertCircle, ArrowRight } from 'lucide-react'
import { checkVisa, countries, destinations } from '@/lib/visa-data'
import type { VisaStatus } from '@/lib/visa-data'

const statusConfig: Record<VisaStatus, { icon: typeof CheckCircle2; color: string; bg: string }> = {
  'not-required': { icon: CheckCircle2, color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
  'required':     { icon: XCircle,      color: 'text-brand-red',  bg: 'bg-brand-red-light border-brand-red/20' },
  'on-arrival':   { icon: AlertCircle,  color: 'text-amber-700',  bg: 'bg-amber-50 border-amber-200' },
  'evisa':        { icon: AlertCircle,  color: 'text-brand-blue-dark', bg: 'bg-brand-blue-light border-brand-blue/20' },
}

export default function VisaCheckSection() {
  const [passport, setPassport] = useState('')
  const [destination, setDestination] = useState('')
  const [result, setResult] = useState<ReturnType<typeof checkVisa> | null>(null)

  function handleCheck() {
    if (!passport || !destination) return
    setResult(checkVisa(passport, destination))
  }

  const StatusIcon = result ? statusConfig[result.status].icon : null

  return (
    <section className="py-20 md:py-28 bg-neutral-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            Ai-je besoin d'un visa ?
          </h2>
          <p className="text-neutral-600 text-lg leading-relaxed">
            Sélectionnez votre pays de passeport et votre destination pour une vérification rapide.
          </p>
        </div>

        {/* Widget */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-neutral-200">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Passeport */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-brand-navy">
                Pays du passeport
              </label>
              <select
                value={passport}
                onChange={(e) => { setPassport(e.target.value); setResult(null) }}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition"
              >
                <option value="">-- Sélectionner --</option>
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Destination */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-brand-navy">
                Destination
              </label>
              <select
                value={destination}
                onChange={(e) => { setDestination(e.target.value); setResult(null) }}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition"
              >
                <option value="">-- Sélectionner --</option>
                {destinations.map((d) => (
                  <option key={d.code} value={d.code}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Bouton vérification */}
          <button
            onClick={handleCheck}
            disabled={!passport || !destination}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-red text-white font-semibold text-sm hover:bg-brand-red-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Search size={16} />
            Vérifier
          </button>

          {/* Résultat */}
          {result && StatusIcon && (
            <div className={`mt-6 p-4 rounded-xl border ${statusConfig[result.status].bg}`}>
              <div className="flex items-start gap-3">
                <StatusIcon size={20} className={`${statusConfig[result.status].color} mt-0.5 shrink-0`} />
                <div>
                  <p className={`font-bold text-sm ${statusConfig[result.status].color}`}>
                    {result.label}
                  </p>
                  <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
                    {result.description}
                  </p>
                </div>
              </div>

              {result.cta && (
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-red hover:underline group"
                >
                  Nos experts vous accompagnent
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ChevronDown, Loader2, ArrowRight, CheckCircle2, AlertTriangle, XCircle, Clock, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { COUNTRIES_SORTED, flagEmoji, type Country } from '@/data/countries'

type Requirement = string

interface ResultInfo {
  label: string
  description: string
  color: 'green' | 'orange' | 'yellow' | 'red' | 'gray'
  icon: React.ReactNode
  ctaLabel: string
}

function interpretRequirement(req: Requirement): ResultInfo {
  const r = req.trim().toLowerCase()

  const days = Number(r)
  if (!isNaN(days) && days > 0) {
    return {
      label: `Séjour libre — ${days} jours`,
      description: `Vous pouvez entrer sans visa pour un séjour allant jusqu'à ${days} jours.`,
      color: 'green',
      icon: <CheckCircle2 className="w-5 h-5" />,
      ctaLabel: 'Réserver votre voyage',
    }
  }

  if (r === 'visa free') {
    return {
      label: 'Sans visa',
      description: 'Accès libre sans visa requis. Profitez de votre voyage !',
      color: 'green',
      icon: <CheckCircle2 className="w-5 h-5" />,
      ctaLabel: 'Réserver votre voyage',
    }
  }

  if (r === 'visa on arrival') {
    return {
      label: "Visa à l'arrivée",
      description: "Vous pouvez obtenir votre visa directement à l'aéroport à votre arrivée.",
      color: 'yellow',
      icon: <Clock className="w-5 h-5" />,
      ctaLabel: 'Prendre rendez-vous pour conseils',
    }
  }

  if (r === 'e-visa') {
    return {
      label: 'E-Visa requis',
      description: 'Un visa électronique doit être obtenu en ligne avant votre départ.',
      color: 'orange',
      icon: <AlertTriangle className="w-5 h-5" />,
      ctaLabel: 'Nous aider à obtenir votre e-visa',
    }
  }

  if (r === 'eta') {
    return {
      label: 'Autorisation ETA',
      description: "Une autorisation de voyage électronique (ETA) est requise avant votre arrivée.",
      color: 'orange',
      icon: <AlertTriangle className="w-5 h-5" />,
      ctaLabel: 'Obtenir votre ETA avec nous',
    }
  }

  if (r === 'visa required') {
    return {
      label: 'Visa obligatoire',
      description: 'Un visa est requis avant le voyage. Pentium Travel vous accompagne dans votre demande.',
      color: 'red',
      icon: <XCircle className="w-5 h-5" />,
      ctaLabel: 'Démarrer ma demande de visa',
    }
  }

  if (r === 'no admission') {
    return {
      label: 'Accès refusé',
      description: "Les ressortissants de ce passeport ne sont généralement pas admis dans cette destination.",
      color: 'red',
      icon: <XCircle className="w-5 h-5" />,
      ctaLabel: 'Prendre conseil avec un expert',
    }
  }

  if (r === '-1') {
    return {
      label: 'Pas besoin de visa',
      description: "Vous voyagez dans votre propre pays — aucun visa ni formalité d'entrée n'est requis.",
      color: 'green',
      icon: <CheckCircle2 className="w-5 h-5" />,
      ctaLabel: 'Découvrir nos services',
    }
  }

  return {
    label: 'Statut inconnu',
    description: "Nous n'avons pas pu déterminer les conditions d'entrée. Contactez nos experts.",
    color: 'gray',
    icon: <Globe className="w-5 h-5" />,
    ctaLabel: 'Contacter nos experts',
  }
}

const COLOR_CLASSES = {
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  text: 'text-green-700'  },
  yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700' },
  red:    { bg: 'bg-red-50',    border: 'border-red-200',    text: 'text-red-700'    },
  gray:   { bg: 'bg-gray-50',   border: 'border-gray-200',   text: 'text-gray-700'   },
}

interface ComboBoxProps {
  id: string
  label: string
  placeholder: string
  value: Country | null
  onChange: (c: Country | null) => void
}

function CountryComboBox({ id, label, placeholder, value, onChange }: ComboBoxProps) {
  const [open,  setOpen]  = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    if (!query.trim()) return COUNTRIES_SORTED
    const q = query.toLowerCase()
    return COUNTRIES_SORTED.filter(
      (c) => c.fr.toLowerCase().includes(q) || c.en.toLowerCase().includes(q),
    )
  }, [query])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const select = (c: Country) => {
    onChange(c)
    setOpen(false)
    setQuery('')
  }

  return (
    <div ref={ref} className="relative w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1.5">
        {label}
      </label>
      <button
        id={id}
        type="button"
        onClick={() => { setOpen((o) => !o); setQuery('') }}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl border-2 bg-white text-left transition-all"
        style={{ borderColor: open ? 'var(--color-navy)' : '#E5E7EB' }}
      >
        {value ? (
          <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
            <span className="text-xl leading-none">{flagEmoji(value.iso2)}</span>
            {value.fr}
          </span>
        ) : (
          <span className="text-sm text-gray-400">{placeholder}</span>
        )}
        <ChevronDown
          className="w-4 h-4 text-gray-400 shrink-0 transition-transform"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden"
          >
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un pays…"
                className="flex-1 text-sm outline-none bg-transparent"
              />
            </div>
            <ul className="max-h-56 overflow-y-auto">
              {filtered.length === 0 ? (
                <li className="px-4 py-3 text-sm text-gray-400 text-center">Aucun résultat</li>
              ) : filtered.map((c) => (
                <li key={c.en}>
                  <button
                    type="button"
                    onClick={() => select(c)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg leading-none w-6 text-center">{flagEmoji(c.iso2)}</span>
                    <span className="font-medium text-gray-800">{c.fr}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface PassportCheckerProps {
  compact?: boolean
}

export default function PassportChecker({ compact = false }: PassportCheckerProps) {
  const router = useRouter()

  const [passport,    setPassport]    = useState<Country | null>(null)
  const [destination, setDestination] = useState<Country | null>(null)
  const [result,      setResult]      = useState<ResultInfo | null>(null)
  const [loading,     setLoading]     = useState(false)
  const [index,       setIndex]       = useState<Record<string, Record<string, string>> | null>(null)
  const [indexError,  setIndexError]  = useState(false)

  const ensureIndex = async () => {
    if (index) return index
    setLoading(true)
    try {
      const res = await fetch('/data/passport-index.json')
      if (!res.ok) throw new Error('HTTP ' + res.status)
      const data = await res.json() as Record<string, Record<string, string>>
      setIndex(data)
      setLoading(false)
      return data
    } catch {
      setIndexError(true)
      setLoading(false)
      return null
    }
  }

  useEffect(() => {
    if (!passport || !destination) { setResult(null); return }

    if (passport.en === destination.en) {
      setResult(interpretRequirement('-1'))
      return
    }

    let cancelled = false

    const check = async () => {
      const data = await ensureIndex()
      if (cancelled || !data) return
      const req = data[passport.en]?.[destination.en]
      setResult(interpretRequirement(req ?? 'unknown'))
    }

    check()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passport, destination])

  const handleCta = () => {
    router.push('/contact')
  }

  const inner = (
    <div className="space-y-4">
      <div className={`grid gap-3 ${compact ? 'grid-cols-1' : 'sm:grid-cols-2'}`}>
        <CountryComboBox
          id="passport-select"
          label="🛂 Mon passeport"
          placeholder="Sélectionnez votre nationalité"
          value={passport}
          onChange={(c) => { setPassport(c); setResult(null) }}
        />
        <CountryComboBox
          id="destination-select"
          label="✈️ Destination"
          placeholder="Sélectionnez une destination"
          value={destination}
          onChange={(c) => { setDestination(c); setResult(null) }}
        />
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 py-4 text-sm text-gray-500">
          <Loader2 className="w-4 h-4 animate-spin" />
          Vérification en cours…
        </div>
      )}

      {indexError && (
        <div className="rounded-xl p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
          Impossible de charger les données. Veuillez réessayer ou nous contacter directement.
        </div>
      )}

      <AnimatePresence mode="wait">
        {result && !loading && (
          <motion.div
            key={`${passport?.en}-${destination?.en}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className={`rounded-2xl border-2 p-5 ${COLOR_CLASSES[result.color].bg} ${COLOR_CLASSES[result.color].border}`}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className={`mt-0.5 ${COLOR_CLASSES[result.color].text}`}>{result.icon}</div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  {passport && destination && (
                    <span className="text-sm text-gray-500">
                      {flagEmoji(passport.iso2)} {passport.fr}
                      <span className="mx-1.5">→</span>
                      {flagEmoji(destination.iso2)} {destination.fr}
                    </span>
                  )}
                </div>
                <p className={`font-bold text-base ${COLOR_CLASSES[result.color].text}`}>{result.label}</p>
                <p className="text-sm text-gray-600 mt-1">{result.description}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Données indicatives (mise à jour jan. / juil.). Vérifiez auprès de l&apos;ambassade avant votre départ.
            </p>
            <button
              onClick={handleCta}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--color-navy)' }}
            >
              {result.ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!result && !loading && !indexError && (!passport || !destination) && (
        <p className="text-xs text-center text-gray-400">
          Sélectionnez votre passeport et une destination pour obtenir le résultat instantanément.
        </p>
      )}
    </div>
  )

  if (compact) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
          <Globe className="w-4 h-4 text-red-500" />
          Vérificateur de visa
        </h3>
        <p className="text-xs text-gray-500 mb-4">Besoin d&apos;un visa pour votre destination ?</p>
        {inner}
      </div>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: 'rgba(7,38,83,0.08)', color: 'var(--color-navy)' }}
          >
            Outil gratuit
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-playfair)', color: 'var(--color-navy)' }}
          >
            Ai-je besoin d&apos;un visa ?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Sélectionnez votre passeport et votre destination — le résultat s&apos;affiche instantanément.
            <br />
            Nos experts vous accompagnent si un visa est requis.
          </p>
        </div>
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8">
          {inner}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          {[
            { icon: '🔒', text: '100% gratuit, sans inscription' },
            { icon: '⚡', text: 'Résultat instantané' },
            { icon: '🌍', text: '199 pays couverts' },
            { icon: '✅', text: 'Données mises à jour 2× / an' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-1.5">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

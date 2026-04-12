'use client'

import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

const services = [
  'Visa étudiant',
  'Accompagnement académique',
  'Logement étudiant',
  'Visa touristique',
  "Réservation d'hôtel",
  "Billet d'avion",
  'Autre',
]

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClass = 'w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition placeholder:text-neutral-400'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-brand-navy uppercase tracking-wide">Nom complet *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Jean Dupont"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-brand-navy uppercase tracking-wide">Email *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="jean@exemple.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-brand-navy uppercase tracking-wide">Téléphone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+237 6XX XXX XXX"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-brand-navy uppercase tracking-wide">Service souhaité *</label>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">-- Choisir --</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-brand-navy uppercase tracking-wide">Votre message *</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Décrivez votre projet en quelques lignes..."
          className={inputClass + ' resize-none'}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-red text-white font-semibold text-sm hover:bg-brand-red-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {status === 'loading' ? (
          <><Loader2 size={16} className="animate-spin" /> Envoi en cours...</>
        ) : (
          <><Send size={16} /> Envoyer le message</>
        )}
      </button>

      {status === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700 font-medium">
          Message envoyé ! Nous vous répondons sous 24h.
        </div>
      )}
      {status === 'error' && (
        <div className="bg-brand-red-light border border-brand-red/20 rounded-xl px-4 py-3 text-sm text-brand-red font-medium">
          Une erreur est survenue. Veuillez réessayer ou nous contacter directement par WhatsApp.
        </div>
      )}
    </form>
  )
}

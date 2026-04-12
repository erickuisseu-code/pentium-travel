export type VisaStatus = 'required' | 'not-required' | 'on-arrival' | 'evisa'

export interface VisaResult {
  status: VisaStatus
  label: string
  description: string
  cta: boolean
}

// Données : [pays_passeport][pays_destination] = statut
// Source : simplification des règles générales connues (à enrichir)
const visaRules: Record<string, Record<string, VisaStatus>> = {
  CM: { // Cameroun
    FR: 'required',
    US: 'required',
    CA: 'required',
    ES: 'required',
    DE: 'required',
    GB: 'required',
    BE: 'required',
    CH: 'required',
    MA: 'not-required',
    SN: 'not-required',
    CI: 'not-required',
    GA: 'not-required',
    TH: 'on-arrival',
    TR: 'on-arrival',
    DZ: 'required',
    TN: 'required',
    EG: 'on-arrival',
    AE: 'required',
    CN: 'required',
  },
  SN: { // Sénégal
    FR: 'required',
    US: 'required',
    CA: 'required',
    ES: 'required',
    DE: 'required',
    MA: 'not-required',
    CI: 'not-required',
    CM: 'not-required',
  },
  CI: { // Côte d'Ivoire
    FR: 'required',
    US: 'required',
    CA: 'required',
    DE: 'required',
    MA: 'not-required',
    SN: 'not-required',
    CM: 'not-required',
  },
  GA: { // Gabon
    FR: 'required',
    US: 'required',
    CA: 'required',
    CM: 'not-required',
  },
}

const statusLabels: Record<VisaStatus, { label: string; description: string }> = {
  required: {
    label: 'Visa requis',
    description: 'Un visa est obligatoire pour voyager dans cette destination. Nos experts vous accompagnent dans toutes les démarches.',
  },
  'not-required': {
    label: 'Visa non requis',
    description: 'Bonne nouvelle ! Vous n\'avez pas besoin de visa pour cette destination. Votre passeport suffit.',
  },
  'on-arrival': {
    label: 'Visa à l\'arrivée',
    description: 'Vous pouvez obtenir votre visa directement à l\'aéroport à votre arrivée. Nos experts peuvent vous préparer les documents nécessaires.',
  },
  evisa: {
    label: 'eVisa disponible',
    description: 'Un visa électronique est disponible pour cette destination. Nos experts gèrent la procédure pour vous.',
  },
}

export function checkVisa(passportCountry: string, destination: string): VisaResult {
  const rules = visaRules[passportCountry]
  if (!rules) {
    return {
      status: 'required',
      label: 'Vérification recommandée',
      description: 'Nous n\'avons pas de données pour ce passeport. Contactez nos experts pour une vérification complète.',
      cta: true,
    }
  }

  const status = rules[destination]
  if (!status) {
    return {
      status: 'required',
      label: 'Vérification recommandée',
      description: 'Nous n\'avons pas de données précises pour cette combinaison. Contactez nos experts pour une réponse fiable.',
      cta: true,
    }
  }

  return {
    status,
    ...statusLabels[status],
    cta: status !== 'not-required',
  }
}

export const countries = [
  { code: 'CM', name: 'Cameroun' },
  { code: 'SN', name: 'Sénégal' },
  { code: 'CI', name: "Côte d'Ivoire" },
  { code: 'GA', name: 'Gabon' },
  { code: 'CD', name: 'Congo (RDC)' },
  { code: 'CG', name: 'Congo (Brazzaville)' },
  { code: 'TG', name: 'Togo' },
  { code: 'BJ', name: 'Bénin' },
  { code: 'ML', name: 'Mali' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'GN', name: 'Guinée' },
  { code: 'MG', name: 'Madagascar' },
]

export const destinations = [
  { code: 'FR', name: 'France' },
  { code: 'US', name: 'États-Unis' },
  { code: 'CA', name: 'Canada' },
  { code: 'ES', name: 'Espagne' },
  { code: 'DE', name: 'Allemagne' },
  { code: 'GB', name: 'Royaume-Uni' },
  { code: 'BE', name: 'Belgique' },
  { code: 'CH', name: 'Suisse' },
  { code: 'MA', name: 'Maroc' },
  { code: 'TN', name: 'Tunisie' },
  { code: 'DZ', name: 'Algérie' },
  { code: 'EG', name: 'Égypte' },
  { code: 'SN', name: 'Sénégal' },
  { code: 'CI', name: "Côte d'Ivoire" },
  { code: 'CM', name: 'Cameroun' },
  { code: 'AE', name: 'Émirats Arabes Unis' },
  { code: 'TR', name: 'Turquie' },
  { code: 'TH', name: 'Thaïlande' },
  { code: 'CN', name: 'Chine' },
]

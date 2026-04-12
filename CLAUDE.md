# CLAUDE.md — Pentium Travel

## Identité du projet

**Nom** : Pentium Travel  
**Type** : Site vitrine professionnel avec backoffice  
**Activité** : Agence de voyage spécialisée en accompagnement étudiant (études à l'étranger) et visa touristique  
**Clientèle cible** : Étudiants camerounais post-bac, voyageurs toutes destinations  
**Langue** : Français (principal)  
**Copyright** : © 2026 Pentium Travel

---

## Stack technique (figée, ne pas dévier)

| Couche | Technologie |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v3 + shadcn/ui |
| CMS / Backoffice | Payload CMS v3 (self-hosted) |
| Base de données | PostgreSQL |
| Auth admin | Payload CMS natif |
| Hébergement | Hostinger VPS Ubuntu (Nginx + PM2) |
| Emails | Resend |
| Médias | Stockage local VPS / Cloudinary |
| Langage | TypeScript strict |

---

## Structure des dossiers (à respecter)

```
pentium-travel/
├── app/                        # Next.js App Router
│   ├── (site)/                 # Groupe layout public
│   │   ├── page.tsx            # Page d'accueil
│   │   ├── etudiants/
│   │   │   └── page.tsx
│   │   ├── touristes/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   ├── (payload)/              # Groupe layout admin
│   │   └── admin/[[...segments]]/
│   └── layout.tsx
├── components/
│   ├── ui/                     # Composants shadcn/ui
│   ├── sections/               # Sections de pages (Hero, Testimonials, etc.)
│   └── shared/                 # Navbar, Footer, VisaCheck, etc.
├── lib/
│   ├── visa-data.ts            # Données JSON visa check
│   └── utils.ts
├── payload/
│   ├── collections/            # Destinations, Testimonials, Pages
│   └── payload.config.ts
├── public/
│   └── images/
├── CLAUDE.md
├── DESIGN.md
└── PROJECT.md
```

---

## Conventions de code (obligatoires)

- **Composants** : PascalCase → `HeroSection.tsx`, `TestimonialCard.tsx`
- **Fonctions utilitaires** : camelCase → `formatDate.ts`
- **Fichiers de config** : kebab-case → `payload.config.ts`
- **CSS** : uniquement Tailwind, zéro CSS custom sauf cas exceptionnel documenté
- **Imports** : absolus via `@/` (configuré dans tsconfig)
- **Pas de `any`** en TypeScript, typage strict obligatoire
- **Composants server-side par défaut**, `"use client"` uniquement si interaction nécessaire

---

## Pages du site (liste figée)

| Route | Description |
|---|---|
| `/` | Page d'accueil complète |
| `/etudiants` | Service accompagnement étudiant |
| `/touristes` | Service visa et voyage touristique |
| `/contact` | Formulaire de contact / devis |
| `/admin` | Backoffice Payload CMS |

**Aucune autre page ne doit être créée sans validation explicite.**

---

## Sections de la page d'accueil (ordre figé)

1. `HeroSection` — Accroche + 2 CTA (Étudiant / Touriste)
2. `ServicesSection` — Aperçu 2 services avec CTA vers pages dédiées
3. `DestinationsSection` — Listes texte par région (pas de photos)
4. `ProcessSection` — Timeline étapes communes aux 2 services
5. `VisaCheckSection` — Widget interactif (2 dropdowns + réponse dynamique)
6. `TestimonialsSection` — Carrousel texte + vidéos
7. `CtaFinalSection` — CTA "Démarrer mon projet"
8. `Footer` — Contacts, horaires, réseaux sociaux

---

## Contenu réel à utiliser (extrait de l'ancien site)

### Contacts
- Téléphone Cameroun : +237 657 644 907
- Téléphone France : +33 605 69 33 75
- Email : pentiumtravel@yahoo.com
- Adresses : Douala-Cameroun · Yaoundé-Cameroun

### Horaires
- Lundi–Vendredi : 8h00 – 18h00
- Samedi : 09h00 – 14h00
- Dimanche : Fermé

### Réseaux sociaux
- Facebook, WhatsApp, TikTok, Instagram

### Services étudiants (3 piliers)
1. **Consultation personnalisée** — Objectifs d'études, options universitaires, budget
2. **Assistance complète aux admissions** — Sélection programmes, préparation dossiers candidature
3. **Processus de visa et logistique** — Démarches visa étudiant, organisation voyage départ → arrivée

### Destinations études
France · USA · Canada · Espagne

### Accroche marketing clé
> "BAC EN POCHE · VISA EN MAIN !"  
> "Tu viens d'avoir ton bac ? Pentium Travel t'accompagne de l'idée jusqu'à ton installation."

### Témoignages existants
| Nom | Pays | Texte |
|---|---|---|
| Joyce Kamdem | USA | "Professionnalisme rare et efficacité remarquable. Merci Mr Yves et toute l'équipe." |
| Jeanne Tchatoie | Allemagne | "Simply exceptional service. Professionalism, speed, and efficiency at their best." |
| Léa Dogmo | France | "Je n'ai pas de mots pour décrire le service exceptionnel que j'ai reçu." |
| Coralie Bridaelle | France | "L'équipe s'est surpassée pour répondre à nos besoins et a dépassé nos attentes." |
| Franck Essaka | Canada | "Grâce à votre sérieux, le rêve devient réalité. Je recommande à 100%." |
| Famille Mbappé | Cameroun | "Service exceptionnel, connaissance de la région inégalée. Vivement recommandé." |

---

## Collections Payload CMS (backoffice)

| Collection | Champs gérables |
|---|---|
| `destinations` | nom, région, type (études/touriste/les deux), actif |
| `testimonials` | nom, pays, texte, photo, vidéo (URL), type (texte/vidéo), publié |
| `contacts` | nom, email, téléphone, service demandé, message, date |

---

## Logo & Identité visuelle

- **Fichier** : PNG fond blanc, à placer dans `public/images/logo.png`
- **Composition** : 3 arcs concentriques (rouge, bleu ciel, rose) + avion noir silhouette + texte "PENTIUM TRAVEL" en gras noir
- **Usage navbar** : `h-12 w-auto` — ne jamais déformer les proportions
- **Couleurs extraites (source de vérité pour `tailwind.config.ts`)** :
  - Rouge primaire : `#B91C1C` → CTAs, badges, titres de section
  - Bleu ciel : `#7DB8D8` → éléments secondaires, sous-titres, décorations
  - Rose : `#D4789A` → accents décoratifs uniquement
  - Noir logo : `#0D0D0D` → textes forts, fond footer, titres H1
- **Référence complète** : voir `DESIGN.md`

---

## Règles absolues

1. Ne jamais créer une page non listée dans ce fichier sans validation
2. Ne jamais utiliser de CSS custom si Tailwind peut le faire
3. Ne jamais inventer du contenu — utiliser uniquement le contenu extrait ci-dessus
4. Toujours mettre à jour `PROJECT.md` après chaque session de travail
5. Toujours vérifier `PROJECT.md` en début de session avant de coder quoi que ce soit
6. Les destinations sont des listes texte, jamais des cards avec photos
7. Le Visa Check est une section de la homepage, pas une page séparée
8. Les témoignages sont une section de la homepage, pas une page séparée

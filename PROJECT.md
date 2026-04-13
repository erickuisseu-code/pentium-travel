# PROJECT.md — État du projet Pentium Travel

> Lire ce fichier EN PREMIER à chaque nouvelle session.  
> Le mettre à jour EN FIN de session avant de fermer.  
> Ne jamais agir sur des suppositions — vérifier ici l'état réel.

---

## Informations générales

- **Dernière mise à jour** : 2026-04-13 (session 3)
- **Phase en cours** : Modifications ciblées post-contenu
- **Hébergement cible** : Hostinger VPS Ubuntu (Nginx + PM2)
- **Référence design** : Voir `DESIGN.md`
- **Référence technique** : Voir `CLAUDE.md`

---

## Stack technique réelle (post-setup)

| Couche | Technologie | Notes |
|---|---|---|
| Framework | Next.js 16.2.3 (App Router) | Turbopack désactivé (`--webpack`) |
| Styling | Tailwind CSS v4 (`@theme` dans globals.css) | Pas de tailwind.config.ts |
| CMS | Payload CMS v3.82.1 | Self-hosted, route group `(payload)` |
| Base de données | PostgreSQL local | `pentium_travel` / postgres:postgres123 |
| Auth admin | Payload CMS natif | admin@pentiumtravel.com |
| Emails | Resend (clé placeholder) | À configurer en production |
| Médias | Stockage local | `/public/images/` |
| Langage | TypeScript strict | |

---

## Ce qui est décidé et figé

### Architecture
- Next.js App Router avec **deux route groups** distincts :
  - `(site)` → layout root avec Navbar/Footer/fonts/globals.css
  - `(payload)` → layout root avec Payload `RootLayout` + `handleServerFunctions`
- **Pas de `app/layout.tsx` racine** (supprimé — pattern multiple root layouts)
- 4 pages publiques : `/` · `/etudiants` · `/touristes` · `/contact`
- 1 espace admin : `/admin` (Payload CMS)
- Visa Check = section homepage (pas de page dédiée)
- Témoignages = section homepage (pas de page dédiée)
- Destinations = listes texte uniquement, pas de photos, pas de pages détail

### Contenu validé
- Tous les témoignages extraits de l'ancien site (6 clients identifiés)
- Contacts officiels : +237 657 644 907 · +33 605 69 33 75 · pentiumtravel@yahoo.com
- Adresses : Douala · Yaoundé (Cameroun)
- Réseaux : Facebook · WhatsApp · TikTok · Instagram
- Accroche clé : "BAC EN POCHE · VISA EN MAIN !"

### Sections homepage (ordre figé)
1. HeroSection
2. ServicesSection
3. DestinationsSection
4. ProcessSection
5. VisaCheckSection
6. TestimonialsSection
7. CtaFinalSection
8. Footer

---

## Ce qui est fait ✅

### Phase 1 — Setup projet
- [x] Next.js 16.2.3 (TypeScript + Tailwind v4 + App Router)
- [x] Payload CMS v3.82.1 installé et configuré
- [x] PostgreSQL local configuré (`pentium_travel`)
- [x] Migrations Payload appliquées (12 tables créées)
- [x] Premier utilisateur admin créé (`admin@pentiumtravel.com`)
- [x] `globals.css` avec palette Pentium Travel via `@theme`
- [x] `tsconfig.json` avec alias `@payload-config` → `./payload.config.ts`
- [x] `next.config.ts` avec `withPayload` wrapper
- [x] `.env.local` configuré
- [x] Structure dossiers créée

### Phase 2 — Composants partagés
- [x] `Navbar` (logo h-20, liens, CTA rouge, hamburger mobile)
- [x] `Footer` (grille contacts, horaires, réseaux sociaux — sans logo)
- [x] Layout `(site)/layout.tsx` → root layout avec `<html>`, fonts, globals.css

### Phase 3 — Page d'accueil
- [x] `HeroSection` (gradient sombre, badge, 2 CTA)
- [x] `ServicesSection` (2 cartes service)
- [x] `DestinationsSection` (listes texte par région)
- [x] `ProcessSection` (timeline 5 étapes)
- [x] `VisaCheckSection` (widget interactif 2 dropdowns)
- [x] `TestimonialsSection` (carrousel 6 témoignages)
- [x] `CtaFinalSection` (CTA rouge)
- [x] `app/(site)/page.tsx` (homepage complète)

### Phase 4 — Pages dédiées
- [x] `/etudiants` (3 piliers, logement, CTA)
- [x] `/touristes` (services, destinations, CTA)
- [x] `/contact` (formulaire + ContactForm avec états idle/loading/success/error)
- [x] `app/api/contact/route.ts` (handler POST)
- [x] `lib/visa-data.ts` (checkVisa, pays, destinations)

### Phase 5 — Backoffice Payload CMS
- [x] Collection `destinations` (nom, région, type, actif)
- [x] Collection `testimonials` (nom, pays, texte, vidéo URL, photo, publié, ordre)
- [x] Collection `contacts` (formulaire, statut lead)
- [x] Collection `media` (upload images)
- [x] Admin 500 résolu (layout `(payload)` avec `RootLayout` Payload + server action)
- [x] Admin UI brandé aux couleurs Pentium Travel :
  - Sidebar fond noir (`#0D0D0D`)
  - Boutons primaires rouge (`#B91C1C`)
  - Focus ring bleu (`#7DB8D8`)
  - Logo Pentium Travel sur page login et sidebar
  - Bordure rouge en haut du header

---

## Ce qui reste à faire

### Modifications ciblées (en cours)
- [x] Connecter `TestimonialsSection` → données Payload (seeded + fetch local API)
- [x] Connecter destinations étudiants/touristes → données Payload (seeded + fetch local API)
- [x] Champ `flag` ajouté à la collection `destinations` (emoji drapeau)
- [x] Route `/api/seed` créée pour peupler la BD (6 témoignages, 15 destinations)
- [x] Tous les numéros WhatsApp CTA → numéro France (+33 605 69 33 75)
- [x] Section logement étudiant : grande image principale + grille 3×3 petites photos (Unsplash)
- [x] `next.config.ts` : `images.unsplash.com` ajouté aux remotePatterns
- [x] `TestimonialsSection` → fond blanc (refonte couleurs)
- [x] Services étudiants : 3 vraies images marketing depuis `public/services/`
- [x] Destinations : grille photo avec overlay (flag + nom) sur touristes et étudiants
- [x] Champ `photo` (URL) ajouté à la collection `destinations` → gérable depuis backoffice
- [x] Seed mis à jour avec URLs photos pour les 15 destinations
- [x] Pages lisent `d.photo` depuis la BD (plus de mapping hardcodé)
- [x] Slider hero homepage : 5 photos HD (Paris, NY, Dubaï, Barcelone, Istanbul), auto 4s, pause au survol, indicateurs
- [x] Collection `hero-slides` créée (label, imageUrl, order, active) → gérable depuis backoffice
- [x] Seed mis à jour : 5 slides seedés
- [x] PassportChecker intégré en remplacement de VisaCheckSection :
  - 199 pays (passport-index-dataset, open-source)
  - Combobox avec recherche filtrée + emoji drapeaux
  - Chargement lazy du JSON (892 KB) au premier clic
  - Résultat coloré instantané (vert/jaune/orange/rouge)
  - Animations Framer Motion
  - `data/countries.ts` créé (types + COUNTRIES_SORTED + flagEmoji)
  - `scripts/update-passport-data.mjs` pour régénérer le JSON
  - `public/data/passport-index.json` généré (199 passeports)
- [ ] Brancher Resend sur `app/api/contact/route.ts` (actuellement placeholder)
- [ ] Sauvegarder les soumissions contact dans Payload (collection `contacts`)

### Phase 7 — Déploiement VPS
- [ ] Configurer Nginx
- [ ] Configurer PM2
- [ ] SSL via Let's Encrypt
- [ ] Variables d'environnement production
- [ ] Migration DB production

---

## Bugs / points d'attention

- **Turbopack** : désactivé via `--webpack` dans tous les scripts (Turbopack casse les React Context de Payload)
- **Logo warning** : Next.js Image avertit que width/height sont modifiés — non bloquant
- **Resend** : clé placeholder `re_placeholder` — à remplacer en production
- **Email adapter Payload** : non configuré → emails écrits dans la console (normal en dev)

---

## Décisions validées

- [x] **Domaine** : pentium-travel.com
- [x] **Logo** : `public/images/logo.jpeg` (JPEG, pas de SVG)
- [x] **Prix** : aucun prix affiché sur le site
- [x] **Langue** : 100% français, pas d'internationalisation
- [x] **Vidéos témoignages** : liens YouTube/Vimeo (pas d'upload direct)
- [x] **Déploiement** : différé (à faire quand le site est finalisé)
- [x] **Sections** : Visa Check et Témoignages = sections homepage uniquement

---

## Journal des sessions

### 2026-04-12 — Session 1 (cadrage)
- Analyse de l'ancien site Wix (6 captures)
- Définition complète de l'architecture, des pages, des sections
- Extraction de tout le contenu existant
- Création des 3 fichiers de cadrage (CLAUDE.md, DESIGN.md, PROJECT.md)

### 2026-04-12 — Session 2 (build complet + admin fix + branding)
- Phases 1 à 5 complétées (setup, composants, homepage, pages, backoffice)
- Résolution du bug admin 500 : pattern "multiple root layouts" Next.js
  - `app/layout.tsx` racine supprimé
  - `(site)/layout.tsx` → root layout complet avec `<html>`, fonts, CSS
  - `(payload)/layout.tsx` → `RootLayout` Payload avec `handleServerFunctions` server action
- Désactivation Turbopack (`--webpack`) : Turbopack cassait les React Context Payload
- Branding admin : CSS custom (`admin-custom.css`), `AdminLogo`, `AdminIcon`
- **Prochaine étape** : modifications ciblées + connexion données Payload + Resend

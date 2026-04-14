# PROJECT.md — État du projet Pentium Travel

> Lire ce fichier EN PREMIER à chaque nouvelle session.
> Le mettre à jour EN FIN de session avant de fermer.
> Ne jamais agir sur des suppositions — vérifier ici l'état réel.

---

## Informations générales

- **Dernière mise à jour** : 2026-04-13 (session 6)
- **Phase en cours** : Finitions front + préparation déploiement
- **Hébergement cible** : Hostinger VPS Ubuntu (Nginx + PM2)
- **Référence design** : Voir `DESIGN.md`
- **Référence technique** : Voir `CLAUDE.md`

---

## Stack technique réelle

| Couche | Technologie | Notes |
|---|---|---|
| Framework | Next.js 16.2.3 (App Router) | Turbopack désactivé (`--webpack`) |
| Styling | Tailwind CSS v4 (`@theme` dans globals.css) | Pas de tailwind.config.ts |
| CMS | Payload CMS v3.82.1 | Self-hosted, route group `(payload)` |
| Base de données | PostgreSQL local | `pentium_travel` / postgres:postgres123 |
| Auth admin | Payload CMS natif | admin@pentiumtravel.com |
| Emails | nodemailer + Brevo SMTP | smtp-relay.brevo.com:587 |
| Médias | Stockage local VPS | `/public/uploads/` (Payload) + `/public/images/` |
| Animations | Framer Motion | PassportChecker, HeroSection |
| Langage | TypeScript strict | |

---

## Architecture (figée)

- Next.js App Router avec **deux route groups** distincts :
  - `(site)` → root layout avec Navbar/Footer/fonts/globals.css
  - `(payload)` → root layout avec Payload `RootLayout` + `handleServerFunctions`
- **Pas de `app/layout.tsx` racine** (supprimé — pattern multiple root layouts Next.js)
- 4 pages publiques : `/` · `/etudiants` · `/touristes` · `/contact`
- 1 espace admin : `/admin` (Payload CMS)

## Sections homepage (ordre réel en production)

1. `HeroSection` — Slider auto (4s) photos HD, pause au survol, indicateurs dots
2. `ServicesSection` — 2 cartes service (Étudiant / Touriste)
3. `DestinationsSection` — Grille photos avec overlay (flag + nom), 3 régions
4. `ProcessSection` — Timeline 5 étapes
5. `PassportChecker` — Vérificateur de visa (199 pays, données réelles, lazy JSON)
6. `TestimonialsSection` — Carrousel texte + vidéos YouTube/Vimeo
7. `CtaFinalSection` — CTA rouge final
8. `Footer` — Contacts, horaires, réseaux sociaux dynamiques

---

## Contenu validé

- Témoignages : 6 clients (Joyce Kamdem, Jeanne Tchatoie, Léa Dogmo, Coralie Bridaelle, Franck Essaka, Famille Mbappé)
- Contacts : +237 657 644 907 · +33 605 69 33 75 · pentiumtravel@yahoo.com
- Adresses : Douala · Yaoundé (Cameroun)
- Réseaux : Facebook · WhatsApp · TikTok · Instagram
- Accroche clé : "BAC EN POCHE · VISA EN MAIN !"

---

## État complet du projet ✅

### Setup & infrastructure
- [x] Next.js 16.2.3 (TypeScript + Tailwind v4 + App Router)
- [x] Payload CMS v3.82.1 installé et configuré
- [x] PostgreSQL local (`pentium_travel` / postgres:postgres123)
- [x] Migrations Payload appliquées
- [x] `globals.css` avec palette Pentium Travel via `@theme`
- [x] `tsconfig.json` avec alias `@payload-config`
- [x] `next.config.ts` avec `withPayload` + `images.unsplash.com` remotePatterns
- [x] `.env.local` configuré (DB, Payload secret, SMTP Brevo, MAIL_TO)

### Composants partagés
- [x] `Navbar` — logo h-20, liens, CTA rouge, hamburger mobile
- [x] `Footer` — async server component, liens réseaux sociaux dynamiques depuis Payload
- [x] `ContactForm` — états idle/loading/success/error, select service aligné sur slugs Payload
- [x] `PassportChecker` — 199 pays, combobox filtrée, lazy JSON, Framer Motion
- [x] `AdminLogo` + `AdminIcon` — branding Payload CMS

### Pages publiques
- [x] `/` — homepage complète avec toutes les sections, `force-dynamic`
- [x] `/etudiants` — hero, accroche BAC EN POCHE, destinations, services avec photos, process, logement, CTA
- [x] `/touristes` — hero, valeurs, services, destinations, process, CTA
- [x] `/contact` — formulaire + infos coordonnées

### Backoffice Payload CMS
- [x] Collection `destinations` — nom, région, type (études/tourisme/les deux), actif, flag emoji, photo URL
- [x] Collection `testimonials` — nom, localisation, texte, type (text/vidéo), videoUrl, avatar (upload), publié, ordre
- [x] Collection `contacts` — nom, email, téléphone, service, message, statut lead (nouveau/en cours/traité)
- [x] Collection `media` — upload images
- [x] Collection `hero-slides` — label, imageSource (url/upload), image (media), imageUrl, ordre, actif
- [x] Global `social-links` — Facebook (URL), WhatsApp (numéro), TikTok (URL), Instagram (URL)
- [x] Utilisateurs admin natifs Payload
- [x] Branding admin : sidebar noir, boutons rouge, logo Pentium Travel, focus ring bleu

### Fonctionnalités dynamiques
- [x] Slider hero homepage — données depuis `hero-slides` Payload, dual source (URL ou upload)
- [x] Testimonials — données depuis `testimonials` Payload, support vidéo YouTube/Vimeo iframe + avatar photo
- [x] Destinations étudiants/touristes — données depuis `destinations` Payload, grille photos avec overlay
- [x] Réseaux sociaux footer — données depuis global `social-links` Payload
- [x] PassportChecker — `public/data/passport-index.json` (199×199 matrice visa, open-source)
- [x] Route `/api/seed` — peuple la BD (6 témoignages + 15 destinations + 5 slides)

### Formulaire contact & emails
- [x] `POST /api/contact` — validation, sauvegarde Payload, envoi emails
- [x] Email de notification HTML → `pentiumtravel@yahoo.com` (replyTo = email client)
- [x] Email de confirmation HTML → adresse du client
- [x] Relais SMTP : Brevo (`smtp-relay.brevo.com:587`), expéditeur `contact@synaptic-inc.ca`

### Typographie & design
- [x] Police corps : `text-base` (16px) sur tous les textes de contenu
- [x] Couleur titres sections destinations : `text-brand-blue` (#7DB8D8) cohérent étudiants/touristes
- [x] Hiérarchie préservée : H1/H2/H3, badges, CTAs non modifiés

---

## Ce qui reste à faire

### Déploiement VPS ✅ DONE
- [x] VPS : 72.62.80.23 — Ubuntu, Node v20, PM2 v6, Nginx 1.24, PostgreSQL 16
- [x] DB `pentium_travel` créée (user `pentium_user` / `pentium123`)
- [x] Projet uploadé → `/var/www/pentium-travel/`
- [x] `.env.local` production configuré (DB, Payload secret, Brevo SMTP)
- [x] `npm ci` + `npm run build` exécutés sur le serveur
- [x] PM2 : app `pentium-travel` (id 8), port 3003, `online`
- [x] Nginx vhost configuré → reverse proxy port 3003
- [x] SSL Let's Encrypt : `pentium-travel.synaptic-inc.ca` — TLS 1.3, expire 2026-07-13
- [x] Schéma Payload poussé (14 tables créées via dev mode)
- [x] Seed : 5 slides + 6 témoignages + 15 destinations (`/api/seed?secret=pentium-seed-2026`)
- [x] Site live : **https://pentium-travel.synaptic-inc.ca**
- [ ] Créer le premier admin Payload → https://pentium-travel.synaptic-inc.ca/admin
- [ ] Configurer les réseaux sociaux dans `/admin → Paramètres → Réseaux sociaux`
- [ ] Tester le formulaire contact en production (email Brevo → pentiumtravel@yahoo.com)

### Améliorations futures (non bloquantes)
- [ ] SEO : Open Graph images par page
- [ ] Analytics (Plausible ou Google Analytics)
- [ ] Page de politique de confidentialité (RGPD)

---

## Variables d'environnement (.env.local)

```
DATABASE_URL=postgresql://postgres:postgres123@localhost:5432/pentium_travel
PAYLOAD_SECRET=pentium_travel_secret_2026_xK9mP3qR7nL2vB8w
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Brevo SMTP
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=a76ff3001@smtp-brevo.com
SMTP_PASS=<voir .env.local local — ne jamais committer>
SMTP_FROM=contact@synaptic-inc.ca
MAIL_TO=pentiumtravel@yahoo.com
```

> ⚠️ `.env.local` est dans `.gitignore` — ne jamais committer les credentials.

---

## Points d'attention techniques

- **Turbopack** : désactivé via `--webpack` dans tous les scripts npm (`dev`, `build`) — Turbopack casse les React Context de Payload CMS
- **force-dynamic** : ajouté sur `app/(site)/page.tsx` pour désactiver le cache Next.js sur la homepage (testimonials, slides en temps réel)
- **Footer async** : `Footer.tsx` est un Server Component async — il appelle `getPayload()` à chaque requête, ce qui est normal et performant côté serveur
- **Passport JSON** : `public/data/passport-index.json` (892 KB) — chargé en lazy au premier clic sur PassportChecker. Pour le mettre à jour : `node scripts/update-passport-data.mjs`
- **Photos destinations** : URLs Unsplash stockées dans la BD (champ `photo` de la collection `destinations`) — éditables depuis le backoffice

---

## Décisions validées

| Décision | Valeur |
|---|---|
| Domaine cible | pentium-travel.com |
| Logo | `public/images/logo.jpeg` (JPEG fourni client) |
| Prix affichés | Aucun |
| Langue | 100% français, pas d'i18n |
| Vidéos témoignages | Liens YouTube/Vimeo (pas d'upload direct) |
| Destinations | Grilles photos avec overlay, pas de pages détail |
| Visa Check | Section homepage uniquement (PassportChecker) |
| Témoignages | Section homepage uniquement |
| Email provider | Brevo SMTP (nodemailer) — domaine test : synaptic-inc.ca |

---

## Journal des sessions

### 2026-04-13 — Session 7 (déploiement VPS complet)
- Déployé sur https://pentium-travel.synaptic-inc.ca (VPS 72.62.80.23)
- DB PostgreSQL créée (pentium_travel / pentium_user)
- Build Next.js + Payload sur le serveur
- PM2 id 8, port 3003, online
- Nginx reverse proxy + SSL Let's Encrypt TLS 1.3
- Schéma Payload poussé via dev mode (14 tables)
- Seed : 5 slides + 6 témoignages + 15 destinations
- Patches prod synchronisés en local :
  - `force-dynamic` sur contact, etudiants, touristes
  - Footer.tsx : try/catch autour de findGlobal (résilience DB)
  - payload.config.ts : `push: process.env.PAYLOAD_PUSH === 'true'`

### 2026-04-13 — Session 6 (email Brevo SMTP + sauvegarde contacts)
- `nodemailer` + `@types/nodemailer` installés
- `.env.local` : variables SMTP Brevo ajoutées
- `app/api/contact/route.ts` : réécriture complète — sauvegarde Payload + 2 emails HTML
- `ContactForm.tsx` : options `<select>` service alignées sur slugs Payload (`value` ≠ `label`)

### 2026-04-13 — Session 5 (typographie)
- Corps de texte : `text-sm` (14px) → `text-base` (16px) sur 6 composants/pages
- Titres, badges, CTAs non touchés (hiérarchie préservée)

### 2026-04-13 — Session 4 (backoffice réseaux sociaux + hero dual source + couleur)
- Global `social-links` Payload créé + enregistré dans `payload.config.ts`
- `Footer.tsx` → async server component, liens dynamiques depuis backoffice
- `hero-slides` : champ `imageSource` conditionnel (upload fichier OU URL externe)
- `page.tsx` : résolution image slide selon `imageSource`
- Titre "Explorez des horizons..." → `text-brand-blue` (cohérence étudiants/touristes)

### 2026-04-13 — Session 3 (contenu dynamique avancé)
- `PassportChecker` intégré (remplace `VisaCheckSection`) : 199 pays, lazy JSON, Framer Motion
- `data/countries.ts` + `scripts/update-passport-data.mjs` + `public/data/passport-index.json`
- Testimonials : support vidéo YouTube/Vimeo (iframe embed) + avatar photo depuis Payload
- `force-dynamic` ajouté sur la homepage

### 2026-04-13 — Session 2 (contenu dynamique + photos)
- Slider hero homepage : 5 photos HD, auto 4s, pause survol, indicateurs dots
- Collection `hero-slides` créée dans Payload
- Destinations : grille photos avec overlay (flag + nom) sur étudiants et touristes
- Champ `photo` (URL) ajouté à la collection `destinations`
- Services étudiants : 3 vraies photos marketing depuis `public/services/`
- Section logement : grande image principale + grille 6 petites photos
- Route `/api/seed` créée

### 2026-04-12 — Session 1 (build complet + admin)
- Setup complet Next.js 16 + Payload CMS v3 + PostgreSQL
- 4 pages publiques + admin
- Toutes les sections homepage
- Backoffice Payload avec collections et branding admin
- Résolution bug admin 500 (multiple root layouts)
- Désactivation Turbopack (`--webpack`)

# PROJECT.md — État du projet Pentium Travel

> Lire ce fichier EN PREMIER à chaque nouvelle session.  
> Le mettre à jour EN FIN de session avant de fermer.  
> Ne jamais agir sur des suppositions — vérifier ici l'état réel.

---

## Informations générales

- **Dernière mise à jour** : 2026-04-12
- **Phase en cours** : Phase 2 — Composants partagés (Navbar, Footer)
- **Hébergement cible** : Hostinger VPS Ubuntu (Nginx + PM2)
- **Référence design** : Voir `DESIGN.md`
- **Référence technique** : Voir `CLAUDE.md`

---

## Ce qui est décidé et figé

### Architecture
- Next.js 15 App Router + Tailwind CSS + Payload CMS v3 + PostgreSQL
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

## Ce qui est fait

- [x] Analyse complète de l'ancien site (6 captures analysées)
- [x] Extraction du contenu : témoignages, services, contacts, horaires
- [x] Définition de l'architecture technique (stack figée)
- [x] Définition des pages et sections
- [x] Création de `CLAUDE.md` (référence technique et contenu)
- [x] Création de `DESIGN.md` (système de design 100% Tailwind)
- [x] Création de `PROJECT.md` (ce fichier)
- [x] Next.js 15 initialisé (TypeScript + Tailwind v4 + App Router)
- [x] Payload CMS v3 installé (`@payloadcms/next`, `@payloadcms/db-postgres`)
- [x] shadcn/ui initialisé (`components/ui/button.tsx`, `lib/utils.ts`)
- [x] Dépendances installées : `resend`, `lucide-react`, `clsx`, `tailwind-merge`, `sharp`
- [x] `globals.css` configuré avec palette Pentium Travel (Tailwind v4 `@theme`)
- [x] Fonts Inter + Poppins via Google Fonts dans `app/layout.tsx`
- [x] Structure dossiers créée : `app/(site)/`, `app/(payload)/`, `components/sections/`, `components/shared/`, `lib/`, `payload/collections/`
- [x] `app/layout.tsx` (root) + `app/(site)/layout.tsx` créés
- [x] `lib/visa-data.ts` créé (données visa, logique `checkVisa`, listes pays/destinations)
- [x] Build Next.js validé sans erreur

---

## Ce qui reste à faire (dans l'ordre)

### Phase 1 — Setup projet ✅ TERMINÉE
- [x] `npx create-next-app@latest` avec TypeScript + Tailwind v4 + App Router
- [x] Payload CMS v3 installé
- [ ] Configurer PostgreSQL (local puis VPS) — à faire en Phase 5
- [x] Palette Tailwind v4 configurée via `@theme` dans `globals.css`
- [x] Fonts Inter + Poppins configurées
- [x] shadcn/ui installé
- [x] Structure de dossiers créée

### Phase 2 — Composants partagés
- [ ] `Navbar` (logo + liens + CTA + mobile hamburger)
- [ ] `Footer` (2 colonnes : image avion + infos contact)
- [x] Layout `(site)/layout.tsx` créé

### Phase 3 — Page d'accueil (section par section)
- [ ] `HeroSection`
- [ ] `ServicesSection`
- [ ] `DestinationsSection` (listes texte, données statiques initiales)
- [ ] `ProcessSection` (timeline)
- [ ] `VisaCheckSection` (widget + données JSON)
- [ ] `TestimonialsSection` (données statiques initiales)
- [ ] `CtaFinalSection`

### Phase 4 — Pages dédiées
- [ ] `/etudiants` (story narrative + 3 piliers + logement + CTA)
- [ ] `/touristes` (narrative + services + CTA)
- [ ] `/contact` (formulaire + envoi email via Resend)

### Phase 5 — Backoffice Payload CMS
- [ ] Collection `destinations` (nom, région, type, actif)
- [ ] Collection `testimonials` (nom, pays, texte, photo, vidéo URL, publié)
- [ ] Collection `contacts` (réception formulaires)
- [ ] Brancher les sections homepage sur les données Payload

### Phase 6 — Visa Check (données)
- [ ] Construire `lib/visa-data.ts` (JSON passport → destination → statut)
- [ ] Brancher le widget sur ces données

### Phase 7 — Déploiement VPS
- [ ] Configurer Nginx
- [ ] Configurer PM2
- [ ] SSL via Let's Encrypt
- [ ] Configurer domaine

---

## Décisions validées

- [x] **Domaine** : pentium-travel.com
- [x] **Logo** : fourni en JPEG/PNG (pas de SVG disponible)
- [x] **Prix** : aucun prix affiché sur le site — si une image marketing contient un prix, on l'affiche telle quelle sans l'éditorialiser
- [x] **Langue** : 100% français, pas d'internationalisation
- [x] **Vidéos témoignages** : liens YouTube/Vimeo fournis par le client (pas d'upload direct)
- [x] **Section "À propos"** : non décidée — à valider ultérieurement
- [x] **Logo** : reçu en PNG (fond blanc, arcs rouge/bleu/rose + avion noir + texte "PENTIUM TRAVEL")

---

## Règles de continuité (anti-hallucination)

1. **Début de session** : lire ce fichier + `CLAUDE.md` avant tout
2. **Ne jamais créer** une page, composant ou collection non listée ici
3. **Ne jamais inventer** du contenu — tout le contenu réel est dans `CLAUDE.md`
4. **Marquer comme fait** chaque tâche dès qu'elle est terminée
5. **Déplacer vers "fait"** uniquement si le code est écrit ET testé
6. **Fin de session** : mettre à jour la date et l'état de ce fichier

---

## Journal des sessions

### 2026-04-12 — Session 1 (cadrage)
- Analyse de l'ancien site Wix (6 captures)
- Définition complète de l'architecture, des pages, des sections
- Extraction de tout le contenu existant
- Création des 3 fichiers de cadrage (CLAUDE.md, DESIGN.md, PROJECT.md)
- **Prochaine étape** : attendre validation des décisions en attente, puis Phase 1 Setup

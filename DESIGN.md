# DESIGN.md — Système de design Pentium Travel (100% Tailwind)

## Palette de couleurs

> Couleurs extraites directement du logo officiel Pentium Travel (PNG fourni).

```js
// tailwind.config.ts — extend.colors
colors: {
  brand: {
    red:      '#B91C1C',   // Rouge logo (arc primaire) — CTAs, badges, accents forts
    redDark:  '#7F1D1D',   // Rouge foncé (hover sur rouge)
    redLight: '#FEE2E2',   // Rouge très clair (fonds teintés)
    blue:     '#7DB8D8',   // Bleu ciel logo (arc secondaire) — éléments secondaires
    blueDark: '#4A90B8',   // Bleu ciel foncé (hover)
    blueLight:'#EFF8FF',   // Bleu très clair (fonds de sections alternées)
    pink:     '#D4789A',   // Rose logo (arc tertiaire) — accents doux, décoratifs
    navy:     '#0D0D0D',   // Noir logo (texte "PENTIUM TRAVEL", avion)
  },
  neutral: {
    white:    '#FFFFFF',
    offWhite: '#F9FAFB',   // Fond sections claires
    gray100:  '#F3F4F6',
    gray200:  '#E5E7EB',
    gray400:  '#9CA3AF',   // Texte secondaire
    gray600:  '#4B5563',   // Texte corps
    gray900:  '#111827',   // Texte titre
  }
}
```

### Usage des couleurs

| Élément | Classe Tailwind |
|---|---|
| Fond principal | `bg-white` |
| Fond section alternée | `bg-brand-blueLight` ou `bg-neutral-offWhite` |
| Fond footer | `bg-brand-navy` |
| Titre principal (H1) | `text-brand-navy` |
| Titre section (H2) | `text-brand-red` |
| Texte corps | `text-neutral-gray600` |
| Texte secondaire | `text-neutral-gray400` |
| CTA primaire | `bg-brand-red text-white hover:bg-brand-redDark` |
| CTA secondaire | `border-2 border-brand-red text-brand-red hover:bg-brand-redLight` |
| Badge accent | `bg-brand-red text-white` |
| Lien actif nav | `text-brand-red border-b-2 border-brand-red` |
| Numéro étape process | `bg-brand-red text-white` |
| Décoration / séparateur | `text-brand-blue` ou `bg-brand-pink` |

---

## Typographie

```js
// tailwind.config.ts — extend.fontFamily
fontFamily: {
  sans:    ['Inter', 'system-ui', 'sans-serif'],       // Corps de texte
  display: ['Poppins', 'Inter', 'sans-serif'],          // Titres & accroches
}
```

### Échelle typographique

| Usage | Classes Tailwind |
|---|---|
| H1 Hero | `font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy leading-tight` |
| H2 Section | `font-display text-2xl md:text-3xl font-bold text-brand-blueDark` |
| H3 Card | `font-display text-lg md:text-xl font-semibold text-brand-navy` |
| Corps | `font-sans text-base text-neutral-gray700 leading-relaxed` |
| Petit texte | `font-sans text-sm text-neutral-gray400` |
| Caption | `font-sans text-xs text-neutral-gray400 uppercase tracking-wide` |
| Accroche marketing | `font-display text-3xl md:text-4xl font-extrabold uppercase tracking-tight` |

---

## Espacements & Layout

### Container
```
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
```

### Sections
```
py-16 md:py-24          // padding vertical standard section
py-12 md:py-16          // padding vertical section compacte
```

### Grilles standard

| Usage | Classes |
|---|---|
| 3 colonnes services | `grid grid-cols-1 md:grid-cols-3 gap-8` |
| 2 colonnes split | `grid grid-cols-1 lg:grid-cols-2 gap-12 items-center` |
| Destinations liste | `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4` |
| Témoignages | `grid grid-cols-1 md:grid-cols-3 gap-6` |

---

## Composants récurrents

### Bouton primaire
```
inline-flex items-center justify-center
px-6 py-3 rounded-lg
bg-brand-blue text-white font-semibold text-sm
hover:bg-brand-blueDark
transition-colors duration-200
shadow-md hover:shadow-lg
```

### Bouton secondaire (outline)
```
inline-flex items-center justify-center
px-6 py-3 rounded-lg
border-2 border-brand-blue text-brand-blue font-semibold text-sm
hover:bg-brand-blueLight
transition-colors duration-200
```

### Card service
```
bg-white rounded-2xl p-6 shadow-sm
border border-neutral-gray200
hover:shadow-md transition-shadow duration-200
```

### Card témoignage
```
bg-white rounded-2xl p-6 shadow-sm
border border-neutral-gray200
flex flex-col gap-4
```

### Photo ronde (avatar témoignage)
```
w-20 h-20 rounded-full object-cover
ring-4 ring-brand-blueLight
mx-auto
```

### Badge destination (liste texte)
```
inline-flex items-center gap-2
px-4 py-2 rounded-full
bg-brand-blueLight text-brand-blueDark
text-sm font-medium
border border-brand-blue/20
```

### Section header (titre + sous-titre centré)
```html
<div class="text-center max-w-2xl mx-auto mb-12">
  <h2 class="font-display text-2xl md:text-3xl font-bold text-brand-blueDark mb-4">
    Titre de section
  </h2>
  <p class="font-sans text-base text-neutral-gray400 leading-relaxed">
    Description courte et impactante.
  </p>
</div>
```

### Étape process (timeline)
```
flex items-start gap-4
// Numéro :
w-10 h-10 rounded-full bg-brand-blue text-white
flex items-center justify-center font-bold text-sm shrink-0
// Contenu :
flex flex-col gap-1
```

---

## Navbar

```
sticky top-0 z-50
bg-white/95 backdrop-blur-sm
border-b border-neutral-gray200
shadow-sm
```

Structure :
- Logo gauche (PNG Pentium Travel, `h-12 w-auto`)
- Liens centre : `text-neutral-gray600 hover:text-brand-red font-medium transition-colors`
- Lien actif : `text-brand-red font-semibold`
- CTA droite : `bg-brand-red text-white hover:bg-brand-redDark` (compact)
- Mobile : hamburger `text-brand-navy`, menu déroulant fond blanc

---

## Hero Section

```
relative min-h-[90vh] flex items-center
bg-gradient-to-br from-neutral-gray900 via-[#1a1a1a] to-[#0d0d0d]
text-white overflow-hidden
```

- Overlay semi-transparent (`bg-black/50`) sur image de fond avion/voyage
- H1 blanc, sous-titre `text-brand-blue`
- 2 CTA côte à côte : "Étudiant" (`bg-brand-red hover:bg-brand-redDark`) + "Touriste" (`border-2 border-white text-white hover:bg-white/10`)
- Badge : `bg-brand-red text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide`
  contenu : "BAC EN POCHE · VISA EN MAIN !"

---

## Footer

```
bg-brand-navy text-white
```

Structure 2 colonnes :
- Gauche : image avion plein coucher de soleil (reproduire le visuel de l'ancien site)
- Droite : infos contact, horaires, réseaux sociaux

Icônes réseaux : couleurs officielles
- Facebook → `bg-[#1877F2]`
- WhatsApp → `bg-[#25D366]`
- TikTok → `bg-black`
- Instagram → gradient `from-[#F58529] via-[#DD2A7B] to-[#515BD4]`

Copyright : `text-neutral-gray400 text-sm text-center py-4 border-t border-white/10`

---

## Visa Check Widget

```
bg-brand-blueLight rounded-2xl p-8 md:p-12
border border-brand-blue/20
max-w-2xl mx-auto
```

- 2 `<select>` stylisés : `w-full px-4 py-3 rounded-lg border border-neutral-gray200 bg-white text-neutral-gray700 focus:ring-2 focus:ring-brand-blue focus:border-transparent`
- Résultat : badge coloré (vert = pas de visa, orange = visa à l'arrivée, rouge = visa requis)
- CTA après résultat : bouton primaire "Nos experts vous accompagnent"

---

## Breakpoints (Tailwind standard)

| Breakpoint | Taille |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

**Mobile-first obligatoire** : toujours écrire le style mobile en premier, puis surcharger avec `md:`, `lg:`.

---

## Animations (Tailwind uniquement)

```
transition-all duration-200 ease-in-out   // standard
transition-colors duration-200             // changement couleur
hover:scale-105 transition-transform       // card hover léger
hover:-translate-y-1 transition-transform  // card hover lift
```

Pas de bibliothèque d'animation externe. Si animation complexe nécessaire : Framer Motion uniquement, après validation.

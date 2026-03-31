# ProjectSection - Componente React Riutilizzabile per Case Study

## 📋 Panoramica

`ProjectSection` è un componente React altamente riutilizzabile che implementa il design system Pxme con 5 layout distinti per case study e pagine di progetto.

### Caratteristiche Principali

✅ **5 Layout Modulari**: summary, challenge, concept, results, closing  
✅ **Palette Pxme Integrata**: verde #7EB83A, magenta #C94B8F, rosa #D6889A  
✅ **Animazioni Framer Motion**: fade-in, slide, stagger effects  
✅ **Blob SVG Organico**: decorazioni di sfondo dinamiche  
✅ **Numero Ghost Overlay**: typography massiccia come elemento decorativo  
✅ **Responsive Mobile**: stack verticale su mobile, two-column su desktop  
✅ **Fully Customizable**: tutti gli elementi controllabili via props  
✅ **Type-Safe**: TypeScript interfaces complete  

---

## 🚀 Installazione

Il componente è già installato in: `src/components/ProjectSection.tsx`

### Import

```tsx
import { ProjectSection } from "@/components/ProjectSection";
```

O importa gli esempi:

```tsx
import * as ProjectSectionExamples from "@/components/ProjectSection.examples";
```

---

## 📦 Props Interface

```typescript
interface ProjectSectionProps {
  // Numero sezione (es. "01", "02")
  sectionNumber: string;
  
  // Label differenziato (es. "Challenge", "Results")
  sectionLabel: string;
  
  // Titolo principale della sezione
  title: string;
  
  // Testo descrittivo/body
  description: string;
  
  // URL immagine (opzionale)
  image?: string;
  
  // Array di metadata key-value (opzionale)
  metadata?: Array<{ label: string; value: string }>;
  
  // Tipo di layout
  layout: "summary" | "challenge" | "concept" | "results" | "closing";
  
  // Colore accent primario
  accentColor?: "green" | "magenta";
  
  // Dati aggiuntivi per layout specifici
  extras?: {
    constraints?: string[];        // Layout challenge
    highlights?: string[];         // Layout closing
    kpis?: Array<{ label: string; value: string }>; // Layout results/closing
    quote?: { text: string; author?: string };      // Layout results
    steps?: string[];              // Layout concept
    callToAction?: { label: string; href: string }; // Layout concept
  };
  
  // Numero totale di sezioni (opzionale)
  totalSections?: number;
  
  // Callback navigazione (opzionale)
  onNavigate?: (direction: "prev" | "next") => void;
}
```

---

## 🎨 Layout Guide

### 1. Layout "summary"
**Uso**: Executive summary, panoramica progetto  
**Struttura**: Left (testo + metadata card) | Right (immagine circolare)

```tsx
<ProjectSection
  sectionNumber="01"
  sectionLabel="Executive Summary"
  title="Il Brief"
  description="Abbiamo ricevuto il brief per rebranding completo..."
  image="/path/to/image.jpg"
  layout="summary"
  accentColor="green"
  metadata={[
    { label: "Categoria", value: "Packaging" },
    { label: "Focus", value: "Design" },
    { label: "Scope", value: "Multi-discipline" }
  ]}
/>
```

### 2. Layout "challenge"
**Uso**: Obiettivi, sfide, vincoli  
**Struttura**: Numero ghost gigante | Titolo centrato | Grid di vincoli | Immagine

```tsx
<ProjectSection
  sectionNumber="02"
  sectionLabel="Challenge"
  title="La Sfida"
  description="Comunicare la complessità del brief in modo visivamente impattante..."
  layout="challenge"
  accentColor="green"
  image="/path/to/image.jpg"
  extras={{
    constraints: [
      "Nuovo positioning nel segmento premium",
      "Coerenza su 5 linee di prodotto",
      "Sostenibilità come valore core",
      "Competizione su shelf impact"
    ]
  }}
/>
```

### 3. Layout "concept"
**Uso**: Soluzione creativa, concept design  
**Struttura**: Sfondo scuro | Left (immagine) | Right (descrizione + steps verticali)

```tsx
<ProjectSection
  sectionNumber="03"
  sectionLabel="Concept"
  title="La Soluzione"
  description="Un'identità moderna e sostenibile che combina tradizione con innovazione..."
  image="/path/to/image.jpg"
  layout="concept"
  accentColor="magenta"
  extras={{
    steps: [
      "Ricerca di mercato approfondita",
      "Workshop creativo interno",
      "Prototipazione e testing",
      "Refinement finale e implementazione"
    ]
  }}
/>
```

### 4. Layout "results"
**Uso**: Risultati, KPI, metriche  
**Struttura**: Header | Grid 2x2 KPI cards | Immagine hero | Quote

```tsx
<ProjectSection
  sectionNumber="04"
  sectionLabel="Results"
  title="I Risultati"
  description="Il nuovo packaging ha superato le aspettative su tutti i fronti..."
  image="/path/to/image.jpg"
  layout="results"
  accentColor="green"
  extras={{
    kpis: [
      { label: "Incremento Vendite", value: "+120%" },
      { label: "Riconoscimento Brand", value: "5x" },
      { label: "Reach Digitale", value: "1.2M" },
      { label: "Retention Cliente", value: "89%" }
    ],
    quote: {
      text: "Questo design racchiude perfettamente i nostri valori e la nostra visione.",
      author: "— CEO Brand"
    }
  }}
/>
```

### 5. Layout "closing"
**Uso**: Learnings, conclusioni, chiusura  
**Struttura**: Citazione massiccia (word alternation colore) | Left (highlights) | Right (blob image)

```tsx
<ProjectSection
  sectionNumber="05"
  sectionLabel="Learnings"
  title="Il design deve raccontare una storia vera non solo essere bello"
  description="Le lezioni apprese dal progetto ci hanno insegnato l'importanza dell'ascolto..."
  image="/path/to/image.jpg"
  layout="closing"
  accentColor="magenta"
  extras={{
    highlights: [
      "L'importanza della ricerca qualitativa",
      "Coinvolgimento stakeholder sin da subito",
      "Iterazione rapida e feedback costante"
    ],
    kpis: [
      { label: "Durata Progetto", value: "6 mesi" },
      { label: "Team", value: "5 persone" }
    ]
  }}
  onNavigate={(dir) => console.log(`Navigate ${dir}`)}
/>
```

---

## 🎬 Animazioni

Tutte le sezioni includono animazioni Framer Motion sottili:

- **Ghost Number**: Fade-in (delay 0.2s)
- **Section Label**: Slide down + fade (delay 0.1s)
- **Layout Content**: Staggered animations (delay 0.3-0.6s)
- **KPI Cards**: Scale on hover
- **Steps**: Line grow on interaction
- **Duration**: 0.6s per elemento
- **Easing**: easeInOut

Disabilita le animazioni per rispettare `prefers-reduced-motion`:

```tsx
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## 🎨 Colori & Design System

Il componente usa la palette Pxme:

| Elemento | Colore | Hex |
|----------|--------|-----|
| Verde Primario | Green | #7EB83A |
| Magenta | Secondary | #C94B8F |
| Rosa | Accent | #D6889A |
| Ghost Number | Ultra Light | #E8E8E8 |
| Testo | Dark | #1A1A1A |
| Background | White | #FFFFFF |

### Impostare il colore accent:

```tsx
<ProjectSection
  // ... altri props
  accentColor="green"  // o "magenta"
/>
```

---

## 📱 Responsive Design

### Mobile (< 768px)
- Stack verticale di tutti gli elementi
- Ghost number scalata (clamp: 80px, 15vw, 320px)
- Immagini full-width o circolare ridotta
- Metadata cards inline

### Desktop (> 768px)
- Layout two-column grid
- Ghost number massiccia
- Decorative elements visibili
- Spacing aumentato

Le breakpoints seguono Tailwind standard:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## 📚 Esempi Completi

Vedi il file `ProjectSection.examples.tsx` per 6 esempi pronti all'uso:

```tsx
import {
  ProjectPageComplete,
  ProjectSummarySingle,
  ProjectChallengeDynamic,
  ProjectConceptDark,
  ProjectResultsWithStats,
  ProjectClosing
} from "@/components/ProjectSection.examples";

// Usa direttamente
<ProjectPageComplete />
```

---

## 🛠️ Integrazione nel Progetto

### Step 1: Importa il CSS Design System

Nel tuo `src/main.tsx` o `src/App.tsx`:

```tsx
import "@/styles/pxme-design-system.css";
import { ProjectSection } from "@/components/ProjectSection";
```

### Step 2: Usa il Componente

```tsx
export function CaseStudyPage() {
  return (
    <div>
      <ProjectSection
        sectionNumber="01"
        sectionLabel="Executive Summary"
        title="..."
        description="..."
        layout="summary"
        accentColor="green"
      />
      
      <ProjectSection
        sectionNumber="02"
        sectionLabel="Challenge"
        title="..."
        description="..."
        layout="challenge"
        accentColor="green"
        extras={{ constraints: [...] }}
      />
      
      {/* ... altri layout ... */}
    </div>
  );
}
```

### Step 3: Build e Deploy

```bash
npm run build
npm run preview
```

---

## 🔧 Customizzazione

### Modificare i colori

Modifica le variabili CSS in `src/styles/pxme-design-system.css`:

```css
:root {
  --pxme-green-primary: #7EB83A;  /* Modifica il verde */
  --pxme-magenta: #C94B8F;        /* Modifica il magenta */
  --pxme-pink: #D6889A;           /* Modifica il rosa */
}
```

### Modificare le animazioni

Ripercorri le motion animations dentro il componente:

```tsx
<motion.div
  initial={{ opacity: 0, x: -20 }}  // Stato iniziale
  animate={{ opacity: 1, x: 0 }}     // Stato finale
  transition={{ delay: 0.3, duration: 0.6 }}  // Timing
/>
```

### Aggiungere nuovi layout

1. Crea una nuova funzione `LayoutCustom()` nel file
2. Aggiungi al switch statement
3. Aggiungi il tipo al `ProjectSectionType` union

---

## 🚨 Troubleshooting

### Le animazioni non funzionano
→ Verifica che Framer Motion sia importato: `import { motion } from "motion/react"`

### I colori non cambiano
→ Assicurati di passare `accentColor="green"` o `accentColor="magenta"`

### Il blob SVG non appare
→ Controlla che il path SVG sia valido in `svgPaths` (importato da `src/imports/svg-53xjlwfhm8.ts`)

### Build error su TypeScript
→ Verifica le prop types e che tutti i required fields siano forniti

---

## 📖 File Correlati

- **Componente**: `src/components/ProjectSection.tsx`
- **Esempi**: `src/components/ProjectSection.examples.tsx`
- **Documentazione**: `src/components/ProjectSection.md`
- **Design System CSS**: `src/styles/pxme-design-system.css`

---

## 📄 Licenza

Componente proprietario Pxme. Uso interno.

---

## 💡 Prossimi Step

- [ ] Aggiungere theme switcher light/dark mode
- [ ] Configurare Storybook per documentazione interattiva
- [ ] Aggiungere lazy loading per immagini
- [ ] Implementare Analytics tracking
- [ ] Creare versione Figma component mirror

---

Domande? Consulta la documentazione completa in `ProjectSection.md`

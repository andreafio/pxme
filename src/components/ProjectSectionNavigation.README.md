# ProjectSectionNavigation - Componente di Navigazione

## 📋 Panoramica

`ProjectSectionNavigation` è un sistema di navigazione completo per le pagine di sezione progetto su Pxme. Include:

- ✅ **Breadcrumb** in alto (Categoria · Progetto · Sezione N/Totale)
- ✅ **Indicatore Posizione** top-right (Progetto X/Y in pill)
- ✅ **Navigazione Prev/Next** in basso al centro
- ✅ **Sidebar Dots** verticale a destra (dot per ogni sezione)
- ✅ **Animazioni Framer Motion** su tutti gli elementi
- ✅ **Responsive** con fixed positioning
- ✅ **Integrazione Next.js** con hook dedicato

---

## 🚀 Quick Start

### Installazione

```tsx
import { ProjectSectionNavigation } from '@/components/ProjectSectionNavigation';
```

### Utilizzo Base

```tsx
export function MyProjectPage() {
  const [sectionIndex, setSectionIndex] = useState(0);

  return (
    <div>
      {/* Contenuto della sezione */}
      <div className="h-screen bg-white">
        <p>Sezione {sectionIndex + 1}</p>
      </div>

      {/* Navigazione */}
      <ProjectSectionNavigation
        projectSlug="pernigotti"
        projectTitle="Pernigotti"
        projectCategory="Packaging"
        sectionIndex={sectionIndex}
        totalSections={5}
        sectionLabel="Challenge"
        onNavigateToSection={setSectionIndex}
        onNavigatePrevious={() => setSectionIndex(sectionIndex - 1)}
        onNavigateNext={() => setSectionIndex(sectionIndex + 1)}
      />
    </div>
  );
}
```

---

## 📦 Props

```typescript
interface ProjectSectionNavigationProps {
  // Progetto corrente
  projectSlug: string;           // es. "pernigotti"
  projectTitle: string;          // es. "Pernigotti"
  projectCategory: string;       // es. "Packaging"
  
  // Sezione corrente
  sectionIndex: number;          // 0-based index
  totalSections: number;         // numero totale sezioni
  sectionLabel?: string;         // es. "Challenge" (opzionale)
  
  // Callbacks di navigazione
  onNavigateToSection: (index: number) => void;
  onNavigatePrevious?: () => void;
  onNavigateNext?: () => void;
  
  // Router helpers (opzionali)
  getProjectUrl?: (slug: string) => string;
  getSectionUrl?: (slug: string, index: number) => string;
  
  // Visibility toggles (default: true)
  showBreadcrumb?: boolean;
  showProjectIndicator?: boolean;
  showPrevNextButtons?: boolean;
  showSidebarDots?: boolean;
  
  // Styling
  accentColor?: "green" | "magenta";
}
```

---

## 🎨 Componenti Interni

### 1. Breadcrumb
```
"Packaging · Pernigotti · Sezione 2/5"
```
- Stile: testo piccolo, uppercase
- Colore: magenta per il nome progetto, grigio per il resto
- Animazione: fade-in + slide down

### 2. Project Indicator
```
"Progetto 3/16"
```
- Stile: pill con bordo verde
- Posizione: top-right
- Animazione: fade-in + slide right

### 3. Prev/Next Buttons
```
[← Precedente]  [Challenge]  [Successivo →]
```
- Border-only buttons
- Hover: fill con accent color
- Disabled state: grigio + opacity 50%
- Centered layout
- Animazione: fade-in + slide up

### 4. Sidebar Dots
```
●  (sezione attiva)
○  (sezione inattiva)
○
●
○
```
- Fixed posizione: right + top-50%
- Dot active: pieno (verde o magenta)
- Dot inactive: outline grigio
- Click: naviga alla sezione
- Animazione: scale su hover
- Background: semi-transparent con blur

---

## 🪝 Hooks

### useProjectSectionNavigation (Next.js)

Per integrare easily con Next.js App Router:

```tsx
import { useProjectSectionNavigation } from '@/hooks/useProjectSectionNavigation';

export function ProjectPage({ params }: { params: { slug: string; section: string } }) {
  const sectionIndex = parseInt(params.section) || 0;

  const nav = useProjectSectionNavigation({
    projectSlug: params.slug,
    projectTitle: "Pernigotti",
    projectCategory: "Packaging",
    currentSectionIndex: sectionIndex,
    totalSections: 5,
    sectionLabel: "Challenge",
    accentColor: "green",
  });

  return (
    <div>
      <ProjectSectionNavigation {...nav.props} />
      {/* contenuto */}
    </div>
  );
}
```

### useGenericSectionNavigation (React Router / Custom)

Per router custom o React Router:

```tsx
import { useGenericSectionNavigation } from '@/hooks/useProjectSectionNavigation';

export function ProjectPage() {
  const [sectionIndex, setSectionIndex] = useState(0);

  const nav = useGenericSectionNavigation({
    projectSlug: "pernigotti",
    projectTitle: "Pernigotti",
    projectCategory: "Packaging",
    currentSectionIndex: sectionIndex,
    totalSections: 5,
    onNavigate: (slug, index) => {
      setSectionIndex(index);
      window.history.pushState(null, "", `/progetti/${slug}/sezione/${index}`);
    },
  });

  return <ProjectSectionNavigation {...nav.props} />;
}
```

---

## 🎨 Palette Colori

| Elemento | Verde | Magenta |
|----------|-------|---------|
| Active Dot | #7EB83A | #C94B8F |
| Breadcrumb Project | #C94B8F | #C94B8F |
| Button Border | #7EB83A | #C94B8F |
| Indicator Pill Border | #7EB83A | #7EB83A |

---

## 📐 Layout Struttura

```
┌─────────────────────────────────────┐
│ Packaging · Pernigotti · Sezione 2/5  Progetto 3/16
└─────────────────────────────────────┘

│                                    ●
│ MAIN CONTENT                       ○
│ (tuo contenuto sezione)            ●
│                                    ○
│                                    ○
│                                    
│      [← Precedente] [Challenge] [Successivo →]
│
└────────────────────────────────────┘
```

---

## 🎬 Animazioni

Tutti gli elementi hanno animate presenti via Framer Motion:

- **Breadcrumb**: fade-in + slide down (0.5s)
- **Project Indicator**: fade-in + slide right (0.5s, delay 0.1s)
- **Buttons**: fade-in + slide up (0.5s, delay 0.2s)
- **Dots**: fade-in + slide right (0.5s, delay 0.1s)
- **Dot hover**: scale 1.2
- **Dot tap**: scale 0.95

Disabilitare le animazioni per `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## 📱 Responsive

Il componente usa `fixed` positioning, quindi funziona su tutti i device:

- **Mobile**: sidebar dots visibili, buttons full-width friendly
- **Tablet**: layout adatto
- **Desktop**: completo

---

## 🎯 Visibility Toggles

Personalizza quali elementi mostrare:

```tsx
<ProjectSectionNavigation
  // ... altri props
  showBreadcrumb={true}           // Mostra breadcrumb
  showProjectIndicator={true}     // Mostra Progetto X/Y
  showPrevNextButtons={true}      // Mostra bottoni prev/next
  showSidebarDots={true}          // Mostra sidebar dots
/>
```

### Solo Breadcrumb + Sidebar Dots:
```tsx
<ProjectSectionNavigation
  // ...
  showBreadcrumb
  showProjectIndicator={false}
  showPrevNextButtons={false}
  showSidebarDots
/>
```

---

## 🔧 Customizzazione

### Cambiare colore accent

```tsx
<ProjectSectionNavigation
  // ...
  accentColor="magenta"  // o "green"
/>
```

### Aggiungere label dinamico

```tsx
const LABELS = ["Executive Summary", "Challenge", "Concept", "Results", "Learnings"];

<ProjectSectionNavigation
  // ...
  sectionLabel={LABELS[sectionIndex]}
/>
```

### Callback navigazione custom

```tsx
const handleNavigate = (index: number) => {
  // Analytics
  trackSectionChange(index);
  
  // Navigation
  router.push(`/progetti/${slug}/sezione/${index}`);
  
  // Scroll to top
  window.scrollTo(0, 0);
};

<ProjectSectionNavigation
  // ...
  onNavigateToSection={handleNavigate}
  onNavigatePrevious={() => handleNavigate(sectionIndex - 1)}
  onNavigateNext={() => handleNavigate(sectionIndex + 1)}
/>
```

---

## 📚 Esempi

Vedi [ProjectSectionNavigation.examples.tsx](ProjectSectionNavigation.examples.tsx) per:

1. **ProjectSectionPageBasic** - utilizzo base con state
2. **ProjectSectionPageNextJS** - integrazione Next.js App Router
3. **ProjectSectionPageReactRouter** - React Router generico
4. **ProjectSectionPageMinimal** - solo breadcrumb + sidebar
5. **ProjectSectionPageDynamic** - con label dinamico
6. **ProjectSectionPageFull** - pagina completa con contenuto

---

## 🚨 Edge Cases

### Button Disabled State

I bottoni Prev/Next si disabilitano automaticamente:

- **Prev disabled** quando `sectionIndex === 0`
- **Next disabled** quando `sectionIndex === totalSections - 1`

Lo stato disabled ha:
- Opacity: 50%
- Cursor: not-allowed
- Color: grigio

### Numero Sezioni

Se il numero di sezioni è inferiore a quello visualizzato nei dots:

```tsx
<ProjectSectionNavigation
  // ...
  totalSections={3}  // Solo 3 dots verranno renderizzati
/>
```

---

## 💡 Best Practices

**✅ Fare:**
- Memoizzare i callback con `useCallback`
- Usare l'hook se usi Next.js
- Customizzare `sectionLabel` per ogni sezione
- Mostrare/nascondere elementi via `show*` props

**❌ Non fare:**
- Non passare funzioni inline (`onClick={() => {}}`)
- Non renderizzare senza `onNavigateToSection`
- Non confondere `sectionIndex` (0-based) con numero visualizzato (1-based)

---

## 📖 File Correlati

- **Componente**: `src/components/ProjectSectionNavigation.tsx`
- **Hook**: `src/hooks/useProjectSectionNavigation.ts`
- **Esempi**: `src/components/ProjectSectionNavigation.examples.tsx`
- **ProjectSection**: `src/components/ProjectSection.tsx` (sezioni caso studio)

---

## 🆘 Troubleshooting

### I bottoni non rispondono al click
→ Verifica che `onNavigateToSection`, `onNavigatePrevious`, `onNavigateNext` siano definiti

### I dots non navigano
→ Controlla che `totalSections` sia corretto

### Le animazioni non si vedono
→ Verifica che Framer Motion sia importato: `import { motion } from "motion/react"`

### Fixed positioning rotto
→ Assicurati che il parent container non abbia `position: relative` con `overflow: hidden`

---

## 📄 Licenza

Componente proprietario Pxme. Uso interno.

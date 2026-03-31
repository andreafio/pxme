/**
 * SUMMARY: ProjectSectionNavigation Component
 * 
 * Data: 2026-03-25
 * Stato: ✅ COMPLETATO
 * 
 * Sistema di navigazione per le pagine sezione progetto
 * URL Pattern: /progetti/[slug]/sezione/[n]
 */

// ============================================
// FILE CREATI
// ============================================

/**
 * 1. COMPONENTE PRINCIPALE
 * File: src/components/ProjectSectionNavigation.tsx
 * 
 * Esporta:
 *   - ProjectSectionNavigation (componente principale)
 *   - ProjectSectionNavigationProps (types interface)
 * 
 * Contiene sub-components:
 *   - Breadcrumb (categoria · progetto · sezione n/tot)
 *   - ProjectIndicator (progetto x/y in pill)
 *   - PrevNextButtons (navigazione prev/next)
 *   - SidebarDotsNavigation (dots verticali a destra)
 * 
 * Features:
 *   ✅ Breadcrumb con styling uppercase + magenta accent
 *   ✅ Project indicator pill top-right con border verde
 *   ✅ Buttons prev/next con border, hover fill
 *   ✅ Sidebar dots verticale con active/inactive states
 *   ✅ Framer Motion animations su tutti gli elementi
 *   ✅ Fixed positioning for overlay layout
 *   ✅ Responsive mobile/desktop
 *   ✅ Visibility toggles per customizzazione
 */

/**
 * 2. HOOKS PER ROUTER INTEGRATION
 * File: src/hooks/useProjectSectionNavigation.ts
 * 
 * Esporta:
 *   - useProjectSectionNavigation (Next.js App Router)
 *   - useGenericSectionNavigation (React Router / custom)
 * 
 * Funzionalità:
 *   ✅ Automatic URL navigation
 *   ✅ Callback handling
 *   ✅ canGoNext / canGoPrev state
 *   ✅ Memoized callbacks
 *   ✅ Props spreading ready
 */

/**
 * 3. ESEMPI DI UTILIZZO
 * File: src/components/ProjectSectionNavigation.examples.tsx
 * 
 * Contiene 6 scenari di utilizzo:
 *   - ProjectSectionPageBasic (useState)
 *   - ProjectSectionPageNextJS (Next.js App Router)
 *   - ProjectSectionPageReactRouter (React Router)
 *   - ProjectSectionPageMinimal (solo breadcrumb + sidebar)
 *   - ProjectSectionPageDynamic (label dinamico)
 *   - ProjectSectionPageFull (pagina completa con contenuto)
 */

/**
 * 4. DOCUMENTAZIONE
 * File: src/components/ProjectSectionNavigation.README.md
 * 
 * Contiene:
 *   - Panoramica e features
 *   - Quick start guide
 *   - Props interface documentation
 *   - Sub-components guide
 *   - Hooks documentation
 *   - Palette colori
 *   - Layout struttura
 *   - Animazioni dettagliate
 *   - Responsive design
 *   - Visibility toggles
 *   - Customizzazione
 *   - Esempi
 *   - Edge cases
 *   - Best practices
 *   - Troubleshooting
 */

/**
 * 5. EXPORT CENTRALIZZATO
 * File: src/components/index.ts
 * 
 * Esporta:
 *   - ProjectSection + ProjectSectionProps
 *   - ProjectSectionNavigation + ProjectSectionNavigationProps
 */

// ============================================
// QUICK USAGE
// ============================================

/*
import { ProjectSectionNavigation } from '@/components';

export function ProjectPage() {
  const [section, setSection] = useState(0);

  return (
    <div>
      <div className="h-screen">Content</div>
      
      <ProjectSectionNavigation
        projectSlug="pernigotti"
        projectTitle="Pernigotti"
        projectCategory="Packaging"
        sectionIndex={section}
        totalSections={5}
        sectionLabel="Challenge"
        onNavigateToSection={setSection}
        onNavigatePrevious={() => setSection(s => s - 1)}
        onNavigateNext={() => setSection(s => s + 1)}
      />
    </div>
  );
}
*/

// ============================================
// COMPONENTI SUB
// ============================================

const COMPONENTS = {
  BREADCRUMB: "Packaging · Pernigotti · Sezione 2/5",
  PROJECT_INDICATOR: "Progetto 3/16",
  PREV_NEXT_BUTTONS: "[← Precedente] [Successivo →]",
  SIDEBAR_DOTS: "● ○ ● ○ ○", // visible on right
};

// ============================================
// PALETTE COLORI
// ============================================

const COLORS = {
  greenPrimary: "#7EB83A",
  magenta: "#C94B8F",
  pink: "#D6889A",
  text: "#1A1A1A",
  background: "#FFFFFF",
  ghost: "#E8E8E8",
};

// ============================================
// LAYOUT
// ============================================

const LAYOUT = {
  breadcrumb: "top-6, left-8, fixed",
  projectIndicator: "top-6, right-8, fixed",
  prevNextButtons: "bottom-12, center-x, fixed",
  sidebarDots: "right-8, top-50%, fixed, vertical",
};

// ============================================
// ANIMAZIONI
// ============================================

const ANIMATIONS = {
  breadcrumb: "fade-in + slide-down (0.5s)",
  projectIndicator: "fade-in + slide-right (0.5s, delay 0.1s)",
  buttons: "fade-in + slide-up (0.5s, delay 0.2s)",
  dots: "fade-in + slide-right (0.5s, delay 0.1s)",
  dotHover: "scale 1.2",
  dotTap: "scale 0.95",
};

// ============================================
// FEATURES
// ============================================

const FEATURES = [
  "✅ Breadcrumb kategorizzato",
  "✅ Progetto indicator pill",
  "✅ Prev/Next navigation",
  "✅ Sidebar dots vertical",
  "✅ Framer Motion animations",
  "✅ Fixed overlay positioning",
  "✅ Next.js hook integration",
  "✅ React Router compatible",
  "✅ Visibility toggles",
  "✅ Fully customizable",
  "✅ Mobile responsive",
  "✅ TypeScript 100%",
];

// ============================================
// NEXT STEPS
// ============================================

/*
1. Importa il componente:
   import { ProjectSectionNavigation } from '@/components';

2. Usa in una pagina progetto:
   <ProjectSectionNavigation
     projectSlug="pernigotti"
     projectTitle="Pernigotti"
     projectCategory="Packaging"
     sectionIndex={sectionIndex}
     totalSections={5}
     onNavigateToSection={handleNavigate}
     onNavigatePrevious={handlePrev}
     onNavigateNext={handleNext}
   />

3. Per Next.js, usa l'hook:
   const nav = useProjectSectionNavigation({...});
   <ProjectSectionNavigation {...nav.props} />

4. Personalizza i colori:
   accentColor="magenta"

5. Consulta README per dettagli:
   src/components/ProjectSectionNavigation.README.md
*/

export const DOCUMENTATION = {
  main: "src/components/ProjectSectionNavigation.README.md",
  component: "src/components/ProjectSectionNavigation.tsx",
  hook: "src/hooks/useProjectSectionNavigation.ts",
  examples: "src/components/ProjectSectionNavigation.examples.tsx",
};

export default DOCUMENTATION;

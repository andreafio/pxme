/**
 * ESEMPI: ProjectSectionNavigation
 * 
 * Come utilizzo il componente di navigazione in diversi contesti
 */

import React from "react";
import { ProjectSectionNavigation, type ProjectSectionNavigationProps } from "../components/ProjectSectionNavigation";
import { useProjectSectionNavigation, useGenericSectionNavigation } from "../hooks/useProjectSectionNavigation";

// ============================================
// ESEMPIO 1: Utilizzo base (props manuali)
// ============================================

export function ProjectSectionPageBasic() {
  const [sectionIndex, setSectionIndex] = React.useState(0);

  return (
    <div>
      {/* Main Content */}
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <p className="text-2xl font-bold">Sezione {sectionIndex + 1}</p>
      </div>

      {/* Navigation */}
      <ProjectSectionNavigation
        projectSlug="pernigotti"
        projectTitle="Pernigotti"
        projectCategory="Packaging"
        sectionIndex={sectionIndex}
        totalSections={5}
        sectionLabel="Challenge"
        onNavigateToSection={setSectionIndex}
        onNavigatePrevious={() => setSectionIndex(Math.max(0, sectionIndex - 1))}
        onNavigateNext={() => setSectionIndex(Math.min(4, sectionIndex + 1))}
        accentColor="green"
        showBreadcrumb
        showProjectIndicator
        showPrevNextButtons
        showSidebarDots
      />
    </div>
  );
}

// ============================================
// ESEMPIO 2: Con Next.js App Router Hook
// ============================================

export function ProjectSectionPageNextJS({
  params,
}: {
  params: { slug: string; section: string };
}) {
  const sectionIndex = parseInt(params.section) || 0;

  // Hook Next.js integrato
  const nav = useProjectSectionNavigation({
    projectSlug: params.slug,
    projectTitle: "Pernigotti", // Da DB
    projectCategory: "Packaging", // Da DB
    currentSectionIndex: sectionIndex,
    totalSections: 5, // Da DB
    sectionLabel: "Challenge", // Da DB
    accentColor: "green",
  });

  return (
    <div>
      {/* Main Content */}
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <p className="text-2xl font-bold">Sezione {nav.currentSection + 1}</p>
      </div>

      {/* Navigation - semplice spread dei props */}
      <ProjectSectionNavigation {...nav.props} />
    </div>
  );
}

// ============================================
// ESEMPIO 3: Con React Router (generico)
// ============================================

export function ProjectSectionPageReactRouter() {
  const [sectionIndex, setSectionIndex] = React.useState(0);

  // Hook generico per qualunque router
  const nav = useGenericSectionNavigation({
    projectSlug: "unicredit",
    projectTitle: "Unicredit",
    projectCategory: "BTL & ATL",
    currentSectionIndex: sectionIndex,
    totalSections: 5,
    sectionLabel: "Results",
    onNavigate: (slug, index) => {
      // Puoi usare react-router, zustand, window.history, etc.
      setSectionIndex(index);
      window.history.pushState(null, "", `/progetti/${slug}/sezione/${index}`);
    },
    accentColor: "magenta",
  });

  return (
    <div>
      {/* Main Content */}
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <p className="text-2xl font-bold">Sezione {nav.currentSection + 1}</p>
      </div>

      {/* Navigation */}
      <ProjectSectionNavigation {...nav.props} />
    </div>
  );
}

// ============================================
// ESEMPIO 4: Solo Breadcrumb + Sidebar Dots
// ============================================

export function ProjectSectionPageMinimal() {
  const [sectionIndex, setSectionIndex] = React.useState(0);

  return (
    <div>
      <ProjectSectionNavigation
        projectSlug="pernigotti"
        projectTitle="Pernigotti"
        projectCategory="Packaging"
        sectionIndex={sectionIndex}
        totalSections={5}
        onNavigateToSection={setSectionIndex}
        onNavigatePrevious={() => setSectionIndex(Math.max(0, sectionIndex - 1))}
        onNavigateNext={() => setSectionIndex(Math.min(4, sectionIndex + 1))}
        // Only show breadcrumb and sidebar
        showBreadcrumb
        showProjectIndicator={false}
        showPrevNextButtons={false}
        showSidebarDots
      />

      <div className="w-full h-screen bg-white flex items-center justify-center">
        <p className="text-2xl font-bold">Sezione {sectionIndex + 1}</p>
      </div>
    </div>
  );
}

// ============================================
// ESEMPIO 5: Personalizzato con label dinamico
// ============================================

const SECTION_LABELS = [
  "Executive Summary",
  "Challenge",
  "Concept",
  "Results",
  "Learnings",
];

export function ProjectSectionPageDynamic() {
  const [sectionIndex, setSectionIndex] = React.useState(0);

  return (
    <div>
      <ProjectSectionNavigation
        projectSlug="pernigotti"
        projectTitle="Pernigotti"
        projectCategory="Packaging"
        sectionIndex={sectionIndex}
        totalSections={SECTION_LABELS.length}
        sectionLabel={SECTION_LABELS[sectionIndex]}
        onNavigateToSection={setSectionIndex}
        onNavigatePrevious={() => setSectionIndex(Math.max(0, sectionIndex - 1))}
        onNavigateNext={() =>
          setSectionIndex(Math.min(SECTION_LABELS.length - 1, sectionIndex + 1))
        }
        accentColor="magenta"
      />

      <div className="w-full h-screen bg-white flex flex-col items-center justify-center gap-6">
        <p className="text-2xl font-bold">{SECTION_LABELS[sectionIndex]}</p>
        <p className="text-sm opacity-60">
          Sezione {sectionIndex + 1} di {SECTION_LABELS.length}
        </p>
      </div>
    </div>
  );
}

// ============================================
// ESEMPIO 6: Con contenuto reale
// ============================================

export function ProjectSectionPageFull() {
  const [sectionIndex, setSectionIndex] = React.useState(0);

  const sections = [
    {
      title: "Executive Summary",
      content: "Il brief per il rebranding di Pernigotti...",
    },
    {
      title: "Challenge",
      content: "Le sfide principali del progetto...",
    },
    {
      title: "Concept",
      content: "La soluzione creativa proposta...",
    },
    {
      title: "Results",
      content: "I risultati ottenuti dal progetto...",
    },
    {
      title: "Learnings",
      content: "Le lezioni apprese dal progetto...",
    },
  ];

  return (
    <div>
      <ProjectSectionNavigation
        projectSlug="pernigotti"
        projectTitle="Pernigotti – Rebranding"
        projectCategory="Packaging"
        sectionIndex={sectionIndex}
        totalSections={sections.length}
        sectionLabel={sections[sectionIndex].title}
        onNavigateToSection={setSectionIndex}
        onNavigatePrevious={() => setSectionIndex(Math.max(0, sectionIndex - 1))}
        onNavigateNext={() =>
          setSectionIndex(Math.min(sections.length - 1, sectionIndex + 1))
        }
        accentColor="green"
        showBreadcrumb
        showProjectIndicator
        showPrevNextButtons
        showSidebarDots
      />

      <div className="w-full min-h-screen bg-white pt-32 pb-32">
        <div className="max-w-3xl mx-auto px-8">
          <h1 className="text-5xl font-black mb-8" style={{ color: "#1A1A1A" }}>
            {sections[sectionIndex].title}
          </h1>
          <p className="text-lg leading-relaxed opacity-80">
            {sections[sectionIndex].content}
          </p>

          {/* Placeholder for actual content */}
          <div className="mt-12 aspect-video bg-gradient-to-br rounded-2xl opacity-20" 
               style={{
                 backgroundImage: 'linear-gradient(135deg, #7EB83A, #C94B8F)'
               }} />
        </div>
      </div>
    </div>
  );
}

export default {
  ProjectSectionPageBasic,
  ProjectSectionPageNextJS,
  ProjectSectionPageReactRouter,
  ProjectSectionPageMinimal,
  ProjectSectionPageDynamic,
  ProjectSectionPageFull,
};

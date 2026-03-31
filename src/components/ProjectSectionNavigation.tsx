/**
 * ProjectSectionNavigation
 * 
 * Sistema di navigazione completo per le sezioni progetto
 * Breadcrumb + Indicatore posizione + Prev/Next + Sidebar dots
 * 
 * URL Pattern: /progetti/[slug]/sezione/[n]
 */

import React, { useMemo } from "react";
import { motion } from "motion/react";

export interface ProjectSectionNavigationProps {
  // Progetto corrente
  projectSlug: string;
  projectTitle: string;
  projectCategory: string;
  
  // Sezione corrente
  sectionIndex: number;        // 0-based index
  totalSections: number;
  sectionLabel?: string;       // Es. "Challenge", "Results"
  
  // Navigazione
  onNavigateToSection: (sectionIndex: number) => void;
  onNavigatePrevious?: () => void;
  onNavigateNext?: () => void;
  
  // Router integration
  getProjectUrl?: (slug: string) => string;
  getSectionUrl?: (slug: string, sectionIndex: number) => string;
  
  // Layout options
  showBreadcrumb?: boolean;
  showProjectIndicator?: boolean;
  showPrevNextButtons?: boolean;
  showSidebarDots?: boolean;
  
  // Styling
  accentColor?: "green" | "magenta";
}

/**
 * Breadcrumb Component
 */
function Breadcrumb({
  category,
  projectTitle,
  sectionIndex,
  totalSections,
}: {
  category: string;
  projectTitle: string;
  sectionIndex: number;
  totalSections: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2 text-xs uppercase tracking-widest"
    >
      <span style={{ color: "#1A1A1A" }}>{category}</span>
      <span style={{ color: "#E8E8E8" }}>·</span>
      <span style={{ color: "#C94B8F", fontWeight: 600 }}>{projectTitle}</span>
      <span style={{ color: "#E8E8E8" }}>·</span>
      <span style={{ color: "#1A1A1A" }}>
        Sezione {sectionIndex + 1}/{totalSections}
      </span>
    </motion.div>
  );
}

/**
 * Project Indicator (Position Pill)
 */
function ProjectIndicator({
  currentProject,
  totalProjects,
}: {
  currentProject: number;
  totalProjects: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex items-center gap-2 px-4 py-2 rounded-full border-2"
      style={{
        borderColor: "#7EB83A",
        backgroundColor: "#FFFFFF",
      }}
    >
      <span
        className="text-sm font-semibold"
        style={{ color: "#7EB83A" }}
      >
        Progetto {currentProject}/{totalProjects}
      </span>
    </motion.div>
  );
}

/**
 * Prev/Next Navigation Buttons
 */
function PrevNextButtons({
  sectionIndex,
  totalSections,
  sectionLabel,
  onPrevious,
  onNext,
  accentColor = "green",
}: {
  sectionIndex: number;
  totalSections: number;
  sectionLabel?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  accentColor?: "green" | "magenta";
}) {
  const accentHex = accentColor === "green" ? "#7EB83A" : "#C94B8F";
  const canGoPrev = sectionIndex > 0;
  const canGoNext = sectionIndex < totalSections - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex items-center justify-center gap-6"
    >
      {/* PREVIOUS BUTTON */}
      <button
        onClick={onPrevious}
        disabled={!canGoPrev}
        className="group relative px-6 py-3 border-2 rounded-lg font-semibold uppercase text-xs transition-all duration-300"
        style={{
          borderColor: canGoPrev ? accentHex : "#E8E8E8",
          color: canGoPrev ? accentHex : "#E8E8E8",
          backgroundColor: "#FFFFFF",
          opacity: canGoPrev ? 1 : 0.5,
          cursor: canGoPrev ? "pointer" : "not-allowed",
        }}
        onMouseEnter={(e) => {
          if (canGoPrev) {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              accentHex;
            (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
          }
        }}
        onMouseLeave={(e) => {
          if (canGoPrev) {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#FFFFFF";
            (e.currentTarget as HTMLButtonElement).style.color = accentHex;
          }
        }}
      >
        ← Precedente
      </button>

      {/* SECTION LABEL (optional) */}
      {sectionLabel && (
        <div
          className="text-xs uppercase tracking-wider text-center"
          style={{ color: "#1A1A1A", minWidth: "120px" }}
        >
          {sectionLabel}
        </div>
      )}

      {/* NEXT BUTTON */}
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className="group relative px-6 py-3 border-2 rounded-lg font-semibold uppercase text-xs transition-all duration-300"
        style={{
          borderColor: canGoNext ? accentHex : "#E8E8E8",
          color: canGoNext ? accentHex : "#E8E8E8",
          backgroundColor: "#FFFFFF",
          opacity: canGoNext ? 1 : 0.5,
          cursor: canGoNext ? "pointer" : "not-allowed",
        }}
        onMouseEnter={(e) => {
          if (canGoNext) {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              accentHex;
            (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
          }
        }}
        onMouseLeave={(e) => {
          if (canGoNext) {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#FFFFFF";
            (e.currentTarget as HTMLButtonElement).style.color = accentHex;
          }
        }}
      >
        Successivo →
      </button>
    </motion.div>
  );
}

/**
 * Sidebar Dots Navigation
 */
function SidebarDotsNavigation({
  totalSections,
  sectionIndex,
  onNavigateToSection,
  accentColor = "green",
}: {
  totalSections: number;
  sectionIndex: number;
  onNavigateToSection: (index: number) => void;
  accentColor?: "green" | "magenta";
}) {
  const accentHex = accentColor === "green" ? "#7EB83A" : "#C94B8F";

  return (
    <motion.div
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Container con background trasparente */}
      <div
        className="flex flex-col gap-4 p-4 rounded-full"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(200, 200, 200, 0.3)",
        }}
      >
        {Array.from({ length: totalSections }).map((_, i) => (
          <motion.button
            key={i}
            onClick={() => onNavigateToSection(i)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === sectionIndex ? "14px" : "10px",
              height: i === sectionIndex ? "14px" : "10px",
              backgroundColor: i === sectionIndex ? accentHex : "transparent",
              borderWidth: "2px",
              borderColor: i === sectionIndex ? accentHex : "#D9D9D9",
              cursor: "pointer",
            }}
            title={`Vai a sezione ${i + 1}`}
          />
        ))}
      </div>

      {/* Section number indicator on hover */}
      <div
        className="text-xs font-semibold uppercase text-center mt-4"
        style={{ color: accentHex, minWidth: "40px" }}
      >
        {sectionIndex + 1}/{totalSections}
      </div>
    </motion.div>
  );
}

/**
 * Main Navigation Component
 */
export function ProjectSectionNavigation({
  projectSlug,
  projectTitle,
  projectCategory,
  sectionIndex,
  totalSections,
  sectionLabel,
  onNavigateToSection,
  onNavigatePrevious,
  onNavigateNext,
  getProjectUrl,
  getSectionUrl,
  showBreadcrumb = true,
  showProjectIndicator = true,
  showPrevNextButtons = true,
  showSidebarDots = true,
  accentColor = "green",
}: ProjectSectionNavigationProps) {
  // Calcola il numero del progetto (0-based, mostra da 1 a 16 ad es.)
  // Questo dovrebbe venire dai props, ma per ora usiamo un placeholder
  const currentProjectNumber = useMemo(() => {
    // In un'app reale, questo verrebbe da uno state globale o props
    // Per ora usiamo un numero fisso
    return Math.floor(Math.random() * 16) + 1;
  }, []);

  const totalProjects = 16; // Placeholder - dovrebbe venire da config

  return (
    <>
      {/* TOP: Breadcrumb + Project Indicator */}
      {(showBreadcrumb || showProjectIndicator) && (
        <div className="fixed top-6 left-0 right-0 z-40 px-8 flex items-center justify-between pointer-events-none">
          {/* BREADCRUMB - sinistra */}
          {showBreadcrumb && (
            <div className="pointer-events-auto">
              <Breadcrumb
                category={projectCategory}
                projectTitle={projectTitle}
                sectionIndex={sectionIndex}
                totalSections={totalSections}
              />
            </div>
          )}

          {/* PROJECT INDICATOR - destra */}
          {showProjectIndicator && (
            <div className="pointer-events-auto">
              <ProjectIndicator
                currentProject={currentProjectNumber}
                totalProjects={totalProjects}
              />
            </div>
          )}
        </div>
      )}

      {/* BOTTOM: Prev/Next Navigation */}
      {showPrevNextButtons && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
          <PrevNextButtons
            sectionIndex={sectionIndex}
            totalSections={totalSections}
            sectionLabel={sectionLabel}
            onPrevious={onNavigatePrevious}
            onNext={onNavigateNext}
            accentColor={accentColor}
          />
        </div>
      )}

      {/* RIGHT: Sidebar Dots Navigation */}
      {showSidebarDots && (
        <SidebarDotsNavigation
          totalSections={totalSections}
          sectionIndex={sectionIndex}
          onNavigateToSection={onNavigateToSection}
          accentColor={accentColor}
        />
      )}
    </>
  );
}

export default ProjectSectionNavigation;

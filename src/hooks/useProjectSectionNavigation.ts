/**
 * Hook per integrare ProjectSectionNavigation con Next.js Router
 * 
 * Uso:
 * const nav = useProjectSectionNavigation({
 *   projectSlug: "pernigotti",
 *   totalSections: 5,
 *   currentSectionIndex: sectionIndex,
 * });
 * 
 * <ProjectSectionNavigation {...nav.props} />
 */

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

export interface UseProjectSectionNavigationProps {
  projectSlug: string;
  projectTitle: string;
  projectCategory: string;
  currentSectionIndex: number;
  totalSections: number;
  sectionLabel?: string;
  accentColor?: "green" | "magenta";
}

export interface UseProjectSectionNavigationReturn {
  props: {
    projectSlug: string;
    projectTitle: string;
    projectCategory: string;
    sectionIndex: number;
    totalSections: number;
    sectionLabel?: string;
    onNavigateToSection: (index: number) => void;
    onNavigatePrevious: () => void;
    onNavigateNext: () => void;
    accentColor?: "green" | "magenta";
  };
  currentSection: number;
  totalSections: number;
  canGoNext: boolean;
  canGoPrev: boolean;
}

/**
 * Hook per Next.js (App Router)
 */
export function useProjectSectionNavigation({
  projectSlug,
  projectTitle,
  projectCategory,
  currentSectionIndex,
  totalSections,
  sectionLabel,
  accentColor = "green",
}: UseProjectSectionNavigationProps): UseProjectSectionNavigationReturn {
  const router = useRouter();

  const canGoNext = useMemo(
    () => currentSectionIndex < totalSections - 1,
    [currentSectionIndex, totalSections]
  );

  const canGoPrev = useMemo(
    () => currentSectionIndex > 0,
    [currentSectionIndex]
  );

  const navigateToSection = useCallback(
    (sectionIndex: number) => {
      if (sectionIndex >= 0 && sectionIndex < totalSections) {
        router.push(`/progetti/${projectSlug}/sezione/${sectionIndex}`);
      }
    },
    [projectSlug, totalSections, router]
  );

  const navigatePrevious = useCallback(() => {
    if (canGoPrev) {
      navigateToSection(currentSectionIndex - 1);
    }
  }, [currentSectionIndex, canGoPrev, navigateToSection]);

  const navigateNext = useCallback(() => {
    if (canGoNext) {
      navigateToSection(currentSectionIndex + 1);
    }
  }, [currentSectionIndex, canGoNext, navigateToSection]);

  return {
    props: {
      projectSlug,
      projectTitle,
      projectCategory,
      sectionIndex: currentSectionIndex,
      totalSections,
      sectionLabel,
      onNavigateToSection: navigateToSection,
      onNavigatePrevious: navigatePrevious,
      onNavigateNext: navigateNext,
      accentColor,
    },
    currentSection: currentSectionIndex,
    totalSections,
    canGoNext,
    canGoPrev,
  };
}

/**
 * Alternative: Hook generico per React Router (o custom routing)
 */
export interface UseGenericNavigationProps {
  projectSlug: string;
  projectTitle: string;
  projectCategory: string;
  currentSectionIndex: number;
  totalSections: number;
  sectionLabel?: string;
  onNavigate: (projectSlug: string, sectionIndex: number) => void;
  accentColor?: "green" | "magenta";
}

export function useGenericSectionNavigation({
  projectSlug,
  projectTitle,
  projectCategory,
  currentSectionIndex,
  totalSections,
  sectionLabel,
  onNavigate,
  accentColor = "green",
}: UseGenericNavigationProps): UseProjectSectionNavigationReturn {
  const canGoNext = useMemo(
    () => currentSectionIndex < totalSections - 1,
    [currentSectionIndex, totalSections]
  );

  const canGoPrev = useMemo(
    () => currentSectionIndex > 0,
    [currentSectionIndex]
  );

  const navigateToSection = useCallback(
    (sectionIndex: number) => {
      if (sectionIndex >= 0 && sectionIndex < totalSections) {
        onNavigate(projectSlug, sectionIndex);
      }
    },
    [projectSlug, totalSections, onNavigate]
  );

  const navigatePrevious = useCallback(() => {
    if (canGoPrev) {
      navigateToSection(currentSectionIndex - 1);
    }
  }, [currentSectionIndex, canGoPrev, navigateToSection]);

  const navigateNext = useCallback(() => {
    if (canGoNext) {
      navigateToSection(currentSectionIndex + 1);
    }
  }, [currentSectionIndex, canGoNext, navigateToSection]);

  return {
    props: {
      projectSlug,
      projectTitle,
      projectCategory,
      sectionIndex: currentSectionIndex,
      totalSections,
      sectionLabel,
      onNavigateToSection: navigateToSection,
      onNavigatePrevious: navigatePrevious,
      onNavigateNext: navigateNext,
      accentColor,
    },
    currentSection: currentSectionIndex,
    totalSections,
    canGoNext,
    canGoPrev,
  };
}

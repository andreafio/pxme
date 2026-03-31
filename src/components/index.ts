/**
 * Index: Componenti Pxme
 * 
 * Barrel export per importazione centralizzata
 * 
 * Uso:
 * import { ProjectSection, ProjectSectionNavigation } from '@/components';
 * import { useProjectSectionNavigation } from '@/hooks';
 */

export { ProjectSection, type ProjectSectionProps } from './ProjectSection';
export {
  ProjectSectionNavigation,
  type ProjectSectionNavigationProps,
} from './ProjectSectionNavigation';
export { ResultsSection, type ResultsSectionProps, type KpiItem } from './ResultsSection';

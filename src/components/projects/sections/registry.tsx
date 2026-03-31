import React from "react";
import { DeliverablesSection } from "./DeliverablesSection";
import { GallerySection } from "./GallerySection";
import { TestimonialSection } from "./TestimonialSection";
import { PxmeLayout0_ExecutiveSummary } from "./PxmeLayout0_ExecutiveSummary";
import { PxmeLayout1_Challenge } from "./PxmeLayout1_Challenge";
import { PxmeLayout2_Concept } from "./PxmeLayout2_Concept";
import { PxmeLayout3_Results } from "./PxmeLayout3_Results";
import { PxmeLayout4_Learnings } from "./PxmeLayout4_Learnings";
import { PxmeLayout5_Gallery } from "./PxmeLayout5_Gallery";
import { normalizeProjectSection } from "./normalize";
import type { CarouselProject, ProjectSection, ProjectSectionType, SectionRenderProps } from "./types";

const SECTION_RENDERERS: Record<ProjectSectionType, (props: SectionRenderProps) => React.JSX.Element> = {
  overview: PxmeLayout0_ExecutiveSummary as (props: SectionRenderProps) => React.JSX.Element,
  challenge: PxmeLayout1_Challenge as (props: SectionRenderProps) => React.JSX.Element,
  approach: PxmeLayout2_Concept as (props: SectionRenderProps) => React.JSX.Element,
  deliverables: PxmeLayout3_Results as (props: SectionRenderProps) => React.JSX.Element,
  gallery: PxmeLayout5_Gallery as (props: SectionRenderProps) => React.JSX.Element,
  results: PxmeLayout3_Results as (props: SectionRenderProps) => React.JSX.Element,
  testimonial: TestimonialSection,
  "pxme-executive": PxmeLayout0_ExecutiveSummary as (props: SectionRenderProps) => React.JSX.Element,
  "pxme-challenge": PxmeLayout1_Challenge as (props: SectionRenderProps) => React.JSX.Element,
  "pxme-concept": PxmeLayout2_Concept as (props: SectionRenderProps) => React.JSX.Element,
  "pxme-results": PxmeLayout3_Results as (props: SectionRenderProps) => React.JSX.Element,
  "pxme-learnings": PxmeLayout4_Learnings as (props: SectionRenderProps) => React.JSX.Element,
};

export function ProjectSectionRenderer({
  section,
  project,
  sectionIndex,
  sectionCount,
  scrollContainerRef,
}: {
  section: ProjectSection;
  project: CarouselProject;
  sectionIndex: number;
  sectionCount: number;
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
}) {
  const normalized = normalizeProjectSection(section, project);
  const Renderer = SECTION_RENDERERS[normalized.type] ?? PxmeLayout0_ExecutiveSummary;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Renderer section={normalized} project={project} sectionIndex={sectionIndex} sectionCount={sectionCount} scrollContainerRef={scrollContainerRef} />
    </div>
  );
}

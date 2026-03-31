export type ProjectSectionType = "overview" | "challenge" | "approach" | "deliverables" | "gallery" | "results" | "testimonial" | "pxme-executive" | "pxme-challenge" | "pxme-concept" | "pxme-results" | "pxme-learnings";

export type ProjectSectionMeta = {
  eyebrow?: string;
  subtitle?: string;
};

export type ProjectStep = {
  title: string;
  description: string;
};

export type ProjectDeliverableItem = {
  title: string;
  format?: string;
  usage?: string;
  tag?: string;
};

export type ProjectKpi = {
  label: string;
  value: string;
};

export type ProjectQuote = {
  text: string;
  author?: string;
};

export type ProjectMedia = {
  image?: string;
  images?: string[];
  video?: string;
};

export type ProjectCta = {
  label: string;
  href: string;
};

export type ProjectSection = {
  id: string;
  type: ProjectSectionType;
  label: string;
  title: string;
  body: string;
  image?: string;
  meta?: ProjectSectionMeta;
  highlights?: string[];
  steps?: ProjectStep[];
  items?: ProjectDeliverableItem[];
  kpis?: ProjectKpi[];
  quote?: ProjectQuote;
  media?: ProjectMedia;
  cta?: ProjectCta;
};

export type CarouselProject = {
  id: string;
  title: string;
  category: string;
  image?: string;
  sections: ProjectSection[];
  feedbackQuote?: string;
  feedbackAuthor?: string;
};

export type NormalizedProjectSection = {
  id: string;
  type: ProjectSectionType;
  label: string;
  title: string;
  body: string;
  image?: string;
  meta: ProjectSectionMeta;
  highlights: string[];
  steps: ProjectStep[];
  items: ProjectDeliverableItem[];
  kpis: ProjectKpi[];
  quote?: ProjectQuote;
  media: ProjectMedia;
  cta?: ProjectCta;
};

export type SectionRenderProps = {
  section: NormalizedProjectSection;
  project: CarouselProject;
  sectionIndex: number;
  sectionCount: number;
  scrollContainerRef?: { current: HTMLDivElement | null };
};

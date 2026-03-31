import type {
  CarouselProject,
  NormalizedProjectSection,
  ProjectDeliverableItem,
  ProjectKpi,
  ProjectSection,
  ProjectStep,
} from "./types";

function splitSentences(text: string): string[] {
  return text
    .split(/[.!?]\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function splitLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function inferSteps(section: ProjectSection): ProjectStep[] {
  if (section.steps && section.steps.length > 0) return section.steps;

  return splitSentences(section.body).map((sentence, index) => ({
    title: `Step ${index + 1}`,
    description: sentence,
  }));
}

function inferItems(section: ProjectSection): ProjectDeliverableItem[] {
  if (section.items && section.items.length > 0) return section.items;

  return splitLines(section.body).map((line) => ({ title: line }));
}

function inferKpis(section: ProjectSection, project: CarouselProject): ProjectKpi[] {
  if (section.kpis && section.kpis.length > 0) return section.kpis;

  return [
    { label: "Categoria", value: project.category },
    { label: "Progetto", value: project.title },
    { label: "Sezione", value: section.label },
  ];
}

function inferHighlights(section: ProjectSection): string[] {
  if (section.highlights && section.highlights.length > 0) return section.highlights;

  const fromLines = splitLines(section.body);
  if (fromLines.length > 1) return fromLines.slice(0, 3);

  return splitSentences(section.body).slice(0, 3);
}

export function normalizeProjectSection(section: ProjectSection, project: CarouselProject): NormalizedProjectSection {
  const inferredQuoteText = section.quote?.text ?? project.feedbackQuote;

  return {
    id: section.id,
    type: section.type,
    label: section.label,
    title: section.title,
    body: section.body,
    image: section.image || project.image,
    meta: section.meta ?? {},
    highlights: inferHighlights(section),
    steps: inferSteps(section),
    items: inferItems(section),
    kpis: inferKpis(section, project),
    quote: inferredQuoteText
      ? {
          text: inferredQuoteText,
          author: section.quote?.author ?? project.feedbackAuthor,
        }
      : undefined,
    media: {
      image: section.media?.image || section.image || project.image,
      images: section.media?.images,
      video: section.media?.video,
    },
    cta: section.cta,
  };
}

import type { ReactNode } from "react";
import type { ProjectSectionType } from "./types";

const SECTION_STYLE: Record<ProjectSectionType, { badge: string; chip: string }> = {
  overview: { badge: "bg-[#101010] text-white", chip: "bg-[#101010]/8 text-[#101010]" },
  challenge: { badge: "bg-[#f97316] text-white", chip: "bg-[#f97316]/12 text-[#8a3a0a]" },
  approach: { badge: "bg-[#76b729] text-white", chip: "bg-[#76b729]/15 text-[#2f5f0f]" },
  deliverables: { badge: "bg-[#0f766e] text-white", chip: "bg-[#0f766e]/12 text-[#0f4e49]" },
  gallery: { badge: "bg-[#1d4ed8] text-white", chip: "bg-[#1d4ed8]/12 text-[#15357f]" },
  results: { badge: "bg-[#d72488] text-white", chip: "bg-[#d72488]/12 text-[#8f165a]" },
  testimonial: { badge: "bg-[#5b21b6] text-white", chip: "bg-[#5b21b6]/12 text-[#3b1680]" },
};

export function SectionHeader({
  type,
  label,
  sectionIndex,
  sectionCount,
}: {
  type: ProjectSectionType;
  label: string;
  sectionIndex: number;
  sectionCount: number;
}) {
  const style = SECTION_STYLE[type];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] md:text-[12px] font-bold uppercase tracking-[0.08em] ${style.badge}`}>
        {label}
      </span>
      <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] md:text-[12px] font-semibold ${style.chip}`}>
        {sectionIndex + 1}/{sectionCount}
      </span>
    </div>
  );
}

export function SectionTitle({ title }: { title: string }) {
  if (!title) return null;

  return (
    <p className="mt-3 text-[22px] md:text-[32px] font-extrabold text-[#101010] leading-[1.15]">
      {title}
    </p>
  );
}

export function SectionFrame({
  children,
  accentClassName,
  glowClassName,
}: {
  children: ReactNode;
  accentClassName: string;
  glowClassName: string;
}) {
  return (
    <div className="relative mt-5 overflow-hidden rounded-[28px] border border-white/60 bg-white/78 p-5 md:p-6 shadow-[0_22px_60px_rgba(16,16,16,0.12)] backdrop-blur-sm">
      <div className={`absolute inset-x-0 top-0 h-1 ${accentClassName}`} />
      <div className={`absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl opacity-70 ${glowClassName}`} />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(255,255,255,0.38))]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,#101010_1px,transparent_0)] [background-size:18px_18px]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function SectionEyebrow({ text, className }: { text: string; className?: string }) {
  return <p className={`text-[11px] md:text-[12px] uppercase tracking-[0.12em] font-bold ${className ?? "text-[#7d7b79]"}`}>{text}</p>;
}

export function SectionMediaSlot({ image, title }: { image?: string; title: string }) {
  if (!image) return null;

  return (
    <div className="hidden lg:block absolute right-[16vw] top-1/2 -translate-y-1/2 z-10">
      <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-[#de5ca1]/18 to-[#76b729]/12 blur-2xl" />
      <div className="relative w-[280px] h-[380px] rounded-[30px] overflow-hidden shadow-[0_28px_80px_rgba(16,16,16,0.24)] border border-white/60 bg-white/40 backdrop-blur-sm rotate-[4deg]">
        <img src={image} alt={title} className="w-full h-full object-cover scale-[1.02]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/10" />
        <div className="absolute left-4 right-4 bottom-4 rounded-2xl bg-white/78 px-4 py-3 backdrop-blur-md border border-white/60">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#7d7b79]">Visual Focus</p>
          <p className="mt-1 text-[16px] font-semibold text-[#101010] leading-[1.2]">{title}</p>
        </div>
      </div>
    </div>
  );
}

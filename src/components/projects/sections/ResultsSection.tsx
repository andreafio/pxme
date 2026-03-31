import { SectionEyebrow, SectionFrame, SectionHeader, SectionTitle } from "./shared";
import type { SectionRenderProps } from "./types";

export function ResultsSection({ section, sectionIndex, sectionCount }: SectionRenderProps) {
  return (
    <>
      <SectionHeader type={section.type} label={section.label} sectionIndex={sectionIndex} sectionCount={sectionCount} />
      <SectionTitle title={section.title} />

      <SectionFrame accentClassName="bg-gradient-to-r from-[#d72488] via-[#ef69b5] to-transparent" glowClassName="bg-[#d72488]/18">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[1.1fr_0.9fr] md:gap-6">
          <div>
            <SectionEyebrow text="Measured Impact" className="text-[#8f165a]" />
            <p className="mt-3 text-[18px] md:text-[24px] leading-[28px] md:leading-[36px] text-[#101010] max-w-[26ch]">{section.body}</p>

            {section.quote && (
              <blockquote className="mt-5 rounded-[24px] bg-[linear-gradient(135deg,rgba(215,36,136,0.12),rgba(255,255,255,0.85))] p-5 border border-[#d72488]/18">
                <p className="text-[28px] leading-none text-[#d72488]/35">“</p>
                <p className="-mt-1 italic text-[15px] md:text-[17px] leading-[24px] md:leading-[28px] text-[#6f0f45]">{section.quote.text}</p>
                {section.quote.author && (
                  <footer className="mt-3 text-[12px] md:text-[13px] font-semibold text-[#7d7b79]">{section.quote.author}</footer>
                )}
              </blockquote>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 content-start">
            {section.kpis.slice(0, 3).map((kpi, idx) => (
              <div key={`${kpi.label}-${idx}`} className="rounded-[22px] border border-[#d72488]/18 bg-white/82 px-4 py-4 shadow-[0_12px_24px_rgba(215,36,136,0.08)]">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#8f165a]">{kpi.label}</p>
                <p className="mt-2 text-[22px] md:text-[28px] font-black leading-[1] text-[#d72488]">{kpi.value}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionFrame>
    </>
  );
}

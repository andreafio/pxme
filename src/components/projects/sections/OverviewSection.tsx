import { SectionEyebrow, SectionFrame, SectionHeader, SectionTitle } from "./shared";
import type { SectionRenderProps } from "./types";

export function OverviewSection({ section, sectionIndex, sectionCount }: SectionRenderProps) {
  return (
    <>
      <SectionHeader type={section.type} label={section.label} sectionIndex={sectionIndex} sectionCount={sectionCount} />
      <SectionTitle title={section.title} />

      <SectionFrame accentClassName="bg-gradient-to-r from-[#101010] via-[#404040] to-transparent" glowClassName="bg-[#101010]/12">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[1.4fr_0.9fr] md:gap-6">
          <div>
            <SectionEyebrow text="Executive Summary" className="text-[#101010]/55" />
            <p className="mt-3 text-[16px] md:text-[21px] leading-[26px] md:leading-[34px] text-[#101010] max-w-[32ch]">{section.body}</p>

            {section.highlights.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2.5">
                {section.highlights.slice(0, 3).map((highlight, idx) => (
                  <span key={`${highlight}-${idx}`} className="inline-flex rounded-full border border-[#101010]/10 bg-[#101010]/5 px-3 py-1.5 text-[12px] md:text-[13px] text-[#101010]">
                    {highlight}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3">
            {section.kpis.slice(0, 3).map((kpi, idx) => (
              <div key={`${kpi.label}-${idx}`} className="rounded-2xl border border-[#101010]/10 bg-white/80 px-4 py-4 shadow-[0_8px_24px_rgba(16,16,16,0.06)]">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#7d7b79]">{kpi.label}</p>
                <p className="mt-1 text-[16px] md:text-[18px] font-semibold text-[#101010] leading-[1.2]">{kpi.value}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionFrame>
    </>
  );
}

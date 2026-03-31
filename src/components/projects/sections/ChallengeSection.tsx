import { SectionEyebrow, SectionFrame, SectionHeader, SectionTitle } from "./shared";
import type { SectionRenderProps } from "./types";

export function ChallengeSection({ section, sectionIndex, sectionCount }: SectionRenderProps) {
  const constraints = section.highlights.length > 0 ? section.highlights : [section.body];

  return (
    <>
      <SectionHeader type={section.type} label={section.label} sectionIndex={sectionIndex} sectionCount={sectionCount} />
      <SectionTitle title={section.title} />

      <SectionFrame accentClassName="bg-gradient-to-r from-[#f97316] via-[#fb923c] to-transparent" glowClassName="bg-[#f97316]/20">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[0.78fr_1.22fr] md:gap-6">
          <div className="rounded-[24px] bg-[#101010] px-5 py-6 text-white">
            <SectionEyebrow text="Critical Tension" className="text-white/55" />
            <p className="mt-3 text-[28px] md:text-[40px] font-black leading-[0.95]">Challenge</p>
            <div className="mt-5 h-px bg-white/20" />
            <p className="mt-5 text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-white/82">{section.body}</p>
          </div>

          <div>
            <SectionEyebrow text="Vincoli Principali" className="text-[#b45309]" />
            <div className="mt-4 grid grid-cols-1 gap-3">
              {constraints.slice(0, 4).map((constraint, index) => (
                <div key={`${constraint}-${index}`} className="rounded-2xl border border-[#f97316]/20 bg-[#fff5ed] px-4 py-4">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#f97316] text-white text-[12px] font-bold">
                      {index + 1}
                    </span>
                    <p className="text-[15px] md:text-[17px] leading-[24px] md:leading-[28px] text-[#101010]">{constraint}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionFrame>
    </>
  );
}

import { SectionEyebrow, SectionFrame, SectionHeader, SectionTitle } from "./shared";
import type { SectionRenderProps } from "./types";

export function ApproachSection({ section, sectionIndex, sectionCount }: SectionRenderProps) {
  const steps = section.steps.length > 0
    ? section.steps
    : [{ title: "Step 1", description: section.body }];

  return (
    <>
      <SectionHeader type={section.type} label={section.label} sectionIndex={sectionIndex} sectionCount={sectionCount} />
      <SectionTitle title={section.title} />

      <SectionFrame accentClassName="bg-gradient-to-r from-[#76b729] via-[#98d445] to-transparent" glowClassName="bg-[#76b729]/18">
        <SectionEyebrow text="Method & Flow" className="text-[#2f5f0f]" />
        <div className="mt-5 relative pl-4 md:pl-5">
          <div className="absolute left-[13px] top-0 bottom-0 w-px bg-gradient-to-b from-[#76b729] via-[#76b729]/35 to-transparent md:left-[15px]" />
          <div className="flex flex-col gap-4">
            {steps.map((step, index) => (
              <div key={`${step.title}-${index}`} className="relative rounded-[22px] border border-[#76b729]/20 bg-white/80 px-4 py-4 shadow-[0_10px_24px_rgba(118,183,41,0.08)]">
                <span className="absolute -left-[18px] top-5 inline-flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-[#76b729] text-white text-[12px] font-black shadow-lg md:-left-[20px]">
                  {index + 1}
                </span>
                <p className="pl-3 text-[12px] md:text-[13px] uppercase tracking-[0.1em] font-bold text-[#2f5f0f]">{step.title}</p>
                <p className="pl-3 mt-2 text-[15px] md:text-[17px] leading-[24px] md:leading-[28px] text-[#1f2d14]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionFrame>
    </>
  );
}

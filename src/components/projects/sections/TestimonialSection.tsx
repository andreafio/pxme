import { SectionEyebrow, SectionFrame, SectionHeader } from "./shared";
import type { SectionRenderProps } from "./types";

export function TestimonialSection({ section, sectionIndex, sectionCount }: SectionRenderProps) {
  const quoteText = section.quote?.text || section.body;
  const quoteAuthor = section.quote?.author || section.title;

  return (
    <>
      <SectionHeader type={section.type} label={section.label} sectionIndex={sectionIndex} sectionCount={sectionCount} />

      <SectionFrame accentClassName="bg-gradient-to-r from-[#5b21b6] via-[#8b5cf6] to-transparent" glowClassName="bg-[#7c3aed]/18">
        <div className="rounded-[30px] bg-gradient-to-br from-[#4c1d95] via-[#5b21b6] to-[#7c3aed] text-white px-6 py-7 md:px-8 md:py-9 shadow-[0_22px_50px_rgba(91,33,182,0.28)]">
          <SectionEyebrow text="Client Voice" className="text-white/55" />
          <p className="mt-4 text-[54px] md:text-[72px] leading-none font-light opacity-30">“</p>
          <p className="-mt-4 max-w-[18ch] text-[24px] md:text-[38px] leading-[1.18] font-light">{quoteText}</p>
          {quoteAuthor && <p className="mt-5 text-[13px] md:text-[15px] font-semibold text-white/82">{quoteAuthor}</p>}
        </div>
      </SectionFrame>
    </>
  );
}

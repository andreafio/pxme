import { SectionEyebrow, SectionFrame, SectionHeader, SectionTitle } from "./shared";
import type { SectionRenderProps } from "./types";

export function GallerySection({ section, sectionIndex, sectionCount }: SectionRenderProps) {
  const coverImage = section.media.image;
  const thumbImages = section.media.images ?? [];

  return (
    <>
      <SectionHeader type={section.type} label={section.label} sectionIndex={sectionIndex} sectionCount={sectionCount} />
      <SectionTitle title={section.title} />

      <SectionFrame accentClassName="bg-gradient-to-r from-[#1d4ed8] via-[#60a5fa] to-transparent" glowClassName="bg-[#1d4ed8]/18">
        <SectionEyebrow text="Visual Narrative" className="text-[#15357f]" />

        {coverImage ? (
          <div className="mt-4 relative rounded-[26px] overflow-hidden h-[220px] md:h-[320px] border border-[#1d4ed8]/20 shadow-[0_18px_34px_rgba(29,78,216,0.16)]">
            <img src={coverImage} alt={section.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(29,78,216,0.72),rgba(0,0,0,0.12)_45%,rgba(0,0,0,0.48))] p-5 md:p-6 flex flex-col justify-between">
              <span className="inline-flex w-max rounded-full bg-white/16 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-white backdrop-blur-md">Hero Visual</span>
              <div>
                <p className="text-white text-[20px] md:text-[30px] leading-tight font-bold max-w-[14ch]">{section.title}</p>
                {section.body && <p className="mt-3 max-w-[42ch] text-white/90 text-[13px] md:text-[15px] leading-[19px] md:leading-[23px]">{section.body}</p>}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-[24px] border border-dashed border-[#1d4ed8]/40 p-6 bg-[#1d4ed8]/6">
            <p className="text-[15px] md:text-[18px] leading-[24px] md:leading-[30px] text-[#15357f]">{section.body}</p>
          </div>
        )}

        {thumbImages.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {thumbImages.slice(0, 6).map((img, idx) => (
              <div key={`${img}-${idx}`} className="relative h-20 md:h-24 rounded-xl overflow-hidden border border-[#1d4ed8]/20">
                <img src={img} alt={`${section.title} ${idx + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
              </div>
            ))}
          </div>
        )}
      </SectionFrame>
    </>
  );
}

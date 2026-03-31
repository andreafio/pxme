import { SectionEyebrow, SectionFrame, SectionHeader, SectionTitle } from "./shared";
import type { SectionRenderProps } from "./types";

export function DeliverablesSection({ section, sectionIndex, sectionCount }: SectionRenderProps) {
  const items = section.items.length > 0 ? section.items : [{ title: section.body }];

  return (
    <>
      <SectionHeader type={section.type} label={section.label} sectionIndex={sectionIndex} sectionCount={sectionCount} />
      <SectionTitle title={section.title} />

      <SectionFrame accentClassName="bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-transparent" glowClassName="bg-[#14b8a6]/18">
        <div className="flex items-end justify-between gap-3 flex-wrap">
          <SectionEyebrow text="Output System" className="text-[#0f4e49]" />
          <p className="text-[12px] uppercase tracking-[0.1em] text-[#0f4e49]/70">Toolkit pronto all'uso</p>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.map((item, idx) => (
            <div key={`${item.title}-${idx}`} className="group relative overflow-hidden rounded-[24px] border border-[#0f766e]/18 bg-white/80 p-4 shadow-[0_12px_26px_rgba(15,118,110,0.08)]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0f766e] to-[#14b8a6] opacity-80" />
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] uppercase tracking-[0.1em] font-bold text-[#0f4e49]">Deliverable {idx + 1}</p>
                {item.tag && (
                  <span className="inline-flex rounded-full bg-[#0f766e]/12 px-2 py-1 text-[10px] uppercase tracking-[0.08em] text-[#0f4e49] font-bold">
                    {item.tag}
                  </span>
                )}
              </div>

              <p className="mt-3 text-[16px] md:text-[18px] leading-[22px] md:leading-[24px] text-[#0b2523] font-semibold max-w-[18ch]">{item.title}</p>

              {(item.format || item.usage) && (
                <div className="mt-4 grid grid-cols-1 gap-2 text-[12px] md:text-[13px] leading-[20px] text-[#0f4e49]">
                  {item.format && <p><span className="font-bold">Formato</span> {item.format}</p>}
                  {item.usage && <p><span className="font-bold">Uso</span> {item.usage}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionFrame>
    </>
  );
}

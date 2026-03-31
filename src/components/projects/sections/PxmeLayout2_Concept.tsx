import React from "react";
import { SectionRenderProps } from "./types";
import { GraficoProgetto } from "./GraficoProgetto";

/**
 * SEZIONE 2: Soluzione / Concept
 * Layout: sfondo scuro (nero), testo bianco,
 * immagine grande a sinistra, testo descrittivo a destra,
 * accent magenta per le highlight
 */

export function PxmeLayout2_Concept({ section, project, sectionIndex, scrollContainerRef }: SectionRenderProps) {
  const rawHighlights = section.highlights || section.body?.split(".").filter(s => s.trim()) || [];
  const steps = rawHighlights.filter(h =>
    !h.includes("Sezione") &&
    h !== project.title &&
    h !== project.category
  );
  const graphicImage = section.media?.image || section.image || project.image || "";

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
      }}
    >
      <div ref={scrollContainerRef} className="section-scroll-inner" style={{
        position: 'absolute',
        top: '140px',
        left: 0,
        right: 0,
        bottom: '80px',
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarWidth: 'none',
        paddingLeft: '5vw',
        paddingRight: '5vw',
        paddingTop: '20px',
        paddingBottom: '20px',
        boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: '40px', width: '100%', minHeight: '100%', height: '100%', maxHeight: 'calc(100vh - 240px)' }}>
          <div style={{ flex: '0 0 40%', minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
          <p style={{ margin: '0 0 16px 0', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#616773', fontWeight: 700 }}>
            {section.label ?? 'Soluzione'}
          </p>
          <h2 style={{ margin: '0 0 24px 0', fontSize: 'clamp(2.8rem, 4.5vw, 4rem)', fontWeight: 900, color: '#101010', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            {section.title}
          </h2>
          <p style={{ margin: '0 0 40px 0', fontSize: '17px', lineHeight: 1.65, color: '#101010', fontWeight: 400, maxWidth: '480px' }}>
            {section.body}
          </p>
          {steps.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {steps.slice(0, 4).map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: 8, height: 8, background: '#C94B8F', borderRadius: '50%', marginTop: 6, flexShrink: 0 }} />
                  <p style={{ fontSize: '13px', color: '#41444c', lineHeight: 1.5, margin: 0 }}>
                    {step.trim()}
                  </p>
                </div>
              ))}
            </div>
          )}
          <button
            style={{
              padding: '10px 24px',
              border: '2px solid #C94B8F',
              color: '#C94B8F',
              fontWeight: 600,
              fontSize: '12px',
              textTransform: 'uppercase' as const,
              letterSpacing: '0.08em',
              borderRadius: 4,
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            Scopri dettagli →
          </button>
        </div>

          <div style={{ flex: '0 0 60%', minWidth: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '20px' }}>
            <GraficoProgetto image={graphicImage} alt={section.title} sectionIndex={sectionIndex} />
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { SectionRenderProps } from "./types";
import { GraficoProgetto } from "./GraficoProgetto";

/**
 * SEZIONE 1: Obiettivo / Challenge
 * Layout: full-width con numero gigante ghost (01/) sovrapposto,
 * testo centrato in colonna stretta, lista "Vincoli Principali"
 * con numerazione verde, immagine tagliata a destra fuori dal contenitore
 */

export function PxmeLayout1_Challenge({ section, project, sectionIndex, scrollContainerRef }: SectionRenderProps) {
  const graphicImage = section.media?.image || section.image || project.image || "";
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'white',
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
            {section.label ?? 'Sfida principale'}
          </p>
          <h2 style={{ margin: '0 0 24px 0', fontSize: 'clamp(2.8rem, 4.5vw, 4rem)', fontWeight: 900, color: '#101010', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            {section.title}
          </h2>
          <p style={{ margin: '0 0 40px 0', fontSize: '17px', lineHeight: 1.65, color: '#101010', fontWeight: 400, maxWidth: '480px' }}>
            {section.body}
          </p>
        </div>

          <div style={{ flex: '0 0 60%', minWidth: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '20px' }}>
            <GraficoProgetto image={graphicImage} alt={section.title} sectionIndex={sectionIndex} />
          </div>
        </div>
      </div>
    </div>
  );
}

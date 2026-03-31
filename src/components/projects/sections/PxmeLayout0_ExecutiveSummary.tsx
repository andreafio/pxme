import React from "react";
import { SectionRenderProps } from "./types";
import { GraficoProgetto } from "./GraficoProgetto";

/**
 * SEZIONE 0: Executive Summary
 * Layout pulito a due colonne, stile inline.
 * Sinistra: label tipo + titolo + body + metadata rows
 * Destra: immagine circolare 280x280
 */

export function PxmeLayout0_ExecutiveSummary({ section, project, sectionIndex, scrollContainerRef }: SectionRenderProps) {
  const kpis = section.kpis ?? [];
  const graphicImage = section.media?.image || section.image || project.image || "";
  const valueGradient = {
    background: 'linear-gradient(to left, #de5ca1, #76b729)',
    WebkitBackgroundClip: 'text' as const,
    color: 'transparent',
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'transparent',
      fontFamily: 'Inter, sans-serif',
    }}>
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
            {section.label ?? 'Panoramica'}
          </p>
          <h2 style={{ margin: '0 0 24px 0', fontSize: 'clamp(2.8rem, 4.5vw, 4rem)', fontWeight: 900, color: '#101010', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            {section.title}
          </h2>
          <p style={{ margin: '0 0 40px 0', fontSize: '17px', lineHeight: 1.65, color: '#101010', fontWeight: 400, maxWidth: '480px' }}>
            {section.body}
          </p>
          {kpis.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
              {kpis.slice(0, 3).map((kpi, i) => (
                <div key={i}>
                  <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#616773', margin: '0 0 6px 0' }}>
                    {kpi.label}
                  </p>
                  <p style={{ ...valueGradient, fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)', fontWeight: 900, margin: 0 }}>
                    {kpi.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

          <div style={{ flex: '0 0 60%', minWidth: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '20px' }}>
            <GraficoProgetto image={graphicImage} alt={section.title} sectionIndex={sectionIndex} />
          </div>
        </div>
      </div>

    </div>
  );
}
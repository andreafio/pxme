import React, { useState, useEffect } from "react";
import { SectionRenderProps } from "./types";

/**
 * SEZIONE 5: Gallery — IMAGE WALL
 * Full-bleed professional wall, no gaps, no padding.
 * Grid 3 colonne, gap 0.
 * Prima riga: 2col(16/9) + 1col(8/9 match height)
 * Righe successive: 3 colonne uniformi aspect-ratio 4/3
 * Hover: overlay scuro senza scale (per evitare overflow)
 */

function getWallGridConfig(idx: number) {
  if (idx === 0) return { span: 2, ratio: '16/9' };
  if (idx === 1) return { span: 1, ratio: '8/9' };
  return { span: 1, ratio: '4/3' };
}

export function PxmeLayout5_Gallery({ section, project, scrollContainerRef }: SectionRenderProps) {
  const gallery = section.media?.images ?? [];
  const remainder = gallery.length % 3;
  const placeholders = remainder === 0 ? 0 : 3 - remainder;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === 'ArrowRight' && lightboxIdx < gallery.length - 1) setLightboxIdx((i) => i! + 1);
      if (e.key === 'ArrowLeft' && lightboxIdx > 0) setLightboxIdx((i) => i! - 1);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [lightboxIdx, gallery.length]);

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
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '5vw',
        paddingRight: '5vw',
        paddingTop: '24px',
        paddingBottom: '20px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarWidth: 'none',
      }}>
        <div style={{ padding: '20px 0 16px' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '11px', letterSpacing: '0.14em', color: '#888', textTransform: 'uppercase' }}>
            GALLERY
          </p>
          <p style={{ margin: 0, fontSize: '20px', color: '#555', fontWeight: 400 }}>
            {project.title} — Portfolio visivo
          </p>
        </div>

        {/* Full-Bleed IMAGE WALL */}
        {gallery.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
            margin: '0 calc(-1 * 5vw) 40px calc(-1 * 5vw)',
            width: 'calc(100% + calc(2 * 5vw))',
          }}>
            {gallery.map((img, idx) => {
              const { span, ratio } = getWallGridConfig(idx);
              return (
                <div
                  key={`${img}-${idx}`}
                  style={{
                    gridColumn: `span ${span}`,
                    position: 'relative',
                    aspectRatio: ratio,
                    overflow: 'hidden',
                    borderRadius: '0',
                    cursor: 'zoom-in',
                    display: 'block',
                  }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => setLightboxIdx(idx)}
                >
                  <img
                    src={img}
                    alt={`${project.title} ${idx + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      borderRadius: '0',
                      display: 'block',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0, 0, 0, 0.15)',
                      opacity: hoveredIdx === idx ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                      pointerEvents: 'none',
                      borderRadius: '0',
                    }}
                  />
                </div>
              );
            })}
            {Array(placeholders).fill(null).map((_, idx) => (
              <div
                key={`ph-${idx}`}
                style={{
                  gridColumn: 'span 1',
                  aspectRatio: '4/3',
                  background: '#f0eeeb',
                }}
              />
            ))}
          </div>
        ) : (
          <div style={{
            padding: '40px 20px',
            textAlign: 'center',
            color: '#616773',
            fontSize: '16px',
          }}>
            Nessuna immagine disponibile
          </div>
        )}
      </div>

      {/* Lightbox Overlay */}
      {lightboxIdx !== null && gallery.length > 0 && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setLightboxIdx(null)}
        >
          {/* Main Image */}
          <img
            src={gallery[lightboxIdx]}
            alt={`${project.title} ${lightboxIdx + 1}`}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Close Button */}
          <button
            onClick={() => setLightboxIdx(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '28px',
              color: '#fff',
              background: 'none',
              border: 'none',
              fontSize: '36px',
              cursor: 'pointer',
            }}
          >
            ×
          </button>

          {/* Previous Button */}
          {lightboxIdx > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx((i) => i! - 1);
              }}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#fff',
                background: 'none',
                border: 'none',
                fontSize: '52px',
                cursor: 'pointer',
              }}
            >
              ‹
            </button>
          )}

          {/* Next Button */}
          {lightboxIdx < gallery.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx((i) => i! + 1);
              }}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#fff',
                background: 'none',
                border: 'none',
                fontSize: '52px',
                cursor: 'pointer',
              }}
            >
              ›
            </button>
          )}

          {/* Counter */}
          <p
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '12px',
              letterSpacing: '0.12em',
              margin: 0,
            }}
          >
            {lightboxIdx + 1} / {gallery.length}
          </p>
        </div>
      )}
    </div>
  );
}

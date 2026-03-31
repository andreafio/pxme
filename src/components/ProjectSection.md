/**
 * DOCUMENTAZIONE: Componente ProjectSection
 * 
 * Sistema riutilizzabile di layout per case study Pxme.
 * 
 * PALETTE COLORI:
 * - Verde primario: #7EB83A
 * - Magenta: #C94B8F
 * - Rosa: #D6889A
 * - Ghost number: #E8E8E8
 * - Text: #1A1A1A
 * - Background: #FFFFFF
 * 
 * ============================================
 * 
 * LAYOUT 1: "SUMMARY" (Executive Summary)
 * Uso: Presentare il progetto, panoramica generale
 * Struttura:
 *   - Sinistra: Titolo, descrizione, metadata card
 *   - Destra: Immagine circolare
 *   - Sfondo: Blob SVG decorativo
 * 
 * Esempio:
 * <ProjectSection
 *   sectionNumber="01"
 *   sectionLabel="Executive Summary"
 *   title="Il Brief"
 *   description="Abbiamo ricevuto il brief per rebranding completo..."
 *   image="/path/to/image.jpg"
 *   layout="summary"
 *   accentColor="green"
 *   metadata={[
 *     { label: "Categoria", value: "Packaging" },
 *     { label: "Focus", value: "Design" },
 *     { label: "Scope", value: "Multi-discipline" }
 *   ]}
 * />
 * 
 * ============================================
 * 
 * LAYOUT 2: "CHALLENGE" (Obiettivo/Challenge)
 * Uso: Comunicare la sfida, vincoli, problemi
 * Struttura:
 *   - Numero gigante ghost overlay (#15vw)
 *   - Titolo centrato in colonna stretta
 *   - Grid di vincoli con numerazione verde cerchiata
 *   - Immagine in basso
 * 
 * Esempio:
 * <ProjectSection
 *   sectionNumber="02"
 *   sectionLabel="Challenge"
 *   title="La Sfida"
 *   description="Comunicare la complessità del brief..."
 *   layout="challenge"
 *   accentColor="green"
 *   extras={{
 *     constraints: [
 *       "Nuovo positioning nel segmento premium",
 *       "Coerenza su 5 linee di prodotto",
 *       "Sostenibilità come valore"],
 *     ]}
 *   />
 * 
 * ============================================
 * 
 * LAYOUT 3: "CONCEPT" (Soluzione/Concept)
 * Uso: Presentare la soluzione creativa
 * Struttura:
 *   - Sfondo scuro (#1A1A1A), testo bianco
 *   - Sinistra: Immagine grande
 *   - Destra: Descrizione + steps verticali con accent magenta
 *   - CTA button
 * 
 * Esempio:
 * <ProjectSection
 *   sectionNumber="03"
 *   sectionLabel="Concept"
 *   title="La Soluzione"
 *   description="Un'identità moderna e sostenibile..."
 *   image="/path/to/image.jpg"
 *   layout="concept"
 *   accentColor="magenta"
 *   extras={{
 *     steps: [
 *       "Ricerca di mercato approfondita",
 *       "Workshop creativo interno",
 *       "Prototipazione e testing",
 *       "Refinement finale"
 *     ]
 *   }}
 * />
 * 
 * ============================================
 * 
 * LAYOUT 4: "RESULTS" (Risultati/Output)
 * Uso: Mostrare i risultati con KPI e statistiche
 * Struttura:
 *   - Header centrato
 *   - Grid 2x2 di KPI card (numero verde grande + label)
 *   - Hover: sfondo gradiente, invert
 *   - Immagine hero al centro
 *   - Quote/Testimonianza in basso
 * 
 * Esempio:
 * <ProjectSection
 *   sectionNumber="04"
 *   sectionLabel="Results"
 *   title="I Risultati"
 *   description="Il nuovo packaging ha superato le aspettative..."
 *   image="/path/to/image.jpg"
 *   layout="results"
 *   accentColor="green"
 *   extras={{
 *     kpis: [
 *       { label: "Incremento vendite", value: "+120%" },
 *       { label: "Riconoscimento", value: "5x" },
 *       { label: "Reach", value: "1.2M" },
 *       { label: "Retention", value: "89%" }
 *     ],
 *     quote: {
 *       text: "Un progetto curato nei minimi dettagli",
 *       author: "Marketing Manager Pernigotti"
 *     }
 *   }}
 * />
 * 
 * ============================================
 * 
 * LAYOUT 5: "CLOSING" (Learnings/Chiusura)
 * Uso: Conclusioni, lezioni apprese
 * Struttura:
 *   - Citazione massiccia (8vw) con parole alternate verde/magenta
 *   - Sinistra: Testo + highlights con checkmark
 *   - Destra: Blob shape SVG con immagine circolare
 *   - Bottom: Buttons Precedente/Successivo
 * 
 * Esempio:
 * <ProjectSection
 *   sectionNumber="05"
 *   sectionLabel="Learnings"
 *   title="La parte più importante: il design con anima"
 *   description="Le lezioni apprese dal progetto..."
 *   image="/path/to/image.jpg"
 *   layout="closing"
 *   accentColor="magenta"
 *   extras={{
 *     highlights: [
 *       "L'importanza della ricerca qualitativa",
 *       "Coinvolgimento stakeholder sin da subito",
 *       "Iterazione rapida e feedback costante"
 *     ],
 *     kpis: [
 *       { label: "Durata", value: "6 mesi" },
 *       { label: "Team", value: "5 persone" }
 *     ]
 *   }}
 *   onNavigate={(dir) => console.log(dir)}
 * />
 * 
 * ============================================
 * 
 * PROPS DISPONIBILI:
 * 
 * interface ProjectSectionProps {
 *   sectionNumber: string;              // "01", "02", etc.
 *   sectionLabel: string;               // "Challenge", "Results", etc.
 *   title: string;                      // Titolo principale
 *   description: string;                // Descrizione/body text
 *   image?: string;                     // URL immagine
 *   metadata?: Array<{ label, value }>; // Metadata cards (summary layout)
 *   layout: 'summary' | 'challenge' | 'concept' | 'results' | 'closing';
 *   accentColor?: 'green' | 'magenta';
 *   extras?: {
 *     constraints?: string[];           // Lista vincoli (challenge)
 *     highlights?: string[];            // Punti salienti (closing)
 *     kpis?: Array<{ label, value }>;   // KPI (results, closing)
 *     quote?: { text, author? };        // Citazione (results)
 *     steps?: string[];                 // Step vertical (concept)
 *     callToAction?: { label, href };   // Button CTA (concept)
 *   };
 *   totalSections?: number;             // Numero totale sezioni
 *   onNavigate?: (direction: 'prev' | 'next') => void;
 * }
 * 
 * ============================================
 * 
 * FEATURES:
 * 
 * ✅ 5 Layout completamente distinti
 * ✅ Animazioni Framer Motion (fade-in, slide, stagger)
 * ✅ Blob SVG organico come background
 * ✅ Numero ghost (#E8E8E8) overlay massiccia
 * ✅ Palette Pxme integrata (verde, magenta, rosa)
 * ✅ Responsive (mobile stack, desktop two-col)
 * ✅ Hover effects (KPI cards invert, buttons transition)
 * ✅ Color alternation nelle quote (closing)
 * ✅ Dark mode per concept layout
 * ✅ Fully customizable via props
 * 
 * ============================================
 * 
 * ANIMAZIONI:
 * 
 * - Ghost Number: opacity fade-in (delay 0.2s)
 * - Section Label: slide down + fade (delay 0.1s)
 * - Layout Content: staggered (delay 0.3-0.6s)
 * - KPI Cards: scale on hover
 * - Steps: line grow on step
 * - All transitions: 0.6s duration, easeInOut
 * 
 * ============================================
 * 
 * RESPONSIVE:
 * 
 * Mobile (< 768px):
 *   - Stack layouts vertical
 *   - Image circular o full-width
 *   - Ghost number responsive (clamp 80px, 15vw, 320px)
 *   - Metadata cards inline
 * 
 * Desktop (> 768px):
 *   - Two-column grids
 *   - Image circolare a destra
 *   - Ghost number massiccia
 *   - Decorative elements visible
 * 
 * ============================================
 * 
 * INTEGRAZIONE:
 * 
 * import { ProjectSection } from '@/components/ProjectSection';
 * 
 * // In una page o sezione del sito:
 * export function ProjectPage() {
 *   return (
 *     <div>
 *       <ProjectSection
 *         sectionNumber="01"
 *         sectionLabel="Executive Summary"
 *         title="..."
 *         description="..."
 *         layout="summary"
 *         accentColor="green"
 *       />
 *       <ProjectSection
 *         sectionNumber="02"
 *         sectionLabel="Challenge"
 *         title="..."
 *         description="..."
 *         layout="challenge"
 *         accentColor="green"
 *         extras={{ constraints: [...] }}
 *       />
 *       {/* ... altri layout ... */}
 *     </div>
 *   );
 * }
 */

export {};

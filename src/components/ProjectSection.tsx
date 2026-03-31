import React, { useMemo } from "react";
import { motion } from "motion/react";
import svgPaths from "../../imports/svg-53xjlwfhm8";

/**
 * ProjectSection Component - Sistema riutilizzabile di layout per case study
 * 
 * Design System Pxme:
 * - Verde: #7EB83A
 * - Magenta: #C94B8F
 * - Rosa: #D6889A
 * - Ghost number: #E8E8E8
 * - Text: #1A1A1A
 * - Background: #FFFFFF
 */

export interface ProjectSectionProps {
  /** Numero sezione es. "01", "02" */
  sectionNumber: string;
  
  /** Label differenziato es. "Challenge", "Concept", "Results" */
  sectionLabel: string;
  
  /** Titolo principale della sezione */
  title: string;
  
  /** Testo descrittivo principale */
  description: string;
  
  /** URL immagine principale (opzionale) */
  image?: string;
  
  /** Array di metadata { label, value } da visualizzare (opzionale) */
  metadata?: Array<{ label: string; value: string }>;
  
  /** Tipo di layout */
  layout: "summary" | "challenge" | "concept" | "results" | "closing";
  
  /** Colore di accento primario */
  accentColor?: "green" | "magenta";
  
  /** Dati aggiuntivi per layout specifici */
  extras?: {
    constraints?: string[];
    highlights?: string[];
    kpis?: Array<{ label: string; value: string }>;
    quote?: { text: string; author?: string };
    steps?: string[];
    callToAction?: { label: string; href: string };
  };
  
  /** Numero totale delle sezioni (opzionale, per rendering breadcrumb) */
  totalSections?: number;
  
  /** Callback per navigazione (opzionale) */
  onNavigate?: (direction: "prev" | "next") => void;
}

// Componente interno: Blob SVG decorativo
function DecorativeBlob({
  pathKey,
  position = "top-right",
  opacity = 0.15,
  color = "green",
}: {
  pathKey: keyof typeof svgPaths;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  opacity?: number;
  color?: "green" | "magenta";
}) {
  const positionClasses = {
    "top-left": "-top-32 -left-32",
    "top-right": "-top-32 -right-32",
    "bottom-left": "-bottom-32 -left-32",
    "bottom-right": "-bottom-32 -right-32",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  const fillColor = color === "green" ? "#7EB83A" : "#C94B8F";

  return (
    <div
      className={`absolute ${positionClasses[position]} w-80 h-80 pointer-events-none`}
      style={{ opacity }}
    >
      <svg viewBox="0 0 1262 1262" fill="none" preserveAspectRatio="xMidYMid slice">
        <path d={svgPaths[pathKey]} fill={fillColor} opacity={opacity} />
      </svg>
    </div>
  );
}

// Componente interno: Ghost Number Overlay
function GhostNumber({ number }: { number: string }) {
  return (
    <motion.div
      className="absolute top-0 left-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      <div
        className="font-black leading-none text-[#E8E8E8] whitespace-nowrap"
        style={{ fontSize: "clamp(80px, 15vw, 320px)" }}
      >
        {number} /
      </div>
    </motion.div>
  );
}

// Componente interno: Layout Summary
function LayoutSummary({
  title,
  description,
  image,
  metadata,
  accentColor = "green",
}: {
  title: string;
  description: string;
  image?: string;
  metadata?: Array<{ label: string; value: string }>;
  accentColor?: "green" | "magenta";
}) {
  const accentHex = accentColor === "green" ? "#7EB83A" : "#C94B8F";
  const accentHex2 = accentColor === "green" ? "#D6889A" : "#D6889A";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* LEFT: Text + Metadata */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight" style={{ color: "#1A1A1A" }}>
          {title}
        </h2>
        <p className="text-base lg:text-lg leading-relaxed mb-8" style={{ color: "#1A1A1A" }}>
          {description}
        </p>

        {/* Metadata Card */}
        {metadata && metadata.length > 0 && (
          <div
            className="p-6 rounded-lg border-2"
            style={{ borderColor: accentHex2, backgroundColor: "#FFFFFF" }}
          >
            <div className="space-y-4">
              {metadata.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: accentHex }}
                  >
                    {item.label}
                  </span>
                  <span className="text-sm font-medium" style={{ color: "#1A1A1A" }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* RIGHT: Circular Image */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex justify-center items-center"
      >
        <div className="relative w-72 h-72 lg:w-96 lg:h-96">
          <div
            className="absolute inset-0 rounded-full opacity-10"
            style={{
              background: `linear-gradient(135deg, ${accentHex}, ${accentHex2})`,
            }}
          />
          <div
            className="absolute inset-2 border-2 rounded-full opacity-40"
            style={{ borderColor: accentHex }}
          />

          {image ? (
            <img
              src={image}
              alt={title}
              className="absolute inset-4 rounded-full object-cover"
            />
          ) : (
            <div
              className="absolute inset-4 rounded-full opacity-20 flex items-center justify-center text-[#E8E8E8]"
              style={{ backgroundColor: accentHex }}
            >
              <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// Componente interno: Layout Challenge
function LayoutChallenge({
  title,
  description,
  image,
  extras,
  accentColor = "green",
}: {
  title: string;
  description: string;
  image?: string;
  extras?: ProjectSectionProps["extras"];
  accentColor?: "green" | "magenta";
}) {
  const accentHex = accentColor === "green" ? "#7EB83A" : "#C94B8F";
  const constraints = extras?.constraints || [];

  return (
    <div>
      {/* Centered text section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <div
          className="text-xs font-semibold uppercase tracking-wider mb-4"
          style={{ color: accentHex }}
        >
          {title}
        </div>
        <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight" style={{ color: "#1A1A1A" }}>
          {title}
        </h2>
        <p className="text-lg leading-relaxed opacity-90" style={{ color: "#1A1A1A" }}>
          {description}
        </p>
      </motion.div>

      {/* Constraints Grid */}
      {constraints.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16"
        >
          {constraints.map((constraint, i) => (
            <div
              key={i}
              className="relative p-6 rounded-lg border-2 bg-white hover:opacity-90 transition-opacity"
              style={{ borderColor: accentHex }}
            >
              <div
                className="absolute -top-4 -left-4 w-10 h-10 rounded-full font-black text-lg flex items-center justify-center text-white"
                style={{ backgroundColor: accentHex }}
              >
                {i + 1}
              </div>
              <p className="text-sm leading-relaxed pl-2" style={{ color: "#1A1A1A" }}>
                {constraint}
              </p>
            </div>
          ))}
        </motion.div>
      )}

      {/* Decorative image area */}
      {image && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12"
        >
          <div className="aspect-video bg-gradient-to-r rounded-2xl overflow-hidden" style={{
            backgroundImage: `linear-gradient(135deg, ${accentHex}, #D6889A)`,
          }}>
            <img src={image} alt={title} className="w-full h-full object-cover opacity-80" />
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Componente interno: Layout Concept (Dark background)
function LayoutConcept({
  title,
  description,
  image,
  extras,
  accentColor = "magenta",
}: {
  title: string;
  description: string;
  image?: string;
  extras?: ProjectSectionProps["extras"];
  accentColor?: "green" | "magenta";
}) {
  const accentHex = accentColor === "green" ? "#7EB83A" : "#C94B8F";
  const steps = extras?.steps || [];

  return (
    <div className="bg-[#1A1A1A] text-white rounded-xl p-8 lg:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-8"
      >
        <div
          className="text-xs font-semibold uppercase tracking-wider mb-4"
          style={{ color: accentHex }}
        >
          Soluzione
        </div>
        <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight text-white">
          {title}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* LEFT: Image */}
        {image && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br rounded-2xl overflow-hidden" style={{
              backgroundImage: `linear-gradient(135deg, ${accentHex}, #D6889A)`,
            }}>
              <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>
            <div
              className="absolute -bottom-4 -right-4 w-20 h-20 border-r-4 border-b-4 rounded-br-2xl"
              style={{ borderColor: accentHex }}
            />
          </motion.div>
        )}

        {/* RIGHT: Description + Steps */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-lg leading-relaxed mb-8 opacity-90 text-white">
            {description}
          </p>

          {/* Steps */}
          {steps.length > 0 && (
            <div className="space-y-4">
              {steps.slice(0, 4).map((step, i) => (
                <div key={i} className="flex gap-4 items-start group cursor-pointer">
                  <div className="flex flex-col items-center pt-1 flex-shrink-0">
                    <div
                      className="w-3 h-3 rounded-full group-hover:scale-150 transition-transform"
                      style={{ backgroundColor: accentHex }}
                    />
                    {i < steps.length - 1 && (
                      <div className="w-0.5 h-8 mt-1 opacity-30" style={{ backgroundColor: accentHex }} />
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-white">{step}</p>
                </div>
              ))}
            </div>
          )}

          {/* CTA Button */}
          <button
            className="mt-8 px-8 py-3 border-2 font-semibold uppercase text-xs rounded transition-all hover:opacity-80"
            style={{
              borderColor: accentHex,
              color: accentHex,
            }}
          >
            Scopri dettagli →
          </button>
        </motion.div>
      </div>
    </div>
  );
}

// Componente interno: Layout Results (KPI Grid)
function LayoutResults({
  title,
  description,
  image,
  extras,
  accentColor = "green",
}: {
  title: string;
  description: string;
  image?: string;
  extras?: ProjectSectionProps["extras"];
  accentColor?: "green" | "magenta";
}) {
  const accentHex = accentColor === "green" ? "#7EB83A" : "#C94B8F";
  const kpis = extras?.kpis || [];

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center mb-16"
      >
        <div
          className="text-xs font-semibold uppercase tracking-wider mb-4"
          style={{ color: accentHex }}
        >
          Risultati
        </div>
        <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight" style={{ color: "#1A1A1A" }}>
          {title}
        </h2>
        <p className="text-lg opacity-80 max-w-2xl mx-auto" style={{ color: "#1A1A1A" }}>
          {description}
        </p>
      </motion.div>

      {/* KPI Grid 2x2 */}
      {kpis.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {kpis.slice(0, 4).map((kpi, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-xl border-2 bg-white hover:opacity-90 transition-all cursor-pointer"
              style={{
                borderColor: "#E8E8E8",
                backgroundColor: "#F5F5F5",
              }}
            >
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{
                backgroundImage: `linear-gradient(135deg, ${accentHex}, #D6889A)`,
              }} />

              <div className="relative z-10">
                <div className="text-5xl font-black mb-3" style={{ color: accentHex }}>
                  {kpi.value}
                </div>
                <div
                  className="text-sm font-medium uppercase tracking-wider opacity-80"
                  style={{ color: "#1A1A1A" }}
                >
                  {kpi.label}
                </div>
              </div>

              <div
                className="absolute bottom-0 right-0 w-12 h-12 border-t-2 border-l-2 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ borderColor: "#C94B8F" }}
              />
            </div>
          ))}
        </motion.div>
      )}

      {/* Central Image */}
      {image && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative mb-12"
        >
          <div className="aspect-video bg-gradient-to-r rounded-2xl overflow-hidden" style={{
            backgroundImage: `linear-gradient(to right, ${accentHex}, #C94B8F)`,
          }}>
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>

          {/* Decorative elements */}
          <div
            className="absolute -bottom-8 -right-8 w-24 h-24 border-4 rounded-full opacity-20 hidden lg:block"
            style={{ borderColor: accentHex }}
          />
          <div
            className="absolute -top-6 -left-6 w-20 h-20 border-4 rounded-full opacity-20 hidden lg:block"
            style={{ borderColor: "#C94B8F" }}
          />
        </motion.div>
      )}

      {/* Quote */}
      {extras?.quote && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center p-8 rounded-lg"
          style={{
            backgroundColor: "#F5F5F5",
            borderLeftWidth: 4,
            borderLeftColor: "#C94B8F",
          }}
        >
          <p className="text-lg font-medium italic" style={{ color: "#1A1A1A" }}>
            "{extras.quote.text}"
          </p>
          {extras.quote.author && (
            <p className="text-sm font-semibold mt-4" style={{ color: "#C94B8F" }}>
              — {extras.quote.author}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}

// Componente interno: Layout Closing (Massive alternating quote)
function LayoutClosing({
  title,
  description,
  image,
  extras,
  accentColor = "magenta",
}: {
  title: string;
  description: string;
  image?: string;
  extras?: ProjectSectionProps["extras"];
  accentColor?: "green" | "magenta";
}) {
  const accentHex = accentColor === "green" ? "#7EB83A" : "#C94B8F";
  const accentHex2 = accentColor === "green" ? "#C94B8F" : "#7EB83A";
  
  const words = description.split(" ");

  return (
    <div>
      {/* MASSIVE ALTERNATING QUOTE */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center mb-20"
      >
        <h2 className="font-black leading-tight mb-12" style={{ fontSize: "clamp(36px, 8vw, 96px)" }}>
          {words.map((word, i) => (
            <span key={i}>
              <span
                className="inline-block mr-3 transition-colors"
                style={{ color: i % 2 === 0 ? accentHex : accentHex2 }}
              >
                {word}
              </span>
            </span>
          ))}
        </h2>
      </motion.div>

      {/* Two Column Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* LEFT: Text + Highlights */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-base leading-relaxed mb-8 opacity-80" style={{ color: "#1A1A1A" }}>
            {title}
          </p>

          {/* Key takeaways */}
          {extras?.highlights && extras.highlights.length > 0 && (
            <div className="space-y-3 mb-8">
              {extras.highlights.slice(0, 3).map((highlight, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 text-white"
                    style={{ backgroundColor: accentHex }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm leading-relaxed" style={{ color: "#1A1A1A" }}>
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Metadata footer */}
          {extras?.kpis && extras.kpis.length > 0 && (
            <div className="pt-6 border-t" style={{ borderColor: "#E8E8E8" }}>
              <div className="grid grid-cols-2 gap-4 text-xs">
                {extras.kpis.slice(0, 2).map((kpi, i) => (
                  <div key={i}>
                    <span className="font-semibold uppercase" style={{ color: accentHex }}>
                      {kpi.label}
                    </span>
                    <p className="mt-1 font-medium" style={{ color: "#1A1A1A" }}>
                      {kpi.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* RIGHT: Blob Image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex justify-center items-center"
        >
          <div className="relative w-80 h-80">
            {/* Blob-shaped container */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1262 1262"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
            >
              <path d={svgPaths.p20d0c00} fill={accentHex} opacity="0.15" />
              <path
                d={svgPaths.p20d0c00}
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                opacity="0.4"
                style={{ stroke: accentHex2 }}
              />
            </svg>

            {/* Image inside blob */}
            <div className="absolute inset-8 flex items-center justify-center">
              {image ? (
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div
                  className="w-full h-full rounded-full flex items-center justify-center opacity-40 text-white"
                  style={{ backgroundColor: accentHex }}
                >
                  <svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-center mt-20 pt-12"
        style={{ borderTopWidth: 1, borderTopColor: "#E8E8E8" }}
      >
        <p className="text-sm opacity-60 mb-4" style={{ color: "#1A1A1A" }}>
          Scopri altri dettagli del progetto
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            className="px-6 py-3 border-2 font-semibold uppercase text-xs rounded hover:opacity-80 transition-all"
            style={{ borderColor: accentHex, color: accentHex }}
            onClick={() => {}}
          >
            Precedente
          </button>
          <button
            className="px-6 py-3 border-2 font-semibold uppercase text-xs rounded hover:opacity-80 transition-all"
            style={{ borderColor: accentHex2, color: accentHex2 }}
            onClick={() => {}}
          >
            Successivo
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Componente principale: ProjectSection
 * 
 * Uso:
 * <ProjectSection
 *   sectionNumber="01"
 *   sectionLabel="Challenge"
 *   title="La sfida"
 *   description="Descrizione della sfida..."
 *   layout="challenge"
 *   accentColor="green"
 *   metadata={[{ label: "Focus", value: "Design" }]}
 *   extras={{ constraints: ["Vincolo 1", "Vincolo 2"] }}
 * />
 */
export function ProjectSection({
  sectionNumber,
  sectionLabel,
  title,
  description,
  image,
  metadata,
  layout,
  accentColor = "green",
  extras,
  totalSections,
  onNavigate,
}: ProjectSectionProps) {
  
  // Seleziona il path SVG dinamicamente
  const blobPathKeys = useMemo(
    () => ["p34105380", "p20d0c00", "p35cefec0"] as const,
    []
  );
  
  const selectedBlobKey = useMemo(
    () => blobPathKeys[Math.floor(Math.random() * blobPathKeys.length)],
    []
  );

  // Renderizza il layout appropriato
  const renderLayout = () => {
    switch (layout) {
      case "summary":
        return (
          <LayoutSummary
            title={title}
            description={description}
            image={image}
            metadata={metadata}
            accentColor={accentColor}
          />
        );
      case "challenge":
        return (
          <LayoutChallenge
            title={title}
            description={description}
            image={image}
            extras={extras}
            accentColor={accentColor}
          />
        );
      case "concept":
        return (
          <LayoutConcept
            title={title}
            description={description}
            image={image}
            extras={extras}
            accentColor={accentColor}
          />
        );
      case "results":
        return (
          <LayoutResults
            title={title}
            description={description}
            image={image}
            extras={extras}
            accentColor={accentColor}
          />
        );
      case "closing":
        return (
          <LayoutClosing
            title={title}
            description={description}
            image={image}
            extras={extras}
            accentColor={accentColor}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.section
      className="relative w-full min-h-screen bg-white overflow-hidden py-16 lg:py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Blob */}
      <DecorativeBlob
        pathKey={selectedBlobKey}
        position="top-right"
        opacity={0.15}
        color={accentColor}
      />

      {/* Ghost Number */}
      <GhostNumber number={sectionNumber} />

      {/* Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-wider mb-12"
          style={{
            color: accentColor === "green" ? "#7EB83A" : "#C94B8F",
          }}
        >
          {sectionLabel}
        </motion.div>

        {/* Layout Content */}
        {renderLayout()}
      </div>
    </motion.section>
  );
}

export default ProjectSection;

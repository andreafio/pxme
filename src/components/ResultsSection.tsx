import React, { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "motion/react";
import svgPaths from "../imports/svg-53xjlwfhm8";

// ─── Tipi ─────────────────────────────────────────────────────────────────────

export interface KpiItem {
  valore: string;
  label: string;
  icon?: string;
}

export interface ResultsSectionProps {
  /** Valore hero grande es. "+340%" */
  heroValue?: string;
  /** Label sotto il valore hero */
  heroLabel?: string;
  /** Array di KPI card */
  kpis: KpiItem[];
  /** Titolo opzionale della sezione */
  title?: string;
  /** Numero sezione es. "04" */
  sectionNumber?: string;
  /** Colore accento hero: "green" (default) | "magenta" */
  heroAccent?: "green" | "magenta";
}

// ─── Utility: parsing del valore numerico ─────────────────────────────────────

interface ParsedValue {
  prefix: string;
  number: number | null;
  suffix: string;
}

function parseValue(val: string): ParsedValue {
  // Cattura: prefisso opzionale (+/-), cifre, suffisso
  // Es: "+340%" -> { prefix: "+", number: 340, suffix: "%" }
  // Es: "8 mesi" -> { prefix: "", number: 8, suffix: " mesi" }
  // Es: "2x"    -> { prefix: "", number: 2, suffix: "x" }
  const match = val.match(/^([+\-]?)(\d+(?:\.\d+)?)(.*)$/);
  if (match && match[2]) {
    return {
      prefix: match[1] || "",
      number: parseFloat(match[2]),
      suffix: match[3] || "",
    };
  }
  return { prefix: "", number: null, suffix: val };
}

// ─── BlobBackground (per le KPI card in hover) ────────────────────────────────

const BLOB_PATHS: Array<keyof typeof svgPaths> = [
  "p20d0c00",
  "p1eb355f0",
  "p3b7b5b80",
  "p35cefec0",
];

// ─── KpiCard ──────────────────────────────────────────────────────────────────

function KpiCardImpl({
  item,
  index,
  active,
}: {
  item: KpiItem;
  index: number;
  active: boolean;
}) {
  const isGreen = index % 2 === 0;
  const accentColor = isGreen ? "#7EB83A" : "#C94B8F";
  const [hovered, setHovered] = useState(false);
  const parsed = parseValue(item.valore);
  const [displayNum, setDisplayNum] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || parsed.number === null || startedRef.current) return;
    startedRef.current = true;
    const t = setTimeout(() => {
      const controls = animate(0, parsed.number!, {
        duration: 1.6,
        ease: "easeOut",
        onUpdate: (v) => setDisplayNum(Math.round(v)),
      });
      return () => controls.stop();
    }, index * 100);
    return () => clearTimeout(t);
  }, [active]);

  const displayValue =
    parsed.number !== null
      ? `${parsed.prefix}${displayNum}${parsed.suffix}`
      : item.valore;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative bg-white rounded-2xl overflow-hidden cursor-default select-none"
      style={{
        border: `1.5px solid ${hovered ? accentColor : "#E8E8E8"}`,
        boxShadow: hovered
          ? `0 8px 32px 0 ${accentColor}22`
          : "0 2px 12px 0 rgba(0,0,0,0.06)",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        padding: "2rem",
      }}
    >
      {/* Blob SVG in background */}
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 0.05 : 0 }}
        transition={{ duration: 0.35 }}
        aria-hidden
      >
        <svg
          className="absolute -bottom-8 -right-8 w-56 h-56"
          viewBox="0 0 1000 1000"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d={svgPaths[BLOB_PATHS[index % BLOB_PATHS.length]]}
            fill={accentColor}
          />
        </svg>
      </motion.div>

      {/* Icon */}
      {item.icon && (
        <div className="text-2xl mb-4 relative z-10">{item.icon}</div>
      )}

      {/* Valore */}
      <div
        className="text-5xl font-black leading-none relative z-10 mb-2"
        style={{ color: accentColor }}
      >
        {displayValue}
      </div>

      {/* Label */}
      <p className="text-xs font-semibold uppercase tracking-widest text-[#7A7A7A] relative z-10 mt-2 leading-snug">
        {item.label}
      </p>

      {/* Bottom bar animata */}
      <motion.div
        className="absolute bottom-0 left-0 h-[3px] rounded-full"
        style={{ backgroundColor: accentColor }}
        initial={{ width: "0%" }}
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
    </motion.div>
  );
}

// ─── ResultsSection ───────────────────────────────────────────────────────────

export function ResultsSection({
  heroValue,
  heroLabel = "Risultato principale",
  kpis,
  title,
  sectionNumber,
  heroAccent = "green",
}: ResultsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const heroColor = heroAccent === "green" ? "#7EB83A" : "#C94B8F";

  // Griglia: 4 item → 2x2, altrimenti 3 colonne
  const gridCols =
    kpis.length <= 4
      ? "grid-cols-2"
      : "grid-cols-2 md:grid-cols-3";

  // Counter per hero value
  const heroParsed = heroValue ? parseValue(heroValue) : null;
  const [heroDisplay, setHeroDisplay] = useState(0);
  const heroStarted = useRef(false);

  useEffect(() => {
    if (!inView || !heroParsed || heroParsed.number === null || heroStarted.current) return;
    heroStarted.current = true;
    const controls = animate(0, heroParsed.number, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setHeroDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView]);

  const heroDisplay_str = heroParsed?.number !== null && heroValue
    ? `${heroParsed!.prefix}${heroDisplay}${heroParsed!.suffix}`
    : heroValue;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white overflow-hidden py-20 px-6 md:px-12 lg:px-20"
    >
      {/* Background blob decorativo */}
      <div
        className="absolute -top-32 -right-32 w-[480px] h-[480px] opacity-[0.07] pointer-events-none"
        aria-hidden
      >
        <svg viewBox="0 0 1262 1262" fill="none" preserveAspectRatio="xMidYMid slice">
          <path d={svgPaths.p34105380} fill="#7EB83A" />
        </svg>
      </div>
      <div
        className="absolute -bottom-24 -left-24 w-[320px] h-[320px] opacity-[0.05] pointer-events-none"
        aria-hidden
      >
        <svg viewBox="0 0 1262 1262" fill="none" preserveAspectRatio="xMidYMid slice">
          <path d={svgPaths.p34105380} fill="#C94B8F" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Label sezione */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          {sectionNumber && (
            <span className="text-xs font-black tracking-[0.2em] text-[#E8E8E8]">
              {sectionNumber}
            </span>
          )}
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C94B8F]">
            Risultati
          </span>
          <div className="flex-1 h-px bg-[#E8E8E8]" />
        </motion.div>

        {/* Titolo opzionale */}
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl lg:text-5xl font-black text-[#1A1A1A] leading-tight mb-14 max-w-2xl"
          >
            {title}
          </motion.h2>
        )}

        {/* HERO NUMBER */}
        {heroValue && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 text-center lg:text-left"
          >
            <div
              className="font-black leading-none"
              style={{
                fontSize: "clamp(5rem, 16vw, 12rem)",
                color: heroColor,
                letterSpacing: "-0.03em",
                lineHeight: 0.9,
              }}
            >
              {heroDisplay_str}
            </div>
            <p className="text-base font-medium text-[#9A9A9A] mt-4 uppercase tracking-widest">
              {heroLabel}
            </p>
          </motion.div>
        )}

        {/* KPI GRID */}
        <div className={`grid ${gridCols} gap-5 lg:gap-6`}>
          {kpis.map((kpi, i) => (
            <KpiCardImpl key={i} item={kpi} index={i} active={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ResultsSection;

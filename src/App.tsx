import { useState, useEffect, useMemo, type ChangeEvent, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "./imports/svg-53xjlwfhm8";
import imgLogoPxme1RemovebgPreview1 from "figma:asset/6a675323d9240b366f4179dd86927cbd63e012a9.png";
import imgEllipse6 from "figma:asset/0dbe7327a1bc1513d7647c295c4c604c864397d2.png";
import imgEllipse4 from "figma:asset/7fa13a594a8b2c9fe104df3624d3e796b2311c01.png";
import imgEllipse7 from "figma:asset/a328796418d2639bd6edd07e60315aef07caa296.png";

// --- CONFIGURAZIONE SEZIONI ---
const SECTIONS = ["mission", "chi-siamo", "servizi", "progetti", "contattaci"] as const;
type SectionId = (typeof SECTIONS)[number];

const CHI_SIAMO_SLIDES = [
  {
    id: 0,
    text: `Diamo voce al tuo marchio con anima e tecnica: strategia, identità visiva, storytelling e coerenza comunicativa diventano un'unica esperienza distintiva.`,
    highlight: `Noi non "facciamo loghi", creiamo brand capaci di risuonare dentro, di conquistare uno spazio nel cuore delle persone e nella mente del mercato.`
  },
  {
    id: 1,
    text: `Ogni progetto è un viaggio condiviso. Ascoltiamo la tua storia, analizziamo il tuo mercato e traduciamo i tuoi valori in un linguaggio visivo potente e riconoscibile.`,
    highlight: `Il design non è solo estetica, è la sintesi perfetta tra forma e funzione, pensata per durare nel tempo ed evolvere con il tuo business.`
  },
  {
    id: 2,
    text: `Dalla carta al digitale, costruiamo ecosistemi di brand coerenti. Che si tratti di packaging, web design o campagne advertising, il nostro approccio rimane sartoriale.`,
    highlight: `Perché un brand forte non deve solo farsi notare, deve farsi ricordare e scegliere, oggi e domani.`
  }
];

const SERVIZI_ITEMS = ["Brand", "Corporate identity", "Packaging", "BTL & ATL", "Web"];

const FEATURED_PROJECTS = [
  {
    id: "pernigotti",
    countLabel: "3/83",
    title: "Pernigotti",
    category: "Packaging",
    feedbackQuote: "Il nuovo packaging comunica perfettamente la qualità e la tradizione Pernigotti, risultando distintivo e moderno. Un progetto curato nei minimi dettagli, in perfetta sintonia con i valori del nostro brand!",
    feedbackAuthor: "— XXXX XXX | Marketing Manager Pernigotti",
  },
  {
    id: "unicredit",
    countLabel: "22/83",
    title: "Unicredit",
    category: "BTL & ATL",
    feedbackQuote: "Il concept di campagna ha valorizzato il tono del brand con una presenza forte, riconoscibile e coerente su tutti i touchpoint di comunicazione.",
    feedbackAuthor: "— XXXX XXX | Marketing Manager Unicredit",
  },
  {
    id: "sauber-pharma",
    countLabel: "37/83",
    title: "Sauber Pharma",
    category: "Packaging",
    feedbackQuote: "Un progetto solido e pulito, capace di rendere immediata la lettura dell'offerta e di dare maggiore autorevolezza all'intera linea prodotto.",
    feedbackAuthor: "— XXXX XXX | Brand Manager Sauber Pharma",
  },
  {
    id: "suaviter",
    countLabel: "41/83",
    title: "Suaviter",
    category: "Packaging",
    feedbackQuote: "Il nuovo sistema visivo ha migliorato l'impatto a scaffale e rafforzato il posizionamento del marchio con una cifra estetica chiara e memorabile.",
    feedbackAuthor: "— XXXX XXX | Marketing Manager Suaviter",
  },
  {
    id: "piero-trentini",
    countLabel: "58/83",
    title: "Piero Trentini",
    category: "BTL & ATL",
    feedbackQuote: "Dalla direzione creativa alla declinazione dei materiali, tutto il progetto è stato sviluppato con precisione e una forte coerenza narrativa.",
    feedbackAuthor: "— XXXX XXX | Marketing Manager Piero Trentini",
  },
] as const;

const PROJECT_LIST_CATEGORIES = [
  {
    label: "Packaging",
    items: [
      { id: "pernigotti", label: "Pernigotti", featuredIndex: 0 },
      { id: "sauber-pharma", label: "Sauber Pharma", featuredIndex: 2 },
      { id: "suaviter", label: "Suaviter", featuredIndex: 3 },
    ],
  },
  {
    label: "Brand",
    items: [
      { id: "liabel", label: "Liabel" },
      { id: "gotha-cosmetic", label: "Gotha Cosmetic" },
      { id: "filo-alfa", label: "Filo Alfa" },
    ],
  },
  {
    label: "BTL & ATL",
    items: [
      { id: "unicredit", label: "Unicredit", featuredIndex: 1 },
      { id: "sauber-pharma-btl", label: "Sauber Pharma" },
      { id: "piero-trentini", label: "Piero Trentini", featuredIndex: 4 },
    ],
  },
  {
    label: "EVENTS",
    items: [
      { id: "andrea-pieralli", label: "Andrea Pieralli" },
      { id: "italiana-assicurazioni", label: "Italiana Assicurazioni" },
      { id: "nissan", label: "Nissan" },
    ],
  },
] as const;

const SECTION_COUNTS: Record<SectionId, number> = {
  "mission": 1,
  "chi-siamo": 3,
  "servizi": SERVIZI_ITEMS.length,
  "progetti": FEATURED_PROJECTS.length,
  "contattaci": 1
};

const getSectionSlideCount = (section: SectionId) => SECTION_COUNTS[section];

type ContactFormState = {
  needs: string[];
  goal: string;
  budget: string;
  timeline: string;
  brief: string;
  fullName: string;
  company: string;
  phone: string;
  email: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
};

const CONTACT_STEPS = ["Bisogni", "Progetto", "Dati"];
const CONTACT_NEEDS = ["Branding", "Sviluppo Web", "App Mobile", "Digital Marketing", "SEO", "E-commerce"];

const INITIAL_CONTACT_FORM: ContactFormState = {
  needs: [],
  goal: "",
  budget: "",
  timeline: "",
  brief: "",
  fullName: "",
  company: "",
  phone: "",
  email: "",
  privacyConsent: false,
  marketingConsent: false,
};

// --- UTILS ---
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

// --- BACKGROUND COMPONENTS ---

function BackgroundVisuals({ activeSection, subIndex }: { activeSection: string; subIndex: number }) {
  const allRings = [svgPaths.p35cefec0, svgPaths.p123eec00, svgPaths.p20d0c00, svgPaths.p34105380];
  
  // Usiamo solo i 2 anelli più grandi (indici 2 e 3)
  const targetRings = [allRings[2], allRings[3]];

  // Assegniamo casualmente un anello specifico a ciascuna sezione
  const sectionRingMap = useMemo(() => {
    const getRandomRing = () => targetRings[Math.floor(Math.random() * targetRings.length)];
    return {
      "chi-siamo": getRandomRing(),
      "servizi": getRandomRing(),
      "progetti": getRandomRing(),
    };
  }, []);

  const currentFillPath = sectionRingMap[activeSection as keyof typeof sectionRingMap] || targetRings[2];
  
  // Pattern ID dinamico per i servizi basato su subIndex
  const getPatternId = () => {
    if (activeSection === "servizi") {
      return `pattern-servizi-${subIndex}`;
    }
    return `pattern-${activeSection}`;
  };

  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] lg:left-auto lg:right-[15vw] lg:w-[946px] lg:h-[946px] lg:translate-x-0 pointer-events-none z-0 transition-all duration-500">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1262 1262" fill="none">
        <defs>
          {/* 
             Ripristino configurazione originale userSpaceOnUse.
             Le immagini sono definite globalmente (1262x1262) e ruotate intorno al centro (631, 631).
             L'anello funge da maschera/finestra fissa su questa immagine statica.
          */}
          <pattern id="pattern-chi-siamo" patternUnits="userSpaceOnUse" width="1262" height="1262">
            <image 
              href={imgEllipse6} 
              x="0" y="0" width="1262" height="1262" 
              preserveAspectRatio="xMidYMid slice"
              transform="rotate(321.358, 631, 631)" 
            />
          </pattern>

          {/* Pattern multipli per i servizi */}
          <pattern id="pattern-servizi-0" patternUnits="userSpaceOnUse" width="1262" height="1262">
            <image 
              href={imgEllipse4} 
              x="0" y="0" width="1262" height="1262"
              preserveAspectRatio="xMidYMid slice"
              transform="rotate(5.589, 631, 631)" 
            />
          </pattern>

          <pattern id="pattern-servizi-1" patternUnits="userSpaceOnUse" width="1262" height="1262">
            <image 
              href={imgEllipse6} 
              x="0" y="0" width="1262" height="1262"
              preserveAspectRatio="xMidYMid slice"
              transform="rotate(45, 631, 631)" 
            />
          </pattern>

          <pattern id="pattern-servizi-2" patternUnits="userSpaceOnUse" width="1262" height="1262">
            <image 
              href={imgEllipse7} 
              x="0" y="0" width="1262" height="1262"
              preserveAspectRatio="xMidYMid slice"
              transform="rotate(90, 631, 631)" 
            />
          </pattern>

          <pattern id="pattern-servizi-3" patternUnits="userSpaceOnUse" width="1262" height="1262">
            <image 
              href={imgEllipse4} 
              x="0" y="0" width="1262" height="1262"
              preserveAspectRatio="xMidYMid slice"
              transform="rotate(180, 631, 631)" 
            />
          </pattern>

          <pattern id="pattern-servizi-4" patternUnits="userSpaceOnUse" width="1262" height="1262">
            <image 
              href={imgEllipse6} 
              x="0" y="0" width="1262" height="1262"
              preserveAspectRatio="xMidYMid slice"
              transform="rotate(270, 631, 631)" 
            />
          </pattern>

          <pattern id="pattern-progetti" patternUnits="userSpaceOnUse" width="1262" height="1262">
            <image 
              href={imgEllipse7} 
              x="0" y="0" width="1262" height="1262"
              preserveAspectRatio="xMidYMid slice"
              transform="rotate(321.358, 631, 631)" 
            />
          </pattern>
        </defs>

        {/* Anello con Fill (Immagine mascherata dalla forma dell'anello) */}
        <AnimatePresence mode="wait">
          {activeSection !== "mission" && activeSection !== "contattaci" && (
             <motion.path
               key={`fill-${activeSection}-${activeSection === "servizi" ? subIndex : 0}`}
               d={currentFillPath}
               fill={`url(#${getPatternId()})`}
               stroke="none"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1.05 }}
               transition={{ duration: 0.6, ease: "easeInOut" }}
             />
          )}
        </AnimatePresence>

        {/* Onde (Stroke Rings) */}
        <g id="Group 4">
          {[
            { d: allRings[0], w: 5.63, maxW: 9, delay: 0 },
            { d: allRings[1], w: 9.56, maxW: 13, delay: 0.6 },
            { d: allRings[2], w: 13.53, maxW: 17, delay: 1.2 },
            { d: allRings[3], w: 20.2, maxW: 25, delay: 1.8 },
          ].map((path, i) => (
            <motion.path
              key={i}
              d={path.d}
              fill="none" 
              stroke="var(--stroke-0, #D9D9D9)"
              initial={{ strokeOpacity: 0.1, strokeWidth: path.w }}
              animate={{
                strokeOpacity: [0.1, 0.5, 0.1],
                strokeWidth: [path.w, path.maxW, path.w],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: path.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

// --- DYNAMIC HEADER / LOGO COMPONENT ---
// Gestisce la transizione del Logo da "Hero" a "Sidebar con Statistiche"
function DynamicHeader({ activeSection, children }: { activeSection: string; children?: React.ReactNode }) {
  const isMission = activeSection === "mission";
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Responsive measurements
  const logoWidth = isDesktop 
    ? (isMission ? "240px" : "161.65px") 
    : (isMission ? "180px" : "120px");
    
  const logoHeight = isDesktop
    ? (isMission ? "89px" : "59.87px")
    : (isMission ? "66px" : "44px");

  const containerLeft = isDesktop ? "200px" : "20px";
  const containerTop = isDesktop ? "50px" : "20px";

  return (
    <div className="fixed left-0 top-0 bottom-0 z-40 pointer-events-none w-full">
       {/* Contenitore che si sposta */}
      <motion.div
        className="absolute max-w-none"
        initial={false}
        animate={{
          left: containerLeft, 
          top: containerTop,
          translateX: "0%",
        }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      >
        {/* RIGA PRINCIPALE: Logo + Breadcrumb + Menu Mobile */}
        <div className="relative flex flex-row items-center gap-4 md:gap-12"> 
          {/* LOGO */}
          <motion.div
            animate={{
              width: logoWidth,
              height: logoHeight,
            }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="relative shrink-0"
          >
            <img
              alt="Logo"
              className="w-full h-full object-contain"
              src={imgLogoPxme1RemovebgPreview1}
            />
          </motion.div>

          {/* BREADCRUMB: "10 ANNI" e statistiche */}
          <div className="flex flex-col items-start overflow-visible">
             <AnimatePresence>
                {!isMission && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col justify-start whitespace-nowrap"
                  >
                      <div className="font-['Inter:Regular',sans-serif] font-normal text-[14px] md:text-[27px] leading-tight">
                        <p className="text-[#101010] m-0">
                            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-l from-[#de5ca1] to-[#76b729]">10 </span>
                            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-l from-[#de5ca1] to-[#76b729]">anni</span>
                            <span className="hidden md:inline"> di attività</span>
                        </p>
                      </div>
                      {activeSection !== "chi-siamo" && isDesktop && ( 
                          <div className="font-['Inter:Regular',sans-serif] text-[27px] leading-tight mt-1"> 
                             {activeSection === "servizi" && (
                                <p className="m-0">
                                    <span className="font-bold bg-clip-text text-transparent bg-gradient-to-l from-[#de5ca1] to-[#76b729]">+2000 ore</span>
                                    <span className="text-[#d9d9d9]"> </span>
                                    <span className="text-[#101010]">di analisi</span>
                                </p>
                             )}
                             {activeSection === "progetti" && (
                                <p className="m-0">
                                    <span className="font-bold bg-clip-text text-transparent bg-gradient-to-l from-[#de5ca1] to-[#76b729]">+80 progetti</span>
                                    <span className="text-[#d9d9d9]"> </span>
                                    <span className="text-[#101010]">di successo</span>
                                </p>
                             )}
                          </div>
                      )}
                  </motion.div>
                )}
             </AnimatePresence>
          </div>

          {/* MENU MOBILE: Burger + Voce Attiva */}
          {!isDesktop && children}
        </div>
        
        {/* "Il brief prende forma!" Slogan - sotto la riga principale */}
        {!isMission && (
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="relative mt-2 bg-clip-text bg-gradient-to-l font-['Inter:Black',sans-serif] font-black from-[#de5ca1] leading-[normal] text-[24px] md:text-[33px] to-[#76b729] text-transparent w-full md:w-[500px]" 
            >
                Il brief prende forma!
            </motion.p>
        )}
      </motion.div>
    </div>
  );
}

// --- NAVIGATION ---
function Navigation({ activeSection, onNavigate, mobileEmbed, desktopOnly }: { activeSection: string; onNavigate: (id: string) => void; mobileEmbed?: boolean; desktopOnly?: boolean }) {
  // TUTTI gli hook PRIMA di qualsiasi return condizionale
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  // DOPO gli hook: logica condizionale per il rendering
  if (desktopOnly && isMobile) return null;
  if (mobileEmbed && !isMobile) return null;

  const navItems = [
    { id: "mission", label: "Mission" },
    { id: "chi-siamo", label: "Chi siamo" },
    { id: "servizi", label: "Servizi" },
    { id: "progetti", label: "Progetti" },
    { id: "contattaci", label: "CONTATTACI", isContact: true },
  ];

  const activeItem = navItems.find((item) => item.id === activeSection) || navItems[0];

  const handleMobileNavigate = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  if (isMobile && !mobileEmbed) {
    // Non mostrare nulla: la versione mobile ora è gestita come children del logo
    return null;
  }

  if (isMobile && mobileEmbed) {
    // ...tutto il blocco mobile menu, ma senza fixed/absolute...
    // Sostituisci:
    // <div className="fixed pointer-events-auto" ... >
    // con:
    return (
      <div className="flex flex-row items-center gap-3 pointer-events-auto mt-2">
        {/* ...resto invariato, dal p label in poi... */}
        <div className="flex flex-col items-end" style={{ alignItems: "flex-end" }}>
          <p
            className={`font-['Inter:Black',sans-serif] font-black text-right ${
              activeItem.isContact
                ? "text-[#d9609b]"
                : "text-transparent bg-clip-text bg-gradient-to-l from-[#de5ca1] to-[#76b729]"
            }`}
            style={{ fontSize: 20, lineHeight: 1 }}
          >
            {activeItem.label}
          </p>
          {!activeItem.isContact && (
            <div style={{ width: 62, height: 12, marginTop: -2 }}>
              <svg className="block size-full" fill="none" viewBox="0 0 77 19">
                <line stroke="url(#paint_nav_active_mobile)" strokeWidth="19" x2="77" y1="9.5" y2="9.5" />
                <defs>
                  <linearGradient id="paint_nav_active_mobile" x1="77" x2="0" y1="19.5" y2="19.5">
                    <stop stopColor="#DE5CA1" />
                    <stop offset="1" stopColor="#76B729" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}
        </div>
        {/* ...burger button come prima... */}
        <motion.button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex items-center justify-center"
          style={{ width: 42, height: 42, padding: 0, border: "none", background: "none", cursor: "pointer" }}
          aria-label={isMenuOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={isMenuOpen}
        >
          <div style={{ width: 20, height: 20, position: "relative" }}>
            <AnimatePresence mode="wait">
              {!isMenuOpen ? (
                <motion.svg
                  key="burger"
                  width="20"
                  height="10"
                  viewBox="0 0 20 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ opacity: 0, rotate: -20 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ position: "absolute", inset: 0 }}
                >
                  <path d="M0 0.840088H20" stroke="url(#paint0_burger)" strokeWidth="1.68" />
                  <path d="M0 4.67993H20" stroke="url(#paint1_burger)" strokeWidth="1.68" />
                  <path d="M0 8.67993H20" stroke="url(#paint2_burger)" strokeWidth="1.68" />
                  <defs>
                    <linearGradient id="paint0_burger" x1="20" y1="1.34009" x2="0" y2="1.34009" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#DE5CA1" />
                      <stop offset="1" stopColor="#76B729" />
                    </linearGradient>
                    <linearGradient id="paint1_burger" x1="20" y1="5.17993" x2="0" y2="5.17993" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#DE5CA1" />
                      <stop offset="1" stopColor="#76B729" />
                    </linearGradient>
                    <linearGradient id="paint2_burger" x1="20" y1="9.17993" x2="0" y2="9.17993" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#DE5CA1" />
                      <stop offset="1" stopColor="#76B729" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              ) : (
                <motion.svg
                  key="close"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ opacity: 0, rotate: 20 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ position: "absolute", inset: 0 }}
                >
                  <path d="M2 2L18 18" stroke="url(#paint_x1)" strokeWidth="1.68" strokeLinecap="round" />
                  <path d="M18 2L2 18" stroke="url(#paint_x2)" strokeWidth="1.68" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="paint_x1" x1="20" y1="5" x2="0" y2="5" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#DE5CA1" />
                      <stop offset="1" stopColor="#76B729" />
                    </linearGradient>
                    <linearGradient id="paint_x2" x1="0" y1="5" x2="20" y2="5" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#DE5CA1" />
                      <stop offset="1" stopColor="#76B729" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
        {/* ...resto invariato: modale menu... */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 pointer-events-auto"
              style={{ zIndex: 110, backgroundColor: "#e7e7e7" }}
            >
              {/* Pulsante X per chiudere centrato in alto */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute"
                style={{ 
                  padding: 0, 
                  border: "none", 
                  background: "none", 
                  cursor: "pointer", 
                  zIndex: 200,
                  left: "50%",
                  top: "40px",
                  transform: "translateX(-50%)"
                }}
                aria-label="Chiudi menu"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 2L18 18" stroke="url(#paint_modal_x1)" strokeWidth="1.68" strokeLinecap="round" />
                  <path d="M18 2L2 18" stroke="url(#paint_modal_x2)" strokeWidth="1.68" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="paint_modal_x1" x1="20" y1="5" x2="0" y2="5" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#DE5CA1" />
                      <stop offset="1" stopColor="#76B729" />
                    </linearGradient>
                    <linearGradient id="paint_modal_x2" x1="0" y1="5" x2="20" y2="5" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#DE5CA1" />
                      <stop offset="1" stopColor="#76B729" />
                    </linearGradient>
                  </defs>
                </svg>
              </button>

              <div
                className="h-full w-full flex items-center justify-center"
                style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px" }}
              >
                <div
                  className="flex flex-col items-center"
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}
                >
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    if (item.isContact) {
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleMobileNavigate(item.id)}
                          className="font-['Inter:Black',sans-serif] font-black text-[#d9609b]"
                          style={{ fontSize: 35, lineHeight: 1 }}
                        >
                          {item.label}
                        </button>
                      );
                    }

                    return (
                      <div key={item.id} className="flex flex-col items-center" style={{ alignItems: "center" }}>
                        <button
                          onClick={() => handleMobileNavigate(item.id)}
                          className={`font-['Inter:Black',sans-serif] font-black transition-colors duration-300 ${
                            isActive
                              ? "text-transparent bg-clip-text bg-gradient-to-l from-[#de5ca1] to-[#76b729]"
                              : "text-[#101010]"
                          }`}
                          style={{ fontSize: 45, lineHeight: 1, opacity: isActive ? 1 : 0.47 }}
                        >
                          {item.label}
                        </button>
                        <div
                          className="transition-all duration-300 overflow-hidden"
                          style={{ width: 77, height: isActive ? 19 : 0, marginTop: isActive ? -6 : 0 }}
                        >
                          <svg className="block size-full" fill="none" viewBox="0 0 77 19">
                            <line stroke="url(#paint_nav_modal_mobile)" strokeWidth="19" x2="77" y1="9.5" y2="9.5" />
                            <defs>
                              <linearGradient id="paint_nav_modal_mobile" x1="77" x2="0" y1="19.5" y2="19.5">
                                <stop stopColor="#DE5CA1" />
                                <stop offset="1" stopColor="#76B729" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="fixed z-50 right-[20px] top-[20px] md:right-[283px] md:top-[25px] flex flex-col gap-[4px] md:gap-[6px] items-end pointer-events-auto">
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        if (item.isContact) {
          return (
            <button key={item.id} onClick={() => onNavigate(item.id)} className="block cursor-pointer font-['Inter:Black',sans-serif] font-black text-[#d9609b] text-[20px] md:text-[30px] text-right">
              {item.label}
            </button>
          );
        }
        return (
          <div key={item.id} className="flex flex-col items-end w-full group">
            <button
              onClick={() => onNavigate(item.id)}
              className={`block cursor-pointer font-['Inter:Black',sans-serif] font-black text-[20px] md:text-[30px] text-right transition-colors duration-300 ${
                isActive ? "text-transparent bg-clip-text bg-gradient-to-l from-[#de5ca1] to-[#76b729]" : "opacity-50 text-[#101010] hover:opacity-80"
              }`}
            >
              {item.label}
            </button>
            <div className={`w-[50px] md:w-[77px] transition-all duration-500 overflow-hidden ${isActive ? "h-[12px] md:h-[19px] -mt-[3px] md:-mt-[5px]" : "h-0"}`}>
              <svg className="block size-full" fill="none" viewBox="0 0 77 19">
                <line stroke="url(#paint_nav)" strokeWidth="19" x2="77" y1="9.5" y2="9.5" />
                <defs>
                  <linearGradient id="paint_nav" x1="77" x2="0" y1="19.5" y2="19.5">
                    <stop stopColor="#DE5CA1" />
                    <stop offset="1" stopColor="#76B729" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --- ROTATING KEYWORDS ---
function RotatingKeywords() {
  const [tick, setTick] = useState(0);
  const words = ["Analisi", "Strategia", "Competenza"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-[16px] md:gap-[28px] mt-4 md:mt-6 items-center h-[32px] md:h-[45px]">
      {words.map((word, i) => {
        const isVisible = tick >= i; 
        const isActive = (tick % words.length) === i; 
        
        return (
          <motion.div
            key={word}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isVisible ? 1 : 0,
              y: isVisible ? 0 : 20
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.p
              className={`font-bold text-[22px] md:text-[32px] ${
                isActive 
                  ? 'bg-clip-text text-transparent bg-gradient-to-l from-[#de5ca1] to-[#76b729]' 
                  : 'text-[#a3a3a3]'
              }`}
              transition={{ duration: 0.5 }}
            >
              {word}
            </motion.p>
          </motion.div>
        );
      })}
    </div>
  );
}

function ProjectsListOverlay({
  isOpen,
  onClose,
  activeProjectId,
  onSelectProject,
}: {
  isOpen: boolean;
  onClose: () => void;
  activeProjectId: string;
  onSelectProject: (index: number) => void;
}) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [openCategories, setOpenCategories] = useState<string[]>(["Packaging", "BTL & ATL"]);

  useEffect(() => {
    if (!isOpen) return;

    const activeCategory =
      FEATURED_PROJECTS.find((project) => project.id === activeProjectId)?.category ?? "Packaging";

    setOpenCategories((prev) => (prev.includes(activeCategory) ? prev : [...prev, activeCategory]));
  }, [activeProjectId, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const toggleCategory = (label: string) => {
    setOpenCategories((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label],
    );
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#d7d0c6",
        zIndex: 999999,
        pointerEvents: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header: title left, close button right */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: isMobile ? "24px 20px" : "32px 40px",
          borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        <h2 style={{ fontSize: isMobile ? "36px" : "42px", fontWeight: 500, color: "#7d7b79", margin: 0 }}>
          Lista progetti
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Chiudi lista progetti"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#d72488",
            transition: "opacity 0.2s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M5 5L19 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M19 5L5 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Content centered */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "auto",
          padding: isMobile ? "20px" : "40px",
        }}
      >
        <div style={{ width: "100%" }}>
          {isMobile ? (
            // MOBILE: centered content
            <div style={{ textAlign: "center" }}>
              <div style={{ textAlign: "left" }}>
                {PROJECT_LIST_CATEGORIES.map((category) => {
                  const isExpanded = openCategories.includes(category.label);

                  return (
                    <div key={category.label} style={{ marginBottom: "40px" }}>
                      <button
                        type="button"
                        onClick={() => toggleCategory(category.label)}
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "16px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "32px",
                            fontWeight: "bold",
                            color: "transparent",
                            WebkitTextStroke: "1px #d72488",
                            textTransform: "uppercase",
                            lineHeight: 1,
                          }}
                        >
                          {category.label}
                        </span>
                        <span
                          style={{
                            fontSize: "26px",
                            fontWeight: "bold",
                            color: "transparent",
                            WebkitTextStroke: "1px #d72488",
                            textTransform: "uppercase",
                            lineHeight: 1,
                          }}
                        >
                          {isExpanded ? "−" : "+"}
                        </span>
                      </button>

                      {isExpanded && (
                        <div style={{ paddingLeft: "56px", display: "flex", flexDirection: "column", gap: "20px" }}>
                          {category.items.map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => {
                                if (typeof item.featuredIndex === "number") {
                                  onSelectProject(item.featuredIndex);
                                }
                                onClose();
                              }}
                              style={{
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "34px",
                                fontWeight: "bold",
                                color: "#d72488",
                                textAlign: "left",
                                transition: "opacity 0.2s",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            // DESKTOP: centered accordion
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "42px" }}>
                {PROJECT_LIST_CATEGORIES.map((category) => {
                  const isExpanded = openCategories.includes(category.label);

                  return (
                    <div key={category.label}>
                      <button
                        type="button"
                        onClick={() => toggleCategory(category.label)}
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          marginBottom: isExpanded ? "18px" : 0,
                        }}
                      >
                        <span
                          style={{
                            fontSize: "32px",
                            fontWeight: "bold",
                            color: "transparent",
                            WebkitTextStroke: "1px #d72488",
                            textTransform: "uppercase",
                            lineHeight: 1,
                          }}
                        >
                          {category.label}
                        </span>
                        <span
                          style={{
                            fontSize: "26px",
                            fontWeight: "bold",
                            color: "transparent",
                            WebkitTextStroke: "1px #d72488",
                            textTransform: "uppercase",
                            lineHeight: 1,
                          }}
                        >
                          {isExpanded ? "−" : "+"}
                        </span>
                      </button>

                      {isExpanded && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", paddingLeft: "32px" }}>
                          {category.items.map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => {
                                if (typeof item.featuredIndex === "number") {
                                  onSelectProject(item.featuredIndex);
                                }
                                onClose();
                              }}
                              style={{
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "32px",
                                fontWeight: "bold",
                                color: "#d72488",
                                transition: "opacity 0.2s",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ContactWizardSection() {
  const [contactForm, setContactForm] = useState<ContactFormState>(INITIAL_CONTACT_FORM);
  const [contactStep, setContactStep] = useState(1);
  const [contactFeedback, setContactFeedback] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [hoveredNeed, setHoveredNeed] = useState<string | null>(null);
  const [hoveredBudget, setHoveredBudget] = useState<string | null>(null);
  const [hoveredTimeline, setHoveredTimeline] = useState<string | null>(null);

  const handleContactInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target;
    const { name, value } = target;
    const nextValue = target.type === "checkbox" ? target.checked : value;

    setContactForm((prev) => ({ ...prev, [name]: nextValue }));
    if (contactFeedback) setContactFeedback("");
  };

  const handleNeedToggle = (need: string) => {
    setContactForm((prev) => {
      const selected = prev.needs.includes(need);
      return {
        ...prev,
        needs: selected ? prev.needs.filter((n) => n !== need) : [...prev.needs, need],
      };
    });
    if (contactFeedback) setContactFeedback("");
  };

  const validateStep = (step: number) => {
    if (step === 1) {
      if (contactForm.needs.length === 0) return "Seleziona almeno un bisogno.";
      if (!contactForm.goal.trim()) return "Inserisci l'obiettivo principale.";
      return "";
    }
    if (step === 2) {
      if (!contactForm.brief.trim()) return "Aggiungi un breve contesto del progetto.";
      return "";
    }
    if (!contactForm.fullName.trim()) return "Inserisci nome e cognome.";
    if (!contactForm.phone.trim()) return "Inserisci il telefono diretto.";
    if (!contactForm.email.trim()) return "Inserisci l'email diretta.";
    if (!contactForm.privacyConsent) return "Devi accettare l'informativa privacy.";
    return "";
  };

  const handleNextContactStep = () => {
    const msg = validateStep(contactStep);
    if (msg) {
      setContactFeedback(msg);
      return;
    }
    setContactStep((prev) => Math.min(prev + 1, CONTACT_STEPS.length));
    setContactFeedback("");
  };

  const handlePrevContactStep = () => {
    setContactStep((prev) => Math.max(prev - 1, 1));
    setContactFeedback("");
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const msg = validateStep(CONTACT_STEPS.length);
    if (msg) {
      setContactFeedback(msg);
      return;
    }
    setContactSubmitted(true);
    setContactForm(INITIAL_CONTACT_FORM);
    setContactStep(1);
    setContactFeedback("");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.4 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      key="contattaci"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 pointer-events-none flex items-center justify-center"
    >
      <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-[900px] max-w-[90vw]"
          style={{ width: "900px", maxWidth: "90vw" }}
        >
          <div className="text-center mb-12" style={{ textAlign: "center", marginBottom: "56px" }}>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-black text-[64px] leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-l from-[#de5ca1] to-[#76b729] mb-8"
              style={{
                marginBottom: "34px",
                fontSize: "clamp(42px, 6.2vw, 72px)",
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "-0.025em",
                backgroundImage: "linear-gradient(to left, #de5ca1, #76b729)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              PARLACI DEL TUO PROGETTO
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center gap-3 mb-2"
            >
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    step === contactStep
                      ? "w-16 bg-gradient-to-r from-[#de5ca1] to-[#76b729]"
                      : step < contactStep
                      ? "w-8 bg-[#76b729]"
                      : "w-8 bg-[#d9d9d9]"
                  }`}
                  style={{
                    height: "6px",
                    borderRadius: "999px",
                    width: step === contactStep ? "64px" : "32px",
                    background:
                      step === contactStep
                        ? "linear-gradient(to right, #de5ca1, #76b729)"
                        : step < contactStep
                        ? "#76b729"
                        : "#d9d9d9",
                    transition: "all 0.5s ease",
                  }}
                />
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm uppercase tracking-widest text-[#101010]/50 font-medium"
              style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(16,16,16,0.5)", fontWeight: 500 }}
            >
              {contactStep === 1 && "1. Bisogni"}
              {contactStep === 2 && "2. Progetto"}
              {contactStep === 3 && "3. Dati"}
            </motion.p>
          </div>

          {contactSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-gradient-to-tr from-[#de5ca1] to-[#76b729] shadow-xl">
                <svg className="size-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-black text-[28px] md:text-[42px] leading-[1] text-[#101010]">
                Richiesta inviata.
              </p>
              <p className="mt-4 max-w-md text-[16px] md:text-[18px] text-[#101010]/60">
                Il nostro team analizzerà la tua richiesta e ti contatterà entro 24 ore lavorative.
              </p>
              <button
                type="button"
                onClick={() => {
                  setContactSubmitted(false);
                  setContactStep(1);
                }}
                className="mt-10 rounded-full bg-[#101010]/5 px-8 py-3 text-[14px] font-bold text-[#101010] transition-all hover:bg-[#101010]/10"
              >
                Invia un'altra richiesta
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleContactSubmit} style={{ maxWidth: "760px", margin: "0 auto" }}>
              <AnimatePresence mode="wait">
                {contactStep === 1 && (
                  <motion.div
                    key="step1"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-8"
                    style={{ display: "flex", flexDirection: "column", gap: "44px" }}
                  >
                    <motion.div variants={itemVariants}>
                      <label className="mb-4 block text-sm font-semibold uppercase tracking-widest text-[#101010]/60" style={{ marginBottom: "14px", display: "block", fontSize: "13px", letterSpacing: "0.14em", color: "#616773", fontWeight: 700 }}>
                        DI COSA HAI BISOGNO?
                      </label>
                      <div className="grid grid-cols-3 gap-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "14px", marginBottom: "12px" }}>
                        {CONTACT_NEEDS.map((service) => {
                          const isSelected = contactForm.needs.includes(service);
                          const isHovered = hoveredNeed === service;
                          return (
                            <button
                              key={service}
                              type="button"
                              onClick={() => handleNeedToggle(service)}
                              onMouseEnter={() => setHoveredNeed(service)}
                              onMouseLeave={() => setHoveredNeed(null)}
                              className={`px-6 py-3 rounded-full border-2 transition-all duration-300 font-medium ${
                                isSelected
                                  ? "border-transparent bg-gradient-to-r from-[#de5ca1] to-[#76b729] text-white shadow-lg scale-105"
                                  : "border-[#d9d9d9] text-[#101010]"
                              }`}
                              style={{
                                padding: "13px 20px",
                                borderRadius: "999px",
                                border: isSelected ? "2px solid transparent" : `2px solid ${isHovered ? "#de5ca1" : "#d9d9d9"}`,
                                background: isSelected
                                  ? "linear-gradient(to right, #de5ca1, #76b729)"
                                  : isHovered
                                  ? "rgba(255,255,255,0.85)"
                                  : "transparent",
                                color: isSelected ? "#fff" : isHovered ? "#d72488" : "#101010",
                                fontWeight: 500,
                                fontSize: "15px",
                                lineHeight: 1.15,
                                transform: isSelected ? "scale(1.05)" : isHovered ? "scale(1.02)" : "scale(1)",
                                boxShadow: isSelected
                                  ? "0 10px 24px -10px rgba(217,96,155,0.7)"
                                  : isHovered
                                  ? "0 8px 20px -12px rgba(16,16,16,0.25)"
                                  : "none",
                                transition: "all 0.25s ease",
                                minHeight: "50px",
                                cursor: "pointer",
                              }}
                            >
                              {service}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="goal"
                        className="mb-3 block text-sm font-semibold uppercase tracking-widest text-[#101010]/60"
                        style={{ marginBottom: "14px", display: "block", fontSize: "13px", letterSpacing: "0.14em", color: "#616773", fontWeight: 700 }}
                      >
                        OBIETTIVO PRINCIPALE DEL PROGETTO
                      </label>
                      <input
                        id="goal"
                        name="goal"
                        type="text"
                        value={contactForm.goal}
                        onChange={handleContactInputChange}
                        placeholder="Es. Aumentare le vendite online del 30%"
                        className="w-full border-b-2 border-[#d9d9d9] bg-transparent py-3 text-[20px] text-[#101010] outline-none transition-colors duration-300 placeholder:text-[#101010]/30 focus:border-[#de5ca1]"
                        style={{
                          width: "100%",
                          background: "transparent",
                          border: "none",
                          borderBottom: "2px solid #d9d9d9",
                          padding: "14px 0 10px",
                          fontSize: "20px",
                          color: "#101010",
                          outline: "none",
                        }}
                      />
                    </motion.div>
                  </motion.div>
                )}

                {contactStep === 2 && (
                  <motion.div
                    key="step2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-8"
                    style={{ display: "flex", flexDirection: "column", gap: "44px" }}
                  >
                    <motion.div variants={itemVariants}>
                      <label className="mb-4 block text-sm font-semibold uppercase tracking-widest text-[#101010]/60" style={{ marginBottom: "14px", display: "block", fontSize: "13px", letterSpacing: "0.14em", color: "#616773", fontWeight: 700 }}>
                        BUDGET
                      </label>
                      <div className="flex flex-wrap gap-3" style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
                        {[
                          { label: "Sotto 10k", value: "<10k" },
                          { label: "10k-25k", value: "10k-25k" },
                          { label: "25k-50k", value: "25k-50k" },
                          { label: "Oltre 50k", value: ">50k" },
                        ].map((budget) => {
                          const isSelected = contactForm.budget === budget.value;
                          const isHovered = hoveredBudget === budget.value;

                          return (
                            <button
                              key={budget.value}
                              type="button"
                              onClick={() => setContactForm({ ...contactForm, budget: budget.value })}
                              onMouseEnter={() => setHoveredBudget(budget.value)}
                              onMouseLeave={() => setHoveredBudget(null)}
                              className={`px-6 py-3 rounded-full border-2 transition-all duration-300 font-medium ${
                                isSelected
                                  ? "border-transparent bg-gradient-to-r from-[#de5ca1] to-[#76b729] text-white shadow-lg scale-105"
                                  : "border-[#d9d9d9] text-[#101010]"
                              }`}
                              style={{
                                padding: "13px 20px",
                                borderRadius: "999px",
                                border: isSelected ? "2px solid transparent" : `2px solid ${isHovered ? "#de5ca1" : "#d9d9d9"}`,
                                background: isSelected
                                  ? "linear-gradient(to right, #de5ca1, #76b729)"
                                  : isHovered
                                  ? "rgba(255,255,255,0.85)"
                                  : "transparent",
                                color: isSelected ? "#fff" : isHovered ? "#d72488" : "#101010",
                                fontWeight: 500,
                                fontSize: "15px",
                                lineHeight: 1.15,
                                transform: isSelected ? "scale(1.05)" : isHovered ? "scale(1.02)" : "scale(1)",
                                boxShadow: isSelected
                                  ? "0 10px 24px -10px rgba(217,96,155,0.7)"
                                  : isHovered
                                  ? "0 8px 20px -12px rgba(16,16,16,0.25)"
                                  : "none",
                                transition: "all 300ms ease",
                                cursor: "pointer",
                              }}
                            >
                              {budget.label}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="mb-4 block text-sm font-semibold uppercase tracking-widest text-[#101010]/60" style={{ marginBottom: "14px", display: "block", fontSize: "13px", letterSpacing: "0.14em", color: "#616773", fontWeight: 700 }}>
                        TEMPISTICHE
                      </label>
                      <div className="flex flex-wrap gap-3" style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
                        {[
                          { label: "Subito", value: "subito" },
                          { label: "1-2 mesi", value: "1-2 mesi" },
                          { label: "3-6 mesi", value: "3-6 mesi" },
                          { label: "Senza fretta", value: "flessibile" },
                        ].map((timeline) => {
                          const isSelected = contactForm.timeline === timeline.value;
                          const isHovered = hoveredTimeline === timeline.value;

                          return (
                            <button
                              key={timeline.value}
                              type="button"
                              onClick={() => setContactForm({ ...contactForm, timeline: timeline.value })}
                              onMouseEnter={() => setHoveredTimeline(timeline.value)}
                              onMouseLeave={() => setHoveredTimeline(null)}
                              className={`px-6 py-3 rounded-full border-2 transition-all duration-300 font-medium ${
                                isSelected
                                  ? "border-transparent bg-gradient-to-r from-[#de5ca1] to-[#76b729] text-white shadow-lg scale-105"
                                  : "border-[#d9d9d9] text-[#101010]"
                              }`}
                              style={{
                                padding: "13px 20px",
                                borderRadius: "999px",
                                border: isSelected ? "2px solid transparent" : `2px solid ${isHovered ? "#de5ca1" : "#d9d9d9"}`,
                                background: isSelected
                                  ? "linear-gradient(to right, #de5ca1, #76b729)"
                                  : isHovered
                                  ? "rgba(255,255,255,0.85)"
                                  : "transparent",
                                color: isSelected ? "#fff" : isHovered ? "#d72488" : "#101010",
                                fontWeight: 500,
                                fontSize: "15px",
                                lineHeight: 1.15,
                                transform: isSelected ? "scale(1.05)" : isHovered ? "scale(1.02)" : "scale(1)",
                                boxShadow: isSelected
                                  ? "0 10px 24px -10px rgba(217,96,155,0.7)"
                                  : isHovered
                                  ? "0 8px 20px -12px rgba(16,16,16,0.25)"
                                  : "none",
                                transition: "all 300ms ease",
                                cursor: "pointer",
                              }}
                            >
                              {timeline.label}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="brief"
                        className="mb-3 block text-sm font-semibold uppercase tracking-widest text-[#101010]/60"
                        style={{ marginBottom: "14px", display: "block", fontSize: "13px", letterSpacing: "0.14em", color: "#616773", fontWeight: 700 }}
                      >
                        BRIEF (CONTESTO, TARGET E FUNZIONALITA)
                      </label>
                      <textarea
                        id="brief"
                        name="brief"
                        value={contactForm.brief}
                        onChange={handleContactInputChange}
                        placeholder="Raccontaci il tuo progetto..."
                        rows={4}
                        className="w-full resize-none rounded-2xl border-2 border-[#d9d9d9] bg-transparent px-5 py-4 text-[18px] text-[#101010] outline-none transition-colors duration-300 placeholder:text-[#101010]/30 focus:border-[#de5ca1]"
                        style={{
                          width: "100%",
                          minHeight: "136px",
                          borderRadius: "18px",
                          border: "2px solid #d9d9d9",
                          background: "transparent",
                          padding: "16px 18px",
                          fontSize: "18px",
                          color: "#101010",
                          outline: "none",
                        }}
                      />
                    </motion.div>
                  </motion.div>
                )}

                {contactStep === 3 && (
                  <motion.div
                    key="step3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-8"
                    style={{ display: "flex", flexDirection: "column", gap: "44px" }}
                  >
                    <motion.div variants={itemVariants}>
                      <label className="mb-4 block text-sm font-semibold uppercase tracking-widest text-[#101010]/60" style={{ marginBottom: "14px", display: "block", fontSize: "13px", letterSpacing: "0.14em", color: "#616773", fontWeight: 700 }}>
                        DATI DI CONTATTO
                      </label>
                      <div className="grid grid-cols-2 gap-6" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "20px 22px" }}>
                        <input
                          type="text"
                          name="fullName"
                          value={contactForm.fullName}
                          onChange={handleContactInputChange}
                          placeholder="Nome"
                          className="w-full border-b-2 border-[#d9d9d9] bg-transparent py-3 text-[18px] text-[#101010] outline-none transition-colors duration-300 placeholder:text-[#101010]/40 focus:border-[#de5ca1]"
                          style={{
                            width: "100%",
                            background: "transparent",
                            border: "none",
                            borderBottom: "2px solid #d9d9d9",
                            padding: "14px 0 10px",
                            fontSize: "20px",
                            color: "#101010",
                            outline: "none",
                          }}
                        />
                        <input
                          type="text"
                          name="company"
                          value={contactForm.company}
                          onChange={handleContactInputChange}
                          placeholder="Azienda"
                          className="w-full border-b-2 border-[#d9d9d9] bg-transparent py-3 text-[18px] text-[#101010] outline-none transition-colors duration-300 placeholder:text-[#101010]/40 focus:border-[#de5ca1]"
                          style={{
                            width: "100%",
                            background: "transparent",
                            border: "none",
                            borderBottom: "2px solid #d9d9d9",
                            padding: "14px 0 10px",
                            fontSize: "20px",
                            color: "#101010",
                            outline: "none",
                          }}
                        />
                        <input
                          type="tel"
                          name="phone"
                          value={contactForm.phone}
                          onChange={handleContactInputChange}
                          placeholder="Telefono"
                          className="w-full border-b-2 border-[#d9d9d9] bg-transparent py-3 text-[18px] text-[#101010] outline-none transition-colors duration-300 placeholder:text-[#101010]/40 focus:border-[#de5ca1]"
                          style={{
                            width: "100%",
                            background: "transparent",
                            border: "none",
                            borderBottom: "2px solid #d9d9d9",
                            padding: "14px 0 10px",
                            fontSize: "20px",
                            color: "#101010",
                            outline: "none",
                          }}
                        />
                        <input
                          type="email"
                          name="email"
                          value={contactForm.email}
                          onChange={handleContactInputChange}
                          placeholder="Email"
                          className="w-full border-b-2 border-[#d9d9d9] bg-transparent py-3 text-[18px] text-[#101010] outline-none transition-colors duration-300 placeholder:text-[#101010]/40 focus:border-[#de5ca1]"
                          style={{
                            width: "100%",
                            background: "transparent",
                            border: "none",
                            borderBottom: "2px solid #d9d9d9",
                            padding: "14px 0 10px",
                            fontSize: "20px",
                            color: "#101010",
                            outline: "none",
                          }}
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-4 pt-4" style={{ paddingTop: "8px", display: "flex", flexDirection: "column", gap: "14px" }}>
                      <label className="group flex cursor-pointer items-start gap-3">
                        <div className="relative mt-0.5 flex items-center justify-center">
                          <input
                            type="checkbox"
                            name="privacyConsent"
                            checked={contactForm.privacyConsent}
                            onChange={handleContactInputChange}
                            className="size-5 cursor-pointer appearance-none rounded border-2 border-[#d9d9d9] transition-all duration-300 checked:border-[#76b729] checked:bg-gradient-to-r checked:from-[#de5ca1] checked:to-[#76b729]"
                          />
                          {contactForm.privacyConsent && (
                            <svg className="pointer-events-none absolute size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-[15px] leading-relaxed text-[#101010]">
                            Ho letto e accetto la{" "}
                            <a href="#privacy" className="underline transition-colors hover:text-[#de5ca1]">
                              Privacy Policy
                            </a>
                        </span>
                      </label>

                      <label className="group flex cursor-pointer items-start gap-3">
                        <div className="relative mt-0.5 flex items-center justify-center">
                          <input
                            type="checkbox"
                            name="marketingConsent"
                            checked={contactForm.marketingConsent}
                            onChange={handleContactInputChange}
                            className="size-5 cursor-pointer appearance-none rounded border-2 border-[#d9d9d9] transition-all duration-300 checked:border-[#76b729] checked:bg-gradient-to-r checked:from-[#de5ca1] checked:to-[#76b729]"
                          />
                          {contactForm.marketingConsent && (
                            <svg className="pointer-events-none absolute size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-[15px] leading-relaxed text-[#101010]">
                          Acconsento al trattamento dei dati per finalità di marketing
                        </span>
                      </label>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-12 flex items-center justify-between"
                style={{ marginTop: "58px", display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "6px" }}
              >
                <div className="flex items-center gap-4">
                  {contactStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevContactStep}
                      className="px-8 py-3 font-semibold text-[#101010] transition-colors duration-300 hover:text-[#de5ca1]"
                    >
                      ← Indietro
                    </button>
                  ) : null}
                  {contactFeedback && <span className="text-[12px] font-bold text-[#de5ca1]">{contactFeedback}</span>}
                </div>

                <div className="flex-1" />

                {contactStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextContactStep}
                    className="group relative overflow-hidden rounded-full px-10 py-4 text-[18px] font-black text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "999px",
                      padding: "16px 40px",
                      fontSize: "18px",
                      fontWeight: 900,
                      color: "#fff",
                      background: "linear-gradient(to right, #de5ca1, #76b729)",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <span className="relative">Avanti →</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!contactForm.privacyConsent}
                    className="group relative overflow-hidden rounded-full px-10 py-4 text-[18px] font-black text-white transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#de5ca1] to-[#76b729]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#76b729] to-[#de5ca1] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="relative">Invia Progetto</span>
                  </button>
                )}
              </motion.div>
            </form>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

// --- MAIN CONTENT RENDERER ---
function ContentRenderer({
  activeSection,
  subIndex,
  setSubIndex,
}: {
  activeSection: SectionId;
  subIndex: number;
  setSubIndex: (i: number) => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const activeProject = FEATURED_PROJECTS[subIndex] ?? FEATURED_PROJECTS[0];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  const slideVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.6, ease: "easeIn" } }
  };

  return (
    <AnimatePresence mode="wait">
      {activeSection === "mission" && (
        <motion.div
          key="mission"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 pointer-events-none flex flex-col justify-center px-5 md:block md:px-0"
        >
           {/* Main Title Group */}
           <div className="relative md:absolute md:left-[200px] md:top-1/2 md:-translate-y-1/2 mt-20 md:mt-0">
              <motion.p variants={itemVariants} className="bg-clip-text bg-gradient-to-l font-['Inter:Black',sans-serif] font-black from-[#de5ca1] leading-[normal] text-[42px] md:text-[76px] to-[#76b729] text-transparent max-w-[350px] md:w-[900px] md:max-w-none">
                Il brief prende forma!
              </motion.p>
              
              {/* Keywords Rotanti */}
              <div className="relative h-[35px] md:h-[45px] mt-2"> 
                 <RotatingKeywords />
              </div>

              {/* 10 Anni Big */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 4.5, ease: "easeOut" }}
                className="mt-[80px] md:mt-[210px]"
              >
                 <p className="text-[32px] md:text-[48px]">
                    <span className="font-bold bg-clip-text text-transparent bg-gradient-to-l from-[#de5ca1] to-[#76b729]">10 </span>
                    <span className="font-bold bg-clip-text text-transparent bg-gradient-to-l from-[#de5ca1] to-[#76b729]">anni</span>
                    <span> di attività</span>
                 </p>
                 {/* Sottotitolo narrativo */}
                 <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 5.5, duration: 1 }}
                    className="text-[16px] md:text-[18px] text-[#101010] mt-4 max-w-[300px] md:max-w-[500px] leading-relaxed"
                 >
                    Costruiamo identità chiare, coerenti, riconoscibili. Brand che parlano con una voce sola, ovunque.
                    <br /><br />
                    Niente fronzoli, niente mode passeggere: solo fondamenta solide e scelte che reggono nel tempo.
                    <br /><br />
                    <span className="font-bold">Se vuoi sembrare qualcosa, basta poco. Se vuoi essere qualcosa, si lavora sul serio.</span>
                 </motion.p>
              </motion.div>
           </div>
        </motion.div>
      )}

      {activeSection === "chi-siamo" && (
        <motion.div
          key="chi-siamo"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 pointer-events-none"
        >
           {/* Testo Lungo Centrale con Sub-Slides */}
           {/* Mobile/Tablet: In basso (bottom-10), Desktop (LG): Centrato verticalmente un po' più su (top-40%) */}
           <div className="absolute left-5 right-5 bottom-10 lg:bottom-auto lg:left-[200px] lg:right-[200px] lg:top-[40%] lg:-translate-y-1/2 flex items-start justify-between gap-4 pointer-events-auto">
             
             {/* Text Box Container */}
             <div className="relative w-full lg:max-w-[865px] min-h-[200px] lg:min-h-[200px]">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={subIndex}
                   variants={slideVariants}
                   initial="initial"
                   animate="animate"
                   exit="exit"
                   className="bg-[#e3ddd3] px-[20px] py-[20px] lg:px-[31px] lg:py-[30px] w-full"
                 >
                    <p className="font-normal text-[#101010] text-[16px] leading-[24px] lg:text-[18px] lg:leading-[28px]">
                       <span>{CHI_SIAMO_SLIDES[subIndex].text}{" "}</span>
                       <span className="font-bold">{CHI_SIAMO_SLIDES[subIndex].highlight.split(",")[0]}</span>
                       <span>{CHI_SIAMO_SLIDES[subIndex].highlight.substring(CHI_SIAMO_SLIDES[subIndex].highlight.split(",")[0].length)}</span>
                    </p>
                 </motion.div>
               </AnimatePresence>
             </div>

             {/* Side Navigation Buttons */}
             <div className="flex flex-col gap-4 pt-4 shrink-0">
                {CHI_SIAMO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSubIndex(idx)}
                    className={`size-[18px] lg:size-[24px] rounded-full transition-all duration-300 border ${
                        subIndex === idx 
                        ? "border-transparent bg-gradient-to-l from-[#de5ca1] to-[#76b729]" 
                        : "border-[#d9609b] bg-transparent opacity-50 hover:opacity-100"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
             </div>
           </div>
        </motion.div>
      )}

      {activeSection === "servizi" && (
        <motion.div
          key="servizi"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 pointer-events-none"
        >
           {/* Dynamic Title based on selection */}
           <motion.div variants={itemVariants} className="absolute left-5 top-[180px] md:left-[200px] md:top-[268px]">
              <p className="font-bold text-[#76b729] text-[40px] md:text-[70px]">
                {SERVIZI_ITEMS[subIndex]}
              </p>
           </motion.div>

           {/* Service List with Scroll Selection */}
           <motion.div variants={itemVariants} className="absolute left-5 md:left-1/2 bottom-[100px] md:bottom-[150px] md:-translate-x-1/2 flex flex-col md:flex-row gap-[10px] md:gap-[22px] items-start md:items-center pointer-events-auto">
              {SERVIZI_ITEMS.map((item, index) => {
                 const isActive = subIndex === index;
                 return (
                   <button 
                     key={item}
                     onClick={() => setSubIndex(index)}
                     className={`font-bold text-[24px] md:text-[35px] transition-all duration-300 text-left ${
                        isActive 
                        ? "bg-clip-text text-transparent bg-gradient-to-l from-[#de5ca1] to-[#76b729]" 
                        : "text-black/50 hover:text-black/70"
                     }`}
                   >
                     {isActive ? `- ${item}` : item}
                   </button>
                 );
              })}
           </motion.div>

           {/* Description - Dynamic based on active service */}
           {subIndex === 0 && ( // Brand
              <AnimatePresence mode="wait">
                <motion.div 
                  key="brand-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="contents"
                >
                  <motion.div variants={itemVariants} className="absolute left-5 md:left-[200px] top-[240px] md:top-[360px] max-w-[300px] md:max-w-[520px]">
                    <p className="text-[17px] md:text-[19px] leading-[30px] md:leading-[34px] tracking-wide text-[#101010]">
                      Costruiamo identità chiare, coerenti, riconoscibili. Brand che parlano con una voce sola, ovunque.
                    </p>
                  </motion.div>
                  {isDesktop && (
                    <motion.div variants={itemVariants} className="absolute left-[200px] top-[470px] max-w-[520px]">
                      <p className="text-[17px] leading-[30px] tracking-wide text-[#101010] mb-6">
                        Niente fronzoli, niente mode passeggere: solo fondamenta solide e scelte che reggono nel tempo.
                      </p>
                      <p className="font-bold text-[20px] md:text-[24px] leading-[32px] bg-clip-text text-transparent bg-gradient-to-l from-[#de5ca1] to-[#76b729]">
                        Se vuoi sembrare qualcosa, basta poco. Se vuoi essere qualcosa, si lavora sul serio.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
           )}
           
           {subIndex !== 0 && ( // Other services - placeholder content
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`service-${subIndex}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="contents"
                >
                  <motion.div variants={itemVariants} className="absolute left-5 md:left-[200px] top-[240px] md:top-[360px] max-w-[300px] md:max-w-[450px]">
                    <p className="font-normal text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] text-[#101010]">
                      Abbiamo accompagnato Pernigotti in un progetto di restyling della storica linea Cacao Gelateria...
                    </p>
                  </motion.div>
                  {isDesktop && (
                    <motion.div variants={itemVariants} className="absolute left-[200px] top-[680px] max-w-[450px]">
                      <p className="font-normal text-[18px] leading-[28px] text-[#101010]">
                        Il nuovo design del packaging valorizza l'expertise e la tradizione dolciaria del brand...
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
           )}
        </motion.div>
      )}

      {activeSection === "progetti" && (
        <motion.div
          key="progetti"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 pointer-events-none"
        >
            {/* Stats & Title */}
            <motion.div variants={itemVariants} className="absolute left-5 top-[120px] md:left-[200px] md:top-[200px] flex gap-3 md:gap-6">
              <p className="font-bold text-[#101010] text-[40px] md:text-[82px]">{activeProject.countLabel}</p>
              <p className="font-bold text-[#d72488] text-[40px] md:text-[82px]">{activeProject.title}</p>
            </motion.div>
            <motion.p variants={itemVariants} className="absolute left-5 top-[180px] md:left-[200px] md:top-[300px] font-bold text-[20px] md:text-[33px] text-[#a3a3a3]">{activeProject.category}</motion.p>

            {/* Feedback Section */}
            <motion.div variants={itemVariants} className="absolute left-5 right-5 bottom-[180px] md:left-[200px] md:right-auto md:bottom-[180px] md:max-w-[500px]">
               <p className="font-extralight text-[20px] md:text-[32px]">Feedback</p>
               <div className="text-[15px] md:text-[17px] leading-[24px] md:leading-[26px] mt-2 md:mt-3">
                <p>"{activeProject.feedbackQuote}"</p>
                <p className="mt-2 md:mt-3 text-[14px] md:text-[16px]">{activeProject.feedbackAuthor}</p>
               </div>
            </motion.div>

            {/* Carousel Arrows - ancorate al cerchio progetti */}
            <motion.div
              variants={itemVariants}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[78vw] md:h-[78vw] lg:left-auto lg:right-[15vw] lg:w-[946px] lg:h-[946px] lg:translate-x-0 pointer-events-none"
              style={{ zIndex: 120 }}
            >
              <button
                onClick={() => setSubIndex((prev) => (prev === 0 ? 4 : prev - 1))}
                className="absolute left-[-30px] top-[54%] -translate-y-1/2 pointer-events-auto md:left-[-44px] lg:left-[-58px]"
                aria-label="Progetto precedente"
              >
                <svg className="block h-auto w-[64px] md:w-[82px] lg:w-[120px]" fill="none" viewBox="0 0 220 283">
                  <path d="M110.5 4.50032C110.5 4.50032 2.44484 84.4306 4.52981 145.255C6.52445 203.443 110.5 278.5 110.5 278.5" stroke="#D72488" strokeLinecap="round" strokeWidth="9" />
                </svg>
              </button>
              <button
                onClick={() => setSubIndex((prev) => (prev === 4 ? 0 : prev + 1))}
                className="absolute right-[-30px] top-[54%] -translate-y-1/2 pointer-events-auto md:right-[-44px] lg:right-[-58px]"
                aria-label="Progetto successivo"
              >
                <svg className="block h-auto w-[64px] md:w-[82px] lg:w-[120px]" fill="none" viewBox="0 0 220 283" style={{ transform: "scaleX(-1)" }}>
                  <path d="M110.5 4.50032C110.5 4.50032 2.44484 84.4306 4.52981 145.255C6.52445 203.443 110.5 278.5 110.5 278.5" stroke="#D72488" strokeLinecap="round" strokeWidth="9" />
                </svg>
              </button>
            </motion.div>
            
        </motion.div>
      )}

      {activeSection === "contattaci" && (
        <ContactWizardSection />
      )}
    </AnimatePresence>
  );
}


// --- MAIN APP ---

export default function Home() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0); // State for internal section slides
  const [isScrolling, setIsScrolling] = useState(false);
  const [isProjectsOverlayOpen, setIsProjectsOverlayOpen] = useState(false);
  const activeSection = SECTIONS[activeSectionIndex] ?? "mission";

  // Touch handling
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    if (activeSection !== "progetti" && isProjectsOverlayOpen) {
      setIsProjectsOverlayOpen(false);
    }
  }, [activeSection, isProjectsOverlayOpen]);

  // Scroll Jacking Logic
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isProjectsOverlayOpen) return;
      e.preventDefault(); 
      
      if (isScrolling) return;

      const currentSection = SECTIONS[activeSectionIndex] ?? "mission";
      const subSlideCount = getSectionSlideCount(currentSection);

      if (e.deltaY > 50) {
        // Scroll Down
        // Check if we have more sub-slides in current section
        if (subIndex < subSlideCount - 1) {
            setIsScrolling(true);
            setSubIndex(prev => prev + 1);
            setTimeout(() => setIsScrolling(false), 800); // Shorter cooldown for slides
        } else {
            // Next Section
            if (activeSectionIndex < SECTIONS.length - 1) {
                setIsScrolling(true);
                setActiveSectionIndex(prev => prev + 1);
                setSubIndex(0); // Reset sub-index for new section
                setTimeout(() => setIsScrolling(false), 1000);
            }
        }
      } else if (e.deltaY < -50) {
        // Scroll Up
        if (subIndex > 0) {
             setIsScrolling(true);
             setSubIndex(prev => prev - 1);
             setTimeout(() => setIsScrolling(false), 800);
        } else {
             // Prev Section
             if (activeSectionIndex > 0) {
                 setIsScrolling(true);
                 const prevIndex = activeSectionIndex - 1;
                 const prevSection = SECTIONS[prevIndex] ?? "mission";
                 const prevSlideCount = getSectionSlideCount(prevSection);
                 
                 setActiveSectionIndex(prevIndex);
                 // Optional: start at last slide of previous section? 
                 // For now, let's start at 0 to avoid confusion or standard behavior
                 // Actually, standard scrollytelling usually goes to last slide when scrolling up.
                 setSubIndex(prevSlideCount - 1); 
                 
                 setTimeout(() => setIsScrolling(false), 1000);
             }
        }
      }
    };
    
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isScrolling, activeSectionIndex, subIndex, isProjectsOverlayOpen]);

  // Touch Events for Mobile Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    if (isScrolling || isProjectsOverlayOpen) return;

    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart - touchEnd;
    
    const currentSection = SECTIONS[activeSectionIndex] ?? "mission";
    const subSlideCount = getSectionSlideCount(currentSection);

    if (Math.abs(diff) > 50) { // Threshold 50px
        if (diff > 0) {
            // Swipe Up (Next)
             if (subIndex < subSlideCount - 1) {
                setIsScrolling(true);
                setSubIndex(prev => prev + 1);
                setTimeout(() => setIsScrolling(false), 800);
            } else if (activeSectionIndex < SECTIONS.length - 1) {
                setIsScrolling(true);
                setActiveSectionIndex(prev => prev + 1);
                setSubIndex(0);
                setTimeout(() => setIsScrolling(false), 1000);
            }
        } else {
            // Swipe Down (Prev)
            if (subIndex > 0) {
                setIsScrolling(true);
                setSubIndex(prev => prev - 1);
                setTimeout(() => setIsScrolling(false), 800);
           } else if (activeSectionIndex > 0) {
                setIsScrolling(true);
                const prevIndex = activeSectionIndex - 1;
                const prevSection = SECTIONS[prevIndex] ?? "mission";
                const prevSlideCount = getSectionSlideCount(prevSection);
                
                setActiveSectionIndex(prevIndex);
                setSubIndex(prevSlideCount - 1);
                setTimeout(() => setIsScrolling(false), 1000);
           }
        }
    }
    setTouchStart(null);
  };

  const handleNavigate = (id: string) => {
    const idx = SECTIONS.indexOf(id);
    if (idx !== -1) {
        setActiveSectionIndex(idx);
        setIsProjectsOverlayOpen(false);
        setSubIndex(0); // Reset subIndex on direct nav
    }
  };

  return (
    <div 
        className="bg-transparent relative w-screen h-screen overflow-hidden font-['Inter',sans-serif]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
    >
      {/* 1. Background Elements (Unified Visuals) */}
      <BackgroundVisuals activeSection={activeSection} subIndex={subIndex} />

      {/* 2. Dynamic Header (Logo + Left Info) + Mobile Menu */}
      <DynamicHeader activeSection={activeSection}>
        {/* BLOCCO MENU MOBILE */}
        <Navigation activeSection={activeSection} onNavigate={handleNavigate} mobileEmbed />
      </DynamicHeader>

      {/* 3. Navigation (Right Side) solo desktop */}
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} desktopOnly />

      {/* 4. Content Area (Fading In/Out Text) */}
      <div className="relative z-10 w-full h-full">
         <ContentRenderer
           activeSection={activeSection}
           subIndex={subIndex}
           setSubIndex={setSubIndex}
         />
      </div>

      {activeSection === "progetti" && !isProjectsOverlayOpen && (
        <button
          type="button"
          onClick={() => setIsProjectsOverlayOpen(true)}
          className="fixed right-3 bottom-3 md:right-[64px] md:bottom-[24px] lg:right-[74px] lg:bottom-[26px] bg-[#dfd9cf] px-[18px] py-[10px] md:px-[22px] md:py-[11px] rounded-[46px] flex gap-[8px] md:gap-[9px] items-center border border-[#d5d0c8] pointer-events-auto z-[220]"
        >
          <p className="font-['Roboto_Mono',monospace] font-semibold text-[14px] md:text-[18px] text-[#7c7b77] tracking-[-0.01em] leading-none">Lista progetti</p>
          <div className="size-[16px] md:size-[18px] text-[#7c7b77]">
            <svg className="size-full" fill="none" viewBox="0 0 24 24">
              <path d="M4 6H16" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
              <path d="M4 12H16" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
              <path d="M4 18H16" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
              <circle cx="20" cy="6" r="1.25" fill="currentColor" />
              <circle cx="20" cy="12" r="1.25" fill="currentColor" />
              <circle cx="20" cy="18" r="1.25" fill="currentColor" />
            </svg>
          </div>
        </button>
      )}

      {/* 5. Projects Overlay - rendered at root level to escape stacking contexts */}
      <ProjectsListOverlay
        isOpen={isProjectsOverlayOpen}
        onClose={() => setIsProjectsOverlayOpen(false)}
        activeProjectId={FEATURED_PROJECTS[subIndex]?.id ?? "pernigotti"}
        onSelectProject={(index) => setSubIndex(index)}
      />
    </div>
  );
}
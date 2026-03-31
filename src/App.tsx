import { useState, useEffect, useMemo, useCallback, useRef, type ChangeEvent, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BackgroundVisuals } from "./components/BackgroundVisuals";
import { ProjectSectionRenderer } from "./components/projects/sections/registry";
import type { CarouselProject, ProjectSection } from "./components/projects/sections/types";
import imgLogoPxme1RemovebgPreview1 from "figma:asset/6a675323d9240b366f4179dd86927cbd63e012a9.png";
import imgEllipse6 from "figma:asset/0dbe7327a1bc1513d7647c295c4c604c864397d2.png";
import imgEllipse4 from "figma:asset/7fa13a594a8b2c9fe104df3624d3e796b2311c01.png";
import imgEllipse7 from "figma:asset/a328796418d2639bd6edd07e60315aef07caa296.png";

// --- CONFIGURAZIONE SEZIONI ---
const SECTIONS = ["mission", "chi-siamo", "servizi", "contattaci"] as const;
type SectionId = (typeof SECTIONS)[number];

const CHI_SIAMO_SLIDES = [
  {
    id: 0,
    text: `Diamo voce al tuo marchio con anima e tecnica: strategia, identitÃ  visiva, storytelling e coerenza comunicativa diventano un'unica esperienza distintiva.`,
    highlight: `Noi non "facciamo loghi", creiamo brand capaci di risuonare dentro, di conquistare uno spazio nel cuore delle persone e nella mente del mercato.`
  },
  {
    id: 1,
    text: `Ogni progetto Ã¨ un viaggio condiviso. Ascoltiamo la tua storia, analizziamo il tuo mercato e traduciamo i tuoi valori in un linguaggio visivo potente e riconoscibile.`,
    highlight: `Il design non Ã¨ solo estetica, Ã¨ la sintesi perfetta tra forma e funzione, pensata per durare nel tempo ed evolvere con il tuo business.`
  },
  {
    id: 2,
    text: `Dalla carta al digitale, costruiamo ecosistemi di brand coerenti. Che si tratti di packaging, web design o campagne advertising, il nostro approccio rimane sartoriale.`,
    highlight: `PerchÃ© un brand forte non deve solo farsi notare, deve farsi ricordare e scegliere, oggi e domani.`
  }
];

const SERVIZI_ITEMS = ["Brand", "Corporate identity", "Packaging", "BTL & ATL", "Web"];

const FEATURED_PROJECTS = [
  {
    id: "pernigotti",
    countLabel: "3/83",
    title: "Pernigotti",
    category: "Packaging",
    feedbackQuote: "Il nuovo packaging comunica perfettamente la qualitÃ  e la tradizione Pernigotti, risultando distintivo e moderno. Un progetto curato nei minimi dettagli, in perfetta sintonia con i valori del nostro brand!",
    feedbackAuthor: "â€” XXXX XXX | Marketing Manager Pernigotti",
  },
  {
    id: "unicredit",
    countLabel: "22/83",
    title: "Unicredit",
    category: "BTL & ATL",
    feedbackQuote: "Il concept di campagna ha valorizzato il tono del brand con una presenza forte, riconoscibile e coerente su tutti i touchpoint di comunicazione.",
    feedbackAuthor: "â€” XXXX XXX | Marketing Manager Unicredit",
  },
  {
    id: "sauber-pharma",
    countLabel: "37/83",
    title: "Sauber Pharma",
    category: "Packaging",
    feedbackQuote: "Un progetto solido e pulito, capace di rendere immediata la lettura dell'offerta e di dare maggiore autorevolezza all'intera linea prodotto.",
    feedbackAuthor: "â€” XXXX XXX | Brand Manager Sauber Pharma",
  },
  {
    id: "suaviter",
    countLabel: "41/83",
    title: "Suaviter",
    category: "Packaging",
    feedbackQuote: "Il nuovo sistema visivo ha migliorato l'impatto a scaffale e rafforzato il posizionamento del marchio con una cifra estetica chiara e memorabile.",
    feedbackAuthor: "â€” XXXX XXX | Marketing Manager Suaviter",
  },
  {
    id: "piero-trentini",
    countLabel: "58/83",
    title: "Piero Trentini",
    category: "BTL & ATL",
    feedbackQuote: "Dalla direzione creativa alla declinazione dei materiali, tutto il progetto Ã¨ stato sviluppato con precisione e una forte coerenza narrativa.",
    feedbackAuthor: "â€” XXXX XXX | Marketing Manager Piero Trentini",
  },
  {
    id: "brand-lab-test",
    countLabel: "64/83",
    title: "Brand Lab Test",
    category: "Brand",
    feedbackQuote: "Il lavoro di identita visiva ha reso il posizionamento immediato e molto piu riconoscibile sul mercato.",
    feedbackAuthor: "â€” Test User | Brand Manager",
  },
  {
    id: "packaging-test-alpha",
    countLabel: "69/83",
    title: "Packaging Test Alpha",
    category: "Packaging",
    feedbackQuote: "Ottimo bilanciamento tra leggibilita e impatto a scaffale: il prodotto ora si distingue davvero.",
    feedbackAuthor: "â€” Test User | Product Lead",
  },
  {
    id: "atl-test-beta",
    countLabel: "73/83",
    title: "ATL Test Beta",
    category: "BTL & ATL",
    feedbackQuote: "La campagna ha mantenuto coerenza narrativa su tutti i touchpoint e aumentato la memorabilita del brand.",
    feedbackAuthor: "â€” Test User | Campaign Lead",
  },
  {
    id: "event-test-gamma",
    countLabel: "79/83",
    title: "Event Test Gamma",
    category: "EVENTS",
    feedbackQuote: "Esperienza evento molto chiara, orchestrata bene e con una direzione visiva forte in ogni momento.",
    feedbackAuthor: "â€” Test User | Event Manager",
  },
] as const;

const PROJECT_LIST_CATEGORIES = [
  {
    label: "Packaging",
    items: [
      { id: "pernigotti", label: "Pernigotti", featuredIndex: 0 },
      { id: "sauber-pharma", label: "Sauber Pharma", featuredIndex: 2 },
      { id: "suaviter", label: "Suaviter", featuredIndex: 3 },
      { id: "packaging-test-alpha", label: "Packaging Test Alpha", featuredIndex: 6 },
    ],
  },
  {
    label: "Brand",
    items: [
      { id: "liabel", label: "Liabel" },
      { id: "gotha-cosmetic", label: "Gotha Cosmetic" },
      { id: "filo-alfa", label: "Filo Alfa" },
      { id: "brand-lab-test", label: "Brand Lab Test", featuredIndex: 5 },
    ],
  },
  {
    label: "BTL & ATL",
    items: [
      { id: "unicredit", label: "Unicredit", featuredIndex: 1 },
      { id: "sauber-pharma-btl", label: "Sauber Pharma" },
      { id: "piero-trentini", label: "Piero Trentini", featuredIndex: 4 },
      { id: "atl-test-beta", label: "ATL Test Beta", featuredIndex: 7 },
    ],
  },
  {
    label: "EVENTS",
    items: [
      { id: "andrea-pieralli", label: "Andrea Pieralli" },
      { id: "italiana-assicurazioni", label: "Italiana Assicurazioni" },
      { id: "nissan", label: "Nissan" },
      { id: "event-test-gamma", label: "Event Test Gamma", featuredIndex: 8 },
    ],
  },
] as const;

const SECTION_COUNTS: Record<SectionId, number> = {
  "mission": 1,
  "chi-siamo": 3,
  "servizi": SERVIZI_ITEMS.length,
  "contattaci": 1
};

const getSectionSlideCount = (section: SectionId) => SECTION_COUNTS[section];

type ContactFormState = {
  fullName: string;
  company: string;
  phone: string;
  email: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
};

const INITIAL_CONTACT_FORM: ContactFormState = {
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
                            <span className="hidden md:inline"> di attivitÃ </span>
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
    { id: "contattaci", label: "CONTATTACI", isContact: true },
  ];

  const activeItem = navItems.find((item) => item.id === activeSection) || navItems[0];

  const handleMobileNavigate = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  if (isMobile && !mobileEmbed) {
    // Non mostrare nulla: la versione mobile ora Ã¨ gestita come children del logo
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

function ContactWizardSection() {
  const [contactForm, setContactForm] = useState<ContactFormState>(INITIAL_CONTACT_FORM);
  const [contactFeedback, setContactFeedback] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target;
    const { name, value } = target;
    const nextValue = target.type === "checkbox" ? target.checked : value;

    setContactForm((prev) => ({ ...prev, [name]: nextValue }));
    if (contactFeedback) setContactFeedback("");
  };

  const validateForm = () => {
    if (!contactForm.fullName.trim()) return "Inserisci nome e cognome.";
    if (!contactForm.phone.trim()) return "Inserisci il telefono diretto.";
    if (!contactForm.email.trim()) return "Inserisci l'email diretta.";
    if (!contactForm.privacyConsent) return "Devi accettare l'informativa privacy.";
    return "";
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const msg = validateForm();
    if (msg) {
      setContactFeedback(msg);
      return;
    }
    setContactSubmitted(true);
    setContactForm(INITIAL_CONTACT_FORM);
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
                Il nostro team analizzerÃ  la tua richiesta e ti contatterÃ  entro 24 ore lavorative.
              </p>
              <button
                type="button"
                onClick={() => {
                  setContactSubmitted(false);
                }}
                className="mt-10 rounded-full bg-[#101010]/5 px-8 py-3 text-[14px] font-bold text-[#101010] transition-all hover:bg-[#101010]/10"
              >
                Invia un'altra richiesta
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleContactSubmit} style={{ maxWidth: "760px", margin: "0 auto" }}>
              <AnimatePresence mode="wait">
                {(
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
                          Acconsento al trattamento dei dati per finalitÃ  di marketing
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
                  {contactFeedback && <span className="text-[12px] font-bold text-[#de5ca1]">{contactFeedback}</span>}
                </div>

                <div className="flex-1" />

                <button
                    type="submit"
                    disabled={!contactForm.privacyConsent}
                    className="group relative overflow-hidden rounded-full px-10 py-4 text-[18px] font-black text-white transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#de5ca1] to-[#76b729]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#76b729] to-[#de5ca1] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="relative">Invia Progetto</span>
                  </button>
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
  onViewProjects,
}: {
  activeSection: SectionId;
  subIndex: number;
  setSubIndex: (i: number) => void;
  onViewProjects?: (category?: string) => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const getProjectsHref = () => {
    return getProjectsRoute(undefined, DEFAULT_PROJECT_ID);
  };
  
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

  const safeChiSiamoIndex = Math.min(Math.max(subIndex, 0), CHI_SIAMO_SLIDES.length - 1);

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
                    <span> di attivitÃ </span>
                 </p>
                 {/* Sottotitolo narrativo */}
                 <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 5.5, duration: 1 }}
                    className="text-[16px] md:text-[18px] text-[#101010] mt-4 max-w-[300px] md:max-w-[500px] leading-relaxed"
                 >
                    Costruiamo identitÃ  chiare, coerenti, riconoscibili. Brand che parlano con una voce sola, ovunque.
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
           <div className="absolute left-5 top-1/2 z-20 -translate-y-1/2 pointer-events-auto md:left-[200px]">
             <div className="flex items-center gap-4 md:gap-6">
               <div className="flex shrink-0 flex-col gap-3 md:gap-4">
                  {CHI_SIAMO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSubIndex(idx)}
                      className={`size-[16px] md:size-[22px] rounded-full transition-all duration-300 border ${
                          safeChiSiamoIndex === idx
                          ? "border-transparent bg-gradient-to-l from-[#de5ca1] to-[#76b729]"
                          : "border-[#d9609b] bg-transparent opacity-50 hover:opacity-100"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
               </div>

               <div
                 className="w-full max-w-[320px] md:max-w-[340px] lg:max-w-[360px]"
                 style={{ width: "360px", maxWidth: "calc(100vw - 120px)" }}
               >
                 <AnimatePresence mode="wait">
                   <motion.div
                     key={safeChiSiamoIndex}
                     variants={slideVariants}
                     initial="initial"
                     animate="animate"
                     exit="exit"
                     className="flex min-h-[220px] max-w-full items-center md:min-h-[260px]"
                     style={{ width: "100%", maxWidth: "360px" }}
                   >
                      <p
                        className="max-w-full font-normal text-[#101010] text-[16px] leading-[24px] break-words md:text-[18px] md:leading-[28px]"
                        style={{ width: "100%", maxWidth: "360px" }}
                      >
                         <span>{CHI_SIAMO_SLIDES[safeChiSiamoIndex].text}{" "}</span>
                         <span className="font-bold">{CHI_SIAMO_SLIDES[safeChiSiamoIndex].highlight.split(",")[0]}</span>
                         <span>{CHI_SIAMO_SLIDES[safeChiSiamoIndex].highlight.substring(CHI_SIAMO_SLIDES[safeChiSiamoIndex].highlight.split(",")[0].length)}</span>
                      </p>
                   </motion.div>
                 </AnimatePresence>
               </div>
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
          className="absolute inset-0"
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
                      Costruiamo identitÃ  chiare, coerenti, riconoscibili. Brand che parlano con una voce sola, ovunque.
                    </p>
                    {!isDesktop && (
                      <a
                        href={getProjectsHref()}
                        className="group flex w-max items-center mt-16 whitespace-nowrap shrink-0 pointer-events-auto transition-colors duration-300 hover:bg-white"
                        style={{
                          padding: "10px 14px",
                          borderRadius: 999,
                          border: "1px solid rgba(215, 36, 136, 0.25)",
                          background: "rgba(255,255,255,0.92)",
                          color: "#7d7b79",
                          fontWeight: 700,
                          fontSize: "16px",
                          lineHeight: 1,
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                          width: "max-content",
                          flexWrap: "nowrap",
                        }}
                      >
                        Scopri i progetti
                      </a>
                    )}
                  </motion.div>
                  {isDesktop && (
                    <motion.div variants={itemVariants} className="absolute left-[200px] top-[470px] max-w-[520px]">
                      <p className="text-[17px] leading-[30px] tracking-wide text-[#101010] mb-6">
                        Niente fronzoli, niente mode passeggere: solo fondamenta solide e scelte che reggono nel tempo.
                      </p>
                      <p className="font-bold text-[20px] md:text-[24px] leading-[32px] bg-clip-text text-transparent bg-gradient-to-l from-[#de5ca1] to-[#76b729]">
                        Se vuoi sembrare qualcosa, basta poco. Se vuoi essere qualcosa, si lavora sul serio.
                      </p>
                      <a
                        href={getProjectsHref()}
                        className="group flex w-max items-center mt-16 whitespace-nowrap shrink-0 pointer-events-auto transition-colors duration-300 hover:bg-white"
                        style={{
                          padding: "10px 14px",
                          borderRadius: 999,
                          border: "1px solid rgba(215, 36, 136, 0.25)",
                          background: "rgba(255,255,255,0.92)",
                          color: "#7d7b79",
                          fontWeight: 700,
                          fontSize: "16px",
                          lineHeight: 1,
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                          width: "max-content",
                          flexWrap: "nowrap",
                        }}
                      >
                        Scopri i progetti
                      </a>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
           )}
           
           {subIndex !== 0 && ( // Other services
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
                    {!isDesktop && (
                      <a
                        href={getProjectsHref()}
                        className="group flex w-max items-center mt-16 whitespace-nowrap shrink-0 pointer-events-auto transition-colors duration-300 hover:bg-white"
                        style={{
                          padding: "10px 14px",
                          borderRadius: 999,
                          border: "1px solid rgba(215, 36, 136, 0.25)",
                          background: "rgba(255,255,255,0.92)",
                          color: "#7d7b79",
                          fontWeight: 700,
                          fontSize: "16px",
                          lineHeight: 1,
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                          width: "max-content",
                          flexWrap: "nowrap",
                        }}
                      >
                        Scopri i progetti
                      </a>
                    )}
                  </motion.div>
                  {isDesktop && (
                    <motion.div variants={itemVariants} className="absolute left-[200px] top-[620px] max-w-[450px]">
                      <p className="font-normal text-[18px] leading-[28px] text-[#101010]">
                        Il nuovo design del packaging valorizza l'expertise e la tradizione dolciaria del brand...
                      </p>
                      <a
                        href={getProjectsHref()}
                        className="group flex w-max items-center mt-16 whitespace-nowrap shrink-0 pointer-events-auto transition-colors duration-300 hover:bg-white"
                        style={{
                          padding: "10px 14px",
                          borderRadius: 999,
                          border: "1px solid rgba(215, 36, 136, 0.25)",
                          background: "rgba(255,255,255,0.92)",
                          color: "#7d7b79",
                          fontWeight: 700,
                          fontSize: "16px",
                          lineHeight: 1,
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                          width: "max-content",
                          flexWrap: "nowrap",
                        }}
                      >
                        Scopri i progetti
                      </a>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
           )}
        </motion.div>
      )}

      {activeSection === "contattaci" && (
        <ContactWizardSection />
      )}
    </AnimatePresence>
  );
}


// --- PROJECTS PAGE ---

// Map service names to PROJECT_LIST_CATEGORIES labels
const SERVICE_TO_CATEGORY: Record<string, string> = {
  "Brand": "Brand",
  "Corporate identity": "Brand",
  "Packaging": "Packaging",
  "BTL & ATL": "BTL & ATL",
  "Web": "EVENTS",
};

const DEFAULT_PROJECT_ID = "pernigotti";

function buildDefaultProjectSections(project: {
  title: string;
  category: string;
  feedbackQuote?: string;
  feedbackAuthor?: string;
}): ProjectSection[] {
  return [
    {
      id: "overview",
      type: "overview",
      label: "Panoramica",
      title: `${project.title} / ${project.category}`,
      body: `Un progetto pensato per rafforzare il posizionamento del brand ${project.title} con una direzione creativa coerente su tutti i touchpoint.`,
    },
    {
      id: "approach",
      type: "approach",
      label: "Approccio",
      title: "Metodo di lavoro",
      body: "Strategia, concept e sviluppo esecutivo sono stati costruiti in continuita, con un processo iterativo orientato alla qualita percepita e ai risultati di business.",
    },
    {
      id: "results",
      type: "results",
      label: "Risultato",
      title: "Feedback Cliente",
      body: project.feedbackQuote
        ? `\"${project.feedbackQuote}\"${project.feedbackAuthor ? ` ${project.feedbackAuthor}` : ""}`
        : "Il progetto ha migliorato chiarezza, riconoscibilita e coerenza complessiva della comunicazione.",
    },
  ];
}

// Immagine principale assegnata esplicitamente per ogni progetto.
// Priorita nella visualizzazione: section.image -> project.image -> fallback categoria
const PROJECT_MAIN_IMAGE_BY_ID: Record<string, string> = {
  "pernigotti":              imgEllipse7,
  "sauber-pharma":           imgEllipse4,
  "suaviter":                imgEllipse6,
  "packaging-test-alpha":    imgEllipse7,
  "liabel":                  imgEllipse6,
  "gotha-cosmetic":          imgEllipse4,
  "filo-alfa":               imgEllipse7,
  "brand-lab-test":          imgEllipse4,
  "unicredit":               imgEllipse6,
  "sauber-pharma-btl":       imgEllipse4,
  "piero-trentini":          imgEllipse7,
  "atl-test-beta":           imgEllipse6,
  "andrea-pieralli":         imgEllipse4,
  "italiana-assicurazioni":  imgEllipse7,
  "nissan":                  imgEllipse6,
  "event-test-gamma":        imgEllipse4,
};

const PROJECT_SECTIONS_BY_ID: Record<string, ProjectSection[]> = {
  "pernigotti": [
    {
      id: "overview",
      type: "overview",
      label: "Panoramica",
      title: "Pernigotti / Packaging",
      body: "Restyling del sistema pack per valorizzare la percezione premium della linea e rafforzare continuita visiva tra i touchpoint a scaffale e comunicazione di marca.",
      image: imgEllipse7,
    },
    {
      id: "challenge",
      type: "challenge",
      label: "Challenge",
      title: "Obiettivo di progetto",
      body: "Aumentare riconoscibilita e leggibilita in scaffali ad alta densita, senza perdere il capitale iconico storico del brand.",
      image: imgEllipse7,
    },
    {
      id: "approach",
      type: "approach",
      label: "Approccio",
      title: "Metodo di lavoro",
      body: "Analisi category, nuove gerarchie tipografiche, test progressivi su varianti cromatiche e ottimizzazione del layout per una lettura immediata su formati differenti.",
      image: imgEllipse7,
    },
    {
      id: "deliverables",
      type: "deliverables",
      label: "Deliverables",
      title: "Output principali",
      body: "Architettura pack, key visual, linee guida esecutive e kit di declinazione per estensioni di gamma e materiali promozionali retail.",
      image: imgEllipse7,
    },
    {
      id: "results",
      type: "results",
      label: "Risultato",
      title: "Feedback Cliente",
      body: "Il nuovo packaging comunica perfettamente la qualitÃ  e la tradizione Pernigotti, risultando distintivo e moderno.",
      image: imgEllipse7,
    },
    {
      id: "gallery",
      type: "gallery",
      label: "GALLERY",
      title: "Immagini del progetto",
      body: "",
      media: {
        images: ["https://picsum.photos/seed/proj1a/800/600", "https://picsum.photos/seed/proj1b/800/600", "https://picsum.photos/seed/proj1c/800/600", "https://picsum.photos/seed/proj1d/800/600", "https://picsum.photos/seed/proj1e/800/600", "https://picsum.photos/seed/proj1f/800/600"],
      },
    },
  ],
  "brand-lab-test": [
    {
      id: "overview",
      type: "overview",
      label: "Panoramica",
      title: "Brand Lab Test / Brand",
      body: "Progetto sintetico su singola schermata: definizione di identita visiva, tono e applicazioni essenziali per test rapido di posizionamento.",
      image: imgEllipse4,
    },
    {
      id: "gallery",
      type: "gallery",
      label: "GALLERY",
      title: "Immagini del progetto",
      body: "",
      media: {
        images: ["https://picsum.photos/seed/proj2a/800/600", "https://picsum.photos/seed/proj2b/800/600", "https://picsum.photos/seed/proj2c/800/600", "https://picsum.photos/seed/proj2d/800/600", "https://picsum.photos/seed/proj2e/800/600", "https://picsum.photos/seed/proj2f/800/600"],
      },
    },
  ],
  "sauber-pharma": [
    {
      id: "overview",
      type: "overview",
      label: "Panoramica",
      title: "Sauber Pharma / Packaging",
      body: "Sistema di packaging per linea farmaceutica OTC con forte identita visiva e piena compliance normativa. Progetto sviluppato per garantire massima leggibilita in farmacia e coerenza su tutta la gamma.",
      image: imgEllipse4,
    },
    {
      id: "challenge",
      type: "challenge",
      label: "Challenge",
      title: "Obiettivo di progetto",
      body: "Bilanciare rigore regolatorio con un'identita visiva memorabile, capace di distinguersi su lineari affollati e comunicare benefici in modo immediato.",
      image: imgEllipse4,
    },
    {
      id: "approach",
      type: "approach",
      label: "Approccio",
      title: "Metodo di lavoro",
      body: "Analisi del mercato OTC e dei principali competitor, ridefinizione della gerarchia informativa, sviluppo di un sistema modulare applicabile all'intera gamma con varianti cromatiche per area terapeutica.",
      image: imgEllipse4,
    },
    {
      id: "deliverables",
      type: "deliverables",
      label: "Deliverables",
      title: "Output principali",
      body: "Sistema pack modulare\nLinee guida cromatiche per area terapeutica\nKit declinazioni per estensioni di gamma\nSpecifiche tecniche produzione",
      image: imgEllipse4,
    },
    {
      id: "results",
      type: "results",
      label: "Risultato",
      title: "Feedback Cliente",
      body: "Il nuovo sistema packaging ha migliorato la riconoscibilita in farmacia e semplificato la gestione delle varianti di gamma.",
      image: imgEllipse4,
    },
    {
      id: "gallery",
      type: "gallery",
      label: "GALLERY",
      title: "Immagini del progetto",
      body: "",
      media: {
        images: ["https://picsum.photos/seed/proj3a/800/600", "https://picsum.photos/seed/proj3b/800/600", "https://picsum.photos/seed/proj3c/800/600", "https://picsum.photos/seed/proj3d/800/600", "https://picsum.photos/seed/proj3e/800/600", "https://picsum.photos/seed/proj3f/800/600"],
      },
    },
  ],
  "suaviter": [
    {
      id: "overview",
      type: "overview",
      label: "Panoramica",
      title: "Suaviter / Packaging",
      body: "Progetto packaging per linea cosmetica premium con forte orientamento alla naturalita e all'esperienza sensoriale del prodotto.",
      image: imgEllipse6,
    },
    {
      id: "challenge",
      type: "challenge",
      label: "Challenge",
      title: "Obiettivo di progetto",
      body: "Comunicare premium perception, autenticita naturale e cura artigianale su uno scaffale affollato di riferimenti standardizzati.",
      image: imgEllipse6,
    },
    {
      id: "approach",
      type: "approach",
      label: "Approccio",
      title: "Metodo di lavoro",
      body: "Sviluppo di palette raffinata, gerarchia tipografica con serif di carattere, texture ispirate alla materia prima. Test su piu materiali per garantire coerenza tattile e visiva.",
      image: imgEllipse6,
    },
    {
      id: "deliverables",
      type: "deliverables",
      label: "Deliverables",
      title: "Output principali",
      body: "Pack intera linea prodotto\nKey visual retail\nDeclinazioni per SKU e bundle\nLinee guida materiali e finitura",
      image: imgEllipse6,
    },
    {
      id: "results",
      type: "results",
      label: "Risultato",
      title: "Feedback Cliente",
      body: "Il packaging Suaviter ha ottenuto ottima ricezione al lancio, con feedback molto positivi dalla distribuzione premium.",
      image: imgEllipse6,
    },
    {
      id: "gallery",
      type: "gallery",
      label: "GALLERY",
      title: "Immagini del progetto",
      body: "",
      media: {
        images: ["https://picsum.photos/seed/proj4a/800/600", "https://picsum.photos/seed/proj4b/800/600", "https://picsum.photos/seed/proj4c/800/600", "https://picsum.photos/seed/proj4d/800/600", "https://picsum.photos/seed/proj4e/800/600", "https://picsum.photos/seed/proj4f/800/600"],
      },
    },
  ],
  "packaging-test-alpha": [
    {
      id: "overview",
      type: "overview",
      label: "Panoramica",
      title: "Packaging Test Alpha / Packaging",
      body: "Progetto packaging in fase di test e validazione. Concept sviluppato per esplorare nuove direzioni di posizionamento del brand su un target premium emergente.",
      image: imgEllipse7,
    },
    {
      id: "gallery",
      type: "gallery",
      label: "GALLERY",
      title: "Immagini del progetto",
      body: "",
      media: {
        images: ["https://picsum.photos/seed/proj5a/800/600", "https://picsum.photos/seed/proj5b/800/600", "https://picsum.photos/seed/proj5c/800/600", "https://picsum.photos/seed/proj5d/800/600", "https://picsum.photos/seed/proj5e/800/600", "https://picsum.photos/seed/proj5f/800/600"],
      },
    },
  ],
  "liabel": [
    {
      id: "overview",
      type: "overview",
      label: "Panoramica",
      title: "Liabel / Brand",
      body: "Ridefinizione dell'identita visiva per brand storico dell'abbigliamento intimo, con l'obiettivo di connettere heritage e contemporaneita su un target femminile allargato.",
      image: imgEllipse6,
    },
    {
      id: "challenge",
      type: "challenge",
      label: "Challenge",
      title: "Obiettivo di progetto",
      body: "Rinnovare la brand identity senza perdere il capitale di fiducia accumulato in decenni, avvicinando il brand a un pubblico piu giovane senza alienare la base storica.",
      image: imgEllipse6,
    },
    {
      id: "approach",
      type: "approach",
      label: "Approccio",
      title: "Metodo di lavoro",
      body: "Brand audit approfondito, analisi competitor, evoluzione logo e color palette, sviluppo tono di voce e visual language coerente su digital e retail.",
      image: imgEllipse6,
    },
    {
      id: "deliverables",
      type: "deliverables",
      label: "Deliverables",
      title: "Output principali",
      body: "Logo evolution e sistema colore\nBrand book completo\nApplicazioni retail e packaging\nLinee guida digital e social\nTemplate campagna",
      image: imgEllipse6,
    },
    {
      id: "results",
      type: "results",
      label: "Risultato",
      title: "Feedback Cliente",
      body: "Il progetto ha riposizionato Liabel con successo, con un incremento misurabile della brand recognition e della percezione di modernita.",
      image: imgEllipse6,
    },
    {
      id: "gallery",
      type: "gallery",
      label: "GALLERY",
      title: "Immagini del progetto",
      body: "",
      media: {
        images: ["https://picsum.photos/seed/proj6a/800/600", "https://picsum.photos/seed/proj6b/800/600", "https://picsum.photos/seed/proj6c/800/600", "https://picsum.photos/seed/proj6d/800/600", "https://picsum.photos/seed/proj6e/800/600", "https://picsum.photos/seed/proj6f/800/600"],
      },
    },
  ],
  "gotha-cosmetic": [
    {
      id: "overview",
      type: "overview",
      label: "Panoramica",
      title: "Gotha Cosmetic / Brand",
      body: "Brand identity per linea cosmetica luxury con posizionamento high-end, orientata a un target femminile sofisticato e internazionale.",
      image: imgEllipse4,
    },
    {
      id: "challenge",
      type: "challenge",
      label: "Challenge",
      title: "Obiettivo di progetto",
      body: "Sviluppare un'estetica luxury autentica, capace di dialogare con il retail premium e supportare un posizionamento price aspirazionale.",
      image: imgEllipse4,
    },
    {
      id: "approach",
      type: "approach",
      label: "Approccio",
      title: "Metodo di lavoro",
      body: "Ricerca simbolica approfondita, sviluppo logo su base calligrafica, palette a contrasto con accenti oro, concept di comunicazione raffinato e sobrio.",
      image: imgEllipse4,
    },
    {
      id: "deliverables",
      type: "deliverables",
      label: "Deliverables",
      title: "Output principali",
      body: "Logo e sistema simbolico\nBrand book e palette\nKey visual e mood board\nApplicazioni packaging e materiali",
      image: imgEllipse4,
    },
    {
      id: "results",
      type: "results",
      label: "Risultato",
      title: "Feedback Cliente",
      body: "L'identita Gotha Cosmetic e stata accolta con entusiasmo dai distributori premium, confermando il posizionamento luxury del brand.",
      image: imgEllipse4,
    },
    {
      id: "gallery",
      type: "gallery",
      label: "GALLERY",
      title: "Immagini del progetto",
      body: "",
      media: {
        images: ["https://picsum.photos/seed/proj7a/800/600", "https://picsum.photos/seed/proj7b/800/600", "https://picsum.photos/seed/proj7c/800/600", "https://picsum.photos/seed/proj7d/800/600", "https://picsum.photos/seed/proj7e/800/600", "https://picsum.photos/seed/proj7f/800/600"],
      },
    },
  ],
  "filo-alfa": [
    {
      id: "overview",
      type: "overview",
      label: "Panoramica",
      title: "Filo Alfa / Brand",
      body: "Costruzione ex novo dell'identita di marca per azienda del settore tessile, con forte vocazione artigianale e orientamento al contract e al retail di qualita.",
      image: imgEllipse7,
    },
    {
      id: "challenge",
      type: "challenge",
      label: "Challenge",
      title: "Obiettivo di progetto",
      body: "Creare un'identita distintiva in un settore molto tradizionale, capace di comunicare qualita, affidabilita e capacita di personalizzazione.",
      image: imgEllipse7,
    },
    {
      id: "approach",
      type: "approach",
      label: "Approccio",
      title: "Metodo di lavoro",
      body: "Naming validation, sviluppo logotipo con rimando alla materia filare, palette sobria e materica, sistema di applicazioni per contesti B2B e retail.",
      image: imgEllipse7,
    },
    {
      id: "deliverables",
      type: "deliverables",
      label: "Deliverables",
      title: "Output principali",
      body: "Logo system completo\nBrand guidelines\nApplicazioni: carta intestata, cartellini, buste\nKit digital e social",
      image: imgEllipse7,
    },
    {
      id: "results",
      type: "results",
      label: "Risultato",
      title: "Feedback Cliente",
      body: "Filo Alfa ha lanciato la nuova identita con successo su fiere di settore, ottenendo forte interesse da partner retail e showroom.",
      image: imgEllipse7,
    },
    {
      id: "gallery",
      type: "gallery",
      label: "GALLERY",
      title: "Immagini del progetto",
      body: "",
      media: {
        images: ["https://picsum.photos/seed/proj8a/800/600", "https://picsum.photos/seed/proj8b/800/600", "https://picsum.photos/seed/proj8c/800/600", "https://picsum.photos/seed/proj8d/800/600", "https://picsum.photos/seed/proj8e/800/600", "https://picsum.photos/seed/proj8f/800/600"],
      },
    },
  ],
  "unicredit": [
    {
      id: "overview",
      type: "overview",
      label: "Panoramica",
      title: "Unicredit / BTL & ATL",
      body: "Campagna di comunicazione BTL e ATL per Unicredit, sviluppata per supportare il lancio di un prodotto finanziario retail con obiettivi di awareness e conversion.",
      image: imgEllipse6,
    },
    {
      id: "challenge",
      type: "challenge",
      label: "Challenge",
      title: "Obiettivo di progetto",
      body: "Tradurre un messaggio complesso in comunicazione immediata e impattante, mantenendo il tono istituzionale del brand e differenziandosi su media affollati.",
      image: imgEllipse6,
    },
    {
      id: "approach",
      type: "approach",
      label: "Approccio",
      title: "Metodo di lavoro",
      body: "Concept creativo semplificato, gerarchia visiva focalizzata sul beneficio chiave, sviluppo di formati multi-canale coerenti su OOH, digital e materiali fisici.",
      image: imgEllipse6,
    },
    {
      id: "deliverables",
      type: "deliverables",
      label: "Deliverables",
      title: "Output principali",
      body: "Campagna OOH (formati 6x3, citylight)\nAsset digital (banner, social)\nSoggetti stampa ATL\nKit adattamenti locali",
      image: imgEllipse6,
    },
    {
      id: "results",
      type: "results",
      label: "Risultato",
      title: "Feedback Cliente",
      body: "La campagna ha registrato performance superiori alle aspettative su tutti i canali tracciati, con forte recall assistito.",
      image: imgEllipse6,
    },
    {
      id: "gallery",
      type: "gallery",
      label: "GALLERY",
      title: "Immagini del progetto",
      body: "",
      media: {
        images: ["https://picsum.photos/seed/proj9a/800/600", "https://picsum.photos/seed/proj9b/800/600", "https://picsum.photos/seed/proj9c/800/600", "https://picsum.photos/seed/proj9d/800/600", "https://picsum.photos/seed/proj9e/800/600", "https://picsum.photos/seed/proj9f/800/600"],
      },
    },
  ],
  "sauber-pharma-btl": [
    {
      id: "overview",
      type: "overview",
      label: "Panoramica",
      title: "Sauber Pharma / BTL",
      body: "Progetto comunicazione BTL per Sauber Pharma, focalizzato sull'attivazione punto vendita farmacia e sul supporto al sell-out con materiali mirati.",
      image: imgEllipse4,
    },
    {
      id: "challenge",
      type: "challenge",
      label: "Challenge",
      title: "Obiettivo di progetto",
      body: "Aumentare la visibilita dei prodotti in farmacia e supportare il sell-out con materiali che valorizzino l'expertise del brand senza risultare meramente promozionali.",
      image: imgEllipse4,
    },
    {
      id: "approach",
      type: "approach",
      label: "Approccio",
      title: "Metodo di lavoro",
      body: "Studio dei touchpoint chiave in farmacia, sviluppo sistema di visual merchandising coerente, produzione materiali educativi e di engagement per farmacisti.",
      image: imgEllipse4,
    },
    {
      id: "deliverables",
      type: "deliverables",
      label: "Deliverables",
      title: "Output principali",
      body: "Display PDV modulari\nKit comunicazione farmacista\nMateriali formazione team commerciale\nBanner roll-up e totem",
      image: imgEllipse4,
    },
    {
      id: "results",
      type: "results",
      label: "Risultato",
      title: "Feedback Cliente",
      body: "Il kit BTL ha migliorato in modo significativo la presenza a scaffale e la qualita delle relazioni commerciali con le farmacie.",
      image: imgEllipse4,
    },
    {
      id: "gallery",
      type: "gallery",
      label: "GALLERY",
      title: "Immagini del progetto",
      body: "",
      media: {
        images: ["https://picsum.photos/seed/proj10a/800/600", "https://picsum.photos/seed/proj10b/800/600", "https://picsum.photos/seed/proj10c/800/600", "https://picsum.photos/seed/proj10d/800/600", "https://picsum.photos/seed/proj10e/800/600", "https://picsum.photos/seed/proj10f/800/600"],
      },
    },
  ],
  "piero-trentini": [
    {
      id: "overview",
      type: "overview",
      label: "Panoramica",
      title: "Piero Trentini / BTL & ATL",
      body: "Piano di comunicazione integrata per brand del settore terziario locale, con attivazioni BTL sul territorio e materiali ATL per awareness regionale.",
      image: imgEllipse7,
    },
    {
      id: "challenge",
      type: "challenge",
      label: "Challenge",
      title: "Obiettivo di progetto",
      body: "Costruire riconoscibilita di marca in un mercato locale competitivo con budget focalizzato, massimizzando la presenza su tutti i touchpoint rilevanti.",
      image: imgEllipse7,
    },
    {
      id: "approach",
      type: "approach",
      label: "Approccio",
      title: "Metodo di lavoro",
      body: "Comunicazione locale integrata, visual identity applicata a formati BTL e ATL, coordinamento con il team commerciale per presidio capillare del territorio.",
      image: imgEllipse7,
    },
    {
      id: "deliverables",
      type: "deliverables",
      label: "Deliverables",
      title: "Output principali",
      body: "Campagna outdoor locale\nMateriali BTL: brochure, flyer, roll-up\nAsset digital per campagna locale\nKit coordinato immagine",
      image: imgEllipse7,
    },
    {
      id: "results",
      type: "results",
      label: "Risultato",
      title: "Feedback Cliente",
      body: "Il piano comunicazione ha prodotto un incremento misurabile della notorieta locale e un aumento dei contatti commerciali.",
      image: imgEllipse7,
    },
    {
      id: "gallery",
      type: "gallery",
      label: "GALLERY",
      title: "Immagini del progetto",
      body: "",
      media: {
        images: ["https://picsum.photos/seed/proj11a/800/600", "https://picsum.photos/seed/proj11b/800/600", "https://picsum.photos/seed/proj11c/800/600", "https://picsum.photos/seed/proj11d/800/600", "https://picsum.photos/seed/proj11e/800/600", "https://picsum.photos/seed/proj11f/800/600"],
      },
    },
  ],
  "atl-test-beta": [
    {
      id: "overview",
      type: "overview",
      label: "Panoramica",
      title: "ATL Test Beta / BTL & ATL",
      body: "Progetto campagna ATL in fase di test e validazione. Concept in sviluppo per esplorare nuovi approcci creativi su media tradizionali con target primario 25â€“45 anni.",
      image: imgEllipse6,
    },
    {
      id: "gallery",
      type: "gallery",
      label: "GALLERY",
      title: "Immagini del progetto",
      body: "",
      media: {
        images: ["https://picsum.photos/seed/proj12a/800/600", "https://picsum.photos/seed/proj12b/800/600", "https://picsum.photos/seed/proj12c/800/600", "https://picsum.photos/seed/proj12d/800/600", "https://picsum.photos/seed/proj12e/800/600", "https://picsum.photos/seed/proj12f/800/600"],
      },
    },
  ],
  "andrea-pieralli": [
    {
      id: "overview",
      type: "overview",
      label: "Panoramica",
      title: "Andrea Pieralli / Events",
      body: "Event concept e comunicazione per progetto artistico e culturale, con sviluppo di brand evento, materiali di promozione e visual on-site.",
      image: imgEllipse4,
    },
    {
      id: "challenge",
      type: "challenge",
      label: "Challenge",
      title: "Obiettivo di progetto",
      body: "Creare un'identita visiva per evento culturale capace di comunicare autorevolezza e accessibilita, attraendo pubblico variegato e media di settore.",
      image: imgEllipse4,
    },
    {
      id: "approach",
      type: "approach",
      label: "Approccio",
      title: "Metodo di lavoro",
      body: "Concept visivo forte, identita evento coerente su tutti i formati, sviluppo materiali di promozione, coordinamento produzione e visual per il giorno dell'evento.",
      image: imgEllipse4,
    },
    {
      id: "deliverables",
      type: "deliverables",
      label: "Deliverables",
      title: "Output principali",
      body: "Brand evento completo\nMateriali promo: poster, inviti, brochure\nAsset digital e social\nVisual produzione on-site",
      image: imgEllipse4,
    },
    {
      id: "results",
      type: "results",
      label: "Risultato",
      title: "Feedback Cliente",
      body: "L'evento ha registrato una presenza oltre le aspettative, con forte copertura mediatica e feedback molto positivi da pubblico e stampa.",
      image: imgEllipse4,
    },
    {
      id: "gallery",
      type: "gallery",
      label: "GALLERY",
      title: "Immagini del progetto",
      body: "",
      media: {
        images: ["https://picsum.photos/seed/proj13a/800/600", "https://picsum.photos/seed/proj13b/800/600", "https://picsum.photos/seed/proj13c/800/600", "https://picsum.photos/seed/proj13d/800/600", "https://picsum.photos/seed/proj13e/800/600", "https://picsum.photos/seed/proj13f/800/600"],
      },
    },
  ],
  "italiana-assicurazioni": [
    {
      id: "overview",
      type: "overview",
      label: "Panoramica",
      title: "Italiana Assicurazioni / Events",
      body: "Evento corporate per brand assicurativo, sviluppato per rafforzare la relazione con la rete agenziale e presentare nuovi prodotti in un contesto di alto profilo.",
      image: imgEllipse7,
    },
    {
      id: "challenge",
      type: "challenge",
      label: "Challenge",
      title: "Obiettivo di progetto",
      body: "Progettare un'esperienza evento coerente con l'identita istituzionale del brand, capace di motivare la rete commerciale e valorizzare i nuovi lanci di prodotto.",
      image: imgEllipse7,
    },
    {
      id: "approach",
      type: "approach",
      label: "Approccio",
      title: "Metodo di lavoro",
      body: "Visual event identity integrata con le guidelines corporate, sviluppo allestimenti di rappresentanza, materiali di sala e asset di comunicazione digitale.",
      image: imgEllipse7,
    },
    {
      id: "deliverables",
      type: "deliverables",
      label: "Deliverables",
      title: "Output principali",
      body: "Visual event identity\nAllestimenti e segnaletica evento\nKit materiali di sala\nAsset digital e post-event",
      image: imgEllipse7,
    },
    {
      id: "results",
      type: "results",
      label: "Risultato",
      title: "Feedback Cliente",
      body: "L'evento ha ottenuto un eccellente riscontro dalla rete agenziale, contribuendo in modo significativo al lancio dei nuovi prodotti assicurativi.",
      image: imgEllipse7,
    },
    {
      id: "gallery",
      type: "gallery",
      label: "GALLERY",
      title: "Immagini del progetto",
      body: "",
      media: {
        images: ["https://picsum.photos/seed/proj14a/800/600", "https://picsum.photos/seed/proj14b/800/600", "https://picsum.photos/seed/proj14c/800/600", "https://picsum.photos/seed/proj14d/800/600", "https://picsum.photos/seed/proj14e/800/600", "https://picsum.photos/seed/proj14f/800/600"],
      },
    },
  ],
  "nissan": [
    {
      id: "overview",
      type: "overview",
      label: "Panoramica",
      title: "Nissan / Events",
      body: "Evento lancio prodotto automotive per Nissan, pensato come experience immersiva capace di coinvolgere media, dealer e pubblico appassionato.",
      image: imgEllipse6,
    },
    {
      id: "challenge",
      type: "challenge",
      label: "Challenge",
      title: "Obiettivo di progetto",
      body: "Creare un'esperienza evento memorabile che traduca i valori del brand in un'atmosfera di forte impatto emotivo, massimizzando la copertura mediatica.",
      image: imgEllipse6,
    },
    {
      id: "approach",
      type: "approach",
      label: "Approccio",
      title: "Metodo di lavoro",
      body: "Concept esperienziale integrato, sviluppo visual ad alto impatto, coordinamento con il team Nissan per selezione location e gestione produzione evento.",
      image: imgEllipse6,
    },
    {
      id: "deliverables",
      type: "deliverables",
      label: "Deliverables",
      title: "Output principali",
      body: "Stand e allestimenti evento\nKit visual e brandizzazione location\nMateriali media kit\nAsset digital e social per l'evento",
      image: imgEllipse6,
    },
    {
      id: "results",
      type: "results",
      label: "Risultato",
      title: "Feedback Cliente",
      body: "Il lancio ha generato grande attenzione mediatica e un alto engagement sui canali social, superando gli obiettivi di reach iniziali.",
      image: imgEllipse6,
    },
    {
      id: "gallery",
      type: "gallery",
      label: "GALLERY",
      title: "Immagini del progetto",
      body: "",
      media: {
        images: ["https://picsum.photos/seed/proj15a/800/600", "https://picsum.photos/seed/proj15b/800/600", "https://picsum.photos/seed/proj15c/800/600", "https://picsum.photos/seed/proj15d/800/600", "https://picsum.photos/seed/proj15e/800/600", "https://picsum.photos/seed/proj15f/800/600"],
      },
    },
  ],
  "event-test-gamma": [
    {
      id: "overview",
      type: "overview",
      label: "Panoramica",
      title: "Event Test Gamma / Events",
      body: "Progetto evento in fase di concept e validazione. Idea creativa in sviluppo per un'attivazione esperienziale su target B2C con un approccio innovativo alla brand experience.",
      image: imgEllipse4,
    },
    {
      id: "gallery",
      type: "gallery",
      label: "GALLERY",
      title: "Immagini del progetto",
      body: "",
      media: {
        images: ["https://picsum.photos/seed/proj16a/800/600", "https://picsum.photos/seed/proj16b/800/600", "https://picsum.photos/seed/proj16c/800/600", "https://picsum.photos/seed/proj16d/800/600", "https://picsum.photos/seed/proj16e/800/600", "https://picsum.photos/seed/proj16f/800/600"],
      },
    },
  ],
};

const PROJECT_VISUALS_BY_CATEGORY: Record<string, string[]> = {
  "Packaging": [imgEllipse7, imgEllipse6, imgEllipse4],
  "Brand": [imgEllipse4, imgEllipse7, imgEllipse6],
  "BTL & ATL": [imgEllipse6, imgEllipse4, imgEllipse7],
  "EVENTS": [imgEllipse6, imgEllipse7, imgEllipse4],
};

function getProjectVisualSeed(projectId: string) {
  return projectId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

function enrichProjectSection(section: ProjectSection, project: { id: string; title: string; category: string; image?: string; feedbackQuote?: string; feedbackAuthor?: string }, index: number, total: number): ProjectSection {
  const visuals = PROJECT_VISUALS_BY_CATEGORY[project.category] ?? [imgEllipse4, imgEllipse6, imgEllipse7];
  const seed = getProjectVisualSeed(project.id);
  // Fallback costante per progetto: project.image ha precedenza, poi visuals[seed % n] (NON cycling per sezione)
  const projectFallbackImage = project.image ?? visuals[seed % visuals.length];
  const secondaryImage = visuals[(seed + 1) % visuals.length];
  const tertiaryImage = visuals[(seed + 2) % visuals.length];
  const sectionFallbackImage = section.image || projectFallbackImage;
  const mediaFallbackImage = section.media?.image || sectionFallbackImage;
  const mediaFallbackImages = section.media?.images && section.media.images.length > 0
    ? section.media.images
    : [sectionFallbackImage, secondaryImage, tertiaryImage];

  const nextSection: ProjectSection = {
    ...section,
    // Propaga sempre section.image: usa il campo esplicito, poi l'immagine del progetto
    image: sectionFallbackImage,
    highlights: section.highlights ?? [project.category, project.title, `Sezione ${index + 1}/${total}`],
    media: {
      ...(section.media ?? {}),
      image: mediaFallbackImage,
      images: mediaFallbackImages,
    },
  };

  if (section.type === "overview") {
    nextSection.kpis = section.kpis ?? [
      { label: "Categoria", value: project.category },
      { label: "Focus", value: "Brand Experience" },
      { label: "Scope", value: `${total} sezioni` },
    ];
  }

  if (section.type === "deliverables") {
    nextSection.kpis = section.kpis ?? [
      { label: "Categoria", value: project.category },
      { label: "Scope", value: `${total} sezioni` },
    ];
  }

  if (section.type === "results") {
    nextSection.kpis = section.kpis ?? [
      { label: "Impatto", value: "Premium" },
      { label: "Percezione", value: "Elevata" },
      { label: "Output", value: "Completo" },
    ];
    nextSection.quote = section.quote ?? (project.feedbackQuote
      ? { text: project.feedbackQuote, author: project.feedbackAuthor }
      : undefined);
  }

  if (section.type === "gallery") {
    nextSection.media = {
      image: mediaFallbackImage,
      images: mediaFallbackImages,
      video: section.media?.video,
    };
  }

  return nextSection;
}

function resolveProjectSections(project: {
  id: string;
  title: string;
  category: string;
  image?: string;
  feedbackQuote?: string;
  feedbackAuthor?: string;
}): ProjectSection[] {
  const customSections = PROJECT_SECTIONS_BY_ID[project.id];
  if (customSections && customSections.length > 0) {
    return customSections.map((section, index) => enrichProjectSection(section, project, index, customSections.length));
  }

  const fallbackSections = buildDefaultProjectSections(project);
  return fallbackSections.map((section, index) => enrichProjectSection(section, project, index, fallbackSections.length));
}

function getAllProjects(): CarouselProject[] {
  return PROJECT_LIST_CATEGORIES.flatMap((category) =>
    category.items.map((item) => {
      const featured = "featuredIndex" in item ? FEATURED_PROJECTS[(item as { featuredIndex: number }).featuredIndex] : null;
      const feedbackQuote = featured?.feedbackQuote as string | undefined;
      const feedbackAuthor = featured?.feedbackAuthor as string | undefined;
      const projectImage = PROJECT_MAIN_IMAGE_BY_ID[item.id];
      return {
        id: item.id,
        title: item.label,
        category: category.label,
        image: projectImage,
        sections: resolveProjectSections({
          id: item.id,
          title: item.label,
          category: category.label,
          image: projectImage,
          feedbackQuote,
          feedbackAuthor,
        }),
        feedbackQuote,
        feedbackAuthor,
      };
    })
  );
}

function getProjectsForService(serviceName?: string): CarouselProject[] {
  if (!serviceName) {
    return getAllProjects();
  }
  const categoryLabel = SERVICE_TO_CATEGORY[serviceName] || serviceName;
  const category = PROJECT_LIST_CATEGORIES.find(c => c.label === categoryLabel);
  if (!category) return [];
  return category.items.map(item => {
    const featured = "featuredIndex" in item ? FEATURED_PROJECTS[(item as { featuredIndex: number }).featuredIndex] : null;
    const feedbackQuote = featured?.feedbackQuote as string | undefined;
    const feedbackAuthor = featured?.feedbackAuthor as string | undefined;
    const projectImage = PROJECT_MAIN_IMAGE_BY_ID[item.id];
    return {
      id: item.id,
      title: item.label,
      category: category.label,
      image: projectImage,
      sections: resolveProjectSections({
        id: item.id,
        title: item.label,
        category: category.label,
        image: projectImage,
        feedbackQuote,
        feedbackAuthor,
      }),
      feedbackQuote,
      feedbackAuthor,
    };
  });
}

function getProjectsRoute(service?: string, projectId?: string, sectionIndex = 0) {
  const base = projectId ? `/progetti/${projectId}/sezione/${Math.max(0, sectionIndex)}` : "/progetti";
  if (!service) return base;
  const qs = new URLSearchParams({ servizio: service }).toString();
  return `${base}?${qs}`;
}

function parseProjectsRoute() {
  const { pathname, search, hash } = window.location;
  const normalizedPath = decodeURIComponent(pathname).toLowerCase().replace(/\/+$/, "");
  const compactPath = normalizedPath.replace(/\s+/g, "-");

  const routeAliases = ["/progetti", "/scopri-progetti", "/scorpii-progetti", "/scoprii-progetti", "/scorpi-progetti"];
  const matchedAlias = routeAliases.find((alias) => compactPath === alias || compactPath.startsWith(`${alias}/`));
  const isLegacyHashRoute = hash.toLowerCase() === "#progetti";

  if (!matchedAlias && !isLegacyHashRoute) {
    return {
      isProjects: false,
      service: undefined as string | undefined,
      projectId: undefined as string | undefined,
      sectionIndex: undefined as number | undefined,
      needsCanonical: false,
    };
  }

  const slug = matchedAlias ? compactPath.slice(matchedAlias.length).replace(/^\/+/, "") : "";
  const slugParts = slug.length > 0 ? slug.split("/") : [];
  const projectId = slugParts.length > 0 ? decodeURIComponent(slugParts[0]) : undefined;
  const sectionIndexRaw = slugParts.length >= 3 && slugParts[1] === "sezione" ? Number(slugParts[2]) : undefined;
  const sectionIndex = Number.isFinite(sectionIndexRaw) && (sectionIndexRaw as number) >= 0
    ? Math.floor(sectionIndexRaw as number)
    : 0;
  const params = new URLSearchParams(search);
  const service = params.get("servizio") ?? undefined;
  const needsCanonical = isLegacyHashRoute || (!!matchedAlias && matchedAlias !== "/progetti");
  return { isProjects: true, service, projectId, sectionIndex, needsCanonical };
}

function ProjectsPage({
  onBack,
  service,
  initialProjectId,
  initialSectionIndex,
  onProjectChange,
}: {
  onBack: () => void;
  service?: string;
  initialProjectId?: string;
  initialSectionIndex?: number;
  onProjectChange?: (projectId: string, sectionIndex: number) => void;
}) {
  const projects = useMemo(() => getProjectsForService(service), [service]);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const showStyleDebugMarker = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("debug-style") === "1";
  }, []);

  // Compute initial index once from initialProjectId
  const initialIndex = useMemo(() => {
    if (!initialProjectId || projects.length === 0) return 0;
    const idx = projects.findIndex((p) => p.id === initialProjectId);
    return idx >= 0 ? idx : 0;
  }, [initialProjectId, projects]);

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [projectSectionIndex, setProjectSectionIndex] = useState(Math.max(0, initialSectionIndex ?? 0));
  const total = projects.length;
  const activeProject = projects[activeIndex] ?? null;
  const touchStartYRef = useRef<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  // Ref to the scrollable inner container of the active project section
  const sectionScrollRef = useRef<HTMLDivElement>(null);

  // Keep a ref to onProjectChange so the effect never re-fires due to callback identity
  const onProjectChangeRef = useRef(onProjectChange);
  onProjectChangeRef.current = onProjectChange;

  // FIX 1: Misura altezza header e salva in CSS variable
  useEffect(() => {
    if (!headerRef.current) return;
    const updateHeaderHeight = () => {
      const height = headerRef.current?.getBoundingClientRect().height ?? 140;
      document.documentElement.style.setProperty('--header-bottom', `${height}px`);
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
    setProjectSectionIndex(0);
  }, [total]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    setProjectSectionIndex(0);
  }, [total]);

  const projectSectionCount = Math.max(1, activeProject?.sections.length ?? 1);
  const safeProjectSectionIndex = Math.min(Math.max(projectSectionIndex, 0), projectSectionCount - 1);
  const projectScrollLockRef = useRef(false);
  const projectUnlockTimeoutRef = useRef<number | null>(null);
  const activeProjectRef = useRef(activeProject);
  const projectSectionCountRef = useRef(projectSectionCount);
  const safeProjectSectionIndexRef = useRef(safeProjectSectionIndex);
  const totalRef = useRef(total);

  activeProjectRef.current = activeProject;
  projectSectionCountRef.current = projectSectionCount;
  safeProjectSectionIndexRef.current = safeProjectSectionIndex;
  totalRef.current = total;

  const unlockProjectScroll = useCallback((delay: number) => {
    if (projectUnlockTimeoutRef.current !== null) {
      window.clearTimeout(projectUnlockTimeoutRef.current);
    }

    projectUnlockTimeoutRef.current = window.setTimeout(() => {
      projectScrollLockRef.current = false;
      projectUnlockTimeoutRef.current = null;
    }, delay);
  }, []);

  const navigateProjectScroll = useCallback((direction: "next" | "prev") => {
    if (projectScrollLockRef.current || !activeProjectRef.current) return;

    projectScrollLockRef.current = true;

    const currentSectionCount = projectSectionCountRef.current;
    const currentSectionIndex = safeProjectSectionIndexRef.current;
    const currentTotal = totalRef.current;

    if (direction === "next") {
      if (currentSectionIndex < currentSectionCount - 1) {
        setProjectSectionIndex((prev) => prev + 1);
        unlockProjectScroll(650);
        return;
      }

      setActiveIndex((prev) => (prev === currentTotal - 1 ? 0 : prev + 1));
      setProjectSectionIndex(0);
      unlockProjectScroll(850);
      return;
    }

    if (currentSectionIndex > 0) {
      setProjectSectionIndex((prev) => prev - 1);
      unlockProjectScroll(650);
      return;
    }

    setActiveIndex((prev) => (prev === 0 ? currentTotal - 1 : prev - 1));
    setProjectSectionIndex(0);
    unlockProjectScroll(850);
  }, [unlockProjectScroll]);

  const activeProjectSection = activeProject?.sections[safeProjectSectionIndex] ?? {
    id: "overview",
    type: "overview",
    label: "Panoramica",
    title: "",
    body: "",
  };
  const firstSectionImage = activeProject?.sections[0]?.media?.image ?? activeProject?.sections[0]?.image;
  const activeSectionImage = activeProjectSection.media?.image ?? activeProjectSection.image ?? firstSectionImage;
  const resolvedActiveProjectSection = {
    ...activeProjectSection,
    image: activeSectionImage,
    media: {
      ...(activeProjectSection.media ?? {}),
      image: activeSectionImage,
    },
  };

  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    setProjectSectionIndex(Math.max(0, initialSectionIndex ?? 0));
  }, [initialSectionIndex, initialProjectId]);

  useEffect(() => {
    if (projectSectionIndex <= projectSectionCount - 1) return;
    setProjectSectionIndex(projectSectionCount - 1);
  }, [projectSectionCount, projectSectionIndex]);

  useEffect(() => {
    const handleProjectWheel = (e: WheelEvent) => {
      const el = sectionScrollRef.current;

      if (el) {
        // Get dimensions with debug info
        const rect = el.getBoundingClientRect();
        const scrollable = el.scrollHeight > el.clientHeight + 4;
        const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
        const atTop = el.scrollTop <= 10;

        // Enhanced debug logging
        if (Math.abs(e.deltaY) > 20) {
          console.log(`[Wheel] ref=${el ? 'attached' : 'null'}, scrollable=${scrollable}`);
          console.log(`  scrollHeight=${el.scrollHeight}, clientHeight=${el.clientHeight}, diff=${el.scrollHeight - el.clientHeight}`);
          console.log(`  scrollTop=${el.scrollTop}, atTop=${atTop}, atBottom=${atBottom}`);
          console.log(`  rect.height=${rect.height}, deltaY=${e.deltaY}`);
        }

        // PARTE B: Internal scroll logic with generous thresholds
        if (scrollable) {
          if (e.deltaY > 0 && !atBottom) {
            e.preventDefault();
            el.scrollBy({ top: 100, behavior: "smooth" });
            console.log(`[Wheel] ✓ Scrolling DOWN internally`);
            return;
          }

          if (e.deltaY < 0 && !atTop) {
            e.preventDefault();
            el.scrollBy({ top: -100, behavior: "smooth" });
            console.log(`[Wheel] ✓ Scrolling UP internally`);
            return;
          }
        }
      }

      // If no internal scroll happened, try section navigation
      if (Math.abs(e.deltaY) < 45) return;

      e.preventDefault();
      console.log(`[Wheel] → Navigating section, deltaY=${e.deltaY}`);
      navigateProjectScroll(e.deltaY > 0 ? "next" : "prev");
    };

    window.addEventListener("wheel", handleProjectWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleProjectWheel);
    };
  }, [navigateProjectScroll]);

  useEffect(() => {
    return () => {
      if (projectUnlockTimeoutRef.current !== null) {
        window.clearTimeout(projectUnlockTimeoutRef.current);
        projectUnlockTimeoutRef.current = null;
      }
      projectScrollLockRef.current = false;
    };
  }, []);

  const handleProjectTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.targetTouches[0].clientY;
  };

  const handleProjectTouchEnd = (e: React.TouchEvent) => {
    if (touchStartYRef.current === null) return;

    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStartYRef.current - touchEnd;

    if (Math.abs(diff) > 50) {
      // Check inner scroll state (native touch scrolling may have already moved the container)
      if (sectionScrollRef.current) {
        const el = sectionScrollRef.current;
        if (diff > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 5) {
          // Inner content is not yet at the bottom — native scroll handled it
          touchStartYRef.current = null;
          return;
        }
        if (diff < 0 && el.scrollTop > 5) {
          // Inner content is not yet at the top — native scroll handled it
          touchStartYRef.current = null;
          return;
        }
      }
      navigateProjectScroll(diff > 0 ? "next" : "prev");
    }

    touchStartYRef.current = null;
  };

  // Notify parent only when activeIndex changes (not on callback identity change)
  useEffect(() => {
    if (!activeProject?.id) return;
    onProjectChangeRef.current?.(activeProject.id, safeProjectSectionIndex);
  }, [activeProject?.id, safeProjectSectionIndex]);

  if (!activeProject || total === 0) {
    return (
      <div className="fixed inset-0 w-full h-full font-['Inter',sans-serif] flex flex-col items-center justify-center" style={{ backgroundColor: "#ffffff" }}>
        <p className="text-[20px] md:text-[28px] text-[#7d7b79] mb-6">Nessun progetto disponibile per questa categoria.</p>
        <button onClick={onBack} className="group flex items-center gap-2 font-bold text-[16px] md:text-[18px] text-[#d72488] transition-all duration-300 hover:gap-3">
          <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Torna ai servizi
        </button>
      </div>
    );
  }

  return (
    <div
      className="font-['Inter',sans-serif]"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 0,
      }}
      onTouchStart={handleProjectTouchStart}
      onTouchEnd={handleProjectTouchEnd}
    >
      {showStyleDebugMarker && (
        <div
          className="fixed pointer-events-none"
          style={{
            top: isMobile ? 16 : 20,
            right: isMobile ? 16 : 20,
            zIndex: 160,
            padding: isMobile ? "8px 12px" : "10px 14px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.35)",
            background: "linear-gradient(120deg, #7EB83A, #C94B8F)",
            color: "#ffffff",
            fontWeight: 800,
            fontSize: isMobile ? "11px" : "12px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            boxShadow: "0 14px 30px rgba(0,0,0,0.18)",
          }}
        >
          style-check: {activeProject.id} / {safeProjectSectionIndex}
        </div>
      )}

      {/* Compact Header â€” non-animated, flex sibling above content */}
      <div
        ref={headerRef}
        style={{
          width: '100%',
          flexShrink: 0,
          zIndex: 140,
          padding: isMobile ? '10px 16px 6px' : '14px clamp(20px, 4vw, 40px) 6px',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          pointerEvents: 'auto',
        }}
      >
        {/* Row 1: back pill | title (centered) | project index */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onBack(); }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: isMobile ? "9px 12px" : "10px 14px",
              borderRadius: 999,
              border: "1px solid rgba(215, 36, 136, 0.25)",
              background: "rgba(255,255,255,0.82)",
              color: "#7d7b79",
              fontWeight: 700,
              fontSize: isMobile ? "14px" : "16px",
              lineHeight: 1,
              textDecoration: "none",
              whiteSpace: "nowrap",
              backdropFilter: "blur(12px)",
              boxShadow: "0 10px 28px rgba(16,16,16,0.08)",
              flexShrink: 0,
            }}
          >
            <svg style={{ width: 20, height: 20, color: "#d72488", pointerEvents: "none", flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            Torna ai servizi
          </a>

          <p style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            margin: 0,
            fontWeight: 900,
            fontSize: isMobile ? '20px' : 'clamp(1.75rem, 2.5vw, 2rem)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}>
            <span style={{ color: '#111' }}>{String(activeIndex + 1).padStart(2, "0")}</span>
            <span style={{ color: '#aaa' }}> / </span>
            <span style={{ color: '#d72488' }}>{activeProject.title}</span>
          </p>

          <span style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: 11,
            color: '#aaa',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            PROJECT INDEX {activeIndex + 1}/{total}
          </span>
        </div>

        {/* Row 2: tag pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ display: 'inline-flex', border: '1px solid #d9d9d9', borderRadius: 999, padding: '4px 12px', fontSize: 12, color: '#101010', fontWeight: 600, background: 'rgba(255,255,255,0.75)' }}>
            {activeProject.category}
          </span>
          <span style={{ display: 'inline-flex', border: '1px solid #d9d9d9', borderRadius: 999, padding: '4px 12px', fontSize: 12, color: '#616773', fontWeight: 600, background: 'linear-gradient(to right, rgba(222,92,161,0.08), rgba(118,183,41,0.08))' }}>
            Structured project narrative
          </span>
        </div>
      </div>

      {/* Project Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeProject.id}-${projectSectionIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="relative z-20 w-full pointer-events-none"
          style={{ willChange: "opacity", flex: 1, minHeight: 0 }}
        >
          {/* Content area â€” fills all remaining height below the compact header */}
          <div style={{ position: 'absolute', inset: 0 }} className="pointer-events-auto">
            <ProjectSectionRenderer
              section={resolvedActiveProjectSection}
              project={activeProject}
              sectionIndex={safeProjectSectionIndex}
              sectionCount={projectSectionCount}
              scrollContainerRef={sectionScrollRef}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Carousel Arrows removed â€” project navigation handled by Prev/Next pill below */}

      <div
        className="fixed pointer-events-auto"
        style={{
          left: "50%",
          bottom: isMobile ? 64 : 56,
          transform: "translateX(-50%)",
          zIndex: 130,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <button
          type="button"
          onClick={goPrev}
          style={{
            padding: "10px 22px",
            borderRadius: 46,
            border: "1.5px solid #d5d0c8",
            background: "#dfd9cf",
            color: "#101010",
            fontWeight: 700,
            fontSize: isMobile ? "14px" : "15px",
            lineHeight: 1,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {"←"} {isMobile ? "Prev" : "Progetto precedente"}
        </button>
        <button
          type="button"
          onClick={goNext}
          style={{
            padding: "10px 22px",
            borderRadius: 46,
            border: "1.5px solid #d5d0c8",
            background: "#dfd9cf",
            color: "#101010",
            fontWeight: 700,
            fontSize: isMobile ? "14px" : "15px",
            lineHeight: 1,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {isMobile ? "Next" : "Progetto successivo"} {"→"}
        </button>
      </div>

      <div className="fixed pointer-events-auto" style={{ right: 24, top: "50%", transform: "translateY(-50%)", zIndex: 130, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#616773", lineHeight: 1, whiteSpace: "nowrap", marginBottom: 2 }}>
          {safeProjectSectionIndex + 1} / {projectSectionCount}
        </span>
        {Array.from({ length: projectSectionCount }).map((_, idx) => (
          <button
            key={`section-${idx}`}
            type="button"
            onClick={() => setProjectSectionIndex(idx)}
            aria-label={`Vai alla sezione progetto ${idx + 1}`}
            style={{
              borderRadius: '50%',
              cursor: "pointer",
              transition: "all 0.2s",
              padding: 0,
              width: safeProjectSectionIndex === idx ? 10 : 8,
              height: safeProjectSectionIndex === idx ? 10 : 8,
              background: safeProjectSectionIndex === idx
                ? "linear-gradient(to bottom, #de5ca1, #76b729)"
                : "transparent",
              border: safeProjectSectionIndex === idx ? "none" : "1.5px solid #d9609b",
              opacity: 1,
            }}
          />
        ))}
      </div>
    </div>
  );
}


// --- MAIN APP ---

export default function Home() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0); // State for internal section slides
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentPage, setCurrentPage] = useState<"home" | "projects">("home");
  const [projectsFilter, setProjectsFilter] = useState<string | undefined>();
  const [projectSlug, setProjectSlug] = useState<string | undefined>();
  const [projectSectionSlug, setProjectSectionSlug] = useState<number | undefined>();
  const activeSection = SECTIONS[activeSectionIndex] ?? "mission";

  // Touch handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const activeSectionIndexRef = useRef(activeSectionIndex);
  const subIndexRef = useRef(subIndex);
  const isScrollingRef = useRef(isScrolling);
  const currentPageRef = useRef(currentPage);
  const scrollUnlockTimeoutRef = useRef<number | null>(null);

  activeSectionIndexRef.current = activeSectionIndex;
  subIndexRef.current = subIndex;
  isScrollingRef.current = isScrolling;
  currentPageRef.current = currentPage;

  const scheduleScrollUnlock = useCallback((delay: number) => {
    if (scrollUnlockTimeoutRef.current !== null) {
      window.clearTimeout(scrollUnlockTimeoutRef.current);
    }

    scrollUnlockTimeoutRef.current = window.setTimeout(() => {
      setIsScrolling(false);
      isScrollingRef.current = false;
      scrollUnlockTimeoutRef.current = null;
    }, delay);
  }, []);

  const navigateByScrollDirection = useCallback((direction: "next" | "prev") => {
    if (currentPageRef.current !== "home" || isScrollingRef.current) {
      return;
    }

    const currentSection = SECTIONS[activeSectionIndexRef.current] ?? "mission";
    const subSlideCount = getSectionSlideCount(currentSection);

    isScrollingRef.current = true;
    setIsScrolling(true);

    if (direction === "next") {
      if (subIndexRef.current < subSlideCount - 1) {
        setSubIndex((prev) => prev + 1);
        scheduleScrollUnlock(800);
        return;
      }

      if (activeSectionIndexRef.current < SECTIONS.length - 1) {
        setActiveSectionIndex((prev) => prev + 1);
        setSubIndex(0);
        scheduleScrollUnlock(1000);
        return;
      }
    } else {
      if (subIndexRef.current > 0) {
        setSubIndex((prev) => prev - 1);
        scheduleScrollUnlock(800);
        return;
      }

      if (activeSectionIndexRef.current > 0) {
        const prevIndex = activeSectionIndexRef.current - 1;
        const prevSection = SECTIONS[prevIndex] ?? "mission";
        const prevSlideCount = getSectionSlideCount(prevSection);

        setActiveSectionIndex(prevIndex);
        setSubIndex(prevSlideCount - 1);
        scheduleScrollUnlock(1000);
        return;
      }
    }

    setIsScrolling(false);
    isScrollingRef.current = false;
  }, [scheduleScrollUnlock]);

  // Handle path-based navigation
  useEffect(() => {
    const syncFromPath = () => {
      const route = parseProjectsRoute();
      if (route.isProjects) {
        setCurrentPage("projects");
        setProjectsFilter(route.service);
        setProjectSlug(route.projectId);
        setProjectSectionSlug(route.sectionIndex ?? 0);
        if (route.needsCanonical) {
          window.history.replaceState({}, "", getProjectsRoute(route.service, route.projectId, route.sectionIndex ?? 0));
        }
      } else {
        setCurrentPage("home");
        setProjectSlug(undefined);
        setProjectSectionSlug(undefined);
      }
    };
    window.addEventListener("popstate", syncFromPath);
    syncFromPath();
    return () => window.removeEventListener("popstate", syncFromPath);
  }, []);

  // Scroll Jacking Logic
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (currentPageRef.current !== "home") return;
      if (Math.abs(e.deltaY) < 50) return;

      e.preventDefault();
      navigateByScrollDirection(e.deltaY > 0 ? "next" : "prev");
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (scrollUnlockTimeoutRef.current !== null) {
        window.clearTimeout(scrollUnlockTimeoutRef.current);
      }
    };
  }, [navigateByScrollDirection]);

  // Touch Events for Mobile Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    if (isScrollingRef.current || currentPageRef.current !== "home") return;

    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) { // Threshold 50px
      navigateByScrollDirection(diff > 0 ? "next" : "prev");
    }
    setTouchStart(null);
  };

  const handleNavigate = (id: string) => {
    const idx = SECTIONS.indexOf(id);
    if (idx !== -1) {
        setActiveSectionIndex(idx);
        setSubIndex(0);
    }
  };

  const handleViewProjects = (category?: string) => {
    const projects = getProjectsForService(category);
    const firstProjectId = projects[0]?.id;
    setProjectsFilter(category);
    setProjectSlug(firstProjectId);
    setProjectSectionSlug(0);
    setCurrentPage("projects");
    window.history.pushState({}, "", getProjectsRoute(category, firstProjectId, 0));
  };

  const handleBackFromProjects = useCallback(() => {
    setCurrentPage("home");
    window.history.pushState({}, "", "/");
  }, []);

  const handleProjectChange = useCallback((projectId: string, sectionIndex: number) => {
    setProjectSlug(projectId);
    setProjectSectionSlug(sectionIndex);

    const nextUrl = getProjectsRoute(projectsFilter, projectId, sectionIndex);
    const currentUrl = `${window.location.pathname}${window.location.search}`;
    if (nextUrl !== currentUrl) {
      window.history.pushState({}, "", nextUrl);
    }
  }, [projectsFilter]);

  if (currentPage === "projects") {
    return (
      <ProjectsPage
        onBack={handleBackFromProjects}
        service={projectsFilter}
        initialProjectId={projectSlug}
        initialSectionIndex={projectSectionSlug}
        onProjectChange={handleProjectChange}
      />
    );
  }

  return (
    <div 
        className="bg-transparent relative w-screen h-screen overflow-visible font-['Inter',sans-serif]"
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
           onViewProjects={handleViewProjects}
         />
      </div>
    </div>
  );
}


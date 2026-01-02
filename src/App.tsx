import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react@0.487.0";
import svgPaths from "./imports/svg-53xjlwfhm8";
import imgLogoPxme1RemovebgPreview1 from "figma:asset/6a675323d9240b366f4179dd86927cbd63e012a9.png";
import imgEllipse6 from "figma:asset/0dbe7327a1bc1513d7647c295c4c604c864397d2.png";
import imgEllipse4 from "figma:asset/7fa13a594a8b2c9fe104df3624d3e796b2311c01.png";
import imgEllipse7 from "figma:asset/a328796418d2639bd6edd07e60315aef07caa296.png";

// --- CONFIGURAZIONE SEZIONI ---
const SECTIONS = ["mission", "chi-siamo", "servizi", "progetti", "contattaci"];

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

const SECTION_COUNTS = {
  "mission": 1,
  "chi-siamo": 3,
  "servizi": SERVIZI_ITEMS.length,
  "progetti": 1,
  "contattaci": 1
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
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[95vw] sm:w-[85vw] sm:h-[85vw] md:w-[75vw] md:h-[75vw] lg:left-auto lg:right-[12vw] xl:right-[15vw] lg:w-[700px] lg:h-[700px] xl:w-[946px] xl:h-[946px] lg:translate-x-0 pointer-events-none z-0 transition-all duration-500">
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
function DynamicHeader({ activeSection }: { activeSection: string }) {
  const isMission = activeSection === "mission";
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Responsive measurements
  const logoWidth = isDesktop 
    ? (isMission ? "240px" : "161.65px") 
    : (isMission ? "140px" : "100px");
    
  const logoHeight = isDesktop
    ? (isMission ? "89px" : "59.87px")
    : (isMission ? "52px" : "37px");

  const containerLeft = isDesktop ? "200px" : "16px";
  const containerTop = isDesktop ? "50px" : "16px";

  return (
    <div className="fixed left-0 top-0 bottom-0 z-40 pointer-events-none w-full">
       {/* Contenitore che si sposta */}
      <motion.div
        className="absolute max-w-[50%] md:max-w-none"
        initial={false}
        animate={{
          left: containerLeft, 
          top: containerTop,
          translateX: "0%",
        }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="relative flex flex-col items-start md:flex-row md:items-end"> 
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

          {/* TESTO "10 ANNI" (Appare solo se !isMission) */}
          <div className="relative md:absolute md:left-[calc(100%+48px)] md:bottom-0 flex items-end overflow-visible md:h-full mt-1 md:mt-0 md:ml-0">
             <AnimatePresence>
                {!isMission && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col justify-end whitespace-nowrap pb-1"
                  >
                      <div className="font-['Inter:Regular',sans-serif] font-normal text-[16px] sm:text-[20px] md:text-[24px] lg:text-[27px] leading-tight">
                        <p className="text-[#101010] m-0">
                            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-l from-[#de5ca1] to-[#76b729]">10 </span>
                            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-l from-[#de5ca1] to-[#76b729]">anni</span>
                            <span className="hidden sm:inline"> di attività</span>
                        </p>
                      </div>
                      {activeSection !== "chi-siamo" && isDesktop && ( 
                          <div className="font-['Inter:Regular',sans-serif] text-[20px] lg:text-[27px] leading-tight mt-1"> 
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
        </div>
        
        {/* "Il brief prende forma!" Slogan */}
        {!isMission && (
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="relative mt-2 md:absolute md:top-[100%] md:mt-4 md:left-0 bg-clip-text bg-gradient-to-l font-['Inter:Black',sans-serif] font-black from-[#de5ca1] leading-[normal] text-[20px] sm:text-[24px] md:text-[28px] lg:text-[33px] to-[#76b729] text-transparent w-full md:w-[400px] lg:w-[500px]" 
            >
                Il brief prende forma!
            </motion.p>
        )}
      </motion.div>
    </div>
  );
}

// --- NAVIGATION ---
function Navigation({ activeSection, onNavigate }: { activeSection: string; onNavigate: (id: string) => void }) {
  const navItems = [
    { id: "mission", label: "Mission" },
    { id: "chi-siamo", label: "Chi siamo" },
    { id: "servizi", label: "Servizi" },
    { id: "progetti", label: "Progetti" },
    { id: "contattaci", label: "CONTATTACI", isContact: true },
  ];

  return (
    <div className="fixed z-50 right-4 top-4 sm:right-6 sm:top-5 md:right-[180px] lg:right-[240px] xl:right-[283px] md:top-[25px] flex flex-col gap-1.5 md:gap-2 items-end pointer-events-auto">
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        if (item.isContact) {
          return (
            <button 
              key={item.id} 
              onClick={() => onNavigate(item.id)} 
              className="block cursor-pointer font-['Inter:Black',sans-serif] font-black text-[#d9609b] text-[17px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[30px] text-right min-h-[44px] flex items-center justify-end px-2"
            >
              {item.label}
            </button>
          );
        }
        return (
          <div key={item.id} className="flex flex-col items-end w-full group">
            <button
              onClick={() => onNavigate(item.id)}
              className={`block cursor-pointer font-['Inter:Black',sans-serif] font-black text-[17px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[30px] text-right transition-colors duration-300 min-h-[44px] flex items-center justify-end px-2 ${
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
              animate={{ opacity: (isVisible && !isActive) ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="font-bold text-[#a3a3a3] text-[22px] md:text-[32px]" 
            >
              {word}
            </motion.p>

            <motion.p
              animate={{ opacity: (isVisible && isActive) ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 font-bold text-[22px] md:text-[32px] bg-clip-text text-transparent bg-gradient-to-l from-[#de5ca1] to-[#76b729]" 
            >
              {word}
            </motion.p>
          </motion.div>
        );
      })}
    </div>
  );
}

// --- MAIN CONTENT RENDERER ---
function ContentRenderer({ activeSection, subIndex, setSubIndex }: { activeSection: string; subIndex: number; setSubIndex: (i: number) => void }) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  
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
          className="absolute inset-0 pointer-events-none flex flex-col justify-center px-4 sm:px-6 md:block md:px-0"
        >
           {/* Main Title Group */}
           <div className="relative md:absolute md:left-[140px] lg:left-[200px] md:top-1/2 md:-translate-y-1/2 mt-12 sm:mt-16 md:mt-0">
              <motion.p variants={itemVariants} className="bg-clip-text bg-gradient-to-l font-['Inter:Black',sans-serif] font-black from-[#de5ca1] leading-[1.1] text-[34px] sm:text-[44px] md:text-[56px] lg:text-[68px] xl:text-[76px] to-[#76b729] text-transparent max-w-[280px] sm:max-w-[380px] md:w-[650px] lg:w-[800px] xl:w-[900px] md:max-w-none">
                Il brief prende forma!
              </motion.p>
              
              {/* Keywords Rotanti */}
              <div className="relative h-[32px] sm:h-[38px] md:h-[45px] mt-2"> 
                 <RotatingKeywords />
              </div>

              {/* 10 Anni Big */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 4.5, ease: "easeOut" }}
                className="mt-[60px] sm:mt-[80px] md:mt-[150px] lg:mt-[210px]"
              >
                 <p className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] leading-tight">
                    <span className="font-bold bg-clip-text text-transparent bg-gradient-to-l from-[#de5ca1] to-[#76b729]">10 </span>
                    <span className="font-bold bg-clip-text text-transparent bg-gradient-to-l from-[#de5ca1] to-[#76b729]">anni</span>
                    <span> di attività</span>
                 </p>
                 {/* Sottotitolo narrativo */}
                 <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 5.5, duration: 1 }}
                    className="text-[14px] sm:text-[15px] md:text-[17px] lg:text-[18px] text-[#101010] mt-4 max-w-[280px] sm:max-w-[340px] md:max-w-[450px] lg:max-w-[500px] leading-relaxed"
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
           <motion.div variants={itemVariants} className="absolute left-4 top-[140px] sm:top-[160px] md:left-[150px] lg:left-[200px] md:top-[220px] lg:top-[268px]">
              <p className="font-bold text-[#76b729] text-[32px] sm:text-[42px] md:text-[56px] lg:text-[70px] leading-tight">
                {SERVIZI_ITEMS[subIndex]}
              </p>
           </motion.div>

           {/* Service List with Scroll Selection */}
           <motion.div variants={itemVariants} className="absolute left-4 md:left-1/2 bottom-[80px] sm:bottom-[100px] md:bottom-[150px] md:-translate-x-1/2 flex flex-col md:flex-row gap-[8px] sm:gap-[10px] md:gap-[18px] lg:gap-[22px] items-start md:items-center pointer-events-auto max-w-[calc(100%-2rem)] md:max-w-none">
              {SERVIZI_ITEMS.map((item, index) => {
                 const isActive = subIndex === index;
                 return (
                   <button 
                     key={item}
                     onClick={() => setSubIndex(index)}
                     className={`font-bold text-[18px] sm:text-[22px] md:text-[28px] lg:text-[35px] transition-all duration-300 text-left min-h-[44px] flex items-center ${
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
               <p className="font-bold text-[#101010] text-[40px] md:text-[82px]">3/83</p>
               <p className="font-bold text-[#d72488] text-[40px] md:text-[82px]">Pernigotti</p>
            </motion.div>
            <motion.p variants={itemVariants} className="absolute left-5 top-[180px] md:left-[200px] md:top-[300px] font-bold text-[20px] md:text-[33px] text-[#a3a3a3]">Packaging</motion.p>

            {/* Feedback Section */}
            <motion.div variants={itemVariants} className="absolute left-5 right-5 bottom-[180px] md:left-[200px] md:right-auto md:bottom-[180px] md:max-w-[500px]">
               <p className="font-extralight text-[20px] md:text-[32px]">Feedback</p>
               <div className="text-[15px] md:text-[17px] leading-[24px] md:leading-[26px] mt-2 md:mt-3">
                 <p>"Il nuovo packaging comunica perfettamente la qualità e la tradizione Pernigotti..."</p>
                 <p className="mt-2 md:mt-3 text-[14px] md:text-[16px]">— XXXX XXX | Marketing Manager Pernigotti</p>
               </div>
            </motion.div>
            
            {/* Lines decorative - Posizionate sopra l'immagine centrale */}
            {isDesktop && (
                <motion.div variants={itemVariants} className="absolute right-[100px] top-[320px] w-[600px]">
                     <svg className="w-full h-auto" fill="none" viewBox="0 0 1348 283">
                       <path d={svgPaths.p213302a0} stroke="#D72488" strokeLinecap="round" strokeWidth="9" />
                       <path d={svgPaths.pdd98d00} stroke="#D72488" strokeLinecap="round" strokeWidth="9" />
                     </svg>
                </motion.div>
            )}

            {/* Navigation Arrows - Posizionate più in alto per evitare sovrapposizioni */}
            <motion.div variants={itemVariants} className="absolute left-1/2 -translate-x-1/2 bottom-[100px] md:bottom-[80px] flex gap-4 items-center pointer-events-auto z-20">
               <button 
                 onClick={() => setSubIndex(Math.max(0, subIndex - 1))}
                 className="size-[40px] md:size-[50px] rounded-full bg-white/90 hover:bg-white transition-all duration-300 flex items-center justify-center shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
                 disabled={subIndex === 0}
                 aria-label="Progetto precedente"
               >
                 <ChevronLeft className="size-[20px] md:size-[24px] text-[#101010]" />
               </button>
               
               <div className="flex gap-2">
                 {[...Array(5)].map((_, idx) => (
                   <button
                     key={idx}
                     onClick={() => setSubIndex(idx)}
                     className={`size-[8px] md:size-[10px] rounded-full transition-all duration-300 ${
                       subIndex === idx 
                         ? "bg-gradient-to-l from-[#de5ca1] to-[#76b729] scale-125" 
                         : "bg-[#d9d9d9] hover:bg-[#a3a3a3]"
                     }`}
                     aria-label={`Vai al progetto ${idx + 1}`}
                   />
                 ))}
               </div>

               <button 
                 onClick={() => setSubIndex(Math.min(4, subIndex + 1))}
                 className="size-[40px] md:size-[50px] rounded-full bg-white/90 hover:bg-white transition-all duration-300 flex items-center justify-center shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
                 disabled={subIndex === 4}
                 aria-label="Progetto successivo"
               >
                 <ChevronRight className="size-[20px] md:size-[24px] text-[#101010]" />
               </button>
            </motion.div>

            {/* Project List Button */}
            <motion.div variants={itemVariants} className="absolute left-5 bottom-[20px] md:left-auto md:right-[200px] md:bottom-[30px] bg-white/80 px-[20px] py-[12px] rounded-[46px] flex gap-[10px] items-center shadow-md pointer-events-auto">
               <p className="font-bold text-[16px] md:text-[20px] text-[#101010]">Lista progetti</p>
               <div className="size-[18px] md:size-[22px]">
                 <svg className="size-full" fill="none" viewBox="0 0 35 35"><path d="M10 2H35M10 6H22" stroke="#101010" strokeWidth="2"/></svg>
               </div>
            </motion.div>
        </motion.div>
      )}

      {activeSection === "contattaci" && (
         <motion.div
            key="contattaci"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none px-4 sm:px-6"
         >
            <motion.p 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "backOut" }}
                className="text-[26px] sm:text-[34px] md:text-[46px] lg:text-[58px] xl:text-[70px] 2xl:text-[75px] font-black text-[#d9609b] text-center leading-tight"
            >
                PARLACI DEL TUO PROGETTO
            </motion.p>
         </motion.div>
      )}
    </AnimatePresence>
  );
}


// --- MAIN APP ---

export default function Home() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0); // State for internal section slides
  const [isScrolling, setIsScrolling] = useState(false);
  const activeSection = SECTIONS[activeSectionIndex];

  // Touch handling
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Scroll Jacking Logic
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); 
      
      if (isScrolling) return;

      const currentSection = SECTIONS[activeSectionIndex];
      // Type assertion needed because TS doesn't know SECTION_COUNTS keys match SECTIONS values exactly 
      const subSlideCount = (SECTION_COUNTS as any)[currentSection] || 1;

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
                 const prevSection = SECTIONS[prevIndex];
                 const prevSlideCount = (SECTION_COUNTS as any)[prevSection] || 1;
                 
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
  }, [isScrolling, activeSectionIndex, subIndex]);

  // Touch Events for Mobile Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    if (isScrolling) return;

    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart - touchEnd;
    
    const currentSection = SECTIONS[activeSectionIndex];
    const subSlideCount = (SECTION_COUNTS as any)[currentSection] || 1;

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
                const prevSection = SECTIONS[prevIndex];
                const prevSlideCount = (SECTION_COUNTS as any)[prevSection] || 1;
                
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
        setSubIndex(0); // Reset subIndex on direct nav
    }
  };

  return (
    <div 
        className="bg-white relative w-screen h-screen overflow-hidden font-['Inter',sans-serif]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
    >
      {/* 1. Background Elements (Unified Visuals) */}
      <BackgroundVisuals activeSection={activeSection} subIndex={subIndex} />

      {/* 2. Dynamic Header (Logo + Left Info) */}
      <DynamicHeader activeSection={activeSection} />

      {/* 3. Navigation (Right Side) */}
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />

      {/* 4. Content Area (Fading In/Out Text) */}
      <div className="relative z-10 w-full h-full">
         <ContentRenderer activeSection={activeSection} subIndex={subIndex} setSubIndex={setSubIndex} />
      </div>
    </div>
  );
}
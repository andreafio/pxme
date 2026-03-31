import { useId, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../imports/svg-53xjlwfhm8";
import imgEllipse6 from "figma:asset/0dbe7327a1bc1513d7647c295c4c604c864397d2.png";
import imgEllipse4 from "figma:asset/7fa13a594a8b2c9fe104df3624d3e796b2311c01.png";
import imgEllipse7 from "figma:asset/a328796418d2639bd6edd07e60315aef07caa296.png";

type BackgroundVisualsProps = {
  activeSection: string;
  subIndex: number;
  imageSrc?: string;
};

export function BackgroundVisuals({ activeSection, subIndex, imageSrc }: BackgroundVisualsProps) {
  const allRings = [svgPaths.p35cefec0, svgPaths.p123eec00, svgPaths.p20d0c00, svgPaths.p34105380];
  const targetRings = [allRings[2], allRings[3]];
  const patternPrefix = useId().replace(/:/g, "");
  const isProjectVisual = Boolean(imageSrc);

  const sectionRingMap = useMemo(() => {
    const getRandomRing = () => targetRings[Math.floor(Math.random() * targetRings.length)];
    return {
      "chi-siamo": getRandomRing(),
      "servizi": getRandomRing(),
    };
  }, [targetRings]);

  const currentFillPath = isProjectVisual
    ? targetRings[0]
    : sectionRingMap[activeSection as keyof typeof sectionRingMap] || targetRings[0];

  const getPatternId = () => {
    if (isProjectVisual) {
      return `${patternPrefix}-pattern-project`;
    }
    if (activeSection === "servizi") {
      return `${patternPrefix}-pattern-servizi-${subIndex}`;
    }
    return `${patternPrefix}-pattern-${activeSection}`;
  };

  const shouldRenderFill = !isProjectVisual && (activeSection !== "mission" && activeSection !== "contattaci");
  const getPatternHref = (fallback: string) => imageSrc ?? fallback;

  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] lg:left-auto lg:right-[15vw] lg:w-[946px] lg:h-[946px] lg:translate-x-0 pointer-events-none z-0 transition-all duration-500" style={{ margin: 0, padding: 0 }}>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1262 1262" fill="none">
        <defs>
          <pattern id={`${patternPrefix}-pattern-chi-siamo`} patternUnits="userSpaceOnUse" width="1262" height="1262">
            <image
              href={getPatternHref(imgEllipse6)}
              x="0"
              y="0"
              width="1262"
              height="1262"
              preserveAspectRatio="xMidYMid slice"
              transform="rotate(321.358, 631, 631)"
            />
          </pattern>

          <pattern id={`${patternPrefix}-pattern-servizi-0`} patternUnits="userSpaceOnUse" width="1262" height="1262">
            <image
              href={getPatternHref(imgEllipse4)}
              x="0"
              y="0"
              width="1262"
              height="1262"
              preserveAspectRatio="xMidYMid slice"
              transform="rotate(5.589, 631, 631)"
            />
          </pattern>

          <pattern id={`${patternPrefix}-pattern-servizi-1`} patternUnits="userSpaceOnUse" width="1262" height="1262">
            <image
              href={getPatternHref(imgEllipse6)}
              x="0"
              y="0"
              width="1262"
              height="1262"
              preserveAspectRatio="xMidYMid slice"
              transform="rotate(45, 631, 631)"
            />
          </pattern>

          <pattern id={`${patternPrefix}-pattern-servizi-2`} patternUnits="userSpaceOnUse" width="1262" height="1262">
            <image
              href={getPatternHref(imgEllipse7)}
              x="0"
              y="0"
              width="1262"
              height="1262"
              preserveAspectRatio="xMidYMid slice"
              transform="rotate(90, 631, 631)"
            />
          </pattern>

          <pattern id={`${patternPrefix}-pattern-servizi-3`} patternUnits="userSpaceOnUse" width="1262" height="1262">
            <image
              href={getPatternHref(imgEllipse4)}
              x="0"
              y="0"
              width="1262"
              height="1262"
              preserveAspectRatio="xMidYMid slice"
              transform="rotate(180, 631, 631)"
            />
          </pattern>

          <pattern id={`${patternPrefix}-pattern-servizi-4`} patternUnits="userSpaceOnUse" width="1262" height="1262">
            <image
              href={getPatternHref(imgEllipse6)}
              x="0"
              y="0"
              width="1262"
              height="1262"
              preserveAspectRatio="xMidYMid slice"
              transform="rotate(270, 631, 631)"
            />
          </pattern>

          <pattern id={`${patternPrefix}-pattern-project`} patternUnits="userSpaceOnUse" width="1262" height="1262">
            <image
              href={getPatternHref(imgEllipse6)}
              x="0"
              y="0"
              width="1262"
              height="1262"
              preserveAspectRatio="xMidYMid slice"
              transform="rotate(321.358, 631, 631)"
            />
          </pattern>
        </defs>

        <AnimatePresence mode="wait">
          {shouldRenderFill && (
            <motion.path
              key={`fill-${activeSection}-${isProjectVisual ? "project" : subIndex}`}
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

        <g id="Group 4">
          {[
            { d: allRings[0], w: 5.63, maxW: 9, delay: 0 },
            { d: allRings[1], w: 9.56, maxW: 13, delay: 0.6 },
            { d: allRings[2], w: 13.53, maxW: 17, delay: 1.2 },
            { d: allRings[3], w: 20.2, maxW: 25, delay: 1.8 },
          ].map((path, index) => (
            <motion.path
              key={index}
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

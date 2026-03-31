import imgEllipse6 from "figma:asset/0dbe7327a1bc1513d7647c295c4c604c864397d2.png";
import svgPaths from "../../../imports/svg-53xjlwfhm8";

type GraficoProgettoProps = {
  image?: string;
  alt?: string;
  showRings?: boolean;
  sectionIndex?: number;
};

export function GraficoProgetto({ image, sectionIndex = 0 }: GraficoProgettoProps) {
  const imgSrc = image && image.trim().length > 0 ? image : imgEllipse6;
  const patternId = `img-pattern-${sectionIndex}`;

  return (
    <svg
      viewBox="0 0 1262 1262"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={patternId}
          patternUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1262"
          height="1262"
        >
          <image
            href={imgSrc}
            x="0"
            y="0"
            width="1262"
            height="1262"
            preserveAspectRatio="xMidYMid slice"
          />
        </pattern>
      </defs>

      {/* Organic fill — image masked inside the shape */}
      <path d={svgPaths.p20d0c00} fill={`url(#${patternId})`} />

      {/* Ring outlines — stroke only, concentric with fill */}
      <path d={svgPaths.p20d0c00} fill="none" stroke="rgba(200,196,188,0.5)" strokeWidth="8" />
      <path d={svgPaths.p34105380} fill="none" stroke="rgba(200,196,188,0.35)" strokeWidth="14" />
    </svg>
  );
}
import React from "react";
import { BackgroundVisuals } from "../../BackgroundVisuals";
import imgEllipse6 from "figma:asset/0dbe7327a1bc1513d7647c295c4c604c864397d2.png";

export function GraficoProgetto({ image }: { image?: string; alt?: string; showRings?: boolean }) {
  const safeImage = image && image.trim().length > 0 ? image : imgEllipse6;
  return <BackgroundVisuals activeSection="progetti" subIndex={0} imageSrc={safeImage} />;
}
import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Symptoms } from "@/components/sections/Symptoms";
import { ServicesIndex } from "@/components/sections/ServicesIndex";
import { Differentiators } from "@/components/sections/Differentiators";
import { CasesPreview } from "@/components/sections/CasesPreview";
import { Finale } from "@/components/sections/Finale";
import { CASE_STUDIES } from "@/lib/cases-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Home como introducción (ADR-012): hero → manifiesto (síntomas) → índice de
 * servicios → diferencial → casos (cuando existan) → cierre. El detalle vive en
 * sus páginas: proceso y herramientas en /servicios, compromisos en /nosotros,
 * preguntas frecuentes en /contacto.
 */
export default function Home() {
  const hasCases = CASE_STUDIES.length > 0;
  return (
    <>
      <Hero />
      <Symptoms />
      <ServicesIndex />
      <Differentiators index="03" />
      <CasesPreview index="04" />
      <Finale index={hasCases ? "05" : "04"} />
    </>
  );
}

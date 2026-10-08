import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CaseStudyGrid } from "@/components/sections/CaseStudyGrid";
import { CASE_STUDIES } from "@/lib/cases-data";

/** Vista previa de casos en la home. Oculta mientras no existan casos reales publicados. */
export function CasesPreview() {
  if (CASE_STUDIES.length === 0) return null;

  return (
    <section className="section-padding relative border-t border-white/[0.06]" aria-label="Casos de éxito">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Casos de éxito"
          title="Resultados con nombre propio."
          aside={
            <ButtonLink href="/casos-de-exito" variant="secondary">
              Ver todos los casos
            </ButtonLink>
          }
        />
        <CaseStudyGrid />
      </div>
    </section>
  );
}

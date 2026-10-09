import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { CaseShowcase } from "@/components/sections/CaseShowcase";
import { CASE_STUDIES } from "@/lib/cases-data";

/**
 * Capítulo de imagen de la home: casos reales a gran formato.
 * Oculto mientras no existan casos publicados (no se inventan proyectos).
 */
export function CasesPreview({ index = "04" }: { index?: string }) {
  if (CASE_STUDIES.length === 0) return null;

  return (
    <section className="section-padding relative overflow-hidden border-t border-white/[0.08]" aria-labelledby="cases-title">
      <div className="container-custom">
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <SectionLabel index={index}>Casos de éxito</SectionLabel>
            </Reveal>
            <SplitReveal
              id="cases-title"
              className="mt-6 text-display-lg font-semibold text-white"
              lines={[{ text: "Resultados" }, { text: "con nombre propio.", className: "font-light text-slate-400" }]}
            />
          </div>
          <Reveal className="lg:col-span-3 lg:col-start-10 lg:text-right">
            <ButtonLink href="/casos-de-exito" variant="arrow">
              Ver todos los casos
            </ButtonLink>
          </Reveal>
        </div>
        <CaseShowcase />
      </div>
    </section>
  );
}

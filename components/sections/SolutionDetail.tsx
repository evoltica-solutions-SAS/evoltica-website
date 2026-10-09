import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { EngagementTimeline } from "@/components/sections/EngagementTimeline";
import { MODE_META, PRICE_NOTE, getLine, getSolutionsByLine, type CatalogSolution } from "@/lib/catalog";

/**
 * Cuerpo de /soluciones/[slug]. Solo muestra contenido confirmado: cada bloque
 * aparece únicamente si la solución (o su línea) tiene ese dato.
 */
export function SolutionDetail({ solution }: { solution: CatalogSolution }) {
  const line = getLine(solution.line);
  const related = getSolutionsByLine(solution.line).filter((other) => other.slug !== solution.slug);
  const mode = MODE_META[solution.mode];

  return (
    <>
      {/* Modalidad y contexto de la línea */}
      <section className="section-padding relative border-t border-white/[0.06]" aria-labelledby="about-title">
        <div className="container-custom">
          <h2 id="about-title" className="sr-only">
            Cómo se contrata
          </h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal className="card p-8 lg:p-10">
              <SectionLabel>Modalidad</SectionLabel>
              <p className="mt-5 text-display-sm font-semibold text-white">{mode.label}</p>
              <p className="mt-3 leading-relaxed text-slate-300">{mode.description}</p>
              {!solution.price && (
                <p className="mt-6 border-t border-white/[0.08] pt-5 text-sm text-slate-400">{PRICE_NOTE}</p>
              )}
            </Reveal>
            <Reveal className="card p-8 lg:p-10" delay={0.08}>
              <SectionLabel>
                Parte de {line.number} · {line.title}
              </SectionLabel>
              <p className="mt-5 leading-relaxed text-slate-300">{line.intro}</p>
              <Link href={`/servicios/${line.slug}`} className="link-arrow mt-6">
                Ver la línea completa
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          {solution.requirements.length > 0 && (
            <Reveal className="card mt-6 flex gap-4 p-8 lg:p-10">
              <Info className="mt-1 h-5 w-5 shrink-0 text-primary-400" aria-hidden="true" />
              <div>
                <h3 className="eyebrow">Requisitos</h3>
                <ul className="mt-4 space-y-2">
                  {solution.requirements.map((requirement) => (
                    <li key={requirement} className="text-lead text-slate-300">
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {(solution.idealFor.length > 0 || solution.tools.length > 0) && (
            <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:[&>*:only-child]:col-span-2">
              {solution.idealFor.length > 0 && (
                <Reveal className="card p-8 lg:p-10">
                  <h3 className="eyebrow">Ideal para</h3>
                  <ul className="mt-5 flex flex-wrap gap-2.5">
                    {solution.idealFor.map((type) => (
                      <li key={type} className="border border-white/[0.14] px-4 py-2 text-slate-200">
                        {type}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
              {solution.tools.length > 0 && (
                <Reveal className="card p-8 lg:p-10" delay={0.08}>
                  <h3 className="eyebrow">Con qué trabajamos en esta línea</h3>
                  <ul className="mt-5 flex flex-wrap gap-2.5">
                    {solution.tools.map((tool) => (
                      <li key={tool} className="tech-badge">
                        {tool}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Proceso real de entrada (ENGAGEMENT_STEPS) */}
      <div className="border-t border-white/[0.06]">
        <EngagementTimeline
          title={
            <>
              Cómo empezamos.
              <span className="block font-light text-slate-400">El alcance se define contigo.</span>
            </>
          }
        />
      </div>

      {related.length > 0 && (
        <section className="section-padding relative border-t border-white/[0.06]" aria-labelledby="related-solutions-title">
          <div className="container-custom">
            <SectionHeading
              eyebrow={`Más en ${line.title}`}
              size="md"
              title={<span id="related-solutions-title">Otras soluciones de esta línea.</span>}
            />
            <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((other) => (
                <RevealItem as="li" key={other.slug}>
                  <Link href={`/soluciones/${other.slug}`} className="card card-interactive group flex h-full flex-col p-7">
                    <span className="flex items-center justify-between">
                      <span className="icon-tile">
                        <other.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 text-slate-400 transition-all duration-300 group-hover:rotate-45 group-hover:text-primary-400"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-6 text-lg font-semibold text-white">{other.title}</span>
                    <span className="mt-2 text-sm leading-relaxed text-slate-400">{other.summary}</span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}
    </>
  );
}

import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CASE_STUDIES } from "@/lib/cases-data";
import { getServiceBySlug } from "@/lib/services-data";

/** Grilla de casos de éxito reales. No renderiza nada si aún no hay casos publicados. */
export function CaseStudyGrid() {
  if (CASE_STUDIES.length === 0) return null;

  return (
    <RevealGroup className="grid gap-5 md:grid-cols-2">
      {CASE_STUDIES.map((study) => (
        <RevealItem as="article" key={study.slug} className="card card-interactive flex flex-col p-8 lg:p-10">
          <p className="eyebrow">{study.industry}</p>
          <h3 className="mt-5 text-2xl font-semibold text-white">{study.client}</h3>
          <dl className="mt-6 space-y-5 text-[0.95rem] leading-relaxed">
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-slate-400">Reto</dt>
              <dd className="mt-1.5 text-slate-300">{study.challenge}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-slate-400">Solución</dt>
              <dd className="mt-1.5 text-slate-300">{study.solution}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-slate-400">Resultado</dt>
              <dd className="mt-1.5">
                <ul className="list-inside list-disc space-y-1 text-white">
                  {study.results.map((result) => (
                    <li key={result}>{result}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
          <ul className="mt-8 flex flex-wrap gap-2">
            {study.serviceSlugs.map((slug) => {
              const service = getServiceBySlug(slug);
              return service ? (
                <li key={slug} className="tech-badge">
                  {service.title}
                </li>
              ) : null;
            })}
          </ul>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
